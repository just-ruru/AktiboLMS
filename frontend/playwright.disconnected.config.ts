import { defineConfig, devices } from '@playwright/test'

/**
 * Runs the contract-state specs against a server started without the local
 * profile fixture, so screens can be verified in their disconnected state.
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.disconnected.spec.ts',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:5181',
    trace: 'retain-on-failure',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'set VITE_ENABLE_MOCK_DATA=false && npm run dev -- --host 127.0.0.1 --port 5181',
    url: 'http://127.0.0.1:5181',
    reuseExistingServer: true,
    timeout: 30_000,
  },
})
