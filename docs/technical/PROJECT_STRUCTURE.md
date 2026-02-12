# Project Structure

Detailed breakdown of the project directory organization and file purposes.

---

## Directory Tree

```
devakroy.github.io/
│
├── 📁 public/                          # Static assets (served as-is)
│   ├── service-worker.js               # PWA offline support
│   ├── manifest.json                   # PWA configuration
│   ├── robots.txt                      # SEO - robot crawling rules
│   ├── sitemap.xml                     # SEO - XML sitemap
│   ├── _headers                        # Netlify security headers
│   └── [other-assets]/                 # Images, fonts, etc.
│
├── 📁 src/                             # Application source code
│   ├── 📄 app.js                       # Main app initialization
│   ├── 📄 config.js                    # Configuration & constants
│   ├── 📄 security.js                  # Input validation & XSS prevention
│   ├── 📄 analytics.js                 # Privacy-first analytics
│   ├── 📄 cookieConsent.js             # GDPR cookie consent
│   ├── 📄 formHandler.js               # Form validation & submission
│   ├── 📄 navigation.js                # Mobile menu & scroll tracking
│   ├── 📄 lazyLoading.js               # Progressive image loading
│   ├── 📄 ui.js                        # Notifications & animations
│   ├── 📄 utils.js                     # Helper functions
│   ├── 📄 serviceWorker.js             # Service worker registration
│   │
│   └── 📁 tests/                       # Test suite
│       ├── setup.js                    # Test environment setup
│       ├── security.test.js            # Security module tests
│       ├── utils.test.js               # Utils module tests
│       └── (add more test files here)
│
├── 📁 .github/                         # GitHub configuration
│   ├── 📁 workflows/
│   │   └── ci-cd.yml                   # GitHub Actions CI/CD pipeline
│   └── (issue templates, etc.)
│
├── 📁 dist/                            # Production build (generated)
│   ├── index.html                      # Bundled HTML
│   ├── index-[hash].js                 # Minified JavaScript
│   ├── style-[hash].css                # Minified CSS
│   ├── service-worker.js               # SW copy
│   └── [other-assets]/                 # Built assets
│
├── 📁 coverage/                        # Test coverage reports (generated)
│   ├── lcov.info                       # LCOV coverage data
│   ├── index.html                      # Coverage report
│   └── (coverage source files)
│
├── 📁 node_modules/                    # Dependencies (git ignored)
│   └── (211 packages)
│
├── 📄 index.html                       # Main HTML template
├── 📄 styles.css                       # Global stylesheet
├── 📄 script.js                        # Legacy entry point
│
├── 📝 README.md                        # Project overview
├── 📝 ARCHITECTURE.md                  # System design & architecture
├── 📝 API_DOCUMENTATION.md             # Complete API reference
├── 📝 SETUP.md                         # Setup instructions
├── 📝 PROJECT_STRUCTURE.md             # This file
├── 📝 CONTRIBUTING.md                  # Contribution guidelines
├── 📝 TESTING_GUIDE.md                 # Testing strategy
├── 📝 DEPLOYMENT_GUIDE.md              # Deployment instructions
├── 📝 DEVELOPER_GUIDE.md               # Developer onboarding
├── 📝 PRIVACY_POLICY.md                # Legal - privacy
├── 📝 TERMS_OF_SERVICE.md              # Legal - terms
│
├── 🔧 package.json                     # Dependencies & scripts
├── 🔧 package-lock.json                # Dependency lock file
├── 🔧 vite.config.js                   # Vite build configuration
├── 🔧 vitest.config.js                 # Vitest test configuration
├── 🔧 .env                             # Environment variables (local)
├── 🔧 .env.example                     # Environment template
├── 🔧 .eslintrc.js                     # ESLint configuration
├── 🔧 .prettierrc                      # Prettier configuration
│
├── 📄 LICENSE                          # MIT License
└── 📄 .gitignore                       # Git ignore rules

```

---

## Root Level Files

### Configuration Files

| File                | Purpose                         | Editable                    |
|---------------------|---------------------------------|-----------------------------|
| `package.json`      | Dependencies, scripts, metadata | ✅ Yes                       |
| `package-lock.json` | Locked dependency versions      | ⚠️ Auto-generated           |
| `vite.config.js`    | Build tool configuration        | ✅ Yes                       |
| `vitest.config.js`  | Test framework configuration    | ✅ Yes                       |
| `.env.example`      | Environment variables template  | ✅ Yes                       |
| `.env`              | Local environment variables     | ⚠️ Secrets (ignored by git) |
| `.eslintrc.js`      | Linting rules                   | ✅ Yes                       |
| `.prettierrc`       | Code formatting rules           | ✅ Yes                       |
| `.gitignore`        | Files ignored by Git            | ✅ Yes                       |

### Documentation Files

| File                   | Purpose                            |
|------------------------|------------------------------------|
| `README.md`            | Project overview & quick start     |
| `ARCHITECTURE.md`      | System design & modules            |
| `API_DOCUMENTATION.md` | Complete API reference             |
| `SETUP.md`             | Installation & setup guide         |
| `PROJECT_STRUCTURE.md` | This file - directory organization |
| `CONTRIBUTING.md`      | Contribution guidelines            |
| `TESTING_GUIDE.md`     | Testing strategy & examples        |
| `DEPLOYMENT_GUIDE.md`  | Deployment instructions            |
| `DEVELOPER_GUIDE.md`   | Developer onboarding               |
| `PRIVACY_POLICY.md`    | Legal - GDPR/CCPA                  |
| `TERMS_OF_SERVICE.md`  | Legal - terms & conditions         |

### Source Files

| File         | Purpose                         | Size  |
|--------------|---------------------------------|-------|
| `index.html` | Main HTML template              | 28 KB |
| `styles.css` | Global stylesheet               | 95 KB |
| `script.js`  | Legacy entry point (deprecated) | 2 KB  |

---

## Source Directory (`src/`)

### Core Modules (11 files)

#### Infrastructure Modules

**app.js** (78 lines)

```
├─ Purpose: Application initialization orchestrator
├─ Exports: initApp() function
├─ Dependencies: All other modules
├─ Responsibility: Coordinate all feature initialization
└─ When called: On page load (after DOM ready)
```

**config.js** (51 lines)

```
├─ Purpose: Centralized configuration & constants
├─ Exports: CONFIG object, FORM_FIELDS object
├─ Dependencies: None
├─ Contents: Selectors, delays, defaults, form rules
└─ Used by: All other modules
```

**utils.js** (174 lines)

```
├─ Purpose: Reusable helper functions
├─ Exports: 15+ utility functions
├─ Functions: debounce, throttle, DOM query, class manipulation
├─ Tests: 8 test cases, 86.2% coverage
└─ No dependencies: Pure functions
```

#### Security & Privacy Modules

**security.js** (140 lines)

```
├─ Purpose: Input validation & XSS prevention
├─ Exports: 6 security functions
├─ Functions: sanitizeHTML, validateEmail, generateCSPHeader, etc.
├─ Tests: 11 test cases, 74.28% coverage
└─ Dependencies: None (vanilla JavaScript)
```

**analytics.js** (179 lines)

```
├─ Purpose: Privacy-first error tracking
├─ Exports: Analytics class & singleton instance
├─ Features: Event tracking, performance metrics, error handling
├─ Storage: Session ID in memory
└─ External: Sends to VITE_ANALYTICS_ENDPOINT (configurable)
```

**cookieConsent.js** (186 lines)

```
├─ Purpose: GDPR/CCPA compliant consent management
├─ Exports: CookieConsentManager class & singleton
├─ Storage: localStorage + secure HTTP cookie
├─ UI: Consent banner with 3 options
└─ Scope: Controls analytics & tracking features
```

#### Feature Modules

**formHandler.js** (178 lines)

```
├─ Purpose: Contact form handling
├─ Exports: 6 form-related functions
├─ Validation: Name (min 2), email (RFC), message (min 10)
├─ Security: Input sanitization & XSS checks
└─ Feedback: Success/error notifications
```

**navigation.js** (117 lines)

```
├─ Purpose: Mobile menu & scroll tracking
├─ Features: Hamburger toggle, smooth scroll, active link tracking
├─ Responsive: Mobile-first (<768px)
├─ Accessibility: ARIA labels, keyboard shortcuts
└─ Events: Click, scroll, keyboard listeners
```

**lazyLoading.js** (78 lines)

```
├─ Purpose: Progressive image loading
├─ Method: IntersectionObserver API
├─ Optimization: 50px preemptive loading
├─ Fallback: Available for older browsers
└─ Attribute: Images use data-src attribute
```

**ui.js** (172 lines)

```
├─ Purpose: UI interactions & animations
├─ Features: Notifications, scroll-to-top, animations, tooltips
├─ Animations: Fade-in on scroll, smooth transitions
├─ Notifications: Auto-dismiss, 3 types (alert, success, error)
└─ Responsive: Adapts to viewport
```

**serviceWorker.js** (37 lines)

```
├─ Purpose: PWA offline capability
├─ Exports: 2 service worker functions
├─ Strategy: Cache-first for assets, network-first for HTML
├─ Fallback: Cached index.html when offline
└─ Cache name: portfolio-v1
```

### Test Suite (`src/tests/`)

**setup.js** (56 lines)

```
├─ Purpose: Test environment configuration
├─ Content: Global mocks, cleanup handlers
├─ Mocks: window.matchMedia, IntersectionObserver
├─ Cleanup: afterEach DOM reset
└─ Used by: Vitest configuration
```

**security.test.js** (84 lines)

```
├─ Tests: 11 test cases for security module
├─ Coverage: 74.28%
├─ Suites: 4 describe blocks
├─ Topics: sanitizeHTML, validateEmail, validateURL, isSafeInput
└─ Status: ✅ All passing
```

**utils.test.js** (112 lines)

```
├─ Tests: 8 test cases for utils module
├─ Coverage: 86.2%
├─ Topics: debounce, throttle, DOM manipulation, scrolling
└─ Status: ✅ All passing
```

---

## Public Directory (`public/`)

### Static Assets

**service-worker.js** (75 lines)

```
├─ Purpose: PWA service worker implementation
├─ Cache strategy: Cache-first for assets
├─ Caching: Fonts, CSS, JS (versioned portfolio-v1)
├─ Network: HTML with network-first strategy
└─ Offline: Falls back to cached index.html
```

**manifest.json** (20 lines)

```
├─ Purpose: PWA manifest for installability
├─ Content: App name, icons, theme colors, display mode
├─ Icons: 192x192 and 512x512 profile pictures
├─ Display: Standalone (full-screen app)
└─ Theme: #00d4ff (primary color)
```

**robots.txt** (5 lines)

```
├─ Purpose: SEO - Control search engine crawling
├─ Allow: All paths (/)
├─ Disallow: /node_modules/
└─ Sitemap: Link to XML sitemap
```

**sitemap.xml** (25 lines)

```
├─ Purpose: SEO - XML sitemap for crawlers
├─ URLs: 6 main sections
├─ Priorities: 1.0 (home), 0.9 (projects), 0.8+ (others)
├─ Frequency: Weekly update cycle
└─ Last modified: Dates included
```

**\_headers** (25 lines)

```
├─ Purpose: Netlify security headers configuration
├─ Headers: HSTS, CSP, X-Frame-Options, Permissions-Policy
├─ Cache: Asset caching rules (1 year for static)
├─ HTML: No-cache for HTML files
└─ SW: 1-hour cache for service worker
```

---

## Build Output (`dist/`)

**Generated by**: `npm run build`  
**Contents**:

```
dist/
├── index.html                    # Production HTML (28 KB)
├── index-[hash].js              # Minified JavaScript (11.4 KB)
├── style-[hash].css             # Minified CSS (95.6 KB)
├── service-worker.js            # Service worker copy
├── manifest.json                # PWA manifest copy
├── robots.txt                   # robots.txt copy
├── sitemap.xml                  # sitemap.xml copy
└── [other-assets]/              # Images, fonts (copied from public/)
```

**Characteristics**:

- ✅ Fully optimized for production
- ✅ All assets minified
- ✅ Hash-based cache busting
- ✅ Source maps disabled (security)
- ✅ Ready to deploy

---

## Test Coverage (`coverage/`)

**Generated by**: `npm run test:coverage`  
**Contents**:

```
coverage/
├── lcov.info                   # LCOV data format
├── lcov-report/
│   ├── index.html             # HTML coverage report
│   ├── security.js.html       # Per-file coverage
│   ├── utils.js.html
│   └── ...
├── coverage-summary.json      # JSON summary
└── [other formats]
```

**Reports available**:

- HTML (interactive browser view)
- LCOV (tools integration)
- JSON (programmatic access)
- Text (terminal display)

---

## Git Ignored Files

**File**: `.gitignore`

```
# Dependencies
node_modules/
package-lock.json

# Build outputs
dist/
.parcel-cache

# Test coverage
coverage/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*.sublime-project

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
```

---

## Module Dependencies

```
app.js (orchestrator)
├── security.js
├── analytics.js
├── cookieConsent.js
├── formHandler.js
│   ├── utils.js
│   └── security.js
├── navigation.js
│   ├── utils.js
│   └── ui.js
├── lazyLoading.js
│   └── utils.js
├── ui.js
│   └── utils.js
├── serviceWorker.js
└── config.js (used by all)
```

---

## File Types & Purposes

### JavaScript (.js)

| Type           | Purpose                | Count |
|----------------|------------------------|-------|
| Source modules | Feature implementation | 11    |
| Test files     | Unit tests             | 3     |
| Config files   | Build & development    | 2     |
| Public assets  | PWA & SW               | 1     |

### Documentation (.md)

| File                 | Audience      | Type            |
|----------------------|---------------|-----------------|
| README.md            | Everyone      | Overview        |
| ARCHITECTURE.md      | Developers    | Technical       |
| API_DOCUMENTATION.md | Developers    | Reference       |
| SETUP.md             | New users     | Getting started |
| PROJECT_STRUCTURE.md | Developers    | Navigation      |
| CONTRIBUTING.md      | Contributors  | Guidelines      |
| TESTING_GUIDE.md     | QA/Developers | Testing         |
| DEPLOYMENT_GUIDE.md  | DevOps        | Deployment      |
| DEVELOPER_GUIDE.md   | Developers    | Onboarding      |

### Configuration (.json, .yml)

| File             | Purpose                 |
|------------------|-------------------------|
| package.json     | NPM metadata & scripts  |
| vite.config.js   | Build configuration     |
| vitest.config.js | Test configuration      |
| manifest.json    | PWA configuration       |
| .env             | Environment variables   |
| ci-cd.yml        | GitHub Actions workflow |

## File Size Summary

| Category         | Files | Approx Size |
|------------------|-------|-------------|
| Source code      | 11    | ~1.5 MB     |
| Tests            | 3     | ~250 KB     |
| Docs             | 12    | ~500 KB     |
| Config           | 6     | ~50 KB      |
| Dependencies     | 211   | ~350 MB     |
| **Build output** | ~10   | **~244 KB** |

---

## Organization Principles

1. **Separation of Concerns**
    - Each module has single responsibility
    - No circular dependencies
    - Clear interfaces

2. **Security First**
    - Security module independent
    - Validation before processing
    - XSS prevention throughout

3. **Testing**
    - Tests colocated with `src/tests/`
    - One test file per module
    - 80%+ coverage targets

4. **Documentation**
    - Comprehensive guides in root
    - Inline code comments
    - JSDoc for functions

5. **Configuration**
    - Centralized in `config.js`
    - Environment-specific in `.env`
    - Build config separate

---

## Adding New Features

### File Placement

```
New Feature Workflow:
1. Create src/newFeature.js
2. Add export functions
3. Create src/tests/newFeature.test.js
4. Add selectors/config to config.js
5. Call setup in app.js
6. Add JSDoc comments
7. Update ARCHITECTURE.md
```

### Example: Adding Dark Mode

```javascript
// src/darkMode.js
export function setupDarkMode() {
  // Implementation
}

// src/app.js
import { setupDarkMode } from './darkMode.js';

export async function initApp() {
  // ... existing code
  setupDarkMode();
  // ... rest of init
}

// src/config.js
export const CONFIG = {
  // ... existing config
  SELECTORS: {
    // ... existing selectors
    darkModeToggle: '#dark-mode-btn',
  },
};

// src/tests/darkMode.test.js
import { describe, it, expect } from 'vitest';
import { setupDarkMode } from '../darkMode.js';

describe('Dark Mode', () => {
  it('should toggle dark mode', () => {
    // Test implementation
  });
});
```

---

## Quick Navigation

| I want to...          | See file             | Location   |
|-----------------------|----------------------|------------|
| Understand the system | ARCHITECTURE.md      | Root       |
| API reference         | API_DOCUMENTATION.md | Root       |
| Set up locally        | SETUP.md             | Root       |
| Contributing          | CONTRIBUTING.md      | Root       |
| Deploy to production  | DEPLOYMENT_GUIDE.md  | Root       |
| Add new tests         | src/tests/\*.test.js | src/tests/ |
| Configure build       | vite.config.js       | Root       |
| Add new feature       | src/feature.js       | src/       |
| Find a module         | This file            | Root       |

---

## Next Steps

1. **Explore modules**: See [ARCHITECTURE.md](ARCHITECTURE.md)
2. **API reference**: Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
3. **Add features**: Use structure described in [Adding New Features](#adding-new-features)
4. **Run tests**: See [TESTING_GUIDE.md](TESTING_GUIDE.md)
5. **Deploy**: Follow [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
