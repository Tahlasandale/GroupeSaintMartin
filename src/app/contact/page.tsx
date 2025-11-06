import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const metadata: Metadata = {
  title: 'Contact - Mon Application',
  description: 'Contactez-nous pour toute question ou information',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contactez-nous</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-xl font-semibold mb-4">Nos coordonnées</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Adresse</h3>
                <p className="text-muted-foreground">123 Rue de l'Exemple, 75000 Paris</p>
              </div>
              <div>
                <h3 className="font-medium">Téléphone</h3>
                <p className="text-muted-foreground">+33 1 23 45 67 89</p>
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">contact@monapplication.com</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Heures d'ouverture</h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-muted-foreground">Lundi - Vendredi</span>
                <span>9h00 - 18h00</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Samedi</span>
                <span>10h00 - 16h00</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Dimanche</span>
                <span>Fermé</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Envoyez-nous un message</h2>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Nom complet <span className="text-destructive">*</span>
                </label>
                <Input id="name" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input id="email" type="email" required />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium">
                Sujet <span className="text-destructive">*</span>
              </label>
              <Input id="subject" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium">
                Message <span className="text-destructive">*</span>
              </label>
              <Textarea id="message" rows={5} required />
            </div>
            <Button type="submit" className="mt-4">
              Envoyer le message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
