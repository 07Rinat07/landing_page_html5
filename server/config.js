import dotenv from "dotenv";

dotenv.config();

function toNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

const nodeEnv = process.env.NODE_ENV ?? "development";
const isProduction = nodeEnv === "production";

export const config = {
  app: {
    env: nodeEnv,
    isProduction,
    port: toNumber(process.env.PORT, 8787),
    publicUrl: process.env.PUBLIC_URL ?? "http://localhost:5173"
  },
  cors: {
    origin: process.env.CORS_ORIGIN ?? "http://localhost:5173"
  },
  csrf: {
    cookieName: "csrf_token",
    ttlMs: toNumber(process.env.CSRF_TTL_MS, 60 * 60 * 1000)
  },
  rateLimit: {
    windowMs: toNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
    max: toNumber(process.env.RATE_LIMIT_MAX, 20)
  },
  captcha: {
    provider: process.env.CAPTCHA_PROVIDER ?? "mock",
    turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY ?? "",
    turnstileSiteKey: process.env.TURNSTILE_SITE_KEY ?? "",
    mockToken: process.env.CAPTCHA_MOCK_TOKEN ?? "dev-captcha-pass"
  },
  integrations: {
    crmWebhookUrl: process.env.CRM_WEBHOOK_URL ?? "",
    analyticsScriptUrl: process.env.ANALYTICS_SCRIPT_URL ?? ""
  }
};
