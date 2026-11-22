// Генератор статических страниц редизайна. Запуск: node redesign-ios/tools/build.js
// Страница принимает ?d=se|max и ?t=n|ax5 (устройство и размер текста).
const fs = require('fs');
const path = require('path');
const { glueHtml } = require('./nbsp.js');
const write = (f, s) => fs.writeFileSync(f, f.endsWith('.html') ? glueHtml(s) : s);
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
  up: '<path d="M12 19V5.5M6 11.5l6-6 6 6"/>',
  shift: '<path d="M12 4l7.5 8H15v7.5H9V12H4.5z"/>',
  bksp: '<path d="M9 5.5h10.5a1.5 1.5 0 011.5 1.5v10a1.5 1.5 0 01-1.5 1.5H9L3 12z"/><path d="M11.5 9.5l5 5M16.5 9.5l-5 5"/>',
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

// Таб-бар: Контакты · Звонки · [Parrlo] · Чаты · Настройки (решение Мурата 22.11).
// Parrlo — круг 60 фиксированного размера поверх системной 3-й вкладки, без подписи (утверждено Муратом 22.11);
// плоский, без тени и свечения. Спека — tabbar-spec.html.
// Подписи на es/en подставляет скрипт страницы по ?l=es|en (data-атрибуты).
const TABS = [['contacts', 'Контакты', 'Contactos', 'Contacts'], ['calls', 'Звонки', 'Llamadas', 'Calls'], ['parrlo', '', '', ''], ['chats', 'Чаты', 'Chats', 'Chats'], ['gear', 'Настройки', 'Ajustes', 'Settings']];
const tabLabel = (ru, es, en) => `<span data-es="${es}" data-en="${en}">${ru}</span>`;
// o: { badge, pressed, only: [ключи вкладок] }
const tabs = (active, o = {}) => {
  const list = o.only ? TABS.filter(t => o.only.includes(t[0])) : TABS;
  const st = o.only ? ` style="grid-template-columns:repeat(${list.length},1fr)"` : '';
  return `<nav class="tabs" aria-label="Разделы"${st}>${list.map(([k, ru, es, en]) => {
    const on = k === active;
    if (k === 'parrlo') return `<a class="pc${on ? ' on' : ''}${o.pressed ? ' pressed' : ''}" aria-label="Parrlo${o.badge ? ', непрочитанных: ' + o.badge : ''}"><i class="disc">${parrot()}${o.badge ? `<b class="pc-badge">${o.badge}</b>` : ''}</i></a>`;
    const icon = ic(k, on && k !== 'gear' ? 'fill' : '');
    return `<a class="${on ? 'on' : ''}">${icon}${tabLabel(ru, es, en)}</a>`;
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
    body = `${text}<div class="orig"><span class="lb">Оригинал</span><p lang="es">${orig}${meta(m)}</p></div>`;
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
const composer = (onTabs) => `<div class="comp${onTabs ? ' on-tabs' : ''}"><span class="cbtn" aria-label="Вложение">${ic('clip')}</span><div class="field"><span>Сообщение</span></div><span class="cbtn" aria-label="Голосовое">${ic('mic')}</span></div>`;

const page = (title, cls, inner) => `<!doctype html>
<html lang="ru" data-d="max" data-t="n" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><link rel="stylesheet" href="rd.css"><script src="tools/unglue.js"></script>
<script>(function(){var q=new URLSearchParams(location.search),h=document.documentElement;h.dataset.d=q.get('d')||'max';h.dataset.t=q.get('t')||'n';
h.dataset.theme=q.get('th')==='light'?'light':'dark';var l=q.get('l');if(l==='es'||l==='en'){document.addEventListener('DOMContentLoaded',function(){
document.querySelectorAll('[data-'+l+']').forEach(function(e){e.textContent=e.dataset[l];e.lang=l})})}})()</script>
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
  { av: 'av-0', i: 'M', n: 'Marco', t: 'Вчера', own: true, read: true, p: '<em>Ты:</em> Grazie! Адрес пришлю вечером' },
  { av: 'av-2', i: 'П', n: 'Пётр', t: 'Вчера', p: '<em>Фото</em> · Вот это вид с горы', badge: '1' },
  { av: 'av-3', i: 'И', n: 'Ирина', t: 'Пн', p: '<em>Голосовое</em> · 0:42' },
  { av: 'av-0', i: 'Б', n: 'Бег по субботам', cnt: '34', t: 'Вс', p: '<em>Вика:</em> Сбор в 8:00 у входа в парк, бежим 10&nbsp;км', muted: true },
  { av: 'av-1', i: 'Н', n: 'Ник', t: '18.11', own: true, p: '<em>Ты:</em> Ок, до четверга!' },
  { av: 'av-2', i: 'О', n: 'Олег', t: '16.11', p: 'Спасибо за книгу, верну в среду' },
];
const rowHtml = (r) => `<li class="row"><span class="av av52" style="background:var(--${r.av})">${r.i}</span><div class="rb">
<div class="n"><b>${r.n}</b>${r.cnt ? `<span class="cnt">${ic('people')}${r.cnt}</span>` : ''}${r.muted ? ic('mute') : ''}</div>
<div class="t">${r.own ? TICK2.replace('class="tick"', r.read ? 'class="tick rd"' : 'class="tick"') : ''}${r.t}</div>
<div class="p">${r.p}</div>
<div class="x">${r.pin ? ic('pin') : ''}${r.badge ? `<span class="badge${r.muted ? ' mute' : ''}">${r.badge}</span>` : ''}</div></div></li>`;
const s1 = page('Чаты', 'has-tabs', `<div class="head"><div class="bar end"><span class="cbtn" aria-label="Новый чат">${ic('compose')}</span></div>
<h1 class="large">Чаты</h1><div class="search">${ic('search')}<span>Поиск</span></div></div>
<ul class="list">${rows.map(rowHtml).join('')}</ul>
${tabs('chats', { badge: '3' })}`);

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

// ---------- S3: Parrlo ----------
const parrloList = `<div class="msgs">
<div class="chip">Вчера</div>
${group(true, [{ text: 'Как сказать «сколько стоит билет?»', time: '19:20' }])}
${group(false, [{ text: '<span lang="es">¿Cuánto cuesta el billete?</span> Читается: «куа́нто куэ́ста эль бильетэ».', time: '19:20' }])}
<div class="chip">Сегодня</div>
${group(true, [{ text: 'Как по-испански «до субботы»?', time: '10:02' }])}
${group(false, [{ text: '<span lang="es">Hasta el sábado.</span> Чуть теплее — <span lang="es">¡Nos vemos el sábado!</span>', time: '10:02' }])}
${group(true, [{ text: 'Напомни в пятницу в 18:00 купить цветы', time: '10:04' }])}
${group(false, [{ text: 'Готово. Напомню в пятницу.', time: '10:04', card: { t: 'Купить цветы', s: 'Пт, 18:00' } }])}
${group(true, [{ text: 'Спасибо!', time: '10:05' }])}
${group(false, [{ text: 'Обращайся 🙂', time: '10:05' }])}
</div>`;
const parrloNav = navChat({ left: `<span class="av av36 av-p" aria-label="Parrlo">${parrot()}</span>`, title: 'Parrlo<i class="ai" data-es="IA" data-en="AI">ИИ</i>', sub: 'помощник', right: `<span class="cbtn" aria-label="Меню">${ic('more')}</span>` });
const parrloMsgs = `${parrloList}
${parrloNav}
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

const pages = { 's1-chats': s1, 's2-chat-A': s2a, 's3-parrlo': s3, 's3-menu': s3m };

// ---------- S4: клавиатура открыта (чат Parrlo) — таб-бара и кнопки Parrlo нет ----------
const KB = [['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'], ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'], ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю']];
const keyboard = `<div class="kb" aria-hidden="true"><div class="kb-sug"><span>по-испанский</span><i></i><span class="m1">по-испански</span><i></i><span>по-испанскому</span></div>
<div class="kb-rows">
<div class="kb-r">${KB[0].map(k => `<b>${k}</b>`).join('')}</div>
<div class="kb-r">${KB[1].map(k => `<b>${k}</b>`).join('')}</div>
<div class="kb-r r3"><b class="fn">${ic('shift')}</b>${KB[2].map(k => `<b>${k}</b>`).join('')}<b class="fn">${ic('bksp')}</b></div>
<div class="kb-r r4"><b class="fn">123</b><b class="fn glb">${ic('globe')}</b><b class="fn">${ic('smile')}</b><b class="sp">Пробел</b><b class="fn ret">Ввод</b></div>
</div><div class="kb-bot">${ic('globe')}${ic('mic')}</div></div>`;
const composerTyped = `<div class="comp on-tabs typed"><span class="cbtn" aria-label="Вложение">${ic('clip')}</span><div class="field"><span>Скажи «спасибо» по-исп</span></div><span class="cbtn send" aria-label="Отправить">${ic('up')}</span></div>`;
const s4 = page('Parrlo — клавиатура', 'kbd-open', `${parrloList}
${parrloNav}
${composerTyped}
${keyboard}`);
write(path.join(OUT, 's4-kbd.html'), s4);

// ---------- лист спеки кнопки Parrlo (×3) ----------
const Z = 3;
const demo = (th, w, h, navHtml) => `<div class="demo" data-theme="${th}" style="width:${w}px;height:${h}px">${navHtml}</div>`;
const sw = (hex, t) => `<span class="sw"><i style="background:${hex}"></i>${t ? t + ' ' : ''}${hex}</span>`;
const STATE_TXT = {
  dark: {
    normal: [sw('#242B34', 'фон'), sw('#2BC48A', 'обводка 1 pt'), sw('#2BC48A', 'попугай'), sw('#9AA4B2', 'подпись')],
    on: [sw('#00875C', 'фон'), 'обводки нет', sw('#FFFFFF', 'попугай'), sw('#2BC48A', 'подпись')],
    pn: [sw('#1C2026', 'фон'), 'обводка и попугай — как в обычном'],
    ps: [sw('#006B48', 'фон'), 'попугай — как в выбранном'],
    badge: [sw('#FF3B30', 'бейдж'), sw('#FFFFFF', 'цифра'), '18 × 18, r 9, 13 semibold'],
  },
  light: {
    normal: [sw('#FFFFFF', 'фон'), sw('#00875C', 'обводка 1 pt'), sw('#00875C', 'попугай'), sw('#5E6773', 'подпись')],
    on: [sw('#00875C', 'фон'), 'обводки нет', sw('#FFFFFF', 'попугай'), sw('#00875C', 'подпись')],
    pn: [sw('#EEF1F4', 'фон'), 'обводка и попугай — как в обычном'],
    ps: [sw('#006B48', 'фон'), 'попугай — как в выбранном'],
    badge: [sw('#FF3B30', 'бейдж'), sw('#FFFFFF', 'цифра'), '18 × 18, r 9, 13 semibold'],
  },
};
const STATES = [['normal', 'Обычное', {}], ['on', 'Выбрано (открыта вкладка Parrlo)', { on: true }], ['pn', 'Нажато (из обычного)', { pressed: true }], ['ps', 'Нажато (из выбранного)', { on: true, pressed: true }], ['badge', 'С бейджем «3»', { badge: '3' }]];
const anat = () => `<div class="fig anat">${demo('dark', 3 * 88, 30 + 49, tabs('', { only: ['calls', 'parrlo', 'chats'], badge: '3' }))}<svg class="ann"></svg></div>`;
const stateRow = (th) => `<h3>${th === 'dark' ? 'Тёмная тема' : 'Светлая тема'}</h3>
<div class="states">${STATES.map(([k, name, o]) => `<div class="st"><div class="fig">${demo(th, 88, 32 + 49, tabs(o.on ? 'parrlo' : '', { only: ['parrlo'], pressed: o.pressed, badge: o.badge }))}</div>
<p class="sn">${name}</p><p class="sv">${STATE_TXT[th][k].join('<br>')}</p></div>`).join('')}</div>`;
const spec = `<!doctype html>
<html lang="ru" data-d="max" data-t="n" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Кнопка Parrlo — спека</title><link rel="stylesheet" href="rd.css">
<style>
html,body{background:#0B0E12}
body{width:1720px;padding:48px 56px 64px;color:#E8ECF1;letter-spacing:0}
h1{font-size:34px;font-weight:700;letter-spacing:-.02em}
.lead{font-size:17px;color:#9AA4B2;margin:8px 0 8px;line-height:1.45;max-width:1300px}
h2{font-size:24px;font-weight:600;margin:44px 0 6px}
h3{font-size:17px;font-weight:600;margin:28px 0 14px;color:#E8ECF1}
.demo{position:relative;zoom:${Z};background:var(--bg);--home:0px;overflow:visible}
.demo .tabs{bottom:0}
.fig{position:relative;display:inline-block}
.anat-row{display:flex;gap:40px;align-items:flex-start;margin-top:20px}
.anat{padding:120px 380px 60px 230px;background:#12161C;border-radius:16px;border:1px solid rgba(255,255,255,.1)}
svg.ann{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:100}
svg.ann line,svg.ann rect,svg.ann path{stroke:#F5B83D;fill:none;stroke-width:1.5}
svg.ann .dash{stroke-dasharray:6 5}
svg.ann text{fill:#F5B83D;font:500 15px var(--font);letter-spacing:0}
svg.ann text.b{font-weight:700;font-size:17px}
.notes{font-size:15px;line-height:1.5;color:#C9D0D9;width:420px;padding-top:8px}
.notes b{color:#fff;font-weight:600}
.notes li{margin:0 0 8px 18px}
.states{display:flex;gap:22px;align-items:flex-start}
.st{width:300px}
.st .fig{padding:0;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,.1);background:#12161C}
.sn{font-size:15px;font-weight:600;margin:10px 0 4px}
.sv{font-size:13px;line-height:1.6;color:#9AA4B2}
.sw{display:inline-flex;align-items:center;gap:6px}
.sw i{display:inline-block;width:12px;height:12px;border-radius:3px;border:1px solid rgba(255,255,255,.3)}
</style></head><body>
<h1>Кнопка Parrlo в таб-баре — спека для кода</h1>
<p class="lead">Круг Parrlo лежит поверх системного таб-бара iOS 26 (5 вкладок: Контакты · Звонки · Parrlo · Чаты · Настройки; у системной вкладки под кругом подписи нет). Утверждённый вариант — без подписи, круг 60. Масштаб рисунков ×3, все размеры — в pt. Размеры на рисунках анатомии измерены по самому макету. Круг фиксированный: на AX5 он такой же, подписи таб-бара тоже не растут (10 pt).</p>
<h2>Анатомия</h2>
<div class="anat-row">${anat()}<ul class="notes">
<li><b>Утверждено Муратом 22.11: без подписи, круг 60.</b> Подписи «Parrlo» нет ни под кругом, ни у системной вкладки под ним.</li>
<li>Круг 60 × 60, фиксированный (на AX5 такой же), по центру 3-й вкладки. Выступает над верхней кромкой панели на 12; низ круга — 48 от верха панели (на 1 pt выше её нижнего края 49).</li>
<li>Попугай 30 × 32 по центру круга.</li>
<li>Обводка 1 pt внутрь (входит в 60), только в обычном состоянии.</li>
<li>Бейдж: системный, 18 × 18 (min-width 18, растёт вправо), r 9, 13 semibold, #FF3B30, цифра белая. Центр бейджа — на окружности под 45°: левый верхний угол бейджа в (+42; 0) от левого верхнего угла круга.</li>
<li>Подписи остальных вкладок — 10 pt medium, иконки 26; на AX5 не растут.</li>
</ul></div>
<h2>Состояния</h2>
<p class="lead">Нажатие меняет только заливку: без тени, свечения, градиента и масштабирования.</p>
${stateRow('dark')}${stateRow('light')}
<script>
document.fonts.ready.then(function(){
  var NS='http://www.w3.org/2000/svg', Z=${Z};
  document.querySelectorAll('.anat').forEach(function(fig){
    var svg=fig.querySelector('svg.ann'), F=fig.getBoundingClientRect();
    function R(e){var r=e.getBoundingClientRect();return {l:r.left-F.left,t:r.top-F.top,r:r.right-F.left,b:r.bottom-F.top,w:r.width,h:r.height}}
    function el(n,a,t){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(t!=null)e.textContent=t;svg.appendChild(e);return e}
    function ln(x1,y1,x2,y2,c){return el('line',{x1:x1,y1:y1,x2:x2,y2:y2,'class':c||''})}
    function tx(x,y,s,a,c){return el('text',{x:x,y:y,'text-anchor':a||'start','class':c||''},s)}
    function pt(v){return Math.round(v/Z*10)/10}
    function dimH(x1,x2,y,s){ln(x1,y,x2,y);ln(x1,y-7,x1,y+7);ln(x2,y-7,x2,y+7);tx((x1+x2)/2,y-10,s,'middle','b')}
    function dimV(y1,y2,x,s,side){ln(x,y1,x,y2);ln(x-7,y1,x+7,y1);ln(x-7,y2,x+7,y2);tx(side==='r'?x+12:x-12,(y1+y2)/2+6,s,side==='r'?'start':'end','b')}
    var nav=R(fig.querySelector('.tabs')), d=fig.querySelector('.disc'), disc=R(d), gl=R(d.querySelector('.ic-parrot')), bd=R(fig.querySelector('.pc-badge'));
    var cx=(disc.l+disc.r)/2, right=nav.r+40;
    // базовая линия подписей: соседняя вкладка и (в варианте 1) подпись Parrlo
    function base(span){var i=document.createElement('i');i.style.cssText='display:inline-block;width:0;height:0;vertical-align:baseline';span.appendChild(i);var y=R(i).t;i.remove();return y}
    var spans=fig.querySelectorAll('.tabs a span'), yb=base(spans[0]);
    // центр вкладки
    ln(cx,disc.t-24,cx,nav.b,'dash');
    // ширина круга
    dimH(disc.l,disc.r,disc.t-52,'⌀ '+pt(disc.w));
    // выступ над панелью
    ln(disc.l-70,nav.t,disc.l-4,nav.t,'dash');
    dimV(disc.t,nav.t,disc.l-56,'выступ '+pt(nav.t-disc.t),'l');
    ln(disc.l-70,disc.t,cx,disc.t,'dash');
    // высота панели
    dimV(nav.t,nav.b,nav.l-40,'панель '+pt(nav.h),'l');
    // попугай
    el('rect',{x:gl.l,y:gl.t,width:gl.w,height:gl.h,'class':'dash'});
    ln(gl.r,gl.t+gl.h*.7,right,gl.t+gl.h*.7);tx(right+8,gl.t+gl.h*.7+5,'попугай '+pt(gl.w)+' × '+pt(gl.h)+', по центру круга');
    // обводка
    var ang=-2.3, bx=cx+Math.cos(ang)*disc.w/2, by=(disc.t+disc.b)/2+Math.sin(ang)*disc.w/2;
    ln(bx,by,disc.l-60,disc.t-60);ln(disc.l-60,disc.t-60,disc.l-90,disc.t-60);tx(disc.l-96,disc.t-55,'обводка 1 pt внутрь (входит в ⌀)','end');
    // бейдж
    dimH(bd.l,bd.r,bd.t-14,pt(bd.w)+'');
    ln(bd.r,bd.t+bd.h/2,right,bd.t+bd.h/2);tx(right+8,bd.t+bd.h/2-4,'бейдж '+pt(bd.w)+' × '+pt(bd.h)+', r 9, 13 semibold');
    tx(right+8,bd.t+bd.h/2+16,'угол бейджа: +'+pt(bd.l-disc.l)+' / '+pt(bd.t-disc.t)+' от угла круга');
    // базовая линия подписей
    ln(nav.l,yb,nav.r+30,yb,'dash');
    tx(right+8,yb-6,'базовая линия подписей · 10 pt medium');
    // низ круга
    ln(disc.r,disc.b,right,disc.b,'dash');tx(right+8,disc.b+22,'низ круга: '+pt(disc.b-nav.t)+' от верха панели');
  });
  document.body.dataset.ready='1';
});
</script>
</body></html>`;
write(path.join(OUT, 'tabbar-spec.html'), spec);
for (const [k, v] of Object.entries(pages)) write(path.join(OUT, k + '.html'), v);

// ---------- обзор ----------
const caps = { 's1-chats': 'S1 · Чаты', 's2-chat-A': 'S2 · Чат с Lucía (фон A, ровный)', 's3-parrlo': 'S3 · Вкладка Parrlo', 's3-menu': 'S3 · Parrlo, меню открыто' };
const vars = [['se-n', 'iPhone SE · обычный'], ['max-n', 'Pro Max · обычный'], ['se-ax5', 'iPhone SE · AX5'], ['max-ax5', 'Pro Max · AX5']];
const idx = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Редизайн iOS</title>
<style>@font-face{font-family:Inter;font-weight:100 900;src:url(../fonts/Inter-Variable.woff2) format("woff2")}
body{margin:0;background:#12161C;color:#E8ECF1;font-family:-apple-system,"SF Pro Text",Inter,system-ui,sans-serif;padding:40px 40px 60px}
h1{font-size:28px;font-weight:600;margin:0 0 6px}p.l{color:#9AA4B2;margin:0 0 32px;font-size:15px}
h2{font-size:19px;font-weight:600;margin:36px 0 14px}
.g{display:flex;gap:24px;align-items:flex-start}
figure{margin:0}figure img{display:block;border-radius:18px;border:1px solid rgba(255,255,255,.14)}
figcaption{font-size:13px;color:#9AA4B2;margin-top:8px}</style></head><body>
<h1>Parrlo Chat — редизайн iOS</h1><p class="l">Тёмная тема · iPhone SE (375×667) и Pro Max (440×956) · обычный текст и AX5. Кнопка Parrlo, светлая тема, клавиатура — <a style="color:#2BC48A" href="tabbar-spec.html">спека таб-бара</a> и png/tabbar/</p>
${Object.keys(pages).map(k => `<h2>${caps[k]}</h2><div class="g">${vars.map(([v, c]) => `<figure><img src="png/${k}__${v}.png" width="${v.startsWith('se') ? 375 * 0.62 : 440 * 0.62}" alt="${caps[k]} — ${c}"><figcaption>${c}</figcaption></figure>`).join('')}</div>`).join('\n')}
</body></html>`;
write(path.join(OUT, 'index.html'), idx);
console.log('ok');
