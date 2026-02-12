# Source Code

Application source code organized by module type and responsibility.

## 📁 Structure

```
src/
├── core/                    # Core infrastructure modules
│   ├── app.js              # Application initialization (79 lines)
│   ├── config.js           # Configuration & constants (51 lines)
│   ├── security.js         # XSS prevention & validation (140 lines)
│   ├── analytics.js        # Privacy-first analytics (179 lines)
│   ├── cookieConsent.js    # GDPR consent manager (186 lines)
│   └── serviceWorker.js    # PWA service worker (37 lines)
│
├── modules/                 # Feature modules
│   ├── formHandler.js      # Form validation (178 lines)
│   ├── navigation.js       # Mobile menu & scroll tracking (117 lines)
│   ├── lazyLoading.js      # Image lazy loading (78 lines)
│   ├── ui.js               # UI interactions & animations (172 lines)
│   └── utils.js            # Helper functions (174 lines)
│
└── tests/                   # Unit test suite
    ├── setup.js            # Test environment setup (56 lines)
    ├── security.test.js    # Security module tests (11 tests)
    └── utils.test.js       # Utils module tests (8 tests)
```

## 🎯 Module Overview

### Core Infrastructure (`core/`)

**app.js** - Application initialization orchestrator

- Coordinates all feature setup in correct order
- Entry point called from script.js
- Imports from both core and modules

**config.js** - Centralized configuration

- CONFIG object with selectors and delays
- FORM_FIELDS with validation rules
- Used by all modules

**security.js** - Security & validation utilities

- sanitizeHTML() - XSS prevention
- validateEmail(), validateURL() - Format validation
- isSafeInput() - Pattern detection
- generateCSPHeader() - Security headers

**analytics.js** - Privacy-first analytics

- Analytics class with singleton instance
- trackPageView(), trackEvent() - Event tracking
- trackPerformanceMetrics() - Core Web Vitals
- setupErrorTracking() - Auto error reporting

**cookieConsent.js** - GDPR/CCPA compliance

- CookieConsentManager class
- showBanner(), handleConsent() - User interaction
- saveConsent() - localStorage + cookie storage
- getConsent(), hasConsent() - Read preferences

**serviceWorker.js** - PWA offline support

- registerServiceWorker() - Register SW
- isServiceWorkerActive() - Status check

### Feature Modules (`modules/`)

**formHandler.js** - Contact form handling

- setupContactForm() - Initialize form
- handleFormSubmit() - Process submissions
- validateForm() - Multi-field validation
- Real-time field validation

**navigation.js** - Navigation & menu

- setupMobileMenu() - Hamburger menu
- setupActiveNavTracking() - Highlight active section
- setupSmoothScroll() - Smooth anchor scrolling
- Mobile-first responsive design

**lazyLoading.js** - Image optimization

- setupLazyLoading() - Initialize lazy loading
- setupIntersectionObserver() - Observe with 50px margin
- loadImage() - Load individual image
- Progressive image loading

**ui.js** - User interactions

- showNotification() - Alert/success/error messages
- setupScrollToTop() - Back-to-top button
- setupScrollAnimations() - Fade-in on scroll
- updateActiveSection() - Nav highlighting
- setupTooltips() - Tooltip management

**utils.js** - Helper functions

- debounce(), throttle() - Function optimization
- querySafe(), querySafeAll() - Safe DOM queries
- addClass(), removeClass(), toggleClass() - Class manipulation
- scrollToElement(), isElementInViewport() - Scroll utilities
- log() - Development logging (stripped in production)

## 🔗 Module Dependencies

```
app.js (orchestrator)
├── core/security.js       ← imported via analytics
├── core/analytics.js
├── core/cookieConsent.js
├── core/serviceWorker.js
├── modules/formHandler.js
├── modules/navigation.js
├── modules/lazyLoading.js
├── modules/ui.js
└── core/config.js        ← used everywhere

modules/formHandler.js
├── core/config.js
└── modules/ui.js

modules/navigation.js
├── core/config.js
└── modules/utils.js

modules/lazyLoading.js
└── core/config.js

modules/ui.js
├── core/config.js
└── modules/utils.js
```

## 📊 Line Count

| Module           | Location | Lines     | Type          |
|------------------|----------|-----------|---------------|
| app.js           | core/    | 79        | Orchestration |
| config.js        | core/    | 51        | Configuration |
| security.js      | core/    | 140       | Security      |
| analytics.js     | core/    | 179       | Analytics     |
| cookieConsent.js | core/    | 186       | Compliance    |
| serviceWorker.js | core/    | 37        | PWA           |
| formHandler.js   | modules/ | 178       | Feature       |
| navigation.js    | modules/ | 117       | Feature       |
| lazyLoading.js   | modules/ | 78        | Feature       |
| ui.js            | modules/ | 172       | Feature       |
| utils.js         | modules/ | 174       | Utilities     |
| **Total Source** |          | **1,211** | **Code**      |
| setup.js         | tests/   | 56        | Test Setup    |
| security.test.js | tests/   | 84        | Tests         |
| utils.test.js    | tests/   | 112       | Tests         |
| **Total Tests**  |          | **252**   | **Code**      |

## 🔄 Import Patterns

### Core modules import:

```javascript
// From same core/ folder
import { CONFIG } from './config.js';
import { cookieConsentManager } from './cookieConsent.js';

// From core to modules (in app.js)
import { setupFormHandler } from '../modules/formHandler.js';
```

### Feature modules import:

```javascript
// From parent core/ folder
import { CONFIG } from '../core/config.js';

// From same modules/ folder
import { debounce } from './utils.js';
import { showNotification } from './ui.js';
```

### Tests import:

```javascript
// From parent folders
import { sanitizeHTML } from '../core/security.js';
import { debounce } from '../modules/utils.js';
```

## 🧪 Testing

### Test Files

**setup.js** - Test environment

- Global mocks: window.matchMedia, IntersectionObserver
- DOM cleanup: afterEach() handler
- console error suppression

**security.test.js** - 11 tests

- sanitizeHTML() - 3 tests
- validateEmail() - 3 tests
- validateURL() - 2 tests
- isSafeInput() - 3 tests
- Coverage: 74.28%

**utils.test.js** - 8 tests

- debounce() - timing tests
- throttle() - rate limiting tests
- DOM utilities - element manipulation
- Scroll utilities - viewport detection
- Coverage: 86.2%

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Interactive UI
npm run test:ui
```

## 🚀 Build & Load

### Entry Point

`script.js` (root) imports:

```javascript
import './styles.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './src/core/app.js'; // Loads app.js which runs initApp()
```

### Initialization Order

1. Vite loads script.js
2. script.js loads app.js
3. app.js runs initApp()
4. initApp() initializes in order:
    - Security & compliance
    - Cookie consent
    - Analytics setup
    - PWA registration
    - Feature modules (form, nav, UI, etc.)

### Build Output

Vite bundles all modules into:

- `dist/index-[hash].js` - 11.4 KB minified
- `dist/style-[hash].css` - 95.6 KB minified
- All assets copied to `dist/`

## 📁 File Locations

- **Source code**: `src/core/` and `src/modules/`
- **Tests**: `src/tests/`
- **Configuration**: Root level (package.json, vite.config.js, etc.)
- **Entry point**: `script.js` (root)
- **HTML template**: `index.html` (root)
- **Styles**: `styles.css` (root)
- **Static assets**: `public/`
- **Built output**: `dist/` (generated)

## 🔍 Adding New Features

1. **Create module** in appropriate folder (core/ or modules/)
2. **Export functions** that can be imported
3. **Add imports** to other modules if needed
4. **Update app.js** to call setup function
5. **Add tests** in src/tests/
6. **Update config.js** with any new selectors/rules

Example:

```javascript
// src/modules/darkMode.js
export function setupDarkMode() {
  // Implementation
}

// Update src/core/app.js
import { setupDarkMode } from '../modules/darkMode.js';

export async function initApp() {
  // ...
  setupDarkMode();
}
```

## 📚 Documentation

- **Technical details**: [../docs/technical/ARCHITECTURE.md](../docs/technical/ARCHITECTURE.md)
- **API reference**: [../docs/technical/API_DOCUMENTATION.md](../docs/technical/API_DOCUMENTATION.md)
- **Project structure**: [../docs/technical/PROJECT_STRUCTURE.md](../docs/technical/PROJECT_STRUCTURE.md)

---

**← Back to [docs/](../)**
