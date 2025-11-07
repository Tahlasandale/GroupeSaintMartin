import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PolitiqueDeConfidentialitePage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Politique de Confidentialité</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Introduction</h2>
            <p>
              Chez AuthZen, nous nous engageons à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons,
              utilisons, divulguons et protégeons vos informations lorsque vous utilisez notre site web.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Collecte de vos informations</h2>
            <p>
              Nous pouvons collecter des informations personnellement identifiables, telles que votre nom, votre adresse e-mail et des informations
              démographiques, que vous nous fournissez volontairement lorsque vous vous inscrivez sur le site.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Utilisation de vos informations</h2>
            <p>
              Le fait d'avoir des informations exactes nous permet de vous fournir une expérience fluide, efficace et personnalisée. Spécifiquement,
              nous pouvons utiliser les informations collectées à votre sujet via le site pour :
            </p>
            <ul className="list-disc list-inside pl-4">
              <li>Créer et gérer votre compte.</li>
              <li>Vous envoyer un e-mail concernant votre compte ou votre commande.</li>
              <li>Améliorer l'efficacité et le fonctionnement du site.</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Sécurité de vos informations</h2>
            <p>
              Nous utilisons des mesures de sécurité administratives, techniques et physiques pour aider à protéger vos informations personnelles.
              Bien que nous ayons pris des mesures raisonnables pour sécuriser les informations personnelles que vous nous fournissez, veuillez être
              conscient que malgré nos efforts, aucune mesure de sécurité n'est parfaite ou impénétrable.
            </p>
          </div>
           <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Contactez-nous</h2>
            <p>
              Si vous avez des questions ou des commentaires sur cette politique de confidentialité, veuillez nous contacter à : contact@authzen.com
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
