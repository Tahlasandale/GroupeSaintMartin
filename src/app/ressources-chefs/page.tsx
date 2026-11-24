'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Book, Wrench, CheckSquare } from 'lucide-react';

export default function RessourcesChefsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Ressources pour Chefs</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ExternalLink className="mr-2 h-5 w-5" />
              Sites utiles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="link" className="p-0 h-auto text-left">
                <ExternalLink className="mr-2 h-4 w-4" />
                Scouts et Guides de France - Site officiel
              </Button>
              <Button variant="link" className="p-0 h-auto text-left">
                <ExternalLink className="mr-2 h-4 w-4" />
                Fédération du Scoutisme Français
              </Button>
              <Button variant="link" className="p-0 h-auto text-left">
                <ExternalLink className="mr-2 h-4 w-4" />
                Ressources pédagogiques nationales
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wrench className="mr-2 h-5 w-5" />
              Techniques scouts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Nœuds</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Nœud de chaise</li>
                  <li>Nœud plat</li>
                  <li>Nœud de cabestan</li>
                  <li>Nœud de pêcheur</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Feu</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Allumage en sécurité</li>
                  <li>Techniques de bivouac</li>
                  <li>Signaux de fumée</li>
                  <li>Extinction complète</li>
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Installations</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Tentes et abris</li>
                <li>Cordages et haubans</li>
                <li>Ponts de singe</li>
                <li>Tyroliennes</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="mr-2 h-5 w-5" />
              Pédagogie branche par branche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold">🐺 Louveteaux / Louvettes</h4>
                <p className="text-sm text-muted-foreground">
                  Méthode LL : Favoriser l'imagination, les jeux symboliques,
                  l'apprentissage par le faire dans un cadre sécurisant.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">🔥 Scouts / Guides</h4>
                <p className="text-sm text-muted-foreground">
                  Méthode SG : Développer l'autonomie, l'esprit d'équipe,
                  la créativité et l'engagement citoyen.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">🛡️ Routiers / Guides Aînées</h4>
                <p className="text-sm text-muted-foreground">
                  Route R/GA : Approfondir la dimension spirituelle,
                  encourager l'engagement personnel et communautaire.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckSquare className="mr-2 h-5 w-5" />
              Checklists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Préparation de camp</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Vérification du matériel</li>
                  <li>Plan d'intinéraire</li>
                  <li>Autorisations administratives</li>
                  <li>Plan de secours</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Sécurité</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Premiers secours</li>
                  <li>Numéros d'urgence</li>
                  <li>Évacuation d'urgence</li>
                  <li>Contact parents</li>
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Documents admin</h4>
              <p className="text-sm text-muted-foreground">
                Fiches d'inscription, autorisations parentales, assurances,
                conventions de partenariat, rapports d'activité.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}