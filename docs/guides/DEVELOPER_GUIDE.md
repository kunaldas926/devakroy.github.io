# Developer Setup & Contribution Guide

## Getting Started

### Prerequisites

- **Node.js**: v18+ (check with `node --version`)
- **npm**: v9+ (check with `npm --version`)
- **Git**: Latest version
- **Editor**: VS Code recommended

### Initial Setup

```bash
# 1. Clone repository
git clone https://github.com/devakroy/devakroy.github.io.git
cd devakroy.github.io

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Start development server
npm run dev

# 5. Open in browser
# http://localhost:5173
```

## Development Workflow

### Running the Application

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Run tests
npm test

# Run linter
npm run lint

# Format code
npm run format
```

### Project Structure

```
devakroy.github.io/
├── src/
│   ├── app.js                 # Main app initialization
│   ├── config.js              # Configuration constants
│   ├── formHandler.js         # Form validation & submission
│   ├── lazyLoading.js         # Image lazy loading
│   ├── navigation.js          # Navigation menu handling
│   ├── ui.js                  # UI interactions & notifications
│   ├── utils.js               # Utility functions
│   ├── security.js            # Security utilities
│   ├── analytics.js           # Analytics & monitoring
│   ├── cookieConsent.js       # Cookie consent management
│   ├── serviceWorker.js       # PWA service worker
│   └── tests/                 # Test files
│       ├── setup.js
│       ├── security.test.js
│       └── utils.test.js
├── public/
│   ├── service-worker.js      # Service worker
│   ├── manifest.json          # PWA manifest
│   ├── _headers               # Security headers
│   ├── robots.txt             # SEO robots file
│   └── ...
├── images/                    # Static images
├── assets/                    # Resume & documents
├── index.html                 # Main HTML
├── script.js                  # Entry point
├── styles.css                 # Global styles
├── vite.config.js             # Vite configuration
├── vitest.config.js           # Testing configuration
├── package.json               # Project metadata
├── .eslintrc.json             # Linter config
├── .prettierrc.json           # Formatter config
└── ...documentation files
```

## Code Quality Standards

### Linting

```bash
# Check for issues
npm run lint

# Auto-fix most issues
npx eslint . --ext .js --fix
```

### Formatting

```bash
# Check formatting
npm run format -- --check

# Auto-format all files
npm run format
```

### Git Hooks (Pre-commit)

Future enhancement: Add husky for automatic linting before commits

```bash
npm install husky --save-dev
npx husky install

# Will prevent commits with linting errors
```

## Testing Workflow

### Writing Tests

```javascript
// src/tests/myFeature.test.js
import { describe, it, expect } from 'vitest';
import { myFunction } from '../myModule.js';

describe('myModule', () => {
  it('should do something', () => {
    const result = myFunction('input');
    expect(result).toBe('expected');
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Watch mode (re-run on changes)
npm run test:watch

# Coverage report
npm run test:coverage

# UI dashboard
npm run test:ui
```

## Git Workflow

### Before Making Changes

```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name
```

### Making Changes

```bash
# Make your changes
# Commit frequently with clear messages
git add .
git commit -m "feat: add new feature"

# OR for specific files
git add src/myFile.js
git commit -m "fix: resolve issue in myFile.js"
```

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, semicolons)
- `refactor`: Code restructuring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**

```
feat: add cookie consent banner
fix: resolve form validation bug
docs: update deployment guide
refactor: simplify authentication logic
```

### Before Pushing

```bash
# Format code
npm run format

# Lint code
npm run lint

# Run tests
npm test

# Build to verify
npm run build
```

### Pushing Changes

```bash
# Push to remote
git push origin feature/your-feature-name

# Create Pull Request on GitHub
# Link to related issues
# Describe changes
# Request review
```

## Creating Pull Requests

### PR Checklist

- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No linting errors
- [ ] Formatted with Prettier
- [ ] Build successful
- [ ] Base branch is `main` or `develop`
- [ ] Title is descriptive
- [ ] Description explains changes

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues

Fixes #123

## Testing

- [ ] Unit tests added
- [ ] Manual testing completed

## Screenshots (if applicable)

Include images for UI changes

## Checklist

- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation updated
```

## Debugging

### Browser DevTools

```javascript
// In browser console
// Check analytics
window.analyticsInstance.getSessionAnalytics();

// Check cookie consent
window.cookieConsentManager.getStatus();

// Check service worker
navigator.serviceWorker.getRegistrations();

// Check localStorage
localStorage.getItem('portfolio-cookie-consent');
```

### Logging

```javascript
// Enable debug logging
import { log } from './utils.js';

log('Debug message', { data: 'value' });
// Output: [HH:MM:SS] Debug message { data: 'value' }
```

### Performance Profiling

```javascript
// Measure function execution
console.time('functionName');
myFunction();
console.timeEnd('functionName');

// Use Performance API
performance.mark('start');
myFunction();
performance.mark('end');
performance.measure('myFunction', 'start', 'end');
```

## Common Tasks

### Adding a New Feature

1. Create feature branch:

   ```bash
   git checkout -b feature/my-feature
   ```

2. Write tests first (TDD):

   ```bash
   npm run test:watch
   ```

3. Implement feature

4. Update documentation

5. Format and lint:

   ```bash
   npm run format && npm run lint
   ```

6. Create PR

### Fixing a Bug

1. Create bug fix branch:

   ```bash
   git checkout -b fix/bug-description
   ```

2. Write test that reproduces bug

3. Fix the bug

4. Verify test passes:

   ```bash
   npm test
   ```

5. Create PR with issue reference

### Updating Documentation

```bash
# Edit .md files
vim CONTRIBUTING.md

# Preview locally (if using mdpreview)
npm install -g mdpreview
mdpreview README.md
```

## Environment Variables

### Development (.env.local)

```env
VITE_ANALYTICS_ENABLED=false
VITE_ENABLE_PWA=true
VITE_LOG_LEVEL=debug
```

### Production (.env.production.local)

```env
VITE_ANALYTICS_ENABLED=true
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ENFORCE_HTTPS=true
```

## Useful Resources

### Documentation

- [Vite Docs](https://vitejs.dev/)
- [Vitest Docs](https://vitest.dev/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [MDN Web Docs](https://developer.mozilla.org/)

### Tools

- [Can I Use](https://caniuse.com/)
- [Web.dev](https://web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Community

- GitHub Issues: Ask questions
- GitHub Discussions: Share ideas
- Contribute: PRs welcome!

## Troubleshooting

### Port Already in Use

```bash
# Find and kill process on port 5173
lsof -i :5173
kill -9 <PID>

# Or use different port
npm run dev -- --port 5174
```

### Node Modules Issues

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clear Vite cache
rm -rf .vite

# Rebuild
npm run build
```

### Test Failures

```bash
# Clear test cache
npm test -- --clearCache

# Run with debug output
npm test -- --reporter=verbose
```

## Performance Optimization Tips

### Development

- Use `npm run dev` for instant HMR (Hot Module Replacement)
- Run tests with `--watch` flag
- Use `--ui` flag for interactive testing dashboard

### Production

- Always run `npm run build` before deployment
- Check bundle size: `npm run build` outputs size metrics
- Remove unused code with tree-shaking
- Use `npm audit` to check for vulnerabilities

---

**Last Updated**: February 2026

**Need Help?**

- Check documentation files
- Open GitHub issues
- Review existing PRs
- Ask in discussions
