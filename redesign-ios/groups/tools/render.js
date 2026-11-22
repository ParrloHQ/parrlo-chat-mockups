// Рендер PNG пакета «группы»: node redesign-ios/groups/tools/render.js [экран…]
// png/<экран>__<se|max>-<n|ax5>-<ru|es|en>.png (×2) и png/_overview-ru.png.
// Проверки на каждом кадре: (1) текст вылезает за свой блок (scrollWidth > clientWidth) или обрезан многоточием;
// (2) слово разорвано между строками или вылезает за блок (после WordFit). Находки — в консоль и tools/check.txt.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const DIR = path.resolve(__dirname, '..');
const ALL = require('./screens.json');
const only = process.argv.slice(2);
const screens = only.length ? ALL.filter(s => only.includes(s)) : ALL;
const dev = { se: [375, 667], max: [440, 956] };
(async () => {
  const b = await chromium.launch();
  const issues = [], fits = [];
  let n = 0;
  for (const [d, [w, h]] of Object.entries(dev)) for (const t of ['n', 'ax5']) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    for (const s of screens) for (const l of ['ru', 'es', 'en']) {
      await p.goto(`file://${DIR}/${s}.html?d=${d}&t=${t}&l=${l}`);
      await p.waitForFunction(() => document.body.dataset.ready === '1');
      const chk = await p.addStyleTag({ content: '.b::after{display:none!important}' });
      const r = await p.evaluate(() => {
        const main = document.querySelector('main'), out = [];
        main.querySelectorAll('*').forEach(e => {
          if (e.closest('svg') || e.classList.contains('page') || e.classList.contains('msgs') || e.classList.contains('call') || e.classList.contains('tiles')) return;
          const cs = getComputedStyle(e);
          if (cs.display === 'none' || !e.clientWidth) return;
          if (!e.textContent.trim()) return;
          if (e.scrollWidth > e.clientWidth + 1 && cs.overflowX !== 'visible' ? true : (e.scrollWidth > e.clientWidth + 1 && cs.overflowX === 'visible'))
            out.push('переполнение ' + e.className + ': ' + e.textContent.trim().slice(0, 40));
        });
        textEls(main).forEach(e => { const w = wordIssue(e); if (w) out.push(w + ' (' + e.className + ')'); });
        const wf = [...main.querySelectorAll('[data-wf]')].map(e => `${e.className || e.tagName} → ${parseFloat(e.style.fontSize).toFixed(1)}px`);
        return { out, wf };
      });
      await chk.evaluate(e => e.remove());
      const tag = `${s} ${d}-${t}-${l}`;
      if (r.out.length) issues.push(`${tag}: ${[...new Set(r.out)].join(' | ')}`);
      if (r.wf.length) fits.push(`${tag}: ${r.wf.join(', ')}`);
      await p.locator('main.screen').screenshot({ path: `${DIR}/png/${s}__${d}-${t}-${l}.png` });
      n++;
    }
    await p.close();
  }
  if (!only.length) {
    const p = await b.newPage({ viewport: { width: 1960, height: 900 }, deviceScaleFactor: 1 });
    await p.goto('file://' + DIR + '/index.html'); await p.waitForLoadState('networkidle');
    await p.screenshot({ path: DIR + '/png/_overview-ru.png', fullPage: true });
  }
  await b.close();
  const rep = `кадров: ${n}\n` + (issues.length ? 'ПРОБЛЕМЫ:\n' + issues.join('\n') : 'проверка: текст нигде не вылезает, слова не разорваны') +
    '\n\nWordFit (кегль уменьшен, AX5):\n' + (fits.length ? fits.join('\n') : 'нигде');
  if (!only.length) fs.writeFileSync(path.join(__dirname, 'check.txt'), rep + '\n');
  console.log(rep);
})();
