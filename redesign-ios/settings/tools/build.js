// Генератор экранов «Настройки». Запуск: node redesign-ios/settings/tools/build.js
// Страница принимает ?d=se|max, ?t=n|ax5, ?l=ru|es|en.
// Тексты — дословно из frames/{ru,es,en}-<экран>.html (фигура __pro-n); отступления перечислены в README.
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '..');

// ---------- общие помощники (из redesign-ios/tools/build.js) ----------
const PARROT_INNER = '<defs><mask id="pc-pmk" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024"><rect width="1024" height="1024" fill="#fff"/><circle cx="612" cy="372" r="44" fill="#000"/><path d="M735 322 L 895 322 A160 160 0 0 1 735 482 Z" fill="#000" stroke="#000" stroke-width="28" stroke-linejoin="round"/></mask></defs><g mask="url(#pc-pmk)"><path d="M345 800 L 235 925 L 420 895 Z" stroke="currentColor" stroke-width="70" stroke-linejoin="round"/><circle cx="500" cy="640" r="245"/><circle cx="560" cy="395" r="235"/></g><path d="M735 322 L 895 322 A160 160 0 0 1 735 482 Z"/>';
let pid = 0;
const parrot = () => { const id = 'pc-pmk' + (pid++); return `<svg class="ic ic-parrot" viewBox="180 140 735 840" aria-hidden="true" focusable="false">${PARROT_INNER.replace(/pc-pmk/g, id)}</svg>`; };

const P = {
  back: '<path d="M14.5 5.5L8 12l6.5 6.5"/>',
  contacts: '<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.3-3.6 4.2-5.6 7.5-5.6s6.2 2 7.5 5.6"/>',
  calls: '<path d="M6.2 3.8h3l1.6 4.2-2 1.3a10.5 10.5 0 005.9 5.9l1.3-2 4.2 1.6v3a2 2 0 01-2.2 2A16.5 16.5 0 014.2 6a2 2 0 012-2.2z"/>',
  chats: '<path d="M12 3.8c4.8 0 8.6 3.3 8.6 7.4s-3.8 7.4-8.6 7.4c-1 0-2-.1-2.9-.4L5 20l1-3.6c-1.6-1.4-2.6-3.2-2.6-5.2 0-4.1 3.8-7.4 8.6-7.4z"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.8l1.6 2.3 2.7-.6.6 2.7 2.4 1.4-1 2.5 1 2.5-2.4 1.4-.6 2.7-2.7-.6L12 21.2l-1.6-2.3-2.7.6-.6-2.7-2.4-1.4 1-2.5-1-2.5 2.4-1.4.6-2.7 2.7.6z"/>',
  // иконки старых кадров (frames/*-settings*.html)
  person: '<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  bubble: '<path d="M4 5h16v11H9l-5 4z"/>',
  bell: '<path d="M6 17h12l-1.5-2v-4a4.5 4.5 0 0 0-9 0v4zM10 20h4"/>',
  bellOff: '<path d="M6 17h12l-1.5-2v-4a4.5 4.5 0 0 0-9 0v4zM10 20h4M4 4l16 16"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5h.01"/>',
  logout: '<path d="M10 4H5v16h5M15 8l4 4-4 4M19 12H9"/>',
  doc: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  trash: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l.9 12.5a1 1 0 001 .9h7.2a1 1 0 001-.9L17.5 7M10 11v5.5M14 11v5.5"/>',
  // новые (строки «Использование» и «Тарифы» в корне)
  gauge: '<path d="M3.5 17a8.5 8.5 0 1117 0"/><path d="M12 17l4-5.5"/>',
  card: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 9.5h18M7 14.5h4"/>',
};
const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;
const CHEV = '<svg class="chev" viewBox="0 0 9 15" aria-hidden="true"><path d="M1.5 1.5l6 6-6 6"/></svg>';

const statusBar = () => `<div class="sb"><span>9:41</span><i class="island"></i><span class="ri">
<svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
<svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 008 .6 10.4 10.4 0 00.8 3.5L2 4.8a8.6 8.6 0 016-2.4zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.8 6.8 0 008 4.2 6.8 6.8 0 003.4 6l1.2 1.3c.9-.8 2.1-1.3 3.4-1.3zm0 3.5c.4 0 .8.2 1.1.4L8 11.2 6.9 9.9c.3-.2.7-.4 1.1-.4z"/></svg>
<svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="22" height="12" rx="3.5" fill="none" stroke="currentColor" stroke-opacity=".4"/><rect x="2" y="2" width="16" height="9" rx="2" fill="currentColor"/><path d="M24.5 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2z" fill="currentColor" fill-opacity=".4"/></svg></span></div>`;

// Таб-бар (утверждён 22.11): Контакты · Звонки · [Parrlo] · Чаты · Настройки
const TABS = { ru: ['Контакты', 'Звонки', '', 'Чаты', 'Настройки'], es: ['Contactos', 'Llamadas', '', 'Chats', 'Ajustes'], en: ['Contacts', 'Calls', '', 'Chats', 'Settings'] };
const tabs = (l, active) => `<nav class="tabs" aria-label="Разделы">${['contacts', 'calls', 'parrlo', 'chats', 'gear'].map((k, i) => {
  if (k === 'parrlo') return `<a class="pc" aria-label="Parrlo"><i class="disc">${parrot()}</i></a>`;
  return `<a class="${k === active ? 'on' : ''}">${ic(k)}<span>${TABS[l][i]}</span></a>`;
}).join('')}</nav>`;

// Перенос только по словам: слова с дефисом или «/» не рвём (e-mail, push-уведомления, налогами/IVA).
const nw = (s) => String(s).replace(/(^|>)([^<]+)/g, (m, a, b) => a + b.replace(/[^\s<>]*[^\s<>\-/][-/‑][^\s<>]+/g, w => `<span class="nw">${w}</span>`));
const tbd = (s, inl) => `<span class="tbd${inl ? ' inl' : ''}">${s}</span>`;

// ---------- строительные блоки ----------
const tile = (o) => o ? `<span class="tile" style="background:${o.bg}">${o.img || (o.ic === 'parrot' ? parrot() : ic(o.ic))}</span>` : '';
// row: { tile, t, s, v, chev, sw: 'on'|'off'|'dis', chk, danger, extra }
const row = (o) => `<div class="r${o.tile ? ' has-tile' : ''}${o.danger ? ' danger' : ''}">${tile(o.tile)}<div class="tx"><div class="t">${nw(o.t)}</div>${o.s ? `<div class="s">${nw(o.s)}</div>` : ''}${o.extra || ''}</div>${o.v ? `<span class="v">${o.v}</span>` : ''}${o.sw ? `<span class="sw${o.sw === 'on' ? ' on' : ''}${o.sw === 'dis' ? ' dis' : ''}" role="switch" aria-checked="${o.sw === 'on'}"></span>` : ''}${o.chk ? ic('check', 'chk') : ''}${o.chev ? CHEV : ''}</div>`;
const banner = (kind, t, s, tb) => `<div class="r ban has-tile"><span class="tile ${kind}">${ic(kind === 'err' ? 'x' : kind === 'ok' ? 'check' : 'bellOff')}</span><div class="tx"><div class="t">${nw(t)}</div><div class="s">${nw(s)}</div>${tb ? tbd(tb) : ''}</div></div>`;
const sec = (o) => `<section class="sec">${o.h ? `<h2 class="sh">${nw(o.h)}</h2>` : ''}${o.body ? `<div class="grp-l">${o.body}</div>` : ''}${o.f ? `<div class="ft">${o.f}</div>` : ''}</section>`;
const navSub = (L, title, right, wide) => `<header class="nav${wide ? ' wide' : ''}"><div class="bar"><span class="cbtn" aria-label="${L.back}">${ic('back')}</span><div class="ttl"><b>${nw(title)}</b></div>${right || '<span></span>'}</div></header>`;
const acts = (btns, clear) => `<div class="acts${clear ? ' clear' : ''}">${btns.map(([cls, t]) => `<span class="bb ${cls}">${nw(t)}</span>`).join('')}</div>`;
const hero = (o) => `<div class="hero">${o.persona ? `<span class="persona">${parrot()}</span>` : ''}${o.cap ? `<p class="cap">${o.cap}</p>` : ''}<h1>${nw(o.h)}</h1>${o.lead ? `<p class="lead">${nw(o.lead)}${o.tb ? tbd(o.tb) : ''}</p>` : ''}</div>`;

const C = { gray: '#4A5360', blue: '#3F5FB5', teal: '#2F7F9A', red: '#B8443A', green: '#00875C', plum: '#9A3F73', amber: '#8A5A00', black: '#000' };

// ---------- тексты ----------
const T = {
  ru: {
    back: 'Назад', settings: 'Настройки', parrlo: 'Parrlo',
    parrloMoved: 'Память, голос, тон общения и язык ответов — теперь во вкладке Parrlo.',
    tr: 'Перевод', trRow: 'Переводить сообщения', trFoot: 'Включено для всех чатов. В отдельном чате это можно поменять: настройка чата важнее общей.',
    app: 'Приложение', account: 'Аккаунт', notif: 'Уведомления', appLang: 'Язык приложения', langVal: 'Русский', about: 'О приложении и юридическое',
    usage: 'Использование', plans: 'Тарифы',
    wording: 'формулировка: не утверждено', na: 'не утверждено', legal: 'юрист проверит',
    nameRow: 'Имя в профиле', name: 'Мария', apple: 'Вход через Apple', appleS: 'Скрытый e-mail Apple подходит: e-mail не обязателен.',
    contact: 'Связаться с нами', contactS: 'Напиши на <span class="nw">hello@parrlo.com</span>', logout: 'Выйти из аккаунта',
    newPhone: 'Новый телефон', newPhoneT: 'Войди тем же Apple или Google — история чатов хранится на сервере и появится на новом телефоне.', del: 'Удалить аккаунт',
    logoutQ: 'Выйти из аккаунта?', logoutM: 'Ты сможешь снова войти через Apple или Google.', logoutB: 'Выйти', cancel: 'Отмена',
    step1: 'Подтверждение, шаг 1', step2: 'Подтверждение, шаг 2', delQ: 'Удалить аккаунт?', delLead: 'Здесь будет описание того, что удаляется и в какие сроки.', cont: 'Продолжить',
    delQ2: 'Удалить аккаунт насовсем?', delM2: 'Отменить это нельзя.',
    delErr: 'Не получилось удалить аккаунт', delErrS: 'Ничего не удалено. Проверь сеть и попробуй ещё раз.', retry: 'Повторить',
    deleted: 'Аккаунт удалён', deletedS: 'Твой аккаунт удалён.', close: 'Закрыть',
    nameLead: 'Его видят все твои собеседники и участники групп.', nameLbl: 'Имя', save: 'Сохранить',
    langs: [['Русский', '', true], ['English', 'Английский'], ['Español', 'Испанский']],
    langNote: 'Язык ответов Parrlo настраивается отдельно: вкладка Parrlo → «…» → Язык.',
    msgs: 'Сообщения', msgsS: 'Уведомления о новых сообщениях', calls: 'Звонки', callsS: 'Уведомления о входящих звонках', inApp: 'Внутри приложения',
    rem: 'Напоминание про Parrlo', remS: 'Одно напоминание через 24 часа, только внутри приложения, без push. Сейчас выключено: выбрано «Не напоминать». Включи, чтобы разрешить его снова.',
    pushOff: 'Отключить все push-уведомления', pushOffS: 'В системных настройках устройства',
    blkT: 'Браузер блокирует уведомления', blkS: 'Пока ты не разрешишь их в настройках сайта, оповещений о сообщениях и звонках не будет.',
    how: 'Как включить', steps: ['1. Нажми на значок рядом с адресом сайта.', '2. Найди «Уведомления».', '3. Выбери «Разрешить» и обнови страницу.'],
    saveErr: 'Не получилось сохранить настройку', saveErrS: 'Ничего не изменилось. Проверь сеть и попробуй ещё раз.',
    aboutT: 'О приложении', legalH: 'Юридическое', terms: 'Условия использования', privacy: 'Политика конфиденциальности', op: 'Оператор',
    opT: 'Оператор: PADELADA WORLD, S.L. · NIF B05783238 · Calle Josep Pla 8, Esc. 1, Pta. 1, 17252 Calonge i Sant Antoni (Girona), España · <a>hello@parrlo.com</a>. <a>Политика конфиденциальности</a>.',
    ver: 'Версия [заполнить]',
    plansLead: 'Два платных плана для Parrlo, голоса и звонков.', nowT: 'Сейчас: бесплатный уровень', nowS: 'Чаты, группы и перевод текста не входят в дневной и недельный лимиты. Parrlo, голос и звонки — входят.',
    plan: 'План', price: 'Цена:', incl: 'Что входит в план', noLim: 'Без лимита:', noLimT: 'обычные чаты, группы, перевод текста', withLim: 'С дневным и недельным лимитом:',
    groups: ['Parrlo', 'Голос', 'Звонки'], amount: 'объём: —', choose: 'Выбрать',
    ph: 'Заглушка: названия, состав и цены определятся позже.',
    sub: 'Подписка продлевается автоматически, пока ты не отменишь её в настройках Apple ID. Цена — [с налогами/IVA — подтвердить менеджеру Store]. Условия · Политика конфиденциальности.',
    stayFree: 'Остаться на бесплатном',
    usageLead: 'Дневной и недельный лимиты Parrlo, голоса и звонков. Обычные чаты работают всегда.',
    today: 'Сегодня', week: 'Эта неделя', resetDay: 'Обнулится завтра в 00:00 по твоему времени', resetWeek: 'Обнулится в понедельник в 00:00 по твоему времени',
    unlimited: 'Обычные чаты, группы и перевод текста — без лимита.', pick: 'Выбрать тариф', ok: 'Понятно',
    limT: 'Дневной лимит Parrlo исчерпан', limS: 'Parrlo снова заработает после сброса. Голос и звонки считаются отдельно. Обычные чаты, группы и перевод текста работают как обычно.',
    limWT: 'Недельный лимит Parrlo исчерпан', limWS: 'Parrlo снова заработает в понедельник в 00:00 по твоему времени — дневной сброс этого не меняет. Голос и звонки считаются отдельно. Обычные чаты, группы и перевод текста работают как обычно.',
    rstT: 'Лимит сброшен', rstS: 'Сегодняшние полоски обнулены в 00:00 по твоему времени. Недельные считаются с понедельника.',
    rstB: 'Parrlo, голос и звонки снова доступны', rstBS: 'Дневной лимит начался заново.',
  },
  es: {
    back: 'Atrás', settings: 'Ajustes', parrlo: 'Parrlo',
    parrloMoved: 'La memoria, la voz, el tono y el idioma de las respuestas están ahora en la pestaña Parrlo.',
    tr: 'Traducción', trRow: 'Traducir mensajes', trFoot: 'Activado en todos los chats. En un chat concreto puedes cambiarlo: el ajuste del chat prevalece sobre este.',
    app: 'App', account: 'Cuenta', notif: 'Notificaciones', appLang: 'Idioma de la app', langVal: 'Español', about: 'Acerca de y aviso legal',
    usage: 'Uso', plans: 'Tarifas',
    wording: 'redacción: no aprobada', na: 'no aprobado', legal: 'lo revisará un jurista',
    nameRow: 'Nombre del perfil', name: 'María', apple: 'Sesión con Apple', appleS: 'El correo oculto de Apple sirve: el correo no es obligatorio.',
    contact: 'Contacta con nosotros', contactS: 'Escríbenos a <span class="nw">hello@parrlo.com</span>', logout: 'Cerrar sesión',
    newPhone: 'Teléfono nuevo', newPhoneT: 'Inicia sesión con la misma cuenta de Apple o Google: el historial de chats se guarda en el servidor y aparecerá en el teléfono nuevo.', del: 'Borrar cuenta',
    logoutQ: '¿Cerrar sesión?', logoutM: 'Podrás volver a entrar con Apple o Google.', logoutB: 'Cerrar sesión', cancel: 'Cancelar',
    step1: 'Confirmación, paso 1', step2: 'Confirmación, paso 2', delQ: '¿Borrar tu cuenta?', delLead: 'Aquí se describirá qué se borra y en qué plazo.', cont: 'Continuar',
    delQ2: '¿Borrar tu cuenta definitivamente?', delM2: 'No se puede deshacer.',
    delErr: 'No se ha podido borrar la cuenta', delErrS: 'No se ha borrado nada. Comprueba la conexión e inténtalo de nuevo.', retry: 'Reintentar',
    deleted: 'Cuenta borrada', deletedS: 'Tu cuenta se ha borrado.', close: 'Cerrar',
    nameLead: 'Lo ven todas las personas con las que hablas y los miembros de tus grupos.', nameLbl: 'Nombre', save: 'Guardar',
    langs: [['Русский', 'Ruso'], ['English', 'Inglés'], ['Español', '', true]],
    langNote: 'El idioma de las respuestas de Parrlo se ajusta aparte: pestaña Parrlo → «…» → Idioma.',
    msgs: 'Mensajes', msgsS: 'Avisos de mensajes nuevos', calls: 'Llamadas', callsS: 'Avisos de llamadas entrantes', inApp: 'Dentro de la app',
    rem: 'Recordatorio sobre Parrlo', remS: 'Un recordatorio a las 24 horas, solo dentro de la app y sin push. Ahora está desactivado: elegiste «No recordármelo». Actívalo para permitirlo de nuevo.',
    pushOff: 'Desactivar todas las notificaciones push', pushOffS: 'En los ajustes del sistema del dispositivo',
    blkT: 'El navegador bloquea las notificaciones', blkS: 'Mientras no las permitas en los ajustes del sitio, no habrá avisos de mensajes ni de llamadas.',
    how: 'Cómo activarlas', steps: ['1. Pulsa el icono junto a la dirección del sitio.', '2. Busca «Notificaciones».', '3. Elige «Permitir» y recarga la página.'],
    saveErr: 'No se ha podido guardar el ajuste', saveErrS: 'No ha cambiado nada. Comprueba la conexión e inténtalo de nuevo.',
    aboutT: 'Acerca de', legalH: 'Aviso legal', terms: 'Condiciones de uso', privacy: 'Política de privacidad', op: 'Responsable',
    opT: 'Responsable: PADELADA WORLD, S.L. · NIF B05783238 · Calle Josep Pla 8, Esc. 1, Pta. 1, 17252 Calonge i Sant Antoni (Girona), España · <a>hello@parrlo.com</a>. <a>Política de privacidad</a>.',
    ver: 'Versión [rellenar]',
    plansLead: 'Dos planes de pago para Parrlo, la voz y las llamadas.', nowT: 'Ahora: nivel gratuito', nowS: 'Los chats, los grupos y la traducción de texto no cuentan para el límite diario y semanal. Parrlo, la voz y las llamadas, sí.',
    plan: 'Plan', price: 'Precio:', incl: 'Qué incluye el plan', noLim: 'Sin límite:', noLimT: 'chats normales, grupos, traducción de texto', withLim: 'Con límite diario y semanal:',
    groups: ['Parrlo', 'Voz', 'Llamadas'], amount: 'cantidad: —', choose: 'Elegir',
    ph: 'Marcador: los nombres, el contenido y los precios se decidirán más adelante.',
    sub: 'La suscripción se renueva automáticamente hasta que la canceles en los ajustes de tu ID de Apple. Precio: [IVA incluido — confirmar con el gestor de Store]. Condiciones · Política de privacidad.',
    stayFree: 'Seguir con el gratuito',
    usageLead: 'Límites diario y semanal de Parrlo, la voz y las llamadas. Los chats normales siempre funcionan.',
    today: 'Hoy', week: 'Esta semana', resetDay: 'Se restablece mañana a las 00:00, hora tuya', resetWeek: 'Se restablece el lunes a las 00:00, hora tuya',
    unlimited: 'Los chats normales, los grupos y la traducción de texto no tienen límite.', pick: 'Ver tarifas', ok: 'Entendido',
    limT: 'Has agotado el límite diario de Parrlo', limS: 'Parrlo volverá a funcionar tras el restablecimiento. La voz y las llamadas se cuentan aparte. Los chats normales, los grupos y la traducción de texto funcionan como siempre.',
    limWT: 'Has agotado el límite semanal de Parrlo', limWS: 'Parrlo volverá a funcionar el lunes a las 00:00, hora tuya; el restablecimiento diario no lo cambia. La voz y las llamadas se cuentan aparte. Los chats normales, los grupos y la traducción de texto funcionan como siempre.',
    rstT: 'Límite restablecido', rstS: 'Las barras de hoy se han puesto a cero a las 00:00, hora tuya. Las semanales cuentan desde el lunes.',
    rstB: 'Parrlo, la voz y las llamadas vuelven a estar disponibles', rstBS: 'El límite diario empieza de nuevo.',
  },
  en: {
    back: 'Back', settings: 'Settings', parrlo: 'Parrlo',
    parrloMoved: 'Memory, voice, tone and reply language are now in the Parrlo tab.',
    tr: 'Translation', trRow: 'Translate messages', trFoot: 'On for all chats. You can change it in a single chat: the chat setting overrides this one.',
    app: 'App', account: 'Account', notif: 'Notifications', appLang: 'App language', langVal: 'English', about: 'About and legal',
    usage: 'Usage', plans: 'Plans',
    wording: 'wording: not approved', na: 'not approved', legal: 'legal to review',
    nameRow: 'Profile name', name: 'Maria', apple: 'Signed in with Apple', appleS: 'Apple’s hidden e-mail works: an e-mail isn’t required.',
    contact: 'Contact us', contactS: 'Email us at <span class="nw">hello@parrlo.com</span>', logout: 'Sign out',
    newPhone: 'New phone', newPhoneT: 'Sign in with the same Apple or Google account — your chat history is stored on the server and will appear on the new phone.', del: 'Delete account',
    logoutQ: 'Sign out?', logoutM: 'You can sign in again with Apple or Google.', logoutB: 'Sign out', cancel: 'Cancel',
    step1: 'Confirmation, step 1', step2: 'Confirmation, step 2', delQ: 'Delete your account?', delLead: 'This will describe what is deleted and within what time.', cont: 'Continue',
    delQ2: 'Delete your account for good?', delM2: 'This can’t be undone.',
    delErr: 'Couldn’t delete your account', delErrS: 'Nothing was deleted. Check your connection and try again.', retry: 'Try again',
    deleted: 'Account deleted', deletedS: 'Your account has been deleted.', close: 'Close',
    nameLead: 'Everyone you chat with and your group members see it.', nameLbl: 'Name', save: 'Save',
    langs: [['Русский', 'Russian'], ['English', '', true], ['Español', 'Spanish']],
    langNote: 'Parrlo’s reply language is set separately: Parrlo tab → “…” → Language.',
    msgs: 'Messages', msgsS: 'Notifications about new messages', calls: 'Calls', callsS: 'Notifications about incoming calls', inApp: 'Inside the app',
    rem: 'Reminder about Parrlo', remS: 'One reminder after 24 hours, only inside the app, no push. It’s off now: you chose “Don’t remind me”. Turn it on to allow it again.',
    pushOff: 'Turn off all push notifications', pushOffS: 'In the device’s system settings',
    blkT: 'Your browser is blocking notifications', blkS: 'Until you allow them in the site settings, there won’t be alerts about messages and calls.',
    how: 'How to turn them on', steps: ['1. Click the icon next to the site address.', '2. Find “Notifications”.', '3. Choose “Allow” and reload the page.'],
    saveErr: 'Couldn’t save the setting', saveErrS: 'Nothing has changed. Check your connection and try again.',
    aboutT: 'About', legalH: 'Legal', terms: 'Terms of Use', privacy: 'Privacy Policy', op: 'Operator',
    opT: 'Controller: PADELADA WORLD, S.L. · NIF B05783238 · Calle Josep Pla 8, Esc. 1, Pta. 1, 17252 Calonge i Sant Antoni (Girona), España · <a>hello@parrlo.com</a>. <a>Privacy Policy</a>.',
    ver: 'Version [fill in]',
    plansLead: 'Two paid plans for Parrlo, voice and calls.', nowT: 'Now: free level', nowS: 'Chats, groups and text translation don’t count toward the daily and weekly limits. Parrlo, voice and calls do.',
    plan: 'Plan', price: 'Price:', incl: 'What the plan includes', noLim: 'No limit:', noLimT: 'regular chats, groups, text translation', withLim: 'With a daily and a weekly limit:',
    groups: ['Parrlo', 'Voice', 'Calls'], amount: 'amount: —', choose: 'Choose',
    ph: 'Placeholder: names, contents and prices will be decided later.',
    sub: 'The subscription renews automatically until you cancel it in your Apple ID settings. Price: [VAT included — confirm with the Store manager]. Terms · Privacy Policy.',
    stayFree: 'Stay on free',
    usageLead: 'Daily and weekly limits for Parrlo, voice and calls. Regular chats always work.',
    today: 'Today', week: 'This week', resetDay: 'Resets tomorrow at 00:00 your time', resetWeek: 'Resets on Monday at 00:00 your time',
    unlimited: 'Regular chats, groups and text translation have no limit.', pick: 'See plans', ok: 'Got it',
    limT: 'Your daily Parrlo limit is used up', limS: 'Parrlo will work again after the reset. Voice and calls are counted separately. Regular chats, groups and text translation work as usual.',
    limWT: 'Your weekly Parrlo limit is used up', limWS: 'Parrlo will work again on Monday at 00:00 your time; the daily reset doesn’t change that. Voice and calls are counted separately. Regular chats, groups and text translation work as usual.',
    rstT: 'Limit reset', rstS: 'Today’s bars were reset at 00:00 your time. Weekly bars count from Monday.',
    rstB: 'Parrlo, voice and calls are available again', rstBS: 'The daily limit starts over.',
  },
};

// ---------- экраны ----------
const appleImg = '<img src="../../brand/apple-logo-white.svg" alt="">';

const root = (L, l) => `<div class="scroll root"><div class="head"><div class="bar empty"></div><h1 class="large">${L.settings}</h1></div>
<div style="height:14px"></div>
${sec({ h: L.parrlo, body: row({ tile: { bg: C.green, ic: 'parrot' }, t: L.parrlo, s: L.parrloMoved, extra: tbd(L.wording), chev: 1 }) })}
${sec({ h: L.tr, body: row({ t: L.trRow, sw: 'on' }), f: nw(L.trFoot) })}
${sec({ h: L.app, body: [
  row({ tile: { bg: C.blue, ic: 'person' }, t: L.account, v: 'Apple', chev: 1 }),
  row({ tile: { bg: C.red, ic: 'bell' }, t: L.notif, chev: 1 }),
  row({ tile: { bg: C.teal, ic: 'globe' }, t: L.appLang, v: L.langVal, chev: 1 }),
  row({ tile: { bg: C.gray, ic: 'info' }, t: L.about, chev: 1 }),
].join('') })}
${sec({ body: row({ tile: { bg: C.plum, ic: 'gauge' }, t: L.usage, chev: 1 }) + row({ tile: { bg: C.amber, ic: 'card' }, t: L.plans, chev: 1 }) })}
<div style="height:120px"></div></div>
${tabs(l, 'gear')}`;

const accountBody = (L) => `<div class="scroll">
${sec({ body: [
  row({ tile: { bg: C.blue, ic: 'person' }, t: L.nameRow, s: L.name, chev: 1 }),
  row({ tile: { bg: C.black, img: appleImg }, t: L.apple, s: L.appleS }),
  row({ tile: { bg: C.teal, ic: 'bubble' }, t: L.contact, s: L.contactS, chev: 1 }),
].join('') })}
${sec({ body: row({ tile: { bg: C.gray, ic: 'logout' }, t: L.logout }) })}
${sec({ h: L.newPhone, f: `<p>${nw(L.newPhoneT)}</p>${tbd(L.wording)}` })}
${sec({ body: row({ tile: { bg: C.red, ic: 'trash' }, t: L.del, danger: 1 }) })}
</div>
${navSub(L, L.account)}`;

const alert = (h, m, notes, btns) => `<div class="dim"></div><div class="al" role="alertdialog"><div class="bd"><h2>${nw(h)}</h2><p>${nw(m)}</p>${notes}</div>${btns.map(([c, t]) => `<div class="ab ${c}">${nw(t)}</div>`).join('')}</div>`;

const delStep1 = (L, extra = '') => `<div class="scroll">${hero({ cap: L.step1, h: L.delQ, lead: L.delLead, tb: L.legal })}${extra}</div>${navSub(L, '')}`;

const notifRows = (L, sw) => sec({ body: row({ t: L.msgs, s: L.msgsS, sw }) + row({ t: L.calls, s: L.callsS, sw }) });
const remSec = (L) => sec({ h: L.inApp, body: row({ t: L.rem, sw: 'off' }), f: nw(L.remS) });

const usageSec = (L, h, reset, vals, full) => sec({ h, body: L.groups.map((g, i) =>
  `<div class="ur"><span class="n">${g}</span><div class="mt${full === i ? ' full' : ''}" role="img"><i class="k${i + 1}" style="width:${vals[i]}%"></i></div></div>`).join(''),
  f: `<div class="rs">${ic('clock')}<div>${nw(reset)}${tbd(L.na)}</div></div>` });
const inclBlock = (L, cls = '') => `<div class="incl ${cls}"><h4>${nw(L.incl)}${tbd(L.na, 1)}</h4><p><b>${L.noLim}</b> ${nw(L.noLimT)}</p><p><b>${nw(L.withLim)}</b></p>
<ul>${L.groups.map(g => `<li><span>${g}</span><span class="vv">${L.amount}</span></li>`).join('')}</ul></div>`;

const screens = {
  settings: { tabs: true, body: (L, l) => root(L, l) },
  'settings-account': { body: (L) => accountBody(L) },
  'settings-account-logout': { body: (L) => accountBody(L) + alert(L.logoutQ, L.logoutM, tbd(L.wording), [['d', L.logoutB], ['c', L.cancel]]) },
  'settings-account-delete': { body: (L) => delStep1(L) + acts([['dng', L.cont], ['pl', L.cancel]]) },
  'settings-account-delete-confirm': { body: (L) => delStep1(L) + acts([['dng', L.cont], ['pl', L.cancel]]) +
    alert(L.delQ2, L.delM2, `<p class="n">${nw(L.step2)}</p>${tbd(L.wording)}`, [['d', L.del], ['c', L.cancel]]) },
  'settings-account-delete-error': { body: (L) => delStep1(L, sec({ body: banner('err', L.delErr, L.delErrS, L.wording) })) + acts([['dng', L.retry], ['pl', L.cancel]]) },
  'settings-account-deleted': { body: (L) => `<div class="done" role="status"><span class="ring">${ic('check')}</span><h1>${nw(L.deleted)}</h1><p>${nw(L.deletedS)}</p>${tbd(L.wording)}</div>` + acts([['pri', L.close]], true) },
  'settings-name': { body: (L) => `<div class="scroll">${sec({ h: L.nameLbl, body: `<div class="inp" role="textbox">${L.name}<i class="cur"></i></div>`, f: `<span class="cnt">5 / 60</span>${nw(L.nameLead)}` })}</div>
${navSub(L, L.nameRow, `<span class="pbtn acc">${L.save}</span>`, true)}` },
  'settings-language': { body: (L) => `<div class="scroll">${sec({ body: L.langs.map(([t, s, on]) => row({ t: `<span lang="${t === 'Русский' ? 'ru' : t === 'English' ? 'en' : 'es'}">${t}</span>`, s, chk: on })).join(''), f: nw(L.langNote) + tbd(L.wording) })}</div>${navSub(L, L.appLang)}` },
  'settings-notifications': { body: (L) => `<div class="scroll">${notifRows(L, 'on')}${remSec(L)}
${sec({ body: row({ tile: { bg: C.gray, ic: 'bellOff' }, t: L.pushOff, s: L.pushOffS, extra: tbd(L.legal), chev: 1 }), f: tbd(L.wording) })}</div>${navSub(L, L.notif)}` },
  'settings-notifications-blocked': { body: (L) => `<div class="scroll">${sec({ body: banner('off', L.blkT, L.blkS, L.wording) })}${notifRows(L, 'dis')}
${sec({ h: L.how, body: `<div class="cellp"><ol>${L.steps.map(s => `<li>${nw(s)}</li>`).join('')}</ol></div>`, f: tbd(L.wording) })}${remSec(L)}</div>${navSub(L, L.notif)}` },
  'settings-save-error': { body: (L) => `<div class="scroll">${sec({ body: banner('err', L.saveErr, L.saveErrS, L.wording) })}${notifRows(L, 'on')}${remSec(L)}</div>${navSub(L, L.notif)}` },
  'settings-about': { body: (L) => `<div class="scroll">${sec({ h: L.legalH, body: row({ tile: { bg: C.gray, ic: 'doc' }, t: L.terms, chev: 1 }) + row({ tile: { bg: C.blue, ic: 'shield' }, t: L.privacy, chev: 1 }) })}
${sec({ h: L.op, body: `<div class="cellp mut">${nw(L.opT)}</div>`, f: L.ver })}</div>${navSub(L, L.aboutT)}` },
  plans: { body: (L) => `<div class="scroll"><p class="intro">${nw(L.plansLead)}</p>
${sec({ body: row({ tile: { bg: C.green, ic: 'check' }, t: `<b style="font-weight:600">${nw(L.nowT)}</b>`, s: L.nowS }) })}
${[1, 2].map(n => sec({ body: `<div class="plan"><h3>${L.plan} ${n}</h3><p class="pr">${L.price} <b>—</b>${tbd(L.na, 1)}</p>${inclBlock(L)}<span class="bb pri sm">${L.choose}</span></div>` })).join('')}
<p class="ph">${nw(L.ph)}</p>
<div class="ft" style="padding:12px 32px 0">${nw(L.sub)}${tbd(L.na)}</div><div style="height:140px"></div></div>
${navSub(L, L.plans)}${acts([['', L.stayFree]])}` },
  usage: { body: (L) => `<div class="scroll"><p class="intro">${nw(L.usageLead)}</p>
${usageSec(L, L.today, L.resetDay, [46, 18, 28])}${usageSec(L, L.week, L.resetWeek, [34, 20, 42])}
<div class="ft" style="padding:16px 32px 0">${nw(L.unlimited)}</div></div>${navSub(L, L.usage)}${acts([['pri', L.pick]])}` },
  'usage-limit': { body: (L) => `<div class="scroll">${hero({ persona: 1, h: L.limT, lead: L.limS })}
${usageSec(L, L.today, L.resetDay, [100, 30, 24], 0)}${usageSec(L, L.week, L.resetWeek, [62, 28, 36])}
${sec({ body: `<div class="plan plan-only">${inclBlock(L)}</div>` })}<div class="ft" style="padding:16px 32px 0">${nw(L.unlimited)}</div><div style="height:160px"></div></div>${navSub(L, '')}${acts([['pri', L.pick], ['pl', L.ok]])}` },
  'usage-limit-week': { body: (L) => `<div class="scroll">${hero({ persona: 1, h: L.limWT, lead: L.limWS, tb: L.wording })}
${usageSec(L, L.today, L.resetDay, [46, 18, 28])}${usageSec(L, L.week, L.resetWeek, [100, 28, 36], 0)}
${sec({ body: `<div class="plan plan-only">${inclBlock(L)}</div>` })}<div class="ft" style="padding:16px 32px 0">${nw(L.unlimited)}</div><div style="height:160px"></div></div>${navSub(L, '')}${acts([['pri', L.pick], ['pl', L.ok]])}` },
  'usage-reset': { body: (L) => `<div class="scroll">${hero({ h: L.rstT, lead: L.rstS, tb: L.wording })}
${sec({ body: banner('ok', L.rstB, L.rstBS) })}<div style="height:24px"></div>
${usageSec(L, L.today, L.resetDay, [0, 0, 0])}${usageSec(L, L.week, L.resetWeek, [34, 20, 42])}
<div class="ft" style="padding:16px 32px 0">${nw(L.unlimited)}</div></div>${navSub(L, '')}${acts([['pri', L.pick]])}` },
};

// ---------- страница: три языка в <template>, скрипт выбирает по ?l= и подгоняет слова на AX5 ----------
// wordfit: если слово не помещается в блок — уменьшаем шрифт этого блока шагами ×0.92, не ниже 28 (AX1).
const RUNTIME = `(function(){var q=new URLSearchParams(location.search),h=document.documentElement;h.dataset.d=q.get('d')||'max';h.dataset.t=q.get('t')||'n';
var l=q.get('l');if(l!=='es'&&l!=='en')l='ru';h.lang=l;
document.addEventListener('DOMContentLoaded',function(){var tp=document.querySelector('template[data-l="'+l+'"]');var s=document.querySelector('.screen');
s.insertBefore(tp.content.cloneNode(true),s.querySelector('.home-ind'));
document.fonts.ready.then(function(){
 var own=function(e){for(var n=e.firstChild;n;n=n.nextSibling)if(n.nodeType===3&&n.textContent.trim())return true;return false};
 var els=[].slice.call(s.querySelectorAll('*')).filter(function(e){return own(e)&&getComputedStyle(e).display!=='inline'&&!e.closest('.tabs,.sb')});
 var over=function(e){var b=e.closest('.nw')?e.parentElement:e;return e.scrollWidth>e.clientWidth+1};
 els.forEach(function(e){var fs=parseFloat(getComputedStyle(e).fontSize),n=0;
  while(over(e)&&fs>28&&n<20){fs=Math.max(28,fs*0.92);e.style.fontSize=fs+'px';e.style.lineHeight='1.2';n++}
  if(n)e.dataset.fit=n});
 document.body.dataset.ready='1';});});})()`;

const page = (key, sc) => `<!doctype html>
<html lang="ru" data-d="max" data-t="n" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${T.ru[{ settings: 'settings', plans: 'plans', usage: 'usage' }[key] || 'settings']} — ${key}</title><link rel="stylesheet" href="../rd.css"><link rel="stylesheet" href="settings.css">
<script>${RUNTIME}</script>
</head><body><main class="screen${sc.tabs ? ' has-tabs' : ''}" data-screen="${key}">
${statusBar()}
<i class="home-ind"></i>
</main>
${['ru', 'es', 'en'].map(l => `<template data-l="${l}">${sc.body(T[l], l)}</template>`).join('\n')}
</body></html>
`;

for (const [k, sc] of Object.entries(screens)) fs.writeFileSync(path.join(OUT, k + '.html'), page(k, sc));

// ---------- обзор: все экраны, Pro Max, обычный текст, ru ----------
const names = Object.keys(screens);
const idx = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Настройки — обзор</title>
<style>@font-face{font-family:Inter;font-weight:100 900;src:url(../../fonts/Inter-Variable.woff2) format("woff2")}
body{margin:0;background:#0B0E12;color:#E8ECF1;font-family:-apple-system,"SF Pro Text",Inter,system-ui,sans-serif;padding:40px 40px 56px;width:${6 * 240 + 5 * 24}px}
h1{font-size:28px;font-weight:600;margin:0 0 6px}p.l{color:#9AA4B2;margin:0 0 28px;font-size:15px}
.g{display:grid;grid-template-columns:repeat(6,240px);gap:28px 24px}
figure{margin:0}figure img{display:block;width:240px;border-radius:14px;border:1px solid rgba(255,255,255,.14)}
figcaption{font-size:13px;color:#9AA4B2;margin-top:8px;letter-spacing:0}</style></head><body>
<h1>Parrlo Chat — редизайн iOS · Настройки</h1><p class="l">${names.length} экранов · iPhone Pro Max 440×956 · обычный текст · ru · тёмная тема</p>
<div class="g">${names.map(k => `<figure><img src="png/${k}__max-n-ru.png" alt="${k}"><figcaption>${k}</figcaption></figure>`).join('')}</div></body></html>`;
fs.writeFileSync(path.join(OUT, 'index.html'), idx);
console.log('ok:', names.length, 'экранов');
