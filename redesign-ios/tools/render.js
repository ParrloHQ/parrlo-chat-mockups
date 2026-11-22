// Рендер PNG: node redesign-ios/tools/render.js
const { chromium } = require('playwright');
const path = require('path');
const DIR = path.resolve(__dirname, '..');
const screens = ['s1-chats', 's2-chat-A', 's2-chat-B', 's3-parrlo', 's3-menu'];
const dev = { se: [375, 667], max: [440, 956] };
(async () => {
  const b = await chromium.launch();
  const issues = [];
  for (const [d, [w, h]] of Object.entries(dev)) for (const t of ['n', 'ax5']) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    for (const s of screens) {
      await p.goto('file://' + DIR + '/' + s + '.html?d=' + d + '&t=' + t);
      await p.evaluate(() => document.fonts.ready);
      // проверка: слово шире своего контейнера (переполнение) — значит, оно не помещается
      await p.addStyleTag({content:'.b::after{display:none!important}'}).then(h=>h.evaluate(e=>e.id='chk'));
      const bad = await p.evaluate(() => [...document.querySelectorAll('.b, .b *, .row *, .menu *, .nav *, .field, .search, .large')]
        .filter(e => e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).overflow !== 'hidden' && e.clientWidth > 0)
        .map(e => e.className.baseVal !== undefined ? '' : (e.className + ': ' + e.textContent.slice(0, 40))).filter(Boolean));
      await p.evaluate(() => document.getElementById('chk').remove());
      if (bad.length) issues.push(`${s} ${d}-${t}: ${bad.join(' | ')}`);
      await p.locator('.screen').screenshot({ path: `${DIR}/png/${s}__${d}-${t}.png` });
    }
    await p.close();
  }
  const p = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 });
  await p.goto('file://' + DIR + '/index.html'); await p.waitForLoadState('networkidle');
  await p.screenshot({ path: DIR + '/png/_overview.png', fullPage: true });
  await b.close();
  console.log(issues.length ? 'ПЕРЕПОЛНЕНИЕ:\n' + issues.join('\n') : 'переполнений нет');
})();
