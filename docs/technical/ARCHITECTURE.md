# Architecture Documentation

## System Overview

The portfolio application follows a **modular ES6 architecture** with clear separation of concerns. The system is
designed for:

- **Security first** - Input validation and XSS prevention at core
- **Privacy by design** - Analytics without PII collection
- **Offline capability** - Service Worker caching strategy
- **Scalability** - Easy to add features without modifying existing modules

---

## Architectural Layers

```
┌─────────────────────────────────────────────┐
│         Index.html (DOM)                    │
│     (structure & navigation)                │
├─────────────────────────────────────────────┤
│         Application Layer (app.js)          │
│     (orchestration & initialization)       │
├─────────────────────────────────────────────┤
│  ┌──────────────┬──────────────────────┐   │
│  │   Feature    │   Infrastructure     │   │
│  │  Modules     │     Modules          │   │
│  ├──────────────┼──────────────────────┤   │
│  │ • Form       │ • Security           │   │
│  │ • Nav        │ • Analytics          │   │
│  │ • UI (animations, notifications)  │   │
│  │ • LazyLoad   │ • CookieConsent      │   │
│  │ • Service    │ • ServiceWorker      │   │
│  │   Worker     │ • Utils & Config     │   │
│  └──────────────┴──────────────────────┘   │
├─────────────────────────────────────────────┤
│    Infrastructure Layer (styles.css)        │
│       (visual presentation)                 │
├─────────────────────────────────────────────┤
│      External Services                      │
│  (Analytics sink, Service Workers)          │
└─────────────────────────────────────────────┘
```

---

## Core Modules

### 1. Application Orchestration: `app.js`

**Responsibility**: Initialize and coordinate all application features.

**Key Pattern**: Initialization chain

```
1. Security headers setup
2. Cookie consent initialization
3. Analytics setup (with error tracking)
4. PWA registration
5. Feature module initialization (in order of dependency)
```

**Dependencies**: All feature modules
**Exports**: Initialize function

**Flow**:

```
Document Ready
    ↓
initApp() called
    ↓
Security initialized (CSP headers)
    ↓
Cookie Consent Manager ready
    ↓
Analytics tracking enabled
    ↓
Service Worker registered (PWA)
    ↓
Form, Navigation, UI, LazyLoad setup
    ↓
All features operational
```

---

### 2. Security: `security.js`

**Responsibility**: Input validation and XSS prevention

**Pattern**: Utility functions with safe defaults

**Exported Functions**:

```javascript
sanitizeHTML(html: string): string
// Removes: <script>, <iframe>, <embed>, <object> tags
// Strips: onclick, onerror, onload, onmouseover events
// Safety: Triple-layer protection

validateEmail(email: string): boolean
// RFC-compliant email regex
// Handles: quoted strings, subdomains, TLDs
// Edge cases: '+' addressing, dots in local part

validateURL(url: string): boolean
// Checks: protocol (http/https only)
// Validates: domain structure
// Prevents: javascript: and data: protocols

isSafeInput(input: string): boolean
// Detects: <script>, {%, ${, alert(, onclick, etc.
// Returns: true for safe strings
// Used by: Form validation

generateCSPHeader(): string
// Creates: Content-Security-Policy header
// Includes: Connect-src for analytics endpoints
// Returns: Production-ready CSP string

getSecurityHeaders(): Object
// Returns: All security headers object
// Includes: HSTS, X-Frame-Options, X-Content-Type-Options
```

**Test Coverage**: 11 tests, 74.28% coverage

**Example Usage**:

```javascript
import { sanitizeHTML, validateEmail } from './security.js';

const userInput = '<img src=x onerror="alert(1)">';
const safe = sanitizeHTML(userInput); // Safe HTML

if (validateEmail(email)) {
  // Proceed with submission
}
```

---

### 3. Analytics: `analytics.js`

**Responsibility**: Privacy-first error and event tracking

**Pattern**: Singleton class

```javascript
class Analytics {
  // Properties
  sessionId          // UUID4 generated once
  isEnabled          // From environment VITE_ANALYTICS_ENABLED
  endpoint           // From environment VITE_ANALYTICS_ENDPOINT

  // Methods
  trackPageView()            // Logs page view with path
  trackEvent(name, data)     // Custom events
  trackPerformanceMetrics()  // Core Web Vitals
  setupErrorTracking()       // Listen to errors/rejections
  getSessionAnalytics()      // Retrieve session data
}

// Singleton instance
export const analytics = new Analytics();
```

**Data Collected** (NO PERSONAL DATA):

```javascript
{
  sessionId,          // UUID4
  timestamp,          // ISO 8601
  path,               // URL path only
  eventName,          // Custom event identifier
  errorMessage,       // Error message (no stack)
  source,             // Error source file
  type,               // 'pageview', 'event', 'error', 'metric'
  metrics: {
    lcpValue,         // Largest Contentful Paint
    clsValue,         // Cumulative Layout Shift
    fidValue          // First Input Delay
  }
}
```

**Send Strategy**:

1. Attempts: `navigator.sendBeacon()` (reliable)
2. Fallback: `fetch()` with keepalive (if sendBeacon fails)
3. Silent fail: No user disruption if both fail

**Error Handling**:

- Listens to: `window.error`, `unhandledrejection`
- Automatic reporting: Errors sent immediately
- No retry: One-time send attempts

**Example Usage**:

```javascript
import { analytics } from './analytics.js';

// Track page views automatically (called by navigation)
analytics.trackPageView();

// Track custom events
analytics.trackEvent('form_submitted', {
  formName: 'contact',
  fieldCount: 3,
});
```

---

### 4. Cookie Consent: `cookieConsent.js`

**Responsibility**: GDPR/CCPA compliant consent management

**Pattern**: Singleton manager class

```javascript
class CookieConsentManager {
  // Methods
  init()                    // Check existing consent
  showBanner()             // Display consent UI
  handleConsent(choice)    // Save user choice
  saveConsent(data)        // localStorage + secure cookie
  getConsent()             // Retrieve consent preferences
  hasConsent(type)         // Check specific consent
  reset()                  // Clear and reshows banner
  getStatus()              // Current consent status
}
```

**Consent Types**:

```javascript
{
  essential: true,    // Always true (required)
  analytics: boolean, // User choice
  marketing: boolean  // User choice (reserved for future)
}
```

**Storage**:

- **localStorage**: `portfolio-cookie-consent` (for JS access)
- **HTTP Cookie**: `__Host-portfolio-consent` (for servers)
    - Max-Age: 1 year (31536000 seconds)
    - SameSite: Strict (CSRF protection)
    - HttpOnly: Not set (JS access needed)
    - Secure: In production

**UI Banner**:

- Appears on first visit
- Options: "Essential Only", "Accept Analytics", "Accept All"
- Slide-up animation with responsive design
- Mobile: Single column, full-width buttons

**Example Usage**:

```javascript
import { cookieConsent } from './cookieConsent.js';

// Initialize on page load
cookieConsent.init();

// Check if analytics allowed
if (cookieConsent.hasConsent('analytics')) {
  // Enable analytics tracking
}
```

---

### 5. Form Handling: `formHandler.js`

**Responsibility**: Form validation and submission

**Key Functions**:

```javascript
setupContactForm(); // Initialize form listeners
handleFormSubmit(event); // Validate and submit
validateForm(formData); // Validate all fields
setError(field, message); // Display field error
setupFieldValidation(); // Real-time validation
isValidEmail(email); // Email validation
```

**Validation Rules**:

```javascript
FORM_FIELDS = {
  name: {
    selector: '#name',
    minLength: 2,
    pattern: /^[a-zA-Z\s'-]+$/,
    errorMsg: 'Name must be 2+ characters',
  },
  email: {
    selector: '#email',
    validators: ['email'],
    errorMsg: 'Please enter valid email',
  },
  message: {
    selector: '#message',
    minLength: 10,
    errorMsg: 'Message must be 10+ characters',
  },
};
```

**Submission Flow**:

1. Validate all fields
2. Show loading state (visual feedback)
3. Simulate submission (2s delay)
4. Success or error notification
5. Reset form or show errors

**Security**:

- Input sanitization on all fields
- XSS prevention via `isSafeInput()`
- No sensitive data in logs

---

### 6. Navigation: `navigation.js`

**Responsibility**: Mobile menu and scroll tracking

**Key Functions**:

```javascript
setupMobileMenu(); // Initialize hamburger
toggleMenu(); // Toggle menu visibility
closeMenu(); // Close with focus management
setupActiveNavTracking(); // Track active section
setupSmoothScroll(); // Smooth anchor scrolling
```

**Features**:

- Hamburger desktop hidden, mobile visible
- Escape key closes menu
- Click outside closes menu
- Smooth scroll to anchors
- Active link highlighting on scroll
- Focus management for accessibility

**Mobile Menu Behavior**:

```
Desktop (>768px):     Mobile (<768px):
Nav visible           Nav hidden (hamburger)
Static positioning    Fixed overlay
No animation          Slide animation
```

---

### 7. Lazy Loading: `lazyLoading.js`

**Responsibility**: Progressive image loading for performance

**Pattern**: IntersectionObserver API

**Key Functions**:

```javascript
setupLazyLoading(); // Initialize observers
setupIntersectionObserver(); // Create observer with 50px margin
loadImage(img); // Load individual image
loadAllImages(); // Fallback for older browsers
```

**Loading Strategy**:

1. Detect images with `data-src` attribute
2. IntersectionObserver watches with 50px margin
3. When visible: Load image and remove `data-src`
4. Fallback: Load all images for unsupported browsers

**Attributes Required**:

```html
<img data-src="path/to/image.jpg" alt="Description" class="lazy" />
```

---

### 8. UI Interactions: `ui.js`

**Responsibility**: User interactions and animations

**Key Functions**:

```javascript
showNotification(message, type); // Alert/success/error
setupScrollToTop(); // Back-to-top button
createScrollToTopButton(); // Dynamic button creation
setupScrollAnimations(); // Fade-in animations
updateActiveSection(sectionId); // Highlight in nav
setupTooltips(); // Tooltip management
```

**Notifications**:

- Types: `alert`, `success`, `error`
- Auto-dismiss: 5 seconds
- Stacking: Multiple notifications supported
- Animation: Fade-in and slide-down

**Scroll Animations**:

- IntersectionObserver with 50px margin
- Fade-in effect on scroll
- Smooth animation timing (0.3s)

---

### 9. Utilities: `utils.js`

**Responsibility**: Reusable helper functions

**Timing Functions**:

```javascript
debounce(fn, delay); // Delay function execution
throttle(fn, delay); // Limit execution frequency
```

**DOM Utilities**:

```javascript
querySafe(selector); // Safe single element query
querySafeAll(selector); // Safe multiple elements query
addClass(el, className); // Add class safely
removeClass(el, className); // Remove class safely
toggleClass(el, className); // Toggle class safely
hasClass(el, className); // Check class existence
```

**Scroll Utilities**:

```javascript
getScrollPosition(); // Get current scroll Y
scrollToElement(el); // Smooth scroll to element
isElementInViewport(el); // Check visibility
```

**Logging**:

```javascript
log(message, data); // Development logging (stripped in production)
```

**Pattern**: All functions include null/undefined checks

---

### 10. Service Worker: `serviceWorker.js`

**Responsibility**: PWA offline capability

**Key Functions**:

```javascript
registerServiceWorker(); // Register SW with fallback
isServiceWorkerActive(); // Check SW status
```

**Implementation** (`public/service-worker.js`):

- Cache Name: `portfolio-v1`
- Cache Strategy: Cache-first for assets
- Offline Fallback: Display cached `index.html`
- Install: Cache resources
- Activate: Clean old caches
- Fetch: Intercept and serve from cache

---

### 11. Configuration: `config.js`

**Responsibility**: Centralized constants and configuration

```javascript
export const CONFIG = {
  CACHE_NAME: 'portfolio-v1',

  SELECTORS: {
    hamburger: '#hamburger',
    navMenu: '#nav-menu',
    contactForm: '#contact-form',
    // ... etc
  },

  DELAYS: {
    debounce: 100,
    throttle: 250,
    formSubmit: 1500,
    notificationDismiss: 5000,
  },
};

export const FORM_FIELDS = {
  name: {
    /* validation rules */
  },
  email: {
    /* validation rules */
  },
  message: {
    /* validation rules */
  },
};
```

---

## Build Configuration

### Vite (`vite.config.js`)

```javascript
{
  build: {
    target: 'ES2022',           // Modern JS features
    minify: 'terser',           // Aggressive minification
    terserOptions: {
      compress: {
        drop_console: true,     // Remove console.log in production
        drop_debugger: true     // Remove debugger statements
      }
    },
    cssCodeSplit: false         // Single CSS file
  }
}
```

**Result**: 11.4 KB main bundle (highly optimized)

### Vitest (`vitest.config.js`)

```javascript
{
  environment: 'jsdom',
  coverage: {
    include: ['src/**/*.js'],
    exclude: ['src/tests/**', 'src/config.js'],
    thresholds: {
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    }
  }
}
```

**Result**: 19 tests, 100% passing, 80%+ coverage

---

## Data Flow

### Page Load Sequence

```
1. HTML Parse
   ↓
2. CSS Load → Styles applied
   ↓
3. JavaScript Execute
   ↓
4. app.js runs initApp()
   ↓
5. Security initialization (CSP headers)
   ↓
6. CookieConsent.init()
   → Check localStorage/cookie
   → Show banner if first visit
   ↓
7. Analytics.setupErrorTracking()
   → Listen to errors/rejections
   ↓
8. Service Worker register
   ↓
9. Feature modules initialize
   → formHandler.setupContactForm()
   → navigation.setupMobileMenu()
   → lazyLoading.setupLazyLoading()
   → ui.setupScrollToTop()
   → etc.
   ↓
10. Page fully interactive
```

### Form Submission Flow

```
User enters data
   ↓
setupFieldValidation() → Real-time errors
   ↓
User submits form
   ↓
handleFormSubmit() triggered
   ↓
validateForm() ensures:
   - No empty fields
   - Email valid format
   - All fields sanitized
   ↓
Security checks pass?
   → Yes: Continue
   → No: Show errors, stop
   ↓
Show loading state (1.5s)
   ↓
Success/Error notification (5s auto-dismiss)
   ↓
Form reset or show errors
```

### Analytics Event Flow

```
Event occurs (error, pageview, etc.)
   ↓
analytics.trackPageView() called
   ↓
Build data object (anonymized):
{
  sessionId,
  timestamp,
  type,
  data
}
   ↓
Send via navigator.sendBeacon()
   ↓
Fallback: fetch() with keepalive
   ↓
Server receives (no guaranteed delivery)
   ↓
Analytics endpoint processes
```

---

## Security Architecture

### Input Validation Layer

```
User Input (HTML form)
   ↓
Client-side validation:
   - Email format check
   - URL validation
   - Length requirements
   ↓
XSS prevention:
   - isSafeInput() checks for patterns
   - sanitizeHTML() removes dangerous tags
   ↓
Submission to form handler
```

### CSP Headers

```
Generated per request with:
- default-src 'self'                    # Only same-origin
- script-src 'self' 'wasm-unsafe-eval' # Scripts + WebAssembly
- style-src 'self' data:                # Styles + data URIs
- font-src 'self' data:                 # Fonts
- img-src 'self' data: https:           # Images + HTTPS
- connect-src 'self' (analytics)        # Analytics endpoints
- frame-ancestors 'none'                # No embedding
- base-uri 'self'                       # Base URL restriction
```

---

## State Management

The application uses minimal state:

1. **Cookie Consent State** → localStorage + cookie
2. **Analytics Session ID** → Memory + optional localStorage
3. **Form Errors** → DOM attributes
4. **UI State** → CSS classes + DOM attributes

**No external state library** - Simple and efficient

---

## Performance Optimizations

### Build Time

- Vite: 1.07 seconds
- Hot reload: Instant
- Minification: Terser aggressive settings

### Runtime

- Debounce scroll: 100ms
- Throttle events: 250ms
- Lazy load images: 50px margin preload
- Service Worker caching: 1-year assets

### Bundle Size

- Main JS: 11.4 KB
- CSS: 95.6 KB (with FontAwesome)
- Total: ~244 KB

---

## Testing Strategy

### Unit Tests

- **Security module**: 11 tests
    - sanitizeHTML edge cases
    - Email/URL validation
    - XSS prevention checks
- **Utils module**: 8 tests
    - Debounce/throttle timing
    - DOM manipulation safety
    - Scroll calculations

### Test Environment

- jsdom: Simulates DOM
- Global mocks: matchMedia, IntersectionObserver
- Cleanup: afterEach DOM reset

---

## Extension Points

To add features:

1. **New Feature Module**: Create in `src/feature.js`
2. **Module Exports**: `export function setupFeature() { ... }`
3. **Call in app.js**: Add to `initApp()` sequence
4. **Add Tests**: Create `src/tests/feature.test.js`
5. **Update Config**: Add selectors/rules to `config.js`

---

## Dependencies

### Production

- None! Pure vanilla JavaScript
- FontAwesome: Icons only (CSS)

### Development

- Vite: Build tool
- Vitest: Testing
- ESLint: Linting
- Prettier: Formatting

**Total**: 211 packages (dev dependencies only)

---

## Conclusion

This architecture provides:
✅ Clear separation of concerns  
✅ Security-first design  
✅ Privacy-preserving analytics  
✅ Testable, maintainable code  
✅ Excellent performance  
✅ Offline capability  
✅ GDPR/CCPA compliance

For questions or improvements, see [CONTRIBUTING.md](CONTRIBUTING.md).
