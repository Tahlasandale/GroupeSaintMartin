'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Book, Wrench, CheckSquare } from 'lucide-react';

export default function RessourcesLouvettesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Ressources Louvettes</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ExternalLink className="mr-2 h-5 w-5" />
              Sites utiles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Liens utiles pour les cheftaines louvettes...
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="mr-2 h-5 w-5" />
              Pédagogie Louvettes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              La méthode des Louvettes favorise l'imagination, les jeux symboliques,
              l'apprentissage par le faire dans un cadre sécurisant.
              Contenu spécifique à venir...
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wrench className="mr-2 h-5 w-5" />
              Techniques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Techniques spécifiques aux Louvettes...
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckSquare className="mr-2 h-5 w-5" />
              Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Checklist pour les cheftaines louvettes...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
