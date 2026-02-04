# Интеграции

## Общий принцип

Все интеграции управляются переменными окружения. Хардкод в коде отсутствует.

## CRM webhook

Переменная:

- `CRM_WEBHOOK_URL`

Поведение:

- Если URL задан, каждый валидный лид отправляется `POST` запросом в JSON.
- При ошибке webhook лид не теряется: он уже сохранен в `logs/leads.log`.

## Captcha

Поддерживаются 2 режима:

1. `CAPTCHA_PROVIDER=mock`
   - Для локальной разработки и e2e.
   - Токен берется из `CAPTCHA_MOCK_TOKEN`.
   - `/api/config` возвращает `captchaMockToken` всегда при режиме `mock` (независимо от `NODE_ENV`), чтобы локальный Docker и CI работали одинаково.

2. `CAPTCHA_PROVIDER=turnstile`
   - Для production.
   - Требуются `TURNSTILE_SITE_KEY` и `TURNSTILE_SECRET_KEY`.

## Аналитика

- `ANALYTICS_SCRIPT_URL` доступен на клиенте через `/api/config`.
- Подключение аналитики можно реализовать условно в `src/main.js`, не меняя API.

## Рекомендации для production

- Хранить `.env` в секретах CI/CD.
- Включить real captcha (`turnstile`).
- Проксировать приложение через TLS-терминатор.
- Настроить централизованный сбор логов (ELK/Datadog/Grafana Loki).
