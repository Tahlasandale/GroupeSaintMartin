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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ContactForm } from '@/components/contact-form';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const tiers = [
  {
    name: 'Free',
    price: '€0',
    features: [
      'Access to basic features',
      'Email support',
      'Standard analytics',
    ],
    cta: 'Get Started',
    href: '/dashboard', // Link to dashboard for free tier
    isLink: true,
  },
  {
    name: 'Pro',
    price: '€15',
    priceDescription: '/month',
    features: [
      'All features from the Free plan',
      'Advanced features',
      'Priority support',
      'Detailed analytics',
    ],
    cta: 'Choose Pro',
    href: 'https://buy.polar.sh/polar_cl_8WtBK8qKxwhIPc3owCulTeNXRTF7s4BXMGvNl0T70UR',
    isLink: true,
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'All features from the Pro plan',
      'API Access',
      '24/7 dedicated support',
      'Training and integration',
    ],
    cta: 'Contact Us',
    isLink: false,
  },
];

export default function SubscriptionPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Choose your subscription
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-xl">
            Simple and transparent plans, tailored to your needs.
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
                {tier.isLink ? (
                  <Button
                    asChild
                    className="w-full"
                    variant={tier.featured ? 'default' : 'outline'}
                  >
                    <Link href={tier.href!}>{tier.cta}</Link>
                  </Button>
                ) : (
                  <DialogTrigger asChild>
                    <Button
                      className="w-full"
                      variant={tier.featured ? 'default' : 'outline'}
                    >
                      {tier.cta}
                    </Button>
                  </DialogTrigger>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription>
            Fill out the form below to request a quote.
          </DialogDescription>
        </DialogHeader>
        <ContactForm
          initialSubject="Quote Request"
          onFormSubmit={() => setIsQuoteModalOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
