/**
 * Image Lazy Loading Module
 * Implements IntersectionObserver for performance optimization
 * @module lazyLoading
 */

import { CONFIG } from '../core/config.js';

/**
 * Setup lazy loading for images with fallback
 * @function setupLazyLoading
 * @returns {void}
 */
export function setupLazyLoading() {
  const images = document.querySelectorAll(CONFIG.SELECTORS.IMAGES_TO_LAZY_LOAD);

  if (images.length === 0) {
    console.warn('No images found for lazy loading');
    return;
  }

  if ('IntersectionObserver' in globalThis) {
    setupIntersectionObserver(images);
  } else {
    // Fallback for older browsers
    loadAllImages(images);
  }
}

/**
 * Setup IntersectionObserver for lazy loading
 * @function setupIntersectionObserver
 * @param {NodeListOf<HTMLImageElement>} images - Images to observe
 * @returns {void}
 */
function setupIntersectionObserver(images) {
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          loadImage(img);
          imageObserver.unobserve(img);
        }
      });
    },
    {
      rootMargin: CONFIG.IMAGE_LOAD_MARGIN,
    },
  );

  images.forEach((img) => imageObserver.observe(img));
}

/**
 * Load a single image
 * @function loadImage
 * @param {HTMLImageElement} img - Image element to load
 * @returns {void}
 */
function loadImage(img) {
  const src = img.dataset.src;
  if (!src) return;

  img.src = src;
  delete img.dataset.src;
  img.classList.add('loaded');
}

/**
 * Fallback: Load all images immediately
 * @function loadAllImages
 * @param {NodeListOf<HTMLImageElement>} images - Images to load
 * @returns {void}
 */
function loadAllImages(images) {
  images.forEach(loadImage);
}
