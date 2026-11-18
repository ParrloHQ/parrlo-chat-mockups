# Вход: ошибка Google / ошибка Apple — строки (iOS)

Экраны: `ob-signin-google-error`, `ob-signin-apple-error` — `frames/{ru,es,en}-<экран>.html`, кадры `se-n`, `se-xl`, `pro-n`, `pro-xl`, только тёмная тема. PNG @2×: `png/{ru,es,en}/<экран>/{se-n,se-xl,pro-n,pro-xl}.png`.
Клон `ob-signin-offline`: тот же шаг 3 из 6, баннер `pc-banner--err` под подзаголовком, кнопки «Продолжить с Apple» / «Продолжить с Google» внизу остаются. В баннере одна текстовая кнопка: повторяет вход тем же способом (Google — для `google`, Apple — для `apple`). Второй способ входа — обычная кнопка внизу.

Тексты баннеров утверждены (метки «не утверждено» на баннере нет). Метки у юридического текста под баннером — как в шаблоне.
Неразрывные пробелы (U+00A0): «через Google», «через Apple», «ещё раз», «con Google», «con Apple», «with Google», «with Apple».

| ключ | RU | ES | EN | примечание |
|---|---|---|---|---|
| `signin.google.error.title` | Не получилось войти через Google | No se pudo iniciar sesión con Google | Couldn’t sign in with Google | заголовок баннера, `role="alert"` |
| `signin.google.error.body` | Попробуй ещё раз — или войди через Apple. | Inténtalo de nuevo o entra con Apple. | Try again, or sign in with Apple. | текст баннера |
| `signin.google.error.retry` | Повторить | Reintentar | Retry | текстовая кнопка в баннере, снова вход через Google. aria-label: «Повторить вход через Google» / «Reintentar con Google» / «Retry with Google» |
| `signin.apple.error.title` | Не получилось войти через Apple | No se pudo iniciar sesión con Apple | Couldn’t sign in with Apple | заголовок баннера, `role="alert"` |
| `signin.apple.error.body` | Попробуй ещё раз — или войди через Google. | Inténtalo de nuevo o entra con Google. | Try again, or sign in with Google. | текст баннера |
| `signin.apple.error.retry` | Повторить | Reintentar | Retry | текстовая кнопка в баннере, снова вход через Apple. aria-label: «Повторить вход через Apple» / «Reintentar con Apple» / «Retry with Apple» |

EN: кнопка — «Retry», а не «Try again», чтобы не повторять начало текста.
