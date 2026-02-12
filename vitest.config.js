import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: ['node_modules/', 'src/tests/', '**/*.config.js', '**/dist/**'],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
    include: ['src/**/*.test.js', 'src/**/*.spec.js'],
  },
});
