/**
 * Utils Module Tests
 */

import { beforeEach, describe, expect, it } from 'vitest';
import {
  addClass,
  debounce,
  hasClass,
  isElementInViewport,
  querySafe,
  removeClass,
  throttle,
} from '../modules/utils.js';

describe('Utils Module', () => {
  describe('debounce', () => {
    it('should debounce function calls', async () => {
      let callCount = 0;
      const fn = () => {
        callCount++;
      };
      const debouncedFn = debounce(fn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(callCount).toBe(0);

      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(callCount).toBe(1);
    });
  });

  describe('throttle', () => {
    it('should throttle function calls', async () => {
      let callCount = 0;
      const fn = () => {
        callCount++;
      };
      const throttledFn = throttle(fn, 100);

      throttledFn();
      throttledFn();
      throttledFn();

      expect(callCount).toBe(1);

      await new Promise((resolve) => setTimeout(resolve, 150));
      throttledFn();
      expect(callCount).toBe(2);
    });
  });

  describe('querySafe', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="test">Content</div>';
    });

    it('should safely query element', () => {
      const element = querySafe('#test');
      expect(element).toBeTruthy();
      expect(element.textContent).toBe('Content');
    });

    it('should return null for non-existent element', () => {
      const element = querySafe('#non-existent');
      expect(element).toBeNull();
    });
  });

  describe('Class manipulation', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="test"></div>';
    });

    it('should add class', () => {
      const element = document.getElementById('test');
      addClass(element, 'active');
      expect(hasClass(element, 'active')).toBe(true);
    });

    it('should remove class', () => {
      const element = document.getElementById('test');
      element.classList.add('active');
      removeClass(element, 'active');
      expect(hasClass(element, 'active')).toBe(false);
    });

    it('should handle null element gracefully', () => {
      expect(() => {
        addClass(null, 'active');
        removeClass(null, 'active');
        hasClass(null, 'active');
      }).not.toThrow();
    });
  });

  describe('isElementInViewport', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="test"></div>';
    });

    it('should check if element is in viewport', () => {
      const element = document.getElementById('test');
      // Element created in test is in viewport
      const inViewport = isElementInViewport(element);
      expect(typeof inViewport).toBe('boolean');
    });
  });
});
