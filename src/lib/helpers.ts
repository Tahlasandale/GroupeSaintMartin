// Types utilitaires
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FormatOptions {
  locale?: string;
  currency?: string;
  dateFormat?: string;
}

// Validation
export class ValidationHelper {
  // Email
  static email(email: string): ValidationResult {
    const errors: string[] = [];
    
    if (!email) {
      errors.push("L'email est requis");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push("Format d'email invalide");
      }
      if (email.length > 254) {
        errors.push("L'email est trop long");
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Mot de passe
  static password(password: string, options: { minLength?: number; requireUppercase?: boolean; requireNumbers?: boolean; requireSpecialChars?: boolean } = {}): ValidationResult {
    const { minLength = 8, requireUppercase = true, requireNumbers = true, requireSpecialChars = true } = options;
    const errors: string[] = [];
    
    if (!password) {
      errors.push("Le mot de passe est requis");
    } else {
      if (password.length < minLength) {
        errors.push(`Le mot de passe doit contenir au moins ${minLength} caractères`);
      }
      
      if (requireUppercase && !/[A-Z]/.test(password)) {
        errors.push("Le mot de passe doit contenir au moins une majuscule");
      }
      
      if (requireNumbers && !/\d/.test(password)) {
        errors.push("Le mot de passe doit contenir au moins un chiffre");
      }
      
      if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("Le mot de passe doit contenir au moins un caractère spécial");
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Nom
  static name(name: string, options: { minLength?: number; maxLength?: number; allowNumbers?: boolean } = {}): ValidationResult {
    const { minLength = 2, maxLength = 50, allowNumbers = false } = options;
    const errors: string[] = [];
    
    if (!name) {
      errors.push("Le nom est requis");
    } else {
      if (name.length < minLength) {
        errors.push(`Le nom doit contenir au moins ${minLength} caractères`);
      }
      
      if (name.length > maxLength) {
        errors.push(`Le nom ne doit pas dépasser ${maxLength} caractères`);
      }
      
      if (!allowNumbers && /\d/.test(name)) {
        errors.push("Le nom ne peut pas contenir de chiffres");
      }
      
      if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(name)) {
        errors.push("Le nom contient des caractères invalides");
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Téléphone (français)
  static phone(phone: string): ValidationResult {
    const errors: string[] = [];
    
    if (!phone) {
      errors.push("Le numéro de téléphone est requis");
    } else {
      // Nettoyer le numéro
      const cleanPhone = phone.replace(/[\s.-]/g, '');
      
      // Vérifier le format français
      const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
      if (!phoneRegex.test(phone)) {
        errors.push("Format de numéro de téléphone invalide");
      }
      
      if (cleanPhone.length < 10 || cleanPhone.length > 13) {
        errors.push("Le numéro de téléphone doit contenir entre 10 et 13 chiffres");
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // URL
  static url(url: string): ValidationResult {
    const errors: string[] = [];
    
    if (!url) {
      errors.push("L'URL est requise");
    } else {
      try {
        new URL(url);
      } catch {
        errors.push("Format d'URL invalide");
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Code postal (français)
  static postalCode(postalCode: string): ValidationResult {
    const errors: string[] = [];
    
    if (!postalCode) {
      errors.push("Le code postal est requis");
    } else {
      const postalCodeRegex = /^(0[1-9]|[1-8]\d|9[0-5])\d{3}$/;
      if (!postalCodeRegex.test(postalCode)) {
        errors.push("Code postal invalide");
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // SIRET (français)
  static siret(siret: string): ValidationResult {
    const errors: string[] = [];
    
    if (!siret) {
      errors.push("Le numéro SIRET est requis");
    } else {
      const siretRegex = /^\d{14}$/;
      if (!siretRegex.test(siret)) {
        errors.push("Le SIRET doit contenir 14 chiffres");
      } else {
        // Algorithme de Luhn pour valider le SIRET
        let sum = 0;
        let parity = siret.length % 2;
        
        for (let i = 0; i < siret.length; i++) {
          let digit = parseInt(siret[i]);
          if (i % 2 === parity) {
            digit *= 2;
            if (digit > 9) {
              digit -= 9;
            }
          }
          sum += digit;
        }
        
        if (sum % 10 !== 0) {
          errors.push("Numéro SIRET invalide");
        }
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Générateur de validation de formulaire
  static validateForm(data: Record<string, any>, rules: Record<string, (value: any) => ValidationResult>): ValidationResult {
    const allErrors: string[] = [];
    
    Object.entries(rules).forEach(([field, validator]) => {
      const result = validator(data[field]);
      if (!result.isValid) {
        allErrors.push(...result.errors.map(error => `${field}: ${error}`));
      }
    });
    
    return {
      isValid: allErrors.length === 0,
      errors: allErrors
    };
  }
}

// Formatage
export class FormatHelper {
  // Date
  static date(date: Date | string | number, options: FormatOptions = {}): string {
    const { locale = 'fr-FR', dateFormat = 'full' } = options;
    
    const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      return 'Date invalide';
    }
    
    switch (dateFormat) {
      case 'short':
        return dateObj.toLocaleDateString(locale, { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric' 
        });
      case 'medium':
        return dateObj.toLocaleDateString(locale, { 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric' 
        });
      case 'long':
        return dateObj.toLocaleDateString(locale, { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        });
      case 'full':
      default:
        return dateObj.toLocaleDateString(locale, { 
          weekday: 'long', 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        });
    }
  }

  // Heure
  static time(date: Date | string | number, options: FormatOptions = {}): string {
    const { locale = 'fr-FR' } = options;
    
    const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      return 'Heure invalide';
    }
    
    return dateObj.toLocaleTimeString(locale, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  // Date et heure
  static dateTime(date: Date | string | number, options: FormatOptions = {}): string {
    const dateStr = this.date(date, options);
    const timeStr = this.time(date, options);
    return `${dateStr} à ${timeStr}`;
  }

  // Temps relatif (il y a...)
  static relativeTime(date: Date | string | number, options: FormatOptions = {}): string {
    const { locale = 'fr-FR' } = options;
    
    const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    
    if (diffSeconds < 60) {
      return rtf.format(-diffSeconds, 'second');
    } else if (diffMinutes < 60) {
      return rtf.format(-diffMinutes, 'minute');
    } else if (diffHours < 24) {
      return rtf.format(-diffHours, 'hour');
    } else if (diffDays < 7) {
      return rtf.format(-diffDays, 'day');
    } else if (diffWeeks < 4) {
      return rtf.format(-diffWeeks, 'week');
    } else if (diffMonths < 12) {
      return rtf.format(-diffMonths, 'month');
    } else {
      return rtf.format(-diffYears, 'year');
    }
  }

  // Monnaie
  static currency(amount: number, options: FormatOptions = {}): string {
    const { locale = 'fr-FR', currency = 'EUR' } = options;
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  // Nombre
  static number(number: number, options: FormatOptions = {}): string {
    const { locale = 'fr-FR' } = options;
    
    return new Intl.NumberFormat(locale).format(number);
  }

  // Pourcentage
  static percentage(value: number, options: FormatOptions = {}): string {
    const { locale = 'fr-FR' } = options;
    
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  }

  // Taille de fichier
  static fileSize(bytes: number, options: { locale?: string; decimals?: number } = {}): string {
    const { locale = 'fr-FR', decimals = 2 } = options;
    
    if (bytes === 0) return '0 octets';
    
    const k = 1024;
    const sizes = ['octets', 'Ko', 'Mo', 'Go', 'To', 'Po'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    const value = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));
    const numberStr = new Intl.NumberFormat(locale).format(value);
    
    return `${numberStr} ${sizes[i]}`;
  }

  // Téléphone (français)
  static phone(phone: string): string {
    const cleanPhone = phone.replace(/[\s.-]/g, '');
    
    if (cleanPhone.length === 10) {
      return cleanPhone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
    } else if (cleanPhone.startsWith('+33') && cleanPhone.length === 12) {
      return cleanPhone.replace(/(\+33)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5 $6');
    }
    
    return phone;
  }

  // Capitaliser
  static capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // Capitaliser chaque mot
  static titleCase(str: string): string {
    if (!str) return str;
    return str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }

  // Tronquer texte
  static truncate(str: string, maxLength: number, suffix = '...'): string {
    if (!str || str.length <= maxLength) return str;
    return str.substring(0, maxLength - suffix.length) + suffix;
  }

  // Slugifier
  static slugify(str: string): string {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Générer couleur aléatoire
  static randomColor(): string {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  }

  // Générer ID unique
  static generateId(prefix = '', length = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return prefix ? `${prefix}_${result}` : result;
  }
}

// Manipulation de données
export class DataHelper {
  // Deep clone
  static deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
    if (obj instanceof Array) return obj.map(item => this.deepClone(item)) as unknown as T;
    if (typeof obj === 'object') {
      const clonedObj = {} as { [key: string]: any };
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = this.deepClone(obj[key]);
        }
      }
      return clonedObj as T;
    }
    return obj;
  }

  // Debounce
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // Throttle
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Grouper par
  static groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
    return array.reduce((groups, item) => {
      const group = String(item[key]);
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  }

  // Trier par
  static sortBy<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
    return [...array].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Uniquer
  static unique<T>(array: T[], key?: keyof T): T[] {
    if (!key) {
      return [...new Set(array)];
    }
    
    const seen = new Set();
    return array.filter(item => {
      const value = item[key];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  }

  // Pluck
  static pluck<T, K extends keyof T>(array: T[], key: K): T[K][] {
    return array.map(item => item[key]);
  }

  // Chunk
  static chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  // Shuffle
  static shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

// Exportations par défaut
export default {
  Validation: ValidationHelper,
  Format: FormatHelper,
  Data: DataHelper,
};