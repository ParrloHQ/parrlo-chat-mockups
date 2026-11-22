// Генератор страниц пакета «группы» (редизайн iOS). Запуск: node redesign-ios/groups/tools/build.js
// Страница принимает ?d=se|max, ?t=n|ax5, ?l=ru|es|en. Тексты — дословно из старых макетов frames/{ru,es,en}-<экран>.html
// (tools/extract.py → tools/strings.json, ключ — ru-текст). Нет перевода — сборка падает.
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '..');
const STR = require('./strings.json');
const { glueHtml: glueBase } = require('../../tools/nbsp.js');
const SW = require('../../tools/short-words.json');
// дополнительно к nbsp.js: короткое слово перед заполнителем в квадратных скобках («в [скобках]», «to [e-mail]»)
const glueHtml = (html, lang) => glueBase(html, lang).replace(/<template id="L-(ru|es|en)"[\s\S]*?<\/template>/g, (tpl, l) =>
  tpl.replace(new RegExp(`(?<![\\p{L}\\p{N}])(${SW[l].join('|')}) (?=\\[)`, 'giu'), (_, w) => w + '\u00a0')); // NBSP после коротких слов (языки — по lang у <template>)
const norm = (s) => s.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
let L = 'ru';

// Без рода (решение 22.11): ru-тексты старых кадров с прошедшим временем / местоимением о человеке заменены.
// es/en не меняются. Видимые строки получают пометку «не утверждено» (только в ru) — см. README.
const OVR = {
  'Пригласила: Лена': 'Зовёт Лена',
  'Карточка приглашения: группа, число участников, кто пригласил.': 'Карточка приглашения: группа, число участников, от кого приглашение.',
  'Анна присоединилась к группе': 'Анна теперь в группе',
  'Петя вышел из группы': 'Выход из группы: Петя',
  'Анна присоединилась. Идёт расшифровка ИИ.': 'Анна теперь в звонке. Идёт расшифровка ИИ.',
  'Кто присоединился': 'Участники звонка',
  'Попроси того, кто пригласил, прислать новое приглашение.': 'Попроси прислать новое приглашение.',
  'Новый участник: Marco · кто добавил: Лена': 'Лена добавляет в группу: Marco',
  'Исключение из группы: Петя · кто исключил: Лена': 'Лена исключает из группы: Петя',
  'Новое название группы: «Квартира на Майор» · кто изменил: Marco': 'Marco меняет название группы: «Квартира на Майор»',
  'Когда админ выходит, он выбирает нового админа сам или выбирает автоматически: админом станет тот, кто дольше всех в группе.': 'Админ при выходе выбирает нового админа или включает автоматический выбор: админом станет тот, кто дольше всех в группе.',
  'Ты — админ группы «Квартира». Перед выходом выбери нового админа: он получит доступ к разделу «Участники и права».': 'Ты — админ группы «Квартира». Перед выходом выбери нового админа: у нового админа будет доступ к разделу «Участники и права».',
  'Админ запретил ИИ-помощников в этой группе. Parrlo здесь не работает.': 'ИИ-помощники в этой группе запрещены админом. Parrlo здесь не работает.',
};
const T = (ru) => { const e = STR[norm(ru)]; if (!e) throw new Error('нет строки: ' + ru); return esc(L === 'ru' && OVR[norm(ru)] ? OVR[norm(ru)] : e[L]); };
// TT: как T, плюс пометка «не утверждено» в ru, если строка заменена (OVR)
const TT = (ru) => T(ru) + (L === 'ru' && OVR[norm(ru)] ? tbd('не утверждено') : '');

// ---------- иконки (из redesign-ios/tools/build.js + новые в той же сетке 24, штрих 1.8) ----------
const PARROT_INNER = '<defs><mask id="pc-pmk" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024"><rect width="1024" height="1024" fill="#fff"/><circle cx="612" cy="372" r="44" fill="#000"/><path d="M735 322 L 895 322 A160 160 0 0 1 735 482 Z" fill="#000" stroke="#000" stroke-width="28" stroke-linejoin="round"/></mask></defs><g mask="url(#pc-pmk)"><path d="M345 800 L 235 925 L 420 895 Z" stroke="currentColor" stroke-width="70" stroke-linejoin="round"/><circle cx="500" cy="640" r="245"/><circle cx="560" cy="395" r="235"/></g><path d="M735 322 L 895 322 A160 160 0 0 1 735 482 Z"/>';
let pid = 0;
const parrot = () => { const id = 'pc-pmk' + (pid++); return `<svg class="ic ic-parrot" viewBox="180 140 735 840" aria-hidden="true" focusable="false">${PARROT_INNER.replace(/pc-pmk/g, id)}</svg>`; };
const P = {
  back: '<path d="M14.5 5.5L8 12l6.5 6.5"/>',
  more: '<circle cx="6" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1.6" fill="currentColor" stroke="none"/>',
  clip: '<path d="M20 11.5l-8.3 8.3a4.8 4.8 0 01-6.8-6.8l8.6-8.6a3.2 3.2 0 014.5 4.5l-8.4 8.4a1.6 1.6 0 01-2.3-2.3l7.7-7.7"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21"/>',
  micoff: '<path d="M15 10.5V6a3 3 0 00-5.6-1.5M9 9v2a3 3 0 004.8 2.4M5.5 11a6.5 6.5 0 0010.6 5M18.5 11c0 .8-.1 1.5-.4 2.2M12 17.5V21M4 4l16 16"/>',
  smile: '<circle cx="12" cy="12" r="8.5"/><path d="M8.6 14.2a4.4 4.4 0 006.8 0"/><circle cx="9.3" cy="10" r=".9" fill="currentColor" stroke="none"/><circle cx="14.7" cy="10" r=".9" fill="currentColor" stroke="none"/>',
  calls: '<path d="M6.2 3.8h3l1.6 4.2-2 1.3a10.5 10.5 0 005.9 5.9l1.3-2 4.2 1.6v3a2 2 0 01-2.2 2A16.5 16.5 0 014.2 6a2 2 0 012-2.2z"/>',
  end: '<path d="M2.8 13.6c5.1-4.6 13.3-4.6 18.4 0l-1.6 2.9-3.9-1.2-.5-2.6a12 12 0 00-6.4 0l-.5 2.6-3.9 1.2z" fill="currentColor"/>',
  people: '<circle cx="9" cy="9" r="3"/><path d="M3.5 18.5c.9-2.8 3-4.3 5.5-4.3s4.6 1.5 5.5 4.3"/><circle cx="16.5" cy="9.5" r="2.4"/><path d="M16.3 14.2c2 .1 3.6 1.4 4.3 3.6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  chev: '<path d="M9 5.5l6.5 6.5L9 18.5"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  link: '<path d="M10.2 13.8a4 4 0 005.6 0l3-3a4 4 0 00-5.6-5.6l-1.3 1.3"/><path d="M13.8 10.2a4 4 0 00-5.6 0l-3 3a4 4 0 005.6 5.6l1.3-1.3"/>',
  linkoff: '<path d="M10.2 13.8a4 4 0 005.6 0l3-3a4 4 0 00-5.6-5.6l-1.3 1.3"/><path d="M13.8 10.2a4 4 0 00-5.6 0l-3 3a4 4 0 005.6 5.6l1.3-1.3M4 4l16 16"/>',
  copy: '<rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5v-2a2 2 0 00-2-2h-7a2 2 0 00-2 2v7a2 2 0 002 2h2"/>',
  qr: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2.5v2.5H14zM17.5 17.5H20V20h-2.5zM14 20h1M20 14v1"/>',
  reset: '<path d="M19.5 12a7.5 7.5 0 11-2.2-5.3M19.5 4.5v4h-4"/>',
  shield: '<path d="M12 3.5l7 2.8v5.2c0 4.3-2.9 7.6-7 9-4.1-1.4-7-4.7-7-9V6.3z"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  tr: '<path d="M4 5.5h9M8.5 4v1.5c0 3.5-2 6.5-4.5 8M6.5 9c1 2 2.8 3.6 5 4.5"/><path d="M12.5 20l3.75-9 3.75 9M13.8 17h4.9"/>',
  list: '<path d="M9 7h11M9 12h11M9 17h11"/><circle cx="4.8" cy="7" r="1.1" fill="currentColor" stroke="none"/><circle cx="4.8" cy="12" r="1.1" fill="currentColor" stroke="none"/><circle cx="4.8" cy="17" r="1.1" fill="currentColor" stroke="none"/>',
  hand: '<path d="M8 12.5V6a1.5 1.5 0 013 0v5M11 5a1.5 1.5 0 013 0v6M14 6.5a1.5 1.5 0 013 0V13M17 10a1.5 1.5 0 013 0v4.5a6.5 6.5 0 01-6.5 6.5h-1a6 6 0 01-4.6-2.2L4.5 15.5a1.5 1.5 0 012.3-1.9L8 15"/>',
};
const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;
const TICK2 = '<svg class="tick" viewBox="0 0 17 11" aria-hidden="true"><path d="M1 6l3.2 3.2L10 2.8"/><path d="M7.6 8.6l.6.6L15.6 1.8"/></svg>';
const statusBar = () => `<div class="sb"><span>9:41</span><i class="island"></i><span class="ri">
<svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
<svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 008 .6 10.4 10.4 0 00.8 3.5L2 4.8a8.6 8.6 0 016-2.4zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.8 6.8 0 008 4.2 6.8 6.8 0 003.4 6l1.2 1.3c.9-.8 2.1-1.3 3.4-1.3zm0 3.5c.4 0 .8.2 1.1.4L8 11.2 6.9 9.9c.3-.2.7-.4 1.1-.4z"/></svg>
<svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="22" height="12" rx="3.5" fill="none" stroke="currentColor" stroke-opacity=".4"/><rect x="2" y="2" width="16" height="9" rx="2" fill="currentColor"/><path d="M24.5 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2z" fill="currentColor" fill-opacity=".4"/></svg></span></div>`;

// ---------- люди ----------
// цвет аватара --av-N, имя отправителя --nt-N (тот же N); группа «Квартира» — --av-2, как в s1-chats
const PPL = { 'Лена': 1, 'Marco': 0, 'Мама': 3, 'Анна Л.': 2, 'Петя': 1, 'Ты': 0, 'Квартира': 2 };
const ini = (ru) => { const t = STR[norm(ru)][L]; return [...t][0].toUpperCase(); };
const av = (ru, cls = 'av40', letter) => `<span class="av ${cls}" style="background:var(--av-${PPL[ru]})">${letter || ini(ru)}</span>`;
const tbd = (s = 'формулировка: не утверждено', blk) => `<span class="tbd${blk ? ' blk' : ''}">${T(s)}</span>`;

// ---------- облачка ----------
const meta = (inner) => `<span class="ms" aria-hidden="true">${inner}</span><span class="m">${inner}</span>`;
const PHOTO = `<svg class="ph" viewBox="0 0 300 190" aria-hidden="true"><rect width="300" height="190" fill="#7D8B9C"/><rect y="0" width="300" height="70" fill="#8E9AA8"/>
<path d="M0 30h52v120H0zM56 52h46v98H56zM196 40h50v110h-50zM250 18h50v132h-50z" fill="#465260"/><path d="M106 70h86v80h-86z" fill="#56616E"/>
<g fill="#A9B5C2"><rect x="10" y="44" width="10" height="12"/><rect x="30" y="44" width="10" height="12"/><rect x="10" y="68" width="10" height="12"/><rect x="30" y="68" width="10" height="12"/><rect x="64" y="64" width="9" height="11"/><rect x="84" y="64" width="9" height="11"/><rect x="206" y="54" width="10" height="12"/><rect x="226" y="54" width="10" height="12"/><rect x="260" y="32" width="10" height="12"/><rect x="280" y="32" width="10" height="12"/><rect x="260" y="58" width="10" height="12"/><rect x="280" y="58" width="10" height="12"/><rect x="118" y="84" width="14" height="14"/><rect x="142" y="84" width="14" height="14"/><rect x="166" y="84" width="14" height="14"/></g>
<path d="M0 150h300v40H0z" fill="#3A4450"/><path d="M110 190l30-40h20l30 40z" fill="#4A5563"/><g stroke="#93A2B3" stroke-width="2" stroke-linecap="round" opacity=".7"><path d="M24 160v14M60 166v10M232 162v12M270 158v16M140 170v8M170 168v10"/></g>
<path d="M214 118a14 9 0 0128 0z" fill="#B44B5B"/><path d="M228 118v16" stroke="#2A313B" stroke-width="2"/></svg>`;
const bubble = ({ text = '', time, own, tail, trf, orig, photo }) => {
  const m = time + (own ? TICK2 : '');
  const trfH = (lnk) => `<div class="trf">${ic('tr')}${T('Переведено с испанского')}<a class="lnk">${T(lnk)}</a>${meta(m)}</div>`;
  let body;
  if (photo) body = `${PHOTO}<div class="cap">${T(text)}</div><div class="orig"><span class="lb">${T('Оригинал')}</span><p>${T(orig)}</p></div>${trfH(trf)}`;
  else if (trf) body = `${T(text)}${trfH(trf)}`;
  else body = `${T(text)}${meta(m)}`;
  return `<div class="b${tail ? ' tail ' + (own ? 'out-t' : 'in-t') : ''}${photo ? ' photo' : ''}">${body}</div>`;
};
const gin = (who, items) => `<div class="grp in wa"><div class="snm" style="color:var(--nt-${PPL[who]})">${T(who)}</div>${items.map((it, i) => bubble({ ...it, tail: i === items.length - 1 })).join('')}${av(who, 'gav')}</div>`;
const gout = (items) => `<div class="grp out">${items.map((it, i) => bubble({ ...it, own: true, tail: i === items.length - 1 })).join('')}</div>`;
const sys = (s, o = {}) => `<div class="sys" role="status">${o.admin ? ic('shield') : ''}${TT(s)}${o.tbd ? tbd() : ''}</div>`;

// ---------- навбар, композер, низ ----------
const back = () => `<span class="cbtn" aria-label="${T('Назад')}">${ic('back')}</span>`;
const nav = ({ left = back(), title = '', sub = '', right = '', cls = '', extra = '' } = {}) =>
  `<header class="nav ${cls}"><div class="bar">${left || '<i class="sp36"></i>'}<div class="ttl"><b>${title}</b>${sub ? `<span>${sub}</span>` : ''}</div>${right || '<i class="sp36"></i>'}</div>${extra}</header>`;
const aistrip = () => `<div class="aistrip" role="note">${parrot()}<span>${T('Здесь может использоваться ИИ-помощник одного из участников ·')} <a class="lnk">${T('Подробнее')}</a></span></div>`;
const callbar = () => `<div class="callbar" role="status">${ic('calls')}<div class="cb"><b>${T('Идёт групповой звонок')}</b><span>${T('Лена и Marco уже в звонке')}</span></div><span class="btn primary">${T('Присоединиться')}</span></div>`;
const groupNav = ({ ai = true, call = true, callBtn = true } = {}) => nav({
  cls: callBtn ? 'w2' : '', title: T('Квартира'), sub: T('12 участников'),
  right: `<span class="rt">${callBtn ? `<span class="cbtn" aria-label="${T('Групповой звонок')}">${ic('calls')}</span>` : ''}<span aria-label="${T('О группе')}">${av('Квартира', 'av36')}</span></span>`,
  extra: (ai ? aistrip() : '') + (call ? callbar() : ''),
});
const composer = (lim = '') => `<div class="comp${lim ? ' has-lim' : ''}">${lim}<span class="cbtn" aria-label="Вложение">${ic('clip')}</span><div class="field"><span>${T('Сообщение')}</span></div><span class="cbtn" aria-label="${T('Продиктовать')}">${ic('mic')}</span></div>`;
const chat = (o, msgs, comp = composer()) => `<div class="msgs">${msgs}</div>${groupNav(o)}${comp}`;
const dock = (...btns) => `<div class="dock">${btns.join('')}</div>`;
const btn = (s, cls = '') => `<span class="bigbtn ${cls}">${T(s)}</span>`;

// ---------- экраны-настройки ----------
const sec = ({ h = '', cells = '', f = '', raw = '' }) => `<section class="sec">${h ? `<h2 class="sec-h">${h}</h2>` : ''}${cells ? `<div class="cells">${cells}</div>` : ''}${raw}${f ? `<div class="sec-f">${f}</div>` : ''}</section>`;
const MEM = ['Лена', 'Marco', 'Мама', 'Анна Л.', 'Петя'];
const memberCell = (n) => `<div class="cell wav stk">${av(n)}<div class="ct"><b>${T(n)}</b><span>${T('Участник')}</span></div><span class="cbtn" style="background:none" aria-label="${T('Действия: ' + n)}">${ic('more', 'mut')}</span></div>`;
const meCell = () => `<div class="cell wav">${av('Ты', 'av40', T('МП'))}<div class="ct"><b>${T('Ты')}</b><span>${T('Админ')}</span></div></div>`;
const addCell = () => `<div class="cell acc wav"><span class="ib">${ic('plus')}</span><div class="ct"><b>${T('Добавить участников')}</b></div></div>`;
const hero = () => `<div class="hero">${av('Квартира', '')}<h1>${T('Квартира')}</h1><p>${T('12 участников')}</p></div>
<nav class="acts"><a>${ic('calls')}<span>${T('Групповой звонок')}</span></a><a>${ic('link')}<span>${T('Ссылка-приглашение')}</span></a><a>${parrot()}<span>${T('Parrlo в группе')}</span></a></nav>`;
const membersPage = () => `<div class="page">${hero()}
${sec({ h: T('Участники'), cells: addCell() + meCell() + MEM.map(memberCell).join('') + `<div class="cell acc"><div class="ct"><b>${T('Показать всех')}</b></div></div>` })}
${sec({ h: T('Права'), cells: `<div class="cell kv"><div class="ct"><b>${T('Название группы')}</b></div><span class="val">${T('Квартира')}</span>${ic('chev', 'chev')}</div>
<div class="cell"><div class="ct"><b>${T('Передать роль админа')}</b><span>${T('Ты станешь участником')}</span></div>${ic('chev', 'chev')}</div>`,
  f: `<p>${T('Когда админ выходит, он выбирает нового админа сам или выбирает автоматически: админом станет тот, кто дольше всех в группе.')}${tbd()}</p><p>${T('Когда из группы выйдет последний участник, группа и сообщения будут удалены.')}${tbd()}${tbd('юрист проверит')}</p>` })}
</div>${nav({ title: T('Участники и права') })}`;
const alert = ({ title, msg, btns }) => `<div class="ov"></div><div class="alert" role="alertdialog"><div class="al-b"><h2>${T(title)}</h2><p>${T(msg)}</p>${tbd(undefined, true)}</div>
<div class="al-btns">${btns.map(([s, c]) => `<a class="${c || ''}">${T(s)}</a>`).join('')}</div></div>`;
const legal = 'В Parrlo Chat каждый человек может включить для себя ИИ-ассистента Parrlo. Он читает чаты этого человека — в том числе сообщения, которые ты пишешь в этой группе, — только чтобы помогать ему: пересказывать, переводить, составлять тексты. Тексты обрабатывают поставщики ИИ по нашему поручению; часть — в США. Ты можешь возразить, написав на [e-mail], или выйти из группы в любой момент. Оператор: PADELADA WORLD, S.L. · NIF B05783238 · Calle Josep Pla 8, Esc. 1, Pta. 1, 17252 Calonge i Sant Antoni (Girona), España · hello@';
const legalP = () => `<p class="legal">${T(legal)}${T('parrlo.com.')}</p>`;
const joinPage = (wait) => `<div class="page"><div class="gcard" role="group" aria-label="${T('Приглашение в группу')}">${av('Квартира', '')}<div class="ct"><b>${T('Квартира')}</b><span>${T('12 участников')}</span><span>${TT('Пригласила: Лена')}</span></div></div>
<h1 class="h1">${T('Перед тем как вступить')}</h1>${legalP()}<p class="legal"><a class="lnk" style="margin-top:0">${T('Политика конфиденциальности')}</a></p>
<div class="notes"><p>${T('Карточка приглашения: группа, число участников, кто пригласил.')}${tbd('не утверждено')}</p><p>${T('Всё, что в [скобках], нужно заполнить или подтвердить.')}${tbd()}</p></div></div>
${nav()}${dock(wait ? `<span class="bigbtn wait" role="status"><i class="spin"></i>${T('Вступаем в группу…')}</span>` : btn('Вступить'), btn('Не вступать', 'alt'))}`;
const esPage = (icon, h, p, btns, noNav) => `<div class="page center${noNav ? ' nonav' : ''}"><div class="es" role="status"><span class="eic">${ic(icon)}</span><h2>${T(h)}</h2><p>${T(p)}</p>${tbd(undefined, true)}</div></div>${noNav ? '' : nav()}${dock(...btns)}`;
const pickList = (who, sel, auto) => who.map(n => `<div class="cell wav" role="radio">${av(n)}<div class="ct"><b>${T(n)}</b></div>${n === sel ? ic('check', 'ck') : ''}</div>`).join('') +
  (auto ? `<div class="cell" role="radio" style="--sep:16px"><div class="ct"><b>${T('Выбрать автоматически')}</b><span>${T('Админом станет тот, кто дольше всех в группе.')}</span></div></div>` : '');
const transferPage = () => `<div class="page"><h1 class="h1">${T('Кому передать роль админа?')}</h1><p class="lead">${T('Ты останешься в группе «Квартира» участником. Новый админ получит доступ к разделу «Участники и права».')}</p>
${sec({ cells: pickList(MEM, 'Marco'), f: tbd() })}</div>${nav()}${dock(btn('Передать роль'), btn('Отмена', 'txt'))}`;
const successorPage = () => `<div class="page"><h1 class="h1">${T('Кому передать роль админа?')}</h1><p class="lead">${TT('Ты — админ группы «Квартира». Перед выходом выбери нового админа: он получит доступ к разделу «Участники и права».')}</p>
${sec({ cells: pickList(['Marco', 'Мама', 'Анна Л.', 'Петя'], 'Marco', true), f: tbd() })}</div>${nav()}${dock(btn('Назначить и выйти'), btn('Отмена', 'txt'))}`;
const invitePage = () => `<div class="page"><p class="lead" style="padding-top:12px">${T('Любой, у кого есть эта ссылка, сможет вступить в «Квартира». Отправляй её только тем, кому доверяешь.')}</p>
${sec({ h: T('Ссылка'), cells: `<div class="cell">${ic('link', 'mut')}<span class="field-v">${T('…/join/7Kq2x9')}</span></div>`,
  f: `<p>${T('Ссылку видят админ и любой участник, если группа это разрешила.')}</p><p>${T('Старую ссылку можно сбросить в любой момент: она перестанет работать.')}${tbd()}</p>` })}
${sec({ cells: `<div class="cell acc">${ic('copy')}<div class="ct"><b>${T('Скопировать ссылку')}</b></div></div><div class="cell acc" style="--sep:52px">${ic('qr')}<div class="ct"><b>${T('Показать QR-код')}</b></div></div>` })}
${sec({ cells: `<div class="cell danger">${ic('reset')}<div class="ct"><b>${T('Сбросить ссылку')}</b></div></div>` })}
</div>${nav({ title: T('Ссылка-приглашение') })}`;
const swCell = (title, on, dis) => `<div class="cell swr"><div class="ct"><b>${T(title)}</b></div><span class="sw${on ? ' on' : ''}${dis ? ' dis' : ''}" role="switch" aria-checked="${on}"></span></div>`;
const parrloPage = (off) => `<div class="page">
${sec({ h: T('Для тебя') + tbd(), cells: swCell('Parrlo в этой группе', !off, off), f: (off ? TT : T)(off ? 'Админ запретил ИИ-помощников в этой группе. Parrlo здесь не работает.' : 'Parrlo читает эту группу только для тебя и пишет по твоей команде от твоего имени. Другим участникам он не виден.') })}
${sec({ h: T('Для группы') + tbd('не утверждено'), cells: swCell('ИИ-помощники в этой группе', !off), f: T('Админ решает, могут ли участники использовать Parrlo в этой группе.') })}
${off ? sec({ h: T('Так это видят участники'), f: T('Показывается ли строка, если ИИ-помощники запрещены') + tbd('не утверждено') })
    : sec({ h: T('Кто может вызывать Parrlo'), cells: `<div class="cell" role="radio"><div class="ct"><b>${T('Все участники')}</b></div>${ic('check', 'ck')}</div><div class="cell" role="radio"><div class="ct"><b>${T('Только админ')}</b></div></div>` }) +
      sec({ h: T('Так это видят участники'), raw: `<div class="cells">${aistrip()}</div>`, f: T('Одна строка в шапке группы, без имён. Она видна всем.') + tbd() })}
</div>${nav({ title: T('Parrlo в группе'), sub: T('Группа «Квартира»') })}`;

// ---------- лента чата ----------
const BASE = () => `${sys('Анна присоединилась к группе')}
${gin('Лена', [{ text: 'Оплатила свет, чек выше', time: '18:20' }])}
${gin('Marco', [{ text: 'Кто принесёт хлеб?', time: '18:24', trf: 'Показать оригинал' }])}
${gout([{ text: 'Я возьму, заеду в семь', time: '18:25' }])}`;

// ---------- экраны: [id, подпись, старый кадр, (), класс .screen] ----------
const SCREENS = [
  ['group', 'Чат группы', 'group', () => chat({}, BASE())],
  ['group-syslines', 'Системные строки', 'group-syslines', () => chat({ ai: false, call: false, callBtn: false }, `${sys('Создатель группы «Квартира»: Лена')}${sys('Новый участник по ссылке: Анна')}${sys('Новый участник: Marco · кто добавил: Лена')}
${gin('Лена', [{ text: 'Оплатила свет, чек выше', time: '18:20' }])}
${sys('Исключение из группы: Петя · кто исключил: Лена')}${sys('Выход из группы: Анна')}${sys('Владелец группы теперь: Marco', { admin: true })}${sys('Новое название группы: «Квартира на Майор» · кто изменил: Marco')}${sys('Аккаунт участника удалён')}${sys('Выход из группы: Участник')}`)],
  ['group-create', 'Новая группа', 'group-create', () => `<div class="page"><p class="lead" style="padding-top:12px">${T('Назови группу и выбери участников.')}</p>
${sec({ h: T('Название группы'), cells: `<div class="cell"><span class="field-v caret" role="textbox">${T('Квартира')}</span></div>` })}
${sec({ h: T('Участники · выбрано 2'), cells: [['Marco', 1], ['Мама', 0], ['Анна Л.', 1], ['Петя', 0]].map(([n, on]) => `<div class="cell wsel" role="checkbox" aria-checked="${!!on}"><span class="sel${on ? ' on' : ''}">${on ? ic('check') : ''}</span>${av(n)}<div class="ct"><b>${T(n)}</b></div></div>`).join(''),
    f: T('Админом группы станешь ты.') + tbd() })}
</div>${nav({ cls: 'wide', left: `<span class="pbtn">${T('Отмена')}</span>`, title: T('Новая группа') })}${dock(btn('Создать группу'))}`],
  ['group-photo', 'Фото в группе, оригинал открыт', 'group-photo', () => chat({ ai: false, call: false }, `${sys('Новый участник: Анна')}
${gin('Лена', [{ text: 'Оплатила свет, чек выше', time: '18:20' }])}
${gin('Marco', [{ text: 'Кто принесёт хлеб?', time: '18:24', trf: 'Показать оригинал' }])}
${gout([{ text: 'Я возьму, заеду в семь', time: '18:25' }])}
${gin('Marco', [{ photo: true, text: 'Вот какая сегодня улица — лучше возьмите зонты', orig: 'Así está la calle hoy, mejor llevad paraguas', time: '18:40', trf: 'Скрыть оригинал' }])}`)],
  ['group-invite', 'Ссылка-приглашение', 'group-invite', invitePage],
  ['group-invite-reset', 'Сбросить ссылку?', 'group-invite-reset', () => invitePage() + alert({ title: 'Сбросить ссылку?', msg: 'Старая ссылка перестанет работать. Те, кто уже в группе, останутся.', btns: [['Отмена', 'cancel bold'], ['Сбросить', 'danger']] })],
  ['group-join', 'Приглашение: перед вступлением', 'group-join', () => joinPage(false)],
  ['group-join-wait', 'Вступаем…', 'group-join-wait', () => joinPage(true)],
  ['group-join-done', 'Ты в группе', 'group-join-done', () => chat({ call: false }, sys('Ты теперь в группе «Квартира»', { tbd: true }))],
  ['group-join-declined', 'Не вступать', 'group-join-declined', () => esPage('hand', 'Хорошо, без вступления', 'Ты не в группе «Квартира». Передумаешь — открой приглашение ещё раз.', [btn('Понятно')])],
  ['group-join-invalid', 'Ссылка не работает', 'group-join-invalid', () => esPage('linkoff', 'Ссылка не работает', 'Попроси того, кто пригласил, прислать новое приглашение.', [btn('Понятно')])],
  ['group-members', 'О группе: участники и права', 'group-members', membersPage],
  ['group-members-menu', 'Действия с участником', 'group-members-menu', () => membersPage() + `<div class="ov"></div><div class="asheet" role="dialog"><div class="as-g"><div class="as-t">${T('Marco')}</div><a>${T('Передать роль админа')}</a><a class="danger">${T('Убрать из группы')}</a></div><div class="as-g"><a class="bold">${T('Отмена')}</a></div></div>`],
  ['group-members-remove', 'Убрать участника?', 'group-members-remove', () => membersPage() + alert({ title: 'Убрать Marco из группы?', msg: 'Marco перестанет быть участником группы «Квартира».', btns: [['Отмена', 'cancel bold'], ['Убрать', 'danger']] })],
  ['group-members-empty', 'Пока только ты', 'group-members-empty', () => `<div class="page">${hero()}${sec({ h: T('Участники'), cells: meCell(), raw: `<div class="es" role="status"><span class="eic">${ic('people')}</span><h2>${T('Пока только ты')}</h2><p>${T('Добавь участников — они появятся здесь.')}</p>${tbd(undefined, true)}</div>` })}</div>${nav({ title: T('Участники и права') })}${dock(btn('Добавить участников'))}`],
  ['group-admin-you', 'Админ теперь: ты', 'group-admin-you', () => chat({}, `${BASE()}${sys('Админ теперь: ты', { admin: true, tbd: true })}${sys('Петя вышел из группы')}`)],
  ['group-admin-changed', 'Админ сменился', 'group-admin-changed', () => chat({}, `${BASE()}${sys('Админ теперь: Marco', { admin: true })}${sys('Петя вышел из группы')}`)],
  ['group-leave-confirm', 'Выйти из группы?', 'group-leave-confirm', () => membersPage() + alert({ title: 'Выйти из группы «Квартира»?', msg: 'Новые сообщения группы перестанут приходить. Вернуться можно по новому приглашению.', btns: [['Отмена', 'cancel bold'], ['Выйти', 'danger']] })],
  ['group-limit', 'Лимит Parrlo: карточка', 'group-limit', () => chat({}, `${BASE()}<section class="lcard" role="status"><h3>${T('Лимит Parrlo на сегодня исчерпан')}</h3><div class="meter" role="img" aria-label="${T('Полоска использования: лимит исчерпан')}"><i></i></div>
<p class="ink">${ic('clock')}${T('Обнулится завтра в 00:00 по твоему времени')}${tbd('не утверждено')}</p><p>${T('Обычные чаты работают всегда.')}</p><p>${T('Что входит в план:')}${tbd('не утверждено')}</p>${btn('Выбрать тариф')}</section>`)],
  ['group-limit-inline', 'Лимит Parrlo: строка', 'group-limit-inline', () => chat({}, BASE(), composer(`<div class="limline" role="status"><span>${T('Лимит Parrlo на сегодня закончился. Обычные чаты работают. Сброс: завтра в 00:00 по твоему времени.')}${tbd()}</span><a class="lnk">${T('Выбрать тариф')}</a></div>`))],
  ['group-parrlo', 'Parrlo в группе', 'group-parrlo', () => parrloPage(false)],
  ['group-parrlo-off', 'Parrlo в группе: запрещено', 'group-parrlo-off', () => parrloPage(true)],
  ['group-ai-info', 'Подробнее об ИИ в группе', 'group-ai-info', () => `<div class="page"><h1 class="h1">${T('Если кто-то из твоего чата пользуется Parrlo')}</h1>${legalP()}
<div class="notes"><p>${T('Заглушка — финализируют юристы. Пункты: цель, основание, получатели, передача в США, срок хранения, права и возражение, контакт.')}</p></div>
<p class="legal"><a class="lnk" style="margin-top:0">${T('Политика конфиденциальности')}</a></p><div class="notes"><p>${T('Всё, что в [скобках], нужно заполнить или подтвердить.')}${tbd()}</p></div></div>${nav()}`],
  ['admin-transfer', 'Передать роль админа', 'admin-transfer', transferPage],
  ['admin-transfer-confirm', 'Передать роль?', 'admin-transfer-confirm', () => transferPage() + alert({ title: 'Передать роль админа?', msg: 'Marco станет админом группы «Квартира». Ты останешься участником.', btns: [['Отмена', 'cancel'], ['Передать роль', 'bold']] })],
  ['admin-transfer-done', 'Роль передана', 'admin-transfer-done', () => chat({ call: false }, `${gin('Лена', [{ text: 'Оплатила свет, чек выше', time: '18:20' }])}${gout([{ text: 'Я возьму, заеду в семь', time: '18:25' }])}${sys('Админ теперь: Marco', { admin: true })}`)],
  ['group-successor', 'Выход админа: преемник', 'group-successor', successorPage],
  ['group-successor-confirm', 'Назначить и выйти?', 'group-successor-confirm', () => successorPage() + alert({ title: 'Передать роль админа и выйти?', msg: 'Marco станет админом группы «Квартира». Ты выйдешь из группы.', btns: [['Отмена', 'cancel'], ['Назначить и выйти', 'bold']] })],
  ['group-call', 'Групповой звонок', 'group-call', () => `<div class="call"><div class="call-top"><span class="rec" role="status"><i></i>${T('Идёт расшифровка ИИ')}</span><span class="cbtn" aria-label="${T('Полный протокол')}">${ic('list')}</span></div>
${aistrip()}<div class="toast" role="status">${TT('Анна присоединилась. Идёт расшифровка ИИ.')}</div>
<div class="tiles" role="group" aria-label="${T('Кто присоединился')}">${['Лена', 'Marco', 'Анна Л.', 'Петя', 'Мама', 'Ты'].map(n => `<div class="tile${n === 'Marco' ? ' spk' : ''}">${av(n, '', n === 'Ты' ? T('Т') : undefined)}<span class="tn">${T(n)}</span></div>`).join('')}</div>
<div class="capt"><b>${T('Marco')}</b><p>${T('Увидимся у входа в девять, я возьму билеты.')}</p><span>${T('Перевод с испанского')}</span></div>
<div class="ctrl"><i aria-label="${T('Микрофон')}">${ic('micoff')}</i><i class="end" aria-label="${T('Завершить')}">${ic('end')}</i><i aria-label="${T('Полный протокол')}">${ic('list')}</i></div></div>`],
  ['group-call-full', 'Звонок заполнен', 'group-call-full', () => esPage('people', 'Звонок заполнен', 'В групповом звонке «Квартира» сейчас нет свободных мест. Попробуй чуть позже.', [btn('Повторить'), btn('Закрыть', 'alt')], true)],
];

// ---------- страница ----------
const page = (id, title, bodies) => `<!doctype html>
<html lang="ru" data-d="max" data-t="n" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><link rel="stylesheet" href="../rd.css"><link rel="stylesheet" href="groups.css">
<script>(function(){var q=new URLSearchParams(location.search),h=document.documentElement;h.dataset.d=q.get('d')==='se'?'se':'max';h.dataset.t=q.get('t')==='ax5'?'ax5':'n';
var l=q.get('l');if(l!=='es'&&l!=='en')l='ru';h.lang=l;h.dataset.l=l;})()</script><script src="../tools/unglue.js"></script><script src="groups.js" defer></script>
</head><body><main class="screen" data-screen="${id}"></main>
${Object.entries(bodies).map(([l, b]) => `<template id="L-${l}" lang="${l}">${statusBar()}
${b}
<i class="home-ind"></i></template>`).join('\n')}
</body></html>
`;
const JS = `// Пакет «группы»: язык (?l=), подгонка ленты под композер, WordFit для AX5.
// Порядок: раскладка → window.unglue() (../tools/unglue.js) → WordFit.
// WordFit: если слово не помещается в строку (перенос внутри слова или вылезает за блок) — кегль этого блока ×0,92 ступенями,
// не ниже AX1 (×0,53 от AX5: тело 53 → 28). Раскладка AX5 (строки во всю ширину, значок над текстом) — основная; WordFit — страховка.
(function(){
  var L=/[\\p{L}\\p{N}]/u, rg=document.createRange();
  function box(e){var b=e;while(b&&getComputedStyle(b).display.indexOf('inline')===0)b=b.parentElement;var r=b.getBoundingClientRect(),cs=getComputedStyle(b);
    return {l:r.left+parseFloat(cs.paddingLeft)+parseFloat(cs.borderLeftWidth)-1,r:r.right-parseFloat(cs.paddingRight)-parseFloat(cs.borderRightWidth)+1}}
  // вернуть описание проблемы со словом в элементе e (или null)
  window.wordIssue=function(e){var bx=box(e);
    for(var i=0;i<e.childNodes.length;i++){var n=e.childNodes[i];if(n.nodeType!==3)continue;var t=n.textContent,re=/\\S+/g,m;
      while((m=re.exec(t))){rg.setStart(n,m.index);rg.setEnd(n,m.index+m[0].length);var rs=[].slice.call(rg.getClientRects()).filter(function(r){return r.width});
        for(var k=0;k<rs.length;k++)if(rs[k].right>bx.r+0.5||rs[k].left<bx.l-0.5)return 'вылезает: '+m[0];
        if(rs.length<2||m[0].length<2)continue;var prev=null;
        for(var j=0;j<m[0].length;j++){rg.setStart(n,m.index+j);rg.setEnd(n,m.index+j+1);var r=rg.getClientRects()[0];if(!r||!r.width)continue;
          if(prev!==null&&r.top>prev+2&&L.test(m[0][j-1])&&L.test(m[0][j]))return 'разорвано: '+m[0];prev=r.top;}}}
    return null};
  window.textEls=function(root){return [].slice.call(root.querySelectorAll('*')).filter(function(e){if(e.closest('svg,template'))return false;var cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden')return false;
    return [].some.call(e.childNodes,function(n){return n.nodeType===3&&/\\S{2}/.test(n.textContent)})})};
  function wordFit(){if(document.documentElement.dataset.t!=='ax5')return;
    textEls(document.querySelector('main')).forEach(function(e){if(!wordIssue(e))return;var base=parseFloat(getComputedStyle(e).fontSize),min=base*0.53,fs=base;
      e.setAttribute('data-wf','');while(fs>min&&wordIssue(e)){fs=Math.max(min,fs*0.92);e.style.fontSize=fs+'px';}});}
  function fitFeed(){var c=document.querySelector('.comp'),m=document.querySelector('.msgs');if(c&&m)m.style.paddingBottom=(c.offsetHeight+8)+'px';
    var d=document.querySelector('.dock'),p=document.querySelector('.page');if(d&&p&&!p.classList.contains('center'))p.style.paddingBottom=d.offsetHeight+'px';}
  document.addEventListener('DOMContentLoaded',function(){var l=document.documentElement.dataset.l,m=document.querySelector('main');m.innerHTML=document.getElementById('L-'+l).innerHTML;
    document.fonts.ready.then(function(){fitFeed();
      // снимок склеенного текста: после WordFit блоки с уменьшенным кеглем получают склейку обратно и unglue проходит по ним ещё раз
      var snap=[],tw=document.createTreeWalker(m,NodeFilter.SHOW_TEXT),x;while((x=tw.nextNode()))snap.push([x,x.textContent]);
      if(window.unglue)window.unglue();wordFit();
      var re=false;snap.forEach(function(p){var el=p[0].parentElement;if(el&&el.closest('[data-wf]')&&p[0].textContent!==p[1]){p[0].textContent=p[1];re=true;}});
      if(re&&window.unglue)window.unglue();fitFeed();document.documentElement.dataset.unglued='1';document.body.dataset.ready='1';});});
})();
`;
fs.writeFileSync(path.join(OUT, 'groups.js'), JS);
for (const [id, cap, , fn] of SCREENS) {
  const bodies = {};
  for (const l of ['ru', 'es', 'en']) { L = l; pid = 0; bodies[l] = fn(); }
  fs.writeFileSync(path.join(OUT, id + '.html'), glueHtml(page(id, 'Группы — ' + cap, bodies), 'ru'));
}
// ---------- обзор: все экраны, Pro Max, обычный текст, ru ----------
const idx = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Группы — обзор</title>
<style>@font-face{font-family:Inter;font-weight:100 900;src:url(../../fonts/Inter-Variable.woff2) format("woff2")}
body{margin:0;background:#0B0E12;color:#E8ECF1;font-family:-apple-system,"SF Pro Text",Inter,system-ui,sans-serif;padding:40px 40px 60px;width:1880px}
h1{font-size:28px;font-weight:600;margin:0 0 6px}p.l{color:#9AA4B2;margin:0 0 28px;font-size:15px}
.g{display:grid;grid-template-columns:repeat(7,1fr);gap:30px 24px}
figure{margin:0}figure img{display:block;width:100%;border-radius:16px;border:1px solid rgba(255,255,255,.14)}
figcaption{font-size:14px;margin-top:8px;line-height:1.35}figcaption span{display:block;color:#9AA4B2;font-size:12px}</style></head><body>
<h1>Parrlo Chat — редизайн iOS · группы</h1><p class="l">${SCREENS.length} экранов · Pro Max 440×956 · обычный текст · ru. Все варианты (SE, AX5, es, en) — в png/.</p>
<div class="g">${SCREENS.map(([id, cap, old]) => `<figure><img src="png/${id}__max-n-ru.png" alt="${cap}"><figcaption>${cap}<span>${id} ← frames/ru-${old}</span></figcaption></figure>`).join('')}</div></body></html>`;
fs.writeFileSync(path.join(OUT, 'index.html'), idx);
fs.writeFileSync(path.join(__dirname, 'screens.json'), JSON.stringify(SCREENS.map(s => s[0])));
console.log('ok:', SCREENS.length, 'экранов');
