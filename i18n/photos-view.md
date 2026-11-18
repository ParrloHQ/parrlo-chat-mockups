# Фото в Chat — строки группы `view` (18.11)

Экраны: `chat-photo-viewer`, `chat-photo-viewer-multi`, `chat-photo-report`, `group-photo`, `home-chats-photo`. Статус: **не утверждено**. Обращение на «ты» / «tú», без рода.
Тексты жалобы (`photo.report.*`, кроме кнопок) — **текст юриста**: в кадрах помечены плашкой, формулировки нейтральные.
Неразрывные пробелы: «100 %», «2 из 4», «Parrlo Chat». Мягкие переносы в кадрах — только для XL, в ключах их нет.

| ключ | RU | ES | EN | примечание |
|---|---|---|---|---|
| `photo.viewer.close` | Закрыть | Cerrar | Close | ✕, aria-label |
| `photo.viewer.when` | Сегодня, 09:20 | Hoy, 09:20 | Today, 09:20 | время под именем |
| `photo.caption.translated_from` | Переведено с испанского | Traducido del ruso | Translated from Spanish | метка перевода (как в чате) |
| `photo.caption.original` | Оригинал | Original | Original | метка оригинала (как в чате) |
| `photo.action.save` | Сохранить | Guardar | Save |  |
| `photo.action.share` | Поделиться | Compartir | Share |  |
| `photo.action.report` | Пожаловаться на фото | Denunciar foto | Report photo | видна в кадре, не в «⋯» |
| `photo.hint.swipe_close` | Смахни вниз, чтобы закрыть | Desliza hacia abajo para cerrar | Swipe down to close | iOS, один раз |
| `photo.hint.pinch_zoom` | Щипок — увеличить | Pellizca para ampliar | Pinch to zoom | iOS, один раз |
| `photo.web.hint.esc` | закрыть | cerrar | to close | после клавиши Esc |
| `photo.web.hint.zoom` | Масштаб: колесо мыши или + и − | Zoom: rueda del ratón o + y − | Zoom: mouse wheel or + and − | веб |
| `photo.web.zoom_out` | Уменьшить | Alejar | Zoom out | aria-label «−» |
| `photo.web.zoom_in` | Увеличить | Acercar | Zoom in | aria-label «+» |
| `photo.web.zoom_level` | 100 % | 100 % | 100% | значение |
| `photo.multi.counter` | 2 из 4 | 2 de 4 | 2 of 4 | %1$d из %2$d |
| `photo.multi.dots` | Фото 2 из 4 | Foto 2 de 4 | Photo 2 of 4 | aria-label точек |
| `photo.multi.prev` | Предыдущее фото | Foto anterior | Previous photo | веб, стрелка |
| `photo.multi.next` | Следующее фото | Foto siguiente | Next photo | веб, стрелка |
| `photo.report.title` | Пожаловаться на фото | Denunciar la foto | Report photo | текст юриста |
| `photo.report.question` | Что не так с этим фото? | ¿Qué pasa con esta foto? | What’s wrong with this photo? | текст юриста |
| `photo.report.reason.insult` | Оскорбление | Insultos | Abuse or insults | текст юриста |
| `photo.report.reason.violence` | Насилие | Violencia | Violence | текст юриста |
| `photo.report.reason.intimate` | Интимное фото без согласия | Foto íntima sin consentimiento | Intimate photo shared without consent | текст юриста |
| `photo.report.reason.spam` | Спам | Spam | Spam | текст юриста |
| `photo.report.reason.other` | Другое | Otro motivo | Something else | текст юриста |
| `photo.report.note` | Модератор Parrlo Chat увидит это фото, подпись и данные о том, кто и когда его отправил. Автору не скажем, что жалоба от тебя. | Un moderador de Parrlo Chat verá esta foto, el texto y quién la envió y cuándo. No le diremos a quien la envió que la denuncia es tuya. | A Parrlo Chat moderator will see this photo, its caption, and who sent it and when. We won’t tell the sender the report came from you. | текст юриста |
| `photo.report.send` | Отправить | Enviar | Send |  |
| `photo.report.cancel` | Отмена | Cancelar | Cancel |  |
| `photo.preview` | Фото | Foto | Photo | превью в списке; у группы «%@: Фото» |
| `photo.open` | Открыть фото | Abrir foto | Open photo | aria-label миниатюры в пузыре |
| `photo.alt.cafe` | Фото: кафе у окна | Foto: cafetería junto a la ventana | Photo: café by the window | демо alt |
| `photo.alt.street` | Фото: улица в дождь | Foto: calle con lluvia | Photo: street in the rain | демо alt |
| `photo.alt.town` | Фото: старый город | Foto: casco antiguo | Photo: old town | демо alt |

## Демо-подписи (не ключи; содержимое сообщений)

Подпись показывается в двух видах: перевод на язык читателя (сверху) и оригинал. В RU и EN кадрах Marco пишет по‑испански, в ES — по‑русски.

| | RU | ES | EN |
|---|---|---|---|
| cap_t | Наше любимое кафе. Жду тебя здесь в девять? | Nuestra cafetería de siempre. ¿Te espero aquí a las nueve? | Our usual café. Shall I wait for you here at nine? |
| m_t | Прогулка по старому городу | Paseo por el casco antiguo | A walk through the old town |
| g_t | Вот какая сегодня улица — лучше возьмите зонты | Así está la calle hoy, mejor llevad paraguas | This is the street today, better bring umbrellas |
