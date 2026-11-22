// Генератор страниц пачки «Контакты», «Звонки», профиль собеседника.
// Запуск: node redesign-ios/contacts-calls/tools/build.js  (потом tools/render.js)
// Страница принимает ?d=se|max, ?t=n|ax5, ?l=ru|es|en.
// Тексты — из старых кадров frames/{ru,es,en}-<экран>.html (tools/texts.json, см. extract.js); ru-строки здесь —
// ключи, es/en подставляются по позиции в том же старом кадре. Отступления от старых текстов — в OV (и в README).
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '..');
const TX = require('./texts.json');
const SCREENS = require('./screens.js');

// ---------- общие куски из redesign-ios/tools/build.js ----------
const PARROT_INNER = '<defs><mask id="pc-pmk" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024"><rect width="1024" height="1024" fill="#fff"/><circle cx="612" cy="372" r="44" fill="#000"/><path d="M735 322 L 895 322 A160 160 0 0 1 735 482 Z" fill="#000" stroke="#000" stroke-width="28" stroke-linejoin="round"/></mask></defs><g mask="url(#pc-pmk)"><path d="M345 800 L 235 925 L 420 895 Z" stroke="currentColor" stroke-width="70" stroke-linejoin="round"/><circle cx="500" cy="640" r="245"/><circle cx="560" cy="395" r="235"/></g><path d="M735 322 L 895 322 A160 160 0 0 1 735 482 Z"/>';
let pid = 0;
const parrot = () => { const id = 'pc-pmk' + (pid++); return `<svg class="ic ic-parrot" viewBox="180 140 735 840" aria-hidden="true" focusable="false">${PARROT_INNER.replace(/pc-pmk/g, id)}</svg>`; };
const P = {
  back: '<path d="M14.5 5.5L8 12l6.5 6.5"/>',
  chev: '<path d="M9.5 5.5L16 12l-6.5 6.5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.8-4.8"/>',
  contacts: '<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.3-3.6 4.2-5.6 7.5-5.6s6.2 2 7.5 5.6"/>',
  calls: '<path d="M6.2 3.8h3l1.6 4.2-2 1.3a10.5 10.5 0 005.9 5.9l1.3-2 4.2 1.6v3a2 2 0 01-2.2 2A16.5 16.5 0 014.2 6a2 2 0 012-2.2z"/>',
  chats: '<path d="M12 3.8c4.8 0 8.6 3.3 8.6 7.4s-3.8 7.4-8.6 7.4c-1 0-2-.1-2.9-.4L5 20l1-3.6c-1.6-1.4-2.6-3.2-2.6-5.2 0-4.1 3.8-7.4 8.6-7.4z"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.8l1.6 2.3 2.7-.6.6 2.7 2.4 1.4-1 2.5 1 2.5-2.4 1.4-.6 2.7-2.7-.6L12 21.2l-1.6-2.3-2.7.6-.6-2.7-2.4-1.4 1-2.5-1-2.5 2.4-1.4.6-2.7 2.7.6z"/>',
  people: '<circle cx="9" cy="9" r="3"/><path d="M3.5 18.5c.9-2.8 3-4.3 5.5-4.3s4.6 1.5 5.5 4.3"/><circle cx="16.5" cy="9.5" r="2.4"/><path d="M16.3 14.2c2 .1 3.6 1.4 4.3 3.6"/>',
  bell: '<path d="M6.5 16v-5a5.5 5.5 0 0111 0v5l1.8 1.8H4.7zM10 20.2a2 2 0 004 0"/>',
  trash: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l.9 12.5a1 1 0 001 .9h7.2a1 1 0 001-.9L17.5 7M10 11v5.5M14 11v5.5"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21"/>',
  micoff: '<path d="M15 10.5V6a3 3 0 00-5.6-1.5M9 9v2a3 3 0 004.6 2.5M5.5 11a6.5 6.5 0 0010.6 5M18.5 11a6.4 6.4 0 01-.6 2.6M12 17.5V21M4 4l16 16"/>',
  hang: '<path d="M3 14.2c5-4.6 13-4.6 18 0l-1.6 2.9a.9.9 0 01-1.1.4l-3-1a.9.9 0 01-.6-.8v-1.9a10 10 0 00-5.4 0v1.9a.9.9 0 01-.6.8l-3 1a.9.9 0 01-1.1-.4z"/>',
  in: '<path d="M17 7L7 17M7 9.5V17h7.5"/>',
  out: '<path d="M7 17L17 7M9.5 7H17v7.5"/>',
  doc: '<path d="M7 3.5h7l4 4v12a1 1 0 01-1 1H7a1 1 0 01-1-1v-15a1 1 0 011-1z"/><path d="M14 3.5v4h4M9.5 12h5M9.5 15.5h5"/>',
  list: '<path d="M9 7h11M9 12h11M9 17h11"/><circle cx="4.8" cy="7" r="1.1" fill="currentColor" stroke="none"/><circle cx="4.8" cy="12" r="1.1" fill="currentColor" stroke="none"/><circle cx="4.8" cy="17" r="1.1" fill="currentColor" stroke="none"/>',
  block: '<circle cx="12" cy="12" r="8.5"/><path d="M6 6l12 12"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r=".9" fill="currentColor" stroke="none"/>',
  alert: '<path d="M12 4.2l8.6 15.3H3.4z"/><path d="M12 10v4.3"/><circle cx="12" cy="17" r=".9" fill="currentColor" stroke="none"/>',
  wifioff: '<path d="M2.8 9.2a13.5 13.5 0 0118.4 0M5.8 12.4a9 9 0 0112.4 0M8.9 15.5a4.6 4.6 0 016.2 0"/><circle cx="12" cy="18.8" r="1" fill="currentColor" stroke="none"/><path d="M4 4l16 16"/>',
  link: '<path d="M10.5 13.5a3.8 3.8 0 005.4 0l2.9-2.9a3.8 3.8 0 00-5.4-5.4l-1 1M13.5 10.5a3.8 3.8 0 00-5.4 0l-2.9 2.9a3.8 3.8 0 005.4 5.4l1-1"/>',
  camera: '<path d="M4 8h3l1.5-2.5h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  x: '<path d="M7 7l10 10M17 7L7 17"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  clr: '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none"/><path d="M9 9l6 6M15 9l-6 6" stroke="var(--surface)" stroke-width="2"/>',
};
const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;
const TICK2 = '<svg class="tick" viewBox="0 0 17 11" aria-hidden="true"><path d="M1 6l3.2 3.2L10 2.8"/><path d="M7.6 8.6l.6.6L15.6 1.8"/></svg>';
const statusBar = () => `<div class="sb"><span>9:41</span><i class="island"></i><span class="ri">
<svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
<svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 008 .6 10.4 10.4 0 00.8 3.5L2 4.8a8.6 8.6 0 016-2.4zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.8 6.8 0 008 4.2 6.8 6.8 0 003.4 6l1.2 1.3c.9-.8 2.1-1.3 3.4-1.3zm0 3.5c.4 0 .8.2 1.1.4L8 11.2 6.9 9.9c.3-.2.7-.4 1.1-.4z"/></svg>
<svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="22" height="12" rx="3.5" fill="none" stroke="currentColor" stroke-opacity=".4"/><rect x="2" y="2" width="16" height="9" rx="2" fill="currentColor"/><path d="M24.5 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2z" fill="currentColor" fill-opacity=".4"/></svg></span></div>`;
const TABS = [['contacts', 'Контакты', 'Contactos', 'Contacts'], ['calls', 'Звонки', 'Llamadas', 'Calls'], ['parrlo', '', '', ''], ['chats', 'Чаты', 'Chats', 'Chats'], ['gear', 'Настройки', 'Ajustes', 'Settings']];
const tabs = (active) => `<nav class="tabs" aria-label="${L({ ru: 'Разделы', es: 'Secciones', en: 'Sections' })}">${TABS.map(([k, ru, es, en]) => {
  if (k === 'parrlo') return `<a class="pc" aria-label="Parrlo"><i class="disc">${parrot()}</i></a>`;
  const on = k === active;
  return `<a class="${on ? 'on' : ''}">${ic(k, on && k !== 'gear' ? 'fill' : '')}<span>${{ ru, es, en }[LANG]}</span></a>`;
}).join('')}</nav>`;

// ---------- тексты ----------
let CUR = '', LANG = 'ru';
const missing = new Set();
// Отступления от старых текстов (причины — в README): ru-ключ → {ru?, es, en}
const OV = {
  // род собеседника / пользователя не указываем
  'Контакт Marco заблокирован': { es: 'Has bloqueado a Marco', en: 'Marco is blocked' },
  'Пока Marco не ответит, расшифровки нет.': { es: 'No hay transcripción hasta que Marco conteste.', en: 'There’s no transcription until Marco answers.' },
  'Чтобы тебя было слышно в звонке с Marco, нужен доступ к микрофону.': { es: 'Para que Marco te oiga, hace falta acceso al micrófono.', en: 'So Marco can hear you, we need microphone access.' },
  'Давай, сайт уже открыт.': { es: 'Vale, ya tengo la web abierta.', en: 'Go ahead, I already have the site open.' },
  'На связи по вечерам': { es: 'Disponible por las tardes', en: 'Around in the evenings' },
  // служебные подписи, которых нет в старых кадрах
  'Назад': { es: 'Atrás', en: 'Back' },
};
const find = (ru, scr) => { const d = TX[scr]; if (!d) return null; const i = d.ru.indexOf(ru); return i < 0 ? null : { es: d.es[i], en: d.en[i] }; };
const nbh = (s) => s.replace(/(\p{L})-(\p{L})/gu, '$1\u2011$2');
const t = (ru) => nbh(t0(ru));
const t0 = (ru) => {
  if (OV[ru]) return LANG === 'ru' ? (OV[ru].ru || ru) : OV[ru][LANG];
  let r = find(ru, CUR);
  if (!r) for (const s of SCREENS) if ((r = find(ru, s))) break;
  if (!r) { missing.add(CUR + ': ' + ru); return ru; }
  return LANG === 'ru' ? ru : r[LANG];
};
// длинные строки — по началу
const tp = (prefix, scr = CUR) => { const d = TX[scr]; const i = d.ru.findIndex(x => x.startsWith(prefix)); if (i < 0) { missing.add(scr + ': ' + prefix + '…'); return prefix; } return d[LANG][i]; };
const L = (o) => o[LANG];
const tbd = (s, cls = '') => `<span class="tbd${cls ? ' ' + cls : ''}">${t(s)}</span>`;

// ---------- кирпичи ----------
const AV = { g0: 0, g1: 1, g2: 2, g3: 3, g4: 4, g5: 5 };
const av = (g, letter, cls = '') => `<span class="av ${cls}" style="background:var(--av-${AV[g]})" aria-hidden="true">${letter}</span>`;
const backBtn = () => `<span class="cbtn" aria-label="${t('Назад')}">${ic('back')}</span>`;
const nav = ({ title = '', sub = '', right = '<span></span>' } = {}) => `<header class="nav${title ? '' : ' clear'}"><div class="bar">${backBtn()}${title ? `<div class="ttl${sub ? '' : ' one'}"><b>${title}</b>${sub ? `<span>${sub}</span>` : ''}</div>` : ''}${right}</div></header>`;
const acts = (list) => `<div class="acts">${list.map(([i, s]) => `<span class="a"><i>${ic(i)}</i><span>${t(s)}</span></span>`).join('')}</div>`;
const prof = ({ g, l, name, real, st, ln, lead, leadIc, miss, icon }) => `<div class="prof">${icon ? `<span class="av" style="background:var(--raised)">${ic(icon)}</span>` : av(g, l)}<h1>${name}</h1>
${real ? `<p class="real">${t(real)}</p>` : ''}${st ? `<p>${t(st)}</p>` : ''}${ln ? `<p>${t(ln)}</p>` : ''}${lead ? `<p class="lead${miss ? ' miss' : ''}">${leadIc ? ic(leadIc) : ''}<span>${t(lead)}</span></p>` : ''}</div>`;
const chev = () => ic('chev', 'chev');
const igh = (s) => `<p class="igh">${t(s)}</p>`;
const igf = (html) => `<p class="igf">${html}</p>`;
const row = ({ cls = '', ii = '', b, small = [], v = '', chevron = false, tail = '' }) => `<li class="ir${cls ? ' ' + cls : ''}${tail ? ' has-tail' : ''}">${ii}<div class="tx"><b>${b}</b>${small.map(s => `<small>${s}</small>`).join('')}</div>${v ? `<span class="v">${v}</span>` : ''}${tail}${chevron ? chev() : ''}</li>`;
const iib = (n, color = '') => `<span class="ii"${color ? ` style="color:${color}"` : ''}>${ic(n)}</span>`;
const kv = (k, v) => `<li class="ir kv"><div class="tx"><b>${t(k)}</b></div><span class="v">${t(v)}</span></li>`;

const soundSearch = () => `<ul class="ig">
<li class="ir"><div class="tx"><b>${t('Звук')}</b><small>${t('Звук уведомлений из этого чата')}</small></div><span class="sw on" role="switch" aria-checked="true"></span></li>
${row({ cls: 'with-ic', ii: iib('search'), b: t('Поиск в чате'), small: [t('Искать сообщения в этом чате')], chevron: true })}</ul>`;
const searchOnly = () => `<ul class="ig">${row({ cls: 'with-ic', ii: iib('search'), b: t('Поиск в чате'), small: [t('Искать сообщения в этом чате')], chevron: true })}</ul>`;
const groups = () => `${igh('Общие группы')}<ul class="ig">
${row({ cls: 'with-av', ii: `<span class="ii av av36" style="background:var(--av-1)">${t('К')}</span>`, b: t('Квартира'), small: [t('12 участников')], chevron: true })}
${row({ cls: 'with-av', ii: `<span class="ii av av36" style="background:var(--av-5)">${t('М')}</span>`, b: t('Макеты'), chevron: true })}</ul>`;
const profNote = () => igf(`${t('Что есть в профиле: имя, статус, звук, поиск в чате, общие группы.')} ${tbd('не утверждено')}`);
const nameNote = () => igf(`${t('Имя для контакта и заметку видишь только ты.')} ${tbd('формулировка: не утверждено')}`);
const blockRow = (s = 'Заблокировать', cls = 'danger') => `<ul class="ig"><li class="ir ${cls}"><div class="tx"><b>${t(s)}</b></div></li></ul>`;
const MARCO = { g: 'g2', l: 'M', name: 'Marco', st: 'На связи по вечерам', ln: 'Пишет по-испански' };
const LUCIA = () => ({ g: 'g2', l: 'L', name: t('Лусия'), real: 'В профиле: Lucía Fernández', st: 'На связи по вечерам', ln: 'Пишет по-испански' });
const CHAT_ACTS = [['chats', 'Написать'], ['calls', 'Позвонить']];

// Профиль Marco (основа для contact-profile, contact-block)
const marcoProfile = () => `<div class="page pushed"><div class="scroll">${prof(MARCO)}${acts(CHAT_ACTS)}${soundSearch()}${groups()}${blockRow()}${profNote()}</div></div>${nav()}`;
// Профиль Лусии с именем для контакта (основа для contact-edit*)
const luciaProfile = (withNote) => `<div class="page pushed"><div class="scroll">${prof(LUCIA())}${acts(CHAT_ACTS)}
${withNote ? `${igh('Заметка')}<ul class="ig note"><li class="ir"><div class="tx"><p>${tp('Познакомились', 'contact-profile-note')}</p>
<div class="foot"><span>${t('Собеседник её не видит')}</span><a aria-label="${t('Ещё: Заметка')}">${t('Ещё')}</a></div></div></li></ul>` : ''}
${soundSearch()}${groups()}${blockRow()}${nameNote()}</div></div>${nav({ right: `<span class="pbtn">${t('Изменить')}</span>` })}`;

// Лист «Изменить контакт»
const editSheet = ({ name, hint, reset = true, note, cnt, max }) => `<div class="under">${luciaProfile(false)}</div>
<div class="scrim" style="background:rgba(0,0,0,.2)"></div>
<div class="sheet" role="dialog" aria-label="${t('Изменить контакт')}"><div class="sbar"><span class="cbtn" aria-label="${t('Отмена')}">${ic('x')}</span><h2>${t('Изменить контакт')}</h2><span class="cbtn send" aria-label="${t('Готово')}">${ic('check')}</span></div>
<div class="sbody">${igh('Имя')}<ul class="ig"><li class="ir"><div class="field-c">${name}</div></li></ul>
${igf(hint)}
${reset ? `<ul class="ig"><li class="ir accent"><div class="tx"><b>${t('Сбросить к имени из профиля')}</b></div></li></ul>` : ''}
${igh('Заметка')}<ul class="ig"><li class="ir">${note}</li></ul>
<div class="nfoot"><span>${t('Собеседник её не видит')}</span>${cnt ? `<span class="cnt${max ? ' max' : ''}">${cnt}</span>` : ''}${max ? `<span class="lim" role="status">${t('Больше 500 символов не поместится')}</span>` : ''}</div>
<p class="small">${tbd('формулировка: не утверждено', 'blk')}</p></div></div>`;
const notePh = () => `<div class="notefield"><span class="ph">${t('Например, где вы познакомились')}</span></div>`;
const noteLong = (txt) => `<div class="notefield focus" style="display:flex;flex-direction:column;justify-content:flex-end"><div>${txt}<i class="caret"></i></div></div>`;

// ---------- лента звонков ----------
const DIR = { 'Групповой · 24 мин': 'people', 'Входящий · 12 мин': 'in', 'Пропущенный': 'in', 'Исходящий · 3 мин': 'out', 'Без ответа': 'out' };
const crow = ({ g, l, n, tm, sub, miss, grp }) => `<li class="crow${miss ? ' miss' : ''}">${av(g, t(l))}<div class="cb"><div class="cx"><b>${t(n)}</b><small>${ic(DIR[sub])}<span>${t(sub)}</span></small></div><span class="tm">${tm}</span><span class="call" aria-label="${t('Позвонить: ' + n)}">${ic('calls')}</span></div></li>`;
const sec = (s, rows) => `<p class="sech">${t(s)}</p><ul class="list">${rows.map(crow).join('')}</ul>`;
const callsHead = (newBtn = true) => `<div class="head"><div class="bar"><span class="sp"></span>${newBtn ? `<span class="pbtn">${ic('calls')}${t('Новый звонок')}</span>` : ''}</div><h1 class="large">${t('Звонки')}</h1></div>`;
const seg = (on) => `<div class="seg" role="tablist" aria-label="${t('Звонки')}"><span role="tab" class="${on === 0 ? 'on' : ''}">${t('Все')}</span><span role="tab" class="${on === 1 ? 'on' : ''}">${t('Пропущенные')}</span></div>`;
const callsNotes = () => `<p class="small" style="margin-top:14px">${t('Где открывается список звонков (вкладка или «Позвонить» в быстрых действиях):')} ${tbd('не утверждено')}</p>
<p class="small">${t('Срок хранения истории звонков и копии протокола на сервере: [уточнить].')} ${tbd('юрист проверит')}</p>`;
const R = {
  kv: { g: 'g1', l: 'К', n: 'Квартира', tm: '12:05', sub: 'Групповой · 24 мин' },
  mc: { g: 'g2', l: 'M', n: 'Marco', tm: '09:14', sub: 'Входящий · 12 мин' },
  mm: { g: 'g3', l: 'М', n: 'Мама', tm: '18:02', sub: 'Пропущенный', miss: true },
  an: { g: 'g4', l: 'А', n: 'Анна Л.', tm: '14:30', sub: 'Исходящий · 3 мин' },
  pt: { g: 'g0', l: 'П', n: 'Петя', tm: '10:15', sub: 'Без ответа' },
  an2: { g: 'g4', l: 'А', n: 'Анна Л.', tm: '09:40', sub: 'Пропущенный', miss: true },
};
const skel = (n) => `<ul class="list">${Array.from({ length: n }, (_, i) => `<li class="skrow"><i class="sk c"></i><div class="l"><i class="sk" style="width:${[46, 62, 38, 55, 44][i % 5]}%"></i><i class="sk" style="width:${[30, 40, 26, 34, 22][i % 5]}%;opacity:.6"></i></div></li>`).join('')}</ul>`;

// ---------- экран звонка ----------
const ctl = (cls, icn, s) => `<span class="ctl ${cls}"><i>${ic(icn, icn === 'hang' ? 'hang' : '')}</i><span>${t(s)}</span></span>`;
const callScr = ({ avHtml, h1, lead, mid = '', bottom }) => `<div class="callscr"><div class="cs">${avHtml}<h1>${h1}</h1>${lead ? `<p class="lead" role="status">${lead}</p>` : ''}${mid ? `<div class="mid">${mid}</div>` : ''}</div>${bottom}</div>`;
const dock = (btns, cls = 'call') => `<div class="dock ${cls}">${btns}</div>`;
const cta = (s, cls = '') => `<span class="cta${cls ? ' ' + cls : ''}">${t(s)}</span>`;
const avBig = (g, l) => av(g, l);
const avIc = (n) => `<span class="av ic-av">${ic(n)}</span>`;
const aim = () => `<div class="aim" role="note">${ic('info')}<span>${t('Расшифровку и перевод делает ИИ — возможны ошибки.')}</span></div>`;
const protoNote = () => `<p class="small">${t('После звонка протокол придёт в чат участникам звонка. Каждый может удалить его у себя.')} ${tbd('не утверждено')}</p>`;
const keepNote = () => `<p class="small">${t('Срок хранения истории звонков и копии протокола на сервере: [уточнить].')} ${tbd('юрист проверит')}</p>`;
const protoCard = (sub) => `<ul class="ig">${row({ cls: 'with-ic', ii: iib('doc', 'var(--acc)'), b: `<span style="font-weight:600">${t('Протокол звонка')}</span>`, small: [t(sub), t('Расшифровка ИИ')], tail: `<span class="cta sm">${t('Открыть')}</span>` })}</ul>`;
const delRow = () => `<ul class="ig">${row({ cls: 'danger with-ic', ii: iib('trash', 'var(--err)'), b: t('Удалить из истории звонков') })}</ul><p class="igf">${tbd('не утверждено', 'blk')}</p>`;

// ---------- экраны ----------
const S = {};
S['contact-profile'] = () => marcoProfile();
S['contact-profile-note'] = () => luciaProfile(true);
S['contact-edit'] = () => editSheet({ name: t('Лусия'), hint: t('В профиле: Lucía Fernández'), note: notePh() });
S['contact-edit-filled'] = () => editSheet({ name: t('Лусия, испанский'), hint: t('В профиле: Lucía Fernández'), note: noteLong(tp('Познакомились')), cnt: t('476 / 500') });
S['contact-edit-limit'] = () => editSheet({ name: t('Лусия, испанский'), hint: t('В профиле: Lucía Fernández'), note: noteLong(tp('Познакомились')), cnt: t('500 / 500'), max: true });
S['contact-edit-reset'] = () => editSheet({ name: 'Lucía Fernández', hint: t('Совпадает с именем в профиле'), reset: false, note: notePh() });
S['contact-block'] = () => `${marcoProfile()}<div class="scrim dark"></div>
<div class="alert" role="alertdialog" aria-label="${t('Заблокировать Marco?')}"><div class="ab"><h2>${t('Заблокировать Marco?')}</h2><p>${t('Marco не получит уведомления о блокировке.')}</p>${tbd('формулировка: не утверждено', 'blk')}</div>
<span class="bt danger">${t('Заблокировать')}</span><span class="bt">${t('Отмена')}</span></div>`;
S['contact-blocked'] = () => `<div class="page pushed"><div class="scroll">${prof(MARCO)}
<div class="banner" role="status">${ic('block')}<div><h3>${t('Контакт Marco заблокирован')}</h3><p>${t('Снять блокировку можно здесь.')} ${tbd('формулировка: не утверждено')}</p></div></div>
${searchOnly()}${groups()}${blockRow('Разблокировать', 'accent')}${igf(tbd('не утверждено', 'blk'))}${profNote()}</div></div>${nav()}`;
S['contact-error'] = () => `<div class="page pushed"><div class="scroll">${prof({ g: 'g2', l: 'M', name: 'Marco' })}
<div class="banner err" role="alert">${ic('alert')}<div><h3>${t('Не получилось загрузить профиль')}</h3><p>${t('Проверь сеть и попробуй ещё раз.')} ${tbd('формулировка: не утверждено')}</p></div></div>
<div style="padding:0 16px">${cta('Повторить', 'primary')}</div></div></div>${nav()}`;
S['contact-loading'] = () => `<div class="page pushed"><div class="scroll">${prof({ g: 'g2', l: 'M', name: 'Marco' })}
<p class="loadln" role="status"><i class="spin"></i><span>${t('Загружаем профиль…')}</span>${tbd('формулировка: не утверждено')}</p>
<div class="ig">${skel(3)}</div></div></div>${nav()}`;
S['contact-nogroups'] = () => `<div class="page pushed"><div class="scroll">${prof(MARCO)}${acts(CHAT_ACTS)}${soundSearch()}
${igh('Общие группы')}<div class="ig"><div class="es" role="status"><i>${ic('people')}</i><h2>${t('Общих групп нет')}</h2><p>${t('Когда появится общая группа, она будет здесь.')} ${tbd('формулировка: не утверждено')}</p></div></div>
${blockRow()}${profNote()}</div></div>${nav()}`;
S['contact'] = () => `<div class="page pushed"><div class="scroll">${prof({ g: 'g2', l: 'M', name: 'Marco', lead: 'Контакт' })}${acts([['calls', 'Позвонить'], ['chats', 'Написать']])}
${igh('Последние звонки')}<ul class="ig">
${row({ cls: 'with-ic', ii: iib('in'), b: t('Входящий'), small: [t('12 мин')], v: t('Сегодня, 09:14') })}
${row({ cls: 'with-ic', ii: iib('out'), b: t('Исходящий'), small: [t('3 мин')], v: t('Вчера') })}</ul>
${igf(`${t('Перед звонком появится экран «Этот звонок переводится и расшифровывается ИИ».')} ${tbd('формулировка: не утверждено')}`)}</div></div>${nav()}`;
S['empty-contacts'] = () => `<div class="page root"><div class="scroll"><div class="head"><div class="bar"></div><h1 class="large">${t('Контакты')}</h1></div>
<div class="es" role="status"><i>${ic('contacts')}</i><h2>${t('Пока нет контактов')}</h2><p>${t('Пригласи человека по ссылке — он появится здесь.')}</p><span class="cta primary">${t('Пригласить по ссылке')}</span></div></div></div>${tabs('contacts')}`;
S['stranger'] = () => `<div class="page pushed"><div class="scroll">
<div class="req">${av('g3', 'A')}<h2>Alex R.</h2><p>${t('Пишет тебе впервые.')}</p></div>
<div class="strmsgs"><div class="grp in"><div class="b tail in-t">${t('Привет! Marco дал мне твою ссылку. Можем поговорить про квартиру?')}<span class="ms" aria-hidden="true">10:02</span><span class="m">10:02</span></div></div>
<p class="trrow"><span>${t('Переведено с английского')}</span><a>${t('Показать оригинал')}</a></p></div>
<div class="objn"><p>${t('Пока запрос не принят, Parrlo не читает это сообщение и не отвечает от твоего имени.')}</p>
<p>${t('Не хочешь, чтобы Parrlo читал твои сообщения?')}</p><div class="lnk"><a>${t('Возразить')}</a><a>${t('Подробнее')}</a></div>
<p>${t('Заблокировать или выйти можно в любой момент.')}</p><p>${t('Путь возражения (форма или e-mail):')} ${tbd('не утверждено')}</p></div></div>
<div class="dock"><div class="row2">${cta('Принять', 'primary')}${cta('Заблокировать')}</div></div></div>
${nav({ title: 'Alex R.', sub: t('Новый контакт'), right: av('g3', 'A', 'av36') })}`;
S['calls'] = () => `<div class="page root"><div class="scroll">${callsHead()}${seg(0)}
${sec('Сегодня', [R.kv, R.mc])}${sec('Вчера', [R.mm, R.an, R.pt])}${sec('Вт', [R.an2])}${callsNotes()}</div></div>${tabs('calls')}`;
S['calls-missed'] = () => `<div class="page root"><div class="scroll">${callsHead()}${seg(1)}
${sec('Вчера', [R.mm])}${sec('Вт', [R.an2])}${callsNotes()}</div></div>${tabs('calls')}`;
S['calls-empty'] = () => `<div class="page root"><div class="scroll">${callsHead(false)}${seg(0)}
<div class="es" role="status"><i>${ic('calls')}</i><h2>${t('Звонков пока нет')}</h2><p>${t('Здесь появятся звонки, когда ты позвонишь или тебе позвонят.')} ${tbd('формулировка: не утверждено')}</p>${cta('Позвонить', 'primary')}</div></div></div>${tabs('calls')}`;
S['calls-error'] = () => `<div class="page root"><div class="scroll">${callsHead()}${seg(0)}
<div class="banner err" role="alert">${ic('alert')}<div><h3>${t('Не удалось загрузить звонки')}</h3><p>${t('Проверь подключение к интернету и попробуй ещё раз.')} ${tbd('формулировка: не утверждено')}</p>${cta('Повторить', 'sm')}</div></div></div></div>${tabs('calls')}`;
S['calls-loading'] = () => `<div class="page root"><div class="scroll">${callsHead()}${seg(0)}
<p class="loadln" role="status"><i class="spin"></i><span>${t('Загружаем звонки…')}</span>${tbd('формулировка: не утверждено')}</p>${skel(5)}</div></div>${tabs('calls')}`;
S['call-detail'] = () => `<div class="page pushed"><div class="scroll">${prof({ g: 'g2', l: 'M', name: 'Marco', lead: 'Входящий звонок · Сегодня, 09:14', leadIc: 'in' })}${acts([['calls', 'Позвонить'], ['chats', 'Написать']])}
<ul class="ig">${kv('Когда', 'Сегодня, 09:14')}${kv('Длительность', '12 мин')}</ul>
${protoCard('Звонок с Marco · 12 мин')}${aim()}${protoNote()}${keepNote()}${delRow()}</div></div>${nav()}`;
S['call-detail-missed'] = () => `<div class="page pushed"><div class="scroll">${prof({ g: 'g3', l: t('М'), name: t('Мама'), lead: 'Пропущенный звонок · Вчера, 18:02', leadIc: 'in', miss: true })}${acts([['calls', 'Позвонить'], ['chats', 'Написать']])}
<ul class="ig">${kv('Когда', 'Вчера, 18:02')}</ul>
<p class="small">${t('Протокола нет: звонок не состоялся.')} ${tbd('формулировка: не утверждено')}</p>${keepNote()}${delRow()}</div></div>${nav()}`;
S['call-detail-group'] = () => `<div class="page pushed"><div class="scroll">${prof({ g: 'g1', l: t('К'), name: t('Квартира'), lead: 'Групповой звонок · Сегодня, 12:05 · 24 мин', leadIc: 'people' })}${acts([['calls', 'Позвонить в группу'], ['chats', 'Написать']])}
${igh('Участники звонка')}<ul class="ig">${[['g1', 'Л', 'Лена'], ['g2', 'M', 'Marco'], ['g4', 'А', 'Анна Л.'], ['g0', 'Т', 'Ты']].map(([g, l, n]) => row({ cls: 'with-av', ii: `<span class="ii av av36" style="background:var(--av-${AV[g]})">${t(l)}</span>`, b: t(n) })).join('')}</ul>
${protoCard('Групповой звонок · 24 мин')}${aim()}${protoNote()}${keepNote()}</div></div>${nav()}`;
S['call-incoming'] = () => callScr({ avHtml: avBig('g2', 'M'), h1: t('Marco звонит…'), lead: t('Входящий звонок'),
  mid: `<p class="small" style="text-align:center">${t('Перед началом покажем уведомление о переводе и расшифровке.')} ${tbd('формулировка: не утверждено')}</p>`,
  bottom: `<div class="ctls">${ctl('red', 'hang', 'Отклонить')}${ctl('green', 'calls', 'Ответить')}</div>` });
S['call-connecting'] = () => callScr({ avHtml: avBig('g2', 'M'), h1: t('Звоним Marco…'), lead: t('Ждём ответа'),
  mid: `<p class="small" style="text-align:center">${t('Пока Marco не ответит, расшифровки нет.')} ${tbd('формулировка: не утверждено')}</p>`,
  bottom: `<div class="ctls">${ctl('red', 'hang', 'Отменить звонок')}</div>` });
S['call'] = () => `<div class="incall"><div class="cbar"><span class="rec" role="status">${t('Идёт расшифровка ИИ')}</span><span class="sp"></span><span class="cbtn" aria-label="${t('Полный протокол')}">${ic('list')}</span></div>
<div class="toast" role="status">${t('Все в звонке видят, что идёт расшифровка. Протокол придёт в чат участникам звонка.')}</div>
<div class="stage" role="img" aria-label="${t('Видео собеседника')}"><div class="who">${av('g2', 'M')}</div><span class="self">${t('Ты')}</span>
<div class="subs"><b>Marco</b><p>${t('Увидимся у входа в девять, я возьму билеты.')}</p><small>${t('Перевод с испанского')}</small></div></div>
<div class="ctls three">${ctl('', 'micoff', 'Микрофон')}${ctl('red', 'hang', 'Завершить')}${ctl('', 'list', 'Полный протокол')}</div></div>`;
S['call-ended'] = () => callScr({ avHtml: avIc('hang'), h1: t('Звонок завершён'), lead: t('Marco · 12 мин'), mid: `${aim()}${protoNote()}`,
  bottom: dock(cta('Открыть расшифровку', 'primary') + cta('Закрыть')) });
S['call-failed'] = () => callScr({ avHtml: avBig('g2', 'M'), h1: t('Звонок не начался'), lead: t('Ничего не отправлено и звонок не идёт.'),
  mid: `<div class="banner err" role="alert">${ic('alert')}<div><h3>${t('Не удалось позвонить')}</h3><p>${t('Проверь подключение к интернету и попробуй ещё раз.')} ${tbd('формулировка: не утверждено')}</p></div></div>`,
  bottom: dock(cta('Повторить', 'primary') + cta('Отмена')) });
S['call-noanswer'] = () => callScr({ avHtml: avBig('g2', 'M'), h1: t('Marco не отвечает'), lead: `${t('Попробуй позвонить позже или напиши.')} ${tbd('формулировка: не утверждено')}`,
  bottom: dock(cta('Позвонить ещё раз', 'primary') + cta('Написать') + cta('Закрыть', 'plain')) });
S['call-network-lost'] = () => callScr({ avHtml: avBig('g2', 'M'), h1: t('Связь пропала'), lead: t('Пробуем подключиться снова…'),
  mid: `<div class="banner" role="status">${ic('wifioff')}<div><h3>${t('Нет сети')}</h3><p>${t('Звонок на паузе, расшифровка и перевод ждут связи. Если связь не вернётся за 60 секунд, звонок завершится.')} ${tbd('формулировка: не утверждено')}</p></div></div>
<p class="loadln" role="status" style="padding-left:4px"><i class="spin"></i><span>${t('Переподключаем…')}</span></p>`,
  bottom: dock(cta('Завершить звонок', 'danger') + cta('Подождать')) });
S['call-mic-blocked'] = () => callScr({ avHtml: avIc('micoff'), h1: t('Микрофон выключен'), lead: t('Доступ запрещён, поэтому тебя не слышно. Включи его в настройках.'),
  mid: `<ul class="ig">${['1. Открой настройки сайта или приложения.', '2. Найди «Микрофон».', '3. Выбери «Разрешить» и вернись в звонок.'].map(s => `<li class="ir"><div class="tx"><b>${t(s)}</b></div></li>`).join('')}</ul><p class="small" style="margin-top:-14px">${tbd('формулировка: не утверждено', 'blk')}</p>`,
  bottom: dock(cta('Открыть настройки', 'primary') + cta('Закрыть')) });
S['call-permission'] = () => callScr({ avHtml: avIc('mic'), h1: t('Разреши микрофон'), lead: t('Чтобы тебя было слышно в звонке с Marco, нужен доступ к микрофону.'),
  mid: `<ul class="ig">${kv('Микрофон', 'нужен для звонка')}${kv('Камера', 'по желанию, для видео')}</ul><p class="small" style="margin-top:-8px">${t('Появится запрос системы или браузера — выбери «Разрешить». Передумаешь — это можно поменять в настройках.')} ${tbd('формулировка: не утверждено')}</p>`,
  bottom: dock(cta('Разрешить', 'primary') + cta('Не сейчас')) });
S['call-notice'] = () => `<div class="page pushed"><div class="scroll"><div class="consent"><span class="pp">${parrot()}</span>
<h1>${t('Этот звонок переводится и расшифровывается ИИ')}</h1><p class="lead">${tp('Parrlo Chat переведёт')} ${tbd('юрист проверит')}</p>
<ul class="ig">${row({ cls: 'with-av', ii: `<span class="ii av av36" style="background:var(--av-2)">M</span>`, b: `<span style="font-weight:600">${t('Звонок с Marco')}</span>`, small: [t('Идёт расшифровка ИИ')] })}</ul>
<p class="small">${t('Поставщики ИИ и «звук и видео не сохраняются»:')} ${tbd('не утверждено')}</p>
<p class="ph">${tp('Оператор:')} ${L({ ru: 'hello@parrlo.com', es: 'hello@parrlo.com', en: 'hello@parrlo.com' })}</p><span class="linkbtn">${t('Подробнее')}</span></div></div>
<div class="dock"><p class="note" role="group">${t('Нажимая «Продолжить», ты соглашаешься на перевод и расшифровку этого звонка. Не хочешь — нажми «Выйти», это нормально.')}</p>${cta('Продолжить', 'primary')}${cta('Выйти')}</div></div>${nav()}`;
S['call-protocol'] = () => `<div class="page pushed"><div class="scroll"><div style="padding:4px 16px 12px"><span class="rec" role="status">${t('Ведётся протокол (расшифровка ИИ)')}</span></div>${aim()}
<ul class="proto" aria-label="${t('Протокол звонка')}">${[['Marco', 'Привет! Слышно хорошо?'], ['Ты', 'Да, слышу отлично.'], ['Marco', 'Тогда начнём с билетов.'], ['Ты', 'Давай, сайт уже открыт.']].map(([w, s]) => `<li${w === 'Ты' ? ' class="me"' : ''}><b>${t(w)}</b><span>${t(s)}</span></li>`).join('')}</ul>
${protoNote()}</div></div>${nav({ title: t('Протокол звонка') })}`;
S['search-home'] = () => `<div class="page bare"><div class="srow"><div class="search" role="search">${ic('search')}<span class="ph" role="textbox" aria-label="${t('Поиск по чатам и контактам')}">${t('Чаты и контакты')}</span></div><span class="cancel">${t('Отмена')}</span></div>
<div class="scroll"><div class="es" role="status"><i>${ic('search')}</i><h2>${t('Ищи по чатам и контактам')}</h2><p>${t('Введи имя человека или название чата.')} ${tbd('формулировка: не утверждено')}</p></div></div></div>`;
const SR = {
  ru: { cancel: 'Отмена', clear: 'Очистить поиск', chats: 'Чаты', contacts: 'Контакты', contact: 'Контакт', call: 'Позвонить: ',
    c: [['g3', 'М', 'Мама', 'Вчера', 'Позвони, как сможешь'], ['g5', 'М', 'Макеты', 'Пн', 'Файл с макетами обновлён']],
    k: [['g1', 'М', 'Мария К.'], ['g4', 'М', 'Матвей']],
    note: 'Ищем и в оригинале, и в переводе сообщений, результаты — одной лентой. Протоколы звонков и память Parrlo в поиск не входят.', tbd: 'формулировка: не утверждено' },
  es: { cancel: 'Cancelar', clear: 'Borrar búsqueda', chats: 'Chats', contacts: 'Contactos', contact: 'Contacto', call: 'Llamar a ',
    c: [['g2', 'M', 'Marco', 'Ayer', 'Nos vemos en la entrada a las nueve'], ['g3', 'M', 'Mamá', 'Ayer', 'Llámame cuando estés libre'], ['g5', 'M', 'Maquetas', 'Lun', 'El archivo de maquetas está actualizado']],
    k: [['g1', 'M', 'María G.'], ['g4', 'M', 'Mateo']],
    note: 'La búsqueda incluye el original y la traducción de los mensajes, en una sola lista. Las transcripciones de llamadas y la memoria de Parrlo no se incluyen en la búsqueda.', tbd: 'redacción: no aprobada' },
  en: { cancel: 'Cancel', clear: 'Clear search', chats: 'Chats', contacts: 'Contacts', contact: 'Contact', call: 'Call ',
    c: [['g2', 'M', 'Marco', 'Yesterday', 'See you at the entrance at nine']],
    k: [['g1', 'M', 'Maria G.'], ['g4', 'M', 'Matt']],
    note: 'Search covers both the original and the translation of messages, in a single list. Call transcripts and Parrlo’s memory are not included in search.', tbd: 'wording: not approved' },
};
const hl = (n) => `<mark>${n.slice(0, 2)}</mark>${n.slice(2)}`;
S['search-home-results'] = () => { const r = SR[LANG]; return `<div class="page bare"><div class="srow"><div class="search" role="search">${ic('search')}<span class="q" role="textbox" aria-label="${t('Поиск по чатам и контактам')}">${L({ ru: 'Ма', es: 'Ma', en: 'Ma' })}</span><span class="cw" aria-label="${r.clear}">${ic('clr', 'clr')}</span></div><span class="cancel">${r.cancel}</span></div>
<div class="scroll"><p class="sech">${r.chats}</p><ul class="list">${r.c.map(([g, l, n, tm, pv]) => `<li class="crow">${av(g, l)}<div class="cb"><div class="cx"><b>${hl(n)}</b><small><span>${pv}</span></small></div><span class="tm">${tm}</span></div></li>`).join('')}</ul>
<p class="sech">${r.contacts}</p><ul class="list">${r.k.map(([g, l, n]) => `<li class="crow">${av(g, l)}<div class="cb"><div class="cx"><b>${hl(n)}</b><small><span>${r.contact}</span></small></div><span class="call" aria-label="${r.call + n}">${ic('calls')}</span></div></li>`).join('')}</ul>
<p class="small" style="margin-top:14px">${r.note} <span class="tbd">${r.tbd}</span></p></div></div>`; };

// ---------- страница: три языка в <template>, выбор по ?l ----------
const WORDFIT = fs.readFileSync(path.join(__dirname, 'wordfit.js'), 'utf8');
const TITLES = { ru: {}, es: {}, en: {} };
const page = (id, cls, bodies) => `<!doctype html>
<html lang="ru" data-d="max" data-t="n" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${id} — редизайн iOS</title><link rel="stylesheet" href="../rd.css"><link rel="stylesheet" href="contacts-calls.css">
<script>(function(){var q=new URLSearchParams(location.search),h=document.documentElement;h.dataset.d=q.get('d')||'max';h.dataset.t=q.get('t')||'n';
h.dataset.theme='dark';var l=q.get('l');h.lang=(l==='es'||l==='en')?l:'ru'})()</script>
</head><body><main class="screen ${cls}"></main>
${['ru', 'es', 'en'].map(l => `<template data-l="${l}">${statusBar()}\n${bodies[l]}\n<i class="home-ind"></i></template>`).join('\n')}
<script>${WORDFIT}
(function(){var l=document.documentElement.lang,tp=document.querySelector('template[data-l="'+l+'"]');document.querySelector('.screen').appendChild(tp.content.cloneNode(true));
document.fonts.ready.then(function(){if(document.documentElement.dataset.t==='ax5')wordFit(document.querySelector('.screen'));document.body.dataset.ready='1'})})()</script>
</body></html>
`;
const CLS = (id) => ['calls', 'calls-missed', 'calls-empty', 'calls-error', 'calls-loading', 'empty-contacts'].includes(id) ? 'has-tabs' : '';
for (const id of SCREENS) {
  CUR = id; const bodies = {};
  for (const l of ['ru', 'es', 'en']) { LANG = l; bodies[l] = S[id](); }
  fs.writeFileSync(path.join(OUT, id + '.html'), page(id, CLS(id), bodies));
}
if (missing.size) { console.log('НЕТ В СТАРЫХ КАДРАХ:\n' + [...missing].join('\n')); }

// ---------- обзор (Pro Max, обычный, ru) ----------
const CAP = {
  'contact': 'Контакт (из звонков)', 'contact-profile': 'Профиль собеседника', 'contact-profile-note': 'Профиль: имя для контакта и заметка', 'contact-edit': 'Изменить контакт', 'contact-edit-filled': 'Изменить контакт: заполнено', 'contact-edit-limit': 'Изменить контакт: предел 500', 'contact-edit-reset': 'Изменить контакт: имя сброшено', 'contact-block': 'Заблокировать?', 'contact-blocked': 'Заблокирован', 'contact-error': 'Профиль: ошибка', 'contact-loading': 'Профиль: загрузка', 'contact-nogroups': 'Профиль: нет общих групп', 'empty-contacts': 'Контакты: пусто', 'stranger': 'Новый контакт: запрос',
  'calls': 'Звонки', 'calls-empty': 'Звонки: пусто', 'calls-missed': 'Звонки: пропущенные', 'calls-error': 'Звонки: ошибка', 'calls-loading': 'Звонки: загрузка', 'call-detail': 'Звонок: подробности', 'call-detail-missed': 'Пропущенный звонок', 'call-detail-group': 'Групповой звонок', 'call-incoming': 'Входящий звонок', 'call-connecting': 'Звоним…', 'call': 'Идёт звонок', 'call-ended': 'Звонок завершён', 'call-failed': 'Звонок не начался', 'call-noanswer': 'Не отвечает', 'call-network-lost': 'Связь пропала', 'call-mic-blocked': 'Микрофон выключен', 'call-permission': 'Разреши микрофон', 'call-notice': 'Уведомление перед звонком', 'call-protocol': 'Протокол звонка', 'search-home': 'Поиск', 'search-home-results': 'Поиск: результаты',
};
const idx = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Контакты и звонки — редизайн iOS</title>
<style>@font-face{font-family:Inter;font-weight:100 900;src:url(../../fonts/Inter-Variable.woff2) format("woff2")}
body{margin:0;background:#0B0E12;color:#E8ECF1;font-family:-apple-system,"SF Pro Text",Inter,system-ui,sans-serif;padding:40px 40px 60px;width:2000px}
h1{font-size:28px;font-weight:600;margin:0 0 6px}p.l{color:#9AA4B2;margin:0 0 28px;font-size:15px}
.g{display:flex;flex-wrap:wrap;gap:30px 22px}
figure{margin:0;width:264px}figure img{display:block;width:264px;border-radius:18px;border:1px solid rgba(255,255,255,.14)}
figcaption{font-size:13px;color:#9AA4B2;margin-top:8px;line-height:1.35}figcaption b{color:#E8ECF1;font-weight:600;display:block}</style></head><body>
<h1>Контакты, звонки, профиль собеседника — редизайн iOS</h1><p class="l">Pro Max 440×956 · обычный размер текста · ru · тёмная тема. Все кадры — png/&lt;экран&gt;__&lt;se|max&gt;-&lt;n|ax5&gt;-&lt;ru|es|en&gt;.png</p>
<div class="g">${SCREENS.map(k => `<figure><img src="png/${k}__max-n-ru.png" alt="${CAP[k]}"><figcaption><b>${CAP[k]}</b>${k}</figcaption></figure>`).join('')}</div>
</body></html>`;
fs.writeFileSync(path.join(OUT, 'index.html'), idx);
console.log('ok: ' + SCREENS.length + ' экранов');
