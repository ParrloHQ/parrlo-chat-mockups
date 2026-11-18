# Перевод до отправки в веб-версии (группа web-translate-preview, handoff-v2)

Только тёмная тема. Кадры: `web-settings-chat`, `web-settings-chat-highlight`, `web-compose-preview-loading`, `web-compose-preview-error`, `web-compose-preview` (новые) и `web-voice-preview` (обновлён) × ru/es/en × w360, w390, d14. Генератор: `gen-web-translate-preview.py` (scratchpad). Сделано в вебе в chat-web #32, здесь кадры для handoff-v2.

**Схема.** Если в настройках включено «Показывать перевод перед отправкой», то после «Отправить» над полем ввода появляется карточка. Сверху подпись «Marco увидит на испанском», ниже перевод на языке собеседника, кнопки «Изменить» и «Отправить», под ними мелкая ссылка «Не показывать». Пока сервис переводит, в карточке подпись и «Переводим…» с мягкой анимацией точек (при «уменьшить движение» точки не анимируются). «Отправить» в это время неактивна, «Отмена» доступна. Если перевести не удалось, в карточке значок, «Не удалось перевести» и короткая причина без кода ошибки. Основная кнопка «Повторить», вторичная «Отправить без перевода» с пояснением «Marco получит текст по‑русски». Ошибку видно не только по цвету (`--err`): есть значок и текст.

**Подчёркиваний спорных слов нет**: сервис перевода их не отдаёт. Из `web-voice-preview` убраны пунктир под «le espero» и подсказка `voice.preview.hint` («Нажми на подчёркнутое, чтобы исправить»). Над переводом расшифровки добавлена подпись `chat.preview.recipient_sees`, под кнопками ссылка `chat.preview.dont_show`.

**«Не показывать»** ведёт в «Настройки» → раздел «Чат» (`web-settings-chat-highlight`). Страница прокручивается к строке, строка мягко подсвечивается фоном-акцентом и затухает примерно за 2 с, а фокус клавиатуры стоит на переключателе. На кадре показан момент подсветки. Переключатель остаётся включённым: выключает его сам человек. На десктопе в левом меню настроек появляется пункт «Чат».

Все формулировки **не утверждены**. ru на «ты», es на «tú», без рода пользователя. «Повторить» / «Reintentar» / «Try again» и «Отправить» / «Enviar» / «Send» взяты из уже существующих строк.

| Где | ключ | RU | ES | EN | Кадр |
|---|---|---|---|---|---|
| Карточка: имя области (aria-label) | `chat.preview.region.a11y` | Предпросмотр перевода | Vista previa de la traducción | Translation preview | все `web-compose-preview*` |
| Карточка: подпись над переводом (`%1$@` = имя, `%2$@` = язык; в ru язык в предложном падеже) | `chat.preview.recipient_sees` | Marco увидит на испанском | Marco lo verá en ruso | Marco will see it in Spanish | `web-compose-preview`, `-loading`, `web-voice-preview` |
| Карточка: основная кнопка | `chat.preview.send` | Отправить | Enviar | Send | `web-compose-preview`, `-loading` (неактивна) |
| Карточка: вторичная кнопка, вернуться к тексту | `chat.preview.edit` | Изменить | Editar | Edit | `web-compose-preview` |
| Карточка: ссылка под кнопками, ведёт в настройку | `chat.preview.dont_show` | Не показывать | No mostrar | Don’t show | `web-compose-preview`, `web-voice-preview` |
| Идёт перевод (role=status; точки только визуально) | `chat.preview.loading` | Переводим… | Traduciendo… | Translating… | `web-compose-preview-loading` |
| Идёт перевод: отменить отправку | `chat.preview.cancel` | Отмена | Cancelar | Cancel | `web-compose-preview-loading` |
| Ошибка: заголовок (role=alert) | `chat.preview.error.title` | Не удалось перевести | No se ha podido traducir | Couldn’t translate | `web-compose-preview-error` |
| Ошибка: причина, без кода | `chat.preview.error.unreachable` | Нет связи с сервисом перевода | No hay conexión con el servicio de traducción | Can’t reach the translation service | `web-compose-preview-error` |
| Ошибка: основная кнопка | `chat.preview.retry` | Повторить | Reintentar | Try again | `web-compose-preview-error` |
| Ошибка: вторичная кнопка | `chat.preview.send_untranslated` | Отправить без перевода | Enviar sin traducir | Send without translation | `web-compose-preview-error` |
| Ошибка: пояснение к вторичной кнопке (aria-describedby; `%1$@` = имя, `%2$@` = язык отправителя) | `chat.preview.send_untranslated.note` | Marco получит текст по‑русски | Marco recibirá el texto en español | Marco will get the text in English | `web-compose-preview-error` |
| Настройки: заголовок раздела и пункт левого меню (десктоп) | `settings.chat.section` | Чат | Chat | Chat | `web-settings-chat`, `-highlight` |
| Настройки: переключатель (role=switch, включён) | `settings.chat.preview.title` | Показывать перевод перед отправкой | Mostrar la traducción antes de enviar | Show translation before sending | `web-settings-chat`, `-highlight` |
| Настройки: пояснение под переключателем (aria-describedby) | `settings.chat.preview.desc` | Перед отправкой увидишь, что прочитает собеседник | Antes de enviar, verás lo que leerá la otra persona | Before sending, you’ll see what the other person will read | `web-settings-chat`, `-highlight` |

Пример текста в кадрах (не строки интерфейса): ru «Конечно, бери Джулию! Тогда нужно три билета.» → es «¡Claro, trae a Giulia! Entonces hacen falta tres entradas.»; в es-кадрах наоборот (Marco читает по‑русски); в en-кадрах «Sure, bring Giulia! Then we need three tickets.» → es.
