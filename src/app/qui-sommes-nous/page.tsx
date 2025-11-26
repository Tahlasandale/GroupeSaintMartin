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
            <div className="space-y-4">
              <blockquote className="border-l-4 border-green-500 pl-4 italic text-muted-foreground">
                « Qu'est-ce que l'esprit scout ? » demande le père Jacques Sevin. « C'est un esprit social (…) C'est un esprit loyal (…) C'est un esprit joyeux.(…) C'est surtout un esprit de dévouement (…) Il n'est donc pas question de confisquer la religion au profit du scoutisme, de naturaliser le surnaturel en plaçant le titre de scout au-dessus de celui de chrétien. Les deux notions se compénètrent et se superposent suivant la volonté formelle du fondateur et de la hiérarchie providentielle. L'enfant se rend compte que religion et scoutisme n'occupent pas dans son âme et sa vie des compartiments distincts, qu'il doit apporter à ses devoirs religieux la plénitude des qualités que le scoutisme développe : loyalisme, personnalité, perfection du détail ; et que, d'autre part, il ne sera parfait scout qu'en vertu des principes surnaturels qui feront déjà de lui le parfait chrétien, si bien que, former un vrai scout c'est du même coup, former un chevalier chrétien tout simplement. Est-ce donc une telle exagération que d'identifier l'esprit scout à l'esprit chrétien : il en est la fleur. Et quand cette fleur de chevalerie s'est ouverte une fois dans une âme d'enfant, le parfum lui en reste toujours. »
                <footer className="text-sm mt-2">— Extrait du livre « Le scoutisme », 1930</footer>
              </blockquote>
              <p className="text-muted-foreground">
                Animés de cet esprit scout, des paroissiens de Saint-Martin-de-Bréthencourt se sont mobilisés pour créer quatre groupes Europa Scouts. La volonté d'une pratique du scoutisme héritée de Baden Powell et du père Sevin, de dimension familiale et attachée à la messe traditionnelle a guidé naturellement les « fondateurs » vers les Europa Scouts. Aujourd'hui près de 160 enfants du sud des Yvelines sont réunis autour des valeurs éducatives du scoutisme.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Les 5 buts du scoutisme</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li><strong>La formation du caractère :</strong> le sens de l'observation, l'analyse objective des faits, le jugement personnel, la volonté de regarder les difficultés en face et la capacité de les surmonter</li>
              <li><strong>La santé physique :</strong> recherchée par la détente au grand air, la pratique d'habitudes saines, les parcours sportifs et les sports d'équipe</li>
              <li><strong>L'habileté technique :</strong> l'acquisition de techniques simples et variées, d'application pratique réelle et peu onéreuse sans enfermer le garçon dans des spécialités « techniciennes »</li>
              <li><strong>Le service du prochain :</strong> les activités doivent aider le garçon à découvrir et aimer son prochain et à le servir en actes (pratique de la bonne action, secourisme…)</li>
              <li><strong>La recherche de Dieu :</strong> la découverte personnelle de Dieu en développant le sens du sacré et l'esprit de contemplation à travers l'œuvre de Dieu</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Nos branches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                La pédagogie scoute distingue les enfants en trois branches selon les âges :
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-4xl mb-2">🐺</div>
                  <h3 className="font-semibold">Louveteaux / Louvettes</h3>
                  <p className="text-sm text-muted-foreground">8 à 12 ans (branche jaune)</p>
                  <p className="text-xs mt-2">Méthode adaptée aux plus jeunes</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-4xl mb-2">🔥</div>
                  <h3 className="font-semibold">Scouts / Guides</h3>
                  <p className="text-sm text-muted-foreground">12 à 17 ans (branche verte)</p>
                  <p className="text-xs mt-2">Développement de l'autonomie</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-4xl mb-2">🛡️</div>
                  <h3 className="font-semibold">Routiers / Guides Aînées</h3>
                  <p className="text-sm text-muted-foreground">17 à 22 ans (branche rouge)</p>
                  <p className="text-xs mt-2">Engagement et service</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                Chaque branche délivre une pédagogie adaptée à l'enfant et lui permet d'évoluer progressivement et de grandir dans la joie scoute.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Conclusion</CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="border-l-4 border-green-500 pl-4 italic text-muted-foreground">
              « Meilleurs scouts parce que catholiques, meilleurs catholiques parce que scouts »
              <footer className="text-sm mt-2">— Chanoine Cornette</footer>
            </blockquote>
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