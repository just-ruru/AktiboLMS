import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  // Contract-state specs run against a fixture-free server — see playwright.disconnected.config.ts
  testIgnore: '**/*.disconnected.spec.ts',
  fullyParallel: true,
  // A viewport sweep resizes the page and waits for the web fonts to settle at
  // every width; under a fully parallel run that can exceed the 30s default.
  timeout: 60_000,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:5173',
    trace: 'retain-on-failure',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 5173',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: true,
    timeout: 30_000,
  },
})
