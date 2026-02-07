/**
 * Performance Utilities
 * Helper functions for optimizing performance
 */

import { APP_CONFIG } from '../config/app.config';

// Debounce function for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll/resize events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (!APP_CONFIG.performance.respectReducedMotion) return false;
  
  if (typeof window === 'undefined') return false;
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
};

// Lazy load images
export const lazyLoadImage = (src: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });
};

// Preload critical resources
export const preloadResource = (href: string, as: string): void => {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = href;
  document.head.appendChild(link);
};

// Performance measurement
export class PerformanceMonitor {
  private marks: Map<string, number> = new Map();

  start(label: string): void {
    if (!APP_CONFIG.dev.logPerformance) return;
    this.marks.set(label, performance.now());
  }

  end(label: string): number | null {
    if (!APP_CONFIG.dev.logPerformance) return null;
    
    const startTime = this.marks.get(label);
    if (!startTime) {
      console.warn(`No start mark found for "${label}"`);
      return null;
    }

    const duration = performance.now() - startTime;
    
    if (APP_CONFIG.dev.debug) {
      console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
    }

    this.marks.delete(label);
    return duration;
  }

  measure(label: string, callback: () => void): number {
    this.start(label);
    callback();
    return this.end(label) || 0;
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Image optimization helper
export const optimizeImageUrl = (
  url: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
  }
): string => {
  // For Unsplash images, add optimization parameters
  if (url.includes('unsplash.com')) {
    const params = new URLSearchParams();
    
    if (options?.width) params.set('w', options.width.toString());
    if (options?.height) params.set('h', options.height.toString());
    if (options?.quality) params.set('q', options.quality.toString());
    if (options?.format) params.set('fm', options.format);
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${params.toString()}`;
  }

  return url;
};

// Check if element is in viewport
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Intersection Observer helper
export const createObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Request Animation Frame helper
export const rafThrottle = <T extends (...args: any[]) => any>(
  callback: T
): ((...args: Parameters<T>) => void) => {
  let rafId: number | null = null;

  return (...args: Parameters<T>) => {
    if (rafId !== null) return;

    rafId = requestAnimationFrame(() => {
      callback(...args);
      rafId = null;
    });
  };
};

// Cache helper for expensive computations
export class Cache<T> {
  private cache: Map<string, { value: T; timestamp: number }> = new Map();
  private ttl: number;

  constructor(ttlMinutes: number = 5) {
    this.ttl = ttlMinutes * 60 * 1000;
  }

  set(key: string, value: T): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
    });
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;

    // Check if expired
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }
}

// Web Vitals helper
export const reportWebVitals = (metric: any): void => {
  if (!APP_CONFIG.dev.logPerformance) return;

  const { name, value, id } = metric;
  
  if (APP_CONFIG.dev.debug) {
    console.log(`📊 ${name}:`, {
      value: Math.round(value),
      id,
    });
  }

  // Send to analytics (when enabled)
  if (APP_CONFIG.features.analytics) {
    // window.gtag?.('event', name, {
    //   value: Math.round(value),
    //   metric_id: id,
    //   metric_value: value,
    //   metric_delta: value,
    // });
  }
};

// Memory management
export const clearUnusedData = (): void => {
  // Clear old cache entries
  const keys = Object.keys(localStorage);
  const now = Date.now();
  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

  keys.forEach(key => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return;

      const data = JSON.parse(item);
      if (data.timestamp && now - data.timestamp > maxAge) {
        localStorage.removeItem(key);
      }
    } catch (error) {
      // Invalid JSON, skip
    }
  });
};

// Bundle size helper
export const dynamicImport = async <T>(
  importFn: () => Promise<T>
): Promise<T> => {
  try {
    if (APP_CONFIG.dev.logPerformance) {
      performanceMonitor.start('dynamic-import');
    }

    const module = await importFn();

    if (APP_CONFIG.dev.logPerformance) {
      performanceMonitor.end('dynamic-import');
    }

    return module;
  } catch (error) {
    console.error('Dynamic import failed:', error);
    throw error;
  }
};

// Device performance detection
export const getDevicePerformance = (): 'high' | 'medium' | 'low' => {
  if (typeof window === 'undefined') return 'medium';

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 2;

  // Check device memory (if available)
  const memory = (navigator as any).deviceMemory;

  // Check connection speed
  const connection = (navigator as any).connection;
  const effectiveType = connection?.effectiveType;

  // High performance: 8+ cores, 8GB+ RAM, 4G
  if (cores >= 8 && (!memory || memory >= 8) && effectiveType === '4g') {
    return 'high';
  }

  // Low performance: 2 cores, <4GB RAM, slow connection
  if (cores <= 2 || (memory && memory < 4) || effectiveType === '2g') {
    return 'low';
  }

  return 'medium';
};

// Adaptive performance settings
export const getAdaptiveConfig = () => {
  const performance = getDevicePerformance();

  return {
    enableParticles: performance !== 'low',
    enable3DEffects: performance === 'high',
    enableBlurEffects: performance !== 'low',
    particleCount: performance === 'high' ? 50 : performance === 'medium' ? 25 : 10,
    animationQuality: performance === 'high' ? 'high' : performance === 'medium' ? 'medium' : 'low',
  };
};

export default {
  debounce,
  throttle,
  prefersReducedMotion,
  lazyLoadImage,
  preloadResource,
  performanceMonitor,
  optimizeImageUrl,
  isInViewport,
  createObserver,
  rafThrottle,
  Cache,
  reportWebVitals,
  clearUnusedData,
  dynamicImport,
  getDevicePerformance,
  getAdaptiveConfig,
};
