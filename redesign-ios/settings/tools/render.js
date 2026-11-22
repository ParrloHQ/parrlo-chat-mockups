// Рендер PNG + проверки: node redesign-ios/settings/tools/render.js [экран ...]
// Проверки на каждом кадре:
//  1) переполнение: текст шире своего блока (scrollWidth > clientWidth) или блок вылезает за правый край родителя / экрана;
//  2) разрыв слова: любое слово, чьи прямоугольники лежат на двух строках.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const DIR = path.resolve(__dirname, '..');
const ALL = ['settings', 'settings-account', 'settings-account-logout', 'settings-account-delete', 'settings-account-delete-confirm', 'settings-account-delete-error', 'settings-account-deleted', 'settings-name', 'settings-language', 'settings-notifications', 'settings-notifications-blocked', 'settings-about', 'settings-save-error', 'plans', 'usage', 'usage-limit', 'usage-limit-week', 'usage-reset'];
const screens = process.argv.length > 2 ? process.argv.slice(2) : ALL;
const dev = { se: [375, 667], max: [440, 956] };

const CHECK = () => {
  const s = document.querySelector('.screen'), S = s.getBoundingClientRect(), out = [];
  const label = (e) => (e.className && e.className.baseVal === undefined ? '.' + String(e.className).split(' ')[0] : e.tagName.toLowerCase()) + ' «' + e.textContent.trim().slice(0, 36) + '»';
  const own = (e) => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
  for (const e of s.querySelectorAll('*')) {
    if (e.closest('svg') || e.closest('.sb')) continue;
    const cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    if (own(e) && cs.display !== 'inline' && cs.overflow === 'visible' && e.clientWidth > 0 && e.scrollWidth > e.clientWidth + 1)
      out.push('переполнение ' + label(e) + ` ${e.scrollWidth}>${e.clientWidth}`);
    if (own(e)) {
      const r = e.getBoundingClientRect();
      if (r.width && (r.right > S.right + 0.5 || r.left < S.left - 0.5)) out.push('за краем экрана ' + label(e));
      const p = e.parentElement.closest(':not(span):not(b):not(a):not(i)');
      if (p && cs.display !== 'inline') { const pr = p.getBoundingClientRect(); if (r.right > pr.right + 1) out.push('шире родителя ' + label(e)); }
    }
  }
  // разрыв слова
  const w = document.createTreeWalker(s, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = w.nextNode())) {
    if (n.parentElement.closest('svg,.sb,template')) continue;
    const t = n.textContent, re = /\S+/g; let m;
    while ((m = re.exec(t))) {
      const rg = document.createRange(); rg.setStart(n, m.index); rg.setEnd(n, m.index + m[0].length);
      const tops = new Set([...rg.getClientRects()].filter(r => r.width > 0.5).map(r => Math.round(r.top)));
      if (tops.size > 1) out.push('разрыв слова «' + m[0] + '»');
    }
  }
  const fit = [...s.querySelectorAll('[data-fit]')].map(e => label(e) + ' ×0.92^' + e.dataset.fit + ' → ' + Math.round(parseFloat(e.style.fontSize)) + 'px');
  return { out, fit };
};

(async () => {
  fs.mkdirSync(DIR + '/png', { recursive: true });
  const b = await chromium.launch();
  const issues = [], fits = [];
  let count = 0;
  for (const [d, [w, h]] of Object.entries(dev)) for (const t of ['n', 'ax5']) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    for (const sc of screens) for (const l of ['ru', 'es', 'en']) {
      await p.goto(`file://${DIR}/${sc}.html?d=${d}&t=${t}&l=${l}`);
      await p.waitForFunction(() => document.body.dataset.ready === '1');
      const { out, fit } = await p.evaluate(CHECK);
      const tag = `${sc}__${d}-${t}-${l}`;
      if (out.length) issues.push(tag + ': ' + [...new Set(out)].join(' | '));
      if (fit.length) fits.push(tag + ': ' + fit.join('; '));
      await p.locator('.screen').screenshot({ path: `${DIR}/png/${tag}.png` });
      count++;
    }
    await p.close();
  }
  if (screens.length === ALL.length) {
    const p = await b.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
    await p.goto('file://' + DIR + '/index.html'); await p.waitForLoadState('networkidle');
    await p.screenshot({ path: DIR + '/png/_overview-ru.png', fullPage: true });
    await p.close();
  }
  await b.close();
  console.log('PNG:', count);
  console.log(fits.length ? 'Подгонка слов на AX5 (wordfit):\n' + fits.join('\n') : 'wordfit: не понадобился');
  console.log(issues.length ? 'ПРОБЛЕМЫ:\n' + issues.join('\n') : 'переполнений и разрывов слов нет');
})();
