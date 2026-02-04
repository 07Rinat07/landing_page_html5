export async function verifyCaptcha({ token, remoteIp, captchaConfig, logger }) {
  if (captchaConfig.provider === "mock") {
    return token === captchaConfig.mockToken;
  }

  if (captchaConfig.provider !== "turnstile") {
    logger.warn({ provider: captchaConfig.provider }, "Неизвестный captcha provider");
    return false;
  }

  if (!captchaConfig.turnstileSecretKey) {
    logger.error("TURNSTILE_SECRET_KEY не задан");
    return false;
  }

  const payload = new URLSearchParams({
    secret: captchaConfig.turnstileSecretKey,
    response: token,
    remoteip: remoteIp ?? ""
  });

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload
    });

    if (!response.ok) {
      logger.error({ status: response.status }, "Ошибка обращения к captcha провайдеру");
      return false;
    }

    const result = await response.json();
    return Boolean(result.success);
  } catch (error) {
    logger.error({ err: error }, "Исключение при верификации captcha");
    return false;
  }
}
