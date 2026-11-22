# Вычитка служебных текстов редизайна iOS (tbd-texts.md) — Translate, 22.11.2026

Источник: `docs/translator/tbd-texts.md` (777a99a). Вычитаны все 194 строки «решает Мурат». 27 строк юриста не правил, только пометил.

**Критерии:** смысл ясен, «ты» / tú, без обещаний сроков («скоро», «позже»), без рода, коротко, неразрывные пробелы по short-words.

**Как читать:** в колонках ru / es / en стоит только **новый** текст. Пусто — значит без изменений. NBSP (`\u00A0`) уже расставлены в новых строках; при вставке в каталог `nbsp_ios --fix` доведёт остальное.

## Главное

1. **Блокер:** раздел «Настройки», №3, текст подписки. Там квадратные скобки «[с налогами/IVA — подтвердить менеджеру Store]» на всех трёх языках, такое нельзя показывать в сборке. Нужна цена и формулировка от Store или юриста.
2. **«позже» без срока** — заменено путём («в Настройках → Parrlo») или на «ещё раз»: онбординг №12–13, звонки №15. Совет «попробуй чуть позже» при полном звонке (группы №10) оставил: это совет, а не обещание.
3. **es:**
   - «hora tuya» везде заменено на «(hora local)», «restablece» — на «reinicia»;
   - для аккаунта «borrar» заменено на «eliminar», как в остальном каталоге;
   - убраны мужские артикли при «admin».
4. **Системные строки групп** приведены к одной форме без рода, как уже было у «Выход из группы: …»: «Добавление в группу: Marco · Лена», «Исключение из группы: …», «Новое название группы: …». Настоящее время («добавляет», «исключает») в ленте читается странно.
5. **Шаблон ошибок:** «Не удалось доставить сообщение» переведено в «Не получилось …» — по решению оркестратора о едином шаблоне.
6. **Дефект файла:** в разделе «Группы» колонки ru/es/en местами сдвинуты на строку (№4–9, 19–24, 29–34, 45–57), часть строк осталась только с ru. Я сопоставил по смыслу и дал недостающие es/en, но таблицу-источник стоит пересобрать.
7. **Не UI:** отмечены строки, где в ячейке не текст экрана, а пометка, вопрос для дизайна или пример сообщения. Их в сборку не берут.

**Итог по 194 строкам Мурата:**
- ок — 93;
- правка — 41;
- не UI — 32;
- пустые ячейки — 13 (дописаны черновиком по названию экрана, сверить с макетом);
- нужен es/en — 7 (дан es/en во всех семи);
- сдвиг колонок — 7;
- блокер — 1.

## Вход и онбординг (`redesign-ios/onboarding/`) — 24

| № | Экран | Итог | Почему | ru | es | en |
|---|---|---|---|---|---|---|
| 1 | `account-banned` | ок |  |  |  |  |
| 2 | `account-suspended` | ок |  |  |  |  |
| 3 | `ob-age-date` | юрист — не трогаю | | | | |
| 4 | `ob-age-date` | ок | совпадает с №3 (решает юрист) — запасной вариант, правок нет |  |  |  |
| 5 | `ob-age-under-date` | юрист — не трогаю | | | | |
| 6 | `ob-age-under-date` | не UI | в ячейке текст пометки, а не экрана — в сборку не идёт |  |  |  |
| 7 | `ob-consent-no` | правка | «не пушем» — жаргон | Безопасный режим включён. Напоминать будем только в приложении, без пуш-уведомлений. Когда и как часто: | El modo seguro está activado. Te lo recordaremos solo dentro de la app, sin notificaciones push. Cuándo y con qué frecuencia: | Safe mode is on. We’ll remind you only in the app, not with push notifications. When and how often: |
| 8 | `ob-consent-no` | правка | «не пушем» — жаргон | Безопасный режим включён. Напоминать будем только в приложении, без пуш-уведомлений. Когда и как часто: | El modo seguro está activado. Te lo recordaremos solo dentro de la app, sin notificaciones push. Cuándo y con qué frecuencia: | Safe mode is on. We’ll remind you only in the app, not with push notifications. When and how often: |
| 9 | `ob-consent` | юрист — не трогаю | | | | |
| 10 | `ob-consent` | юрист — не трогаю | | | | |
| 11 | `ob-consent` | правка (es) | «conservación» без «plazo» неясно; блок близок к юридическому — финал за юристом |  | Proveedores de IA, base de la transferencia y plazo de conservación: |  |
| 12 | `ob-parrlo-setup-error` | правка | «можно позже» — обещание без срока; даём путь вместо «позже»; es «configurar a Parrlo» → без «a» | Не получилось сохранить настройки. Попробуй ещё раз или пропусти: настроить Parrlo можно в Настройках → Parrlo. | No se han podido guardar los ajustes. Inténtalo de nuevo u omite este paso: puedes configurar Parrlo en Ajustes → Parrlo. | Couldn’t save your settings. Try again or skip: you can set up Parrlo in Settings → Parrlo. |
| 13 | `ob-parrlo-setup-skip` | правка | «позже» убрано; es-кнопка «Volver a ajustes» путается с «Ajustes» (Настройки) в тексте выше | Пропустить настройку? Parrlo начнёт с настроек по умолчанию. Память останется выключенной. Поменять можно в Настройках → Parrlo. [Пропустить] [Вернуться к настройке] | ¿Omitir la configuración? Parrlo empezará con los ajustes por defecto. La memoria seguirá desactivada. Puedes cambiarlo en Ajustes → Parrlo. [Omitir] [Seguir configurando] | Skip setup? Parrlo will start with the default settings. Memory stays off. You can change this in Settings → Parrlo. [Skip] [Back to setup] |
| 14 | `ob-signin-apple-error` | ок |  |  |  |  |
| 15 | `ob-signin-cancel` | ок |  |  |  |  |
| 16 | `ob-signin-cancel` | ок |  |  |  |  |
| 17 | `ob-signin-google-error` | ок |  |  |  |  |
| 18 | `ob-signin-invite` | ок |  |  |  |  |
| 19 | `ob-signin-invite` | не UI | описание карточки для дизайна, не текст экрана |  |  |  |
| 20 | `ob-signin-offline` | ок |  |  |  |  |
| 21 | `ob-signin-offline` | ок |  |  |  |  |
| 22 | `ob-signin-wait` | правка (en) | «signing in in» — двойное in |  |  | Finish signing in with Apple. It takes a few seconds. |
| 23 | `ob-signin-wait` | ок |  |  |  |  |
| 24 | `ob-signin` | ок |  |  |  |  |

## Настройки (`redesign-ios/settings/`) — 31

| № | Экран | Итог | Почему | ru | es | en |
|---|---|---|---|---|---|---|
| 1 | `plans` | ок | «—» вместо цены: в сборку только с ценой из Store |  |  |  |
| 2 | `plans` | ок |  |  |  |  |
| 3 | `plans` | блокер | квадратные скобки «[с налогами/IVA — подтвердить…]» нельзя показывать — нужна формулировка от Store/юриста |  |  |  |
| 4 | `settings-account-delete-confirm` | юрист — не трогаю | | | | |
| 5 | `settings-account-delete-confirm` | правка | ru «насовсем» → «навсегда»; es «borrar» → «eliminar», как во всём каталоге для аккаунта | Удалить аккаунт навсегда? Отменить это нельзя. | ¿Eliminar tu cuenta para siempre? No se puede deshacer. |  |
| 6 | `settings-account-delete-error` | юрист — не трогаю | | | | |
| 7 | `settings-account-delete-error` | правка (es) | «eliminar» вместо «borrar» для аккаунта (единообразно с каталогом) |  | No se ha podido eliminar la cuenta. No se ha eliminado nada. Comprueba la conexión e inténtalo de nuevo. |  |
| 8 | `settings-account-delete` | юрист — не трогаю | | | | |
| 9 | `settings-account-deleted` | правка | заголовок и текст повторяют друг друга; es «eliminar» | Аккаунт удалён. Можно закрыть приложение. | Cuenta eliminada. Ya puedes cerrar la app. | Account deleted. You can close the app now. |
| 10 | `settings-account-logout` | ок |  |  |  |  |
| 11 | `settings-account-logout` | ок |  |  |  |  |
| 12 | `settings-account` | ок |  |  |  |  |
| 13 | `settings-language` | ок |  |  |  |  |
| 14 | `settings-notifications-blocked` | ок |  |  |  |  |
| 15 | `settings-notifications-blocked` | черновик | черновик по названию экрана — в источнике ячейка пустая; сверить с макетом | Уведомления выключены в настройках iPhone. Включить: Настройки iPhone → Parrlo → Уведомления. | Las notificaciones están desactivadas en los ajustes del iPhone. Actívalas en Ajustes → Parrlo → Notificaciones. | Notifications are off in iPhone settings. Turn them on in Settings → Parrlo → Notifications. |
| 16 | `settings-notifications` | юрист — не трогаю | | | | |
| 17 | `settings-notifications` | черновик | черновик по названию экрана — в источнике ячейка пустая; сверить с макетом | Звук, баннеры и наклейки на значке настраиваются в настройках iPhone. | El sonido, los avisos y el globo del icono se ajustan en los ajustes del iPhone. | Sound, banners and badges are set in iPhone settings. |
| 18 | `settings-save-error` | ок |  |  |  |  |
| 19 | `settings` | ок |  |  |  |  |
| 20 | `usage-limit-week` | правка (es) | «hora tuya» звучит неестественно → «(hora local)» |  | Parrlo volverá a funcionar el lunes a las 00:00 (hora local); el reinicio diario no lo cambia. La voz y las llamadas se cuentan aparte. Los chats normales, los grupos y la traducción de texto funcionan como siempre. |  |
| 21 | `usage-limit-week` | правка (es) | «hora tuya» → «(hora local)», «restablece» → «reinicia» |  | Se reinicia mañana a las 00:00 (hora local) |  |
| 22 | `usage-limit-week` | правка (es) | то же |  | Se reinicia el lunes a las 00:00 (hora local) |  |
| 23 | `usage-limit-week` | ок |  |  |  |  |
| 24 | `usage-limit` | правка (es) | «hora tuya» → «(hora local)», «restablece» → «reinicia» |  | Se reinicia mañana a las 00:00 (hora local) |  |
| 25 | `usage-limit` | правка (es) | то же |  | Se reinicia el lunes a las 00:00 (hora local) |  |
| 26 | `usage-limit` | ок |  |  |  |  |
| 27 | `usage-reset` | правка (es) | «puesto a cero» → «reiniciado», «hora local» |  | Las barras de hoy se han reiniciado a las 00:00 (hora local). Las semanales cuentan desde el lunes. |  |
| 28 | `usage-reset` | правка (es) | «hora tuya» → «(hora local)», «restablece» → «reinicia» |  | Se reinicia mañana a las 00:00 (hora local) |  |
| 29 | `usage-reset` | правка (es) | то же |  | Se reinicia el lunes a las 00:00 (hora local) |  |
| 30 | `usage` | правка (es) | «hora tuya» → «(hora local)», «restablece» → «reinicia» |  | Se reinicia mañana a las 00:00 (hora local) |  |
| 31 | `usage` | правка (es) | то же |  | Se reinicia el lunes a las 00:00 (hora local) |  |

## Контакты, звонки, профиль (`redesign-ios/contacts-calls/`) — 49

| № | Экран | Итог | Почему | ru | es | en |
|---|---|---|---|---|---|---|
| 1 | `call-connecting` | ок |  |  |  |  |
| 2 | `call-detail-group` | ок |  |  |  |  |
| 3 | `call-detail-group` | юрист — не трогаю | | | | |
| 4 | `call-detail-missed` | ок |  |  |  |  |
| 5 | `call-detail-missed` | юрист — не трогаю | | | | |
| 6 | `call-detail-missed` | черновик | черновик по названию экрана — в источнике ячейка пустая; сверить с макетом | Пропущенный звонок. Протокола нет: разговор не состоялся. | Llamada perdida. No hay transcripción: la llamada no llegó a realizarse. | Missed call. No transcript: the call didn’t take place. |
| 7 | `call-detail` | ок |  |  |  |  |
| 8 | `call-detail` | юрист — не трогаю | | | | |
| 9 | `call-detail` | черновик | черновик по названию экрана — в источнике ячейка пустая; сверить с макетом | Протокол звонка — в чате. Каждый участник может удалить его у себя. | La transcripción de la llamada está en el chat. Cada participante puede borrarla de su chat. | The call transcript is in the chat. Each participant can delete it from their own chat. |
| 10 | `call-ended` | ок |  |  |  |  |
| 11 | `call-failed` | ок |  |  |  |  |
| 12 | `call-incoming` | ок |  |  |  |  |
| 13 | `call-mic-blocked` | черновик | черновик по названию экрана — в источнике ячейка пустая; сверить с макетом | Нет доступа к микрофону. Разреши его: Настройки iPhone → Parrlo → Микрофон. | No hay acceso al micrófono. Permítelo en Ajustes → Parrlo → Micrófono. | No microphone access. Allow it in Settings → Parrlo → Microphone. |
| 14 | `call-network-lost` | ок |  |  |  |  |
| 15 | `call-noanswer` | правка | «позже» → «ещё раз» | Попробуй позвонить ещё раз или напиши. | Vuelve a llamar o escribe un mensaje. | Try calling again or send a message. |
| 16 | `call-notice` | юрист — не трогаю | | | | |
| 17 | `call-notice` | ок | подпись к юридическому блоку — финал за юристом |  |  |  |
| 18 | `call-permission` | правка | в iOS нет «браузера» — убрать (оставить только для веба) | Появится запрос системы — выбери «Разрешить». Передумаешь — это можно поменять в настройках. | Verás una pregunta del sistema: elige «Permitir». Si cambias de idea, puedes modificarlo en los ajustes. | You’ll see a system prompt — choose “Allow”. If you change your mind, you can change it in settings. |
| 19 | `call-protocol` | ок |  |  |  |  |
| 20 | `calls-empty` | ок |  |  |  |  |
| 21 | `calls-error` | ок |  |  |  |  |
| 22 | `calls-loading` | ок |  |  |  |  |
| 23 | `calls-missed` | не UI | вопрос для дизайна, не текст экрана |  |  |  |
| 24 | `calls-missed` | юрист — не трогаю | | | | |
| 25 | `calls` | не UI | вопрос для дизайна, не текст экрана |  |  |  |
| 26 | `calls` | юрист — не трогаю | | | | |
| 27 | `contact-block` | не UI | описание экрана для дизайна |  |  |  |
| 28 | `contact-block` | ок |  |  |  |  |
| 29 | `contact-blocked` | ок |  |  |  |  |
| 30 | `contact-blocked` | черновик | черновик по названию экрана — в источнике ячейка пустая; сверить с макетом; без рода («этот человек», не «он») | Контакт заблокирован: этот человек не может тебе писать и звонить. Снять блокировку можно здесь. | Contacto bloqueado: esta persona no puede escribirte ni llamarte. Puedes desbloquearla aquí. | Contact blocked: this person can’t message or call you. You can unblock them here. |
| 31 | `contact-blocked` | не UI | описание экрана для дизайна |  |  |  |
| 32 | `contact-edit-filled` | ок |  |  |  |  |
| 33 | `contact-edit-filled` | черновик | черновик по названию экрана — в источнике ячейка пустая; сверить с макетом; вероятно, вторая пометка экрана к №32 | Имя из профиля человека не меняется — меняется только подпись у тебя. | El nombre del perfil no cambia: solo cambia cómo aparece para ti. | The name in their profile doesn’t change — only how it appears for you. |
| 34 | `contact-edit-limit` | ок |  |  |  |  |
| 35 | `contact-edit-limit` | черновик | черновик по названию экрана — в источнике ячейка пустая; сверить с макетом; число символов взять из конфигурации | Слишком длинно: имя — до [N] символов, заметка — до [M]. | Demasiado largo: el nombre admite hasta [N] caracteres y la nota, hasta [M]. | Too long: the name can be up to [N] characters, the note up to [M]. |
| 36 | `contact-edit-reset` | ок |  |  |  |  |
| 37 | `contact-edit-reset` | черновик | черновик по названию экрана — в источнике ячейка пустая; сверить с макетом | Вернуть имя из профиля? Твоё имя для контакта сотрётся. | ¿Volver al nombre del perfil? Se borrará el nombre que le pusiste. | Go back to the profile name? The name you gave this contact will be removed. |
| 38 | `contact-edit` | ок |  |  |  |  |
| 39 | `contact-edit` | черновик | черновик по названию экрана — в источнике ячейка пустая; сверить с макетом; вероятно, вторая пометка к №38 | Имя для контакта меняется только у тебя. | El nombre del contacto solo cambia para ti. | The contact name changes only for you. |
| 40 | `contact-error` | ок |  |  |  |  |
| 41 | `contact-loading` | ок |  |  |  |  |
| 42 | `contact-nogroups` | ок |  |  |  |  |
| 43 | `contact-nogroups` | не UI | описание экрана для дизайна |  |  |  |
| 44 | `contact-profile-note` | ок |  |  |  |  |
| 45 | `contact-profile` | не UI | описание экрана для дизайна |  |  |  |
| 46 | `contact` | ок |  |  |  |  |
| 47 | `search-home-results` | ок |  |  |  |  |
| 48 | `search-home` | ок |  |  |  |  |
| 49 | `stranger` | ок | подпись к юридическому — финал за юристом |  |  |  |

## Группы (`redesign-ios/groups/`) — 60

| № | Экран | Итог | Почему | ru | es | en |
|---|---|---|---|---|---|---|
| 1 | `admin-transfer-confirm` | черновик | черновик по названию экрана — в источнике ячейка пустая; сверить с макетом; пара к №2 | Новый админ получит доступ к разделу «Участники и права». | La nueva persona admin tendrá acceso a «Participantes y permisos». | The new admin gets access to “Members and permissions”. |
| 2 | `admin-transfer-confirm` | ок |  |  |  |  |
| 3 | `admin-transfer` | черновик | черновик по названию экрана — в источнике ячейка пустая; сверить с макетом | Выбери, кто станет админом группы «Квартира». | Elige quién administrará «Piso». | Choose who will be the admin of “Flat”. |
| 4 | `group-admin-changed` | нужен es/en | в файле только ru (колонки es/en сдвинуты) |  | Anna se ha unido al grupo | Anna joined the group |
| 5 | `group-admin-changed` | нужен es/en | только ru; форма «Выход из группы: …» без рода — хорошо |  | Petya ha salido del grupo | Petya left the group |
| 6 | `group-admin-you` | сдвиг колонок | ru этой строки — от соседней; es «Ahora el admin es: tú» с мужским артиклем → без рода | Админ теперь: ты | Ahora administras tú el grupo | You’re now the admin |
| 7 | `group-admin-you` | нужен es/en | см. предыдущую строку |  | Ahora administras tú el grupo | You’re now the admin |
| 8 | `group-admin-you` | нужен es/en | только ru; форма «Выход из группы: …» без рода — хорошо |  | Petya ha salido del grupo | Petya left the group |
| 9 | `group-ai-info` | не UI | служебная пометка для дизайна |  |  |  |
| 10 | `group-call-full` | ок | «чуть позже» здесь совет, не обещание; оставить |  |  |  |
| 11 | `group-call` | нужен es/en | только ru |  | Anna se ha unido a la llamada. La IA está transcribiendo. | Anna joined the call. AI transcription is on. |
| 12 | `group-create` | правка (es) | «la persona administradora» тяжеловесно |  | Administrarás el grupo. |  |
| 13 | `group-invite-reset` | ок |  |  |  |  |
| 14 | `group-invite-reset` | ок |  |  |  |  |
| 15 | `group-invite` | ок |  |  |  |  |
| 16 | `group-join-declined` | правка | заголовок «Хорошо, без вступления» звучит неловко | Приглашение не принято. Ты не в группе «Квартира». Передумаешь — открой приглашение ещё раз. | Invitación no aceptada. No estás en «Piso». Si cambias de idea, abre la invitación otra vez. | Invitation not accepted. You’re not in “Flat”. If you change your mind, open the invitation again. |
| 17 | `group-join-done` | ок |  |  |  |  |
| 18 | `group-join-invalid` | ок |  |  |  |  |
| 19 | `group-join-wait` | сдвиг колонок | es/en этой строки — от соседней; нужен перевод «Зовёт Лена» |  | Te invita Lena | Lena invited you |
| 20 | `group-join-wait` | не UI | описание карточки (колонки сдвинуты) |  |  |  |
| 21 | `group-join-wait` | не UI | служебная пометка |  |  |  |
| 22 | `group-join` | сдвиг колонок | es/en этой строки — от соседней; нужен перевод «Зовёт Лена» |  | Te invita Lena | Lena invited you |
| 23 | `group-join` | не UI | описание карточки (колонки сдвинуты) |  |  |  |
| 24 | `group-join` | не UI | служебная пометка |  |  |  |
| 25 | `group-leave-confirm` | правка (es/en) | es «elige automáticamente» неясно; en тяжеловато |  | Al salir, quien administra elige a la nueva persona admin o deja que se elija sola: lo será quien lleve más tiempo en el grupo. | When leaving, the admin picks a new admin or lets it happen automatically: the longest-standing member becomes admin. |
| 26 | `group-leave-confirm` | правка (es) | время: «se borran» → «se borrarán», как в ru/en |  | Cuando salga la última persona, el grupo y sus mensajes se borrarán. |  |
| 27 | `group-leave-confirm` | юрист — не трогаю | | | | |
| 28 | `group-leave-confirm` | ок |  |  |  |  |
| 29 | `group-limit-inline` | сдвиг колонок | ru от соседней строки; es — «hora local» |  | El límite de Parrlo de hoy se ha acabado. Los chats normales funcionan. Se reinicia mañana a las 00:00 (hora local). |  |
| 30 | `group-limit-inline` | нужен es/en | только ru; дан es/en | | El límite de Parrlo de hoy se ha acabado. Los chats normales funcionan. Se reinicia mañana a las 00:00 (hora local). | Today’s Parrlo limit has run out. Regular chats work. Resets tomorrow at 00:00 your time. |
| 31 | `group-limit` | сдвиг колонок | es «hora local» |  | Se reinicia mañana a las 00:00 (hora local) |  |
| 32 | `group-limit` | сдвиг колонок | ru/es/en от разных строк; тексты ок |  |  |  |
| 33 | `group-limit` | ок |  |  |  |  |
| 34 | `group-members-empty` | ок |  |  |  |  |
| 35 | `group-members-menu` | правка (es/en) | es «elige automáticamente» неясно; en тяжеловато |  | Al salir, quien administra elige a la nueva persona admin o deja que se elija sola: lo será quien lleve más tiempo en el grupo. | When leaving, the admin picks a new admin or lets it happen automatically: the longest-standing member becomes admin. |
| 36 | `group-members-menu` | правка (es) | время: «se borran» → «se borrarán», как в ru/en |  | Cuando salga la última persona, el grupo y sus mensajes se borrarán. |  |
| 37 | `group-members-menu` | юрист — не трогаю | | | | |
| 38 | `group-members-remove` | правка (es/en) | es «elige automáticamente» неясно; en тяжеловато |  | Al salir, quien administra elige a la nueva persona admin o deja que se elija sola: lo será quien lleve más tiempo en el grupo. | When leaving, the admin picks a new admin or lets it happen automatically: the longest-standing member becomes admin. |
| 39 | `group-members-remove` | правка (es) | время: «se borran» → «se borrarán», как в ru/en |  | Cuando salga la última persona, el grupo y sus mensajes se borrarán. |  |
| 40 | `group-members-remove` | юрист — не трогаю | | | | |
| 41 | `group-members-remove` | ок |  |  |  |  |
| 42 | `group-members` | правка (es/en) | es «elige automáticamente» неясно; en тяжеловато |  | Al salir, quien administra elige a la nueva persona admin o deja que se elija sola: lo será quien lleve más tiempo en el grupo. | When leaving, the admin picks a new admin or lets it happen automatically: the longest-standing member becomes admin. |
| 43 | `group-members` | правка (es) | время: «se borran» → «se borrarán», как в ru/en |  | Cuando salga la última persona, el grupo y sus mensajes se borrarán. |  |
| 44 | `group-members` | юрист — не трогаю | | | | |
| 45 | `group-parrlo-off` | ок |  |  |  |  |
| 46 | `group-parrlo-off` | правка + es/en | «запрещены админом» резко → «отключены»; es/en в файле от другой строки | Админ отключил ИИ-помощников в этой группе. Parrlo здесь не работает. | Quien administra el grupo ha desactivado los asistentes de IA. Parrlo no funciona aquí. | The admin has turned off AI assistants in this group. Parrlo doesn’t work here. |
| 47 | `group-parrlo-off` | сдвиг колонок | подписи ок |  |  |  |
| 48 | `group-parrlo-off` | не UI | вопрос для дизайна |  |  |  |
| 49 | `group-parrlo` | ок |  |  |  |  |
| 50 | `group-parrlo` | ок |  |  |  |  |
| 51 | `group-parrlo` | ок |  |  |  |  |
| 52 | `group-successor-confirm` | правка + es/en | «нового админа» дважды; в es/en перевода нет | Ты — админ группы «Квартира». Перед выходом передай роль админа: вместе с ней передаётся доступ к разделу «Участники и права». | Administras «Piso». Antes de salir, pasa la administración a otra persona: con ella pasa el acceso a «Participantes y permisos». | You’re the admin of “Flat”. Before leaving, hand over the admin role — access to “Members and permissions” goes with it. |
| 53 | `group-successor-confirm` | ок |  |  |  |  |
| 54 | `group-successor-confirm` | ок |  |  |  |  |
| 55 | `group-successor` | правка + es/en | «нового админа» дважды; в es/en перевода нет | Ты — админ группы «Квартира». Перед выходом передай роль админа: вместе с ней передаётся доступ к разделу «Участники и права». | Administras «Piso». Antes de salir, pasa la administración a otra persona: con ella pasa el acceso a «Participantes y permisos». | You’re the admin of “Flat”. Before leaving, hand over the admin role — access to “Members and permissions” goes with it. |
| 56 | `group-successor` | черновик | черновик по названию экрана — в источнике ячейка пустая; сверить с макетом; по смыслу №25 (автоматический выбор админа) | Если не выберешь, админом станет тот, кто дольше всех в группе. | Si no eliges, administrará quien lleve más tiempo en el grupo. | If you don’t choose, the longest-standing member becomes admin. |
| 57 | `group-syslines` | правка + es/en | настоящее время «добавляет» в системной строке странно; форма как у «Выход из группы: …» — без рода | Добавление в группу: Marco · Лена | Lena ha añadido a Marco al grupo | Lena added Marco to the group |
| 58 | `group-syslines` | правка + es/en | то же | Исключение из группы: Петя · Лена | Lena ha sacado a Petya del grupo | Lena removed Petya from the group |
| 59 | `group-syslines` | правка + es/en | то же | Новое название группы: «Квартира на Майор» · Marco | Marco ha cambiado el nombre del grupo a «Piso en Mayor» | Marco renamed the group to “Flat on Mayor” |
| 60 | `group` | нужен es/en | в файле только ru (колонки es/en сдвинуты) |  | Anna se ha unido al grupo | Anna joined the group |

## Листы, диалоги, меню (`redesign-ios/sheets/`) — 57

| № | Экран | Итог | Почему | ru | es | en |
|---|---|---|---|---|---|---|
| 1 | `chat-photo-sheet` | ок | NBSP: «10 фото», «10 МБ» |  |  |  |
| 2 | `chat-photo-sheet` | ок |  |  |  |  |
| 3 | `chat-photo-sheet` | ок |  |  |  |  |
| 4 | `chat-photo-viewer` | ок |  |  |  |  |
| 5 | `chat-photo-viewer` | ок |  |  |  |  |
| 6 | `chat-photo-viewer` | ок |  |  |  |  |
| 7 | `chat-tr-sheet-group` | не UI | пример сообщения в макете |  |  |  |
| 8 | `chat-tr-sheet-group` | не UI | пример сообщения в макете |  |  |  |
| 9 | `chat-tr-sheet-off` | ок |  |  |  |  |
| 10 | `chat-tr-sheet-off` | ок |  |  |  |  |
| 11 | `chat-tr-sheet-off` | ок |  |  |  |  |
| 12 | `ctx-chat` | не UI | пример сообщения в макете |  |  |  |
| 13 | `ctx-chat` | не UI | пример сообщения в макете |  |  |  |
| 14 | `err-offline-banner` | ок |  |  |  |  |
| 15 | `err-offline-banner` | не UI | пример сообщения в макете |  |  |  |
| 16 | `err-offline-banner` | не UI | пример сообщения в макете |  |  |  |
| 17 | `err-offline-banner` | ок |  |  |  |  |
| 18 | `err-offline-banner` | ок |  |  |  |  |
| 19 | `err-reject-blocked` | правка (ru) | единый шаблон ошибок «Не получилось …» (решение оркестратора 22.11) | Не получилось доставить сообщение. |  |  |
| 20 | `err-reject-blocked` | ок |  |  |  |  |
| 21 | `err-reject-blocked` | ок |  |  |  |  |
| 22 | `err-reject-toolong` | ок |  |  |  |  |
| 23 | `err-reject-toolong` | ок |  |  |  |  |
| 24 | `err-reject-toolong` | ок |  |  |  |  |
| 25 | `err-send` | ок | es/en уточняют «один раз»; ru «отправим ещё раз» — то же по смыслу |  |  |  |
| 26 | `err-send` | ок |  |  |  |  |
| 27 | `err-send` | ок |  |  |  |  |
| 28 | `home-menu` | не UI | пример сообщения в макете |  |  |  |
| 29 | `home-menu` | не UI | пример сообщения в макете |  |  |  |
| 30 | `limit-err-call` | ок |  |  |  |  |
| 31 | `limit-err-call` | правка (es) | «hora local», «Se reinicia» |  | El límite de llamadas de hoy se ha acabado. Los chats normales funcionan. Se reinicia mañana a las 00:00 (hora local) |  |
| 32 | `limit-err-call` | ок |  |  |  |  |
| 33 | `limit-err-parrlo` | не UI | пример сообщения в макете |  |  |  |
| 34 | `limit-err-parrlo` | не UI | пример сообщения в макете |  |  |  |
| 35 | `limit-err-parrlo` | ок |  |  |  |  |
| 36 | `limit-err-parrlo` | правка (es) | то же |  | El límite de Parrlo de hoy se ha acabado. Los chats normales funcionan. Se reinicia mañana a las 00:00 (hora local) |  |
| 37 | `limit-err-parrlo` | ок |  |  |  |  |
| 38 | `limit-err-week` | не UI | пример сообщения в макете |  |  |  |
| 39 | `limit-err-week` | не UI | пример сообщения в макете |  |  |  |
| 40 | `limit-err-week` | ок |  |  |  |  |
| 41 | `limit-err-week` | правка (es) | то же |  | El límite semanal de Parrlo se ha acabado. Los chats normales funcionan. Se reinicia el lunes a las 00:00 (hora local) |  |
| 42 | `limit-err-week` | ок |  |  |  |  |
| 43 | `report-message-illegal` | юрист — не трогаю | | | | |
| 44 | `report-message-illegal` | не UI | пометка юриста (решает юрист) |  |  |  |
| 45 | `report-message-illegal` | юрист — не трогаю | | | | |
| 46 | `report-message-illegal` | не UI | пометка юриста |  |  |  |
| 47 | `report-message-illegal` | юрист — не трогаю | | | | |
| 48 | `report-message-illegal` | не UI | пометка юриста |  |  |  |
| 49 | `report-message` | юрист — не трогаю | | | | |
| 50 | `report-message` | не UI | пометка юриста (решает юрист) |  |  |  |
| 51 | `report-message` | юрист — не трогаю | | | | |
| 52 | `report-message` | не UI | пометка юриста |  |  |  |
| 53 | `report-message` | юрист — не трогаю | | | | |
| 54 | `report-message` | не UI | пометка юриста |  |  |  |
| 55 | `report-sent` | юрист — не трогаю | | | | |
| 56 | `report-sent` | юрист — не трогаю | | | | |
| 57 | `report-sent` | юрист — не трогаю | | | | |
