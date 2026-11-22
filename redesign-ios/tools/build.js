// Генератор статических страниц редизайна. Запуск: node redesign-ios/tools/build.js
// Страница принимает ?d=se|max и ?t=n|ax5 (устройство и размер текста).
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '..');

const PARROT_INNER = '<defs><mask id="pc-pmk" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024"><rect width="1024" height="1024" fill="#fff"/><circle cx="612" cy="372" r="44" fill="#000"/><path d="M735 322 L 895 322 A160 160 0 0 1 735 482 Z" fill="#000" stroke="#000" stroke-width="28" stroke-linejoin="round"/></mask></defs><g mask="url(#pc-pmk)"><path d="M345 800 L 235 925 L 420 895 Z" stroke="currentColor" stroke-width="70" stroke-linejoin="round"/><circle cx="500" cy="640" r="245"/><circle cx="560" cy="395" r="235"/></g><path d="M735 322 L 895 322 A160 160 0 0 1 735 482 Z"/>';
let pid = 0;
const parrot = () => { const id = 'pc-pmk' + (pid++); return `<svg class="ic ic-parrot" viewBox="180 140 735 840" aria-hidden="true" focusable="false">${PARROT_INNER.replace(/pc-pmk/g, id)}</svg>`; };

const P = {
  back: '<path d="M14.5 5.5L8 12l6.5 6.5"/>',
  more: '<circle cx="6" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1.6" fill="currentColor" stroke="none"/>',
  clip: '<path d="M20 11.5l-8.3 8.3a4.8 4.8 0 01-6.8-6.8l8.6-8.6a3.2 3.2 0 014.5 4.5l-8.4 8.4a1.6 1.6 0 01-2.3-2.3l7.7-7.7"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21"/>',
  smile: '<circle cx="12" cy="12" r="8.5"/><path d="M8.6 14.2a4.4 4.4 0 006.8 0"/><circle cx="9.3" cy="10" r=".9" fill="currentColor" stroke="none"/><circle cx="14.7" cy="10" r=".9" fill="currentColor" stroke="none"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.8-4.8"/>',
  compose: '<path d="M12 4.5H6.5a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2V12"/><path d="M17.6 3.9a2 2 0 012.8 2.8L12.5 14.6l-3.7.9.9-3.7z"/>',
  contacts: '<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.3-3.6 4.2-5.6 7.5-5.6s6.2 2 7.5 5.6"/>',
  calls: '<path d="M6.2 3.8h3l1.6 4.2-2 1.3a10.5 10.5 0 005.9 5.9l1.3-2 4.2 1.6v3a2 2 0 01-2.2 2A16.5 16.5 0 014.2 6a2 2 0 012-2.2z"/>',
  chats: '<path d="M12 3.8c4.8 0 8.6 3.3 8.6 7.4s-3.8 7.4-8.6 7.4c-1 0-2-.1-2.9-.4L5 20l1-3.6c-1.6-1.4-2.6-3.2-2.6-5.2 0-4.1 3.8-7.4 8.6-7.4z"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.8l1.6 2.3 2.7-.6.6 2.7 2.4 1.4-1 2.5 1 2.5-2.4 1.4-.6 2.7-2.7-.6L12 21.2l-1.6-2.3-2.7.6-.6-2.7-2.4-1.4 1-2.5-1-2.5 2.4-1.4.6-2.7 2.7.6z"/>',
  pin: '<path d="M9.5 3.5h5l-.8 5.2 3 3H7.3l3-3zM12 11.7V20"/>',
  mute: '<path d="M7 16V11a5 5 0 017.6-4.3M17 10.5V16l1.8 1.8H6M10 20.2a2 2 0 004 0M4 4l16 16"/>',
  people: '<circle cx="9" cy="9" r="3"/><path d="M3.5 18.5c.9-2.8 3-4.3 5.5-4.3s4.6 1.5 5.5 4.3"/><circle cx="16.5" cy="9.5" r="2.4"/><path d="M16.3 14.2c2 .1 3.6 1.4 4.3 3.6"/>',
  memory: '<path d="M7 3.8h10a1 1 0 011 1v15.4l-6-3.9-6 3.9V4.8a1 1 0 011-1z"/>',
  wave: '<path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.2-3.6-8.5S9.6 5.9 12 3.5z"/>',
  tone: '<path d="M5 5.5h14a1.5 1.5 0 011.5 1.5v8.5a1.5 1.5 0 01-1.5 1.5h-7l-4.5 3.5V17H5a1.5 1.5 0 01-1.5-1.5V7A1.5 1.5 0 015 5.5z"/><path d="M8 10.5h8M8 13.5h5"/>',
  bell: '<path d="M6.5 16v-5a5.5 5.5 0 0111 0v5l1.8 1.8H4.7zM10 20.2a2 2 0 004 0"/>',
  help: '<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.6a2.4 2.4 0 014.8 0c0 1.6-2.4 1.9-2.4 3.8"/><circle cx="12" cy="16.6" r=".9" fill="currentColor" stroke="none"/>',
  trash: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l.9 12.5a1 1 0 001 .9h7.2a1 1 0 001-.9L17.5 7M10 11v5.5M14 11v5.5"/>',
};
const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;
const TICK2 = '<svg class="tick" viewBox="0 0 17 11" aria-hidden="true"><path d="M1 6l3.2 3.2L10 2.8"/><path d="M7.6 8.6l.6.6L15.6 1.8"/></svg>';
const TICK1 = '<svg class="tick" viewBox="0 0 17 11" aria-hidden="true"><path d="M3.5 6l3.2 3.2L13 2.4"/></svg>';

// --- паттерн фона B: силуэты попугая, тон-в-тон ~3.5% ---
const PAT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 88 88"><g fill="#fff" fill-opacity=".035"><g transform="translate(10 8) scale(.026)"><circle cx="500" cy="640" r="245"/><circle cx="560" cy="395" r="235"/><path d="M735 322 L 895 322 A160 160 0 0 1 735 482 Z"/><path d="M345 800 L 235 925 L 420 895 Z"/></g><g transform="translate(66 52) scale(-.022 .022)"><circle cx="500" cy="640" r="245"/><circle cx="560" cy="395" r="235"/><path d="M735 322 L 895 322 A160 160 0 0 1 735 482 Z"/><path d="M345 800 L 235 925 L 420 895 Z"/></g><circle cx="60" cy="18" r="1.6"/><circle cx="22" cy="66" r="1.6"/></g></svg>`;
const PATTERN = `url("data:image/svg+xml,${encodeURIComponent(PAT_SVG)}")`;

const statusBar = () => `<div class="sb"><span>9:41</span><i class="island"></i><span class="ri">
<svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
<svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 008 .6 10.4 10.4 0 00.8 3.5L2 4.8a8.6 8.6 0 016-2.4zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.8 6.8 0 008 4.2 6.8 6.8 0 003.4 6l1.2 1.3c.9-.8 2.1-1.3 3.4-1.3zm0 3.5c.4 0 .8.2 1.1.4L8 11.2 6.9 9.9c.3-.2.7-.4 1.1-.4z"/></svg>
<svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="22" height="12" rx="3.5" fill="none" stroke="currentColor" stroke-opacity=".4"/><rect x="2" y="2" width="16" height="9" rx="2" fill="currentColor"/><path d="M24.5 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2z" fill="currentColor" fill-opacity=".4"/></svg></span></div>`;

const tabs = (active) => {
  const items = [['contacts', 'Контакты'], ['calls', 'Звонки'], ['chats', 'Чаты'], ['parrlo', 'Parrlo'], ['gear', 'Настройки']];
  return `<nav class="tabs" aria-label="Разделы">${items.map(([k, l]) => {
    const on = k === active;
    const icon = k === 'parrlo' ? parrot() : ic(k, on && k !== 'gear' ? 'fill' : '');
    return `<a class="${on ? 'on' : ''}">${icon}<span>${l}</span></a>`;
  }).join('')}</nav>`;
};

// --- облачка ---
const meta = (inner) => `<span class="ms" aria-hidden="true">${inner}</span><span class="m">${inner}</span>`;
const bubble = ({ text = '', time, own, ticks = 2, edited, tail, orig, voice, rx, card }) => {
  let m = (edited ? 'изменено ' : '') + time + (own ? (ticks === 2 ? TICK2 : TICK1) : '');
  let body;
  if (voice) {
    const hs = voice.bars;
    body = `<div class="voice"><span class="play"><svg viewBox="0 0 18 18"><path d="M3 1.8v14.4a1 1 0 001.5.9l12-7.2a1 1 0 000-1.8l-12-7.2A1 1 0 003 1.8z"/></svg></span>
<div class="wv"><div class="bars">${hs.map((h, i) => `<i class="${i >= voice.played ? 'r' : ''}" style="height:${h}px"></i>`).join('')}</div><div class="dur">${voice.dur}${meta(m)}</div></div></div>`;
    return `<div class="b ${tail ? 'tail ' + (own ? 'out-t' : 'in-t') : ''}">${body}</div>`;
  }
  if (orig) {
    body = `${text}<div class="orig"><span class="lb">Оригинал</span><p>${orig}${meta(m)}</p></div>`;
  } else if (rx) {
    body = `${text}<div><span class="rx"><span class="e">${rx.e}</span><span class="av" style="background:var(${rx.av})">${rx.i}</span></span>${meta(m)}</div>`;
  } else if (card) {
    body = `${text}<div class="card">${ic('bell')}<div class="tx">${card.t}<span>${card.s}</span></div><span class="btn">Изменить</span></div><div class="cm">${meta(m)}</div>`;
  } else {
    body = `${text}${meta(m)}`;
  }
  return `<div class="b ${tail ? 'tail ' + (own ? 'out-t' : 'in-t') : ''}${card ? ' has-card' : ''}">${body}</div>`;
};
const group = (own, items) => `<div class="grp ${own ? 'out' : 'in'}">${items.map((it, i) => bubble({ ...it, own, tail: i === items.length - 1 })).join('')}</div>`;

const navChat = ({ left, title, sub, right }) => `<header class="nav"><div class="bar">${left}<div class="ttl"><b>${title}</b><span>${sub}</span></div>${right}</div></header>`;
const composer = (onTabs) => `<div class="comp${onTabs ? ' on-tabs' : ''}"><span class="cbtn" aria-label="Вложение">${ic('clip')}</span><div class="field"><span>Сообщение</span>${ic('smile')}</div><span class="cbtn" aria-label="Голосовое">${ic('mic')}</span></div>`;

const page = (title, cls, inner) => `<!doctype html>
<html lang="ru" data-d="max" data-t="n"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><link rel="stylesheet" href="rd.css">
<script>(function(){var q=new URLSearchParams(location.search),h=document.documentElement;h.dataset.d=q.get('d')||'max';h.dataset.t=q.get('t')||'n'})()</script>
</head><body><main class="screen ${cls}" style="--pattern:${PATTERN.replace(/"/g, "'")}">
${statusBar()}
${inner}
<i class="home-ind"></i>
</main></body></html>
`;

// ---------- S1: Чаты ----------
const rows = [
  { av: 'av-1', i: 'L', n: 'Lucía', t: '09:56', p: 'Отлично! Тогда до завтра 🙂', badge: '2' },
  { av: 'av-2', i: 'К', n: 'Квартира', cnt: '12', t: '09:30', p: '<em>Ирина:</em> Завтра с 10 до 12 меняют счётчики воды. Кто будет дома?', muted: true, badge: '5' },
  { av: 'av-3', i: 'М', n: 'Мама', t: '08:12', p: 'Позвони, как сможешь. Ничего срочного&nbsp;🙂', pin: true },
  { av: 'av-0', i: 'M', n: 'Marco', t: 'Вчера', own: true, p: '<em>Ты:</em> Grazie! Адрес пришлю вечером' },
  { av: 'av-2', i: 'П', n: 'Пётр', t: 'Вчера', p: '<em>Фото</em> · Вот это вид с горы', badge: '1' },
  { av: 'av-3', i: 'И', n: 'Ирина', t: 'Пн', p: '<em>Голосовое</em> · 0:42' },
  { av: 'av-0', i: 'Б', n: 'Бег по субботам', cnt: '34', t: 'Вс', p: '<em>Вика:</em> Сбор в 8:00 у входа в парк, бежим 10&nbsp;км', muted: true },
  { av: 'av-1', i: 'Н', n: 'Ник', t: '18.11', own: true, p: '<em>Ты:</em> Ок, до четверга!' },
  { av: 'av-2', i: 'О', n: 'Олег', t: '16.11', p: 'Спасибо за книгу, верну в среду' },
];
const rowHtml = (r) => `<li class="row"><span class="av av52" style="background:var(--${r.av})">${r.i}</span><div class="rb">
<div class="n"><b>${r.n}</b>${r.cnt ? `<span class="cnt">${ic('people')}${r.cnt}</span>` : ''}${r.muted ? ic('mute') : ''}</div>
<div class="t">${r.own ? TICK2 : ''}${r.t}</div>
<div class="p">${r.p}</div>
<div class="x">${r.pin ? ic('pin') : ''}${r.badge ? `<span class="badge${r.muted ? ' mute' : ''}">${r.badge}</span>` : ''}</div></div></li>`;
const s1 = page('Чаты', 'has-tabs', `<div class="head"><div class="bar"><span class="pbtn">Изм.</span><span class="cbtn" aria-label="Новый чат">${ic('compose')}</span></div>
<h1 class="large">Чаты</h1><div class="search">${ic('search')}<span>Поиск</span></div></div>
<ul class="list">${rows.map(rowHtml).join('')}</ul>
${tabs('chats')}`);

// ---------- S2: чат с Lucía ----------
const bars = [8, 14, 20, 12, 24, 18, 10, 22, 26, 16, 12, 20, 24, 14, 8, 12, 18, 22, 14, 10, 16, 20, 12, 8, 6];
const lucia = `<div class="msgs">
<div class="chip">Вчера</div>
${group(true, [
  { text: 'Как поездка в Толедо?', time: '21:14' },
  { text: 'Фото жду 🙂', time: '21:14' },
])}
${group(false, [
  { text: 'Супер! Расскажу при встрече', orig: '¡Genial! Te cuento cuando nos veamos', time: '21:30' },
])}
<div class="chip">Сегодня</div>
${group(false, [
  { text: 'Привет! Завтра вечером есть время?', orig: '¡Hola! ¿Tienes tiempo mañana por la tarde?', time: '09:40' },
  { text: 'Хочу показать тебе кафе у реки', orig: 'Quiero enseñarte un café junto al río', time: '09:40' },
])}
${group(true, [
  { text: 'Привет! Да, после шести', time: '09:44' },
  { text: 'Давай в 19:30 у моста', time: '09:52', edited: true },
  { text: 'Зонт с меня, обещают дождь', time: '09:46', rx: { e: '👍', av: '--av-1', i: 'L' } },
])}
${group(false, [
  { voice: { bars, played: 9, dur: '0:14' }, time: '09:55' },
  { text: 'Отлично! Тогда до завтра 🙂', orig: '¡Genial! Entonces hasta mañana 🙂', time: '09:56' },
])}
</div>
${navChat({ left: `<span class="cbtn" aria-label="Назад">${ic('back')}</span>`, title: 'Lucía', sub: 'в сети', right: `<span class="av av36" style="background:var(--av-1)">L</span>` })}
${composer(false)}`;
const s2a = page('Чат с Lucía — фон A', '', lucia);
const s2b = page('Чат с Lucía — фон B', 'bg-b', lucia);

// ---------- S3: Parrlo ----------
const parrloMsgs = `<div class="msgs">
<div class="chip">Вчера</div>
${group(true, [{ text: 'Как сказать «сколько стоит билет?»', time: '19:20' }])}
${group(false, [{ text: '¿Cuánto cuesta el billete? Читается: «куа́нто куэ́ста эль бильетэ».', time: '19:20' }])}
<div class="chip">Сегодня</div>
${group(true, [{ text: 'Как по-испански «до субботы»?', time: '10:02' }])}
${group(false, [{ text: 'Hasta el sábado. Чуть теплее — ¡Nos vemos el sábado!', time: '10:02' }])}
${group(true, [{ text: 'Напомни в пятницу в 18:00 купить цветы', time: '10:04' }])}
${group(false, [{ text: 'Готово. Напомню в пятницу.', time: '10:04', card: { t: 'Купить цветы', s: 'Пт, 18:00' } }])}
${group(true, [{ text: 'Спасибо!', time: '10:05' }])}
${group(false, [{ text: 'Обращайся 🙂', time: '10:05' }])}
</div>
${navChat({ left: `<span class="av av36 av-p" aria-label="Parrlo">${parrot()}</span>`, title: 'Parrlo', sub: 'помощник', right: `<span class="cbtn" aria-label="Меню">${ic('more')}</span>` })}
${composer(true)}
${tabs('parrlo')}`;
const s3 = page('Parrlo', 'has-tabs', parrloMsgs);
const menu = `<div class="scrim"></div><div class="menu" role="menu">
<div class="it"><span>Память</span>${ic('memory')}</div>
<div class="it"><span>Голос</span>${ic('wave')}</div>
<div class="it"><span>Язык</span>${ic('globe')}</div>
<div class="it"><span>Тон общения</span>${ic('tone')}</div>
<div class="it"><span>Напоминания</span>${ic('bell')}</div>
<div class="it"><span>Что умеет Parrlo</span>${ic('help')}</div>
<div class="gap"></div>
<div class="it danger"><span>Очистить переписку</span>${ic('trash')}</div>
</div>`;
const s3m = page('Parrlo — меню', 'has-tabs', parrloMsgs + menu);

const pages = { 's1-chats': s1, 's2-chat-A': s2a, 's2-chat-B': s2b, 's3-parrlo': s3, 's3-menu': s3m };
for (const [k, v] of Object.entries(pages)) fs.writeFileSync(path.join(OUT, k + '.html'), v);

// ---------- обзор ----------
const caps = { 's1-chats': 'S1 · Чаты', 's2-chat-A': 'S2 · Чат с Lucía, фон A (ровный)', 's2-chat-B': 'S2 · Чат с Lucía, фон B (узор)', 's3-parrlo': 'S3 · Вкладка Parrlo', 's3-menu': 'S3 · Parrlo, меню открыто' };
const vars = [['se-n', 'iPhone SE · обычный'], ['max-n', 'Pro Max · обычный'], ['se-ax5', 'iPhone SE · AX5'], ['max-ax5', 'Pro Max · AX5']];
const idx = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Редизайн iOS</title>
<style>@font-face{font-family:Inter;font-weight:100 900;src:url(../fonts/Inter-Variable.woff2) format("woff2")}
body{margin:0;background:#12161C;color:#E8ECF1;font-family:-apple-system,"SF Pro Text",Inter,system-ui,sans-serif;padding:40px 40px 60px}
h1{font-size:28px;font-weight:600;margin:0 0 6px}p.l{color:#9AA4B2;margin:0 0 32px;font-size:15px}
h2{font-size:19px;font-weight:600;margin:36px 0 14px}
.g{display:flex;gap:24px;align-items:flex-start}
figure{margin:0}figure img{display:block;border-radius:18px;border:1px solid rgba(255,255,255,.14)}
figcaption{font-size:13px;color:#9AA4B2;margin-top:8px}</style></head><body>
<h1>Parrlo Chat — редизайн iOS</h1><p class="l">Тёмная тема · iPhone SE (375×667) и Pro Max (440×956) · обычный текст и AX5</p>
${Object.keys(pages).map(k => `<h2>${caps[k]}</h2><div class="g">${vars.map(([v, c]) => `<figure><img src="png/${k}__${v}.png" width="${v.startsWith('se') ? 375 * 0.62 : 440 * 0.62}" alt="${caps[k]} — ${c}"><figcaption>${c}</figcaption></figure>`).join('')}</div>`).join('\n')}
</body></html>`;
fs.writeFileSync(path.join(OUT, 'index.html'), idx);
console.log('ok');
