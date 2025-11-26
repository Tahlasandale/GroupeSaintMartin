'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ActivitesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Activités</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Camps</CardTitle>
            <CardDescription>Découvrez nos camps annuels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Galerie photos camps</span>
              </div>
              <div>
                <p className="text-muted-foreground mb-4">
                  Chaque année, nos branches organisent des camps d'été inoubliables
                  où les jeunes développent leur autonomie et leur esprit d'équipe.
                  Les enfants préparent cet objectif toute l'année.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>Durées par branche :</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Louveteaux/Louvettes : 5 à 11 jours</li>
                    <li>Scouts/Guides : 3 semaines</li>
                    <li>Routiers/Guides Aînées : 3 semaines avec projets spécifiques</li>
                  </ul>
                  <p className="mt-2"><strong>Camps de Pâques :</strong> D'une période d'une semaine</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Rythme des activités</CardTitle>
            <CardDescription>Organisation des sorties et camps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Les groupes Saint-Louis, Saint-François, Sainte-Geneviève et Sainte-Claire ont décidé de planifier leurs activités conjointement, et dans la même zone géographique. Les activités ont donc lieu, autant que possible, aux mêmes week-ends, dans un périmètre rapproché afin de faciliter l'organisation des familles et ainsi concilier scoutisme et vie familiale.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Fréquence :</h4>
                <p className="text-sm text-muted-foreground">En moyenne, les activités ont lieu tous les mois. Elles peuvent durer le temps d'un week-end ou d'une sortie (fixée le dimanche).</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Sorties</CardTitle>
            <CardDescription>Activités régulières des branches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">🐺 Louveteaux / Louvettes</h4>
                <p className="text-sm text-muted-foreground">Sorties nature, jeux en forêt, veillées</p>
              </div>
              <div>
                <h4 className="font-semibold">🔥 Scouts / Guides</h4>
                <p className="text-sm text-muted-foreground">Randonnées, activités manuelles, service communautaire</p>
              </div>
              <div>
                <h4 className="font-semibold">🛡️ Routiers / Guides Aînées</h4>
                <p className="text-sm text-muted-foreground">Projets de service, formations, échanges</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Projets de service routiers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Nos routiers s'engagent dans des projets concrets au service de la communauté :
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Aide aux personnes âgées du quartier</li>
              <li>Nettoyage des espaces naturels</li>
              <li>Collectes solidaires</li>
              <li>Animations pour les plus jeunes</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Moments marquants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Événement 1</span>
              </div>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Événement 2</span>
              </div>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Événement 3</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}