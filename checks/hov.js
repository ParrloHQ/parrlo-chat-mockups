// Горизонтальные вылеты текста в кадрах: текст за краем кадра или обрезан по X обрезающим блоком.
//   node checks/hov.js [экран ...]       — без аргументов: все экраны frames/{ru,es,en}-*.html
// Кадры SE (375) проверяются ещё и на ширине 360 (суффикс @360) — ширина проверки веба.
// Печатает найденное и итог; код выхода 1, если есть вылеты. Ожидаемый результат — 0.
// Не считается вылетом:
//   — блоки нулевого размера (контейнер прокрутки в позах Duo hp/hl и на входе при XL — это раскладка сеткой);
//   — содержимое прокручиваемых по X контейнеров (overflow-x: auto/scroll — лента миниатюр и т. п.), оно листается;
//   — текст для экранного диктора (.pc-sr), он скрыт намеренно.
const {chromium} = require('playwright');
const fs = require('fs');
const path = require('path');
const R = path.resolve(__dirname, '..');
let screens = process.argv.slice(2);
if (!screens.length) screens = [...new Set(fs.readdirSync(R + '/frames').filter((f) => /^ru-.*\.html$/.test(f)).map((f) => f.slice(3, -5)))].sort();

const probe = (w360) => {
  const res = [];
  // второй проход: кадры SE (375) сужены до 360 — ширина проверки веба
  if (w360) document.querySelectorAll('figure[data-dev="se"] .pc-frame').forEach((fr) => fr.style.setProperty('--W', '360px'));
  if (w360 && window.wordFit) window.wordFit(); // WordFit заново на новой ширине
  document.querySelectorAll('figure .pc-frame').forEach((fr) => {
    if (w360 && fr.closest('figure').dataset.dev !== 'se') return;
    const id = fr.closest('figure').dataset.id + (w360 ? '@360' : '');
    const F = fr.getBoundingClientRect();
    fr.querySelectorAll('*').forEach((e) => {
      if (e.closest('.pc-sr')) return;
      if (![...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return;
      const cs = getComputedStyle(e);
      if (cs.visibility === 'hidden' || cs.display === 'none') return;
      const r = e.getBoundingClientRect();
      if (!r.width) return;
      let bad = '', scrolled = false;
      for (let a = e.parentElement; a && a !== fr; a = a.parentElement) {
        const ac = getComputedStyle(a);
        if (/auto|scroll/.test(ac.overflowX)) { scrolled = true; break; }
        if (/hidden|clip/.test(ac.overflowX)) {
          const ar = a.getBoundingClientRect();
          if (ar.width < 1 || ar.height < 1) continue;
          if (r.right > ar.right + 1 || r.left < ar.left - 1) { bad = 'обрезан блоком ' + String(a.className).split(' ')[0]; break; }
        }
      }
      if (!bad && !scrolled && (r.right > F.right + 1 || r.left < F.left - 1)) bad = 'за краем кадра';
      if (!bad && /hidden|clip/.test(cs.overflowX) && e.scrollWidth > e.clientWidth + 1 && cs.textOverflow !== 'ellipsis') bad = 'не помещается в свой блок';
      if (bad) res.push(id + ' | ' + bad + ' | ' + e.textContent.trim().slice(0, 50));
    });
  });
  return res;
};

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({viewport: {width: 1600, height: 1300}});
  const all = [];
  for (const s of screens) for (const l of ['ru', 'es', 'en']) {
    const f = `${R}/frames/${l}-${s}.html`;
    if (!fs.existsSync(f)) continue;
    for (const w360 of [false, true]) {
      await p.goto('file://' + f);
      await p.waitForFunction(() => document.body.dataset.ready === '1', null, {timeout: 15000}).catch(() => {});
      for (const x of await p.evaluate(probe, w360)) all.push(l + ' ' + x);
    }
  }
  await b.close();
  all.forEach((x) => console.log(x));
  console.log(`hov: горизонтальных вылетов — ${all.length} (экранов ${screens.length} × ru/es/en)`);
  process.exit(all.length ? 1 : 0);
})();
