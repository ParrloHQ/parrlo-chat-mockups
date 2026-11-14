# Новый чат, личная ссылка/QR, добавить участников, «Новая группа», поиск в чате

Заказ parrlo-messenger (14.11). Кадры: `new-chat*`, `invite-link*`, `group-add*` (HTML, без PNG; формулировки — не утверждено, проверяет RG); правки в `home-menu` («Новая группа») и `chat` (кнопка «Поиск в чате» в шапке).

| Ключ | ru | es | en |
|---|---|---|---|
| `nc` | Новый чат | Nuevo chat | New chat |
| `ncLead` | Выбери, кому написать. | Elige a quién escribir. | Choose who to message. |
| `contacts` | Контакты | Contactos | Contacts |
| `ncInvite` | Нет нужного человека? Пригласи его по ссылке — когда он откроет её, появится чат с тобой. | ¿No está la persona que buscas? Invítala con un enlace: cuando lo abra, tendréis un chat. | Can’t find someone? Invite them with a link — when they open it, you’ll have a chat. |
| `inviteBtn` | Пригласить по ссылке | Invitar con un enlace | Invite with a link |
| `cancel` | Отмена | Cancelar | Cancel |
| `retry` | Повторить | Reintentar | Try again |
| `ncErrT` | Не удалось загрузить контакты | No se han podido cargar los contactos | Couldn’t load contacts |
| `ncErrB` | Проверь соединение и попробуй ещё раз. | Comprueba la conexión y vuelve a intentarlo. | Check your connection and try again. |
| `ncEmptyT` | Пока нет контактов | Todavía no tienes contactos | No contacts yet |
| `ncEmptyB` | Пригласи человека по ссылке — он появится здесь. | Invita a alguien con un enlace y aparecerá aquí. | Invite someone with a link and they’ll appear here. |
| `il` | Пригласить по ссылке | Invitar con un enlace | Invite with a link |
| `ilLead` | По этой ссылке человек откроет чат с тобой. Отправляй её только тем, кому доверяешь. | Con este enlace, la otra persona abrirá un chat contigo. Envíalo solo a quien confíes. | With this link, the other person can open a chat with you. Only send it to people you trust. |
| `ilLbl` | Твоя ссылка | Tu enlace | Your link |
| `ilNote` | Ссылка работает, пока ты её не сбросишь. После сброса старая перестанет открываться, а уже начатые чаты останутся. | El enlace funciona hasta que lo restablezcas. Después, el anterior dejará de abrirse, pero los chats ya empezados se quedan. | The link works until you reset it. After that, the old one stops opening, but chats you’ve already started stay. |
| `copy` | Скопировать ссылку | Copiar enlace | Copy link |
| `share` | Поделиться | Compartir | Share |
| `qr` | Показать QR-код | Mostrar código QR | Show QR code |
| `reset` | Сбросить ссылку | Restablecer enlace | Reset link |
| `copied` | Ссылка скопирована | Enlace copiado | Link copied |
| `qrT` | QR-код | Código QR | QR code |
| `qrB` | Покажи его человеку рядом: он наведёт камеру и откроет чат с тобой. | Enséñaselo a quien tengas cerca: lo escaneará con la cámara y abrirá un chat contigo. | Show it to someone nearby: they point their camera at it and open a chat with you. |
| `done` | Готово | Listo | Done |
| `rsT` | Сбросить ссылку? | ¿Restablecer el enlace? | Reset the link? |
| `rsB` | Старая ссылка перестанет работать. Чаты, которые уже начаты, останутся. | El enlace anterior dejará de funcionar. Los chats ya empezados se quedan. | The old link will stop working. Chats you’ve already started stay. |
| `rsBtn` | Сбросить | Restablecer | Reset |
| `ilErrT` | Не удалось получить ссылку | No se ha podido obtener el enlace | Couldn’t get the link |
| `ilErrB` | Проверь соединение и попробуй ещё раз. | Comprueba la conexión y vuelve a intentarlo. | Check your connection and try again. |
| `ga` | Добавить участников | Añadir participantes | Add members |
| `gaLead` | В группу «{g}». Выбери людей из контактов. | Al grupo «{g}». Elige a personas de tus contactos. | To “{g}”. Choose people from your contacts. |
| `sel` | Контакты · выбрано {n} | Contactos · {n} seleccionados | Contacts · {n} selected |
| `inGroup` | уже в группе | ya está en el grupo | already in the group |
| `add` | Добавить ({n}) | Añadir ({n}) | Add ({n}) |
| `addOne` | Добавить | Añadir | Add |
| `gaViaLink` | Можно пригласить и по ссылке группы. | También puedes invitar con el enlace del grupo. | You can also invite with the group link. |
| `gaLimT` | Больше добавить нельзя | No puedes añadir a más personas | You can’t add anyone else |
| `gaLimB` | С выбранными людьми в группе будет максимум участников. Чтобы добавить ещё кого-то, кому-то нужно выйти. | Con las personas elegidas, el grupo llegará al máximo de participantes. Para añadir a alguien más, otra persona tiene que salir. | With the people you’ve chosen, the group will reach the maximum number of members. To add anyone else, someone has to leave. |
| `gaErrT` | Не удалось добавить участников | No se ha podido añadir a los participantes | Couldn’t add members |
| `gaErrB` | Никто не добавлен. Проверь соединение и попробуй ещё раз. | No se ha añadido a nadie. Comprueba la conexión y vuelve a intentarlo. | No one was added. Check your connection and try again. |
| `newGroup` | Новая группа | Nuevo grupo | New group |
| `chatSearch` | Поиск в чате | Buscar en el chat | Search in chat |

Плейсхолдеры: `{g}` — название группы, `{n}` — число выбранных.
