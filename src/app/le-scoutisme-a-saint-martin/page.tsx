'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LeScoutismeASaintMartinPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Le scoutisme à Saint-Martin</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>L'esprit scout</CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="border-l-4 border-green-500 pl-4 italic text-muted-foreground mb-4">
              « Qu'est-ce que l'esprit scout ? » demande le père Jacques Sevin. « C'est un esprit social (…) C'est un esprit loyal (…) C'est un esprit joyeux.(…) C'est surtout un esprit de dévouement (…) Il n'est donc pas question de confisquer la religion au profit du scoutisme, de naturaliser le surnaturel en plaçant le titre de scout au-dessus de celui de chrétien. Les deux notions se compénètrent et se superposent suivant la volonté formelle du fondateur et de la hiérarchie providentielle. L'enfant se rend compte que religion et scoutisme n'occupent pas dans son âme et sa vie des compartiments distincts, qu'il doit apporter à ses devoirs religieux la plénitude des qualités que le scoutisme développe : loyalisme, personnalité, perfection du détail ; et que, d'autre part, il ne sera parfait scout qu'en vertu des principes surnaturels qui feront déjà de lui le parfait chrétien, si bien que, former un vrai scout c'est du même coup, former un chevalier chrétien tout simplement. Est-ce donc une telle exagération que d'identifier l'esprit scout à l'esprit chrétien : il en est la fleur. Et quand cette fleur de chevalerie s'est ouverte une fois dans une âme d'enfant, le parfum lui en reste toujours. »
              <footer className="text-sm mt-2">— Extrait du livre « Le scoutisme », 1930</footer>
            </blockquote>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Europa Scouts à Saint-Martin</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Animés de cet esprit scout, des paroissiens de Saint-Martin-de-Bréthencourt se sont mobilisés pour créer quatre groupes Europa Scouts. La volonté d'une pratique du scoutisme héritée de Baden Powell et du père Sevin, de dimension familiale et attachée à la messe traditionnelle a guidé naturellement les « fondateurs » vers les Europa Scouts. Aujourd'hui près de 160 enfants du sud des Yvelines sont réunis autour des valeurs éducatives du scoutisme.
            </p>
            <p className="text-muted-foreground">
              Quelles sont-elles ? Ces valeurs peuvent se résumer à travers les 5 buts du scoutisme :
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground mt-4">
              <li>La formation du caractère : le sens de l'observation, l'analyse objective des faits, le jugement personnel, la volonté de regarder les difficultés en face et la capacité de les surmonter</li>
              <li>La santé physique recherchée par la détente au grand air, la pratique d'habitudes saines, les parcours sportifs et les sports d'équipe</li>
              <li>L'habileté technique : l'acquisition de techniques simples et variées, d'application pratique réelle et peu onéreuse sans enfermer le garçon dans des spécialités « techniciennes »</li>
              <li>Le service du prochain : les activités doivent aider le garçon à découvrir et aimer son prochain et à le servir en actes (pratique de la bonne action, secourisme…)</li>
              <li>La recherche de Dieu : la découverte personnelle de Dieu en développant le sens du sacré et l'esprit de contemplation à travers l'œuvre de Dieu</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>La pédagogie scoute</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              La pédagogie scoute distingue les enfants en trois branches selon les âges :
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-4xl mb-2">🐺</div>
                <h3 className="font-semibold">Louveteaux / Louvettes</h3>
                <p className="text-sm text-muted-foreground">8 à 12 ans (branche jaune)</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-4xl mb-2">🔥</div>
                <h3 className="font-semibold">Scouts / Guides</h3>
                <p className="text-sm text-muted-foreground">12 à 17 ans (branche verte)</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-4xl mb-2">🛡️</div>
                <h3 className="font-semibold">Routiers / Guides Aînées</h3>
                <p className="text-sm text-muted-foreground">17 à 22 ans (branche rouge)</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mt-4">
              Chaque branche délivre une pédagogie adaptée à l'enfant et lui permet d'évoluer progressivement et de grandir dans la joie scoute.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Organisation des activités</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Les groupes Saint-Louis, Saint-François, Sainte-Geneviève et Sainte-Claire ont décidé de planifier leurs activités conjointement, et dans la même zone géographique. Les activités ont donc lieu, autant que possible, aux mêmes week-ends, dans un périmètre rapproché afin de faciliter l'organisation des familles et ainsi concilier scoutisme et vie familiale.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                En moyenne, les activités ont lieu tous les mois. Elles peuvent durer le temps d'un week-end ou d'une sortie (fixée le dimanche). Enfin, le camp d'été est le moment fort de l'année scoute. Les enfants préparent cet objectif toute l'année. Pour les plus jeunes, le camp s'étale entre 5 et 11 jours, pour la branche verte, il dure trois semaines. A ces activités peuvent se rajouter des « camps de Pâques » d'une période d'une semaine.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
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
      </div>
    </div>
  );
}