import { expect, test } from "@playwright/test";

test("навигация и ключевые секции доступны", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("navigation", { name: "Основная навигация" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Запускаем ухоженные пространства"
  );

  await page.getByRole("link", { name: "Кейсы", exact: true }).click();
  await expect(page).toHaveURL(/#cases/);
  await expect(page.getByRole("heading", { name: "Последние проекты" })).toBeVisible();
});
