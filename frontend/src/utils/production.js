// Build optimization utilities

// Remove console.log statements in production
if (process.env.NODE_ENV === 'production') {
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  
  console.log = (...args) => {
    // Only log errors in production
    if (args.length > 0 && typeof args[0] === 'object' && args[0] instanceof Error) {
      originalError(...args);
    }
  };
  
  console.warn = (...args) => {
    // Only log warnings that contain 'warning' or are errors
    if (args.length > 0 && 
        (typeof args[0] === 'string' && args[0].toLowerCase().includes('warning') ||
         args[0] instanceof Error)) {
      originalWarn(...args);
    }
  };
  
  console.error = originalError;
}

// Performance monitoring
export const reportWebVitals = (onPerfEntry) => {
  if (process.env.NODE_ENV === 'production' && window.gtag) {
    window.gtag('event', 'web-vitals', onPerfEntry);
  }
};

// Error reporting utility
export const reportError = (error, errorInfo = null) => {
  if (process.env.NODE_ENV === 'production') {
    // Send to error reporting service (Sentry, LogRocket, etc.)
    console.error('Production Error:', error, errorInfo);
    
    // Example: Sentry
    if (window.Sentry) {
      window.Sentry.captureException(error, {
        extra: errorInfo,
      });
    }
  }
};

// Bundle analysis utilities
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    const bundleSize = document.querySelector('script[src*="main."]')?.src || 'unknown';
    console.log(`Bundle size: ${bundleSize}`);
  }
};

// Service Worker registration for PWA
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

// Cache management
export const clearCache = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('All caches cleared');
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    '/api/dashboard/stats',
    '/api/properties',
    '/api/surveys',
  ];
  
  if ('serviceWorker' in navigator) {
    criticalResources.forEach(resource => {
      fetch(resource).catch(error => {
        console.warn(`Failed to preload resource: ${resource}`, error);
      });
    });
  }
};

export default {
  reportWebVitals,
  reportError,
  analyzeBundleSize,
  registerServiceWorker,
  clearCache,
  preloadCriticalResources,
};
