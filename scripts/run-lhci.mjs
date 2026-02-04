import { spawn } from "node:child_process";

import { chromium } from "playwright";

const chromePath = chromium.executablePath();

const child = spawn("npx", ["lhci", "autorun", "--config=.lighthouserc.json"], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    CHROME_PATH: chromePath
  }
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
