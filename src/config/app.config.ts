/**
 * SMOVE Communication - Application Configuration
 * Centralized configuration for the entire application
 */

export const APP_CONFIG = {
  // Application Info
  app: {
    name: 'SMOVE Communication',
    version: '1.0.0',
    description: 'Agence de Communication Digitale Premium',
    author: 'SMOVE Team',
    url: 'https://smove-communication.com',
  },

  // Brand Colors
  colors: {
    primary: '#00b3e8',
    secondary: '#34c759',
    accent: '#a855f7',
    dark: '#273a41',
    light: '#f5f9fa',
    muted: '#9ba1a4',
    white: '#ffffff',
    black: '#0d1f2d',
  },

  // Animation Settings
  animations: {
    // Global animation settings
    enabled: true,
    duration: {
      fast: 0.2,
      normal: 0.5,
      slow: 1,
    },
    easing: {
      default: 'easeInOut',
      smooth: [0.43, 0.13, 0.23, 0.96],
      bounce: 'spring',
    },
    
    // Hero 3D specific
    hero3D: {
      orbs: {
        count: 8,
        duration: 15,
        scale: [1, 1.3, 1],
      },
      particles: {
        count: 50,
        speed: 5,
      },
      grid: {
        enabled: true,
        size: {
          large: 100,
          small: 20,
        },
        animationDuration: 40,
      },
      rings: {
        count: 3,
        baseSize: 400,
        increment: 200,
      },
    },

    // Page transitions
    pageTransition: {
      duration: 0.5,
      type: 'tween',
      ease: 'easeInOut',
    },

    // Scroll animations
    scroll: {
      threshold: 0.1,
      offset: ['start end', 'end start'],
    },
  },

  // Performance Settings
  performance: {
    // Enable/disable features for performance
    enableParticles: true,
    enable3DEffects: true,
    enableBlurEffects: true,
    enableShadows: true,
    
    // Image optimization
    images: {
      lazy: true,
      quality: 80,
      format: 'webp',
    },

    // Reduce motion for accessibility
    respectReducedMotion: true,
  },

  // Content Limits
  content: {
    projects: {
      perPage: 9,
      featuredCount: 6,
      maxImages: 8,
    },
    blog: {
      perPage: 6,
      latestCount: 3,
      excerptLength: 150,
    },
    media: {
      maxFileSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      thumbnailSize: 300,
    },
  },

  // API Configuration (for future backend)
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000,
    retries: 3,
    endpoints: {
      projects: '/projects',
      blog: '/blog',
      media: '/media',
      auth: '/auth',
      contact: '/contact',
    },
  },

  // Authentication
  auth: {
    // Client-side identity storage is intentionally disabled.
    // Sessions must come from backend auth endpoints.
    tokenExpiry: 24 * 60 * 60 * 1000, // 24 hours
    defaultRole: 'editor',
    roles: ['admin', 'editor', 'viewer'],
  },

  // localStorage Keys
  storage: {
    projects: 'smove_projects',
    blog: 'smove_blog_posts',
    media: 'smove_media_files',
    settings: 'smove_settings',
  },

  // SEO Configuration
  seo: {
    defaultTitle: 'SMOVE Communication - Agence Digitale Premium',
    titleTemplate: '%s | SMOVE Communication',
    defaultDescription: 'Agence de communication digitale spécialisée en design, développement web et production vidéo 3D. Transformons vos idées en réalité numérique.',
    keywords: [
      'communication digitale',
      'agence web',
      'design graphique',
      'développement web',
      'production vidéo',
      'animation 3D',
      'marketing digital',
      'branding',
    ],
    socialImage: '/og-image.jpg',
    twitterHandle: '@smove_digital',
  },

  // Contact Information
  contact: {
    email: 'contact@smove-communication.com',
    phone: '+242 06 XXX XX XX',
    address: 'Brazzaville, Congo',
    socials: {
      facebook: 'https://facebook.com/smove',
      instagram: 'https://instagram.com/smove',
      linkedin: 'https://linkedin.com/company/smove',
      twitter: 'https://twitter.com/smove',
    },
  },

  // Feature Flags
  features: {
    blog: true,
    projects: true,
    portfolio: true,
    cms: true,
    authentication: true,
    mediaLibrary: true,
    analytics: false,
    newsletter: false,
    comments: false,
    darkMode: false,
  },

  // Development Settings
  dev: {
    debug: import.meta.env.DEV,
    showGrid: false,
    showBoundingBoxes: false,
    logPerformance: false,
  },
} as const;

// Type exports for TypeScript
export type AppConfig = typeof APP_CONFIG;
export type ColorScheme = typeof APP_CONFIG.colors;
export type AnimationConfig = typeof APP_CONFIG.animations;
export type PerformanceConfig = typeof APP_CONFIG.performance;
export type ContentConfig = typeof APP_CONFIG.content;

// Helper functions
export const getColor = (colorName: keyof ColorScheme): string => {
  return APP_CONFIG.colors[colorName];
};

export const isFeatureEnabled = (feature: keyof typeof APP_CONFIG.features): boolean => {
  return APP_CONFIG.features[feature];
};

export const getStorageKey = (key: keyof typeof APP_CONFIG.storage): string => {
  return APP_CONFIG.storage[key];
};

export const shouldReduceMotion = (): boolean => {
  if (!APP_CONFIG.performance.respectReducedMotion) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Animation preset helpers
export const getAnimationDuration = (speed: 'fast' | 'normal' | 'slow'): number => {
  return APP_CONFIG.animations.duration[speed];
};

export const getEasing = (type: 'default' | 'smooth' | 'bounce') => {
  return APP_CONFIG.animations.easing[type];
};

export default APP_CONFIG;
