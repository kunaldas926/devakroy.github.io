/**
 * Navigation Module
 * Handles mobile menu toggle and keyboard navigation
 * @module navigation
 */

import { CONFIG } from '../core/config.js';
import { debounce } from './utils.js';

/**
 * Setup mobile menu toggle
 * @function setupMobileMenu
 * @returns {void}
 */
export function setupMobileMenu() {
  const hamburger = document.querySelector(CONFIG.SELECTORS.HAMBURGER);
  const navMenu = document.querySelector(CONFIG.SELECTORS.NAV_MENU);
  const navLinks = document.querySelectorAll(CONFIG.SELECTORS.NAV_LINKS);

  if (!hamburger || !navMenu) {
    console.warn('Navigation elements not found');
    return;
  }

  // Toggle menu on hamburger click
  hamburger.addEventListener('click', () => toggleMenu(hamburger, navMenu));

  // Close menu when nav link clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => closeMenu(hamburger, navMenu));
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu(hamburger, navMenu);
    }
  });
}

/**
 * Toggle mobile menu visibility
 * @function toggleMenu
 * @param {HTMLElement} hamburger - Hamburger button
 * @param {HTMLElement} navMenu - Navigation menu
 * @returns {void}
 */
function toggleMenu(hamburger, navMenu) {
  navMenu.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
}

/**
 * Close mobile menu
 * @function closeMenu
 * @param {HTMLElement} hamburger - Hamburger button
 * @param {HTMLElement} navMenu - Navigation menu
 * @returns {void}
 */
function closeMenu(hamburger, navMenu) {
  navMenu.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.focus();
}

/**
 * Setup active navigation link tracking
 * @function setupActiveNavTracking
 * @returns {void}
 */
export function setupActiveNavTracking() {
  const updateActiveLink = debounce(() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll(CONFIG.SELECTORS.NAV_LINKS);
    const currentScroll = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const activeLink = document.querySelector(`a.nav-link[href="#${section.id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
          activeLink.setAttribute('aria-current', 'page');
        }
      }
    });
  }, CONFIG.SCROLL_DEBOUNCE_DELAY);

  window.addEventListener('scroll', updateActiveLink, { passive: true });
}

/**
 * Setup smooth scrolling for anchor links
 * @function setupSmoothScroll
 * @returns {void}
 */
export function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        // Update focus for accessibility
        target.focus({ preventScroll: true });
      }
    });
  });
}
