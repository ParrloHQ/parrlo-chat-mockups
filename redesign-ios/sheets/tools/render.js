// Рендер PNG пакета: node redesign-ios/sheets/tools/render.js [экран ...]
// Кадры: png/<экран>__<se|max>-<n|ax5>-<ru|es|en>.png (×2) и png/_overview-ru.png.
// Проверки на каждом кадре:
//  1) текст не вылезает за свой блок (scrollWidth > clientWidth у видимых элементов с текстом);
//  2) ни одно слово не разорвано между строками (у каждого слова одна строка: Range.getClientRects);
//  3) вертикальное переполнение у кнопок и ячеек фиксированной высоты.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const DIR = path.resolve(__dirname, '..');
const ALL = JSON.parse(fs.readFileSync(path.join(__dirname, 'screens.json'))).map(s => s.k);
const only = process.argv.slice(2);
const screens = only.length ? ALL.filter(s => only.includes(s)) : ALL;
const dev = { se: [375, 667], max: [440, 956] };
fs.mkdirSync(DIR + '/png', { recursive: true });

const check = () => {
  const scr = document.querySelector('.screen[data-l="' + document.documentElement.dataset.l + '"]');
  const out = [];
  const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== 'hidden'; };
  const hasText = (e) => [].some.call(e.childNodes, n => n.nodeType === 3 && n.textContent.trim());
  for (const e of scr.querySelectorAll('*')) {
    if (e instanceof SVGElement || !vis(e)) continue;
    const cs = getComputedStyle(e);
    if (cs.display === 'inline') continue;
    const txt = hasText(e) || [].some.call(e.children, c => getComputedStyle(c).display === 'inline' && c.textContent.trim());
    if (!txt) continue;
    if (e.scrollWidth > e.clientWidth + 1 && cs.overflowX !== 'hidden') out.push('шире блока: ' + e.className + ' «' + e.textContent.trim().slice(0, 40) + '»');
    if ((e.classList.contains('fbtn') || e.classList.contains('btn') || e.classList.contains('pbtn')) && e.scrollHeight > e.clientHeight + 1) out.push('выше кнопки: «' + e.textContent.trim().slice(0, 40) + '»');
  }
  // разрыв слова
  const w = document.createTreeWalker(scr, NodeFilter.SHOW_TEXT);
  let n; const rg = document.createRange();
  while ((n = w.nextNode())) {
    const p = n.parentElement; if (!p || !vis(p)) continue;
    const s = n.textContent; const re = /\S+/g; let m;
    while ((m = re.exec(s))) {
      rg.setStart(n, m.index); rg.setEnd(n, m.index + m[0].length);
      const tops = new Set([...rg.getClientRects()].filter(r => r.width > 0).map(r => Math.round(r.top)));
      if (tops.size > 1) out.push('слово разорвано: «' + m[0] + '»');
    }
  }
  return out;
};

(async () => {
  const b = await chromium.launch();
  const issues = [];
  let count = 0;
  for (const [d, [w, h]] of Object.entries(dev)) for (const t of ['n', 'ax5']) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    for (const s of screens) for (const l of ['ru', 'es', 'en']) {
      await p.goto(`file://${DIR}/${s}.html?d=${d}&t=${t}&l=${l}`);
      await p.waitForFunction(() => document.body.dataset.ready === '1');
      // хвостики облачек — псевдоэлементы за краем, их не считаем
      const st = await p.addStyleTag({ content: '.b::after{display:none!important}' });
      const bad = await p.evaluate(check);
      await st.evaluate(e => e.remove());
      if (bad.length) issues.push(`${s} ${d}-${t}-${l}: ${[...new Set(bad)].join(' | ')}`);
      await p.locator(`.screen[data-l="${l}"]`).screenshot({ path: `${DIR}/png/${s}__${d}-${t}-${l}.png` });
      count++;
    }
    await p.close();
  }
  if (!only.length) {
    const p = await b.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
    await p.goto('file://' + DIR + '/index.html'); await p.waitForLoadState('networkidle');
    await p.screenshot({ path: DIR + '/png/_overview-ru.png', fullPage: true });
    await p.close();
  }
  await b.close();
  console.log('кадров:', count);
  console.log(issues.length ? 'НАЙДЕНО:\n' + issues.join('\n') : 'проверка: переполнений и разорванных слов нет');
})();
