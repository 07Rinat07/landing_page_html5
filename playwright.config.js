import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: "http://127.0.0.1:5173",
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] }
    }
  ],
  webServer: {
    command: "npm run dev",
    port: 5173,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
    env: {
      PORT: "8787",
      CAPTCHA_PROVIDER: "mock",
      CAPTCHA_MOCK_TOKEN: "dev-captcha-pass"
    }
  }
});
