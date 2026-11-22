// Проверка макетов редизайна iOS (redesign-ios/**): каждая страница × SE/Pro Max × обычный/AX5 × ru/es/en.
//   node checks/redesign.js [--hov] [--wbr] [страница …]   — без флагов обе проверки; страница — путь от redesign-ios, напр. s1-chats.html
// --hov: текст выходит за край экрана (по X).
// --wbr: слово разорвано между строками (перенос между двумя буквами/цифрами) или короткое служебное слово
//        (redesign-ios/tools/short-words.json) осталось в конце строки — висячий предлог/союз. Не считается, если вся
//        склеенная цепочка (короткие слова подряд + следующее слово) шире строки блока: тогда склейку снимает
//        tools/unglue.js (целое слово важнее склейки).
// Исключений нет: ожидаемый результат — 0. Код выхода 1 при находках.
const {chromium} = require('playwright');
const fs = require('fs');
const path = require('path');
const R = process.env.R || path.resolve(__dirname, '..');
const DIR = path.join(R, 'redesign-ios');
const argv = process.argv.slice(2);
let doHov = argv.includes('--hov'), doWbr = argv.includes('--wbr');
if (!doHov && !doWbr) doHov = doWbr = true;
const only = argv.filter((a) => !a.startsWith('--'));
const W = JSON.parse(fs.readFileSync(path.join(DIR, 'tools', 'short-words.json'), 'utf8'));

// страницы-экраны: *.html в redesign-ios и в его подпапках (пакеты), кроме обзоров и листа спеки
const pages = [];
const skip = /^(index|tabbar-spec)\.html$/;
for (const e of fs.readdirSync(DIR, {withFileTypes: true})) {
  if (e.isFile() && e.name.endsWith('.html') && !skip.test(e.name)) pages.push(e.name);
  if (e.isDirectory() && !['png', 'tools'].includes(e.name)) {
    for (const f of fs.readdirSync(path.join(DIR, e.name))) if (f.endsWith('.html') && !skip.test(f)) pages.push(e.name + '/' + f);
  }
}
const list = only.length ? pages.filter((p) => only.includes(p)) : pages;
const DEV = {se: [375, 667], max: [440, 956]};

const probe = ({doHov, doWbr, W, TOL}) => {
  const res = [];
  const SH = {};
  for (const l of ['ru', 'es', 'en']) SH[l] = new Set((W[l] || []).map((w) => w.toLowerCase()));
  const L = /[\p{L}\p{N}]/u;
  const vw = document.documentElement.clientWidth;
  const rg = document.createRange();
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  // ширина пробела в шрифте элемента (пробел на месте переноса строки имеет нулевую ширину — меряем отдельно)
  const spaceW = (el) => { const sp = document.createElement('span'); sp.textContent = '\u00a0'; sp.style.cssText = 'position:absolute;visibility:hidden;white-space:pre'; el.appendChild(sp); const x = sp.getBoundingClientRect().width; sp.remove(); return x; };
  const rectOf = (node, a, b) => { rg.setStart(node, a); rg.setEnd(node, b); return [...rg.getClientRects()].filter((r) => r.width); };
  while ((n = w.nextNode())) {
    const t = n.textContent;
    if (!/\S/.test(t)) continue;
    const el = n.parentElement;
    if (!el || el.closest('script,style,svg,[aria-hidden="true"]')) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) continue;
    // текст внутри прокручиваемой или обрезающей области (лента сообщений, многоточие) — не «вылет»
    let clipped = false;
    for (let a = el; a && a !== document.body; a = a.parentElement) {
      const s = getComputedStyle(a);
      if (s.overflowX !== 'visible' || s.textOverflow === 'ellipsis') { clipped = true; break; }
    }
    if (doHov && !clipped) {
      for (const r of rectOf(n, 0, t.length)) if (r.right > vw + 0.5 || r.left < -0.5) { res.push('вылет: ' + t.trim().slice(0, 40)); break; }
    }
    if (!doWbr) continue;
    const short = SH[(el.closest('[lang]') || {}).lang] || SH.ru;
    const re = /\S+/g;
    let m;
    const words = [];
    while ((m = re.exec(t))) words.push({s: m.index, e: m.index + m[0].length, w: m[0]});
    for (let i = 0; i < words.length; i++) {
      const {s, e, w: wd} = words[i];
      const rs = rectOf(n, s, e);
      if (!rs.length) continue;
      // разрыв внутри слова
      if (wd.length > 1 && rs.length > 1) {
        let prev = null;
        for (let k = s; k < e; k++) {
          const r = rectOf(n, k, k + 1)[0];
          if (!r) continue;
          if (prev !== null && r.top > prev + 2 && L.test(t[k - 1]) && L.test(t[k])) { res.push('разрыв: ' + wd); break; }
          prev = r.top;
        }
      }
      // висячее короткое слово: следующее слово этого же текста начинается на строке ниже
      const bare = wd.replace(/^[«“"(\[¿¡]+/, '').toLowerCase();
      if (i + 1 < words.length && short.has(bare) && /[\p{L}\p{N}]$/u.test(wd)) {
        const nx = rectOf(n, words[i + 1].s, words[i + 1].s + 1)[0];
        const last = rs[rs.length - 1];
        if (nx && nx.top > last.top + 2) {
          // склеенная цепочка: короткие слова подряд до первого обычного («не на перевод.», «There is no password»).
          // Висячее слово — ошибка, только если вся цепочка помещается в строку блока; иначе склейку снимает
          // tools/unglue.js, и целое слово важнее склейки (решение 22.11: раскладка → снять склейку → WordFit).
          const isShort = (x) => short.has(x.replace(/^[«“"(\[¿¡]+/, '').toLowerCase()) && /[\p{L}\p{N}]$/u.test(x);
          let j = i, k = i + 1;
          while (j > 0 && isShort(words[j - 1].w)) j--;
          while (k < words.length - 1 && isShort(words[k].w)) k++;
          let b = el;
          while (b && getComputedStyle(b).display.startsWith('inline')) b = b.parentElement;
          const bs = getComputedStyle(b);
          const avail = b.clientWidth - parseFloat(bs.paddingLeft) - parseFloat(bs.paddingRight);
          let chain = 0;
          for (let q = j; q <= k; q++) chain += rectOf(n, words[q].s, words[q].e).reduce((a, r) => a + r.width, 0) + (q > j ? spaceW(el) : 0);
          // TOL: цепочка впритык к ширине строки (±TOL px) — пограничный случай; метрики шрифта на раннере CI и локально
          // расходятся на 1–2 px, и unglue может честно снять склейку. Ошибка — только если цепочка заметно короче строки.
          if (chain <= avail - TOL) res.push('висит: ' + wd + ' ' + words[i + 1].w);
        }
      }
    }
  }
  return [...new Set(res)];
};

(async () => {
  const b = await chromium.launch({args: ['--font-render-hinting=none']});
  const found = [];
  for (const [d, [w, h]] of Object.entries(DEV)) {
    const p = await b.newPage({viewport: {width: w, height: h}});
    for (const pg of list) for (const t of ['n', 'ax5']) for (const l of ['ru', 'es', 'en']) {
      await p.goto('file://' + path.join(DIR, pg) + `?d=${d}&t=${t}&l=${l}`);
      await p.evaluate(() => document.fonts.ready);
      // страницы с WordFit ставят body[data-ready], tools/unglue.js — html[data-unglued]; без них — короткая пауза
      await p.waitForFunction(() => (document.body.dataset.ready || !/wordFit|data-ready|dataset\.ready/.test(document.documentElement.innerHTML))
        && (document.documentElement.dataset.unglued || !document.querySelector('script[src$="unglue.js"]')), null, {timeout: 5000}).catch(() => {});
      await p.waitForTimeout(150);
      for (const x of await p.evaluate(probe, {doHov, doWbr, W, TOL: 3})) found.push(`${pg} ${d}-${t}-${l} | ${x}`);
    }
    await p.close();
  }
  await b.close();
  found.forEach((x) => console.log(x));
  console.log(`redesign: находок — ${found.length} (страниц ${list.length} × se/max × n/ax5 × ru/es/en; ${[doHov && 'вылеты', doWbr && 'разрывы и висячие слова'].filter(Boolean).join(', ')})`);
  process.exit(found.length ? 1 : 0);
})();
