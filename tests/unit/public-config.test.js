import { describe, expect, it } from "vitest";

import { makePublicConfig } from "../../server/routes/api.js";

describe("public config", () => {
  it("exposes mock captcha token when mock provider is active", () => {
    const result = makePublicConfig({
      captcha: {
        provider: "mock",
        turnstileSiteKey: "",
        mockToken: "dev-captcha-pass"
      },
      integrations: {
        analyticsScriptUrl: ""
      }
    });

    expect(result).toEqual({
      captchaProvider: "mock",
      captchaSiteKey: "",
      captchaMockToken: "dev-captcha-pass",
      analyticsScriptUrl: ""
    });
  });

  it("does not expose mock token for turnstile provider", () => {
    const result = makePublicConfig({
      captcha: {
        provider: "turnstile",
        turnstileSiteKey: "site-key",
        mockToken: "dev-captcha-pass"
      },
      integrations: {
        analyticsScriptUrl: "https://example.com/analytics.js"
      }
    });

    expect(result).toEqual({
      captchaProvider: "turnstile",
      captchaSiteKey: "site-key",
      captchaMockToken: "",
      analyticsScriptUrl: "https://example.com/analytics.js"
    });
  });
});
