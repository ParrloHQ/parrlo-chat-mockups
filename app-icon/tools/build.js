// Иконка приложения Parrlo Chat — 3 варианта × светлая / тёмная / tinted (iOS 18+), 1024×1024 без прозрачности и скруглений.
// Попугай — знак Parrlo из макетов (redesign-ios/tools/build.js, PARROT_INNER, сетка 1024). Палитра брендбука v2:
// #00875C (зелёный), #2BC48A (светло-зелёный), #12161C (фон мессенджера), белый.
//   node app-icon/tools/build.js   → app-icon/png/*.png и листы-примеры app-icon/png/_*.png
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '../png');
fs.mkdirSync(OUT, { recursive: true });

const G = '#00875C', LG = '#2BC48A', D = '#12161C', W = '#FFFFFF', MINT = '#E8F8F1', INK = '#0E1116';
let gid = 0;
// Попугай — как в иконке Parrlo (Translate, app-icon/ref/): голова-облачко, глаз с бликом, клюв, улыбка. Сетка 1024.
// o: body ('grad' — градиент как у Parrlo, или цвет), eye, beak, smile; t — transform
const parrot = (o, t) => {
  const id = 'g' + (gid++);
  const body = o.body === 'grad' ? `url(#${id})` : o.body;
  return `<g transform="${t}"><defs><linearGradient id="${id}" x1="0.1" y1="0.1" x2="0.9" y2="0.9"><stop offset="0" stop-color="#17AD6A"/><stop offset="1" stop-color="#6DD87A"/></linearGradient></defs>
<path d="M240 800 L240 520 A280 280 0 1 1 520 800 Z" fill="${body}"/>
<circle cx="560" cy="430" r="52" fill="${o.eye}"/><circle cx="575" cy="413" r="16" fill="${o.glint || W}"/>
<path d="M740 430 C 800 445 835 480 825 530 C 820 560 815 580 810 600 C 785 555 750 530 700 540 Z" fill="${o.beak}"/>
<path d="M328 637 Q 390 685 452 637" fill="none" stroke="${o.smile}" stroke-width="26" stroke-linecap="round"/></g>`;
};
// облачко чата: скруглённый прямоугольник + хвостик (side: 'l' — снизу слева, 'r' — снизу справа)
const bubble = (x, y, w, h, r, fill, side = 'l') => {
  const k = Math.min(h, w) * 0.22;
  const tail = side === 'l'
    ? `M${x + k * 0.6} ${y + h - k * 1.6} L${x - k * 0.15} ${y + h + k * 0.35} L${x + k * 1.9} ${y + h - 1} Z`
    : `M${x + w - k * 0.6} ${y + h - k * 1.6} L${x + w + k * 0.15} ${y + h + k * 0.35} L${x + w - k * 1.9} ${y + h - 1} Z`;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/><path d="${tail}" fill="${fill}" stroke="${fill}" stroke-width="${k * 0.18}" stroke-linejoin="round"/>`;
};
const dots = (cx, cy, gap, r, fill) => [-1, 0, 1].map((k) => `<circle cx="${cx + k * gap}" cy="${cy}" r="${r}" fill="${fill}"/>`).join('');
const svg = (bg, inner) => `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><rect width="1024" height="1024" fill="${bg}"/>${inner}</svg>`;
const P = { body: 'grad', eye: INK, beak: INK, smile: W };
const PD = { body: 'grad', eye: INK, beak: MINT, smile: W };            // как тёмная иконка Parrlo
const PT = { body: '#D8D8D8', eye: '#000', beak: '#6E6E6E', smile: '#000' }; // tinted — оттенки серого
const TA = 'translate(0 215) scale(0.76)';
const BA = [540, 120, 380, 265, 132], DA = [730, 252, 86, 31]; // облачко A крупнее — чтобы отличалось от Parrlo в 29 pt и в папке
// A — как Parrlo (мятный фон) + тёмное облачко «…» сверху справа. Ближе всего к Parrlo — почти его копия.
const A = {
  name: 'A · попугай Parrlo с облачком «…» — выбор Мурата 22.11',
  light: svg(MINT, parrot(P, TA) + bubble(...BA, INK, 'l') + dots(...DA, MINT)),
  dark: svg(INK, parrot(PD, TA) + bubble(...BA, MINT, 'l') + dots(...DA, INK)),
  tinted: svg('#000', parrot(PT, TA) + bubble(...BA, '#8A8A8A', 'l') + dots(...DA, '#000')),
};
// B — фон мессенджера #12161C во всех режимах, попугай Parrlo и зелёное облачко «…»
const B = {
  name: 'B · фон мессенджера #12161C, попугай и зелёное облачко «…»',
  light: svg(D, parrot(PD, TA) + bubble(600, 160, 310, 215, 108, G, 'l') + dots(755, 268, 72, 25, W)),
  dark: svg('#000', parrot(PD, TA) + bubble(600, 160, 310, 215, 108, G, 'l') + dots(755, 268, 72, 25, W)),
  tinted: svg('#000', parrot(PT, TA) + bubble(600, 160, 310, 215, 108, '#8A8A8A', 'l') + dots(755, 268, 72, 25, '#000')),
};
// C — два облачка на зелёном: попугай-облачко белым силуэтом и мятное облачко-ответ (хвост вправо)
const TC = 'translate(-10 200) scale(0.78)';
const C = {
  name: 'C · два облачка: белый силуэт попугая и облачко-ответ',
  light: svg(G, bubble(470, 150, 400, 300, 150, LG, 'r') + parrot({ body: W, eye: INK, beak: INK, smile: G }, TC)),
  dark: svg(INK, bubble(470, 150, 400, 300, 150, G, 'r') + parrot({ body: W, eye: INK, beak: INK, smile: G }, TC)),
  tinted: svg('#000', bubble(470, 150, 400, 300, 150, '#6E6E6E', 'r') + parrot({ body: '#E0E0E0', eye: '#000', beak: '#000', smile: '#6E6E6E' }, TC)),
};
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1024, height: 1024 } });
  const shot = async (s, file) => { await p.setContent(`<html><body style="margin:0">${s}</body></html>`); await p.locator('svg').screenshot({ path: path.join(OUT, file), omitBackground: false }); };
  for (const [k, v] of Object.entries({ A, B, C })) for (const m of ['light', 'dark', 'tinted']) await shot(v[m], `${k}-${m}.png`);
  // листы-примеры
  const img = (f) => 'file://' + path.resolve(OUT, f);
  const ico = (f, s) => `<img src="${img(f)}" style="width:${s}px;height:${s}px;border-radius:${s * 0.2237}px;display:block">`;
  const refOf = (m) => '../ref/translate-AppIcon-1024' + (m === 'light' ? '' : '-' + m) + '.png';
  const app = (f, label, s, ink) => `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:${s + 16}px">${ico(f, s)}<span style="font:500 12px/1.2 Inter;color:${ink};text-align:center;white-space:nowrap">${label}</span></div>`;
  const ph = (s, c) => `<div style="width:${s}px;height:${s}px;border-radius:${s * 0.2237}px;background:${c}"></div>`;
  const home = (k, m, bg, ink) => `<div style="background:${bg};border-radius:28px;padding:22px 18px;display:flex;gap:18px;align-items:flex-start">${app(refOf(m), 'Parrlo', 60, ink)}${app(`${k}-${m}.png`, 'Parrlo Chat', 60, ink)}<div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:76px">${ph(60, '#5B7FA6')}<span style="font:500 12px Inter;color:${ink}">Почта</span></div><div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:76px">${ph(60, '#E0A23B')}<span style="font:500 12px Inter;color:${ink}">Заметки</span></div></div>`;
  const folder = (k, m, bg, ink) => `<div style="background:${bg};border-radius:28px;padding:22px 18px;display:flex;flex-direction:column;align-items:center;gap:6px"><div style="width:60px;height:60px;border-radius:14px;background:rgba(255,255,255,.28);backdrop-filter:blur(8px);display:grid;grid-template-columns:repeat(3,14px);gap:4px;padding:6px;box-sizing:border-box;justify-content:center;align-content:center">${ico(refOf(m), 14)}${ico(`${k}-${m}.png`, 14)}${ph(14, '#5B7FA6')}${ph(14, '#E0A23B')}${ph(14, '#8E8E93')}${ph(14, '#C04B4B')}</div><span style="font:500 12px Inter;color:${ink}">Общение</span></div>`;
  const open = (k, m) => `<div style="background:rgba(40,40,46,.92);border-radius:36px;padding:22px;display:grid;grid-template-columns:repeat(3,76px);gap:14px 10px">${app(refOf(m), 'Parrlo', 60, '#fff')}${app(`${k}-${m}.png`, 'Parrlo Chat', 60, '#fff')}<div style="display:flex;flex-direction:column;align-items:center;gap:6px">${ph(60, '#5B7FA6')}<span style="font:500 12px Inter;color:#fff">Почта</span></div></div>`;
  const row = (f, label, dark) => `<div style="display:flex;align-items:center;gap:12px;padding:8px 14px;border-top:.5px solid ${dark ? '#2C2C2E' : '#E5E5EA'}">${ico(f, 29).replace('display:block', 'display:block;border-radius:6.5px')}<span style="font:400 17px Inter;color:${dark ? '#fff' : '#000'}">${label}</span><span style="margin-left:auto;color:#8E8E93;font:400 17px Inter">›</span></div>`;
  const list = (k, m, dark) => `<div style="background:${dark ? '#1C1C1E' : '#fff'};border-radius:12px;overflow:hidden;width:300px">${row(refOf(m), 'Parrlo', dark).replace('border-top:', 'border-top:0;x:')}${row(`${k}-${m}.png`, 'Parrlo Chat', dark)}</div>`;
  const WP_L = 'linear-gradient(160deg,#BFD9F2,#F3D7C4)', WP_D = 'linear-gradient(160deg,#1B2533,#3A2A35)';
  const sheet = (k, v) => `<!doctype html><html><head><meta charset="utf-8"><style>@font-face{font-family:Inter;src:url(file://${path.resolve(__dirname, '../../fonts/Inter-Variable.woff2')})}body{margin:0;background:#0D0F12;color:#E8ECF1;font:14px Inter;padding:28px;width:1040px}h1{font:700 24px Inter;margin:0 0 4px}h2{font:600 14px Inter;color:#9AA4B2;margin:22px 0 10px}.r{display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap}.big img{width:180px;height:180px;display:block}.cap{font:12px Inter;color:#9AA4B2;margin-top:6px}</style></head><body>
<h1>Parrlo Chat — иконка, вариант ${v.name}</h1><div class="cap">Слева на экранах — Parrlo: оригинал иконки из parrlo-app (app-icon/ref/). Скругление — маска iOS, в файле 1024×1024 без скруглений и прозрачности.</div>
<h2>1024 → светлая · тёмная · tinted (iOS 18+)</h2><div class="r big">${['light', 'dark', 'tinted'].map((m) => `<div><img src="${img(`${k}-${m}.png`)}"><div class="cap">${m}</div></div>`).join('')}</div>
<h2>Домашний экран, 60 pt — светлая и тёмная</h2><div class="r">${home(k, 'light', WP_L, '#000')}${home(k, 'dark', WP_D, '#fff')}</div>
<h2>Tinted (iOS 18+), 60 pt</h2><div class="r">${home(k, 'tinted', WP_D, '#fff')}</div>
<h2>Папка: значок папки и папка открыта</h2><div class="r">${folder(k, 'light', WP_L, '#000')}${folder(k, 'dark', WP_D, '#fff')}${open(k, 'dark')}</div>
<h2>29 pt — Настройки, поиск</h2><div class="r">${list(k, 'light', false)}${list(k, 'dark', true)}</div>
</body></html>`;
  const p2 = await b.newPage({ viewport: { width: 1100, height: 800 }, deviceScaleFactor: 2 });
  for (const [k, v] of Object.entries({ A, B, C })) {
    const f = path.join(OUT, `_sheet-${k}.html`);
    fs.writeFileSync(f, sheet(k, v));
    await p2.goto('file://' + f); await p2.evaluate(() => document.fonts.ready); await p2.waitForTimeout(200);
    await p2.screenshot({ path: path.join(OUT, `_sheet-${k}.png`), fullPage: true });
    fs.unlinkSync(f);
  }
  await b.close();
  console.log('ok');
})();
