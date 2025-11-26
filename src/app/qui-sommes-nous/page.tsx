'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function QuiSommesNousPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Qui sommes-nous</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Historique du groupe</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Le Groupe Saint Martin de Brethencourt est une unité scoute française fondée en [année].
              Depuis sa création, le groupe s'est engagé dans l'éducation des jeunes selon la méthode scoute,
              promouvant les valeurs de fraternité, service et spiritualité.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Valeurs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Fraternité :</strong> Vivre ensemble dans le respect mutuel</li>
              <li><strong>Service :</strong> S'engager pour les autres et la communauté</li>
              <li><strong>Spiritualité :</strong> Développer une dimension spirituelle personnelle</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Nos branches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🐺</div>
                <h3 className="font-semibold">Louveteaux / Louvettes</h3>
                <p className="text-sm text-muted-foreground">Méthode LL - 8-11 ans</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🔥</div>
                <h3 className="font-semibold">Scouts / Guides</h3>
                <p className="text-sm text-muted-foreground">Méthode SG - 11-14 ans</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🛡️</div>
                <h3 className="font-semibold">Routiers / Guides Aînées</h3>
                <p className="text-sm text-muted-foreground">Route R/GA - 14-17 ans</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Photos de maîtrise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Placeholder images */}
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