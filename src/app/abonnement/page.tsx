'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

const tiers = [
  {
    name: 'Gratuit',
    price: '0€',
    features: [
      'Accès aux fonctionnalités de base',
      'Support par email',
      'Analyses standards',
    ],
    cta: 'Commencer',
    href: '/dashboard', // Link to dashboard for free tier
  },
  {
    name: 'Pro',
    price: '15€',
    priceDescription: '/mois',
    features: [
      'Toutes les fonctionnalités du plan Gratuit',
      'Fonctionnalités avancées',
      'Support prioritaire',
      'Analyses détaillées',
    ],
    cta: 'Choisir Pro',
    href: 'https://polar.sh/', // Placeholder for your Polar.sh link
    featured: true,
  },
  {
    name: 'Entreprise',
    price: 'Sur devis',
    features: [
      'Toutes les fonctionnalités du plan Pro',
      'Accès API',
      'Support dédié 24/7',
      'Formation et intégration',
    ],
    cta: 'Nous contacter',
    href: 'mailto:contact@authzen.com',
  },
];

export default function SubscriptionPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Choisissez votre abonnement
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-xl">
          Des plans simples et transparents, adaptés à vos besoins.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={`flex flex-col ${tier.featured ? 'border-primary ring-2 ring-primary' : ''}`}
          >
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.priceDescription && (
                    <span className="ml-1 text-muted-foreground">
                      {tier.priceDescription}
                    </span>
                  )}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className="w-full"
                variant={tier.featured ? 'default' : 'outline'}
              >
                <Link href={tier.href}>{tier.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
