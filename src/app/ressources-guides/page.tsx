'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Book, Wrench, CheckSquare } from 'lucide-react';

export default function RessourcesGuidesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Ressources Guides</h1>

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
                Liens utiles pour les cheftaines guides...
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="mr-2 h-5 w-5" />
              Pédagogie Guides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              La méthode des Guides développe l'autonomie, l'esprit d'équipe,
              la créativité et l'engagement citoyen.
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
              Techniques spécifiques aux Guides...
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
              Checklist pour les cheftaines guides...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
