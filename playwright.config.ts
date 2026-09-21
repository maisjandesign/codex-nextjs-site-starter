import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: { baseURL: 'http://127.0.0.1:4179', browserName: 'chromium', trace: 'retain-on-failure' },
  webServer: {
    command: 'npm run start -- --port 4179',
    url: 'http://127.0.0.1:4179',
    reuseExistingServer: false,
    timeout: 120000,
  },
});
