import js from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
  {
    ignores: [
      "css/**",
      "js/**",
      "img/**",
      "dist/**",
      "node_modules/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**"
    ]
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        FormData: "readonly",
        fetch: "readonly",
        history: "readonly",
        URLSearchParams: "readonly",
        process: "readonly"
      }
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
    }
  },
  {
    files: [
      "server/**/*.js",
      "tests/**/*.js",
      "scripts/**/*.mjs",
      "playwright.config.js",
      "vite.config.js"
    ],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        setTimeout: "readonly"
      }
    },
    rules: {
      "no-console": "off"
    }
  },
  prettier
];
