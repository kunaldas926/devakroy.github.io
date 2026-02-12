# Setup Guide

Complete step-by-step setup instructions for the portfolio project.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Environment Configuration](#environment-configuration)
4. [Development Setup](#development-setup)
5. [Project Initialization](#project-initialization)
6. [Verification](#verification)
7. [Troubleshooting](#troubleshooting)
8. [First Run](#first-run)

---

## Prerequisites

Before setting up the project, ensure you have:

### Required Software

**Node.js 16+** (includes npm 7+)

- Download: [https://nodejs.org](https://nodejs.org)
- Verify: `node --version` (should show v16+)
- Verify npm: `npm --version` (should show 7+)

**Git** (for version control)

- Download: [https://git-scm.com](https://git-scm.com)
- Verify: `git --version`

**Code Editor** (recommended)

- VS Code: [https://code.visualstudio.com](https://code.visualstudio.com)
- Or any preferred editor (Sublime, Atom, WebStorm, etc.)

### Optional but Recommended

**VS Code Extensions**:

- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- ES7+ React/Redux/React-Native snippets (dsznajder.es7-react-js-snippets)

**Git Tools**:

- GitHub Desktop: [https://desktop.github.com](https://desktop.github.com)
- Or Sourcetree: [https://www.sourcetreeapp.com](https://www.sourcetreeapp.com)

---

## Installation

### Step 1: Clone the Repository

```bash
# Via HTTPS (recommended for beginners)
git clone https://github.com/devakroy/devakroy.github.io.git
cd devakroy.github.io

# Via SSH (if using SSH keys)
git clone git@github.com:devakroy/devakroy.github.io.git
cd devakroy.github.io
```

**Verify**:

```bash
ls -la
# Should show: index.html, styles.css, package.json, etc.
```

### Step 2: Install Dependencies

```bash
# Install all npm packages
npm install
```

**Expected Output**:

```
added 211 packages in ~30s
```

**What was installed**:

- Vite (build tool)
- Vitest (testing framework)
- ESLint (linter)
- Prettier (formatter)
- And development dependencies

### Step 3: Verify Installation

```bash
# Check npm packages
npm list vite
npm list vitest

# Should display package versions
# vite@5.0.0+
# vitest@1.0.4+
```

---

## Environment Configuration

### Step 1: Create .env File

Copy the example environment file:

```bash
cp .env.example .env
```

### Step 2: Configure Variables

Edit `.env` file:

```bash
# Windows (PowerShell)
notepad .env

# macOS/Linux
nano .env
```

**Default values** (copy .env.example):

```
VITE_ANALYTICS_ENABLED=false
VITE_ANALYTICS_ENDPOINT=
```

### Step 3: Reference: All Available Variables

```env
# Analytics Configuration
# Set to 'true' to enable analytics tracking
VITE_ANALYTICS_ENABLED=false

# Analytics endpoint URL (optional if disabled)
# Example: https://api.yourdomain.com/analytics
VITE_ANALYTICS_ENDPOINT=

# Development Mode
# Auto-set by Vite (true in dev, false in production)
# VITE_MODE=development
```

### Step 4: Understand Environment Scoping

```javascript
// In code, access via import.meta.env
console.log(import.meta.env.VITE_ANALYTICS_ENABLED);

// Only VITE_* prefixed variables are exposed to client
// Other variables remain server-only
```

---

## Development Setup

### Step 1: Open Project in Editor

```bash
# VS Code (recommended)
code .

# Or open manually:
# Windows: right-click folder → "Open with Code"
# macOS: drag folder to VS Code
```

### Step 2: Configure VS Code (Optional)

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript"],
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### Step 3: Install Recommended Extensions

In VS Code:

1. Press `Ctrl+@` (or `Cmd+@` on Mac)
2. Go to Extensions tab
3. Search and install:
    - ESLint (dbaeumer.vscode-eslint)
    - Prettier (esbenp.prettier-vscode)

---

## Project Initialization

### Step 1: Verify Project Structure

```bash
# List project files
tree -L 2 -I node_modules

# Or on Windows PowerShell
Get-ChildItem -Recurse -Exclude node_modules | ForEach-Object {
  $level = ($_.FullName -split '\\' | Measure-Object).Count - (Get-Item . | Split-Path | Measure-Object).Count
  $indent = "  " * ($level - 1)
  Write-Host "$indent├── $($_.Name)"
}
```

**Expected structure**:

```
devakroy.github.io/
├── public/                 # Static assets
├── src/                    # Source code
├── index.html              # Main HTML
├── styles.css              # Stylesheet
├── package.json            # Dependencies
├── vite.config.js          # Build config
├── vitest.config.js        # Test config
└── .env                    # Environment variables
```

### Step 2: Build Project

```bash
# Create production build
npm run build
```

**Expected Output**:

```
vite v5.0.0 building for production...
✓ 45 modules transformed
dist/index-C9iJwWcL.js    11.40 KiB / gzip: 5.20 KiB
dist/style-Bx5OLFmk.css   95.60 KiB / gzip: 18.20 KiB
dist/index.html           28.33 KiB
✓ built in 1.07s
```

**What was generated**:

- `dist/index.html` - Production HTML
- `dist/index-[hash].js` - Minified & bundled JavaScript
- `dist/style-[hash].css` - Minified CSS
- Other assets (fonts, images, etc.)

### Step 3: Run Tests

```bash
# Run all tests
npm test

# Expected Output:
# PASS  src/tests/security.test.js (5 tests)
# PASS  src/tests/utils.test.js (8 tests)
# Test Files  2 passed (2)
# Tests  11 passed (11)
```

### Step 4: Start Development Server

```bash
# Start with hot reload
npm run dev

# Expected Output:
#   VITE v5.0.0  ready in 234 ms
#   ➜  Local:   http://localhost:5173/
#   ➜  press h to show help
```

**Open in browser**: [http://localhost:5173](http://localhost:5173)

---

## Verification

### Step 1: Application Loads

- [ ] Page opens without errors
- [ ] Styles load correctly (site looks good)
- [ ] No console errors (F12 → Console)

### Step 2: Security Features

- [ ] Cookie consent banner appears (first visit)
- [ ] Click "Accept Analytics" saves consent
- [ ] Banner doesn't appear on reload (consent remembered)

### Step 3: Form Functionality

- [ ] Fill contact form with valid data
- [ ] Submit form
- [ ] Success notification appears
- [ ] Form resets after submission

### Step 4: Mobile Menu (if applicable)

- [ ] Resize window to mobile size (<768px)
- [ ] Hamburger menu appears
- [ ] Clicking hamburger opens menu
- [ ] Clicking menu item closes menu

### Step 5: Build Verification

```bash
# Test production build locally
npm run preview

# Open: http://localhost:4173
```

### Step 6: Code Quality

```bash
# Run linter
npm run lint

# Check formatting
npm run format
```

---

## Troubleshooting

### Issue: `npm install` Fails

**Error**: `ERR! code ERESOLVE` or `npm ERR! peer dep missing`

**Solution**:

```bash
# Clear npm cache
npm cache clean --force

# Install with legacy peer dependency handling
npm install --legacy-peer-deps

# Or upgrade npm
npm install -g npm@latest
```

---

### Issue: Port 5173 Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::5173`

**Solution**:

```bash
# Kill process on port 5173
# Windows (PowerShell as Admin)
Get-Process node | Stop-Process -Force

# macOS/Linux
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

---

### Issue: `command not found: npm`

**Error**: `npm: command not found`

**Solution**:

- Install Node.js: https://nodejs.org
- Verify: `node --version` and `npm --version`
- Restart terminal after installation

---

### Issue: Tests Fail

**Error**: `FAIL  src/tests/security.test.js`

**Solution**:

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Run tests with debug info
npm test -- --reporter=verbose
```

---

### Issue: Build Fails

**Error**: `error during build: ...`

**Solution**:

```bash
# Check for syntax errors
npm run lint

# Clean and rebuild
rm -rf dist
npm run build -- --sourcemap

# Check console output for specific error
```

---

### Issue: Hot Reload Not Working

**Error**: Changes to files don't appear in browser

**Solution**:

```bash
# Stop dev server (Ctrl+C)
# Clear browser cache (F12 → Network → Disable cache)
npm run dev

# If still not working:
# Check file change notifications (Windows may have limits)
```

---

## First Run Walkthrough

### Scenario: Complete First Setup

```bash
# 1. Clone repository
git clone https://github.com/devakroy/devakroy.github.io.git
cd devakroy.github.io

# 2. Install dependencies (takes ~30s)
npm install

# 3. Copy environment file
cp .env.example .env

# 4. Start development server
npm run dev
# → Opens http://localhost:5173

# 5. In another terminal, run tests
npm test
# → Should show: 19 passed

# 6. Open in browser and verify
# - Site loads without errors
# - Cookie banner appears
# - Form works
# - All features functional

# 7. Make changes and hot reload works
# - Edit src/config.js (change a message)
# - Save file
# - Browser auto-refreshes with changes
```

---

## Git Workflow Setup

### Step 1: Configure Git

```bash
# Set your identity (one-time)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify
git config --list | grep user
```

### Step 2: Create Feature Branch

```bash
# Create and switch to new branch
git checkout -b feature/my-feature

# Example branches:
# feature/add-dark-mode
# fix/form-validation
# docs/update-readme
```

### Step 3: Make Changes

```bash
# Edit files as needed
# Changes auto-tracked by git

# Check status
git status

# Stage changes
git add .

# Commit with message
git commit -m "Add dark mode support"

# Push to GitHub
git push origin feature/my-feature
```

### Step 4: Create Pull Request

- Go to GitHub
- Click "Compare & pull request"
- Add description
- Request review (if applicable)
- Merge when ready

---

## IDE Shortcuts

### VS Code

| Action        | Shortcut      |
|---------------|---------------|
| Format Code   | `Shift+Alt+F` |
| Find/Replace  | `Ctrl+H`      |
| Open Terminal | `Ctrl+``      |
| Quick Fix     | `Ctrl+.`      |
| Debug/Run     | `F5`          |
| Go to Line    | `Ctrl+G`      |
| Comment Line  | `Ctrl+/`      |

### Other Editors

- **WebStorm**: Same shortcuts (JetBrains)
- **Sublime**: `Ctrl+Shift+P` → Install Package Control
- **Atom**: `Ctrl+Shift+P` → Search packages

---

## Next Steps

After successful setup:

1. **Know the Features**: Read [ARCHITECTURE.md](ARCHITECTURE.md)
2. **API Reference**: Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
3. **Deployment**: See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
4. **Contributing**: Review [CONTRIBUTING.md](CONTRIBUTING.md)
5. **Testing Details**: Read [TESTING_GUIDE.md](TESTING_GUIDE.md)

---

## Support

If stuck:

1. Check [Troubleshooting](#troubleshooting) section above
2. Search [GitHub Issues](https://github.com/devakroy/devakroy.github.io/issues)
3. Read [README.md](README.md) for overview
4. Check [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines

---

## Quick Reference

```bash
# Most Common Commands

npm install              # Install dependencies (first time)
npm run dev            # Start development server
npm test               # Run tests
npm run build          # Create production build
npm run lint           # Check code quality
npm run format         # Auto-format code
npm run preview        # Preview production build locally
npm run test:watch     # Watch mode for tests
npm run test:coverage  # Generate coverage report
```

---

**Next**: Proceed to [Architecture Documentation](ARCHITECTURE.md) for system design overview.
