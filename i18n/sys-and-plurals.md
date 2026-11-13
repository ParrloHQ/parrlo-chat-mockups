# Служебные строки групп и склонения (13.11)

## Служебные строки групп — без рода

**Один вариант для iOS и веба.** Сейчас iOS (PR 548) — в мужском роде, веб (PR 18) — в женском; обе платформы берут эту таблицу. Кадры: `group-syslines`, `group-syslines-2`.

В русском глагол прошедшего времени согласуется с полом («создала / создал»), а пол участника приложение не знает. Имена тоже нельзя склонять: «удалила **Петю**» требует склонения произвольного имени. Нужны конструкции, где имя стоит в именительном падеже и нет глагола в прошедшем времени, согласованного с участником.

**Вариант А (выбран):** «метка: Имя», второе действующее лицо — через «· кто …: Имя». «Кто» всегда требует мужского рода («кто добавил»), поэтому форма нейтральна.
**Вариант Б (отклонён):** «Имя: отглагольное существительное» («Лена: создание группы», «Лена: добавление участника»). Второе имя после существительного требует родительного падежа («добавление Marco» / «исключение Пети»), а он у произвольного имени не строится. Кроме того, текст читается как лог.

| Событие | ключ | RU (вариант А) | ES | EN |
|---|---|---|---|---|
| created | sys.created | Создатель группы «%2$@»: %1$@ | %1$@ ha creado el grupo «%2$@» | %1$@ created the group “%2$@” |
| joined (по ссылке) | sys.joined_link | Новый участник по ссылке: %@ | %@ se ha unido con el enlace | %@ joined via link |
| added | sys.added | Новый участник: %1$@ · кто добавил: %2$@ | %2$@ ha añadido a %1$@ | %2$@ added %1$@ |
| removed | sys.removed | Исключение из группы: %1$@ · кто исключил: %2$@ | %2$@ ha eliminado a %1$@ del grupo | %2$@ removed %1$@ from the group |
| left | sys.left | Выход из группы: %@ | %@ ha salido del grupo | %@ left the group |
| owner | sys.owner | Владелец группы теперь: %@ | Nueva persona propietaria del grupo: %@ | Group owner is now: %@ |
| renamed | sys.renamed | Новое название группы: «%2$@» · кто изменил: %1$@ | %1$@ ha cambiado el nombre del grupo a «%2$@» | %1$@ renamed the group to “%2$@” |
| deleted_account | sys.deleted_account | Аккаунт участника удалён | Se ha eliminado la cuenta de un miembro | A member deleted their account |
| тебя добавили | sys.added_you | Тебя добавили в группу · кто добавил: %@ | %@ te ha añadido al grupo | %@ added you to the group |
| added (без автора) | sys.added_noactor | Новый участник: %@ | Se ha añadido a %@ al grupo | %@ was added to the group |
| removed (без автора) | sys.removed_noactor | Исключение из группы: %@ | Se ha eliminado a %@ del grupo | %@ was removed from the group |
| renamed (без автора) | sys.renamed_noactor | Новое название группы: «%@» | Nuevo nombre del grupo: «%@» | Group renamed to “%@” |
| имя неизвестно | sys.someone | Участник | un miembro / Un miembro (в начале фразы) | a member / A member |

Пример с `sys.someone`: «Выход из группы: Участник» / «Un miembro ha salido del grupo» / «A member left the group».

ES и EN проверены. В испанском прошедшее время глагола не зависит от рода, поэтому глагольные формы оставлены. Заменены только «el propietario» (мужской род) и «un participante»: использованы «persona propietaria» и «miembro», у слова «miembro» один артикль для обоих родов. В английском рода нет, форма «their» нейтральна.

Также без рода: в `err-reject-notmember` строка «Тебя исключили из группы» / «Te han eliminado del grupo» / «You were removed from the group».

## Склонение: «N новых запросов»

| N | RU (`one / few / many`) | ES (`one / other`) | EN (`one / other`) |
|---|---|---|---|
| 1, 21, 31… | %d новый запрос | %d solicitud nueva | %d new request |
| 2–4, 22–24… | %d новых запроса | %d solicitudes nuevas | %d new requests |
| 0, 5–20, 25–30… | %d новых запросов | %d solicitudes nuevas | %d new requests |

В iOS — через plural-вариации в `Localizable.xcstrings` (категории `one`, `few`, `many`, `other`). В макете показано «2 новых запроса».

## Отказ отправки 404 / 410

| Код | Экран | RU | ES | EN |
|---|---|---|---|---|
| 404 | `err-reject-msggone` | Это сообщение больше не существует. | Este mensaje ya no existe. | This message no longer exists. |
| 410 | `err-reject-chatgone` | Этот чат больше не существует. + вместо поля ввода «Чат удалён — писать в него нельзя.» | Este chat ya no existe. / El chat se ha eliminado: no puedes escribir en él. | This chat no longer exists. / This chat was deleted — you can’t write in it. |

## Дополнение 13.11: «я» как участник события, группа без названия, «тебя добавили» без автора

**Правило для клиента.** Если субъект события — текущий пользователь, бери ключ с суффиксом `_self`. Слово «Ты» / «Tú» / «You» в `%@` не подставляй: так получается «a Tú» и «Tú ha creado». Если объект события — текущий пользователь, бери ключ `_you`. `%@` — имя другого участника или название группы.

### Субъект — я (`_self`)

| ключ | RU | ES | EN |
|---|---|---|---|
| sys.created_self | Создатель группы «%@»: ты | Has creado el grupo «%@» | You created the group “%@” |
| sys.joined_link_self | Ты в группе — по ссылке | Te has unido con el enlace | You joined via link |
| sys.added_self | Новый участник: %@ · кто добавил: ты | Has añadido a %@ | You added %@ |
| sys.removed_self | Исключение из группы: %@ · кто исключил: ты | Has eliminado a %@ del grupo | You removed %@ from the group |
| sys.left_self | Выход из группы: ты | Has salido del grupo | You left the group |
| sys.owner_self | Владелец группы теперь: ты | Ahora eres la persona propietaria del grupo | You’re now the group owner |
| sys.renamed_self | Новое название группы: «%@» · кто изменил: ты | Has cambiado el nombre del grupo a «%@» | You renamed the group to “%@” |

### Объект — я (`_you`)

| ключ | RU | ES | EN |
|---|---|---|---|
| sys.added_you | Тебя добавили в группу · кто добавил: %@ | %@ te ha añadido al grupo | %@ added you to the group |
| sys.added_you_noactor | Тебя добавили в группу | Te han añadido al grupo | You were added to the group |
| sys.removed_you | Тебя исключили из группы · кто исключил: %@ | %@ te ha eliminado del grupo | %@ removed you from the group |
| sys.removed_you_noactor | Тебя исключили из группы | Te han eliminado del grupo | You were removed from the group |

«Тебя добавили / исключили» — безличная форма во множественном числе, от рода не зависит.

### Группа без названия

| ключ | RU | ES | EN |
|---|---|---|---|
| sys.created_noname | Создатель группы: %@ | %@ ha creado un grupo | %@ created a group |
| sys.created_noname_self | Создатель группы: ты | Has creado un grupo | You created a group |
| sys.renamed_from_none | Название группы: «%2$@» · кто изменил: %1$@ | %1$@ ha puesto al grupo el nombre «%2$@» | %1$@ named the group “%2$@” |
| sys.renamed_cleared | Название группы удалено · кто изменил: %@ | %@ ha quitado el nombre del grupo | %@ removed the group name |
| sys.renamed_cleared_self | Название группы удалено · кто изменил: ты | Has quitado el nombre del grupo | You removed the group name |
| sys.renamed_noactor_noname | Название группы удалено | Se ha quitado el nombre del grupo | The group name was removed |

Если у группы нет названия, в шапке и в списке чатов вместо названия стоят имена участников («Лена, Marco и ещё 3»). Отдельного ключа для этого здесь нет: это общий формат клиента.
