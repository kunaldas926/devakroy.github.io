/**
 * Analytics & Monitoring Module
 * Privacy-respecting analytics and error tracking
 * @module analytics
 */

export class Analytics {
  /**
   * Initialize analytics
   * @constructor
   */
  constructor() {
    this.enabled = import.meta.env.VITE_ANALYTICS_ENABLED?.toLowerCase?.() === 'true' ?? false;
    this.endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT || null;
    this.sessionId = this.generateSessionId();
    this.pageViews = [];

    if (this.enabled && this.endpoint) {
      this.trackPageView();
      this.trackPerformanceMetrics();
      this.setupErrorTracking();
    }
  }

  /**
   * Generate unique session ID
   * @returns {string} Session ID
   */
  generateSessionId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Track page view (privacy-respecting)
   * @function trackPageView
   */
  trackPageView() {
    if (!this.enabled) return;

    const event = {
      type: 'pageview',
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      path: window.location.pathname,
      // No personal data collected
    };

    this.pageViews.push(event);
    this.send(event);
  }

  /**
   * Track custom event
   * @function trackEvent
   * @param {string} name - Event name
   * @param {object} data - Event data
   */
  trackEvent(name, data = {}) {
    if (!this.enabled) return;

    const event = {
      type: 'event',
      name,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      ...data,
    };

    this.send(event);
  }

  /**
   * Track performance metrics (Core Web Vitals)
   * @function trackPerformanceMetrics
   */
  trackPerformanceMetrics() {
    if (!this.enabled || !window.web?.vitals) return;

    try {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.trackEvent('performance', {
              metric: entry.name,
              value: entry.value,
            });
          }
        });

        ['largest-contentful-paint', 'layout-shift'].forEach((type) => {
          try {
            observer.observe({ type, buffered: true });
          } catch {
            // Observer type not supported
          }
        });
      }
    } catch {
      // Performance API not available
    }
  }

  /**
   * Setup error tracking
   * @function setupErrorTracking
   */
  setupErrorTracking() {
    if (!this.enabled) return;

    window.addEventListener('error', (event) => {
      this.trackEvent('error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.trackEvent('unhandledRejection', {
        reason: event.reason?.toString?.() || 'Unknown',
      });
    });
  }

  /**
   * Send event to analytics endpoint
   * @function send
   * @param {object} event - Event to send
   */
  send(event) {
    if (!this.endpoint) return;

    try {
      // Use sendBeacon for reliability
      if (navigator.sendBeacon) {
        navigator.sendBeacon(this.endpoint, JSON.stringify(event));
      } else {
        // Fallback to fetch
        fetch(this.endpoint, {
          method: 'POST',
          body: JSON.stringify(event),
          headers: {
            'Content-Type': 'application/json',
          },
          keepalive: true,
        }).catch(() => {
          // Silently fail - don't break app
        });
      }
    } catch {
      // Silently fail
    }
  }

  /**
   * Get session analytics
   * @function getSessionAnalytics
   * @returns {object} Session data
   */
  getSessionAnalytics() {
    return {
      sessionId: this.sessionId,
      pageViews: this.pageViews.length,
      duration: Date.now() - parseInt(this.sessionId.split('-')[0]),
      pages: [...new Set(this.pageViews.map((pv) => pv.path))],
    };
  }
}

// Create singleton instance
export const analyticsInstance = new Analytics();

export default analyticsInstance;
