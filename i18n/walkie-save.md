# «Рация»: «Сохранить собеседника?» — строки (handoff-v2, iOS)

Экран: `walkie-save` — `frames/{ru,es,en}-walkie-save.html`, кадры `se-n`, `se-xl`, `pro-n`, `pro-xl`, только тёмная тема. PNG @2×: `png/{ru,es,en}/walkie-save/{se-n,se-xl,pro-n,pro-xl}.png`.
Это кадр 02 после разговора по QR, перенесённый в лист «Рация» (`.sheet`, large detent): сверху полоса ultraThinMaterial с граббером и «Закрыть» справа, под ней шапка разговора (аватар, пилюля языков, QR), лента с репликой собеседника, плашка «Сохранить собеседника?», ряд микрофонов. Нижнего таб-бара «Разговор | Чаты» больше нет. Позади листа видна затемнённая карточка экрана «Настройки».

Строки плашки и «Закрыть» взяты из кода, менять их нельзя. Неразрывные пробелы (U+00A0) уже стоят в коде:
- ru: «должен согласиться», «Не нужно»;
- es: «el contacto», «La conversación», «el inicio del chat», «Tu interlocutor», «debe aceptar» (все пробелы внутри каждой фразы).

| ключ | RU | ES | EN | примечание |
|---|---|---|---|---|
| `walkie.sheet.close` | Закрыть | Cerrar | Close | справа в полосе ultraThinMaterial; закрывает лист. Строка из кода |
| `walkie.save.title` | Сохранить собеседника? | ¿Guardar el contacto? | Save this contact? | заголовок плашки, 19/800. Строка из кода |
| `walkie.save.text` | Разговор станет началом чата. Собеседник тоже должен согласиться. | La conversación será el inicio del chat. Tu interlocutor también debe aceptar. | The conversation becomes the start of a chat. Your partner must agree too. | текст плашки. Строка из кода |
| `walkie.save.no` | Не нужно | No, gracias | No thanks | тёмная кнопка: `rgba(255,255,255,.08)` на карточке win, белый текст. Строка из кода |
| `walkie.save.yes` | Сохранить | Guardar | Save | основная кнопка: заливка acc `#2BC48A`, тёмный текст `#0E1116` (решение 18.11). Строка из кода |

## Цвета (брендбук v2.3, Fi.C, тёмная тема)

Кадры перекрашены токенами из приложения, заданы в кадре с префиксом `--ws-`: фон bg `#0E1116`, акцент acc `#2BC48A`; моя сторона — bubMe `rgba(43,196,138,.16)` / onBubMe `#FFFFFF`, btnMe `#2BC48A` / onBtnMe `#0E1116`, ringMe `#2BC48A`; сторона собеседника — bubThem `rgba(255,255,255,.08)` / onBubThem `#FFFFFF`, btnThemSurface `#0A3B30` / onBtnThemSurface `#9CE6C6`, в записи btnThemSurfaceRec `#7FD9B4`; карточка win `#1A1F27`, sec `#A1A7B0`, line `rgba(255,255,255,.09)`; chip `rgba(127,217,180,.16)` / chipInk `#7FD9B4` (аватар «M», точка собеседника в пилюле языков).

- **Решение 18.11: основная кнопка с тёмным текстом.** Белый текст на acc `#2BC48A` даёт контраст ≈2,2:1 и не проходит 4,5:1, поэтому «Сохранить» — заливка acc, текст `#0E1116` (8,4:1).

## Демо-содержимое кадров (не строки интерфейса)

| | RU-кадр | ES-кадр | EN-кадр |
|---|---|---|---|
| язык собеседника | испанский | русский | испанский |
| пилюля языков (я ⇄ собеседник) | RU ⇄ ES | ES ⇄ RU | EN ⇄ ES |
| реплика собеседника, 12:31 | Добрый день! Завтра в 10 приду посмотреть кран. | ¡Buenos días! Mañana a las 10 vengo a ver el grifo. | Good afternoon! I’ll come by tomorrow at 10 to look at the tap. |
| мой микрофон (btnMe) | [RU] Я | [ES] Yo | [EN] Me |
| микрофон собеседника (btnThemSurface) | [ES] Hablar | [RU] Говорить | [ES] Hablar |

Подпись на микрофоне собеседника написана на его языке. В ru взята из старого кадра 02. Варианты для es/en («Yo», «Me», «Говорить») мы перевели сами, они **не утверждены**.

## Подписи для VoiceOver (не утверждено)

| ключ | RU | ES | EN |
|---|---|---|---|
| `walkie.sheet.a11y` | Рация | Walkie-talkie | Walkie-talkie |
| `walkie.head.profile` | Профиль | Perfil | Profile |
| `walkie.head.pair` | Языки: русский и испанский | Idiomas: español y ruso | Languages: English and Spanish |
| `walkie.head.qr` | Показать QR-код | Mostrar código QR | Show QR code |
| `walkie.mic.keyboard` | Клавиатура | Teclado | Keyboard |
| `walkie.mic.me` | Говорить: я, по‑русски | Hablar: yo, en español | Speak: me, in English |
| `walkie.mic.partner` | Говорит собеседник, по‑испански | Habla tu interlocutor, en ruso | Your partner speaks, in Spanish |

## Не утверждено

- Значок 🎤 заменён на линейную иконку микрофона, как у кнопки диктовки в `pc-composer`. Иконка клавиатуры и иконка «⇄» в пилюле нарисованы в том же стиле.
- Позади листа нарисован экран «Настройки». Мы так поняли описание: «затемнённая карточка экрана позади, Настройки». Если лист открывается с другого экрана, меняется только фон.
- Пилюля языков в кадре не нажимается. Можно ли ею менять языки, в описании не сказано.
- Значок «Памяти» в фоновых «Настройках» заменён закладкой: значок «искр» запрещён.
