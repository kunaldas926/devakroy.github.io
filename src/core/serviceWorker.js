/**
 * Service Worker Registration Module
 * Handles PWA and offline functionality
 * @module serviceWorker
 */

import { CONFIG } from './config.js';

/**
 * Register Service Worker for offline-first experience
 * @function registerServiceWorker
 * @returns {Promise<void>}
 */
export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Workers not supported in this browser');
    return;
  }

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register(CONFIG.SW_FILE);
      console.log('ServiceWorker registration successful:', registration);
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
    }
  });
}

/**
 * Check if Service Worker is active
 * @function isServiceWorkerActive
 * @returns {boolean}
 */
export function isServiceWorkerActive() {
  return 'serviceWorker' in navigator && navigator.serviceWorker.controller !== null;
}
