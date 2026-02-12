/**
 * Utility Functions Module
 * Common helper functions for the application
 * @module utils
 */

/**
 * Debounce function to limit method calls
 * @function debounce
 * @param {Function} func - Function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit method calls
 * @function throttle
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;

  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if element is in viewport
 * @function isElementInViewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if in viewport
 */
export function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Safe DOM query selector
 * @function querySafe
 * @param {string} selector - CSS selector
 * @param {Document|HTMLElement} context - Context element
 * @returns {HTMLElement|null} Found element
 */
export function querySafe(selector, context = document) {
  try {
    return context.querySelector(selector);
  } catch (error) {
    console.error(`Invalid selector: ${selector}`, error);
    return null;
  }
}

/**
 * Safe DOM query selector all
 * @function querySafeAll
 * @param {string} selector - CSS selector
 * @param {Document|HTMLElement} context - Context element
 * @returns {NodeList} Found elements
 */
export function querySafeAll(selector, context = document) {
  try {
    return context.querySelectorAll(selector);
  } catch (error) {
    console.error(`Invalid selector: ${selector}`, error);
    return [];
  }
}

/**
 * Get scroll position
 * @function getScrollPosition
 * @returns {number} Current scroll Y position
 */
export function getScrollPosition() {
  return window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
}

/**
 * Smooth scroll to element
 * @function scrollToElement
 * @param {HTMLElement} element - Target element
 * @param {Object} options - Scroll options
 * @returns {void}
 */
export function scrollToElement(element, options = {}) {
  const defaults = {
    behavior: 'smooth',
    block: 'start',
  };

  element.scrollIntoView({ ...defaults, ...options });
}

/**
 * Add class to element
 * @function addClass
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name to add
 * @returns {void}
 */
export function addClass(element, className) {
  element?.classList?.add(className);
}

/**
 * Remove class from element
 * @function removeClass
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name to remove
 * @returns {void}
 */
export function removeClass(element, className) {
  element?.classList?.remove(className);
}

/**
 * Toggle class on element
 * @function toggleClass
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name to toggle
 * @returns {void}
 */
export function toggleClass(element, className) {
  element?.classList?.toggle(className);
}

/**
 * Check if element has class
 * @function hasClass
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name to check
 * @returns {boolean} True if element has class
 */
export function hasClass(element, className) {
  return element?.classList?.contains(className) ?? false;
}

/**
 * Log message with timestamp (development only)
 * @function log
 * @param {string} message - Message to log
 * @param {any} data - Optional data to log
 * @returns {void}
 */
export function log(message, data = null) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${message}`, data || '');
}
