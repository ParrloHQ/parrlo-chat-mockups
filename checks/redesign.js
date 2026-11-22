// Проверка макетов редизайна iOS (redesign-ios/**): каждая страница × SE/Pro Max × обычный/AX5 × ru/es/en.
//   node checks/redesign.js [--hov] [--wbr] [страница …]   — без флагов обе проверки; страница — путь от redesign-ios, напр. s1-chats.html
// --hov: текст выходит за край экрана (по X).
// --wbr: слово разорвано между строками (перенос между двумя буквами/цифрами) или короткое служебное слово
//        (redesign-ios/tools/short-words.json) осталось в конце строки — висячий предлог/союз.
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

const probe = ({doHov, doWbr, W}) => {
  const res = [];
  const SH = {};
  for (const l of ['ru', 'es', 'en']) SH[l] = new Set((W[l] || []).map((w) => w.toLowerCase()));
  const L = /[\p{L}\p{N}]/u;
  const vw = document.documentElement.clientWidth;
  const rg = document.createRange();
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
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
      const bare = wd.replace(/^[«“"(¿¡]+/, '').toLowerCase();
      if (i + 1 < words.length && short.has(bare) && /[\p{L}\p{N}]$/u.test(wd)) {
        const nx = rectOf(n, words[i + 1].s, words[i + 1].s + 1)[0];
        const last = rs[rs.length - 1];
        if (nx && nx.top > last.top + 2) res.push('висит: ' + wd + ' ' + words[i + 1].w);
      }
    }
  }
  return [...new Set(res)];
};

(async () => {
  const b = await chromium.launch();
  const found = [];
  for (const [d, [w, h]] of Object.entries(DEV)) {
    const p = await b.newPage({viewport: {width: w, height: h}});
    for (const pg of list) for (const t of ['n', 'ax5']) for (const l of ['ru', 'es', 'en']) {
      await p.goto('file://' + path.join(DIR, pg) + `?d=${d}&t=${t}&l=${l}`);
      await p.evaluate(() => document.fonts.ready);
      // страницы с WordFit ставят body[data-ready]; без него — короткая пауза
      await p.waitForFunction(() => document.body.dataset.ready || !/wordFit|data-ready|dataset\.ready/.test(document.documentElement.innerHTML), null, {timeout: 5000}).catch(() => {});
      await p.waitForTimeout(150);
      for (const x of await p.evaluate(probe, {doHov, doWbr, W})) found.push(`${pg} ${d}-${t}-${l} | ${x}`);
    }
    await p.close();
  }
  await b.close();
  found.forEach((x) => console.log(x));
  console.log(`redesign: находок — ${found.length} (страниц ${list.length} × se/max × n/ax5 × ru/es/en; ${[doHov && 'вылеты', doWbr && 'разрывы и висячие слова'].filter(Boolean).join(', ')})`);
  process.exit(found.length ? 1 : 0);
})();
