/**
 * Form Validation and Handling Module
 * Handles form submission, validation, and error messaging
 * @module formHandler
 */

import { CONFIG, FORM_FIELDS } from '../core/config.js';
import { showNotification } from './ui.js';

/**
 * Setup contact form handling
 * @function setupContactForm
 * @returns {void}
 */
export function setupContactForm() {
  const contactForm = document.querySelector(CONFIG.SELECTORS.CONTACT_FORM);

  if (!contactForm) {
    console.warn('Contact form not found');
    return;
  }

  contactForm.addEventListener('submit', handleFormSubmit);
  setupFieldValidation();
}

/**
 * Handle form submission
 * @function handleFormSubmit
 * @param {Event} e - Form submit event
 * @returns {void}
 */
async function handleFormSubmit(e) {
  e.preventDefault();

  // Reset errors
  clearAllErrors();

  const formData = {
    name: document.getElementById(FORM_FIELDS.NAME.id).value.trim(),
    email: document.getElementById(FORM_FIELDS.EMAIL.id).value.trim(),
    message: document.getElementById(FORM_FIELDS.MESSAGE.id).value.trim(),
  };

  // Validate form
  if (!validateForm(formData)) {
    return;
  }

  // Simulate form submission
  const submitBtn = document.querySelector(
    `${CONFIG.SELECTORS.CONTACT_FORM} button[type="submit"]`,
  );
  const originalText = submitBtn.textContent;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, CONFIG.FORM_SUBMIT_DELAY));

    showNotification('Message sent successfully! I will get back to you soon.', 'success');
    document.querySelector(CONFIG.SELECTORS.CONTACT_FORM).reset();
  } catch (error) {
    showNotification('Failed to send message. Please try again.', 'error');
    console.error('Form submission error:', error);
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

/**
 * Validate entire form
 * @function validateForm
 * @param {Object} data - Form data
 * @returns {boolean} True if form is valid
 */
function validateForm(data) {
  let isValid = true;

  // Validate name
  if (!data.name) {
    setError(FORM_FIELDS.NAME, 'Name is required');
    isValid = false;
  } else if (data.name.length < 2) {
    setError(FORM_FIELDS.NAME, 'Name must be at least 2 characters');
    isValid = false;
  }

  // Validate email
  if (!data.email) {
    setError(FORM_FIELDS.EMAIL, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(data.email)) {
    setError(FORM_FIELDS.EMAIL, 'Please enter a valid email address');
    isValid = false;
  }

  // Validate message
  if (!data.message) {
    setError(FORM_FIELDS.MESSAGE, 'Message is required');
    isValid = false;
  } else if (data.message.length < 10) {
    setError(FORM_FIELDS.MESSAGE, 'Message must be at least 10 characters');
    isValid = false;
  }

  return isValid;
}

/**
 * Set error message for a field
 * @function setError
 * @param {Object} field - Field configuration
 * @param {string} message - Error message
 * @returns {void}
 */
function setError(field, message) {
  const errorElement = document.getElementById(field.errorId);
  if (errorElement) {
    errorElement.textContent = message;
    const inputElement = document.getElementById(field.id);
    if (inputElement) {
      inputElement.setAttribute('aria-invalid', 'true');
    }
  }
}

/**
 * Clear all error messages
 * @function clearAllErrors
 * @returns {void}
 */
function clearAllErrors() {
  Object.values(FORM_FIELDS).forEach((field) => {
    const errorElement = document.getElementById(field.errorId);
    const inputElement = document.getElementById(field.id);
    if (errorElement) {
      errorElement.textContent = '';
    }
    if (inputElement) {
      inputElement.setAttribute('aria-invalid', 'false');
    }
  });
}

/**
 * Setup real-time field validation
 * @function setupFieldValidation
 * @returns {void}
 */
function setupFieldValidation() {
  Object.values(FORM_FIELDS).forEach((field) => {
    const input = document.getElementById(field.id);
    if (input) {
      input.addEventListener('blur', () => {
        const value = input.value.trim();
        if (value) {
          document.getElementById(field.errorId).textContent = '';
          input.setAttribute('aria-invalid', 'false');
        }
      });
    }
  });
}

/**
 * Validate email address
 * @function isValidEmail
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
