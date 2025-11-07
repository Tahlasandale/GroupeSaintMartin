import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MentionsLegalesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Mentions Légales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Éditeur du site</h2>
            <p>Nom de l'entreprise : AuthZen</p>
            <p>Adresse : 123 Rue Fictive, 75000 Paris, France</p>
            <p>Email : contact@authzen.com</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Hébergement</h2>
            <p>Hébergeur : Firebase Hosting</p>
            <p>Société : Google LLC</p>
            <p>Adresse : 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Propriété intellectuelle</h2>
            <p>
              Le contenu de ce site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive de AuthZen,
              à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Données personnelles</h2>
            <p>
              Les informations recueillies sont nécessaires pour votre adhésion. Elles font l’objet d’un traitement informatique et sont destinées
              au secrétariat de l’association. Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée, vous bénéficiez d’un
              droit d’accès, de rectification et de suppression des informations qui vous concernent.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
