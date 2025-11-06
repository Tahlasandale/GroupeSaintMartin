// Types pour les paiements
export interface PaymentProvider {
  name: 'stripe' | 'polar';
  apiKey: string;
  webhookSecret?: string;
  publishableKey?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  type: 'one_time' | 'subscription';
  interval?: 'month' | 'year';
  features: string[];
  metadata?: Record<string, any>;
}

export interface Customer {
  id: string;
  email: string;
  name?: string;
  metadata?: Record<string, any>;
}

export interface Subscription {
  id: string;
  customerId: string;
  productId: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed' | 'canceled';
  customerId?: string;
  metadata?: Record<string, any>;
}

export interface PaymentResult {
  success: boolean;
  paymentIntent?: PaymentIntent;
  subscription?: Subscription;
  error?: string;
  clientSecret?: string;
  checkoutUrl?: string;
}

// Configuration des produits
export const PRODUCTS: Product[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Parfait pour les petites équipes',
    price: 9900, // $99.00 en cents
    currency: 'usd',
    type: 'subscription',
    interval: 'month',
    features: [
      '5 utilisateurs',
      '10 projets',
      'Support par email',
      '1GB de stockage',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Idéal pour les entreprises en croissance',
    price: 29900, // $299.00 en cents
    currency: 'usd',
    type: 'subscription',
    interval: 'month',
    features: [
      'Utilisateurs illimités',
      'Projets illimités',
      'Support prioritaire',
      '100GB de stockage',
      'API avancée',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Pour les grandes organisations',
    price: 99900, // $999.00 en cents
    currency: 'usd',
    type: 'subscription',
    interval: 'month',
    features: [
      'Tout ce qui est inclus dans Pro',
      'Support dédié 24/7',
      'Stockage illimité',
      'SLA garanti',
      'Intégration sur mesure',
    ],
  },
  {
    id: 'credits',
    name: 'Crédits supplémentaires',
    description: 'Achetez des crédits pour des fonctionnalités premium',
    price: 1000, // $10.00 en cents
    currency: 'usd',
    type: 'one_time',
    features: [
      '1000 crédits',
      'Valables 1 an',
      'Utilisables sur toutes les fonctionnalités',
    ],
  },
];

// Service de paiement principal
export class PaymentService {
  private provider: PaymentProvider;

  constructor(provider: PaymentProvider) {
    this.provider = provider;
  }

  // Créer un client
  async createCustomer(email: string, name?: string): Promise<Customer> {
    try {
      if (this.provider.name === 'stripe') {
        return await this.createStripeCustomer(email, name);
      } else if (this.provider.name === 'polar') {
        return await this.createPolarCustomer(email, name);
      }
      throw new Error('Provider non supporté');
    } catch (error) {
      console.error('Erreur création client:', error);
      throw error;
    }
  }

  // Créer une session de paiement
  async createPaymentSession(
    productId: string,
    customerId: string,
    successUrl: string,
    cancelUrl: string,
    metadata?: Record<string, any>
  ): Promise<PaymentResult> {
    try {
      const product = PRODUCTS.find(p => p.id === productId);
      if (!product) {
        throw new Error('Produit non trouvé');
      }

      if (this.provider.name === 'stripe') {
        return await this.createStripePaymentSession(product, customerId, successUrl, cancelUrl, metadata);
      } else if (this.provider.name === 'polar') {
        return await this.createPolarPaymentSession(product, customerId, successUrl, cancelUrl, metadata);
      }
      throw new Error('Provider non supporté');
    } catch (error) {
      console.error('Erreur création session paiement:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
      };
    }
  }

  // Créer un paiement one-time
  async createPaymentIntent(
    amount: number,
    currency: string = 'usd',
    customerId?: string,
    metadata?: Record<string, any>
  ): Promise<PaymentResult> {
    try {
      if (this.provider.name === 'stripe') {
        return await this.createStripePaymentIntent(amount, currency, customerId, metadata);
      } else if (this.provider.name === 'polar') {
        return await this.createPolarPaymentIntent(amount, currency, customerId, metadata);
      }
      throw new Error('Provider non supporté');
    } catch (error) {
      console.error('Erreur création payment intent:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
      };
    }
  }

  // Annuler un abonnement
  async cancelSubscription(subscriptionId: string, immediate = false): Promise<PaymentResult> {
    try {
      if (this.provider.name === 'stripe') {
        return await this.cancelStripeSubscription(subscriptionId, immediate);
      } else if (this.provider.name === 'polar') {
        return await this.cancelPolarSubscription(subscriptionId, immediate);
      }
      throw new Error('Provider non supporté');
    } catch (error) {
      console.error('Erreur annulation abonnement:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
      };
    }
  }

  // Récupérer les abonnements d'un client
  async getCustomerSubscriptions(customerId: string): Promise<Subscription[]> {
    try {
      if (this.provider.name === 'stripe') {
        return await this.getStripeCustomerSubscriptions(customerId);
      } else if (this.provider.name === 'polar') {
        return await this.getPolarCustomerSubscriptions(customerId);
      }
      throw new Error('Provider non supporté');
    } catch (error) {
      console.error('Erreur récupération abonnements:', error);
      throw error;
    }
  }

  // Méthodes Stripe
  private async createStripeCustomer(email: string, name?: string): Promise<Customer> {
    const stripe = require('stripe')(this.provider.apiKey);
    
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        source: 'monapp',
      },
    });

    return {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      metadata: customer.metadata,
    };
  }

  private async createStripePaymentSession(
    product: Product,
    customerId: string,
    successUrl: string,
    cancelUrl: string,
    metadata?: Record<string, any>
  ): Promise<PaymentResult> {
    const stripe = require('stripe')(this.provider.apiKey);

    const sessionParams: any = {
      customer: customerId,
      payment_method_types: ['card'],
      mode: product.type === 'subscription' ? 'subscription' : 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        productId: product.id,
        ...metadata,
      },
    };

    if (product.type === 'subscription') {
      sessionParams.line_items = [{
        price_data: {
          currency: product.currency,
          unit_amount: product.price,
          recurring: {
            interval: product.interval!,
          },
          product_data: {
            name: product.name,
            description: product.description,
          },
        },
      }];
    } else {
      sessionParams.line_items = [{
        price_data: {
          currency: product.currency,
          unit_amount: product.price,
          product_data: {
            name: product.name,
            description: product.description,
          },
        },
      }];
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return {
      success: true,
      checkoutUrl: session.url,
    };
  }

  private async createStripePaymentIntent(
    amount: number,
    currency: string,
    customerId?: string,
    metadata?: Record<string, any>
  ): Promise<PaymentResult> {
    const stripe = require('stripe')(this.provider.apiKey);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      success: true,
      paymentIntent: {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status as any,
        customerId: paymentIntent.customer as string,
        metadata: paymentIntent.metadata,
      },
      clientSecret: paymentIntent.client_secret,
    };
  }

  private async cancelStripeSubscription(subscriptionId: string, immediate: boolean): Promise<PaymentResult> {
    const stripe = require('stripe')(this.provider.apiKey);

    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: !immediate,
    });

    if (immediate) {
      await stripe.subscriptions.cancel(subscriptionId);
    }

    return {
      success: true,
      subscription: {
        id: subscription.id,
        customerId: subscription.customer as string,
        productId: subscription.items.data[0]?.price?.metadata?.productId || '',
        status: subscription.status as any,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    };
  }

  private async getStripeCustomerSubscriptions(customerId: string): Promise<Subscription[]> {
    const stripe = require('stripe')(this.provider.apiKey);

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'all',
    });

    return subscriptions.data.map(sub => ({
      id: sub.id,
      customerId: sub.customer as string,
      productId: sub.items.data[0]?.price?.metadata?.productId || '',
      status: sub.status as any,
      currentPeriodStart: new Date(sub.current_period_start * 1000),
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    }));
  }

  // Méthodes Polar (simulées - à adapter selon l'API Polar)
  private async createPolarCustomer(email: string, name?: string): Promise<Customer> {
    // Implémentation avec l'API Polar
    // const polar = new Polar({ apiKey: this.provider.apiKey });
    // const customer = await polar.customers.create({ email, name });
    
    // Simulation pour démo
    return {
      id: `pol_${Date.now()}`,
      email,
      name,
    };
  }

  private async createPolarPaymentSession(
    product: Product,
    customerId: string,
    successUrl: string,
    cancelUrl: string,
    metadata?: Record<string, any>
  ): Promise<PaymentResult> {
    // Implémentation avec l'API Polar
    // const polar = new Polar({ apiKey: this.provider.apiKey });
    // const session = await polar.checkout.create({ ... });
    
    // Simulation pour démo
    return {
      success: true,
      checkoutUrl: `https://polar.sh/checkout/${product.id}?customer=${customerId}`,
    };
  }

  private async createPolarPaymentIntent(
    amount: number,
    currency: string,
    customerId?: string,
    metadata?: Record<string, any>
  ): Promise<PaymentResult> {
    // Implémentation avec l'API Polar
    return {
      success: true,
      clientSecret: `pi_${Date.now()}_secret`,
    };
  }

  private async cancelPolarSubscription(subscriptionId: string, immediate: boolean): Promise<PaymentResult> {
    // Implémentation avec l'API Polar
    return {
      success: true,
    };
  }

  private async getPolarCustomerSubscriptions(customerId: string): Promise<Subscription[]> {
    // Implémentation avec l'API Polar
    return [];
  }

  // Webhook handler
  async handleWebhook(body: string, signature: string): Promise<{ processed: boolean; data?: any }> {
    try {
      if (this.provider.name === 'stripe') {
        return await this.handleStripeWebhook(body, signature);
      } else if (this.provider.name === 'polar') {
        return await this.handlePolarWebhook(body, signature);
      }
      throw new Error('Provider non supporté');
    } catch (error) {
      console.error('Erreur webhook:', error);
      return { processed: false };
    }
  }

  private async handleStripeWebhook(body: string, signature: string): Promise<{ processed: boolean; data?: any }> {
    const stripe = require('stripe')(this.provider.apiKey);
    
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      this.provider.webhookSecret!
    );

    // Traiter les événements
    switch (event.type) {
      case 'checkout.session.completed':
        // Gérer la completion de checkout
        return { processed: true, data: event.data.object };
      
      case 'invoice.payment_succeeded':
        // Gérer le paiement réussi
        return { processed: true, data: event.data.object };
      
      case 'customer.subscription.deleted':
        // Gérer l'annulation d'abonnement
        return { processed: true, data: event.data.object };
      
      default:
        console.log(`Événement non traité: ${event.type}`);
        return { processed: false };
    }
  }

  private async handlePolarWebhook(body: string, signature: string): Promise<{ processed: boolean; data?: any }> {
    // Implémentation webhook Polar
    return { processed: true };
  }
}

// Configuration par défaut
export const defaultPaymentConfig: PaymentProvider = {
  name: 'stripe',
  apiKey: process.env.STRIPE_SECRET_KEY || '',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
};

// Instance par défaut
export const paymentService = new PaymentService(defaultPaymentConfig);

// Utilitaires
export const formatPrice = (amount: number, currency: string = 'usd'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount / 100);
};

export const getProductById = (id: string): Product | undefined => {
  return PRODUCTS.find(p => p.id === id);
};

export const getSubscriptionFeatures = (productId: string): string[] => {
  const product = getProductById(productId);
  return product?.features || [];
};