import { defineConfig } from '@playwright/test';

export default defineConfig({
   testDir: './tests/e2e',
  timeout: 30 * 1000,
  use: {
    baseURL: 'http://localhost:5173',
    storageState: 'tests/storageState.json', // 👈 Inject here
    headless: true,
  },
  testDir: './src/tests/e2e',
});


