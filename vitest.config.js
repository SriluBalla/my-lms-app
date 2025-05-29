// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/tests/setup/vitest.setup.js', // adjust if moved
    include: ['src/**/*.test.{js,jsx,ts,tsx}', 'tests/**/*.test.{js,ts,jsx,tsx}'],

    coverage: {
      reporter: ['text', 'html', 'json-summary'], // you can add 'lcov' too
      reportsDirectory: './coverage',
      exclude: ['**/tests/**', '**/__mocks__/**', '**/vite.config.js', '**/vitest.config.js'],
    },
  },
});
