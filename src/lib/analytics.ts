// Types pour les analytics
type AnalyticsProviderName = 'google-analytics' | 'posthog' | 'meta-pixel';

export interface AnalyticsProvider {
  name: AnalyticsProviderName;
  apiKey: string;
  enabled: boolean;
  debug?: boolean;
  config?: Record<string, unknown>;
}

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  userId?: string;
  timestamp?: number;
}

export interface PageView extends Omit<AnalyticsEvent, 'event'> {
  path: string;
  title?: string;
  referrer?: string;
}

export interface UserProperties {
  userId: string;
  email?: string;
  name?: string;
  properties?: Record<string, unknown>;
}

export interface ConversionEvent extends AnalyticsEvent {
  value?: number;
  currency?: string;
}

// Déclaration des types globaux
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    posthog?: {
      identify: (userId?: string, properties?: Record<string, unknown>) => void;
      reset: () => void;
      capture: (event: string, properties?: Record<string, unknown>) => void;
      [key: string]: unknown;
    };
  }
}

/**
 * Service d'analytics pour gérer plusieurs fournisseurs d'analyse
 * Prend en charge Google Analytics, PostHog et Meta Pixel
 */
export class AnalyticsService {
  private providers: AnalyticsProvider[];
  private isInitialized = false;
  private static instance: AnalyticsService;

  private constructor(providers: AnalyticsProvider[] = []) {
    this.providers = providers.filter(p => p.enabled);
  }

  /**
   * Obtient l'instance singleton du service d'analytics
   */
  public static getInstance(providers?: AnalyticsProvider[]): AnalyticsService {
    if (!AnalyticsService.instance && providers) {
      AnalyticsService.instance = new AnalyticsService(providers);
    } else if (!AnalyticsService.instance) {
      throw new Error('AnalyticsService must be initialized with providers first');
    }
    return AnalyticsService.instance;
  }

  /**
   * Initialise tous les fournisseurs d'analyse activés
   */
  async initialize(): Promise<void> {
    if (this.isInitialized || typeof window === 'undefined') {
      return;
    }
    }

    try {
      await Promise.all(
        this.providers.map(provider => this.initializeProvider(provider))
      );
      this.isInitialized = true;
      console.log('Analytics initialized with providers:', this.providers.map(p => p.name));
    } catch (error) {
      console.error('Error initializing analytics:', error);
    }
  }

  // Initialiser un provider spécifique
  private async initializeProvider(provider: AnalyticsProvider): Promise<void> {
    switch (provider.name) {
      case 'google-analytics':
        await this.initializeGoogleAnalytics(provider);
        break;
      case 'posthog':
        await this.initializePostHog(provider);
        break;
      case 'meta-pixel':
        await this.initializeMetaPixel(provider);
        break;
    }
  }

  // Google Analytics
  private async initializeGoogleAnalytics(provider: AnalyticsProvider): Promise<void> {
    if (typeof window !== 'undefined') {
      // Charger gtag.js
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${provider.apiKey}`;
      document.head.appendChild(script);

      // Initialiser gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      
      window.gtag('js', new Date());
      window.gtag('config', provider.apiKey, {
        debug: provider.debug || false,
        send_page_view: false, // On gère manuellement les page views
      });
    }
  }

  // PostHog
  private async initializePostHog(provider: AnalyticsProvider): Promise<void> {
    if (typeof window !== 'undefined') {
      // Charger PostHog
      !(function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(e,t),t.createElement||(o=t.createElement("script"),o.type="text/javascript",o.async=!0,o.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(o,r));var u=t;for(void 0!==a?u=t.getElementsByTagName(a)[0]:u=t.head,u.appendChild(o),e._i.push([i,s,a])},e.init=function(i,t){var o=e._i[i];if(o){o.api_host=t.api_host,o._loadOptions=t._loadOptions;var n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=o.api_host+"/static/array.js",(r=document.getElementsByTagName("script")[0]).parentNode.insertBefore(n,r)}})})(document,window.posthog||[]);
      
      window.posthog.init(provider.apiKey, {
        api_host: 'https://app.posthog.com',
        debug: provider.debug || false,
        autocapture: false, // On gère manuellement les events
      });
    }
  }

  // Meta Pixel
  private async initializeMetaPixel(provider: AnalyticsProvider): Promise<void> {
    if (typeof window !== 'undefined') {
      // Charger Meta Pixel
      !(function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)})(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      
      window.fbq('init', provider.apiKey);
      window.fbq('track', 'PageView');
    }
  }

  // Page view
  trackPageView(pageView: PageView): void {
    if (!this.isInitialized) return;

    this.providers.forEach(provider => {
      switch (provider.name) {
        case 'google-analytics':
          this.trackGoogleAnalyticsPageView(pageView);
          break;
        case 'posthog':
          this.trackPostHogPageView(pageView);
          break;
        case 'meta-pixel':
          this.trackMetaPixelPageView(pageView);
          break;
      }
    });
  }

  // Event tracking
  trackEvent(event: AnalyticsEvent): void {
    if (!this.isInitialized) return;

    this.providers.forEach(provider => {
      switch (provider.name) {
        case 'google-analytics':
          this.trackGoogleAnalyticsEvent(event);
          break;
        case 'posthog':
          this.trackPostHogEvent(event);
          break;
        case 'meta-pixel':
          this.trackMetaPixelEvent(event);
          break;
      }
    });
  }

  // User identification
  identifyUser(user: UserProperties): void {
    if (!this.isInitialized) return;

    this.providers.forEach(provider => {
      switch (provider.name) {
        case 'google-analytics':
          this.identifyGoogleAnalyticsUser(user);
          break;
        case 'posthog':
          this.identifyPostHogUser(user);
          break;
        case 'meta-pixel':
          this.identifyMetaPixelUser(user);
          break;
      }
    });
  }

  // Conversion tracking
  trackConversion(conversion: ConversionEvent): void {
    if (!this.isInitialized) return;

    this.providers.forEach(provider => {
      switch (provider.name) {
        case 'google-analytics':
          this.trackGoogleAnalyticsConversion(conversion);
          break;
        case 'posthog':
          this.trackPostHogConversion(conversion);
          break;
        case 'meta-pixel':
          this.trackMetaPixelConversion(conversion);
          break;
      }
    });
  }

  // Méthodes Google Analytics
  private trackGoogleAnalyticsPageView(pageView: PageView): void {
    if (typeof window !== 'undefined && window.gtag) {
      window.gtag('config', this.getGoogleAnalyticsId(), {
        page_path: pageView.path,
        page_title: pageView.title,
        custom_map: pageView.properties,
      });
    }
  }

  private trackGoogleAnalyticsEvent(event: AnalyticsEvent): void {
    if (typeof window !== 'undefined && window.gtag) {
      window.gtag('event', event.event, {
        custom_parameters: event.properties,
        user_id: event.userId,
      });
    }
  }

  private identifyGoogleAnalyticsUser(user: UserProperties): void {
    if (typeof window !== 'undefined && window.gtag) {
      window.gtag('config', this.getGoogleAnalyticsId(), {
        user_id: user.userId,
        custom_map: {
          email: user.email,
          name: user.name,
          ...user.properties,
        },
      });
    }
  }

  private trackGoogleAnalyticsConversion(conversion: ConversionEvent): void {
    if (typeof window !== 'undefined && window.gtag) {
      window.gtag('event', 'conversion', {
        transaction_id: conversion.event,
        value: conversion.value,
        currency: conversion.currency,
        ...conversion.properties,
      });
    }
  }

  private getGoogleAnalyticsId(): string {
    const gaProvider = this.providers.find(p => p.name === 'google-analytics');
    return gaProvider?.apiKey || '';
  }

  // Méthodes PostHog
  private trackPostHogPageView(pageView: PageView): void {
    if (typeof window !== 'undefined && window.posthog) {
      window.posthog.capture('$pageview', {
        $current_url: pageView.path,
        title: pageView.title,
        referrer: pageView.referrer,
        distinct_id: pageView.userId,
        ...pageView.properties,
      });
    }
  }

  private trackPostHogEvent(event: AnalyticsEvent): void {
    if (typeof window !== 'undefined && window.posthog) {
      window.posthog.capture(event.event, {
        distinct_id: event.userId,
        ...event.properties,
      });
    }
  }

  private identifyPostHogUser(user: UserProperties): void {
    if (typeof window !== 'undefined && window.posthog) {
      window.posthog.identify(user.userId, {
        email: user.email,
        name: user.name,
        ...user.properties,
      });
    }
  }

  private trackPostHogConversion(conversion: ConversionEvent): void {
    if (typeof window !== 'undefined && window.posthog) {
      window.posthog.capture(conversion.event, {
        $amount: conversion.value,
        currency: conversion.currency,
        ...conversion.properties,
      });
    }
  }

  // Méthodes Meta Pixel
  private trackMetaPixelPageView(pageView: PageView): void {
    if (typeof window !== 'undefined && window.fbq) {
      window.fbq('track', 'PageView', {
        content_name: pageView.title,
        ...pageView.properties,
      });
    }
  }

  private trackMetaPixelEvent(event: AnalyticsEvent): void {
    if (typeof window !== 'undefined && window.fbq) {
      // Mapper les events standards Meta
      const metaEvent = this.mapToMetaEvent(event.event);
      if (metaEvent) {
        window.fbq('track', metaEvent, event.properties);
      } else {
        window.fbq('trackCustom', event.event, event.properties);
      }
    }
  }

  private identifyMetaPixelUser(user: UserProperties): void {
    if (typeof window !== 'undefined && window.fbq) {
      window.fbq('init', this.getMetaPixelId(), {
        em: user.email,
        fn: user.name,
        ...user.properties,
      });
    }
  }

  private trackMetaPixelConversion(conversion: ConversionEvent): void {
    if (typeof window !== 'undefined && window.fbq) {
      window.fbq('track', 'Purchase', {
        value: conversion.value,
        currency: conversion.currency,
        ...conversion.properties,
      });
    }
  }

  private getMetaPixelId(): string {
    const metaProvider = this.providers.find(p => p.name === 'meta-pixel');
    return metaProvider?.apiKey || '';
  }

  private mapToMetaEvent(event: string): string | null {
    const eventMap: Record<string, string> = {
      'sign_up': 'CompleteRegistration',
      'login': 'Login',
      'purchase': 'Purchase',
      'add_to_cart': 'AddToCart',
      'view_content': 'ViewContent',
      'search': 'Search',
      'lead': 'Lead',
    };
    return eventMap[event] || null;
  }

  // Utilitaires
  isEnabled(): boolean {
    return this.isInitialized && this.providers.length > 0;
  }

  getActiveProviders(): string[] {
    return this.providers.map(p => p.name);
  }

  // Reset (pour logout)
  reset(): void {
    if (!this.isInitialized) return;

    this.providers.forEach(provider => {
      if (provider.name === 'posthog' && typeof window !== 'undefined' && window.posthog) {
        window.posthog.reset();
      }
      if (provider.name === 'google-analytics' && typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', provider.apiKey, {
          user_id: undefined,
        });
      }
    });
  }
}

// Configuration par défaut
export const defaultAnalyticsConfig: AnalyticsProvider[] = [
  {
    name: 'google-analytics',
    apiKey: process.env.NEXT_PUBLIC_GA_ID || '',
    enabled: !!process.env.NEXT_PUBLIC_GA_ID,
    debug: process.env.NODE_ENV === 'development',
  },
  {
    name: 'posthog',
    apiKey: process.env.NEXT_PUBLIC_POSTHOG_KEY || '',
    enabled: !!process.env.NEXT_PUBLIC_POSTHOG_KEY,
    debug: process.env.NODE_ENV === 'development',
  },
  {
    name: 'meta-pixel',
    apiKey: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
    enabled: !!process.env.NEXT_PUBLIC_META_PIXEL_ID,
    debug: process.env.NODE_ENV === 'development',
  },
];

// Instance par défaut
export const analyticsService = new AnalyticsService(defaultAnalyticsConfig);

import { useState, useEffect } from 'react';

// Hook React pour analytics
export function useAnalytics() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    analyticsService.initialize().then(() => {
      setIsReady(true);
    });
  }, []);

  return {
    isReady,
    trackPageView: analyticsService.trackPageView.bind(analyticsService),
    trackEvent: analyticsService.trackEvent.bind(analyticsService),
    identifyUser: analyticsService.identifyUser.bind(analyticsService),
    trackConversion: analyticsService.trackConversion.bind(analyticsService),
    reset: analyticsService.reset.bind(analyticsService),
    isEnabled: analyticsService.isEnabled.bind(analyticsService),
    getActiveProviders: analyticsService.getActiveProviders.bind(analyticsService),
  };
}

// Types pour les déclarations globales
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    posthog: any;
    fbq: (...args: any[]) => void;
  }
}

// Événements prédéfinis
export const ANALYTICS_EVENTS = {
  // Authentification
  SIGN_UP: 'sign_up',
  LOGIN: 'login',
  LOGOUT: 'logout',
  
  // Navigation
  PAGE_VIEW: 'page_view',
  
  // E-commerce
  PURCHASE: 'purchase',
  ADD_TO_CART: 'add_to_cart',
  VIEW_CONTENT: 'view_content',
  BEGIN_CHECKOUT: 'begin_checkout',
  
  // Engagement
  SEARCH: 'search',
  SHARE: 'share',
  COMMENT: 'comment',
  LIKE: 'like',
  
  // Business
  LEAD: 'lead',
  TRIAL_STARTED: 'trial_started',
  SUBSCRIPTION_CREATED: 'subscription_created',
  SUBSCRIPTION_CANCELLED: 'subscription_cancelled',
  
  // Features
  FEATURE_USED: 'feature_used',
  ERROR_OCCURRED: 'error_occurred',
} as const;