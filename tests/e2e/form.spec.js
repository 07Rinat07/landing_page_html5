import { expect, test } from "@playwright/test";

test("форма заявки отправляется", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("textbox", { name: "Имя *" }).fill("Тестовый клиент");
  await page.getByRole("textbox", { name: "Email *" }).fill("client@example.com");
  await page.getByRole("textbox", { name: "Телефон" }).fill("+7 705 000 11 22");
  await page
    .getByRole("textbox", { name: "Комментарий *" })
    .fill("Нужна оценка участка и график работ на сезон.");
  await page
    .getByRole("checkbox", { name: "Согласен(а) с обработкой персональных данных" })
    .check();

  await page.getByRole("button", { name: "Отправить заявку" }).click();

  await expect(page.locator("#formStatus")).toContainText("Заявка отправлена");
});
