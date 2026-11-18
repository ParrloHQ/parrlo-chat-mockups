# Голосовое сообщение в веб-версии (группа voice-web, схема от 18.11)

Только тёмная тема. Кадры: `web-voice-idle`, `web-voice-recording`, `web-voice-recording-limit`, `web-voice-preview`, `web-voice-sent`, `web-voice-received`, `web-voice-cancel`, `web-voice-mic-denied` × ru/es/en × w360, w390, d14. Генератор: `gen-voice-web.py` (scratchpad).

**Схема.** Голосовое — это не аудиофайл. Речь распознаётся в текст и переводится. У отправителя в ленте его распознанный текст и перевод для собеседника. У получателя перевод озвучивает синтез (голос браузера), поэтому в пузыре есть плашка «ИИ-голос». Длительность у получателя не показываем, потому что в вебе звук синтезирует браузер и длину заранее не знаем. Остаётся только волна.

**Панель голоса.** Слева «Клавиатура», справа «Добавить фото», посередине большая кнопка «Говорить» с плашкой языка речи (RU / ES / EN). Во время записи на её месте «■ Готово» со светящимся контуром. Над панелью строка состояния: «Запись», таймер, волна, «Отменить». Боковые кнопки на время записи выключены. Предел записи такой же, как у «Продиктовать». Число предела в интерфейсе не пишем: за 10 с до конца вместо таймера появляется «Осталось N с» в жёлтой рамке.

**Сначала показать** (`web-voice-preview`). Если режим включён, после «Готово» над панелью появляется карточка. Сверху «Сначала показать» и выбор стиля перевода, ниже крупно перевод на языке собеседника. Спорное место подчёркнуто пунктиром, это кнопка. Ниже подсказка, «Исправить» и «Отправить».

Все формулировки **не утверждены**. Строки «Клавиатура», «Сначала показать», «ИИ-голос», «Оригинал» и их es/en взяты из `es-266.tsv` (строки iOS). В вебе «Сначала показать» по‑английски «Review first», по‑испански «Revisar antes».

| Где | ключ | RU | ES | EN | Кадр |
|---|---|---|---|---|---|
| Кнопка клавиатуры (aria-label): вернуться к вводу текста | `voice.keyboard` | Клавиатура | Teclado | Keyboard | все |
| Кнопка фото (aria-label), общий ключ с группой photos | `composer.attach.a11y` | Добавить фото | Añadir foto | Add photo | все |
| Большая кнопка: начать запись | `voice.speak` | Говорить | Hablar | Speak | `web-voice-idle` |
| Плашка языка речи (визуально, код языка) | `voice.lang_badge` | RU | ES | EN | `web-voice-idle` |
| Плашка языка для экранного диктора (`%@` = язык) | `voice.lang_badge.a11y` | , русский | , español | , English | `web-voice-idle` |
| Большая кнопка во время записи | `voice.done` | Готово | Listo | Done | `web-voice-recording` |
| Метка записи (не только цвет) | `voice.rec` | Запись | Grabando | Recording | `web-voice-recording` |
| Отменить запись (видимый текст) | `voice.cancel` | Отменить | Cancelar | Cancel | `web-voice-recording` |
| Отменить запись (aria-label) | `voice.cancel.a11y` | Отменить запись | Cancelar grabación | Cancel recording | `web-voice-recording` |
| Осталось до предела (за 10 с до конца; число = остаток в секундах) | `voice.left_seconds` | Осталось 10&nbsp;с | Quedan 10&nbsp;s | 10&nbsp;s left | `web-voice-recording-limit` |
| Карточка перевода: режим | `voice.preview.mode` | Сначала показать | Revisar antes | Review first | `web-voice-preview` |
| Карточка: стиль перевода (кнопка, открывает список) | `voice.preview.style.literary` | Литературно | Literario | Literary | `web-voice-preview` |
| Карточка: стиль перевода (aria-label, `%@` = стиль) | `voice.preview.style.a11y` | Стиль перевода: Литературно | Estilo de traducción: Literario | Translation style: Literary | `web-voice-preview` |
| Карточка: имя области (aria-label) | `voice.translation_for` | Перевод для Marco · испанский | Traducción para Marco · ruso | Translation for Marco · Spanish | `web-voice-preview`, `web-voice-sent` |
| Карточка: подсказка под переводом | `voice.preview.hint` | Нажми на подчёркнутое, чтобы исправить | Pulsa lo subrayado para corregirlo | Select the underlined part to fix it | `web-voice-preview` |
| Карточка: вторичная кнопка | `voice.preview.fix` | Исправить | Corregir | Fix | `web-voice-preview` |
| Карточка: основная кнопка | `voice.preview.send` | Отправить | Enviar | Send | `web-voice-preview` |
| Пузырь отправителя: пометка | `voice.label` | Голосовое | Mensaje de voz | Voice message | `web-voice-sent`, `web-voice-received` |
| Пузырь получателя: прослушать (aria-label, без длительности) | `voice.play` | Прослушать голосовое | Escuchar mensaje de voz | Play voice message | `web-voice-received` |
| Пузырь получателя: плашка синтеза | `voice.ai_voice` | ИИ-голос | Voz IA | AI voice | `web-voice-received` |
| Под пузырём получателя (общий ключ чата) | `chat.translated_from` | Переведено с испанского | Traducido del ruso | Translated from Spanish | `web-voice-received` |
| Под пузырём получателя: показать текст собеседника как есть | `voice.original` | Оригинал | Original | Original | `web-voice-received` |
| Тост: запись удалена | `voice.deleted` | Запись удалена | Grabación eliminada | Recording deleted | `web-voice-cancel` |
| Тост: вернуть (5 с) | `voice.undo` | Вернуть | Recuperar | Undo | `web-voice-cancel` |
| Тост: для экранного диктора | `voice.undo_sr` | Можно вернуть в течение 5 секунд | Puedes recuperarla durante 5 segundos | You can undo for 5 seconds | `web-voice-cancel` |
| Нет микрофона: заголовок | `voice.mic_denied.title` | Нет доступа к микрофону | Sin acceso al micrófono | No access to the microphone | `web-voice-mic-denied` |
| Нет микрофона: текст | `voice.mic_denied.body` | Браузер не разрешил Parrlo&nbsp;Chat использовать микрофон, поэтому записать голосовое не получится. | El navegador no ha permitido que Parrlo&nbsp;Chat use el micrófono, así que no puedes grabar mensajes de voz. | Your browser didn’t let Parrlo&nbsp;Chat use the microphone, so you can’t record a voice message. | `web-voice-mic-denied` |
| Нет микрофона: как разрешить | `voice.mic_denied.how` | Разреши микрофон в настройках сайта в браузере и попробуй ещё&nbsp;раз. | Permite el micrófono en los ajustes del sitio del navegador y vuelve a intentarlo. | Allow the microphone in your browser’s site settings and try again. | `web-voice-mic-denied` |
| Нет микрофона: кнопка | `voice.mic_denied.ok` | Понятно | Entendido | Got it | `web-voice-mic-denied` |

Склонения: «Осталось N с» — сокращение «с» не склоняется (ru); es «Quedan N s» для N=1 → «Queda 1 s»; en «N s left» без изменения.

**Демо-данные (не строки интерфейса).** ru-кадры: пользователь говорит по‑русски «Тогда жду вас завтра в десять. Спасибо!», Marco читает по‑испански «Entonces le espero mañana a las diez. ¡Gracias!», подчёркнуто «le espero» (вы / ты). es-кадры: пользователь говорит по‑испански, Marco читает по‑русски, подчёркнуто «жду вас». en-кадры: пользователь говорит по‑английски, Marco читает по‑испански. Ответ Marco в `web-voice-received`: «Perfecto, nos vemos mañana a las diez en la entrada.» и его перевод.

## Решено (менеджер мессенджера, 18.11)

- Длительность у получателя в вебе не показываем совсем — ни до, ни после прослушивания (иначе пузырь «прыгнет»).
- Подсказка в карточке предпросмотра для мыши — «Нажми на подчёркнутое, чтобы исправить».
- «Исправить» — правка текста в поле (как iOS 28). Повторной записи нет: перезаписать — через «Отменить» и новую запись.
- Плашка «RU» — не кнопка: показывает язык профиля; язык меняется в профиле.

## Не утверждено

- Все формулировки (плашки `pc-tbd` в кадрах стоят только в диалоге «Нет доступа к микрофону»).
- Подсказка в карточке: в iOS «Коснись подчёркнутого…». В вебе её заменили на «Нажми на подчёркнутое…», потому что на десктопе работают мышью. Нужно решить, нужна ли отдельная строка для телефонного веба.
- Длительность голосового у получателя не показываем (синтез браузера, длина заранее неизвестна). Не решено, показывать ли её после первого прослушивания.
- Какие ещё есть стили перевода, кроме «Литературно», и что в списке.
- Что делает «Исправить»: правка текста вручную или повторная запись. Что показывает нажатие на подчёркнутое: варианты или поле правки.
- Где включается «Сначала показать», и что происходит после «Готово» при выключенном режиме (сразу отправка — предположение).
- Плашка языка «RU»: только показывает язык речи или по нажатию его меняет. Сейчас это часть кнопки «Говорить», отдельно не нажимается.
- Как открыть панель голоса из обычного поля ввода (где кнопка, не путается ли с «Продиктовать»). В кадрах `sent` и `received` панель голоса в покое.
- Предел записи равен пределу «Продиктовать». Числа в интерфейсе нет, «Осталось N с» появляется за 10 с до конца.
- Боковые кнопки (клавиатура, фото) на время записи выключены — это предложение.
- Нужна ли живая расшифровка во время записи (в кадре её нет).
