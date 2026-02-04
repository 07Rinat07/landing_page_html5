import path from "node:path";
import { fileURLToPath } from "node:url";

import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import pino from "pino";
import pinoHttp from "pino-http";

import { config } from "./config.js";
import { createApiRouter } from "./routes/api.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "..", "dist");

const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  redact: {
    paths: ["req.headers.cookie", "req.headers.authorization", "body.email"],
    remove: true
  }
});

const app = express();

app.use(pinoHttp({ logger }));
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": ["'self'", "https://challenges.cloudflare.com"],
        "frame-src": ["'self'", "https://challenges.cloudflare.com"],
        "img-src": ["'self'", "data:", "https:"],
        "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        "font-src": ["'self'", "https://fonts.gstatic.com"]
      }
    },
    hsts: config.app.isProduction
      ? {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true
        }
      : false,
    referrerPolicy: {
      policy: "strict-origin-when-cross-origin"
    }
  })
);

app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

app.use("/api", createApiRouter({ config, logger }));

if (config.app.isProduction) {
  app.use(express.static(distPath, { extensions: ["html"] }));

  app.get("/{*path}", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }

    return res.sendFile(path.resolve(distPath, "index.html"));
  });
}

app.use((err, req, res, _next) => {
  req.log?.error({ err }, "Неперехваченное исключение");
  res.status(500).json({ message: "Внутренняя ошибка сервера" });
});

app.listen(config.app.port, () => {
  logger.info(
    {
      port: config.app.port,
      env: config.app.env
    },
    "Сервер запущен"
  );
});
