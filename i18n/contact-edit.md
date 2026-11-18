# «Изменить контакт» — строки (handoff-v2, iOS)

Экраны: `contact-edit`, `contact-edit-filled`, `contact-edit-limit`, `contact-edit-reset`, `contact-profile-note`, `contact-edit-discard`. Открывается кнопкой `contact.card.edit` в карточке контакта (экран 37, `contact-profile`). Статус: **не утверждено**. Только тёмная тема.
Обращение на «ты» / «tú», без рода собеседника и пользователя. Мягкие переносы в кадрах — только для XL, в ключах их нет. Неразрывные пробелы: «500 символов», «480 / 500».

**Бот:** у бота экрана «Изменить контакт» нет, в карточке бота кнопки «Изменить» (`contact.card.edit`) нет — ни своего имени, ни заметки у бота.

| ключ | RU | ES | EN | примечание |
|---|---|---|---|---|
| `contact.card.edit` | Изменить | Editar | Edit | кнопка справа в шапке карточки (37); у бота её нет |
| `contact.edit.title` | Изменить контакт | Editar contacto | Edit contact | заголовок листа; aria-labelledby диалога |
| `contact.edit.cancel` | Отмена | Cancelar | Cancel | слева в шапке листа; закрывает без сохранения |
| `contact.edit.done` | Готово | OK | Done | справа в шапке, полужирная; неактивна, пока нет изменений. Отдельный ключ: в общем каталоге es «Listo», а в этом листе — «OK», как в листах правки iOS |
| `contact.edit.name.label` | Имя | Nombre | Name | поле «Имя» — как я называю контакт; пустое поле = имя из профиля (подсказка-placeholder) |
| `contact.edit.name.profile` | В профиле: %@ | En el perfil: %@ | Profile name: %@ | %@ — имя из профиля собеседника; то же в карточке под именем |
| `contact.edit.name.reset` | Сбросить к имени из профиля | Restablecer el nombre del perfil | Reset to profile name | текстовая кнопка ≥ 44; скрыта, когда имя совпадает с профилем |
| `contact.edit.name.same` | Совпадает с именем в профиле | Coincide con el nombre del perfil | Same as the profile name | после сброса, вместо кнопки (с галочкой) |
| `contact.edit.note.label` | Заметка | Nota | Note | поле «Заметка», многострочное; то же — заголовок блока в карточке |
| `contact.edit.note.placeholder` | Например, где вы познакомились | Por ejemplo, dónde os conocisteis | For example, where you met | пустая заметка |
| `contact.edit.note.hidden` | Собеседник её не видит | La otra persona no la ve | The other person can’t see it | подпись под заметкой (в листе и в карточке); слово «приватно» не используем |
| `contact.edit.note.counter` | %1$d / %2$d | %1$d / %2$d | %1$d / %2$d | появляется с 450 символов, предел 500 (факт из заказа); пробелы неразрывные |
| `contact.edit.note.limit` | Больше 500 символов не поместится | No caben más de 500 caracteres | Notes can’t be longer than 500 characters | при 500 из 500: счётчик и строка цветом --err; ввод дальше не принимается |
| `contact.card.note.more` | Ещё | Más | More | заметка в карточке свёрнута до 3 строк; aria-label «Ещё: Заметка» |
| `contact.card.only_you` | Имя для контакта и заметку видишь только ты. | Solo tú ves el nombre que le pones al contacto y la nota. | Only you see the name you give this contact and the note. | строка внизу карточки вместо «Что есть в профиле…» |
| `contact.edit.discard.confirm` | Не сохранять изменения | Descartar cambios | Discard Changes | `contact-edit-discard`: системный confirmationDialog (action sheet) без заголовка, кнопка destructive (красная); закрывает лист без сохранения; строка уже у разработки |
| `contact.edit.discard.keep` | Продолжить правку | Seguir editando | Keep Editing | там же, роль cancel: отдельный блок снизу, полужирная; закрывает диалог, лист остаётся с правками; строка уже у разработки |

## Поведение (не утверждено)

- Формат по Apple HIG: правка свойств объекта — модальный лист (page sheet) с «Отмена» слева и «Готово» справа, как «Изменить» в Контактах iOS. «Готово» неактивна (`aria-disabled`), пока имя и заметка не отличаются от сохранённых.
- Сброс к имени из профиля — **без подтверждения**: действие обратимо (в листе можно нажать «Отмена» или ввести имя снова), ничего не удаляет; HIG советует не ставить алерт на обратимые действия. Экран `contact-edit-reset` — состояние после сброса.
- Счётчик заметки появляется с 450 символов (порог — допущение), предел 500. При 500 ввод и вставка обрезаются до 500.
- Нет сети: ничего особого — имя и заметка хранятся только на телефоне (решение 18.11), «Готово» срабатывает сразу, карточка выглядит как `contact-profile-note`. Плашки и значка ожидания нет.
- «Отмена» при несохранённых изменениях: системный confirmationDialog (action sheet) без заголовка — «Не сохранять изменения» (`contact.edit.discard.confirm`, destructive) и «Продолжить правку» (`contact.edit.discard.keep`, cancel, отдельным блоком снизу); фон листа затемнён. Экран `contact-edit-discard`.
- Без правок «Отмена» закрывает лист сразу, без диалога.
- Свайп вниз по листу с правками вызывает тот же диалог (лист не закрывается, пока не выбрано «Не сохранять изменения»).
- Своё имя контакта показывается в списке чатов, шапке чата и карточке; имя из профиля — мелко под ним в карточке.

## Демо-данные (не строки)

- Имя из профиля: Lucía Fernández. Своё имя: ru «Лусия» → «Лусия, испанский»; es «Lucía» → «Lucía, clases de ruso»; en «Lucía» → «Lucía, Spanish practice».
- ES, статус в карточке: в шаблоне 37 «Conectado por las tardes» (мужской род, под Marco); в этих кадрах — «Disponible por las tardes». Строка экрана 37 не менялась — предлагается заменить и там.
- Длинная заметка: ru 476, es 488, en 475 символов (счётчик в кадре — фактическая длина); в `contact-edit-limit` — ровно 500.
