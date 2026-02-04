# landing_page_html5

Проект прошел рефакторинг (полностью переписал) Современный одностраничный сайт на `Vite + ES modules + SCSS/PostCSS` с API для заявок,
безопасностью, тестами и Docker-рантаймом.

## Что уже сделано

- Стабилизация: валидная семантическая структура, `http -> https`, базовая доступность, рабочие CTA и форма.
- SEO-база: `description`, Open Graph, canonical, `favicon`, `robots.txt`, `sitemap.xml`.
- Архитектура: код разделен на `src/components`, `src/scripts`, `src/styles`, `src/content`.
- Контент вынесен в `src/content/site.ru.json`.
- Безопасность API: server-side валидация, CSRF, rate limit, captcha (mock/turnstile), логирование, security headers.
- Интеграции через env: CRM webhook + публичный конфиг для аналитики.
- Тесты: Vitest (unit), Playwright (e2e + mobile), axe (a11y), Lighthouse CI.
- Исправлена выдача `captchaMockToken` для режима `CAPTCHA_PROVIDER=mock` (включая Docker/CI), чтобы форма и e2e работали стабильно.

## Требования

- Node.js 22+
- npm 10+
- Docker 24+
- Docker Compose V2

## Быстрый старт (локально)

```bash
npm install
npm run dev
```

Приложение:

- Frontend (лендинг): http://localhost:5173
- API (только backend): http://localhost:8787
- Health API: http://localhost:8787/api/health

Важно: в режиме `npm run dev` адрес `http://localhost:8787/#cases` не покажет страницу, потому что порт `8787` отдает только API.
Секция `#cases` доступна на `http://localhost:5173/#cases`.

Если нужно открыть сайт именно на `8787`, запустите production-режим:

```bash
npm run build
npm run start
```

Тогда лендинг будет доступен по `http://localhost:8787/#cases`.

## Запуск в Docker

```bash
docker compose up --build -d
```

Приложение: http://localhost:8080

Health: http://localhost:8080/api/health

Остановить:

```bash
docker compose down
```

Если порт занят:

```bash
LANDING_PORT=18080 docker compose up --build -d
```

## Основные команды (локально)

```bash
npm run lint           # eslint + stylelint + prettier --check
npm run format         # prettier --write
npm run build          # production build
npm run start          # запуск production сервера
npm run test:unit      # unit тесты (Vitest)
npm run test:e2e       # e2e тесты (Playwright)
npm run test:a11y      # accessibility тест (axe)
npm test               # весь тестовый набор подряд
npm run test:lighthouse
```

## Как запустить все тесты локально

Подготовка (один раз):

```bash
npm install
npx playwright install
```

Запуск полного набора тестов:

```bash
npm test
```

Запуск по отдельности:

```bash
npm run test:unit
npm run test:e2e
npm run test:a11y
```

## Команды в Docker

Запуск сайта в Docker:

```bash
docker compose up --build -d
```

Проверка, что контейнер и API живы:

```bash
docker compose ps
curl http://localhost:8080/api/health
curl http://localhost:8080/api/config
```

Остановка:

```bash
docker compose down
```

Полный набор тестов (`lint + unit + e2e + a11y + build`) в Docker-контейнере:

```bash
docker run --rm -t -v "$PWD":/work -w /work mcr.microsoft.com/playwright:v1.55.0-jammy \
  bash -lc "npm ci && npm run lint && npm test && npm run build"
```

Примечание: основной контейнер из `docker compose` — production-рантайм, в нем нет dev-зависимостей (Vitest/Playwright), поэтому `npm test` внутри него не запускается.

## Переменные окружения

Скопируйте `.env.example` в `.env` и заполните значения.

Ключевые параметры:

- `PORT` — порт API/production-сервера (по умолчанию `8787`, в Docker переопределяется `8080`).
- `CAPTCHA_PROVIDER` — `mock` (локально) или `turnstile`.
- `CAPTCHA_MOCK_TOKEN` — токен для режима `mock` (используется в локальном запуске, e2e и Docker smoke).
- `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` — ключи Turnstile.
- `CRM_WEBHOOK_URL` — URL webhook для отправки лидов в CRM.
- `PUBLIC_URL` — канонический URL сайта.

## Структура проекта

```text
src/
  components/
  scripts/
  styles/
  content/
server/
  routes/
  security/
  services/
  validation/
public/
  favicon.svg
  robots.txt
  sitemap.xml
docs/
  architecture.md
  integrations.md
  testing.md
tests/
  unit/
  e2e/
```

## Документация

- Архитектура: `docs/architecture.md`
- Интеграции: `docs/integrations.md`
- Тестирование: `docs/testing.md`

## CI (GitHub Actions)

В проект добавлен workflow: `.github/workflows/ci.yml`.

На каждом `push` и `pull_request` автоматически выполняются:

1. **Local Runtime Check**
   - `npm ci`
   - `npm run lint`
   - `npm run build`
   - `npm run test:unit`
   - smoke-проверка запуска приложения (`http://127.0.0.1:5173` и `http://127.0.0.1:8787/api/health`)
2. **Docker Build Check**
   - сборка Docker-образа
   - запуск контейнера
   - smoke-проверка (`http://127.0.0.1:18080` и `http://127.0.0.1:18080/api/health`)
