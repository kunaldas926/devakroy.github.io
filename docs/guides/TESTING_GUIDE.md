# Testing & Quality Assurance Guide

## Overview

This document outlines the testing strategy, frameworks, and best practices for the portfolio application.

## Table of Contents

1. [Testing Strategy](#testing-strategy)
2. [Unit Tests](#unit-tests)
3. [Integration Tests](#integration-tests)
4. [E2E Tests](#e2e-tests)
5. [Running Tests](#running-tests)
6. [Coverage Reports](#coverage-reports)
7. [Best Practices](#best-practices)

## Testing Strategy

### Philosophy

- **Test-driven development**: Write tests before or alongside code
- **Comprehensive coverage**: Aim for 80%+ code coverage
- **Real-world scenarios**: Test actual user workflows
- **Performance**: Tests should be fast and reliable

### Testing Pyramid

```
        E2E Tests (10%)
       Integration (30%)
      Unit Tests (60%)
```

## Unit Tests

### Framework: Vitest

### File Structure

```
src/
├── utils.js
├── utils.test.js        # Unit tests
├── security.js
├── security.test.js
└── tests/
    ├── setup.js         # Test configuration
    ├── utils.test.js
    └── security.test.js
```

### Example Unit Test

```javascript
import { describe, it, expect } from 'vitest';
import { sanitizeHTML } from '../security.js';

describe('sanitizeHTML', () => {
  it('should remove script tags', () => {
    const input = '<p>Hello <script>alert("xss")</script> World</p>';
    const result = sanitizeHTML(input);
    expect(result).not.toContain('script');
  });

  it('should preserve safe HTML', () => {
    const input = '<p>Hello <strong>World</strong></p>';
    const result = sanitizeHTML(input);
    expect(result).toContain('Hello');
  });
});
```

### Running Unit Tests

```bash
# Run once
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# UI dashboard
npm run test:ui
```

## Integration Tests

### Purpose

Test how multiple components work together.

### Example Areas

- Form submission with validation
- Navigation with analytics tracking
- Service Worker with caching

### Running Integration Tests

Tests with `.integration.test.js` suffix are run automatically with `npm test`.

## E2E Tests

### Tools: Playwright (future enhancement)

### Example Test Path

```javascript
// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173,
  },
});
```

### Setup E2E Tests

```bash
npm install -D @playwright/test

# Run E2E tests
npx playwright test

# UI Mode
npx playwright test --ui
```

## Coverage Reports

### Current Coverage Goals

| Metric     | Target |
|------------|--------|
| Lines      | 80%    |
| Functions  | 80%    |
| Branches   | 80%    |
| Statements | 80%    |

### Generating Coverage

```bash
npm run test:coverage
```

Coverage reports are generated in `coverage/` directory:

- `index.html` - Interactive HTML report
- `lcov.info` - Format for CI/CD integration

### Viewing Coverage

```bash
# Open HTML report
open coverage/index.html

# Or use Python server
python -m http.server --directory coverage
```

## Best Practices

### 1. Test Naming

```javascript
// ✅ Good - describes what it tests
it('should validate email with special characters', () => {});

// ❌ Poor - vague
it('validates email', () => {});
```

### 2. Arrange-Act-Assert Pattern

```javascript
it('should sanitize HTML', () => {
  // Arrange
  const input = '<script>alert("xss")</script>';

  // Act
  const result = sanitizeHTML(input);

  // Assert
  expect(result).not.toContain('script');
});
```

### 3. Test Isolated Units

```javascript
// ✅ Good - tests one function
it('should add class to element', () => {
  const el = document.createElement('div');
  addClass(el, 'active');
  expect(hasClass(el, 'active')).toBe(true);
});

// ❌ Poor - tests multiple things
it('should add and remove classes', () => {
  // Tests two behaviors
});
```

### 4. Use Descriptive Assertions

```javascript
// ✅ Good
expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

// ❌ Poor
expect(validateEmail(email)).toBe(true);
```

### 5. Mock External Dependencies

```javascript
import { vi } from 'vitest';

it('should send analytics event', () => {
  const sendBeacon = vi.spyOn(navigator, 'sendBeacon');
  // Test code
  expect(sendBeacon).toHaveBeenCalled();
});
```

## Test Maintenance

### Keeping Tests Updated

1. Update tests when requirements change
2. Delete tests for removed features
3. Refactor tests when code is refactored
4. Keep test code as clean as production code

### Debugging Tests

```javascript
// Add debug logging
import { screen, debug } from '@testing-library/dom';

it('should display content', () => {
  // This will print the DOM
  debug();

  // This will print specific element
  const button = screen.getByRole('button');
  debug(button);
});
```

## CI/CD Integration

### GitHub Actions

Tests run automatically on:

- Push to `main` or `develop`
- Pull requests
- Scheduled (daily)

Results are:

- Posted to PR comments
- Uploaded to Codecov
- Available in workflow summary

### Local Testing Before Push

```bash
# Run all checks locally
npm run lint
npm run format
npm test
npm run build
```

## Performance Testing

### Measuring Test Performance

```bash
# Show slowest tests
npm test -- --reporter=verbose

# Profile tests
npm test -- --reporter=html
```

### Optimizing Tests

1. **Parallel execution**: Vitest runs tests in parallel by default
2. **Module caching**: Tests cache modules between runs
3. **Selective testing**: Run only affected tests
   ```bash
   npm test -- --grep "security"
   ```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Best Practices](https://testing-library.com/)
- [Jest Matchers](https://github.com/verifyjs/awesome-jest)

---

**Last Updated**: February 2026
