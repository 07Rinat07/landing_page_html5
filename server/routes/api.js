import crypto from "node:crypto";

import { Router } from "express";
import rateLimit from "express-rate-limit";

import { verifyCaptcha } from "../security/captcha.js";
import { processLead } from "../services/leadService.js";
import { parseLeadPayload } from "../validation/lead.js";

export function makePublicConfig(config) {
  const shouldExposeMockToken = config.captcha.provider === "mock";

  return {
    captchaProvider: config.captcha.provider,
    captchaSiteKey: config.captcha.turnstileSiteKey,
    captchaMockToken: shouldExposeMockToken ? config.captcha.mockToken : "",
    analyticsScriptUrl: config.integrations.analyticsScriptUrl
  };
}

export function createApiRouter({ config, logger }) {
  const router = Router();

  const leadLimiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    limit: config.rateLimit.max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      message: "Слишком много запросов. Повторите попытку позже."
    }
  });

  router.get("/health", (_req, res) => {
    res.json({ status: "ok", env: config.app.env });
  });

  router.get("/config", (_req, res) => {
    res.json(makePublicConfig(config));
  });

  router.get("/csrf-token", (_req, res) => {
    const csrfToken = crypto.randomBytes(32).toString("hex");

    res.cookie(config.csrf.cookieName, csrfToken, {
      maxAge: config.csrf.ttlMs,
      httpOnly: true,
      sameSite: "strict",
      secure: config.app.isProduction
    });

    res.json({ csrfToken });
  });

  router.post("/lead", leadLimiter, async (req, res) => {
    const csrfFromCookie = req.cookies[config.csrf.cookieName];
    const csrfFromHeader = req.get("X-CSRF-Token");

    if (!csrfFromCookie || !csrfFromHeader || csrfFromCookie !== csrfFromHeader) {
      return res.status(403).json({ message: "CSRF проверка не пройдена" });
    }

    const parsedPayload = parseLeadPayload(req.body);

    if (!parsedPayload.success) {
      return res.status(400).json({
        message: "Проверьте корректность полей формы",
        errors: parsedPayload.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message
        }))
      });
    }

    const validCaptcha = await verifyCaptcha({
      token: parsedPayload.data.captchaToken,
      remoteIp: req.ip,
      captchaConfig: config.captcha,
      logger
    });

    if (!validCaptcha) {
      return res.status(400).json({ message: "Captcha не пройдена" });
    }

    const lead = {
      ...parsedPayload.data,
      createdAt: new Date().toISOString(),
      source: req.get("origin") || req.get("referer") || "unknown"
    };

    await processLead({ lead, config, logger });

    return res.status(201).json({ message: "Заявка принята" });
  });

  return router;
}
