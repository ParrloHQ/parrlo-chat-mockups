# Веб: баннер «аккаунт сохранён» (`web-reactivated`)

Заказ оркестратора (14.11). Человек получил предупреждение, что неактивный аккаунт удалят через 30 дней, и вошёл в веб-чат: на главном экране под сценой Парло (место баннера-напоминания `home-reminder`) показывается информационный баннер с крестиком. Кнопок действий нет — делать ничего не нужно. Тёмная тема. Кадры: веб 360 и 390 px, десктоп 1280 (normal, AX5) и 1440. HTML, без PNG.

Тексты — на «ты» / «tú», без рода (никаких «вернулся/вернулась»). Формулировки не утверждены (RG сравнивает с черновиком parrlo-chat-web PR 21). Ключи — как в коде (`ra.h`, `ra.b`).

| Ключ | ru | es | en |
|---|---|---|---|
| `ra.h` | Аккаунт сохранён | Tu cuenta sigue activa | Your account is still active |
| `ra.b` | Удаление из-за неактивности отменено. Больше ничего делать не нужно. | Hemos cancelado la eliminación por inactividad. No tienes que hacer nada más. | We’ve cancelled the deletion for inactivity. There’s nothing else you need to do. |
| `close` (aria-label крестика) | Закрыть | Cerrar | Close |

- Баннер — `role="status"` (не `alert`): новость хорошая, перебивать чтение экрана не нужно.
- Неразрывный пробел между двумя последними словами второй строки.
- Показ (решение оркестратора 14.11): баннер виден, пока не нажали крестик; закрытие запоминается для этого `reactivated_at` и сбрасывается при выходе. Сервер отдаёт `reactivated_at` 30 дней после входа — потом баннер пропадает сам.
- Сведение с черновиком PR 21: `ra.h` ru/es совпадают; en «Your account is kept» заменён на «Your account is still active» (естественнее, параллельно es). `ra.b` — короче черновика: без пересказа предупреждения, только итог и «ничего делать не нужно». Черновик для сравнения: ru «Он долго не использовался, и мы предупреждали об удалении. Вход его сохранил: переписка на месте.» / es «Llevaba mucho tiempo sin usarse y avisamos de que se eliminaría. Has entrado, así que tu cuenta y tus chats se mantienen.» / en «It hadn't been used for a long time and we warned it would be deleted. You've signed in, so your account and chats stay.»
- Вид: в макете — `.pc-remban` (поверхность с тонкой рамкой, как у напоминания), крестик 44 px в правом верхнем углу. Если в коде `.pc-banner--info` — допустимо при том же крестике 44 px и `role="status"`.
