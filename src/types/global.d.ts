// Déclarations globales pour les services d'analyse
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: Record<string, any>[];
    fbq: (...args: any[]) => void;
    posthog?: {
      identify: (userId?: string, properties?: Record<string, any>) => void;
      reset: () => void;
      capture: (event: string, properties?: Record<string, any>) => void;
      [key: string]: any;
    };
  }
}

export {}; // Ceci est nécessaire pour que le fichier soit traité comme un module
