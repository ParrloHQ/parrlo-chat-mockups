// Рендер PNG: node redesign-ios/contacts-calls/tools/render.js [экран …]
// png/<экран>__<se|max>-<n|ax5>-<ru|es|en>.png (×2) + png/_overview-ru.png.
// Проверка на каждом кадре: (1) текст не вылезает за свой блок (scrollWidth > clientWidth) и за край экрана;
// (2) ни одно слово не разорвано между строками (разрыв между двумя буквами/цифрами).
const { chromium } = require('playwright');
const path = require('path');
const DIR = path.resolve(__dirname, '..');
const ALL = require('./screens.js');
const screens = process.argv.length > 2 ? process.argv.slice(2) : ALL;
const dev = { se: [375, 667], max: [440, 956] };

const check = () => {
  const scr = document.querySelector('.screen'), W = scr.getBoundingClientRect();
  const rg = document.createRange(), L = /[\p{L}\p{N}]/u, out = [];
  const els = [...scr.querySelectorAll('*')].filter(e => !e.closest('.sb,svg') && [...e.childNodes].some(n => n.nodeType === 3 && /\S/.test(n.textContent)));
  for (const e of els) {
    const cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    let p = e.parentElement; if (cs.display === 'inline') while (p && getComputedStyle(p).display === 'inline') p = p.parentElement;
    const pcs = getComputedStyle(p), boxR = p.getBoundingClientRect().right - parseFloat(pcs.paddingRight) - parseFloat(pcs.borderRightWidth);
    const name = (e.className || e.tagName) + ' «' + e.textContent.trim().slice(0, 36) + '»';
    if (cs.display !== 'inline' && e.clientWidth > 0 && e.scrollWidth > e.clientWidth + 1) out.push('переполнение ' + name);
    if (cs.display === 'inline' && [...e.getClientRects()].some(q => q.width && q.right > boxR + 1)) out.push('пилюля за краем блока ' + name);
    for (const n of e.childNodes) {
      if (n.nodeType !== 3) continue;
      const t = n.textContent, re = /\S+/g; let m;
      while ((m = re.exec(t))) {
        rg.setStart(n, m.index); rg.setEnd(n, m.index + m[0].length);
        const rs = [...rg.getClientRects()].filter(r => r.width);
        if (rs.some(r => r.right > W.right + 1 || r.left < W.left - 1)) out.push('за краем экрана ' + name + ' [' + m[0] + ']');
        else if (rs.some(r => r.right > boxR + 1)) out.push('за краем блока ' + name + ' [' + m[0] + ']');

        if (rs.length < 2 || m[0].length < 2) continue;
        let prev = null;
        for (let i = 0; i < m[0].length; i++) {
          rg.setStart(n, m.index + i); rg.setEnd(n, m.index + i + 1);
          const r = rg.getClientRects()[0];
          if (!r || !r.width) continue;
          if (prev !== null && r.top > prev + 2 && L.test(m[0][i - 1]) && L.test(m[0][i])) { out.push('слово разорвано ' + name + ' [' + m[0] + ']'); break; }
          prev = r.top;
        }
      }
    }
  }
  const wf = [...scr.querySelectorAll('[data-wf]')].map(e => e.textContent.trim().slice(0, 24) + ' → ' + Math.round(parseFloat(e.style.fontSize)) + 'px');
  return { out: [...new Set(out)], wf };
};

(async () => {
  const b = await chromium.launch();
  const issues = [], wfs = [];
  const jobs = [];
  for (const s of screens) for (const [d, [w, h]] of Object.entries(dev)) for (const t of ['n', 'ax5']) for (const l of ['ru', 'es', 'en']) jobs.push({ s, d, w, h, t, l });
  let n = 0;
  const worker = async () => {
    const pages = {};
    while (jobs.length) {
      const j = jobs.shift();
      const key = j.d;
      if (!pages[key]) pages[key] = await b.newPage({ viewport: { width: j.w, height: j.h }, deviceScaleFactor: 2 });
      const p = pages[key];
      await p.goto(`file://${DIR}/${j.s}.html?d=${j.d}&t=${j.t}&l=${j.l}`);
      await p.waitForFunction(() => document.body.dataset.ready === '1');
      const r = await p.evaluate(check);
      const tag = `${j.s} ${j.d}-${j.t}-${j.l}`;
      if (r.out.length) issues.push(tag + ': ' + r.out.join(' | '));
      if (r.wf.length) wfs.push(tag + ': ' + r.wf.join('; '));
      await p.locator('.screen').screenshot({ path: `${DIR}/png/${j.s}__${j.d}-${j.t}-${j.l}.png` });
      n++;
    }
    for (const p of Object.values(pages)) await p.close();
  };
  await Promise.all([worker(), worker(), worker(), worker()]);
  if (process.argv.length <= 2) {
    const p = await b.newPage({ viewport: { width: 2080, height: 900 }, deviceScaleFactor: 1 });
    await p.goto('file://' + DIR + '/index.html'); await p.waitForLoadState('networkidle');
    await p.screenshot({ path: DIR + '/png/_overview-ru.png', fullPage: true });
  }
  await b.close();
  console.log('кадров: ' + n);
  console.log(wfs.length ? 'WordFit уменьшил кегль (AX5, не ниже 28):\n' + wfs.join('\n') : 'WordFit: уменьшать не пришлось');
  console.log(issues.length ? 'ПРОБЛЕМЫ:\n' + issues.join('\n') : 'проверка: переполнений и разорванных слов нет');
})();
