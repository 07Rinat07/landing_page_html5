import { describe, expect, it } from "vitest";

import { parseLeadPayload } from "../../server/validation/lead.js";

describe("lead payload validation", () => {
  it("accepts valid payload", () => {
    const result = parseLeadPayload({
      name: "Иван Петров",
      email: "ivan@example.com",
      phone: "+7 705 123 45 67",
      message: "Нужен аудит участка и план озеленения.",
      consent: true,
      captchaToken: "dev-captcha-pass"
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid payload", () => {
    const result = parseLeadPayload({
      name: "И",
      email: "bad-email",
      phone: "!!!",
      message: "коротко",
      consent: false,
      captchaToken: ""
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThan(0);
    }
  });
});
