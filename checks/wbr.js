// Разрывы внутри слова: слово перенесено не по пробелу и не по дефису.
//   node checks/wbr.js [экран ...]             — без аргументов: все экраны frames/{ru,es,en}-*.html
//   Кадры SE (375) проверяются ещё и на ширине 360 (ключ «…__se-…@360»), как веб.
//   node checks/wbr.js --write-allow           — переписать checks/wbr-allow.txt текущими местами (только для старта)
// Разрыв допустим только у слова шире экрана (ширина кадра − 32): так переносит и iOS.
// Остальные места XL/AX5, что были на старте, перечислены в checks/wbr-allow.txt; список только сокращается:
// новое место → ошибка; место из списка, которого больше нет, → ошибка (удали строку из списка).
// Запас TOL px на разницу шрифтов между машинами: разрыв «впритык» не считается новым, строка списка «впритык» — не устаревшей.
// Код выхода 1 при ошибке.
const {chromium} = require('playwright');
const fs = require('fs');
const path = require('path');
const R = process.env.R || path.resolve(__dirname, '..');
const ALLOW = path.join(__dirname, 'wbr-allow.txt');
const argv = process.argv.slice(2);
const writeAllow = argv.includes('--write-allow');
let screens = argv.filter((a) => !a.startsWith('--'));
const partial = screens.length > 0;
if (!partial) screens = [...new Set(fs.readdirSync(R + '/frames').filter((f) => /^ru-.*\.html$/.test(f)).map((f) => f.slice(3, -5)))].sort();

const TOL = 3; // px: запас на разницу шрифтов между машинами
const probe = ([allowKeys, TOL, w360]) => {
  const res = [], fits = [];
  // второй проход: узкие кадры (SE, 375) сужены до 360 — ширина проверки веба (360/390/1440); ключ кадра с суффиксом @360
  if (w360) document.querySelectorAll('figure[data-dev="se"] .pc-frame').forEach((fr) => fr.style.setProperty('--W', '360px'));
  const allow = new Set(allowKeys);
  const L = /[\p{L}\p{N}]/u;
  const rg = document.createRange();
  document.querySelectorAll('figure').forEach((fg) => {
    const fr = fg.querySelector('.pc-frame');
    if (!fr) return;
    if (w360 && fg.dataset.dev !== 'se') return;
    const id = fg.dataset.id + (w360 ? '@360' : '');
    const screenW = fr.getBoundingClientRect().width - 32;
    const w = document.createTreeWalker(fr, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      const t = n.textContent;
      if (!/\S{2}/.test(t)) continue;
      const el = n.parentElement;
      if (el.closest('.pc-sr')) continue;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      rg.selectNodeContents(n);
      const all = [...rg.getClientRects()].filter((r) => r.width);
      const lineW = Math.max(...all.map((r) => r.width)); // самая длинная строка узла ≈ ширина строки
      const re = /\S+/g;
      let m;
      while ((m = re.exec(t))) {
        if (m[0].length < 2) continue;
        rg.setStart(n, m.index);
        rg.setEnd(n, m.index + m[0].length);
        const rs = [...rg.getClientRects()].filter((r) => r.width);
        const key = id + ' | ' + m[0].replace(/^[«“"(]+|[»”"),.:;!?]+$/g, '');
        if (rs.length < 2 || Math.max(...rs.map((r) => r.top)) - Math.min(...rs.map((r) => r.top)) < 2) {
          // слово целое; если оно в списке — точно ли влезает (с запасом)? Только в многострочном узле, где ширина строки известна
          if (allow.has(key) && all.length > 1 && rs[0] && rs[0].width < lineW - TOL) fits.push(key);
          continue;
        }
        // где именно перенос: между двумя буквами/цифрами — разрыв; после дефиса — нормально
        let prevTop = null, broken = false;
        for (let i = 0; i < m[0].length; i++) {
          rg.setStart(n, m.index + i);
          rg.setEnd(n, m.index + i + 1);
          const r = rg.getClientRects()[0];
          if (!r || !r.width) continue;
          if (prevTop !== null && r.top > prevTop + 2 && L.test(m[0][i - 1]) && L.test(m[0][i])) { broken = true; break; }
          prevTop = r.top;
        }
        if (!broken) continue;
        const wide = rs.reduce((s, r) => s + r.width, 0);
        if (wide > screenW) continue; // шире экрана — допустимо
        if (wide - Math.max(...rs.map((r) => r.width)) <= TOL && !allow.has(key)) continue; // рвётся «впритык» — на другой машине может и не рваться
        res.push(key);
      }
    }
  });
  return {res, fits};
};

(async () => {
  // без хинтинга шрифта: ширины глифов дробные и одинаковые на разных машинах (иначе Linux-раннер и локальная машина округляют по-разному)
  const b = await chromium.launch({args: ['--font-render-hinting=none']});
  const p = await b.newPage({viewport: {width: 1600, height: 1300}});
  const allowAll = writeAllow || !fs.existsSync(ALLOW) ? [] : fs.readFileSync(ALLOW, 'utf8').split('\n').filter((x) => x && !x.startsWith('#'));
  const found = [], fitsAll = new Set();
  for (const s of screens) for (const l of ['ru', 'es', 'en']) {
    const f = `${R}/frames/${l}-${s}.html`;
    if (!fs.existsSync(f)) continue;
    await p.goto('file://' + f);
    await p.waitForTimeout(100);
    const keys = allowAll.filter((x) => x.startsWith(l + ' ' + s + '__')).map((x) => x.slice(3));
    for (const w360 of [false, true]) {
      if (w360) { await p.goto('file://' + f); await p.waitForTimeout(100); }
      const {res, fits} = await p.evaluate(probe, [keys, writeAllow ? -1e9 : TOL, w360]);
      for (const x of res) found.push(l + ' ' + x);
      for (const x of fits) fitsAll.add(l + ' ' + x);
    }
  }
  await b.close();
  const uniq = [...new Set(found)].sort();
  if (writeAllow) {
    fs.writeFileSync(ALLOW, '# Разрывы внутри слова при XL/AX5, оставшиеся на старте проверки. Список только сокращается.\n' + uniq.join('\n') + '\n');
    console.log(`wbr: записано в checks/wbr-allow.txt — ${uniq.length}`);
    return;
  }
  const allow = new Set(fs.existsSync(ALLOW) ? fs.readFileSync(ALLOW, 'utf8').split('\n').filter((x) => x && !x.startsWith('#')) : []);
  const fresh = uniq.filter((x) => !allow.has(x));
  const inScope = (x) => screens.includes(x.split(' ')[1].split('__')[0]);
  // устарела строка списка — только если слово сейчас целое и влезает в строку с запасом TOL
  const gone = [...allow].filter((x) => inScope(x) && !uniq.includes(x) && fitsAll.has(x));
  const unsure = [...allow].filter((x) => inScope(x) && !uniq.includes(x) && !fitsAll.has(x));
  if (unsure.length) console.log(`wbr: в списке ${unsure.length} строк, где слово сейчас целое, но впритык (или в однострочном блоке) — не ошибка; при правке экрана проверь и удали`);
  fresh.forEach((x) => console.log('новый разрыв: ' + x));
  gone.forEach((x) => console.log('уже исправлено — удали из checks/wbr-allow.txt: ' + x));
  console.log(`wbr: новых разрывов — ${fresh.length}, устаревших строк в списке — ${gone.length}, в списке — ${allow.size} (экранов ${screens.length} × ru/es/en)`);
  process.exit(fresh.length || gone.length ? 1 : 0);
})();
