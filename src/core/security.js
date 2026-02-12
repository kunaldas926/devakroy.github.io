/**
 * Security Utilities Module
 * Input validation, sanitization, and security helpers
 * @module security
 */

// Cached regex patterns for performance
const XSS_PATTERNS = [
  /<script[^>]*>.*?<\/script>/gi,
  /on\w+\s*=/gi,
  /javascript:/gi,
  /<iframe[^>]*>.*?<\/iframe>/gi,
  /<embed[^>]*>/gi,
  /<object[^>]*>/gi,
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Sanitize HTML to prevent XSS attacks
 * Removes script tags and dangerous event handlers
 * @function sanitizeHTML
 * @param {string} input - HTML string to sanitize
 * @returns {string} Sanitized HTML
 */
export function sanitizeHTML(input) {
  if (typeof input !== 'string') return '';
  if (!input) return '';

  const temp = document.createElement('div');
  temp.innerHTML = input;

  // Remove script tags and their content
  const scripts = temp.querySelectorAll('script, iframe, embed, object');
  scripts.forEach((script) => script.remove());

  // Remove event handlers (onclick, onload, etc.)
  const allElements = temp.querySelectorAll('*');
  allElements.forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      if (attr.name.startsWith('on')) {
        el.removeAttribute(attr.name);
      }
    });
  });

  return temp.innerHTML;
}

/**
 * Validate email address
 * @function validateEmail
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export function validateEmail(email) {
  return EMAIL_REGEX.test(email);
}

/**
 * Validate URL format
 * @function validateURL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
export function validateURL(url) {
  try {
    return Boolean(new URL(url));
  } catch {
    return false;
  }
}

/**
 * Check if input is safe from common XSS patterns
 * @function isSafeInput
 * @param {string} input - Input to check
 * @returns {boolean} True if safe
 */
export function isSafeInput(input) {
  if (typeof input !== 'string') return false;
  return !XSS_PATTERNS.some((pattern) => pattern.test(input));
}

/**
 * Generate Content Security Policy header
 * @function generateCSPHeader
 * @returns {string} CSP header value
 */
export function generateCSPHeader() {
  const isDev = import.meta.env.DEV;

  const directives = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'wasm-unsafe-eval'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'font-src': ["'self'", 'data:'],
    'img-src': ["'self'", 'data:', 'https:'],
    'connect-src': ["'self'", 'https://api.github.com'],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
  };

  if (isDev) {
    // Allow localhost and WebSocket for dev
    directives['connect-src'].push('http://localhost:*', 'ws://localhost:*');
  }

  return Object.entries(directives)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
}

/**
 * Get security headers object
 * @function getSecurityHeaders
 * @returns {object} Security headers
 */
export function getSecurityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    'Content-Security-Policy': generateCSPHeader(),
  };
}

export default {
  sanitizeHTML,
  validateEmail,
  validateURL,
  isSafeInput,
  generateCSPHeader,
  getSecurityHeaders,
};
