import { z } from "zod";

const PHONE_PATTERN = /^[0-9+()\-\s]{7,30}$/;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Имя должно содержать минимум 2 символа").max(80),
  email: z.email("Введите корректный email").max(120),
  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .transform((value) => value ?? "")
    .refine((value) => value === "" || PHONE_PATTERN.test(value), "Введите корректный телефон"),
  message: z.string().trim().min(10, "Комментарий слишком короткий").max(2000),
  consent: z.boolean().refine((value) => value, "Нужно дать согласие на обработку данных"),
  captchaToken: z.string().trim().min(1, "Подтвердите captcha")
});

export function parseLeadPayload(payload) {
  return leadSchema.safeParse(payload);
}
