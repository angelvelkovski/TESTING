import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'html',
  use: {
    trace: 'on-first-retry', // Record trace only on test failure
    viewport: { width: 1280, height: 720 }, // ✅ Correct way to set defaults
  },
});
