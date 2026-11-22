// Рендер PNG + проверки: node redesign-ios/onboarding/tools/render.js [экран ...]
// Проверка: (1) ни один элемент не шире своего бокса (scrollWidth > clientWidth), (2) ни одно слово не вылезает за свой блок,
// (3) ни одно слово не разорвано между строками (у Range слова больше одной строки).
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const DIR = path.resolve(__dirname, '..');
const ALL = JSON.parse(fs.readFileSync(path.join(__dirname, 'screens.json'), 'utf8'));
const only = process.argv.slice(2);
const screens = only.length ? ALL.filter(s => only.includes(s)) : ALL;
const dev = { se: [375, 667], max: [440, 956] };
const CHECK = () => {
  const out = [];
  const scr = document.querySelector('.screen').getBoundingClientRect();
  const name = (e) => (e.className && e.className.baseVal === undefined ? e.className : e.tagName) + ' «' + e.textContent.trim().slice(0, 36) + '»';
  document.querySelectorAll('.screen *').forEach(e => {
    if (e.closest('svg') || e.closest('.sb')) return;
    const cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.visibility === 'hidden') return;
    if (e.clientWidth > 0 && e.scrollWidth > e.clientWidth + 1 && !['hidden', 'clip'].includes(cs.overflowX)) out.push('шире бокса: ' + name(e));
  });
  const w = document.createTreeWalker(document.querySelector('.screen'), NodeFilter.SHOW_TEXT);
  let n;
  while ((n = w.nextNode())) {
    const p = n.parentElement;
    if (!p || p.closest('svg') || p.closest('.sb') || p.closest('.ms')) continue;
    if (!p.getClientRects().length) continue;
    // граница строки — самый узкий контент-бокс среди предков-блоков (до .screen)
    let L = -1e9, R = 1e9;
    for (let a = p; a && a !== document.body; a = a.parentElement) {
      const ac = getComputedStyle(a); if (ac.display.startsWith('inline') && a !== p) continue; if (ac.display === 'inline') continue;
      const ab = a.getBoundingClientRect();
      L = Math.max(L, ab.left + parseFloat(ac.paddingLeft) + parseFloat(ac.borderLeftWidth) - 1); R = Math.min(R, ab.right - parseFloat(ac.paddingRight) - parseFloat(ac.borderRightWidth) + 1);
      if (a.classList.contains('screen')) break;
    }
    const re = /[^ \n\t]+/g; let m;
    while ((m = re.exec(n.data))) {
      const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length);
      const rs = [...r.getClientRects()].filter(x => x.width > 0);
      const tops = new Set(rs.map(x => Math.round(x.top)));
      if (tops.size > 1) out.push('слово разорвано: «' + m[0] + '»');
      if (rs.some(x => x.right > R || x.left < L || x.right > scr.right || x.left < scr.left)) out.push('слово вылезает: «' + m[0] + '»');
    }
  }
  return [...new Set(out)];
};
(async () => {
  const b = await chromium.launch();
  const issues = [], fits = [];
  let count = 0;
  for (const [d, [wd, ht]] of Object.entries(dev)) for (const t of ['n', 'ax5']) {
    const p = await b.newPage({ viewport: { width: wd, height: ht }, deviceScaleFactor: 2 });
    for (const s of screens) for (const l of ['ru', 'es', 'en']) {
      await p.goto(`file://${DIR}/${s}.html?d=${d}&t=${t}&l=${l}`);
      await p.waitForFunction(() => document.body.dataset.ready === '1');
      const st = await p.addStyleTag({ content: '.b::after{display:none!important}' });
      const bad = await p.evaluate(CHECK);
      await st.evaluate(e => e.remove());
      if (bad.length) issues.push(`${s} ${d}-${t}-${l}: ${bad.join(' | ')}`);
      const wf = await p.evaluate(() => [...document.querySelectorAll('[data-wf]')].map(e => `${e.className || e.tagName}→${getComputedStyle(e).fontSize}`));
      if (wf.length) fits.push(`${s} ${d}-${t}-${l}: ${wf.join(', ')}`);
      await p.locator('.screen').screenshot({ path: `${DIR}/png/${s}__${d}-${t}-${l}.png` });
      count++;
    }
    await p.close();
  }
  if (!only.length) {
    const p = await b.newPage({ viewport: { width: 1960, height: 900 }, deviceScaleFactor: 1 });
    await p.goto('file://' + DIR + '/index.html'); await p.waitForLoadState('networkidle');
    await p.screenshot({ path: DIR + '/png/_overview-ru.png', fullPage: true });
  }
  await b.close();
  console.log('PNG:', count);
  console.log('подгонка шрифта (×0.92, не ниже 28):\n' + (fits.join('\n') || '—'));
  console.log(issues.length ? 'НАЙДЕНО:\n' + issues.join('\n') : 'проверка: переполнений и разорванных слов нет');
})();
