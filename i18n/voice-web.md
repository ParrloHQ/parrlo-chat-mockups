# Голосовое сообщение в веб-версии (группа voice-web, 18.11)

Только тёмная тема. Кадры: `web-voice-idle`, `web-voice-recording`, `web-voice-recording-limit`, `web-voice-cancel`, `web-voice-mic-denied`, `web-voice-sent` × ru/es/en × w360, w390, d14. Генератор: `gen-voice-web.py` (scratchpad).

Предел записи в вебе — около 70 с (голосовое внутри сообщения, лимит 384 КБ). Число предела в интерфейсе не показываем: с 0:58 появляется «Осталось N с» (N — остаток), полоска предела утолщается и становится штрихованной, таймер — в рамке. Все формулировки **не утверждены**.

| Где | ключ | RU | ES | EN | Кадр |
|---|---|---|---|---|---|
| Кнопка микрофона (aria-label) | `voice.mic` | Записать голосовое | Grabar mensaje de voz | Record voice message | `web-voice-idle` |
| Подсказка при наведении / первом показе | `voice.tip` | Нажми — запись, ещё раз — отправить. Или удерживай. | Pulsa para grabar y otra vez para enviar. O mantén pulsado. | Press to record, press again to send. Or hold. | `web-voice-idle` |
| Метка записи (не только цвет) | `voice.rec` | Запись | Grabando | Recording | `web-voice-recording` |
| Отменить запись (aria-label, корзина) | `voice.cancel` | Отменить запись | Cancelar grabación | Cancel recording | `web-voice-recording` |
| Отправить (aria-label) | `voice.send` | Отправить | Enviar | Send | `web-voice-recording` |
| Подсказка при удержании | `voice.hold_hint` | Отпусти — отправим, уведи в сторону — отменим | Suelta para enviar, desliza a un lado para cancelar | Release to send, slide away to cancel | `web-voice-recording` |
| Осталось до предела (с 0:58; число = остаток в секундах) | `voice.left_seconds` | Осталось 10&nbsp;с | Quedan 10&nbsp;s | 10&nbsp;s left | `web-voice-recording-limit` |
| Тост: запись удалена | `voice.deleted` | Запись удалена | Grabación eliminada | Recording deleted | `web-voice-cancel` |
| Тост: вернуть (5 с) | `voice.undo` | Вернуть | Recuperar | Undo | `web-voice-cancel` |
| Тост: для экранного диктора | `voice.undo_sr` | Можно вернуть в течение 5 секунд | Puedes recuperarla durante 5 segundos | You can undo for 5 seconds | `web-voice-cancel` |
| Нет микрофона: заголовок | `voice.mic_denied.title` | Нет доступа к микрофону | Sin acceso al micrófono | No access to the microphone | `web-voice-mic-denied` |
| Нет микрофона: текст | `voice.mic_denied.body` | Браузер не разрешил Parrlo&nbsp;Chat использовать микрофон, поэтому записать голосовое не получится. | El navegador no ha permitido que Parrlo&nbsp;Chat use el micrófono, así que no puedes grabar mensajes de voz. | Your browser didn’t let Parrlo&nbsp;Chat use the microphone, so you can’t record a voice message. | `web-voice-mic-denied` |
| Нет микрофона: как разрешить | `voice.mic_denied.how` | Разреши микрофон в настройках сайта в браузере и попробуй ещё&nbsp;раз. | Permite el micrófono en los ajustes del sitio del navegador y vuelve a intentarlo. | Allow the microphone in your browser’s site settings and try again. | `web-voice-mic-denied` |
| Нет микрофона: кнопка | `voice.mic_denied.ok` | Понятно | Entendido | Got it | `web-voice-mic-denied` |
| Плеер: воспроизвести (aria-label, %@ = длительность) | `voice.play` | Воспроизвести голосовое, 0:12 | Reproducir mensaje de voz, 0:12 | Play voice message, 0:12 | `web-voice-sent` |
| Плеер: подпись расшифровки | `voice.transcript` | Расшифровка | Transcripción | Transcript | `web-voice-sent` |
| Плеер: подпись перевода (%1$@ = имя, %2$@ = язык) | `voice.translation_for` | Перевод для Marco · испанский | Traducción para Marco · ruso | Translation for Marco · Spanish | `web-voice-sent` |
| Под сообщением | `voice.peer_reads` | Marco прочтёт перевод на испанском | Marco leerá la traducción en ruso | Marco will read the translation in Spanish | `web-voice-sent` |

Склонения: «Осталось N с» — сокращение «с» не склоняется (ru); es «Quedan N s» для N=1 → «Queda 1 s»; en «N s left» без изменения.
Примеры текста голосового (`web-voice-sent`) — демо-данные, не строки интерфейса.
