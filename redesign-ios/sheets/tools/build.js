// Генератор страниц пакета «листы, диалоги, меню, ошибки». Запуск: node redesign-ios/sheets/tools/build.js
// Страница: ?d=se|max &t=n|ax5 &l=ru|es|en. На странице три экрана (по языку), виден один.
// Помощники (иконки, попугай, статус-бар, таб-бар) скопированы из redesign-ios/tools/build.js.
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '..');

const PARROT_INNER = '<defs><mask id="pc-pmk" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024"><rect width="1024" height="1024" fill="#fff"/><circle cx="612" cy="372" r="44" fill="#000"/><path d="M735 322 L 895 322 A160 160 0 0 1 735 482 Z" fill="#000" stroke="#000" stroke-width="28" stroke-linejoin="round"/></mask></defs><g mask="url(#pc-pmk)"><path d="M345 800 L 235 925 L 420 895 Z" stroke="currentColor" stroke-width="70" stroke-linejoin="round"/><circle cx="500" cy="640" r="245"/><circle cx="560" cy="395" r="235"/></g><path d="M735 322 L 895 322 A160 160 0 0 1 735 482 Z"/>';
let pid = 0;
const parrot = () => { const id = 'pc-pmk' + (pid++); return `<svg class="ic ic-parrot" viewBox="180 140 735 840" aria-hidden="true" focusable="false">${PARROT_INNER.replace(/pc-pmk/g, id)}</svg>`; };

const P = {
  back: '<path d="M14.5 5.5L8 12l6.5 6.5"/>',
  clip: '<path d="M20 11.5l-8.3 8.3a4.8 4.8 0 01-6.8-6.8l8.6-8.6a3.2 3.2 0 014.5 4.5l-8.4 8.4a1.6 1.6 0 01-2.3-2.3l7.7-7.7"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21"/>',
  smile: '<circle cx="12" cy="12" r="8.5"/><path d="M8.6 14.2a4.4 4.4 0 006.8 0"/><circle cx="9.3" cy="10" r=".9" fill="currentColor" stroke="none"/><circle cx="14.7" cy="10" r=".9" fill="currentColor" stroke="none"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.8-4.8"/>',
  compose: '<path d="M12 4.5H6.5a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2V12"/><path d="M17.6 3.9a2 2 0 012.8 2.8L12.5 14.6l-3.7.9.9-3.7z"/>',
  contacts: '<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.3-3.6 4.2-5.6 7.5-5.6s6.2 2 7.5 5.6"/>',
  calls: '<path d="M6.2 3.8h3l1.6 4.2-2 1.3a10.5 10.5 0 005.9 5.9l1.3-2 4.2 1.6v3a2 2 0 01-2.2 2A16.5 16.5 0 014.2 6a2 2 0 012-2.2z"/>',
  chats: '<path d="M12 3.8c4.8 0 8.6 3.3 8.6 7.4s-3.8 7.4-8.6 7.4c-1 0-2-.1-2.9-.4L5 20l1-3.6c-1.6-1.4-2.6-3.2-2.6-5.2 0-4.1 3.8-7.4 8.6-7.4z"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.8l1.6 2.3 2.7-.6.6 2.7 2.4 1.4-1 2.5 1 2.5-2.4 1.4-.6 2.7-2.7-.6L12 21.2l-1.6-2.3-2.7.6-.6-2.7-2.4-1.4 1-2.5-1-2.5 2.4-1.4.6-2.7 2.7.6z"/>',
  people: '<circle cx="9" cy="9" r="3"/><path d="M3.5 18.5c.9-2.8 3-4.3 5.5-4.3s4.6 1.5 5.5 4.3"/><circle cx="16.5" cy="9.5" r="2.4"/><path d="M16.3 14.2c2 .1 3.6 1.4 4.3 3.6"/>',
  up: '<path d="M12 19V5.5M6 11.5l6-6 6 6"/>',
  trash: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l.9 12.5a1 1 0 001 .9h7.2a1 1 0 001-.9L17.5 7M10 11v5.5M14 11v5.5"/>',
  tr: '<path d="M3.5 5.5h9M8 3.5v2M5.5 5.5c.8 2.8 2.8 5.2 5.8 6.8M10.5 5.5c-.8 2.8-2.9 5.2-6.3 6.8"/><path d="M12.5 20.5l3.8-9 3.8 9M13.8 17.5h5"/>',
  flag: '<path d="M5.5 21V4.5M5.5 4.5h11l-2 4 2 4h-11"/>',
  block: '<circle cx="12" cy="12" r="8.5"/><path d="M6 6l12 12"/>',
  photo: '<rect x="3.5" y="5" width="17" height="14" rx="2.5"/><circle cx="9" cy="10" r="1.8"/><path d="M4 17l5-4.5 4 3.5 3-2.5 4.5 3.5"/>',
  camera: '<path d="M4.5 8h3l1.6-2.5h5.8L16.5 8h3a1.5 1.5 0 011.5 1.5v8a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 17.5v-8A1.5 1.5 0 014.5 8z"/><circle cx="12" cy="13" r="3.4"/>',
  place: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  x: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
  minus: '<path d="M6.5 12h11"/>',
  save: '<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14"/>',
  share: '<path d="M12 15V3.8M8 7.5l4-4 4 4"/><path d="M8.5 11H6.5A1.5 1.5 0 005 12.5v6A1.5 1.5 0 006.5 20h11a1.5 1.5 0 001.5-1.5v-6a1.5 1.5 0 00-1.5-1.5h-2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  chev: '<path d="M9.5 5.5L16 12l-6.5 6.5"/>',
  link: '<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',
  nowifi: '<path d="M3 8.5a13 13 0 0113.6-2.6M20.9 8.6a13 13 0 00-1.6-1.3M6 12a8.6 8.6 0 017.5-2.3M18 12a8.6 8.6 0 00-1.4-1M9 15.4a4.2 4.2 0 016 0"/><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/><path d="M4 4l16 16"/>',
  down: '<path d="M12 4v15M6.5 13.5L12 19l5.5-5.5"/>',
  pinch: '<path d="M4 20l6-6M4 20v-4.5M4 20h4.5M20 4l-6 6M20 4v4.5M20 4h-4.5"/>',
};
const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;
const TICK2 = '<svg class="tick" viewBox="0 0 17 11" aria-hidden="true"><path d="M1 6l3.2 3.2L10 2.8"/><path d="M7.6 8.6l.6.6L15.6 1.8"/></svg>';

const statusBar = () => `<div class="sb"><span>9:41</span><i class="island"></i><span class="ri">
<svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
<svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 008 .6 10.4 10.4 0 00.8 3.5L2 4.8a8.6 8.6 0 016-2.4zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.8 6.8 0 008 4.2 6.8 6.8 0 003.4 6l1.2 1.3c.9-.8 2.1-1.3 3.4-1.3zm0 3.5c.4 0 .8.2 1.1.4L8 11.2 6.9 9.9c.3-.2.7-.4 1.1-.4z"/></svg>
<svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="22" height="12" rx="3.5" fill="none" stroke="currentColor" stroke-opacity=".4"/><rect x="2" y="2" width="16" height="9" rx="2" fill="currentColor"/><path d="M24.5 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2z" fill="currentColor" fill-opacity=".4"/></svg></span></div>`;

// ---------- тексты (из frames/{ru,es,en}-<screen>.html, дословно) ----------
let L = 0; // 0 ru · 1 es · 2 en
const LANGS = ['ru', 'es', 'en'];
const T = {
  today: ['Сегодня', 'Hoy', 'Today'],
  msg: ['Сообщение', 'Mensaje', 'Message'],
  back: ['Назад', 'Atrás', 'Back'],
  marcoSub: ['Пишет по-испански · перевод включён', 'Escribe en ruso · traducción activada', 'Writes in Spanish · translation on'],
  marcoSubOff: ['Пишет по-испански · перевод выключен', 'Escribe en ruso · traducción desactivada', 'Writes in Spanish · translation off'],
  m1: ['Увидимся у входа в девять, я возьму билеты.', 'Nos vemos en la entrada a las nueve, cojo las entradas.', 'See you at the entrance at nine, I’ll get the tickets.'],
  m1off: ['Nos vemos en la entrada a las nueve, cojo yo las entradas.', 'Увидимся у входа в девять, я возьму билеты.', 'Nos vemos en la entrada a las nueve, cojo yo las entradas.'],
  trFrom: ['Переведено с испанского', 'Traducido del ruso', 'Translated from Spanish'],
  showO: ['Показать оригинал', 'Ver original', 'Show original'],
  hideO: ['Скрыть оригинал', 'Ocultar original', 'Hide original'],
  orig: ['Оригинал', 'Original', 'Original'],
  m2: ['Отлично, до встречи!', '¡Genial, hasta luego!', 'Great, see you there!'],
  m2cap: ['Marco прочтёт на испанском', 'Marco lo leerá en ruso', 'Marco will read it in Spanish'],
  m3: ['Можно, я приведу ещё и Джулию?', '¿Puedo llevar también a Giulia?', 'Can I bring Giulia too?'],
  m3o: ['¿Puedo llevar también a Giulia?', 'Можно, я приведу ещё и Джулию?', '¿Puedo llevar también a Giulia?'],
  callT: ['Протокол звонка', 'Transcripción de la llamada', 'Call transcript'],
  callS: ['Звонок с Marco · 12 мин', 'Llamada con Marco · 12 min', 'Call with Marco · 12 min'],
  callAi: ['Расшифровка ИИ', 'Transcripción (IA)', 'AI transcript'],
  open: ['Открыть', 'Abrir', 'Open'],
  m4: ['Я на встрече, отвечу, как только смогу.', 'Estoy en una reunión, te respondo en cuanto pueda.', 'I’m in a meeting, I’ll reply as soon as I can.'],
  m4cap: ['Автоответ Parrlo (ИИ) от имени Marco', 'Respuesta automática de Parrlo (IA) en nombre de Marco', 'Automatic reply from Parrlo (AI) on behalf of Marco'],
  m5: ['Буду у входа без пяти девять.', 'Estaré en la entrada a las nueve menos cinco.', 'I’ll be at the entrance at five to nine.'],
  m5cap: ['Это отправлено Parrlo без твоего просмотра', 'Parrlo lo envió sin que lo revisaras', 'Parrlo sent this without your review'],
  offH: ['Перевод в этом чате выключен', 'Traducción desactivada en este chat', 'Translation is off in this chat'],
  offP: ['Сообщения показываются на языке оригинала.', 'Los mensajes se muestran en el idioma original.', 'Messages are shown in the original language.'],
  offOn: ['Включить перевод', 'Activar traducción', 'Turn translation on'],
  tbd: ['формулировка: не утверждено', 'redacción: no aprobada', 'wording: not approved'],
  // группа
  gName: ['Квартира', 'Piso', 'Flat'], gI: ['К', 'P', 'F'],
  gSub: ['12 участников', '12 participantes', '12 members'],
  gAi: ['Здесь может использоваться ИИ-помощник одного из участников', 'Aquí puede usarse el asistente de IA de algún participante', 'A participant may be using an AI assistant here'],
  more: ['Подробнее', 'Más información', 'Learn more'],
  gCall: ['Идёт групповой звонок', 'Llamada de grupo en curso', 'Group call in progress'],
  gCallS: ['Лена и Marco уже в звонке', 'Lena y Marco ya están en la llamada', 'Lena and Marco are on the call'],
  join: ['Присоединиться', 'Unirse', 'Join'],
  // ru: прошедшее время с родом переписано нейтрально (не утверждено)
  gSys: ['Анна теперь в группе <span class="tbd">формулировка: не утверждено</span>', 'Ana se ha unido al grupo', 'Anna joined the group'],
  lena: ['Лена', 'Lena', 'Lena'],
  g1: ['Свет оплачен, чек выше <span class="tbd">формулировка: не утверждено</span>', 'He pagado la luz, recibo arriba', 'Paid the electricity, receipt above'],
  g2: ['Кто принесёт хлеб?', '¿Quién trae el pan?', 'Who’s bringing the bread?'],
  g3: ['Я возьму, заеду в семь', 'Lo traigo yo, paso a las siete', 'I’ll get it, stopping by at seven'],
  // лист перевода
  trT: ['Перевод в этом чате', 'Traducción en este chat', 'Translation in this chat'],
  trP: ['Эта настройка важнее общей. Общая: Настройки → Переводить сообщения.', 'Este ajuste prevalece sobre el general. General: Ajustes → Traducir mensajes.', 'This setting overrides the general one. General: Settings → Translate messages.'],
  trSw: ['Переводить сообщения в этом чате', 'Traducir los mensajes de este chat', 'Translate messages in this chat'],
  trOn: ['Сообщения переводятся на твой язык.', 'Los mensajes se traducen a tu idioma.', 'Messages are translated into your language.'],
  done: ['Готово', 'Listo', 'Done'],
  trGen: ['Общие настройки перевода', 'Ajustes generales de traducción', 'General translation settings'],
  // фото
  phT: ['Отправить фото', 'Enviar fotos', 'Send photos'],
  phPhoto: ['Фото', 'Fotos', 'Photos'], phCam: ['Камера', 'Cámara', 'Camera'], phLoc: ['Место', 'Ubicación', 'Location'],
  phLim: ['До 10 фото, каждое до 10 МБ', 'Hasta 10 fotos, cada una de hasta 10 MB', 'Up to 10 photos, each up to 10 MB'],
  cancel: ['Отмена', 'Cancelar', 'Cancel'],
  // жалоба
  rT: ['Пожаловаться на сообщение', 'Denunciar un mensaje', 'Report a message'],
  rWhat: ['Что не так?', '¿Qué ocurre?', 'What’s wrong?'],
  rOpts: [['Спам', 'Оскорбления или травля', 'Угрозы', 'Мошенничество', 'Дети или сексуальный контент', 'Что-то незаконное', 'Другое'],
    ['Spam', 'Insultos o acoso', 'Amenazas', 'Estafa', 'Menores o contenido sexual', 'Algo ilegal', 'Otro'],
    ['Spam', 'Insults or harassment', 'Threats', 'Scam', 'Children or sexual content', 'Something illegal', 'Other']],
  rTell: ['Расскажи, что случилось (по желанию):', 'Cuéntanos qué ha pasado (opcional):', 'Tell us what happened (optional):'],
  rSee: ['Что увидит модератор', 'Qué verá el moderador', 'What the moderator will see'],
  // ru: «пока ты сам их не разрешишь» → «пока ты их не разрешишь» (без рода, правило брифа)
  rSeeP: ['Это сообщение и данные о том, кто и когда его отправил. Для контекста мы добавим несколько сообщений рядом: до 5 перед ним и до 2 после. Ты видишь этот набор ниже и можешь убрать любое сообщение. Остальную переписку модератор не открывает. Вложения, голосовые и протоколы звонков не добавляются, пока ты их не разрешишь.',
    'Este mensaje y los datos de quién lo envió y cuándo. Para dar contexto añadiremos algunos mensajes cercanos: hasta 5 anteriores y hasta 2 posteriores. Ves este conjunto debajo y puedes quitar cualquier mensaje. El moderador no abre el resto de la conversación. Los archivos adjuntos, las notas de voz y las transcripciones de llamadas no se añaden si no lo permites tú.',
    'This message and details of who sent it and when. For context we’ll add a few nearby messages: up to 5 before and up to 2 after. You can see this set below and remove any message. The moderator does not open the rest of the conversation. Attachments, voice messages and call transcripts aren’t added unless you allow it.'],
  rSet: [[['Marco · 09:10', 'Ты придёшь вечером?'], ['Alex R. · 09:12', 'Текст сообщения, на которое поступила жалоба.'], ['Marco · 09:13', 'Не отвечай ему.']],
    [['Marco · 09:10', '¿Vienes esta noche?'], ['Alex R. · 09:12', 'Texto del mensaje denunciado.'], ['Marco · 09:13', 'No le contestes.']],
    [['Marco · 09:10', 'Are you coming tonight?'], ['Alex R. · 09:12', 'Text of the reported message.'], ['Marco · 09:13', 'Don’t answer him.']]],
  rRm: ['Убрать сообщение', 'Quitar mensaje', 'Remove message'],
  rStore: ['Parrlo Chat хранит чаты на наших серверах. Сотрудники не читают чаты, а открывают только то, на что поступила жалоба. В сообщениях могут быть данные других людей и твои.',
    'Parrlo Chat conserva los chats en nuestros servidores. El personal no lee los chats: solo abre lo que ha sido denunciado. Los mensajes pueden contener datos de otras personas y tuyos.',
    'Parrlo Chat keeps chats on our servers. Staff don’t read chats: they only open what has been reported. The messages may contain other people’s data and yours.'],
  rTbdLong: ['юрист проверит · сотрудники не читают чаты — только если реализовано и подтверждено; «сортирует поставщик ИИ» — только если так и есть; галочка «добросовестно» — только для «Что-то незаконное»',
    'lo revisará un abogado · el personal no lee los chats: solo si está implementado y confirmado; «lo clasifica un proveedor de IA»: solo si es así; casilla de buena fe: solo para «Algo ilegal»',
    'lawyer to review · staff don’t read chats: only if implemented and confirmed; “first sorted by an AI provider”: only if true; good-faith box: only for “Something illegal”'],
  rTbdBtn: ['кнопка жалобы: формулировка не утверждена', 'botón de denuncia: redacción no aprobada', 'report button wording: not approved'],
  rAllow: ['Разрешаю модератору открыть вложение / голосовое / протокол звонка этого сообщения.', 'Permito al moderador abrir el archivo adjunto / la nota de voz / la transcripción de la llamada de este mensaje.', 'I allow the moderator to open the attachment / voice message / call transcript of this message.'],
  rNext: ['Что дальше', 'Qué pasa después', 'What happens next'],
  rNextP: ['Жалобу прочитает сотрудник Parrlo Chat. Мы используем сообщения только для разбора жалобы и не показываем их другим участникам. Автору сообщения мы не говорим, что жалоба от тебя. Копию храним до 90 дней после решения, запись о решении — 12 месяцев, потом удаляем.',
    'Una persona del equipo de Parrlo Chat leerá la denuncia. Usamos los mensajes únicamente para resolver la denuncia y no los mostramos a otros participantes. No decimos al autor del mensaje que la denuncia es tuya. Conservamos la copia hasta 90 días después de la decisión y el registro de la decisión, 12 meses; después los borramos.',
    'A member of the Parrlo Chat team will read the report. We use the messages only to handle the report and don’t show them to other participants. We don’t tell the author of the message that the report is from you. We keep the copy for up to 90 days after the decision and the decision record for 12 months; then we delete them.'],
  rOp: ['Оператор: PADELADA WORLD, S.L. · NIF B05783238 · Calle Josep Pla 8, Esc. 1, Pta. 1, 17252 Calonge i Sant Antoni (Girona), España · hello@ parrlo.com · [Политика конфиденциальности]',
    'Responsable: PADELADA WORLD, S.L. · NIF B05783238 · Calle Josep Pla 8, Esc. 1, Pta. 1, 17252 Calonge i Sant Antoni (Girona), España · hello@ parrlo.com · [Política de privacidad]',
    'Controller: PADELADA WORLD, S.L. · NIF B05783238 · Calle Josep Pla 8, Esc. 1, Pta. 1, 17252 Calonge i Sant Antoni (Girona), España · hello@ parrlo.com · [Privacy Policy]'],
  rFaith: ['Я добросовестно считаю, что сообщённое мной верно и полно.', 'Creo de buena fe que lo que comunico es exacto y completo.', 'I believe in good faith that what I report is accurate and complete.'],
  rBlock: ['Заблокировать этого пользователя', 'Bloquear a este usuario', 'Block this user'],
  rSend: ['Отправить жалобу на сообщение', 'Enviar denuncia del mensaje', 'Send message report'],
  rSendOnly: ['Отправить только это сообщение', 'Enviar solo este mensaje', 'Send this message only'],
  rOkT: ['Жалоба <span class="nw">№[номер]</span> получена.', 'Hemos recibido la denuncia <span class="nw">n.º [número]</span>.', 'Report <span class="nw">#[number]</span> received.'],
  rOkP: ['Мы сообщим о решении в приложении.', 'Te informaremos de la decisión en la app.', 'We’ll tell you the decision in the app.'],
  lawyer: ['юрист проверит', 'lo revisará un abogado', 'lawyer to review'],
  ok: ['Понятно', 'Entendido', 'OK'],
  // меню
  call: ['Позвонить', 'Llamar', 'Call'], findIn: ['Поиск в чате', 'Buscar en el chat', 'Search in chat'], block: ['Заблокировать', 'Bloquear', 'Block'],
  // диалоги
  delT: ['Удалить чат?', '¿Eliminar el chat?', 'Delete chat?'],
  delP: ['Переписка удалится у тебя на всех устройствах. Чат вернётся, когда придёт новое сообщение. У собеседника всё останется.', 'La conversación se eliminará en todos tus dispositivos. El chat volverá cuando llegue un mensaje nuevo. La otra persona la conserva.', 'The conversation will be deleted on all your devices. The chat comes back when a new message arrives. The other person keeps it.'],
  delB: ['Удалить чат', 'Eliminar chat', 'Delete chat'],
  limPT: ['Лимит Parrlo на сегодня закончился', 'El límite de Parrlo de hoy se ha acabado', 'Today’s Parrlo limit has run out'],
  limCT: ['Лимит звонков на сегодня закончился', 'El límite de llamadas de hoy se ha acabado', 'Today’s call limit has run out'],
  limWT: ['Недельный лимит Parrlo закончился', 'El límite semanal de Parrlo se ha acabado', 'The weekly Parrlo limit has run out'],
  limDay: ['Обычные чаты работают. Сброс: завтра в 00:00 по твоему времени', 'Los chats normales funcionan. Restablecimiento: mañana a las 00:00, hora tuya', 'Regular chats work. Resets: tomorrow at 00:00 your time'],
  limWeek: ['Обычные чаты работают. Сброс: в понедельник в 00:00 по твоему времени', 'Los chats normales funcionan. Restablecimiento: el lunes a las 00:00, hora tuya', 'Regular chats work. Resets: Monday at 00:00 your time'],
  plan: ['Выбрать тариф', 'Ver tarifas', 'See plans'],
  gotIt: ['Понятно', 'Entendido', 'Got it'],
  // ошибки
  notSent: ['Не отправлено', 'No enviado', 'Not sent'],
  retry: ['Повторить', 'Reintentar', 'Try again'],
  del: ['Удалить', 'Borrar', 'Delete'],
  edit: ['Изменить', 'Editar', 'Edit'],
  hSend: ['Сообщение не ушло. Когда появится сеть, отправим ещё раз. Можно повторить сразу или удалить.', 'El mensaje no se ha enviado. Lo reintentaremos una vez cuando vuelva la conexión. Puedes reintentarlo ya o borrarlo.', 'The message didn’t go through. We’ll try once more when you’re back online. You can retry now or delete it.'],
  hBlocked: ['Не удалось доставить сообщение.', 'No se ha podido entregar el mensaje.', 'The message couldn’t be delivered.'],
  hLong: ['Сообщение слишком длинное — сократи его и отправь снова.', 'El mensaje es demasiado largo: acórtalo y vuelve a enviarlo.', 'The message is too long — shorten it and send it again.'],
  unsup: ['Сообщение не поддерживается. Обнови приложение, чтобы его увидеть.', 'Mensaje no compatible. Actualiza la app para verlo.', 'Unsupported message. Update the app to see it.'],
  upd: ['Обновить приложение', 'Actualizar la app', 'Update the app'],
  // Parrlo / черновик
  pSub: ['На связи', 'En línea', 'Online'],
  pComp: ['Напиши или продиктуй Parrlo', 'Escribe o dicta a Parrlo', 'Write or dictate to Parrlo'],
  dAsk: ['Скажи Пете, что завтра буду в десять в офисе', 'Dile a Pedro que mañana estaré a las diez en la oficina', 'Tell Pete I’ll be at the office at ten tomorrow'],
  dH: ['Черновик для Пети', 'Borrador para Pedro', 'Draft for Pete'],
  dHe: ['Правка черновика', 'Editando el borrador', 'Editing the draft'],
  to: ['Кому', 'Para', 'To'], petya: ['Петя', 'Pedro', 'Pete'], petyaI: ['П', 'P', 'P'],
  dTxt: ['Буду завтра в 10 в офисе.', 'Mañana a las 10 estaré en la oficina.', 'I’ll be at the office tomorrow at 10.'],
  dSt: ['Ждёт твоего подтверждения', 'Espera tu confirmación', 'Waiting for your confirmation'],
  dS: ['Без твоего «Отправить» ничего не уйдёт.', 'No se envía nada hasta que pulses Enviar.', 'Nothing is sent until you tap Send.'],
  dSe: ['Поправь текст как хочешь — потом отправь.', 'Cambia el texto como quieras y luego envíalo.', 'Change the text however you like, then send it.'],
  send: ['Отправить', 'Enviar', 'Send'],
  // список чатов
  chats: ['Чаты', 'Chats', 'Chats'], search: ['Поиск', 'Buscar', 'Search'],
  quick: ['Быстрые действия', 'Acciones rápidas', 'Quick actions'],
  qNew: ['Новый чат', 'Chat nuevo', 'New chat'], qDict: ['Продиктовать Parrlo', 'Dictar a Parrlo', 'Dictate to Parrlo'], qInv: ['Пригласить по ссылке', 'Invitar con un enlace', 'Invite with a link'],
  offT: ['Нет сети', 'Sin conexión', 'No connection'],
  offB: ['Проверь подключение к интернету и попробуй ещё раз.', 'Comprueba tu conexión a internet e inténtalo de nuevo.', 'Check your internet connection and try again.'],
  // просмотр фото
  close: ['Закрыть', 'Cerrar', 'Close'],
  phWhen: ['Сегодня, 09:20', 'Hoy, 09:20', 'Today, 09:20'],
  swipe: ['Смахни вниз, чтобы закрыть', 'Desliza hacia abajo para cerrar', 'Swipe down to close'],
  pinch: ['Щипок — увеличить', 'Pellizca para ampliar', 'Pinch to zoom'],
  capT: ['Наше любимое кафе. Жду тебя здесь в девять?', 'Nuestra cafetería de siempre. ¿Te espero aquí a las nueve?', 'Our usual café. Shall I wait for you here at nine?'],
  capO: ['Nuestro café de siempre. ¿Te espero aquí a las nueve?', 'Наше любимое кафе. Жду тебя здесь в девять?', 'Nuestro café de siempre. ¿Te espero aquí a las nueve?'],
  save: ['Сохранить', 'Guardar', 'Save'], share: ['Поделиться', 'Compartir', 'Share'], repPh: ['Пожаловаться на фото', 'Denunciar foto', 'Report photo'],
  three: ['3 фото', '3 fotos', '3 photos'],
  capPh: ['Подпись — собеседник прочитает в переводе', 'Pie de foto — la otra persona lo leerá traducido', 'Caption — the other person will read it translated'],
  addPh: ['Добавить ещё фото', 'Añadir más fotos', 'Add more photos'],
  rmPh: ['Убрать это фото', 'Quitar esta foto', 'Remove this photo'],
};
// фрагменты на другом языке (оригиналы переводов) помечены lang — для склейки NBSP и проверки по своему списку слов
const FOREIGN = { m1off: ['es', 'ru', 'es'], m3o: ['es', 'ru', 'es'], capO: ['es', 'ru', 'es'] };
const t = (k) => { const v = T[k]; if (!v) throw new Error('нет текста ' + k); return FOREIGN[k] ? `<span lang="${FOREIGN[k][L]}">${v[L]}</span>` : v[L]; };

// список чатов (frames/*-home-menu.html); ru «Позвони, когда будешь свободен» заменено утверждённым S1 «Позвони, как сможешь. Ничего срочного 🙂» (без рода)
const HOME = [
  [['av-0', 'П', 'Петя', '09:12', 'Завтра в 10 в офисе?', '2'], ['av-0', 'P', 'Pedro', '09:12', '¿Mañana a las 10 en la oficina?', '2'], ['av-0', 'P', 'Pete', '09:12', 'Tomorrow at 10 at the office?', '2']],
  [['av-1', 'К', 'Квартира', '08:47', '<em>Лена:</em> свет оплачен, чек выше <span class="tbd">формулировка: не утверждено</span>', '5'], ['av-1', 'P', 'Piso', '08:47', '<em>Lena:</em> ha pagado la luz, recibo arriba', '5'], ['av-1', 'F', 'Flat', '08:47', '<em>Lena:</em> paid the electricity, receipt above', '5']],
  [['av-2', 'M', 'Marco', 'Вчера', 'Увидимся у входа в девять'], ['av-2', 'M', 'Marco', 'Ayer', 'Nos vemos en la entrada a las nueve'], ['av-2', 'M', 'Marco', 'Yesterday', 'See you at the entrance at nine']],
  [['av-3', 'М', 'Мама', 'Вчера', 'Позвони, как сможешь. Ничего срочного&nbsp;🙂'], ['av-3', 'M', 'Mamá', 'Ayer', 'Llámame cuando estés libre'], ['av-3', 'M', 'Mum', 'Yesterday', 'Call me when you’re free']],
  [['av-1', 'А', 'Анна Л.', 'Вт', 'Спасибо, всё пришло <span class="tbd">формулировка: не утверждено</span>'], ['av-1', 'A', 'Ana L.', 'Mar', 'Gracias, lo he recibido todo'], ['av-1', 'A', 'Anna L.', 'Tue', 'Thanks, got everything']],
  [['av-2', 'М', 'Макеты', 'Пн', 'Файл с макетами обновлён'], ['av-2', 'M', 'Maquetas', 'Lun', 'El archivo de maquetas está actualizado'], ['av-2', 'M', 'Mockups', 'Mon', 'The mockups file is updated']],
];

// ---------- таб-бар (как в approved build.js) ----------
const TABS = [['contacts', 'Контакты', 'Contactos', 'Contacts'], ['calls', 'Звонки', 'Llamadas', 'Calls'], ['parrlo', '', '', ''], ['chats', 'Чаты', 'Chats', 'Chats'], ['gear', 'Настройки', 'Ajustes', 'Settings']];
const tabs = (active, o = {}) => `<nav class="tabs" aria-label="tabs">${TABS.map(([k, ...lb]) => {
  const on = k === active;
  if (k === 'parrlo') return `<a class="pc${on ? ' on' : ''}" aria-label="Parrlo"><i class="disc">${parrot()}${o.badge ? `<b class="pc-badge">${o.badge}</b>` : ''}</i></a>`;
  return `<a class="${on ? 'on' : ''}">${ic(k, on && k !== 'gear' ? 'fill' : '')}<span>${lb[L]}</span></a>`;
}).join('')}</nav>`;

// ---------- облачка ----------
const meta = (inner) => `<span class="ms" aria-hidden="true">${inner}</span><span class="m">${inner}</span>`;
const trc = (show, x = '') => `<span class="trc">${ic('tr')}${t('trFrom')} · <a>${t(show ? 'showO' : 'hideO')}</a>${x}</span>`;
// b: { text, time, own, tail, cap (подпись под текстом), tr: 'show'|'hide', orig, name, cls, extra }
const bubble = (b) => {
  const m = meta(b.time + (b.own && !b.noTick ? TICK2 : ''));
  // сегменты облачка; время встаёт в конец последнего (как в утверждённом S2)
  const seg = [];
  seg.push((x) => (b.name ? `<span class="nm" style="color:${b.nameC || 'var(--acc)'}">${b.name}</span>` : '') + `<span class="${b.tcls || ''}">${b.text}</span>${x}`);
  if (b.orig) seg.push((x) => `<div class="orig"><span class="lb">${t('orig')}</span><p>${b.orig}${x}</p></div>`);
  if (b.extra) seg.push((x) => `${b.extra}${x}`);
  if (b.tr) seg.push((x) => trc(b.tr === 'show', x));
  if (b.cap) seg.push((x) => `<span class="trc">${b.cap}${x}</span>`);
  const body = seg.map((f, i) => f(i === seg.length - 1 ? m : '')).join('');
  return `<div class="b ${b.tail ? 'tail ' + (b.own ? 'out-t' : 'in-t') : ''} ${b.cls || ''}">${body}</div>`;
};
const group = (own, items) => `<div class="grp ${own ? 'out' : 'in'}">${items.map((it, i) => bubble({ ...it, own, tail: it.tail ?? i === items.length - 1 })).join('')}</div>`;

const navChat = ({ title, sub, av, avC }) => `<header class="nav"><div class="bar"><span class="cbtn" aria-label="${t('back')}">${ic('back')}</span><div class="ttl"><b>${title}</b><span>${sub}</span></div>${av}</div></header>`;
// поле ввода без иконок (решение: и в покое тоже) — скрепка ○ · поле · микрофон ○, как s2-chat-A после PR 71
const composer = (ph = t('msg'), cls = '') => `<div class="comp ${cls}"><span class="cbtn">${ic('clip')}</span><div class="field ${ph.length > 14 ? 'wrap' : ''}"><span>${ph}</span></div><span class="cbtn">${ic('mic')}</span></div>`;
const marcoNav = (off) => navChat({ title: 'Marco', sub: t(off ? 'marcoSubOff' : 'marcoSub'), av: `<span class="av av36" style="background:var(--av-2)">M</span>` });

// фон: чат с Marco (frames/*-chat-tr-sheet.html и др.)
const marcoMsgs = (o = {}) => {
  let h = `<div class="chip">${t('today')}</div>`;
  if (o.off) {
    h += `<div class="note-card"><b>${t('offH')}</b><p>${t('offP')}</p><span class="tbd blk">${t('tbd')}</span><span class="lnk">${t('offOn')}</span></div>`;
    h += group(false, [{ text: t('m1off'), time: '09:12' }]) + group(true, [{ text: t('m2'), time: '09:13' }]) + group(false, [{ text: t('m3o'), time: '09:14' }]);
    return h;
  }
  h += group(false, [{ text: t('m1'), time: '09:12', tr: 'show' }]);
  h += group(true, [{ text: t('m2'), time: '09:13', cap: t('m2cap') }]);
  h += group(false, [o.m3closed ? { text: t('m3'), time: '09:14', tr: 'show' } : { text: t('m3'), orig: t('m3o'), time: '09:14', tr: 'hide' }]);
  if (o.call) {
    h += group(false, [{ text: `<b style="font-weight:600">${t('callT')}</b>`, time: '09:30', extra: `<span class="trc">${t('callS')} · ${t('callAi')}</span><span class="btn inb">${t('open')}</span>` }]);
    h += group(false, [{ text: t('m4'), time: '09:31', tr: 'show', cap: t('m4cap') }]);
    h += group(true, [{ text: t('m5'), time: '09:33', cap: t('m5cap') }]);
  }
  if (o.after) h += o.after;
  return h;
};
const marcoChat = (o = {}) => `<div class="msgs">${marcoMsgs(o)}</div>${marcoNav(o.off)}${composer()}`;

// фон: группа «Квартира» (frames/*-chat-tr-sheet-group.html, *-limit-err-parrlo.html)
const groupChat = () => `<div class="msgs" style="padding-top:calc(var(--safe-top) + 52px + 56px)">
<div class="sys">${t('gAi')} · <a>${t('more')}</a></div>
<div class="chip">${t('today')}</div>
<div class="sys">${t('gSys')}</div>
${group(false, [{ text: t('g1'), time: '18:20', name: t('lena'), nameC: '#E7A24A' }])}
${group(false, [{ text: t('g2'), time: '18:24', name: 'Marco', nameC: '#8FA8F0', tr: 'show' }])}
${group(true, [{ text: t('g3'), time: '18:25' }])}
</div>
${navChat({ title: t('gName'), sub: t('gSub'), av: `<span class="av av36" style="background:var(--av-1)">${t('gI')}</span>` })}
<div class="callbar">${ic('calls')}<div class="tx"><b>${t('gCall')}</b><span>${t('gCallS')}</span></div><span class="btn primary">${t('join')}</span></div>
${composer()}`;

// фон: вкладка «Чаты» (frames/*-home-menu.html); шапка как в s1-chats: только круглая кнопка нового чата справа, без «Изменить»
const homeList = (extra = '') => `<div class="head"><div class="bar end"><span class="cbtn" aria-label="${t('qNew')}">${ic('compose')}</span></div>
<h1 class="large">${t('chats')}</h1><div class="search">${ic('search')}<span>${t('search')}</span></div></div>
${extra}
<ul class="list">${HOME.map(r => r[L]).map(([av, i, n, tm, p, badge]) => `<li class="row"><span class="av av52" style="background:var(--${av})">${i}</span><div class="rb">
<div class="n"><b>${n}</b></div><div class="t">${tm}</div><div class="p">${p}</div><div class="x">${badge ? `<span class="badge">${badge}</span>` : ''}</div></div></li>`).join('')}</ul>
${tabs('chats', { badge: '3' })}`;

// ---------- оверлеи ----------
const scrim = (dim) => `<div class="scrim${dim ? ' dim' : ''}"></div>`;
const dialog = (title, text, tbd, btns) => `${scrim(true)}<div class="dlg-wrap"><div class="dlg" role="alertdialog" aria-label="${title}"><div class="dlg-body"><h2>${title}</h2><p>${text}</p>${tbd ? `<span class="tbd">${tbd}</span>` : ''}<i class="sbar"></i></div>
<div class="dlg-btns">${btns.map(([cls, tx]) => `<span class="fbtn ${cls}">${tx}</span>`).join('')}</div></div></div>`;
const sheet = ({ cls = '', left = '', title = '', right = '', body, foot = '', scroll }) => `${scrim(true)}<section class="sheet ${cls}" role="dialog" aria-label="${title}"><i class="grab"></i>
<div class="sh-bar">${left || '<span></span>'}${title ? `<b class="st">${title}</b>` : ''}${right || '<span></span>'}</div>
<div class="sh-body"${scroll ? ` data-scroll="${scroll}"` : ''}>${body}</div>${foot ? `<div class="sh-foot">${foot}</div>` : ''}</section>`;
const closeBtn = (k = 'cancel') => `<span class="cbtn" aria-label="${t(k)}">${ic('x')}</span>`;

const trSheet = (on) => sheet({
  title: t('trT'), left: closeBtn('close'), right: `<span class="pbtn acc">${t('done')}</span>`,
  body: `<p class="sh-lead">${t('trP')}</p>
<div class="cells"><div class="cell sw"><div class="tx">${t('trSw')}<small>${t(on ? 'trOn' : 'offP')}</small></div><i class="switch${on ? ' on' : ''}"></i></div></div>
<div class="cells" style="margin-top:16px"><div class="cell link"><div class="tx">${t('trGen')}</div>${ic('chev', 'chev')}</div></div>`,
});

const report = (illegal) => {
  const opts = T.rOpts[L].map((o, i) => `<div class="cell"><div class="tx">${o}</div><i class="radio${illegal && i === 5 ? ' on' : ''}"></i></div>`).join('');
  const set = T.rSet[L].map(([w, s], i) => `<div class="cell${i === 1 ? ' hl' : ''}"><div class="tx"><span class="who">${w}</span>${s}</div>${i === 1 ? '' : `<span class="rm" aria-label="${t('rRm')}">${ic('minus')}</span>`}</div>`).join('');
  const chk = (txt, on) => `<div class="cell top"><i class="chk${on ? ' on' : ''}">${on ? ic('check') : ''}</i><div class="tx">${txt}</div></div>`;
  return sheet({
    cls: 'detent-l', title: '', left: `<span class="pbtn">${t('cancel')}</span>`, scroll: illegal ? 'end' : '',
    body: `<h1 class="sh-h1">${t('rT')}</h1>
<div class="sh-sec">${t('rWhat')}</div><div class="cells">${opts}</div>
<div class="flbl">${t('rTell')}</div><div class="tarea"></div>
<div class="sh-sec">${t('rSee')}</div><p class="sh-p">${t('rSeeP')}</p>
<div class="cells rep">${set}</div>
<p class="sh-p mut" style="margin-top:12px">${t('rStore')}</p>
<p class="sh-p"><span class="tbd blk">${t('rTbdLong')}</span><span class="tbd blk">${t('rTbdBtn')}</span></p>
<div class="cells">${chk(t('rAllow'), false)}</div>
<div class="sh-sec">${t('rNext')}</div><p class="sh-p">${t('rNextP')}</p>
<p class="sh-p mut" style="font-size:var(--foot);line-height:1.4">${t('rOp')}</p>
<div class="cells" style="margin-top:12px">${illegal ? chk(t('rFaith'), true) : ''}${chk(t('rBlock'), false)}</div>`,
    foot: `<span class="fbtn primary">${t('rSend')}</span><span class="fbtn">${t('rSendOnly')}</span>`,
  });
};

const ctxMenu = (items) => `<div class="ctx-menu" role="menu">${items.map(([k, icn, danger]) => `<div class="it${danger ? ' danger' : ''}"><span>${t(k)}</span>${ic(icn)}</div>`).join('')}</div>`;

// фото (плоские иллюстрации, без градиентов)
const CAFE = `<svg viewBox="0 0 440 343" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="440" height="343" fill="#3A2A22"/><rect y="250" width="440" height="93" fill="#5A3B2A"/>
<path d="M140 250V110a80 80 0 01160 0v140z" fill="#E59A5B"/><path d="M220 30v220M140 160h160" stroke="#3A2A22" stroke-width="8"/><circle cx="262" cy="98" r="18" fill="#F7D9A8"/>
<path d="M92 0v58" stroke="#8A7A6A" stroke-width="3"/><path d="M70 74a22 18 0 0144 0z" fill="#F2B84B"/>
<ellipse cx="225" cy="262" rx="58" ry="10" fill="#E6E1DA"/><path d="M190 222h64v20a32 22 0 01-64 0z" fill="#F4F1EC"/><path d="M254 228a12 10 0 010 20" fill="none" stroke="#F4F1EC" stroke-width="6"/>
<rect x="336" y="208" width="34" height="42" fill="#B5652E"/><circle cx="342" cy="190" r="17" fill="#2F9A6A"/><circle cx="366" cy="186" r="15" fill="#2F9A6A"/><circle cx="354" cy="172" r="14" fill="#3DB07D"/></svg>`;
const CITY = (k = 0) => `<svg viewBox="0 0 420 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="420" height="520" fill="${['#3B4A86', '#5A3E70', '#2E5E6E'][k]}"/><circle cx="310" cy="120" r="44" fill="#F3D9A0"/>
<rect x="30" y="230" width="90" height="290" fill="#2A2F4A"/><rect x="130" y="170" width="80" height="350" fill="#232842"/><rect x="220" y="260" width="110" height="260" fill="#2A2F4A"/><rect x="340" y="210" width="70" height="310" fill="#20253D"/>
${[[50, 260], [80, 300], [150, 200], [180, 250], [160, 330], [240, 290], [290, 330], [355, 250], [380, 320], [60, 380]].map(([x, y]) => `<rect x="${x}" y="${y}" width="14" height="18" fill="#F2C46B"/>`).join('')}</svg>`;

// ---------- экраны ----------
const S = {};
S['chat-tr-sheet'] = { old: 'chat-tr-sheet', ttl: 'Лист «Перевод в этом чате» (вкл.)', html: () => marcoChat() + trSheet(true) };
S['chat-tr-sheet-off'] = { old: 'chat-tr-sheet-off', ttl: 'Лист «Перевод в этом чате» (выкл.)', html: () => marcoChat({ off: true }) + trSheet(false) };
S['chat-tr-sheet-group'] = { old: 'chat-tr-sheet-group', ttl: 'Лист перевода в группе', html: () => groupChat() + trSheet(true) };
S['chat-photo-sheet'] = {
  old: 'chat-photo-sheet', ttl: 'Лист «Отправить фото»', html: () => marcoChat() + sheet({
    title: t('phT'), left: closeBtn(),
    body: `<div class="tiles"><span class="tile">${ic('photo')}${t('phPhoto')}</span><span class="tile">${ic('camera')}${t('phCam')}</span><span class="tile">${ic('place')}${t('phLoc')}</span></div>
<p class="lim">${t('phLim')}<br><span class="tbd">${t('tbd')}</span></p>`,
    foot: `<span class="fbtn">${t('cancel')}</span>`,
  }),
};
S['report-message'] = { old: 'report-message', ttl: 'Жалоба на сообщение (лист)', html: () => marcoChat() + report(false) };
S['report-message-illegal'] = { old: 'report-message-illegal', ttl: 'Жалоба: «Что-то незаконное» (прокручено вниз)', html: () => marcoChat() + report(true) };
S['report-sent'] = {
  old: 'report-sent', ttl: 'Жалоба получена', html: () => marcoChat() + sheet({
    left: closeBtn('close'),
    body: `<div class="center"><div class="okmark">${ic('check')}</div><h1 class="sh-h1">${t('rOkT')}</h1><p class="sh-lead">${t('rOkP')}</p><span class="tbd">${t('lawyer')}</span></div>`,
    foot: `<span class="fbtn primary">${t('ok')}</span>`,
  }),
};
S['ctx-chat'] = {
  old: 'ctx-chat', ttl: 'Контекстное меню чата (долгое нажатие на строку)', html: () => homeList() + `<div class="ctx-blur"></div><div class="ctx">
<div class="chatpv"><div class="pv-nav"><span class="av av36" style="background:var(--av-2)">M</span><b>Marco</b></div><div class="msgs">${marcoMsgs()}</div></div>
${ctxMenu([['call', 'calls'], ['findIn', 'search'], ['block', 'block', 1]])}</div>`,
};
S['ctx-message'] = {
  old: 'ctx-message', ttl: 'Контекстное меню сообщения', html: () => marcoChat() + `<div class="ctx-blur"></div><div class="ctx"><div class="pv grp in">${bubble({ text: t('m1'), time: '09:12', tr: 'show', tail: true })}</div>
${ctxMenu([['showO', 'tr'], ['rT', 'flag', 1]])}</div>`,
};
S['chat-delete-alert'] = { old: 'chat-delete-alert', ttl: 'Диалог «Удалить чат?»', html: () => marcoChat() + dialog(t('delT'), t('delP'), '', [['danger', t('delB')], ['', t('cancel')]]) };
S['limit-err-parrlo'] = { old: 'limit-err-parrlo', ttl: 'Лимит Parrlo на сегодня', html: () => groupChat() + dialog(t('limPT'), t('limDay'), t('tbd'), [['primary', t('plan')], ['', t('gotIt')]]) };
S['limit-err-call'] = { old: 'limit-err-call', ttl: 'Лимит звонков на сегодня', html: () => marcoChat({ call: true }) + dialog(t('limCT'), t('limDay'), t('tbd'), [['primary', t('plan')], ['', t('gotIt')]]) };
S['limit-err-week'] = { old: 'limit-err-week', ttl: 'Недельный лимит Parrlo', html: () => groupChat() + dialog(t('limWT'), t('limWeek'), t('tbd'), [['primary', t('plan')], ['', t('gotIt')]]) };
const failed = (hint, acts) => `<div class="grp out"><div class="fail">${bubble({ text: t('m5'), time: '09:33', own: true, tail: true, noTick: true })}<span class="bang" aria-label="${t('notSent')}">!</span></div>
<div class="failrow"><span class="st">${t('notSent')}</span>${acts.map(k => `<a>${t(k)}</a>`).join('')}</div>
<p class="failhint">${t(hint)} <span class="tbd">${t('tbd')}</span></p></div>`;
S['err-send'] = { old: 'err-send', ttl: 'Сообщение не отправлено', html: () => marcoChat({ m3closed: true, after: failed('hSend', ['retry', 'del']) }) };
S['err-reject-blocked'] = { old: 'err-reject-blocked', ttl: 'Сообщение не доставлено', html: () => marcoChat({ m3closed: true, after: failed('hBlocked', ['retry', 'del']) }) };
S['err-reject-toolong'] = { old: 'err-reject-toolong', ttl: 'Сообщение слишком длинное', html: () => marcoChat({ m3closed: true, after: failed('hLong', ['edit', 'retry', 'del']) }) };
S['msg-unsupported'] = {
  old: 'msg-unsupported', ttl: 'Неподдерживаемое сообщение', html: () => marcoChat({
    m3closed: true, after: group(false, [{ text: t('unsup').split(/(?<=\.) /).map(x => `<span class="sn">${x}</span>`).join(' '), tcls: 'unsup', cls: 'wide', time: '09:34', extra: `<span class="btn inb">${t('upd')}</span>` }]),
  }),
};
S['err-offline-banner'] = {
  old: 'err-offline-banner', ttl: 'Баннер «Нет сети» в «Чатах»', cls: 'has-tabs',
  html: () => homeList(`<div class="banner" role="status">${ic('nowifi')}<div><b>${t('offT')}</b><p>${t('offB')}</p><span class="tbd blk">${t('tbd')}</span></div></div>`),
};
S['home-menu'] = {
  old: 'home-menu', ttl: 'Меню «Быстрые действия» (кнопка нового чата)', cls: 'has-tabs',
  html: () => homeList() + `${scrim()}<div class="menu anchor left-ic" role="menu"><div class="hd">${t('quick')}</div>
<div class="it"><span>${t('qNew')}</span>${ic('compose')}</div><div class="it"><span>${t('call')}</span>${ic('calls')}</div>
<div class="it"><span>${t('qDict')}</span>${ic('mic')}</div><div class="it"><span>${t('qInv')}</span>${ic('link')}</div></div>`,
};
const parrloScreen = (edit) => {
  const card = `<div class="h">${t(edit ? 'dHe' : 'dH')}</div>
<div class="to"><span class="av" style="background:var(--av-0)">${t('petyaI')}</span><div><span class="lb">${t('to')}</span><b>${t('petya')}</b></div></div>
<div class="txt${edit ? ' edit' : ''}">${t('dTxt')}</div>
${edit ? '' : `<div class="stl"><i></i><span>${t('dSt')}</span></div>`}<div class="s">${t(edit ? 'dSe' : 'dS')}</div>
<div class="acts">${edit ? `<span class="btn primary">${t('done')}</span><span class="btn text">${t('cancel')}</span>`
    : `<span class="btn primary">${t('send')}</span><span class="btn">${t('edit')}</span><span class="btn text">${t('cancel')}</span>`}</div>`;
  return `<div class="msgs"><div class="chip">${t('today')}</div>
${group(true, [{ text: t('dAsk'), time: '10:02' }])}
<div class="grp in"><div class="b tail in-t draft">${card}</div></div></div>
${navChat({ title: 'Parrlo', sub: t('pSub'), av: `<span class="av av36 av-p">${parrot()}</span>` })}
${composer(t('pComp'), 'on-tabs')}${tabs('parrlo')}`;
};
S['draft'] = { old: 'draft', ttl: 'Черновик Parrlo — ждёт подтверждения', cls: 'has-tabs', html: () => parrloScreen(false) };
S['draft-edit'] = { old: 'draft-edit', ttl: 'Черновик Parrlo — правка', cls: 'has-tabs', html: () => parrloScreen(true) };
S['chat-photo-viewer'] = {
  old: 'chat-photo-viewer', ttl: 'Просмотр фото', cls: 'black', html: () => `<div class="pv-top"><div class="bar"><span class="cbtn" aria-label="${t('close')}">${ic('x')}</span><div class="who"><b>Marco</b><span>${t('phWhen')}</span></div></div></div>
<div class="photo">${CAFE}</div>
<div class="hint"><div>${ic('down')}${t('swipe')}</div><div>${ic('pinch')}${t('pinch')}</div><span class="tbd" style="margin-top:4px">${t('tbd')}</span></div>
<div class="capt">${trc(false).replace(/ · <a>.*?<\/a>/, '')}<p>${t('capT')}</p><span class="lbo">${t('orig')}</span><p class="o">${t('capO')}</p></div>
<nav class="pv-bot"><a>${ic('save')}${t('save')}</a><a>${ic('share')}${t('share')}</a><a class="danger">${ic('flag')}${t('repPh')}</a></nav>`,
};
S['chat-photo-preview'] = {
  old: 'chat-photo-preview', ttl: 'Предпросмотр 3 фото перед отправкой', cls: 'black', html: () => `<div class="pv-top"><div class="bar"><span class="cbtn" aria-label="${t('cancel')}">${ic('x')}</span><div class="ttl">${t('three')}</div><span class="cbtn" aria-label="${t('rmPh')}">${ic('trash')}</span></div></div>
<div class="pp-img">${CITY(0)}</div>
<div class="thumbs"><span class="add" aria-label="${t('addPh')}">${ic('plus')}</span>${[0, 1, 2].map(k => `<span class="th${k === 0 ? ' on' : ''}">${CITY(k)}<i class="n">${k + 1}</i></span>`).join('')}</div>
<div class="pp-comp"><div class="field wrap"><span>${t('capPh')}</span></div><span class="send" aria-label="${t('send')}">${ic('up')}<b class="badge">3</b></span></div>`,
};

// ---------- страница ----------
const SCRIPT = `<script>(function(){var q=new URLSearchParams(location.search),h=document.documentElement;h.dataset.d=q.get('d')||'max';h.dataset.t=q.get('t')||'n';
var l=q.get('l');h.dataset.l=(l==='es'||l==='en')?l:'ru';h.lang=h.dataset.l;})()</script>`;
// После загрузки шрифтов: (1) wordfit — если слово не помещается в блок, шрифт блока ×0.92, но не меньше 28 (только AX5);
// (2) диалог: если текст не помещается, кнопки остаются внизу, текст прокручивается, виден индикатор;
// (3) прокрутка листа к концу (data-scroll=end).
const RUN = `<script>document.fonts.ready.then(function(){
var scr=document.querySelector('.screen[data-l="'+document.documentElement.dataset.l+'"]');
// порядок: раскладка → unglue (tools/unglue.js) → WordFit (только одиночные слова, которые не помещаются после unglue)
if(window.unglue)window.unglue();
if(document.documentElement.dataset.t==='ax5'){
 var tmp=document.createElement('style');tmp.textContent='.b::after{display:none!important}';document.head.appendChild(tmp);
 var els=[].slice.call(scr.querySelectorAll('*')).filter(function(e){return [].some.call(e.childNodes,function(n){return n.nodeType===3&&n.textContent.trim()})});
 // уменьшаем только тот элемент, чей собственный текст выходит за правый край строки блока
 var rg=document.createRange();
 function over(e,b){var bs=getComputedStyle(b),br=b.getBoundingClientRect(),right=br.left+b.clientLeft+b.clientWidth-parseFloat(bs.paddingRight)+0.5,left=br.left+b.clientLeft+parseFloat(bs.paddingLeft)-0.5;
  return [].some.call(e.childNodes,function(n){if(n.nodeType!==3||!n.textContent.trim())return false;rg.selectNodeContents(n);
   return [].some.call(rg.getClientRects(),function(r){return r.width&&(r.right>right||r.left<left)})})}
 els.forEach(function(e){var b=e;while(b&&getComputedStyle(b).display.indexOf('inline')===0)b=b.parentElement;var k=0;
  while(over(e,b)&&k<12){var fs=parseFloat(getComputedStyle(e).fontSize);if(fs*0.92<28)break;e.style.fontSize=(fs*0.92)+'px';e.style.lineHeight='1.2';if(b!==e)b.style.lineHeight=(fs*0.92*1.2)+'px';k++}});
 tmp.remove();
}
scr.querySelectorAll('[data-scroll="end"]').forEach(function(e){e.scrollTop=e.scrollHeight});
scr.querySelectorAll('.dlg').forEach(function(d){var b=d.querySelector('.dlg-body');if(b.scrollHeight>b.clientHeight+1){d.classList.add('scrolls');
 var s=d.querySelector('.sbar'),r=b.clientHeight/b.scrollHeight;s.style.height=Math.max(36,b.clientHeight*r)+'px';s.style.top=(b.scrollTop+6)+'px'}});
document.body.dataset.ready='1'})</script>`;
const page = (key, s) => `<!doctype html>
<html lang="ru" data-d="max" data-t="n" data-l="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${s.ttl}</title><link rel="stylesheet" href="../rd.css"><link rel="stylesheet" href="sheets.css">
${SCRIPT}
<script src="../tools/unglue.js"></script>
</head><body>
${LANGS.map((lg, i) => { L = i; return `<main class="screen ${s.cls || ''}" data-l="${lg}" lang="${lg}">\n${statusBar()}\n${s.html()}\n<i class="home-ind"></i>\n</main>`; }).join('\n')}
${RUN}
</body></html>
`;

// NBSP после коротких слов (redesign-ios/tools/nbsp.js); язык — lang у <main> каждого экрана и у иноязычных фрагментов
const { glueHtml } = require('../../tools/nbsp.js');
for (const [k, s] of Object.entries(S)) fs.writeFileSync(path.join(OUT, k + '.html'), glueHtml(page(k, s), 'ru'));
// список экранов для render.js и index.html
fs.writeFileSync(path.join(OUT, 'tools', 'screens.json'), JSON.stringify(Object.entries(S).map(([k, s]) => ({ k, old: s.old, ttl: s.ttl })), null, 1));
const idx = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>Листы, диалоги, ошибки — обзор</title>
<style>@font-face{font-family:Inter;font-weight:100 900;src:url(../../fonts/Inter-Variable.woff2) format("woff2")}
body{margin:0;background:#12161C;color:#E8ECF1;font-family:-apple-system,"SF Pro Text",Inter,system-ui,sans-serif;padding:40px 40px 60px;width:${6 * 244 + 5 * 20}px}
h1{font-size:28px;font-weight:600;margin:0 0 6px}p.l{color:#9AA4B2;margin:0 0 28px;font-size:15px}
.g{display:grid;grid-template-columns:repeat(6,244px);gap:28px 20px}
figure{margin:0}figure img{display:block;width:244px;border-radius:16px;border:1px solid rgba(255,255,255,.14)}
figcaption{font-size:13px;color:#9AA4B2;margin-top:8px;line-height:1.35}figcaption b{color:#E8ECF1;font-weight:600;display:block}</style></head><body>
<h1>Parrlo Chat — редизайн iOS · листы, диалоги, меню, ошибки</h1><p class="l">Pro Max 440×956 · обычный текст · ru · тёмная тема. Все кадры: png/&lt;экран&gt;__&lt;se|max&gt;-&lt;n|ax5&gt;-&lt;ru|es|en&gt;.png</p>
<div class="g">${Object.entries(S).map(([k, s]) => `<figure><img src="png/${k}__max-n-ru.png" alt=""><figcaption><b>${k}</b>${s.ttl}</figcaption></figure>`).join('')}</div></body></html>`;
fs.writeFileSync(path.join(OUT, 'index.html'), idx);
console.log('страниц:', Object.keys(S).length);
