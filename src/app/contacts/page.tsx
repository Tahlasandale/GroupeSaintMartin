'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactForm } from '@/components/contact-form';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Contacts</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Email officiel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@groupsaintmartin.fr</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Localisation du local</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1" />
                <div>
                  <p>123 Rue des Scouts</p>
                  <p>Brethencourt, France</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Contacts par groupe</CardTitle>
            <CardDescription>Chefs de groupe Europa Scouts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-lg">Garçons</h4>
                <p className="text-sm text-muted-foreground mb-2">Groupes Saint-Louis et Saint-François</p>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-3 w-3" />
                    <span>europa.saintmartin1@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-3 w-3" />
                    <span>Hugues Bothier (chef de groupe) - 06 58 36 69 54</span>
                  </div>
                </div>
              </div>
              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="font-semibold text-lg">Filles</h4>
                <p className="text-sm text-muted-foreground mb-2">Groupes Sainte-Geneviève et Sainte-Claire</p>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-3 w-3" />
                    <span>europa.saintmartin2@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-3 w-3" />
                    <span>Marie-Amélie Brocard (cheftaine de groupe) - 06 28 29 45 19</span>
                  </div>
                </div>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note :</strong> L'aspect financier ne doit pas constituer un obstacle à l'inscription des enfants au scoutisme.
                  N'hésitez pas à contacter les chefs de groupe si vous souhaitez en connaître davantage avant d'inscrire vos enfants.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formulaire de message</CardTitle>
            <CardDescription>Envoyez-nous un message</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}