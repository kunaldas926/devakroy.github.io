/**
 * UI Module
 * Handles notifications, scroll-to-top, and scroll animations
 * @module ui
 */

import { CONFIG } from '../core/config.js';
import { debounce } from './utils.js';

/**
 * Show notification message
 * @function showNotification
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, info)
 * @returns {void}
 */
export function showNotification(message, type = 'info') {
  // Remove existing notification
  const existingNotification = document.querySelector(CONFIG.SELECTORS.NOTIFICATION);
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create new notification
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.setAttribute('role', 'alert');
  notification.setAttribute('aria-live', 'polite');
  notification.textContent = message;

  document.body.appendChild(notification);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

/**
 * Setup scroll-to-top button
 * @function setupScrollToTop
 * @returns {void}
 */
export function setupScrollToTop() {
  const scrollTopBtn = document.querySelector(CONFIG.SELECTORS.SCROLL_TOP_BTN);

  if (!scrollTopBtn) {
    createScrollToTopButton();
    return;
  }

  const toggleScrollButton = debounce(() => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, 100);

  window.addEventListener('scroll', toggleScrollButton, { passive: true });

  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

/**
 * Create scroll-to-top button dynamically
 * @function createScrollToTopButton
 * @returns {void}
 */
function createScrollToTopButton() {
  const btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<i class="fas fa-arrow-up"></i>';

  document.body.appendChild(btn);
  setupScrollToTop();
}

/**
 * Setup scroll animation for elements
 * @function setupScrollAnimations
 * @returns {void}
 */
export function setupScrollAnimations() {
  if (!('IntersectionObserver' in globalThis)) {
    console.warn('IntersectionObserver not supported');
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scrolled-into-view');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  // Observe all animatable elements
  const animatableElements = document.querySelectorAll(
    '.fade-up, .skill-tag, .project-card, .stat',
  );

  animatableElements.forEach((element) => {
    observer.observe(element);
  });
}

/**
 * Update active section in navigation
 * @function updateActiveSection
 * @returns {void}
 */
export function updateActiveSection() {
  const updateActive = debounce(() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll(CONFIG.SELECTORS.NAV_LINKS);
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        });

        const activeLink = document.querySelector(`a.nav-link[href="#${section.id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
          activeLink.setAttribute('aria-current', 'page');
        }
      }
    });
  }, CONFIG.SCROLL_DEBOUNCE_DELAY);

  window.addEventListener('scroll', updateActive, { passive: true });
}

/**
 * Setup tooltips
 * @function setupTooltips
 * @returns {void}
 */
export function setupTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');

  tooltipElements.forEach((element) => {
    const tooltip = element.dataset.tooltip;
    element.setAttribute('title', tooltip);
    element.setAttribute('aria-label', tooltip);
  });
}
