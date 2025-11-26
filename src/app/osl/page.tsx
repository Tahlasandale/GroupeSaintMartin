'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function OSLPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Ordre Saint Louis</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Présentation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              L'Ordre Saint Louis est la branche aînée du scoutisme français.
              Il rassemble les jeunes de 14 à 17 ans dans une aventure spirituelle
              et communautaire unique.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Valeurs et symboliques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Foi</h4>
                <p className="text-sm text-muted-foreground">
                  Recherche personnelle de sens et engagement spirituel
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Service</h4>
                <p className="text-sm text-muted-foreground">
                  Engagement concret au service des autres
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Fraternité</h4>
                <p className="text-sm text-muted-foreground">
                  Vie en communauté et partage des expériences
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Parcours d'un membre</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">Étape 1 : Découverte</h4>
                <p className="text-sm text-muted-foreground">
                  Initiation aux valeurs et à la spiritualité
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">Étape 2 : Engagement</h4>
                <p className="text-sm text-muted-foreground">
                  Participation active aux projets de service
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold">Étape 3 : Transmission</h4>
                <p className="text-sm text-muted-foreground">
                  Partage de l'expérience avec les plus jeunes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Événements OSL</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Rassemblements régionaux</li>
              <li>Pèlerinages spirituels</li>
              <li>Projets de service communautaire</li>
              <li>Formations et retraites</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Galerie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Photo 1</span>
              </div>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Photo 2</span>
              </div>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Photo 3</span>
              </div>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Photo 4</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}