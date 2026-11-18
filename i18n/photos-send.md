# Фото в чате — строки группы `send`

Экраны: `chat-photo-sending`, `chat-photo-queued`, `chat-photo-err-size`, `chat-photo-err-format`, `chat-photo-err-net`, `chat-photo-expired`. Все строки — **не утверждены** (в кадрах помечены `pc-tbd`, кроме коротких кнопок). Неразрывные пробелы стоят в «10 МБ», «12 месяцев», «и HEIC», «ещё раз». Генератор: `gen-photos-send.py`.

| Ключ | ru | es | en | Где |
|---|---|---|---|---|
| `photo.send.progress` | Отправляем фото… | Enviando foto… | Sending photo… | Статус под пузырём во время загрузки |
| `photo.send.progress.a11y` | Отправка фото | Envío de la foto | Sending photo | Подпись кольца прогресса (role=progressbar) |
| `photo.send.cancel` | Отменить | Cancelar | Cancel | Отменить отправку / снять из очереди |
| `photo.queue.offline.title` | Нет сети | Sin conexión | No connection | Плашка над лентой: заголовок |
| `photo.queue.offline.body` | Сообщения и фото уйдут, когда появится подключение. | Los mensajes y las fotos se enviarán cuando vuelva la conexión. | Messages and photos will go out when you’re back online. | Плашка: текст (на xl скрыт) |
| `photo.queue.status` | Отправим, когда появится сеть | La enviaremos cuando haya conexión | We’ll send it when you’re back online | Статус фото в очереди, значок часов |
| `photo.err.size` | Фото больше 10 МБ | La foto pesa más de 10 MB | Photo is over 10 MB | Ошибка: файл больше 10 МБ |
| `photo.err.size.hint` | Можно отправить фото до 10 МБ. | Puedes enviar fotos de hasta 10 MB. | You can send photos up to 10 MB. | Пояснение под ошибкой размера |
| `photo.err.format` | Этот формат не поддерживается | Este formato no es compatible | This format isn’t supported | Ошибка: формат не поддерживается |
| `photo.err.format.hint` | iOS: Подойдут JPEG, PNG, WebP и HEIC. · Веб: Подойдут JPEG, PNG или WebP. | iOS: Puedes usar JPEG, PNG, WebP o HEIC. · Web: Puedes usar JPEG, PNG o WebP. | iOS: Use JPEG, PNG, WebP or HEIC. · Web: Use JPEG, PNG or WebP. | Сервер принимает JPEG, PNG, WebP; iOS сама переводит HEIC в JPEG, поэтому на iOS HEIC в списке; браузер HEIC не переводит — в вебе без HEIC (менеджер мессенджера, 18.11). GIF и SVG — нет. |
| `photo.err.format.file` | Файл menu.gif | Archivo menu.gif | File menu.gif | Заглушка вместо превью неподдерживаемого файла |
| `photo.err.net` | Не отправлено | No enviada | Not sent | Ошибка сети/таймаута |
| `photo.err.net.hint` | Нет сети или соединение оборвалось. Попробуй ещё раз. | No hay conexión o se ha cortado. Vuelve a intentarlo. | No connection, or it dropped. Try again. | Пояснение под ошибкой сети |
| `photo.action.pick` | Выбрать другое | Elegir otra | Choose another | Выбрать другое фото |
| `photo.action.retry` | Повторить | Reintentar | Try again | Повторить отправку |
| `photo.action.delete` | Удалить | Eliminar | Delete | Удалить неотправленное |
| `photo.expired` | Фото удалено — их храним 12 месяцев | Foto eliminada: las guardamos 12 meses | Photo deleted: we keep them for 12 months | Заглушка в пузыре вместо удалённого фото |
| `photo.caption.will` | Marco увидит на испанском | Marco lo verá en ruso | Marco will see it in Spanish | Над переводом подписи исходящего фото |
| `composer.attach.a11y` | Добавить фото | Añadir foto | Add photo | Кнопка в поле ввода (aria-label) |
| `photo.alt.sample.in` | Фото: вход в парк | Foto: entrada del parque | Photo: park entrance | Пример alt входящего фото |
| `photo.alt.sample.out` | Фото: кафе на углу | Foto: café de la esquina | Photo: café on the corner | Пример alt исходящего фото |

Используются существующие ключи: «Показать/Скрыть оригинал», «Переведено с …», «Оригинал», «Не отправлено» (стиль `pc-failrow`), «Нет сети» (как в `err-offline-banner`).

## Демо-контент (не для перевода в продукт)

| | ru | es | en |
|---|---|---|---|
| Подпись входящего | Вход в парк, жду тебя тут | Es la entrada del parque, te espero aquí | This is the park entrance, I’m waiting here |
| Подпись исходящего | Мы в кафе на углу, заходи | Estamos en el café de la esquina, pásate | We’re at the café on the corner, come by |
| Подпись удалённого фото | Меню того кафе, сохрани себе | El menú de aquel café, guárdatelo | The menu from that café, save it |
