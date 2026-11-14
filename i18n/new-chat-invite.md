# Новый чат, личная ссылка/QR, добавить участников, «Новая группа», поиск в чате

Заказ parrlo-messenger (14.11). Кадры: `new-chat*`, `invite-link*`, `group-add*` (HTML, без PNG; формулировки — не утверждено, проверяет RG); правки в `home-menu` («Новая группа») и `chat` (кнопка «Поиск в чате» в шапке).

Личная ссылка живёт 30 дней (Directory.INVITE_TTL), если parrlo-back не уберёт срок — тогда ilNote без «30 дней». `partial` — тост, когда сервер молча пропустил часть людей (блокировка не раскрывается).

| Ключ | ru | es | en |
|---|---|---|---|
| `nc` | Новый чат | Nuevo chat | New chat |
| `ncLead` | Выбери, кому написать. | Elige a quién escribir. | Choose who to message. |
| `contacts` | Контакты | Contactos | Contacts |
| `ncInvite` | Нет нужного человека? Пригласи по ссылке — когда человек её откроет, появится чат с тобой. | ¿No está la persona que buscas? Invítala con un enlace: cuando lo abra, tendréis un chat. | Can’t find someone? Invite them with a link — when they open it, you’ll have a chat. |
| `inviteBtn` | Пригласить по ссылке | Invitar con un enlace | Invite with a link |
| `cancel` | Отмена | Cancelar | Cancel |
| `retry` | Повторить | Reintentar | Try again |
| `ncErrT` | Не удалось загрузить контакты | No se han podido cargar los contactos | Couldn’t load contacts |
| `ncErrB` | Проверь соединение и попробуй ещё раз. | Comprueba la conexión y vuelve a intentarlo. | Check your connection and try again. |
| `ncEmptyT` | Пока нет контактов | Todavía no tienes contactos | No contacts yet |
| `ncEmptyB` | Пригласи человека по ссылке — он появится здесь. | Invita a alguien con un enlace y aparecerá aquí. | Invite someone with a link and they’ll appear here. |
| `il` | Пригласить по ссылке | Invitar con un enlace | Invite with a link |
| `ilLead` | Любой, у кого есть эта ссылка, сможет написать тебе. Отправляй её только тем, кому доверяешь. | Cualquiera que tenga este enlace podrá escribirte. Envíalo solo a personas de confianza. | Anyone with this link can message you. Only send it to people you trust. |
| `ilLbl` | Твоя ссылка | Tu enlace | Your link |
| `ilNote` | Ссылка работает 30 дней или пока ты её не сбросишь. Уже начатые чаты останутся. | El enlace funciona 30 días o hasta que lo restablezcas. Los chats ya empezados se mantienen. | The link works for 30 days or until you reset it. Chats you’ve already started stay. |
| `copy` | Скопировать ссылку | Copiar enlace | Copy link |
| `share` | Поделиться | Compartir | Share |
| `qr` | Показать QR-код | Mostrar código QR | Show QR code |
| `reset` | Сбросить ссылку | Restablecer enlace | Reset link |
| `copied` | Ссылка скопирована | Enlace copiado | Link copied |
| `qrT` | QR-код | Código QR | QR code |
| `qrB` | Покажи его человеку рядом: он наведёт камеру и откроет чат с тобой. | Enséñaselo a quien tengas cerca: lo escaneará con la cámara y abrirá un chat contigo. | Show it to someone nearby: they can scan it with their camera to open a chat with you. |
| `done` | Готово | Listo | Done |
| `rsT` | Сбросить ссылку? | ¿Restablecer el enlace? | Reset the link? |
| `rsB` | Старая ссылка перестанет работать. Чаты, которые уже начаты, останутся. | El enlace anterior dejará de funcionar. Los chats ya empezados se mantienen. | The old link will stop working. Chats you’ve already started stay. |
| `rsBtn` | Сбросить | Restablecer | Reset |
| `ilErrT` | Не удалось получить ссылку | No se ha podido obtener el enlace | Couldn’t get the link |
| `ilErrB` | Проверь соединение и попробуй ещё раз. | Comprueba la conexión y vuelve a intentarlo. | Check your connection and try again. |
| `ga` | Добавить участников | Añadir participantes | Add members |
| `gaLead` | В группу «{g}». Выбери людей из контактов. | Al grupo «{g}». Elige a personas de tus contactos. | To “{g}”. Choose people from your contacts. |
| `sel` | Контакты · выбрано {n} | Contactos · seleccionados: {n} | Contacts · {n} selected |
| `inGroup` | уже в группе | ya está en el grupo | already in the group |
| `add` | Добавить ({n}) | Añadir ({n}) | Add ({n}) |
| `addOne` | Добавить | Añadir | Add |
| `gaViaLink` | Можно пригласить и по ссылке группы. | También puedes invitar con el enlace del grupo. | You can also invite with the group link. |
| `gaLimT` | Больше добавить нельзя | No puedes añadir a más personas | You can’t add anyone else |
| `gaLimB` | Вместе с выбранными в группе будет максимум участников. Сними выбор с кого-нибудь, чтобы выбрать другого. | Con las personas elegidas, el grupo llega al máximo. Quita a alguien de la selección para elegir a otra persona. | With the people you’ve chosen, the group is full. Unselect someone to choose another person. |
| `gaErrT` | Не удалось добавить участников | No se ha podido añadir a los participantes | Couldn’t add members |
| `gaErrB` | Проверь соединение и попробуй ещё раз. | Comprueba la conexión y vuelve a intentarlo. | Check your connection and try again. |
| `partial` | Добавлено {a} из {b} | Se ha añadido a {a} de {b} | {a} of {b} added |
| `newGroup` | Новая группа | Nuevo grupo | New group |
| `chatSearch` | Поиск в чате | Buscar en el chat | Search in chat |

Плейсхолдеры: `{g}` — название группы, `{n}` — число выбранных, `{a}`/`{b}` — добавлено / выбрано.
