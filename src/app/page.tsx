'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Grande bannière */}
      <section className="relative h-96 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(/drapeau-ile-de-france.png)' }}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Bienvenue au Groupe Saint Martin de Brethencourt
          </h1>
          <p className="text-xl md:text-2xl">
            Découvrez nos activités scoutes et rejoignez notre communauté
          </p>
        </div>
      </section>

      <div className="container mx-auto py-12 px-4 md:px-6">
        {/* Encadré Nos unités */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Nos unités</CardTitle>
            <CardDescription>Rejoignez l'aventure scoute adaptée à votre âge</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 border rounded-lg">
                <div className="text-6xl mb-4">🐺</div>
                <h3 className="text-xl font-semibold mb-2">Louveteaux / Louvettes</h3>
                <p className="text-muted-foreground">8-11 ans</p>
                <p className="text-sm mt-2">Méthode LL - Aventures en meute</p>
              </div>
              <div className="text-center p-6 border rounded-lg">
                <div className="text-6xl mb-4">🔥</div>
                <h3 className="text-xl font-semibold mb-2">Scouts / Guides</h3>
                <p className="text-muted-foreground">11-14 ans</p>
                <p className="text-sm mt-2">Méthode SG - Éclaireurs de la nature</p>
              </div>
              <div className="text-center p-6 border rounded-lg">
                <div className="text-6xl mb-4">🛡️</div>
                <h3 className="text-xl font-semibold mb-2">Routiers / Guides Aînées</h3>
                <p className="text-muted-foreground">14-17 ans</p>
                <p className="text-sm mt-2">Route R/GA - Service et engagement</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dernières actualités */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Dernières actualités</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">Camp d'été 2024</h4>
                <p className="text-sm text-muted-foreground">Les inscriptions pour le camp d'été sont ouvertes !</p>
                <p className="text-xs text-muted-foreground mt-1">15 juin 2024</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">Nouvelle équipe de maîtrise</h4>
                <p className="text-sm text-muted-foreground">Bienvenue à nos nouveaux chefs !</p>
                <p className="text-xs text-muted-foreground mt-1">1 juin 2024</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">Journée portes ouvertes</h4>
                <p className="text-sm text-muted-foreground">Venez découvrir nos activités ce samedi !</p>
                <p className="text-xs text-muted-foreground mt-1">20 mai 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bouton Nous contacter */}
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/contacts">
              Nous contacter
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
