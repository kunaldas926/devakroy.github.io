/**
 * Application Initialization Module
 * Bootstrap and initialize all app features
 * @module app
 */

import { registerServiceWorker } from './serviceWorker.js';
import { setupLazyLoading } from '../modules/lazyLoading.js';
import { setupActiveNavTracking, setupMobileMenu, setupSmoothScroll, } from '../modules/navigation.js';
import { setupContactForm } from '../modules/formHandler.js';
import { setupScrollAnimations, setupScrollToTop, setupTooltips, updateActiveSection, } from '../modules/ui.js';
import { cookieConsentManager } from './cookieConsent.js';
import { analyticsInstance } from './analytics.js';

/**
 * Initialize application
 * @function initApp
 * @returns {Promise<void>}
 */
export async function initApp() {
  try {
    // Initialize security & compliance (first)
    // These singletons are instantiated to activate their initialization
    void cookieConsentManager;
    void analyticsInstance;

    // Initialize PWA
    registerServiceWorker();

    // Initialize performance features
    setupLazyLoading();

    // Initialize navigation
    setupMobileMenu();
    setupSmoothScroll();
    setupActiveNavTracking();

    // Initialize UI features
    setupContactForm();
    setupScrollToTop();
    setupScrollAnimations();
    updateActiveSection();
    setupTooltips();
  } catch (error) {
    console.error('Error initializing application:', error);
  }
}

/**
 * Initialize on DOM ready
 */
if (document.readyState === 'loading') {
  await new Promise((resolve) => {
    document.addEventListener('DOMContentLoaded', resolve);
  });
}
try {
  await initApp();
} catch (error) {
  console.error('Failed to initialize app:', error);
}
