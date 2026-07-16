import { defineConfig, devices } from "@playwright/test";

const port = 3100;
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  timeout: 90_000,
  expect: { timeout: 15_000 },
  globalSetup: "./e2e/global-setup.ts",
  globalTeardown: "./e2e/global-teardown.ts",
  use: {
    baseURL,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  webServer: {
    command: process.env.CI
      ? `npm run start -- --hostname 127.0.0.1 --port ${port}`
      : `npm run build && npm run start -- --hostname 127.0.0.1 --port ${port}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      BUILDPIXIES_DISABLE_FILE_STORE: "0",
      BUILDPIXIES_ENABLE_ANON_AUTH: "0",
      BUILDPIXIES_LOCAL_STORE_NAMESPACE: "e2e",
      BUILDPIXIES_REQUIRE_SUPABASE: "0",
      BUILDPIXIES_USE_VERCEL_QUEUE: "0",
      NEXT_PUBLIC_BUILDPIXIES_ENABLE_ANON_AUTH: "0",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "",
      NEXT_PUBLIC_SUPABASE_URL: "",
      OPENROUTER_API_KEY: "",
      OPENROUTER_BASE_URL: "",
      OPENROUTER_MODEL: "",
      OPENAI_API_KEY: "",
      SUPABASE_SERVICE_ROLE_KEY: "",
      VERCEL: "",
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
