# Contributing Guide

Thank you for your interest in contributing to this portfolio project! This guide provides guidelines and instructions
for contributing.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Code Style Guidelines](#code-style-guidelines)
4. [Git Workflow](#git-workflow)
5. [Commit Conventions](#commit-conventions)
6. [Pull Request Process](#pull-request-process)
7. [Testing Guidelines](#testing-guidelines)
8. [Documentation Standards](#documentation-standards)
9. [Issue Reporting](#issue-reporting)
10. [Questions & Support](#questions--support)

---

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read
our [Code of Conduct](CODE_OF_CONDUCT.md) declaration.

**In summary**:

- Be respectful and inclusive
- Assume good intentions
- Report unacceptable behavior to maintainers
- Welcome feedback and different perspectives

---

## Getting Started

### Prerequisites

- Node.js 16+ ([Download](https://nodejs.org))
- npm 7+ (comes with Node.js)
- Git ([Download](https://git-scm.com))
- Basic understanding of JavaScript ES6+
- Familiarity with Git

### Setup Development Environment

1. **Fork the Repository**

   ```bash
   # Click "Fork" on GitHub
   # This creates your own copy
   ```

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/YOUR-USERNAME/devakroy.github.io.git
   cd devakroy.github.io
   ```

3. **Add Upstream Remote**

   ```bash
   # Keep your fork synced with original
   git remote add upstream https://github.com/devakroy/devakroy.github.io.git
   git remote -v
   # Should show: origin (your fork) and upstream (original)
   ```

4. **Install Dependencies**

   ```bash
   npm install
   ```

5. **Create Feature Branch** (see [Git Workflow](#git-workflow))

---

## Code Style Guidelines

### JavaScript Standards

**Use Vanilla JavaScript** - No frameworks or external dependencies (except build tools)

```javascript
// ✅ GOOD: Clear, simple, vanilla JS
function setupForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', handleFormSubmit);
}

// ❌ BAD: jQuery or unclear code
$('#contact-form').on('submit', handleFormSubmit);
```

### Naming Conventions

**Variables & Functions**: `camelCase`

```javascript
const userName = 'John'; // ✅ Good
const user_name = 'John'; // ❌ Avoid
const UserName = 'John'; // ❌ Use only for classes
```

**Constants**: `UPPER_CASE`

```javascript
const MAX_FILE_SIZE = 1024; // ✅ Good
const maxFileSize = 1024; // ❌ For constants
```

**Classes**: `PascalCase`

```javascript
class FormValidator {} // ✅ Good
class form_validator {} // ❌ Avoid
```

**Private Variables**: `_underscore` prefix (convention only, JS has no true private)

```javascript
class Analytics {
  _sessionId = 'uuid'; // ✅ Convention for "private"
  sessionId = 'uuid'; // ✅ Public property
}
```

### Code Structure

**Functions**: Keep small and focused

```javascript
// ✅ GOOD: Single responsibility (max ~30 lines)
function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// ❌ BAD: Doing too much
function handleUserRegistration(user) {
  // Validates email, password, creates user, sends email, logs to DB
  // Way too much for one function!
}
```

**Error Handling**: Always handle errors gracefully

```javascript
// ✅ GOOD: Handle missing elements
const form = document.querySelector('#form');
if (!form) {
  console.warn('Form element not found');
  return;
}

// ❌ BAD: Assumes element exists
const form = document.querySelector('#form');
form.addEventListener('submit', handler); // Will crash if not found!
```

**Comments**: Use JSDoc for functions

```javascript
/**
 * Validates email address format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 * @example
 * validateEmail('user@example.com')  // true
 * validateEmail('invalid')           // false
 */
function validateEmail(email) {
  // Implementation
}
```

### Formatting

**Use Prettier** (auto-formatting)

```bash
npm run format
```

**Key rules**:

- 2-space indentation
- Single quotes for strings
- Trailing commas in multi-line
- Max line length: 100 characters
- Semicolons required

**Example**:

```javascript
// ✅ Correct formatting
export const config = {
  name: 'portfolio',
  version: '1.0.0',
};

function setupForm(options = {}) {
  const { selector = '#form' } = options;
  const form = document.querySelector(selector);
  return form;
}

// ❌ Incorrect formatting
export const config = { name: 'portfolio', version: '1.0.0' };
function setupForm(opts = {}) {
  const { selector = '#form' } = opts;
  const form = document.querySelector(selector);
  return form;
}
```

### Linting

**Check code quality**:

```bash
npm run lint
```

**Fix automatically**:

```bash
npm run lint -- --fix
```

**Configure** in `.eslintrc.js`

---

## Git Workflow

### 1. Create Feature Branch

```bash
# Get latest updates from original repo
git fetch upstream
git rebase upstream/main

# Create feature branch
git checkout -b feature/my-feature

# Branch naming convention
feature/add-dark-mode         # New feature
fix/form-validation-bug       # Bug fix
docs/update-readme            # Documentation
refactor/improve-performance  # Refactoring
test/add-unit-tests           # Tests
```

### 2. Make Changes

```bash
# Make your changes to files

# Check status
git status

# Stage changes
git add .                     # All changes
# or
git add src/file.js          # Specific file

# Commit (see Commit Conventions)
git commit -m "feat: add dark mode toggle"
```

### 3. Keep Branch Updated

```bash
# While working on branch, if main was updated
git fetch upstream
git rebase upstream/main

# If conflicts, resolve them:
# 1. Edit conflicted files
# 2. git add <files>
# 3. git rebase --continue
```

### 4. Push & Pull Request

```bash
# Push to your fork
git push origin feature/my-feature

# Go to GitHub
# Click "Compare & pull request"
# Add description
# Submit PR
```

### 5. After PR Merged

```bash
# Switch back to main
git checkout main

# Get latest
git pull upstream main

# Delete feature branch (optional)
git branch -d feature/my-feature
git push origin --delete feature/my-feature
```

---

## Commit Conventions

Follow **Conventional Commits** for consistency and automated changelog generation.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type       | Usage                      | Example                                      |
|------------|----------------------------|----------------------------------------------|
| `feat`     | New feature                | `feat(auth): add login form validation`      |
| `fix`      | Bug fix                    | `fix(form): resolve email validation regex`  |
| `docs`     | Documentation              | `docs(readme): add setup instructions`       |
| `style`    | Formatting                 | `style: improve code formatting`             |
| `refactor` | Code reorganization        | `refactor(utils): extract debounce function` |
| `perf`     | Performance improvement    | `perf(images): optimize lazy loading`        |
| `test`     | Test addition/modification | `test(security): add sanitizeHTML tests`     |
| `chore`    | Build, dependencies        | `chore(deps): update vite to 5.0.0`          |
| `ci`       | CI/CD changes              | `ci(ci-cd): add coverage reporting`          |

### Examples

**Good commits**:

```bash
git commit -m "feat(form): add real-time email validation"

git commit -m "fix(nav): resolve mobile menu closing issue

- Menu now closes on Escape key
- Menu closes on outside click
- Focus returns to hamburger button"

git commit -m "docs(api): update analytics module documentation"

git commit -m "perf(images): reduce lazy loading threshold from 100px to 50px"
```

**Bad commits**:

```bash
git commit -m "fix bug"           # Too vague
git commit -m "updated stuff"     # Not descriptive
git commit -m "asdf"              # Meaningless
```

---

## Pull Request Process

### 1. Before Creating PR

- ✅ Code follows style guidelines
- ✅ All tests pass: `npm test`
- ✅ Code is formatted: `npm run format`
- ✅ Linting passes: `npm run lint`
- ✅ Build succeeds: `npm run build`
- ✅ Documentation updated (if needed)

### 2. Create Pull Request

**On GitHub**:

1. Click "New Pull Request"
2. Base: `devakroy/devakroy.github.io` main ← Compare: `YourUsername/branch`
3. Add title and description

**PR Title Format**:

```
feat: add dark mode support
fix: resolve form submission error
docs: update deployment guide
```

**PR Description Template**:

```markdown
## Description

Brief description of what this PR does.

## Changes

- Change 1
- Change 2
- Change 3

## Testing

How to test these changes:

1. Step 1
2. Step 2
3. Step 3

## Checklist

- [ ] Code follows style guidelines
- [ ] Tests pass (npm test)
- [ ] Documentation updated
- [ ] No breaking changes

## Related Issues

Fixes #123
```

### 3. Code Review Process

**Reviewers may request**:

- Changes to code style
- Additional tests
- Documentation updates
- Performance improvements

**Respond to comments**:

- Push additional commits to same branch
- Address all feedback
- Request re-review when ready

### 4. Merge PR

Once approved and all checks pass:

- Use "Squash and merge" (preferred) or "Create a merge commit"
- Delete branch after merge

---

## Testing Guidelines

### Writing Tests

**Use Vitest** - Framework for this project

```javascript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { sanitizeHTML } from '../security.js';

describe('Security Module', () => {
  it('should remove script tags', () => {
    const input = '<p>Hello <script>alert(1)</script> world</p>';
    const output = sanitizeHTML(input);
    expect(output).not.toContain('<script>');
  });

  it('should handle empty input', () => {
    expect(sanitizeHTML('')).toBe('');
  });

  it('should remove event handlers', () => {
    const input = '<img src=x onerror="alert(1)">';
    const output = sanitizeHTML(input);
    expect(output).not.toContain('onerror');
  });
});
```

### Testing Best Practices

1. **One concept per test**

   ```javascript
   // ✅ GOOD: Clear purpose
   it('should reject invalid email format', () => {
     expect(validateEmail('invalid')).toBe(false);
   });

   // ❌ BAD: Testing multiple things
   it('should validate email and format response', () => {
     const valid = validateEmail('user@example.com');
     const invalid = validateEmail('bad');
     const response = format(valid);
     // Too much for one test!
   });
   ```

2. **Descriptive test names**

   ```javascript
   // ✅ Good names
   it('should trim whitespace from input');
   it('should return empty array when no results');
   it('should handle null values gracefully');

   // ❌ Poor names
   it('works');
   it('test 1');
   it('validateInput');
   ```

3. **Test edge cases**
   ```javascript
   describe('sanitizeHTML', () => {
     it('should handle normal HTML'); // Happy path
     it('should remove script tags'); // Security
     it('should handle empty string'); // Edge case
     it('should handle null/undefined'); // Edge case
     it('should handle large inputs'); // Performance
   });
   ```

### Running Tests

```bash
# All tests
npm test

# Watch mode (reruns on file changes)
npm run test:watch

# With coverage
npm run test:coverage

# Interactive UI
npm run test:ui

# Specific file
npm test -- security.test.js
```

### Coverage Requirements

- **Target**: 80% across all metrics
- **Check**: `npm run test:coverage`
- **Security module**: Currently 74.28%
- **Utils module**: Currently 86.2%

---

## Documentation Standards

### File Headers

```javascript
/**
 * Form Validation Module
 *
 * Handles contact form validation and submission.
 * Integrates with security module for input sanitization.
 *
 * @module formHandler
 */

// Imports
import { sanitizeHTML, isSafeInput } from './security.js';
import { CONFIG } from './config.js';

// ... rest of code
```

### Function Documentation

```javascript
/**
 * Validates email address format
 *
 * Uses RFC-compliant regular expression to validate
 * email format. No DNS lookup performed.
 *
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format, false otherwise
 *
 * @example
 * validateEmail('user@example.com')  // returns true
 * validateEmail('user@')              // returns false
 *
 * @throws {TypeError} If email is not a string
 */
export function validateEmail(email) {
  if (typeof email !== 'string') {
    throw new TypeError('Email must be a string');
  }
  // Implementation
}
```

### Variable Documentation

```javascript
/**
 * Maximum file upload size in bytes (5MB)
 * @type {number}
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * User consent preferences
 * @typedef {Object} ConsentData
 * @property {boolean} essential - Always required
 * @property {boolean} analytics - User choice
 * @property {string} timestamp - When consent was given
 */
```

### Markdown Files

Content should be:

- Well-organized with clear headings
- Include code examples
- Link to related documentation
- Keep paragraphs concise
- Use tables for comparisons
- Include examples when explaining concepts

---

## Issue Reporting

### Before Creating Issue

- [ ] Search existing issues first
- [ ] Check documentation in README.md
- [ ] Try latest code from main branch
- [ ] Check troubleshooting guide

### Creating Issue

**Use GitHub issue template** (if available)

**Include**:

1. **Clear title**: Describe problem concisely
2. **Description**: What's happening vs expected behavior
3. **Steps to reproduce**: Exact steps to reproduce issue
4. **Environment**: Node version, OS, browser (if applicable)
5. **Logs/Screenshots**: Relevant error messages or screenshots
6. **Code sample**: Minimal code that demonstrates issue

**Example**:

```markdown
## Bug: Form validation not working

### Description

Contact form doesn't validate email field. Submitting invalid email doesn't show error.

### To Reproduce

1. Go to contact form
2. Enter "invalid-email" in email field
3. Click submit
4. No error message appears

### Expected behavior

Email validation error should appear

### Environment

- Node 16.13.0
- npm 8.1.0
- Chrome 96
- macOS 12

### Error log

(None - just silently accepts invalid email)
```

---

## Questions & Support

### Getting Help

1. **Check Documentation**
    - [README.md](README.md) - Overview
    - [ARCHITECTURE.md](ARCHITECTURE.md) - System design
    - [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
    - [SETUP.md](SETUP.md) - Setup instructions
    - [TESTING_GUIDE.md](TESTING_GUIDE.md) - Testing guide

2. **Search Issues**
    - [GitHub Issues](https://github.com/devakroy/devakroy.github.io/issues)
    - Your question might be answered already

3. **Create Discussion**
    - [GitHub Discussions](https://github.com/devakroy/devakroy.github.io/discussions)
    - For questions that aren't bugs

4. **Contact Author**
    - Email: [via portfolio site]
    - Twitter/Social: Check portfolio

### Requesting Features

Use GitHub Issues with label `enhancement`:

```markdown
## Feature Request: Dark mode support

### Motivation

Many users prefer dark mode for night viewing.

### Proposed solution

Add theme toggle in settings allowing dark/light mode.

### Alternative solutions

Use system preference (prefers-color-scheme).

### Implementation notes

Could use CSS custom properties for theme colors.
```

---

## Recognition

Contributors are recognized for:

- Code contributions
- Bug reports
- Documentation improvements
- Community support

See [CONTRIBUTORS.md](CONTRIBUTORS.md) for hall of fame.

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

## Resources

- [Contributor Covenant](https://www.contributor-covenant.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Guide](https://git-scm.com/book/en/v2)
- [Vitest Documentation](https://vitest.dev)
- [JavaScript Best Practices](https://javascript.info/)

---

## Summary

1. Follow code style guidelines (use `npm run format` to auto-fix)
2. Write tests for new features (aim for 80%+ coverage)
3. Use conventional commits
4. Keep PRs focused and small
5. Document changes and include examples
6. Engage respectfully with feedback

**Thank you for contributing!** 🙌
