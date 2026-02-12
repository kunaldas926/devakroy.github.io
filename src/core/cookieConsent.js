/**
 * Cookie Consent Module
 * Privacy-respecting cookie management with explicit consent
 * @module cookieConsent
 */

/**
 * Cookie Consent Manager
 */
export class CookieConsentManager {
  constructor() {
    this.consentKey = 'portfolio-cookie-consent';
    this.cookieName = '__Host-portfolio-consent';
    this.consentBannerSelector = '.cookie-banner';
    this.init();
  }

  /**
   * Initialize cookie consent
   */
  init() {
    // Check if consent already given
    const consent = this.getConsent();

    if (!consent) {
      // Show banner if no consent
      this.showBanner();
    } else {
      // Apply saved preferences
      this.applyConsent(consent);
    }
  }

  /**
   * Show consent banner
   */
  showBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner cookie-banner--visible';
    banner.innerHTML = `
      <div class="cookie-banner__content">
        <div class="cookie-banner__text">
          <h3>Cookie Settings</h3>
          <p>We use cookies to improve your experience. No personal data is collected without your consent.</p>
          <ul>
            <li><strong>Essential</strong>: Required for site functionality (always enabled)</li>
            <li><strong>Analytics</strong>: Anonymous usage statistics</li>
            <li><strong>Performance</strong>: Website performance optimization</li>
          </ul>
        </div>
        <div class="cookie-banner__actions">
          <button class="cookie-banner__btn cookie-banner__btn--essential" data-action="essential">
            Essential Only
          </button>
          <button class="cookie-banner__btn cookie-banner__btn--analytics" data-action="analytics">
            Accept Analytics
          </button>
          <button class="cookie-banner__btn cookie-banner__btn--all" data-action="all">
            Accept All
          </button>
        </div>
        <div class="cookie-banner__links">
          <a href="/PRIVACY_POLICY.md" target="_blank">Privacy Policy</a>
          <a href="/TERMS_OF_SERVICE.md" target="_blank">Terms of Service</a>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Add event listeners
    banner.querySelectorAll('[data-action]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        this.handleConsent(action);
      });
    });
  }

  /**
   * Handle consent choice
   */
  handleConsent(choice) {
    const consent = {
      essential: true,
      analytics: choice === 'analytics' || choice === 'all',
      performance: choice === 'all',
      timestamp: new Date().toISOString(),
    };

    // Save consent
    this.saveConsent(consent);
    this.applyConsent(consent);

    // Hide banner
    const banner = document.querySelector('.cookie-banner');
    if (banner) {
      banner.classList.remove('cookie-banner--visible');
      setTimeout(() => banner.remove(), 300);
    }
  }

  /**
   * Save consent to localStorage and cookie
   */
  saveConsent(consent) {
    // localStorage
    localStorage.setItem(this.consentKey, JSON.stringify(consent));

    // Secure cookie (HttpOnly would be better server-side)
    const maxAge = 365 * 24 * 60 * 60; // 1 year
    document.cookie = `${this.cookieName}=${encodeURIComponent(
      JSON.stringify(consent),
    )}; Max-Age=${maxAge}; Path=/; SameSite=Strict`;
  }

  /**
   * Get saved consent
   */
  getConsent() {
    try {
      const stored = localStorage.getItem(this.consentKey);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  /**
   * Apply consent preferences
   */
  applyConsent(consent) {
    // Enable analytics if consented
    if (consent.analytics) {
      // Initialize analytics
      window.analyticsEnabled = true;
    }

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('consentReady', { detail: consent }));
  }

  /**
   * Check specific consent
   */
  hasConsent(type) {
    const consent = this.getConsent();
    if (!consent) return false;

    switch (type) {
      case 'analytics':
        return consent.analytics || false;
      case 'performance':
        return consent.performance || false;
      default:
        return false;
    }
  }

  /**
   * Reset cookie consent
   */
  reset() {
    localStorage.removeItem(this.consentKey);
    document.cookie = `${this.cookieName}=; Max-Age=0; Path=/`;
    this.init();
  }

  /**
   * Get consent status
   */
  getStatus() {
    return {
      consented: !!this.getConsent(),
      consent: this.getConsent(),
    };
  }
}

// Create singleton instance
export const cookieConsentManager = new CookieConsentManager();

export default cookieConsentManager;
