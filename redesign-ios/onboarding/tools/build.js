// Генератор страниц «Вход и онбординг» (редизайн iOS). Запуск: node redesign-ios/onboarding/tools/build.js
// Страница принимает ?d=se|max, ?t=n|ax5, ?l=ru|es|en.
// Тексты — дословно из frames/{ru,es,en}-<экран>.html (кадр __pro-n). Хелперы скопированы из redesign-ios/tools/build.js.
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '..');
const LANGS = ['ru', 'es', 'en'];
const { glueHtml } = require('../../tools/nbsp.js'); // NBSP после коротких слов (общий список redesign-ios/tools/short-words.json)

// ---------- из redesign-ios/tools/build.js ----------
const PARROT_INNER = '<defs><mask id="pc-pmk" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024"><rect width="1024" height="1024" fill="#fff"/><circle cx="612" cy="372" r="44" fill="#000"/><path d="M735 322 L 895 322 A160 160 0 0 1 735 482 Z" fill="#000" stroke="#000" stroke-width="28" stroke-linejoin="round"/></mask></defs><g mask="url(#pc-pmk)"><path d="M345 800 L 235 925 L 420 895 Z" stroke="currentColor" stroke-width="70" stroke-linejoin="round"/><circle cx="500" cy="640" r="245"/><circle cx="560" cy="395" r="235"/></g><path d="M735 322 L 895 322 A160 160 0 0 1 735 482 Z"/>';
let pid = 0;
const parrot = () => { const id = 'pc-pmk' + (pid++); return `<svg class="ic ic-parrot" viewBox="180 140 735 840" aria-hidden="true" focusable="false">${PARROT_INNER.replace(/pc-pmk/g, id)}</svg>`; };
const P = {
  back: '<path d="M14.5 5.5L8 12l6.5 6.5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.8-4.8"/>',
  compose: '<path d="M12 4.5H6.5a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2V12"/><path d="M17.6 3.9a2 2 0 012.8 2.8L12.5 14.6l-3.7.9.9-3.7z"/>',
  contacts: '<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.3-3.6 4.2-5.6 7.5-5.6s6.2 2 7.5 5.6"/>',
  calls: '<path d="M6.2 3.8h3l1.6 4.2-2 1.3a10.5 10.5 0 005.9 5.9l1.3-2 4.2 1.6v3a2 2 0 01-2.2 2A16.5 16.5 0 014.2 6a2 2 0 012-2.2z"/>',
  chats: '<path d="M12 3.8c4.8 0 8.6 3.3 8.6 7.4s-3.8 7.4-8.6 7.4c-1 0-2-.1-2.9-.4L5 20l1-3.6c-1.6-1.4-2.6-3.2-2.6-5.2 0-4.1 3.8-7.4 8.6-7.4z"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.8l1.6 2.3 2.7-.6.6 2.7 2.4 1.4-1 2.5 1 2.5-2.4 1.4-.6 2.7-2.7-.6L12 21.2l-1.6-2.3-2.7.6-.6-2.7-2.4-1.4 1-2.5-1-2.5 2.4-1.4.6-2.7 2.7.6z"/>',
  people: '<circle cx="9" cy="9" r="3"/><path d="M3.5 18.5c.9-2.8 3-4.3 5.5-4.3s4.6 1.5 5.5 4.3"/><circle cx="16.5" cy="9.5" r="2.4"/><path d="M16.3 14.2c2 .1 3.6 1.4 4.3 3.6"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.2-3.6-8.5S9.6 5.9 12 3.5z"/>',
  memory: '<path d="M7 3.8h10a1 1 0 011 1v15.4l-6-3.9-6 3.9V4.8a1 1 0 011-1z"/>',
  // новые для онбординга
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  x: '<path d="M7 7l10 10M17 7L7 17"/>',
  chev: '<path d="M8 10l4 4 4-4"/>',
  updown: '<path d="M8.5 9.5L12 6l3.5 3.5M8.5 14.5L12 18l3.5-3.5"/>',
  alert: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.8v5"/><circle cx="12" cy="16.2" r=".9" fill="currentColor" stroke="none"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.2"/><circle cx="12" cy="7.9" r=".9" fill="currentColor" stroke="none"/>',
  eye: '<path d="M2.8 12S6.2 5.8 12 5.8 21.2 12 21.2 12 17.8 18.2 12 18.2 2.8 12 2.8 12z"/><circle cx="12" cy="12" r="2.8"/>',
  bubble: '<path d="M5 5.5h14a1.5 1.5 0 011.5 1.5v8.5a1.5 1.5 0 01-1.5 1.5h-7l-4.5 3.5V17H5a1.5 1.5 0 01-1.5-1.5V7A1.5 1.5 0 015 5.5z"/>',
  server: '<rect x="4" y="4.5" width="16" height="6" rx="2"/><rect x="4" y="13.5" width="16" height="6" rx="2"/><path d="M7.5 7.5h.01M7.5 16.5h.01"/>',
  power: '<path d="M12 3.5v8"/><path d="M7.2 6.6a7.5 7.5 0 109.6 0"/>',
  link: '<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',
  findp: '<circle cx="10" cy="8.5" r="3.5"/><path d="M3.5 19.5c1-3.3 3.6-5.2 6.5-5.2 1 0 1.9.2 2.7.5"/><circle cx="17" cy="16" r="2.8"/><path d="M19.1 18.1l2 2"/>',
  block: '<circle cx="12" cy="12" r="8.5"/><path d="M6 6l12 12"/>',
  trans: '<path d="M4 6h9M8.5 4v2M6 6c.8 3 3 5.4 6 6.5M11 6c-.8 3-3 5.4-6 6.5"/><path d="M13 20l3.5-8 3.5 8M14.2 17.3h4.6"/>',
  spin: '<path d="M12 3.5a8.5 8.5 0 108.5 8.5" opacity=".9"/>',
  // SF person.fill / mic.fill (заливка)
  person: '<circle cx="12" cy="7.6" r="4.1" fill="currentColor" stroke="none"/><path d="M3.8 20.2c.7-4.1 4-6.6 8.2-6.6s7.5 2.5 8.2 6.6c.1.5-.3.8-.8.8H4.6c-.5 0-.9-.3-.8-.8z" fill="currentColor" stroke="none"/>',
  mic: '<rect x="8.6" y="2.6" width="6.8" height="12" rx="3.4" fill="currentColor" stroke="none"/><path d="M5.6 11.2a6.4 6.4 0 0012.8 0M12 17.6v3.4M8.8 21h6.4"/>',
};
const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;
const TICK2 = '<svg class="tick" viewBox="0 0 17 11" aria-hidden="true"><path d="M1 6l3.2 3.2L10 2.8"/><path d="M7.6 8.6l.6.6L15.6 1.8"/></svg>';
const statusBar = () => `<div class="sb"><span>9:41</span><i class="island"></i><span class="ri">
<svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
<svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 008 .6 10.4 10.4 0 00.8 3.5L2 4.8a8.6 8.6 0 016-2.4zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.8 6.8 0 008 4.2 6.8 6.8 0 003.4 6l1.2 1.3c.9-.8 2.1-1.3 3.4-1.3zm0 3.5c.4 0 .8.2 1.1.4L8 11.2 6.9 9.9c.3-.2.7-.4 1.1-.4z"/></svg>
<svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="22" height="12" rx="3.5" fill="none" stroke="currentColor" stroke-opacity=".4"/><rect x="2" y="2" width="16" height="9" rx="2" fill="currentColor"/><path d="M24.5 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2z" fill="currentColor" fill-opacity=".4"/></svg></span></div>`;
const TABS = [['contacts', 'Контакты', 'Contactos', 'Contacts'], ['calls', 'Звонки', 'Llamadas', 'Calls'], ['parrlo', '', '', ''], ['chats', 'Чаты', 'Chats', 'Chats'], ['gear', 'Настройки', 'Ajustes', 'Settings']];
const tabs = (active, li) => `<nav class="tabs" aria-label="${['Разделы', 'Secciones', 'Sections'][li]}">${TABS.map(([k, ...lab]) => {
  const on = k === active;
  if (k === 'parrlo') return `<a class="pc" aria-label="Parrlo"><i class="disc">${parrot()}</i></a>`;
  return `<a class="${on ? 'on' : ''}">${ic(k, on && k !== 'gear' ? 'fill' : '')}<span>${lab[li]}</span></a>`;
}).join('')}</nav>`;
const meta = (inner) => `<span class="ms" aria-hidden="true">${inner}</span><span class="m">${inner}</span>`;
const bubble = ({ text, time, own, tail }) => `<div class="b ${tail ? 'tail ' + (own ? 'out-t' : 'in-t') : ''}">${text}${time ? meta(time + (own ? TICK2 : '')) : ''}</div>`;
const group = (own, items) => `<div class="grp ${own ? 'out' : 'in'}">${items.map((it, i) => bubble({ ...it, own, tail: i === items.length - 1 })).join('')}</div>`;

// ---------- текст: без переноса внутри слова ----------
// слова с дефисом или косой чертой не рвём (иначе браузер переносит после «-» или «/»); неразрывные пробелы — как в i18n/signin-errors.md
const NBSP = [/через (Google|Apple)/g, /ещё раз/g, /con (Google|Apple)/g, /with (Google|Apple)/g];
const tx = (s) => {
  let r = s.replace(/(^|[\s(«“])([^\s<>]*[\-/][^\s<>]*)/g, (m, a, w) => w.length > 1 && /[\p{L}\d]/u.test(w) && !/^[—–\-→·]+$/.test(w) ? `${a}<span class="nw">${w}</span>` : m);
  for (const re of NBSP) r = r.replace(re, (m) => m.replace(' ', ' '));
  return r;
};

// ---------- общие куски ----------
const L = (ru, es, en) => [ru, es, en];
const C = {
  back: L('Назад', 'Atrás', 'Back'),
  step: (n) => L(`Шаг ${n} из 7`, `Paso ${n} de 7`, `Step ${n} of 7`),
  word: L('формулировка: не утверждено', 'redacción: no aprobada', 'wording: not approved'),
  na: L('не утверждено', 'no aprobado', 'not approved'),
  cont: L('Продолжить', 'Continuar', 'Continue'),
  si_t: L('Войди в Parrlo Chat', 'Entra en Parrlo Chat', 'Sign in to Parrlo Chat'),
  si_l: L('Выбери, как войти. Придумывать пароль не нужно.', 'Elige cómo entrar. No hace falta clave.', 'Choose how to sign in. There is no password to invent.'),
  legal: L('Продолжая, ты принимаешь Условия использования и Политику конфиденциальности.', 'Al continuar, aceptas las Condiciones de uso y la Política de privacidad.', 'By continuing, you accept the Terms of Use and the Privacy Policy.'),
  terms: L('Условия использования', 'Condiciones de uso', 'Terms of Use'),
  privacy: L('Политика конфиденциальности', 'Política de privacidad', 'Privacy Policy'),
  op: L('Оператор: PADELADA WORLD, S.L. · NIF B05783238 · Calle Josep Pla 8, Esc. 1, Pta. 1, 17252 Calonge i Sant Antoni (Girona), España · hello@parrlo.com. Политика конфиденциальности.',
    'Responsable: PADELADA WORLD, S.L. · NIF B05783238 · Calle Josep Pla 8, Esc. 1, Pta. 1, 17252 Calonge i Sant Antoni (Girona), España · hello@parrlo.com. Política de privacidad.',
    'Controller: PADELADA WORLD, S.L. · NIF B05783238 · Calle Josep Pla 8, Esc. 1, Pta. 1, 17252 Calonge i Sant Antoni (Girona), España · hello@parrlo.com. Privacy Policy.'),
  apple: L('Продолжить с Apple', 'Continuar con Apple', 'Continue with Apple'),
  google: L('Продолжить с Google', 'Continuar con Google', 'Continue with Google'),
  voice: L('«Мой голос» — только с 18 лет: отметку и условия попросим при включении. Документы не нужны.', '«Mi voz» es para mayores de 18 años: te pediremos confirmarlo y aceptar las condiciones al activarla. Sin documentos.', '“My Voice” is for 18 and over: we’ll ask you to confirm and accept the terms when you turn it on. No documents.'),
  gotit: L('Понятно', 'Entendido', 'Got it'),
  setup_t: L('Настрой Parrlo', 'Configura a Parrlo', 'Set up Parrlo'),
  setup_l: L('Всё это можно поменять потом: Настройки → Parrlo.', 'Todo esto se puede cambiar después: Ajustes → Parrlo.', 'You can change all of this later: Settings → Parrlo.'),
  skip: L('Пропустить', 'Omitir', 'Skip'),
  remember: L('Запоминать мои предпочтения', 'Recordar mis preferencias', 'Remember my preferences'),
};

// конструкторы (li — индекс языка)
const top = (li, step, back = true, of = 7) => `<header class="top">${back ? `<span class="cbtn" role="button" aria-label="${C.back[li]}">${ic('back')}</span>` : ''}${step ? `<div class="prog" role="img" aria-label="${of === 7 ? C.step(step)[li] : L(`Шаг ${step} из ${of}`, `Paso ${step} de ${of}`, `Step ${step} of ${of}`)[li]}">${Array.from({ length: of }, (_, k) => k + 1).map(i => `<i class="${i <= step ? 'on' : ''}"></i>`).join('')}</div>` : ''}</header>`;
const tbd = (s, long) => `<span class="tbd${long ? ' long' : ''}">${tx(s)}</span>`;
const bp = (s, icn) => `<span class="bp" role="button">${icn ? ic(icn) : ''}<span>${tx(s)}</span></span>`;
const bs = (s, icn) => `<span class="bs" role="button">${icn ? ic(icn) : ''}<span>${tx(s)}</span></span>`;
const bt = (s) => `<span class="bt" role="button">${tx(s)}</span>`;
const sib = (li, busy) => `<span class="sib apple" role="button"${busy ? ' aria-busy="true"' : ''}><img src="../../brand/apple-logo-black.svg" alt=""><span>${C.apple[li]}</span></span>
<span class="sib google" role="button"><img src="../../brand/google-g.png" alt=""><span>${C.google[li]}</span></span>`;
const legal = (li) => `<p class="small">${tx(C.legal[li])}</p>${tbd(C.word[li])}
<div class="links"><span class="lnk" role="button">${tx(C.terms[li])}</span><span class="lnk" role="button">${tx(C.privacy[li])}</span></div>
<p class="ph">${tx(C.op[li])}</p>`;
const ob = (inner) => ({ cls: 'ob', inner });

// ---------- экраны ----------
const S = {};

S['ob-welcome'] = (li) => ob(`${top(li, 1, false)}
<div class="hero"><span class="pdisc" aria-hidden="true">${parrot()}</span>
<div class="wm" aria-label="Parrlo Chat">Parrlo <b>Chat</b></div>
<h1 class="ttl">${tx(L('Parrlo — твой секретарь в чате', 'Conoce a Parrlo, tu secretario en el chat', 'Meet Parrlo, your secretary in chat')[li])}</h1>
<p class="lead">${tx(L('ИИ-секретарь пишет и отвечает по твоей просьбе, рассказывает, кто написал, и переводит чаты и звонки на твой язык.', 'Un secretario con IA que escribe y responde cuando se lo pides, te cuenta quién ha escrito y traduce chats y llamadas a tu idioma.', 'An AI secretary that writes and replies when you ask, tells you who wrote, and translates chats and calls into your language.')[li])}</p></div>
<div class="acts">${bp(L('Начать', 'Empezar', 'Get started')[li])}</div>`);

S['ob-language'] = (li) => {
  const rows = [
    ['Русский', L('', 'Ruso', 'Russian')[li], li === 0],
    ['English', L('Английский', 'Inglés', '')[li], li === 2],
    ['Español', L('Испанский', '', 'Spanish')[li], li === 1],
  ];
  return ob(`${top(li, 2)}
<div class="body"><h1 class="ttl">${tx(L('Язык приложения', 'Idioma de la app', 'App language')[li])}</h1>
<p class="lead">${tx(L('На нём ты читаешь чаты и субтитры звонков. Писать можно на любом языке.', 'En él lees los chats y los subtítulos de las llamadas. Puedes escribir en cualquier idioma.', 'You read chats and call captions in it. You can write in any language.')[li])}</p>
<div class="sech"></div>
<div class="glist" role="radiogroup" aria-label="${L('Язык приложения', 'Idioma de la app', 'App language')[li]}">${rows.map(([n, s, on]) => `<div class="cell" role="radio" aria-checked="${on}"><span class="tx">${n}${s ? `<span class="s">${s}</span>` : ''}</span>${on ? ic('check', 'mk') : ''}</div>`).join('')}</div>
<p class="foot">${tx(L('Язык можно сменить в Настройках.', 'Puedes cambiarlo en Ajustes.', 'You can change it in Settings.')[li])}</p></div>
<div class="acts">${bp(C.cont[li])}</div>`);
};

// вход: общий каркас
const signin = (li, mid, o = {}) => ob(`${top(li, 3)}
<div class="body">${o.head || `<div class="hide-compact"><span class="pdisc sm" aria-hidden="true">${parrot()}</span></div>`}
<h1 class="ttl">${tx(C.si_t[li])}</h1><p class="lead">${tx(C.si_l[li])}</p>
${mid || ''}${legal(li)}${o.after || ''}</div>
<div class="acts">${sib(li, o.busy)}${o.cancel ? bt(o.cancel) : ''}</div>`);
const errBan = (title, body, extra = '') => `<div class="ban err" role="alert">${ic('alert')}<div class="bx"><h3>${tx(title)}</h3><p>${tx(body)}</p>${extra}</div></div>`;

S['ob-signin'] = (li) => signin(li);
S['ob-signin-wait'] = (li) => signin(li, `<p class="stl" role="status">${ic('spin', 'spin')}<span>${tx(L('Закончи вход в окне Apple. Это займёт несколько секунд.', 'Termina el acceso en la ventana de Apple. Tarda unos segundos.', 'Finish signing in in the Apple window. It takes a few seconds.')[li])}${tbd(C.word[li])}</span></p>`, { busy: true, cancel: L('Отмена', 'Cancelar', 'Cancel')[li] });
S['ob-signin-apple-error'] = (li) => signin(li, errBan(L('Не получилось войти через Apple', 'No se pudo iniciar sesión con Apple', 'Couldn’t sign in with Apple')[li], L('Попробуй ещё раз — или войди через Google.', 'Inténtalo de nuevo o entra con Google.', 'Try again, or sign in with Google.')[li],
  `<span class="lnk" role="button" aria-label="${L('Повторить вход через Apple', 'Reintentar con Apple', 'Retry with Apple')[li]}">${L('Повторить', 'Reintentar', 'Retry')[li]}</span>`));
S['ob-signin-google-error'] = (li) => signin(li, errBan(L('Не получилось войти через Google', 'No se pudo iniciar sesión con Google', 'Couldn’t sign in with Google')[li], L('Попробуй ещё раз — или войди через Apple.', 'Inténtalo de nuevo o entra con Apple.', 'Try again, or sign in with Apple.')[li],
  `<span class="lnk" role="button" aria-label="${L('Повторить вход через Google', 'Reintentar con Google', 'Retry with Google')[li]}">${L('Повторить', 'Reintentar', 'Retry')[li]}</span>`));
S['ob-signin-cancel'] = (li) => signin(li, errBan(L('Вход отменён', 'Acceso cancelado', 'Sign-in cancelled')[li], L('Аккаунт не создан. Можно попробовать снова.', 'No se ha creado ninguna cuenta. Puedes intentarlo de nuevo.', 'No account was created. You can try again.')[li], tbd(C.word[li])));
S['ob-signin-offline'] = (li) => signin(li, errBan(L('Нет сети', 'Sin conexión', 'No connection')[li], L('Проверь подключение к интернету и попробуй ещё раз.', 'Comprueba tu conexión a internet e inténtalo de nuevo.', 'Check your internet connection and try again.')[li], tbd(C.word[li])));
S['ob-signin-invite'] = (li) => signin(li, '', {
  head: `<div class="gcard" role="group" aria-label="${L('Приглашение в группу', 'Invitación al grupo', 'Group invitation')[li]}"><span class="av" style="background:var(--av-1)">${L('К', 'P', 'F')[li]}</span><div class="tx"><b>${L('Квартира', 'Piso', 'Flat')[li]}</b><span class="s">${L('12 участников', '12 participantes', '12 members')[li]}</span><span class="s">${L('Зовёт Лена', 'Te invita: Lena', 'Invited by: Lena')[li]}</span></div></div>`,
  after: `<p class="small">${tx(L('Карточка приглашения: группа, число участников, от кого приглашение.', 'Tarjeta de invitación: grupo, número de participantes, quién te invita.', 'Invitation card: group, number of members, who invited you.')[li])}</p>${tbd(C.na[li])}`,
});

const wheel = (li, lab) => `<div class="sech">${tx(lab)}</div><div class="wheel" role="spinbutton" aria-label="${lab}" aria-valuenow="1994"><i class="band"></i><span class="s2">1992</span><span class="s1">1993</span><span class="sel">1994</span><span class="s1">1995</span><span class="s2">1996</span></div>`;
S['ob-age'] = (li) => { const t = L('Год рождения', 'Año de nacimiento', 'Year of birth')[li]; return ob(`${top(li, 4)}
<div class="body"><h1 class="ttl">${tx(t)}</h1><p class="lead">${tx(L('Parrlo Chat и Parrlo — для тех, кому исполнилось 16. Документы не нужны.', 'Parrlo Chat y Parrlo son para quienes tienen 16 años o más. No pedimos documentos.', 'Parrlo Chat and Parrlo are for people aged 16 or over. No documents needed.')[li])}</p>
${wheel(li, t)}<p class="foot">${tx(C.voice[li])}</p></div>
<div class="acts">${bp(C.cont[li])}</div>`); };
S['ob-age-date'] = (li) => { const t = L('Подтверди возраст', 'Confirma tu edad', 'Confirm your age')[li]; const f = L(['день', 'месяц', 'год'], ['día', 'mes', 'año'], ['day', 'month', 'year'])[li]; return ob(`${top(li, 4)}
<div class="body"><h1 class="ttl">${tx(t)}</h1><p class="lead">${tx(L('Укажи дату рождения. Мы используем её только для проверки и не сохраняем.', 'Indica tu fecha de nacimiento. La usamos solo para esta comprobación y no la guardamos.', 'Enter your date of birth. We use it only for this check and don’t store it.')[li])}</p>
<div class="sech"></div><div class="dates" role="group" aria-label="${t}">${f.map(x => `<div class="fld ph-t" role="textbox" aria-label="${x}">${x}</div>`).join('')}</div>
<div class="links"><span class="lnk" role="button">${tx(L('Подробнее: Политика конфиденциальности', 'Más información: Política de privacidad', 'More: Privacy Policy')[li])}</span></div>
${tbd(L('юрист проверит · «не сохраняем» — только если верно', 'lo revisará un abogado · «no la guardamos»: solo si es cierto', 'lawyer to review · “don’t store it”: only if true')[li], true)}
${tbd(L('запасной вариант, не для v1', 'variante de reserva, no para la v1', 'fallback variant, not for v1')[li], true)}
<p class="small">${tx(C.voice[li])}</p></div>
<div class="acts">${bp(C.cont[li])}</div>`); };
S['ob-age-under'] = (li) => ob(`${top(li, 0)}
<div class="body"><h1 class="ttl">${tx(L('Пока не получится', 'Todavía no se puede', 'Not just yet')[li])}</h1><p class="lead">${tx(L('Parrlo Chat — для тех, кому исполнилось 16. Аккаунт не создан. Загляни позже — мы будем рады.', 'Parrlo Chat es para mayores de 16 años. No se ha creado ninguna cuenta. Vuelve más adelante: te esperamos.', 'Parrlo Chat is for ages 16 and up. No account has been created. Come back later — we’d love to have you.')[li])}</p></div>
<div class="acts">${bp(C.gotit[li])}${bt(L('Неверный год? Изменить', '¿Año incorrecto? Cámbialo', 'Wrong year? Change it')[li])}</div>`);
S['ob-age-under-date'] = (li) => ob(`${top(li, 0)}
<div class="body"><h1 class="ttl">${tx(L('Parrlo Chat пока недоступен', 'Parrlo Chat no está disponible por ahora', 'Parrlo Chat isn’t available yet')[li])}</h1><p class="lead">${tx(L('Parrlo Chat — для людей от 16 лет. По указанной дате создать аккаунт сейчас нельзя. Мы удалили данные, которые получили при входе через [Apple/Google], и не сохранили дату рождения. Если считаешь, что это ошибка, напиши нам: hello@parrlo.com. Вернуться можно, когда тебе исполнится 16.',
  'Parrlo Chat es para personas de 16 años o más. Con la fecha indicada no se puede crear una cuenta ahora. Hemos borrado los datos que recibimos al iniciar sesión con [Apple/Google] y no hemos guardado la fecha de nacimiento. Si crees que es un error, escríbenos: hello@parrlo.com. Podrás volver cuando cumplas 16 años.',
  'Parrlo Chat is for people aged 16 or older. With the date you entered, an account can’t be created right now. We’ve deleted the data we received when you signed in with [Apple/Google], and we haven’t stored your date of birth. If you think this is a mistake, write to us: hello@parrlo.com. You can come back once you turn 16.')[li])}</p>
${tbd(L('юрист проверит · «мы удалили…» и «не сохранили…» — только после реализации; 16 — из конфигурации', 'lo revisará un abogado · «hemos borrado…» y «no hemos guardado…»: solo tras implementarlo; 16: de la configuración', 'lawyer to review · “We’ve deleted…” and “haven’t stored…”: only after implementation; 16: from config')[li], true)}
${tbd(L('запасной вариант, не для v1', 'variante de reserva, no para la v1', 'fallback variant, not for v1')[li], true)}</div>
<div class="acts">${bp(C.gotit[li])}</div>`);

S['ob-name'] = (li) => ob(`${top(li, 5)}
<div class="body"><h1 class="ttl">${tx(L('Как тебя зовут?', '¿Cómo te llamas?', 'What’s your name?')[li])}</h1><p class="lead">${tx(L('Это имя увидят твои собеседники. Изменить его можно в настройках.', 'Este nombre lo verán las personas con las que hablas. Puedes cambiarlo en Ajustes.', 'People you chat with will see this name. You can change it in Settings.')[li])}</p>
<div class="sech">${L('Имя', 'Nombre', 'Name')[li]}</div><div class="fld focus" role="textbox"><span>${L('Мария', 'María', 'Maria')[li]}</span><i class="caret"></i></div>
<p class="help">${tx(L('до 60 символов', 'hasta 60 caracteres', 'up to 60 characters')[li])}</p></div>
<div class="acts">${bp(C.cont[li])}</div>`);

// живой путь мессенджера (FiOnboarding.swift, chat/main 1f1a2276): приветствие → обращение → микрофон → вкладки, прогресс из 4 шагов.
// Тексты ru/es — из кода и Translate (es заголовок «¿Cómo nos dirigimos a ti?» утвердил Translate); en — Translate, кроме помеченных.
const icHead = (n) => `<div class="obi" aria-hidden="true">${ic(n)}</div>`;
S['ob-address'] = (li) => {
  const opts = [[L('Мужчина', 'Hombre', 'Man'), 'я устал', false], [L('Женщина', 'Mujer', 'Woman'), 'я устала', true]];
  return ob(`${top(li, 2, true, 4)}
<div class="body">${icHead('person')}<h1 class="ttl">${tx(L('Как к тебе обращаться?', '¿Cómo nos dirigimos a ti?', 'How should we address you?')[li])}</h1>
<p class="lead">${tx(L('Нужно для правильных окончаний: «я устал» или «я устала».', 'Sirve para acertar con el género en ruso: «я устал» o «я устала».', 'This helps us get Russian endings right: «я устал» or «я устала».')[li]).replace(/«я устала?»/g, m => `<span class="nw" lang="ru">${m}</span>`)}</p>${li === 2 ? tbd('en text: not approved') : ''}
<div class="gcards" role="radiogroup" aria-label="${L('Как к тебе обращаться?', '¿Cómo nos dirigimos a ti?', 'How should we address you?')[li]}">${opts.map(([t, ex, on]) => `<div class="gopt${on ? ' on' : ''}" role="radio" aria-checked="${on}"><b>${tx(t[li])}</b><span lang="ru">«${ex}»</span>${on ? ic('check', 'mk') : ''}</div>`).join('')}</div>${li === 2 ? tbd('en: Man / Woman — not approved') : ''}</div>
<div class="acts">${bp(L('Дальше', 'Siguiente', 'Next')[li])}${bt(C.skip[li])}</div>`);
};
S['ob-mic'] = (li) => ob(`${top(li, 3, true, 4)}
<div class="body">${icHead('mic')}<h1 class="ttl">${tx(L('Разреши микрофон', 'Permite el micrófono', 'Allow microphone access')[li])}</h1>
<p class="lead">${tx(L('Parrlo слушает только после нажатия на кнопку. Звук не сохраняется.', 'Parrlo solo escucha cuando pulsas el botón. El audio no se guarda.', 'Parrlo listens only after you tap the button. Audio is never stored.')[li])}</p>${tbd(L('юрист проверит', 'lo revisará un abogado', 'lawyer to review')[li])}${li === 2 ? tbd('en button “Allow microphone”: not approved') : ''}</div>
<div class="acts">${bp(L('Разрешить микрофон', 'Permitir micrófono', 'Allow microphone')[li])}</div>`);

// согласие — текст юриста дословно
const FACTS = [
  ['eye', L('Что читает', 'Qué lee', 'What it reads'), L('Все твои чаты — только для тебя. Другим участникам Parrlo не виден.', 'Todos tus chats, solo para ti. Parrlo no es visible para los demás participantes.', 'All your chats — only for you. Parrlo isn’t visible to other participants.')],
  ['bubble', L('Зачем', 'Para qué', 'Why'), L('Рассказывает, кто написал и что нового, пишет от твоего имени по твоей команде. Сообщения, которые Parrlo отправит без твоего просмотра, помечены как написанные ИИ.', 'Te cuenta quién ha escrito y qué hay de nuevo, y escribe en tu nombre cuando se lo ordenas. Los mensajes que Parrlo envíe sin que los revises llevan la marca de IA.', 'Tells you who wrote and what’s new, and writes on your behalf when you tell it to. Messages Parrlo sends without your review are marked as written by AI.')],
  ['server', L('Где обрабатывается', 'Dónde se procesa', 'Where it’s processed'), L('На наших серверах и у поставщиков ИИ, которые работают по нашему поручению; часть — в США. Сообщения шифруются при передаче и хранятся на сервере Parrlo Chat, который их обрабатывает (перевод, диктовка, помощник Parrlo). Доступ сотрудников ограничен и нужен только для жалоб, поддержки и безопасности.', 'En nuestros servidores y en proveedores de IA que actúan por encargo nuestro; algunos en EE. UU. Los mensajes se cifran durante la transmisión y se guardan en el servidor de Parrlo Chat, que los procesa (traducción, dictado, asistente Parrlo). El acceso del personal es limitado y solo se usa para denuncias, soporte y seguridad.', 'On our servers and with AI providers acting on our behalf; some in the US. Messages are encrypted in transit and stored on Parrlo Chat’s server, which processes them (translation, dictation, the Parrlo assistant). Staff access is limited and used only for reports, support and security.'), L('на решении юриста', 'pendiente de decisión legal', 'pending legal decision')],
  ['power', L('Выключить можно всегда', 'Desactívalo cuando quieras', 'Turn it off any time'), L('Настройки → Parrlo: Parrlo перестанет читать чаты, а созданное им мы удалим.', 'En Ajustes → Parrlo: dejará de leer tus chats y borraremos lo que haya generado.', 'Settings → Parrlo: Parrlo stops reading your chats and we delete what it generated.')],
];
const CNOTE = L('Нажимая «Разрешить», ты разрешаешь Parrlo читать твои чаты.', 'Al pulsar «Permitir», permites que Parrlo lea tus chats.', 'By tapping “Allow” you let Parrlo read your chats.');
// Фраза юриста о шифровании — дословно; сразу после неё маркер [УТОЧНИТЬ] (юрист даст замену; решение координатора 22.11)
const ENC_END = /(помощник Parrlo\)\.|asistente Parrlo\)\.|the Parrlo assistant\)\.)/;
const encMark = (h) => h.replace(ENC_END, '$1 <span class="tbd inl">[УТОЧНИТЬ]</span>');
S['ob-consent'] = (li) => ob(`${top(li, 6)}
<div class="body"><div class="hide-compact"><span class="pdisc sm" aria-hidden="true">${parrot()}</span></div>
<h1 class="ttl">${tx(L('Parrlo читает чаты, чтобы помогать', 'Parrlo lee tus chats para ayudarte', 'Parrlo reads your chats to help you')[li])}</h1>
<ul class="facts">${FACTS.map(([i, h, p, b]) => `<li class="fact"><span class="fi">${ic(i)}</span><div class="fx"><h3>${tx(h[li])}</h3><p>${encMark(tx(p[li]))}</p>${b ? tbd(b[li], true) : ''}</div></li>`).join('')}</ul>
<p class="ph">${tx(C.op[li])}</p>
<p class="small">${tx(L('Поставщики ИИ, основание передачи и срок хранения:', 'Proveedores de IA, base de la transferencia y conservación:', 'AI providers, transfer basis and retention:')[li])}</p>${tbd(C.na[li])}
<div class="sech"></div><div class="glist"><div class="cell swr"><div class="tx"><h3>${tx(C.remember[li])}</h3><span class="s">${tx(L('Выключено по умолчанию. Посмотреть и удалить можно в Настройки → Parrlo → Память.', 'Desactivado por defecto. Puedes verla o borrarla en Ajustes → Parrlo → Memoria.', 'Off by default. View or delete it in Settings → Parrlo → Memory.')[li])}</span></div><span class="sw" role="switch" aria-checked="false"></span></div></div>
<div class="links"><span class="lnk" role="button">${tx(C.privacy[li])}</span></div>
<div class="ax5-only"><p class="small">${tx(CNOTE[li])}</p></div></div>
<div class="acts line"><p class="note n-only">${tx(CNOTE[li])}</p>${bp(L('Разрешить', 'Permitir', 'Allow')[li])}${bs(L('Не сейчас', 'Ahora no', 'Not now')[li])}</div>`);

S['ob-consent-no'] = (li) => {
  const ban = `<div class="ban info" role="status">${ic('info')}<div class="bx"><p>${tx(L('Безопасный режим включён. Напоминание покажем только в приложении, не пушем.', 'El modo seguro está activado. Te lo recordaremos solo dentro de la app, sin notificación push.', 'Safe mode is on. We’ll remind you only inside the app, not as a push notification.')[li])}</p>${tbd(C.word[li])}<p style="margin-top:6px">${tx(L('Когда и как часто:', 'Cuándo y con qué frecuencia:', 'When and how often:')[li])}</p>${tbd(C.na[li])}</div></div>`;
  return ob(`${top(li, 6)}
<div class="body"><div class="hide-compact"><span class="pdisc sm" aria-hidden="true">${parrot()}</span></div>
<h1 class="ttl">${tx(L('Хорошо, без чтения чатов', 'De acuerdo, sin leer tus chats', 'OK, without reading chats')[li])}</h1><p class="lead">${tx(L('Parrlo будет работать только по прямым командам.', 'Parrlo funcionará solo con órdenes directas.', 'Parrlo will work on direct commands only.')[li])}</p>
<h4 class="ckh">${tx(L('Работает', 'Funciona', 'Works')[li])}</h4><ul class="ckl">${[L('Отвечает на то, что ты спросишь или продиктуешь', 'Responde a lo que le preguntes o le dictes', 'Answers what you ask or dictate'), L('Чаты, группы, перевод и звонки с субтитрами — как обычно', 'Chats, grupos, traducción y llamadas con subtítulos, como siempre', 'Chats, groups, translation and captioned calls work as usual'), L('Всё, что пишет Parrlo, уходит только после твоего подтверждения', 'Todo lo que escriba Parrlo se envía solo cuando tú lo confirmas', 'Anything Parrlo writes is sent only after you confirm')].map(s => `<li class="ok">${ic('check')}<span>${tx(s[li])}</span></li>`).join('')}</ul>
<h4 class="ckh">${tx(L('Не работает', 'No funciona', 'Doesn’t work')[li])}</h4><ul class="ckl"><li class="no">${ic('x')}<span>${tx(L('Не читает переписку: не расскажет, кто написал, и не ответит за тебя', 'No lee tus conversaciones: no te dirá quién ha escrito ni responderá por ti', 'Doesn’t read your conversations: won’t tell you who wrote or reply for you')[li])}</span></li></ul>
<p class="foot" style="margin-left:0">${tx(L('Передумаешь — включи в Настройки → Parrlo.', 'Si cambias de idea, actívalo en Ajustes → Parrlo.', 'Changed your mind? Turn it on in Settings → Parrlo.')[li])}</p>
<div class="ax5-only">${ban}</div></div>
<div class="acts"><div class="n-only">${ban}</div>${bp(C.cont[li])}${bs(L('Всё же разрешить', 'Permitir de todas formas', 'Allow after all')[li])}</div>`);
};

const setupBody = (li, pre = '') => `<div class="body"><h1 class="ttl">${tx(C.setup_t[li])}</h1><p class="lead">${tx(C.setup_l[li])}</p>${pre}
<div class="sech">${tx(L('Образ', 'Imagen', 'Look')[li])}</div><div class="glist"><div class="cell"><span class="av av-p" style="background:var(--raised);color:var(--acc)">${parrot()}</span><span class="tx">${L('Образ 1', 'Imagen 1', 'Look 1')[li]}</span>${ic('check', 'mk')}</div></div>
<div class="sech">${tx(L('Тон общения', 'Tono', 'Tone')[li])}</div><div class="glist" role="radiogroup"><div class="cell" role="radio" aria-checked="true"><span class="tx">${L('Неформальный', 'Informal', 'Casual')[li]}</span>${ic('check', 'mk')}</div><div class="cell" role="radio" aria-checked="false"><span class="tx">${L('Формальный', 'Formal', 'Formal')[li]}</span></div></div>
<p class="foot">${tx(L('Влияет только на стиль черновиков Parrlo, не на перевод.', 'Solo afecta al estilo de los borradores de Parrlo, no a la traducción.', 'Affects only the style of Parrlo’s drafts, not translation.')[li])}</p>
<div class="sech">${tx(L('Язык ответов', 'Idioma de las respuestas', 'Reply language')[li])}</div><div class="glist"><div class="cell" role="button"><span class="tx">${tx(L('Как в Parrlo — Русский', 'Como en la app — Español', 'Like the app — English')[li])}</span>${ic('updown', 'chev')}</div></div>
<div class="sech">${tx(L('Память', 'Memoria', 'Memory')[li])}</div><div class="glist"><div class="cell swr"><div class="tx"><h3>${tx(C.remember[li])}</h3><span class="s">${tx(L('По желанию. Можно посмотреть и удалить: Настройки → Parrlo → Память.', 'Opcional. Puedes verlas y borrarlas en Ajustes → Parrlo → Memoria.', 'Optional. View and delete in Settings → Parrlo → Memory.')[li])}</span></div><span class="sw" role="switch" aria-checked="false"></span></div></div></div>`;
S['ob-parrlo-setup'] = (li) => ob(`${top(li, 7)}${setupBody(li)}
<div class="acts">${bp(L('Готово', 'Listo', 'Done')[li])}${bt(C.skip[li])}</div>`);
S['ob-parrlo-setup-skip'] = (li) => { const t = L('Пропустить настройку?', '¿Omitir la configuración?', 'Skip setup?')[li]; return ob(`${top(li, 7)}${setupBody(li)}
<div class="acts">${bp(L('Готово', 'Listo', 'Done')[li])}${bt(C.skip[li])}</div>
<div class="scrim" style="background:rgba(0,0,0,.5)"></div><div class="alert" role="alertdialog" aria-label="${t}"><div class="ac"><h2>${tx(t)}</h2><p>${tx(L('Parrlo начнёт с настроек по умолчанию. Память останется выключенной. Поменять можно позже: Настройки → Parrlo.', 'Parrlo empezará con los ajustes por defecto. La memoria seguirá desactivada. Puedes cambiarlo después: Ajustes → Parrlo.', 'Parrlo will start with the default settings. Memory stays off. You can change this later: Settings → Parrlo.')[li])}</p></div>
<div class="bb">${bp(C.skip[li])}${bs(L('Вернуться к настройке', 'Volver a ajustes', 'Back to setup')[li])}</div>${tbd(C.word[li])}</div>`); };
S['ob-parrlo-setup-error'] = (li) => ob(`${top(li, 7)}${setupBody(li, errBan(L('Не получилось сохранить настройки', 'No se han podido guardar los ajustes', 'Couldn’t save your settings')[li], L('Попробуй ещё раз или пропусти: настроить Parrlo можно позже.', 'Inténtalo de nuevo u omite este paso: puedes configurar a Parrlo más tarde.', 'Try again or skip: you can set up Parrlo later.')[li], tbd(C.word[li])))}
<div class="acts">${bp(L('Повторить', 'Reintentar', 'Try again')[li])}${bs(C.skip[li])}</div>`);

// первый список чатов: вкладка «Чаты», пусто. Parrlo — своя вкладка (круг в таб-баре), не строка списка.
S['home-empty'] = (li) => ({ cls: 'has-tabs', inner: `<div class="head"><div class="bar r"><span class="cbtn" role="button" aria-label="${L('Новый чат', 'Chat nuevo', 'New chat')[li]}">${ic('compose')}</span></div>
<h1 class="large">${L('Чаты', 'Chats', 'Chats')[li]}</h1><div class="search">${ic('search')}<span>${L('Поиск', 'Buscar', 'Search')[li]}</span></div></div>
<div class="empty"><div class="ep"><span class="av" aria-label="Parrlo">${parrot()}</span><div class="grp in" style="margin-top:0;flex:1;min-width:0">${bubble({ text: tx(L('Привет, я Parrlo. Позови друзей по ссылке — а пока продиктуй мне, что и кому написать.', 'Hola, soy Parrlo. Invita a tus amigos con un enlace; mientras, dicta qué escribir y a quién.', 'Hi, I’m Parrlo. Invite friends with a link — meanwhile, dictate what to write and to whom.')[li]), tail: true })}</div></div>
<div class="eacts">${bp(L('Пригласить по ссылке', 'Invitar con un enlace', 'Invite with a link')[li], 'link')}${bs(L('Найти по имени', 'Buscar por nombre', 'Find by name')[li], 'findp')}</div></div>
${tabs('chats', li)}` });

// отправка ограничена: чат с Marco, вместо композера — баннер
const tr = (li) => `<div class="trrow"><span>${ic('trans')}${tx(L('Переведено с испанского', 'Traducido del ruso', 'Translated from Spanish')[li])}</span><b role="button">${tx(L('Показать оригинал', 'Ver original', 'Show original')[li])}</b></div>`;
S['account-suspended'] = (li) => ({ cls: '', inner: `<div class="msgs">
<div class="chip">${L('Сегодня', 'Hoy', 'Today')[li]}</div>
${group(false, [{ text: tx(L('Увидимся у входа в девять, я возьму билеты.', 'Nos vemos en la entrada a las nueve, cojo las entradas.', 'See you at the entrance at nine, I’ll get the tickets.')[li]), time: '09:12' }])}${tr(li)}
${group(true, [{ text: tx(L('Отлично, до встречи!', '¡Genial, hasta luego!', 'Great, see you there!')[li]), time: '09:13' }])}<div class="trrow out"><span>${tx(L('Marco прочтёт на испанском', 'Marco lo leerá en ruso', 'Marco will read it in Spanish')[li])}</span></div>
${group(false, [{ text: tx(L('Можно, я приведу ещё и Джулию?', '¿Puedo llevar también a Giulia?', 'Can I bring Giulia too?')[li]), time: '09:14' }])}${tr(li)}
</div>
<header class="nav"><div class="bar"><span class="cbtn" role="button" aria-label="${C.back[li]}">${ic('back')}</span><div class="ttl"><b>Marco</b><span>${tx(L('Пишет по-испански · перевод включён', 'Escribe en ruso · traducción activada', 'Writes in Spanish · translation on')[li])}</span></div><span class="av av36" style="background:var(--av-0)">M</span></div></header>
<div class="susp">${errBan(L('Отправка временно недоступна', 'No puedes enviar mensajes por ahora', 'Sending is temporarily unavailable')[li], L('Ты не можешь отправлять сообщения до 18 ноября, 14:00. Читать чаты можно.', 'No podrás enviar mensajes hasta el 18 de noviembre a las 14:00. Puedes seguir leyendo tus chats.', 'You can’t send messages until 18 November, 14:00. You can still read your chats.')[li], tbd(C.word[li]) + `<span class="lnk" role="button">${L('Подробнее', 'Más información', 'Learn more')[li]}</span>`).replace('role="alert"', 'role="status"')}</div>` });

S['account-banned'] = (li) => ob(`${top(li, 0, false)}
<div class="es" role="status"><span class="ei">${ic('block')}</span><h2>${tx(L('Аккаунт заблокирован', 'Cuenta bloqueada', 'Account blocked')[li])}</h2><p>${tx(L('Мы заблокировали аккаунт за нарушение правил Parrlo Chat. Если считаешь, что это ошибка, напиши нам — разберёмся.', 'Hemos bloqueado tu cuenta por incumplir las normas de Parrlo Chat. Si crees que es un error, escríbenos y lo revisamos.', 'We’ve blocked your account for breaking the Parrlo Chat rules. If you think this is a mistake, write to us and we’ll look into it.')[li])}</p>${tbd(C.word[li])}</div>
<div class="acts">${bp(L('Написать в поддержку', 'Escribir a soporte', 'Contact support')[li])}${bs(L('Выйти', 'Cerrar sesión', 'Log out')[li])}</div>`);

// ---------- страница ----------
// Каждая страница содержит три языка в <template>; скрипт выбирает по ?l=.
// Подгонка слова (AX5): если слово не влезает в строку, шрифт блока × 0.92, пока не влезет, но не ниже 28 (≈ AX1 Body).
const WORDFIT = `function wordfit(){
 if(document.documentElement.dataset.t!=='ax5')return;
 var MIN=28, sel='.gopt b,.gopt span,.ttl,.lead,.small,.note,.foot,.sech,.cell .tx,.cell .tx h3,.cell .tx .s,.ban h3,.ban p,.ban .lnk,.tbd,.lnk,.bp>span,.bs>span,.bt,.fact h3,.fact p,.ckl span,.ckh,.ph,.help,.alert h2,.alert p,.es h2,.es p,.gcard .tx,.fld,.b,.trrow,.stl span,.large,.search span,.nav .ttl span';
 document.querySelectorAll(sel).forEach(function(el){
  for(var k=0;k<30;k++){
   var cs=getComputedStyle(el), fs=parseFloat(cs.fontSize); if(fs<=MIN)break;
   var L=-1e9,R=1e9;for(var a=el;a&&a!==document.body;a=a.parentElement){var ac=getComputedStyle(a),ab=a.getBoundingClientRect();
    L=Math.max(L,ab.left+parseFloat(ac.paddingLeft)+parseFloat(ac.borderLeftWidth)-0.5);R=Math.min(R,ab.right-parseFloat(ac.paddingRight)-parseFloat(ac.borderRightWidth)+0.5);if(a.classList.contains('screen'))break}
   var bad=false;
   var w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT), n;
   while(!bad&&(n=w.nextNode())){if(n.parentElement.closest(sel)!==el)continue;var re=/[^ \\n\\t\\u00a0]+/g,m;while((m=re.exec(n.data))){var r=document.createRange();r.setStart(n,m.index);r.setEnd(n,m.index+m[0].length);
     var rs=[].slice.call(r.getClientRects()).filter(function(x){return x.width>0});
     var tops={};rs.forEach(function(x){tops[Math.round(x.top)]=1});
     if(Object.keys(tops).length>1){bad=true;break}
     for(var i=0;i<rs.length;i++)if(rs[i].right>R||rs[i].left<L){bad=true;break}
     if(bad)break}}
   if(!bad)break;
   var nf=Math.max(MIN,fs*0.92), lh=parseFloat(cs.lineHeight);
   el.style.fontSize=nf+'px'; if(lh)el.style.lineHeight=(lh*nf/fs)+'px';
   el.dataset.wf=(el.dataset.wf||'')+'·';
  }
 });
}`;
const page = (key) => {
  const tpl = LANGS.map((l, li) => { const s = S[key](li); return `<template id="l-${l}" data-cls="${s.cls}">${glueHtml(`${statusBar()}\n${s.inner}\n<i class="home-ind"></i>`, l)}</template>`; }).join('\n');
  return `<!doctype html>
<html lang="ru" data-d="max" data-t="n" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${key}</title><link rel="stylesheet" href="../rd.css"><link rel="stylesheet" href="onboarding.css">
<script src="../tools/unglue.js"></script>
<script>(function(){var q=new URLSearchParams(location.search),h=document.documentElement;h.dataset.d=q.get('d')||'max';h.dataset.t=q.get('t')||'n';
h.dataset.theme='dark';var l=q.get('l');h.lang=(l==='es'||l==='en')?l:'ru';})()</script>
</head><body><main class="screen"></main>
${tpl}
<script>${WORDFIT}
(function(){var h=document.documentElement,t=document.getElementById('l-'+h.lang),m=document.querySelector('main');
m.className='screen '+t.dataset.cls;m.appendChild(t.content.cloneNode(true));
// порядок: раскладка → unglue → WordFit; data-ready — после обоих
// порядок (решение Мурата 22.11): раскладка → unglue → WordFit (только одиночные слова, не ниже 28)
// Если WordFit уменьшил шрифт блока, решения unglue в нём устарели: склейку в этом блоке возвращаем и снимаем заново
// при новом шрифте (шрифт ради склейки не меняется).
document.fonts.ready.then(function(){var orig=new Map(),tw=document.createTreeWalker(m,NodeFilter.SHOW_TEXT),x;
 while((x=tw.nextNode()))if(x.data.indexOf('\u00a0')>=0)orig.set(x,x.data);
 window.unglue();wordfit();
 var fit=document.querySelectorAll('[data-wf]');
 if(fit.length){fit.forEach(function(el){var w2=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),y;while((y=w2.nextNode()))if(orig.has(y))y.data=orig.get(y);});window.unglue();}
 var s=document.querySelector('.susp'),g=document.querySelector('.msgs');if(s&&g)g.style.paddingBottom=(s.offsetHeight+8)+'px';
 document.body.dataset.ready='1';});})();</script>
</body></html>
`;
};

const SCREENS = Object.keys(S);
for (const k of SCREENS) fs.writeFileSync(path.join(OUT, k + '.html'), page(k));

// ---------- обзор (ru, Pro Max, обычный текст) ----------
const PRIO = ['ob-address', 'ob-mic', 'ob-welcome', 'ob-signin', 'ob-age', 'ob-name', 'ob-consent', 'ob-parrlo-setup', 'home-empty'];
const idx = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Редизайн iOS — вход и онбординг</title>
<style>@font-face{font-family:Inter;font-weight:100 900;src:url(../../fonts/Inter-Variable.woff2) format("woff2")}
body{margin:0;background:#0B0E12;color:#E8ECF1;font-family:-apple-system,"SF Pro Text",Inter,system-ui,sans-serif;padding:40px;width:1880px}
h1{font-size:28px;font-weight:600;margin:0 0 6px}p.l{color:#9AA4B2;margin:0 0 28px;font-size:15px}
.g{display:flex;flex-wrap:wrap;gap:30px 22px}
figure{margin:0;width:286px}figure img{display:block;width:286px;border-radius:18px;border:1px solid rgba(255,255,255,.14)}
figcaption{font-size:13px;color:#9AA4B2;margin-top:8px;line-height:1.35}figcaption b{color:#E8ECF1;font-weight:600}figcaption i{font-style:normal;color:#2BC48A}</style></head><body>
<h1>Parrlo Chat — редизайн iOS: вход и онбординг</h1><p class="l">Pro Max 440×956 · обычный размер текста · ru · тёмная тема. Зелёным отмечены приоритетные экраны. Все PNG: png/&lt;экран&gt;__&lt;se|max&gt;-&lt;n|ax5&gt;-&lt;ru|es|en&gt;.png</p>
<div class="g">${SCREENS.map(k => `<figure><img src="png/${k}__max-n-ru.png" alt="${k}"><figcaption><b>${k}</b>${PRIO.includes(k) ? ' <i>приоритет</i>' : ''}</figcaption></figure>`).join('')}</div>
</body></html>`;
fs.writeFileSync(path.join(OUT, 'index.html'), idx);
fs.writeFileSync(path.join(__dirname, 'screens.json'), JSON.stringify(SCREENS));
console.log('ok', SCREENS.length, 'экранов');
