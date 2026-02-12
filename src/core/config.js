/**
 * Configuration and constants for the portfolio application
 * @module config
 */

export const CONFIG = {
  // Service Worker
  CACHE_NAME: 'portfolio-v1',
  SW_FILE: 'service-worker.js',

  // Lazy Loading
  IMAGE_LOAD_MARGIN: '50px',
  PLACEHOLDER_SVG:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3C/svg%3E",

  // Debouncing
  SCROLL_DEBOUNCE_DELAY: 100,
  SCROLL_ANIMATION_DEBOUNCE_DELAY: 500,

  // Form
  FORM_SUBMIT_DELAY: 1500,

  // Selectors
  SELECTORS: {
    HAMBURGER: '.hamburger',
    NAV_MENU: '.nav-menu',
    NAV_LINKS: '.nav-link',
    CONTACT_FORM: '#contactForm',
    NOTIFICATION: '.notification',
    SCROLL_TOP_BTN: '.scroll-top',
    IMAGES_TO_LAZY_LOAD: 'img[data-src]',
  },
};

export const FORM_FIELDS = {
  NAME: {
    id: 'name',
    errorId: 'name-error',
    validators: ['required', 'minLength:2'],
  },
  EMAIL: {
    id: 'email',
    errorId: 'email-error',
    validators: ['required', 'email'],
  },
  MESSAGE: {
    id: 'message',
    errorId: 'message-error',
    validators: ['required', 'minLength:10'],
  },
};
