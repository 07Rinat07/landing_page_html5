# Архитектура

## Цели

- Быстро менять контент без редактирования шаблона.
- Изолировать UI, бизнес-логику формы и серверные интеграции.
- Держать одинаковый путь запуска локально и в Docker.

## Слои

1. **Frontend (Vite)**
   - `src/components` — рендер секций страницы.
   - `src/content/site.ru.json` — контентный слой.
   - `src/scripts` — клиентские сценарии (навигация, работа с API, отправка формы).
   - `src/styles` — SCSS + PostCSS.

2. **Backend (Express API)**
   - `server/routes/api.js` — API-контракт (`/api/config`, `/api/csrf-token`, `/api/lead`, `/api/health`).
   - `server/validation/lead.js` — строгая валидация данных через Zod.
   - `server/security/captcha.js` — провайдер captcha (`mock`/`turnstile`).
   - `server/services/leadService.js` — логирование лида + интеграция в CRM webhook.

3. **Infrastructure**
   - `Dockerfile` — production контейнер (Node + собранный фронт + API).
   - `docker-compose.yml` — локальный orchestration.

## Поток заявки

1. Клиент открывает страницу и получает `/api/config`.
2. При отправке формы клиент запрашивает `/api/csrf-token`.
3. `POST /api/lead` проходит: CSRF -> валидация payload -> captcha -> запись в лог -> webhook CRM.
4. Клиент получает статус и сообщение об успехе/ошибке.

## Безопасность

- Helmet + CSP/HSTS/X-Frame-Options/Referrer-Policy/Permissions-Policy.
- CSRF проверка через cookie + заголовок.
- Rate limit на endpoint формы.
- Server-side validation до интеграций.

## Расширение

- Добавление новых секций: расширяем `src/content/site.ru.json` + компонент.
- Подключение новых интеграций: новые сервисы в `server/services` и env-конфиг.
- Мультиязычность: добавить `src/content/site.en.json` и переключатель контента.
