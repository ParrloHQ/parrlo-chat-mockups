// Рендер PNG: node redesign-ios/tools/render.js
const { chromium } = require('playwright');
const path = require('path');
const DIR = path.resolve(__dirname, '..');
const screens = ['s1-chats', 's1-swipe-l', 's1-swipe-r', 's2-chat-A', 's3-parrlo', 's3-menu'];
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
  // ---------- таб-бар: кадры для разработчика кнопки Parrlo (png/tabbar/) ----------
  const TB = DIR + '/png/tabbar';
  require('fs').mkdirSync(TB, { recursive: true });
  const tabIssues = [];
  // подпись вкладки не должна вылезать за свою ячейку
  const tabCheck = (pg, tag) => pg.evaluate(() => [...document.querySelectorAll('.tabs a, .tabs a span')]
    .filter(e => e.scrollWidth > e.clientWidth || (e.tagName === 'SPAN' && e.getBoundingClientRect().width > e.parentElement.getBoundingClientRect().width))
    .map(e => e.textContent.trim()))
    .then(bad => { if (bad.length) tabIssues.push(tag + ': ' + bad.join(', ')); return bad; });
  const shot = async (url, w, h, file, clip) => {
    const pg = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    await pg.goto('file://' + DIR + '/' + url);
    await pg.evaluate(() => document.fonts.ready);
    await tabCheck(pg, file);
    if (clip) await pg.screenshot({ path: TB + '/' + file, clip });
    else await pg.locator('.screen').screenshot({ path: TB + '/' + file });
    await pg.close();
  };
  for (const [d, [w, h]] of Object.entries(dev)) for (const th of ['dark', 'light']) for (const t of ['n', 'ax5']) {
    await shot(`s1-chats.html?d=${d}&th=${th}&t=${t}`, w, h, `s1__${d}-${th}-${t}.png`);
    await shot(`s3-parrlo.html?d=${d}&th=${th}&t=${t}`, w, h, `s3__${d}-${th}-${t}.png`);
  }
  await shot('s4-kbd.html?d=se&th=dark&t=n', 375, 667, 'kbd__se-dark-n.png');
  await shot('s4-kbd.html?d=max&th=light&t=n', 440, 956, 'kbd__max-light-n.png');
  const langRep = [];
  for (const l of ['ru', 'es', 'en']) {
    const pg = await b.newPage({ viewport: { width: 375, height: 667 }, deviceScaleFactor: 2 });
    await pg.goto('file://' + DIR + `/s1-chats.html?d=se&th=dark&t=n&l=${l}`);
    await pg.evaluate(() => document.fonts.ready);
    const m = await pg.evaluate(() => [...document.querySelectorAll('.tabs a:not(.pc)')].map(a => { const s = a.querySelector('span');
      return `${s.textContent} ${Math.ceil(s.getBoundingClientRect().width)}/${a.clientWidth} (scroll ${a.scrollWidth})`; }));
    const bad = await tabCheck(pg, 'tabs-' + l);
    langRep.push(`${l}: ${bad.length ? 'ПЕРЕПОЛНЕНИЕ ' + bad.join(', ') : 'ок'} — ${m.join('; ')}`);
    await pg.screenshot({ path: `${TB}/tabs-${l}__se.png`, clip: { x: 0, y: 667 - 140, width: 375, height: 140 } });
    await pg.close();
  }
  {
    const pg = await b.newPage({ viewport: { width: 1720, height: 900 }, deviceScaleFactor: 2 });
    await pg.goto('file://' + DIR + '/tabbar-spec.html');
    await pg.waitForFunction(() => document.body.dataset.ready === '1');
    await pg.screenshot({ path: TB + '/_spec.png', fullPage: true });
    await pg.close();
  }
  console.log('подписи таб-бара (ширина подписи / ширина ячейки):\n' + langRep.join('\n'));
  console.log(tabIssues.length ? 'ТАБ-БАР, ПЕРЕПОЛНЕНИЕ:\n' + tabIssues.join('\n') : 'таб-бар: ни одна подпись не вылезает за ячейку (все кадры png/tabbar)');

  const p = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 });
  await p.goto('file://' + DIR + '/index.html'); await p.waitForLoadState('networkidle');
  await p.screenshot({ path: DIR + '/png/_overview.png', fullPage: true });
  await b.close();
  console.log(issues.length ? 'ПЕРЕПОЛНЕНИЕ:\n' + issues.join('\n') : 'переполнений нет');
})();
