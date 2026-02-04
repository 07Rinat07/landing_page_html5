# Тестирование

## Набор тестов

- **Unit (Vitest):** проверка валидации payload для `/api/lead`.
- **E2E (Playwright):** навигация, отправка формы, мобильный сценарий.
- **Accessibility (axe):** автоматическая проверка серьезных a11y проблем.
- **Lighthouse CI:** бюджеты качества (performance/seo/accessibility/best-practices).

## Команды

```bash
npm test
npm run test:unit
npm run test:e2e
npm run test:a11y
npm run test:lighthouse
```

`npm test` последовательно запускает unit + e2e + a11y сценарии.

## Что проверять перед релизом

1. `npm run lint`
2. `npm run test:unit`
3. `npm run test:e2e`
4. `npm run test:a11y`
5. `npm run build`
6. smoke-тест в Docker (`docker compose up --build -d`)

## Частые причины падений

- Неверный captcha режим (`turnstile` без секретов).
- Для `CAPTCHA_PROVIDER=mock` в `/api/config` должен возвращаться `captchaMockToken`.
- Слишком жесткие лимиты rate limit в тестовой среде.
- Изменение контента без обновления e2e-селекторов.

## Последний прогон (2026-02-04)

- `npm run lint` — без ошибок.
- `npm test` — успешно:
  - Unit: 4/4
  - E2E: 4/4
  - A11y: 2/2
- `npm run build` — успешно.
