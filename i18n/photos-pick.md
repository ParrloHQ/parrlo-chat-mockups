# Фото в чате — строки группы `pick`

Экраны: `chat-photo-sheet`, `chat-photo-preview`, `chat-photo-preview-max`. Все строки **не утверждены**. В кадрах пометка `pc-tbd` стоит у подписи с лимитами в листе и у подсказки «до 10 фото». Неразрывные пробелы: «10 фото», «10 МБ», «N фото» в заголовке и в подписи кнопки, «за раз». В шапке чата «по‑испански» набрано с U+2011. Генератор: `gen-photos-pick.py`.

| Ключ | ru | es | en | Где |
|---|---|---|---|---|
| `composer.attach.a11y` | Добавить фото | Añadir foto | Add photo | Кнопка в поле ввода (aria-label). Тот же ключ, что в группе `send` |
| `photo.sheet.a11y` | Отправить фото | Enviar fotos | Send photos | Имя листа или поповера (aria-label) |
| `photo.sheet.library` | Фото | Fotos | Photos | Пункт 1: выбрать из галереи |
| `photo.sheet.camera` | Камера | Cámara | Camera | Пункт 2: iOS и телефонный веб (w360, w390) |
| `photo.sheet.location` | Место | Ubicación | Location | Пункт 3, только iOS (se, pro): отправить своё местоположение. Подписи нет — у пунктов 1 и 2 её тоже нет, поэтому `photo.sheet.location.sub` не используется. Местоположение — уже в приложении; решение по месту в листе — 18.11, третья строка |
| `photo.sheet.computer` | С компьютера | Desde el ordenador | From computer | Пункт 2, только десктопный веб (d14): выбор файла |
| `photo.sheet.limits` | До 10 фото, каждое до 10 МБ | Hasta 10 fotos, cada una de hasta 10 MB | Up to 10 photos, each up to 10 MB | Подпись под пунктами |
| `common.cancel` | Отмена | Cancelar | Cancel | Кнопка под листом (compact). На десктопе её нет, закрытие по Esc или щелчку мимо |
| `photo.preview.title` | %d фото | %d fotos | %d photos | Заголовок превью. В ru «фото» не склоняется, plural не нужен. В es и en для 1 нужна форма `1 foto` / `1 photo` |
| `common.close` | Закрыть | Cerrar | Close | Крестик превью (aria-label) |
| `photo.preview.remove.a11y` | Убрать это фото | Quitar esta foto | Remove this photo | Корзина в шапке: убирает текущее фото из выбора |
| `photo.preview.add.a11y` | Добавить ещё фото | Añadir más fotos | Add more photos | Плитка «+» в полосе миниатюр |
| `photo.preview.thumb.a11y` | Фото %1$d из %2$d | Foto %1$d de %2$d | Photo %1$d of %2$d | Миниатюра (aria-label). Номер выбора на миниатюре только визуальный |
| `photo.preview.caption` | Подпись — собеседник прочитает в переводе | Pie de foto — la otra persona lo leerá traducido | Caption — the other person will read it translated | Плейсхолдер поля подписи |
| `photo.preview.send.a11y` | Отправить %d фото | Enviar %d fotos | Send %d photos | Кнопка отправки со счётчиком (aria-label) |
| `photo.preview.max` | Можно отправить до 10 фото за раз | Puedes enviar hasta 10 fotos a la vez | You can send up to 10 photos at a time | Подсказка, когда выбрано 10. «+» неактивен (`disabled` и `aria-describedby` на подсказку) |

Тексты без рода: «собеседник» взят из брифа (общее слово). В es «la otra persona» и в en «the other person» тоже без рода.
