/**
 * Security Module Tests
 */

import { describe, expect, it } from 'vitest';
import { isSafeInput, sanitizeHTML, validateEmail, validateURL } from '../core/security.js';

describe('Security Module', () => {
  describe('sanitizeHTML', () => {
    it('should remove script tags', () => {
      const input = '<p>Hello <script>alert("xss")</script> World</p>';
      const result = sanitizeHTML(input);
      expect(result).not.toContain('script');
    });

    it('should handle empty input', () => {
      expect(sanitizeHTML('')).toBe('');
      expect(sanitizeHTML(null)).toBe('');
      expect(sanitizeHTML(undefined)).toBe('');
    });

    it('should preserve safe HTML', () => {
      const input = '<p>Hello <strong>World</strong></p>';
      const result = sanitizeHTML(input);
      expect(result).toContain('Hello');
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@example.co.uk')).toBe(true);
    });

    it('should reject invalid email', () => {
      expect(validateEmail('invalid.email')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('   ')).toBe(false);
    });
  });

  describe('validateURL', () => {
    it('should validate correct URLs', () => {
      expect(validateURL('https://example.com')).toBe(true);
      expect(validateURL('http://localhost:3000')).toBe(true);
      expect(validateURL('https://example.com/path?query=value')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(validateURL('not a url')).toBe(false);
      expect(validateURL('ht!tp://example.com')).toBe(false);
    });
  });

  describe('isSafeInput', () => {
    it('should detect XSS patterns', () => {
      expect(isSafeInput('<script>alert("xss")</script>')).toBe(false);
      expect(isSafeInput('onclick="alert(\'xss\')"')).toBe(false);
      expect(isSafeInput('javascript:alert("xss")')).toBe(false);
    });

    it('should allow safe input', () => {
      expect(isSafeInput('Hello World')).toBe(true);
      expect(isSafeInput('user@example.com')).toBe(true);
      expect(isSafeInput('12345')).toBe(true);
    });

    it('should handle non-string input', () => {
      expect(isSafeInput(null)).toBe(false);
      expect(isSafeInput(123)).toBe(false);
      expect(isSafeInput({})).toBe(false);
    });
  });
});
