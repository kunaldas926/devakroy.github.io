# API Documentation

Complete reference for all exported functions and modules in the portfolio application.

---

## Table of Contents

1. [Security Module](#security-module)
2. [Analytics Module](#analytics-module)
3. [Cookie Consent Module](#cookie-consent-module)
4. [Form Handler Module](#form-handler-module)
5. [Navigation Module](#navigation-module)
6. [Lazy Loading Module](#lazy-loading-module)
7. [UI Module](#ui-module)
8. [Utils Module](#utils-module)
9. [Service Worker Module](#service-worker-module)
10. [Config Module](#config-module)

---

## Security Module

**File**: `src/security.js`

Provides input validation and XSS prevention utilities.

### sanitizeHTML(html)

Removes dangerous HTML tags and event handlers.

**Signature**:

```javascript
sanitizeHTML(html: string): string
```

**Parameters**:

- `html` (string): HTML string to sanitize

**Returns**: Sanitized HTML string safe for display

**Removes**:

- `<script>` tags
- `<iframe>` tags
- `<embed>` tags
- `<object>` tags
- Event handlers: onclick, onerror, onload, onmouseover, onmouseenter, onmouseleave

**Example**:

```javascript
import { sanitizeHTML } from './security.js';

const unsafe = '<img src=x onerror="alert(1)">';
const safe = sanitizeHTML(unsafe);
// Result: '<img src="x">'
```

**Notes**:

- Triple-layer protection (tag removal + handler stripping + content extraction)
- Strips all dangerous attributes
- Returns plain text content in worst case

---

### validateEmail(email)

Validates email address format using RFC-compliant regex.

**Signature**:

```javascript
validateEmail(email: string): boolean
```

**Parameters**:

- `email` (string): Email address to validate

**Returns**: `true` if valid, `false` otherwise

**Supports**:

- Quoted strings in local part
- Subdomains (e.g., user@subdomain.example.com)
- Plus addressing (e.g., user+tag@example.com)
- Dots in local part
- Multiple TLD levels (.co.uk, etc.)

**Example**:

```javascript
import { validateEmail } from './security.js';

validateEmail('user@example.com'); // true
validateEmail('user+tag@sub.example.co.uk'); // true
validateEmail('invalid.email'); // false
```

---

### validateURL(url)

Validates URL format and protocol.

**Signature**:

```javascript
validateURL(url: string): boolean
```

**Parameters**:

- `url` (string): URL to validate

**Returns**: `true` if valid, `false` otherwise

**Validates**:

- Protocol: Only `http://` and `https://` allowed
- Domain structure: Valid domain format
- Rejects: `javascript:`, `data:`, `file:` protocols

**Example**:

```javascript
import { validateURL } from './security.js';

validateURL('https://example.com'); // true
validateURL('http://example.com/page'); // true
validateURL('javascript:alert(1)'); // false
```

---

### isSafeInput(input)

Detects dangerous patterns in user input.

**Signature**:

```javascript
isSafeInput(input: string): boolean
```

**Parameters**:

- `input` (string): User input to check

**Returns**: `true` if safe, `false` if dangerous patterns detected

**Detects**:

- `<script>` tags
- Template literals: `${`, `<%`
- Function calls: `alert(`, `eval(`
- Event handlers: `onclick=`, `onerror=`
- Dangerous protocols: `javascript:`, `data:`

**Example**:

```javascript
import { isSafeInput } from './security.js';

isSafeInput('Hello world'); // true
isSafeInput('Hello <script>alert()</script>'); // false
isSafeInput('${1+1}'); // false
```

---

### generateCSPHeader()

Generates a Content-Security-Policy header value.

**Signature**:

```javascript
generateCSPHeader(): string
```

**Returns**: CSP header string

**Includes**:

- `default-src 'self'` - Only same-origin resources
- `script-src 'self' 'wasm-unsafe-eval'` - Scripts + WebAssembly
- `style-src 'self' data:` - StyleEnhancement + data URIs
- `font-src 'self' data:` - Custom fonts
- `img-src 'self' data: https:` - Images
- `connect-src 'self'` - API calls (add analytics endpoint)
- `frame-ancestors 'none'` - Prevent embedding

**Example**:

```javascript
import { generateCSPHeader } from './security.js';

const cspHeader = generateCSPHeader();
// Result: "default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; ..."
```

---

### getSecurityHeaders()

Returns all recommended security headers as an object.

**Signature**:

```javascript
getSecurityHeaders(): Object
```

**Returns**: Object with security header key-value pairs

**Headers Included**:

- `Content-Security-Policy` - Generated via generateCSPHeader()
- `Strict-Transport-Security` - HSTS with 1-year max-age
- `X-Content-Type-Options` - Prevent MIME sniffing
- `X-Frame-Options` - Prevent clickjacking
- `Permissions-Policy` - Restrict dangerous features

**Example**:

```javascript
import { getSecurityHeaders } from './security.js';

const headers = getSecurityHeaders();
// Result:
// {
//   'Content-Security-Policy': "default-src 'self'; ...",
//   'Strict-Transport-Security': 'max-age=31536000; ...',
//   'X-Frame-Options': 'DENY',
//   ...
// }
```

---

## Analytics Module

**File**: `src/analytics.js`

Privacy-first error tracking and event analytics using singleton pattern.

### Analytics Class

Main analytics class (instantiated as singleton).

**Signature**:

```javascript
class Analytics {
  constructor()

  trackPageView(): void

  trackEvent(name: string, data

?:
  Object
):
  void

  trackPerformanceMetrics(): void

  setupErrorTracking(): void

  send(data: Object): void

  getSessionAnalytics(): Object
}
```

---

### Singleton Instance

**Export**:

```javascript
export const analytics = new Analytics();
```

Use the singleton instance rather than creating new instances.

---

### properties

#### sessionId

- **Type**: String (UUID4)
- **Default**: Generated on instantiation
- **Purpose**: Unique session identifier
- **Scope**: Persists for page session

#### isEnabled

- **Type**: Boolean
- **Default**: From `VITE_ANALYTICS_ENABLED` environment variable
- **Purpose**: Enable/disable analytics tracking
- **Usage**: Respects user preferences and environment config

#### endpoint

- **Type**: String | null
- **Default**: From `VITE_ANALYTICS_ENDPOINT` environment variable
- **Purpose**: Analytics endpoint URL
- **Fallback**: No endpoint = development mode

---

### trackPageView()

Track a page view event.

**Signature**:

```javascript
trackPageView(): void
```

**Parameters**: None

**Effect**:

- Creates analytics event with type 'pageview'
- Includes: sessionId, timestamp, page path
- Sends: Via send() method
- No personal data collected

**Example**:

```javascript
import { analytics } from './analytics.js';

// Called automatically on page load
analytics.trackPageView();
// Logs: { sessionId, type: 'pageview', path: '/devakroy.github.io/', ... }
```

---

### trackEvent(name, data)

Track a custom event.

**Signature**:

```javascript
trackEvent(name: string, data?: Object): void
```

**Parameters**:

- `name` (string): Event identifier
- `data` (Object, optional): Custom event data

**Effect**:

- Creates event with type 'event'
- Includes: sessionId, timestamp, event name
- Custom data attached if provided
- Sends: Via send() method

**Example**:

```javascript
import { analytics } from './analytics.js';

analytics.trackEvent('form_submitted', {
  formName: 'contact',
  fieldCount: 3,
});

analytics.trackEvent('button_clicked', {
  buttonId: 'cta-primary',
});
```

---

### trackPerformanceMetrics()

Track Core Web Vitals and performance metrics.

**Signature**:

```javascript
trackPerformanceMetrics(): void
```

**Metrics**:

- **LCP** (Largest Contentful Paint): Page load speed
- **CLS** (Cumulative Layout Shift): Visual stability
- **FID** (First Input Delay): Interactivity

**Requirements**:

- Web Vitals API support (modern browsers)
- Called after page fully loads

**Example**:

```javascript
import { analytics } from './analytics.js';

// Track on page load complete
window.addEventListener('load', () => {
  analytics.trackPerformanceMetrics();
});
```

---

### setupErrorTracking()

Setup automatic error and rejection tracking.

**Signature**:

```javascript
setupErrorTracking(): void
```

**Listens To**:

- `window.error` - JavaScript errors
- `unhandledrejection` - Promise rejections

**Auto-reports**:

- Error message
- Error source file and line
- Timestamp
- Session ID

**Example**:

```javascript
import { analytics } from './analytics.js';

// Called automatically in app.js
analytics.setupErrorTracking();

// Now errors are automatically tracked:
throw new Error('Something broke');
// → Automatically sent to analytics endpoint
```

---

### send(data)

Send analytics data to endpoint.

**Signature**:

```javascript
send(data: Object): void
```

**Parameters**:

- `data` (Object): Analytics event data

**Strategy**:

1. Attempts `navigator.sendBeacon()` (reliable)
2. Fallback: `fetch()` with `keepalive: true` option
3. Silent fail: No error if both fail

**Example**:

```javascript
import { analytics } from './analytics.js';

analytics.send({
  sessionId: 'uuid',
  type: 'pageview',
  timestamp: '2026-02-12T10:30:00Z',
  path: '/devakroy.github.io/',
});
```

---

### getSessionAnalytics()

Retrieve current session analytics data.

**Signature**:

```javascript
getSessionAnalytics(): Object
```

**Returns**:

```javascript
{
  sessionId: String,
  startTime: ISO8601String,
  pageViews: Number,
  events: Array,
  errors: Array
}
```

**Example**:

```javascript
import { analytics } from './analytics.js';

const sessionData = analytics.getSessionAnalytics();
console.log(sessionData.sessionId); // UUID4
console.log(sessionData.pageViews); // Number of tracked views
```

---

## Cookie Consent Module

**File**: `src/cookieConsent.js`

GDPR/CCPA-compliant cookie consent management using singleton pattern.

### CookieConsentManager Class

**Signature**:

```javascript
class CookieConsentManager {
  constructor()

  init(): void

  showBanner(): void

  handleConsent(choice: string): void

  saveConsent(consentData: Object): void

  getConsent(): Object

  hasConsent(type: string): boolean

  reset(): void

  getStatus(): string
}
```

---

### Singleton Instance

**Export**:

```javascript
export const cookieConsent = new CookieConsentManager();
```

Use singleton instance throughout application.

---

### init()

Initialize cookie consent manager.

**Signature**:

```javascript
init(): void
```

**Effect**:

- Checks localStorage for existing consent
- Checks HTTP cookie for existing consent
- Shows banner if no consent found
- Silently initializes if consent exists

**Example**:

```javascript
import { cookieConsent } from './cookieConsent.js';

// Called in app.js
cookieConsent.init();
```

---

### showBanner()

Display cookie consent banner UI.

**Signature**:

```javascript
showBanner(): void
```

**UI Elements**:

- Modal overlay (semi-transparent)
- Consent message (GDPR compliant text)
- Three buttons:
    1. "Essential Only" - Reject analytics
    2. "Accept Analytics" - Accept analytics only
    3. "Accept All" - Accept all tracking

**Example**:

```javascript
import { cookieConsent } from './cookieConsent.js';

// Manually show banner (normally auto-triggered)
cookieConsent.showBanner();
```

---

### handleConsent(choice)

Process user consent choice.

**Signature**:

```javascript
handleConsent(choice: string): void
```

**Parameters**:

- `choice` (string): 'essential' | 'analytics' | 'all'

**Effect**:

- Saves consent to storage
- Hides banner
- Triggers analytics if accepted

**Example**:

```javascript
import { cookieConsent } from './cookieConsent.js';

// Called when user clicks banner button
cookieConsent.handleConsent('analytics');
// → Saves consent, hides banner, enables analytics
```

---

### saveConsent(consentData)

Save consent data to storage.

**Signature**:

```javascript
saveConsent(consentData: Object): void
```

**Parameters**:

```javascript
{
  essential: true,     // Always required
  analytics: boolean,  // User choice
  marketing: false,    // Reserved for future
  timestamp: ISO8601,  // When consent recorded
  version: '1.0'       // Consent version
}
```

**Storage**:

- localStorage: `portfolio-cookie-consent`
- HTTP Cookie: `__Host-portfolio-consent`
    - Max-Age: 31536000 (1 year)
    - SameSite: Strict
    - Secure: In production

**Example**:

```javascript
import { cookieConsent } from './cookieConsent.js';

cookieConsent.saveConsent({
  essential: true,
  analytics: true,
  marketing: false,
});
```

---

### getConsent()

Retrieve current consent preferences.

**Signature**:

```javascript
getConsent(): Object
```

**Returns**:

```javascript
{
  essential: Boolean,
  analytics: Boolean,
  marketing: Boolean,
  timestamp: String,
  version: String
}
```

**Example**:

```javascript
import { cookieConsent } from './cookieConsent.js';

const consent = cookieConsent.getConsent();
console.log(consent.analytics); // true or false
```

---

### hasConsent(type)

Check if user has consented to specific type.

**Signature**:

```javascript
hasConsent(type: string): boolean
```

**Parameters**:

- `type` (string): 'essential' | 'analytics' | 'marketing'

**Returns**: `true` if consented, `false` otherwise

**Example**:

```javascript
import { cookieConsent } from './cookieConsent.js';

if (cookieConsent.hasConsent('analytics')) {
  // Enable analytics tracking
  analytics.trackPageView();
}
```

---

### reset()

Clear consent and show banner again.

**Signature**:

```javascript
reset(): void
```

**Effect**:

- Clears localStorage consent
- Clears HTTP cookie
- Shows banner again
- User can make new choice

**Example**:

```javascript
import { cookieConsent } from './cookieConsent.js';

// Add reset button to settings
document.getElementById('reset-consent-btn').addEventListener('click', () => {
  cookieConsent.reset();
});
```

---

### getStatus()

Get human-readable consent status.

**Signature**:

```javascript
getStatus(): string
```

**Returns**: 'not-set' | 'accepted' | 'rejected'

**Example**:

```javascript
import { cookieConsent } from './cookieConsent.js';

if (cookieConsent.getStatus() === 'not-set') {
  console.log('User has not made consent choice yet');
}
```

---

## Form Handler Module

**File**: `src/formHandler.js`

Contact form validation and submission handling.

### setupContactForm()

Initialize form listeners and validation.

**Signature**:

```javascript
setupContactForm(): void
```

**Selectors** (from config):

- Form: `#contact-form`
- Fields: `#name`, `#email`, `#message`
- Submit button: `[type="submit"]`

**Effect**:

- Attaches submit listener
- Sets up field validation
- Clears previous errors

**Example**:

```javascript
import { setupContactForm } from './formHandler.js';

// Called in app.js
setupContactForm();
```

---

### handleFormSubmit(event)

Handle form submission and validation.

**Signature**:

```javascript
handleFormSubmit(event: Event): void
```

**Parameters**:

- `event` (Event): Form submit event

**Flow**:

1. Prevents default submission
2. Validates all fields
3. Sanitizes input
4. Shows loading state (1.5s)
5. Simulates submission
6. Shows success or error notification
7. Resets form or displays errors

**Example**:

```javascript
// Automatically triggered on form submit
// HTML: <form id="contact-form" onsubmit="handleFormSubmit(event)">
```

---

### validateForm(formData)

Validate all form fields.

**Signature**:

```javascript
validateForm(formData: Object): boolean
```

**Parameters**:

```javascript
{
  name: string,
  email: string,
  message: string
}
```

**Validations**:

- **name**: Min 2 characters, alphanumeric + spaces/hyphens/apostrophes
- **email**: Valid email format (RFC-compliant)
- **message**: Min 10 characters, no dangerous content

**Returns**: `true` if all valid, `false` otherwise

**Example**:

```javascript
import { validateForm } from './formHandler.js';

const valid = validateForm({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello, this is a test message',
});
console.log(valid); // true or false
```

---

### setError(field, message)

Display field validation error.

**Signature**:

```javascript
setError(field: string, message: string): void
```

**Parameters**:

- `field` (string): Field ID (name, email, message)
- `message` (string): Error message to display

**Effect**:

- Adds `.error` class to field
- Displays error message below field
- Sets `aria-invalid="true"` for accessibility

**Example**:

```javascript
import { setError } from './formHandler.js';

setError('email', 'Please enter a valid email address');
```

---

### setupFieldValidation()

Setup real-time field validation.

**Signature**:

```javascript
setupFieldValidation(): void
```

**Effect**:

- Attaches `blur` listeners to all fields
- Validates on field exit
- Clears errors on valid input
- Shows error immediately on re-enter

**Example**:

```javascript
// Called automatically by setupContactForm()
import { setupFieldValidation } from './formHandler.js';

setupFieldValidation();
```

---

### isValidEmail(email)

Validate email format.

**Signature**:

```javascript
isValidEmail(email: string): boolean
```

**Parameters**:

- `email` (string): Email to validate

**Returns**: `true` if valid, `false` otherwise

**Example**:

```javascript
import { isValidEmail } from './formHandler.js';

if (isValidEmail(userEmail)) {
  // Proceed
}
```

---

## Navigation Module

**File**: `src/navigation.js`

Mobile menu and scroll-based navigation.

### setupMobileMenu()

Initialize mobile hamburger menu.

**Signature**:

```javascript
setupMobileMenu(): void
```

**Selectors**:

- Hamburger button: `#hamburger`
- Nav menu: `#nav-menu`

**Features**:

- Toggle menu on hamburger click
- Close on Escape key
- Close on outside click
- ARIA labels for accessibility

**Example**:

```javascript
import { setupMobileMenu } from './navigation.js';

// Called in app.js
setupMobileMenu();
```

---

### toggleMenu()

Toggle mobile menu visibility.

**Signature**:

```javascript
toggleMenu(): void
```

**Effect**:

- Toggle `.active` class on menu
- Update ARIA attributes
- Visual animation (CSS transition)

**Example**:

```javascript
import { toggleMenu } from './navigation.js';

// Manually toggle (normally auto-triggered by hamburger)
toggleMenu();
```

---

### closeMenu()

Close mobile menu with focus management.

**Signature**:

```javascript
closeMenu(): void
```

**Effect**:

- Remove `.active` class
- Return focus to hamburger button
- Restore body scrolling

**Example**:

```javascript
import { closeMenu } from './navigation.js';

// User clicks a nav link or Escape key
closeMenu();
```

---

### setupActiveNavTracking()

Track which section is currently in view and update nav.

**Signature**:

```javascript
setupActiveNavTracking(): void
```

**Effect**:

- Uses IntersectionObserver
- Updates active link as user scrolls
- Highlights current section in navigation

**Example**:

```javascript
// Called in app.js
import { setupActiveNavTracking } from './navigation.js';

setupActiveNavTracking();
```

---

### setupSmoothScroll()

Enable smooth scrolling to anchors.

**Signature**:

```javascript
setupSmoothScroll(): void
```

**HTML**:

```html
<a href="#section-id">Go to Section</a>
```

**Effect**:

- Intercepts anchor clicks
- Smooth scroll animation (0.5s)
- Updates history

**Example**:

```javascript
// Called in app.js
import { setupSmoothScroll } from './navigation.js';

setupSmoothScroll();
```

---

## Lazy Loading Module

**File**: `src/lazyLoading.js`

Progressive image loading for performance.

### setupLazyLoading()

Initialize lazy loading for all images.

**Signature**:

```javascript
setupLazyLoading(): void
```

**Selector**: Images with `data-src` attribute

**HTML**:

```html
<img data-src="path/to/image.jpg" alt="Description" class="lazy" />
```

**Effect**:

- Creates IntersectionObserver
- Watches for visible images
- Loads when approaching viewport (50px margin)

**Example**:

```javascript
import { setupLazyLoading } from './lazyLoading.js';

// Called in app.js
setupLazyLoading();
```

---

### setupIntersectionObserver()

Create IntersectionObserver for image loading.

**Signature**:

```javascript
setupIntersectionObserver(): void
```

**Options**:

- Root margin: 50px (preemptive loading)
- Threshold: Various (optimization)

**Example**:

```javascript
// Called by setupLazyLoading()
import { setupIntersectionObserver } from './lazyLoading.js';

setupIntersectionObserver();
```

---

### loadImage(img)

Load individual image element.

**Signature**:

```javascript
loadImage(img: HTMLElement): void
```

**Parameters**:

- `img` (HTMLElement): Image element with `data-src`

**Effect**:

- Set `src` from `data-src`
- Remove `data-src` attribute
- Add loaded state

**Example**:

```javascript
import { loadImage } from './lazyLoading.js';

const img = document.querySelector('img[data-src]');
loadImage(img); // Load immediately
```

---

### loadAllImages()

Fallback: Load all images immediately.

**Signature**:

```javascript
loadAllImages(): void
```

**Usage**: For browsers without IntersectionObserver support

**Example**:

```javascript
import { loadAllImages } from './lazyLoading.js';

// Fallback for IE11
if (!('IntersectionObserver' in window)) {
  loadAllImages();
}
```

---

## UI Module

**File**: `src/ui.js`

User interactions, animations, and notifications.

### showNotification(message, type)

Display temporary notification message.

**Signature**:

```javascript
showNotification(message: string, type?: string): void
```

**Parameters**:

- `message` (string): Notification text
- `type` (string): 'alert' | 'success' | 'error' (default: 'alert')

**Features**:

- Auto-dismiss after 5 seconds
- Stacking support (multiple notifications)
- Fade-in and slide-down animation

**Example**:

```javascript
import { showNotification } from './ui.js';

showNotification('Form submitted successfully!', 'success');
showNotification('An error occurred', 'error');
```

---

### setupScrollToTop()

Create and setup "back to top" button.

**Signature**:

```javascript
setupScrollToTop(): void
```

**Behavior**:

- Hidden when near top
- Click scrolls smoothly to top
- Fixed position in bottom-right

**Example**:

```javascript
import { setupScrollToTop } from './ui.js';

// Called in app.js
setupScrollToTop();
```

---

### createScrollToTopButton()

Create scroll to top button element.

**Signature**:

```javascript
createScrollToTopButton(): HTMLElement
```

**Returns**: Button element (not inserted into DOM yet)

**Example**:

```javascript
import { createScrollToTopButton } from './ui.js';

const btn = createScrollToTopButton();
document.body.appendChild(btn);
```

---

### setupScrollAnimations()

Setup fade-in animations on scroll.

**Signature**:

```javascript
setupScrollAnimations(): void
```

**CSS Class**: `.animate-on-scroll` (applied to elements)

**HTML**:

```html
<section class="animate-on-scroll">Content fades in</section>
```

**Example**:

```javascript
import { setupScrollAnimations } from './ui.js';

// Called in app.js
setupScrollAnimations();
```

---

### updateActiveSection(sectionId)

Update active navigation section.

**Signature**:

```javascript
updateActiveSection(sectionId: string): void
```

**Parameters**:

- `sectionId` (string): ID of current section

**Effect**:

- Updates `.active` class on nav links
- Highlights current page section

**Example**:

```javascript
import { updateActiveSection } from './ui.js';

updateActiveSection('projects');
// → Highlights projects link in navigation
```

---

### setupTooltips()

Initialize tooltip on hover.

**Signature**:

```javascript
setupTooltips(): void
```

**HTML**:

```html
<span data-tooltip="Help text">Hover me</span>
```

**Example**:

```javascript
import { setupTooltips } from './ui.js';

// Called in app.js
setupTooltips();
```

---

## Utils Module

**File**: `src/utils.js`

Reusable utility helper functions.

### debounce(fn, delay)

Delay function execution until after specified milliseconds.

**Signature**:

```javascript
debounce(fn: Function, delay: number): Function
```

**Parameters**:

- `fn` (Function): Function to debounce
- `delay` (number): Delay in milliseconds

**Returns**: Debounced function

**Use Case**: Reducing function calls during scroll, resize, typing

**Example**:

```javascript
import { debounce } from './utils.js';

const handleScroll = debounce(() => {
  console.log('Scroll ended');
}, 100);

window.addEventListener('scroll', handleScroll);
// Function called max once per 100ms
```

---

### throttle(fn, delay)

Limit function execution to once per specified milliseconds.

**Signature**:

```javascript
throttle(fn: Function, delay: number): Function
```

**Parameters**:

- `fn` (Function): Function to throttle
- `delay` (number): Delay in milliseconds

**Returns**: Throttled function

**Use Case**: Rate-limiting repeated events

**Example**:

```javascript
import { throttle } from './utils.js';

const handleMouseMove = throttle(() => {
  console.log('Mouse moved');
}, 250);

document.addEventListener('mousemove', handleMouseMove);
// Function called max once per 250ms
```

---

### querySafe(selector)

Safely query single DOM element.

**Signature**:

```javascript
querySafe(selector: string): HTMLElement | null
```

**Parameters**:

- `selector` (string): CSS selector

**Returns**: Element or null (never throws)

**Example**:

```javascript
import { querySafe } from './utils.js';

const form = querySafe('#contact-form');
if (form) {
  // Safely use form
}
```

---

### querySafeAll(selector)

Safely query multiple DOM elements.

**Signature**:

```javascript
querySafeAll(selector: string): HTMLElement[]
```

**Parameters**:

- `selector` (string): CSS selector

**Returns**: Array of elements (empty if none found, never throws)

**Example**:

```javascript
import { querySafeAll } from './utils.js';

const items = querySafeAll('.nav-link');
items.forEach((item) => {
  item.addEventListener('click', handler);
});
```

---

### addClass(el, className)

Add CSS class to element safely.

**Signature**:

```javascript
addClass(el: HTMLElement | null, className: string): void
```

**Parameters**:

- `el` (HTMLElement): Element (null-safe)
- `className` (string): Class name to add

**Example**:

```javascript
import { addClass } from './utils.js';

const nav = querySafe('#nav-menu');
addClass(nav, 'active');
```

---

### removeClass(el, className)

Remove CSS class from element safely.

**Signature**:

```javascript
removeClass(el: HTMLElement | null, className: string): void
```

**Example**:

```javascript
import { removeClass } from './utils.js';

removeClass(nav, 'active');
```

---

### toggleClass(el, className)

Toggle CSS class on element safely.

**Signature**:

```javascript
toggleClass(el: HTMLElement | null, className: string): void
```

**Example**:

```javascript
import { toggleClass } from './utils.js';

toggleClass(menu, 'active'); // Add if missing, remove if present
```

---

### hasClass(el, className)

Check if element has class (null-safe).

**Signature**:

```javascript
hasClass(el: HTMLElement | null, className: string): boolean
```

**Returns**: `true` if has class, `false` otherwise (including null)

**Example**:

```javascript
import { hasClass } from './utils.js';

if (hasClass(nav, 'active')) {
  // Navigation is active
}
```

---

### getScrollPosition()

Get current scroll Y position.

**Signature**:

```javascript
getScrollPosition(): number
```

**Returns**: Scroll Y position in pixels

**Example**:

```javascript
import { getScrollPosition } from './utils.js';

const scrollY = getScrollPosition();
if (scrollY > 300) {
  // Show back-to-top button
}
```

---

### scrollToElement(el)

Smoothly scroll to element.

**Signature**:

```javascript
scrollToElement(el: HTMLElement): void
```

**Parameters**:

- `el` (HTMLElement): Element to scroll to

**Behavior**:

- Smooth scroll animation (browser-native or polyfill)
- Handles offscreenelements

**Example**:

```javascript
import { scrollToElement } from './utils.js';

const section = querySafe('#projects');
scrollToElement(section);
```

---

### isElementInViewport(el)

Check if element is in viewport.

**Signature**:

```javascript
isElementInViewport(el: HTMLElement | null): boolean
```

**Parameters**:

- `el` (HTMLElement): Element to check

**Returns**: `true` if visible, `false` otherwise

**Example**:

```javascript
import { isElementInViewport } from './utils.js';

if (isElementInViewport(element)) {
  // Element is visible
}
```

---

### log(message, data)

Development logging (stripped in production).

**Signature**:

```javascript
log(message: string, data?: any): void
```

**Parameters**:

- `message` (string): Log message
- `data` (any, optional): Additional data to log

**Behavior**:

- Logs to console in development
- Removed in production builds (Terser strips)

**Example**:

```javascript
import { log } from './utils.js';

log('Form submitted', { fields: 3 });
// Output in dev: 'Form submitted', { fields: 3 }
// Output in prod: (nothing - stripped by Terser)
```

---

## Service Worker Module

**File**: `src/serviceWorker.js`

PWA service worker registration.

### registerServiceWorker()

Register service worker for offline support.

**Signature**:

```javascript
registerServiceWorker(): void
```

**Implementation**: `public/service-worker.js`

- Cache name: `portfolio-v1`
- Cache assets with 1-year expiry
- Network-first for HTML
- Offline fallback: cached index.html

**Example**:

```javascript
import { registerServiceWorker } from './serviceWorker.js';

// Called in app.js
registerServiceWorker();
```

---

### isServiceWorkerActive()

Check if service worker is active.

**Signature**:

```javascript
isServiceWorkerActive(): boolean
```

**Returns**: `true` if SW registered and active

**Example**:

```javascript
import { isServiceWorkerActive } from './serviceWorker.js';

if (isServiceWorkerActive()) {
  console.log('PWA offline mode available');
}
```

---

## Config Module

**File**: `src/config.js`

Centralized configuration and constants.

### CONFIG Object

Main configuration object.

```javascript
export const CONFIG = {
  CACHE_NAME: 'portfolio-v1',

  SELECTORS: {
    hamburger: '#hamburger',
    navMenu: '#nav-menu',
    contactForm: '#contact-form',
    nameField: '#name',
    emailField: '#email',
    messageField: '#message',
    scrollToTop: '.scroll-to-top',
  },

  DELAYS: {
    debounce: 100,
    throttle: 250,
    formSubmit: 1500,
    notificationDismiss: 5000,
  },

  MESSAGES: {
    formSuccess: 'Message sent successfully!',
    formError: 'Failed to send message. Try again.',
    invalidEmail: 'Please enter a valid email address',
    requiredField: 'This field is required',
  },
};
```

### FORM_FIELDS Object

Form field validation rules.

```javascript
export const FORM_FIELDS = {
  name: {
    selector: '#name',
    minLength: 2,
    pattern: /^[a-zA-Z\s'-]+$/,
    errorMsg: 'Name must be 2+ characters',
  },
  email: {
    selector: '#email',
    minLength: 1,
    validators: ['email'],
    errorMsg: 'Please enter a valid email',
  },
  message: {
    selector: '#message',
    minLength: 10,
    errorMsg: 'Message must be 10+ characters',
  },
};
```

**Usage**:

```javascript
import { CONFIG, FORM_FIELDS } from './config.js';

const form = document.querySelector(CONFIG.SELECTORS.contactForm);
const nameField = FORM_FIELDS.name;
```

---

## Global Environment Variables

**File**: `.env.example`

Configuration via environment variables.

```
# Analytics
VITE_ANALYTICS_ENABLED=true
VITE_ANALYTICS_ENDPOINT=https://api.example.com/analytics
```

**Usage in Code**:

```javascript
const isEnabled = import.meta.env.VITE_ANALYTICS_ENABLED;
const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
```

---

## Type Checking

While using vanilla JavaScript, follow these patterns for better IDE support:

```javascript
/**
 * Function description
 * @param {HTMLElement} element - DOM element
 * @param {string} text - Text content
 * @returns {boolean} Success status
 */
function updateElement(element, text) {
  if (!element) return false;
  element.textContent = text;
  return true;
}
```

---

## Further Reading

- [README.md](README.md) - Project overview
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Testing strategies
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
