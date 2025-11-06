'use client';

import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Import dynamique du composant client pour éviter les erreurs d'hydratation
const HomeClient = dynamic(() => import('./home-client'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-16">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
    </div>
  ),
});

export default function HeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Bienvenue sur MonApp
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          La solution moderne pour gérer vos projets, collaborer avec votre équipe et atteindre vos objectifs plus rapidement.
        </p>
        <HomeClient />
      </div>
    </section>
  );
}
