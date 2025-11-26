'use client';

import Link from 'next/link';
import { ContactForm } from '../contact-form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useState } from 'react';

export function Footer() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <div className="text-lg font-bold text-primary mb-2">Groupe Saint Martin</div>
            <p className="text-sm text-muted-foreground italic">
              "Toujours Prêt – Groupe Saint Martin de Brethencourt"
            </p>
          </div>

          <nav className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
              <DialogTrigger asChild>
                <Button variant="link" className="text-sm text-muted-foreground p-0 h-auto">Contact</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Nous contacter</DialogTitle>
                  <DialogDescription>
                    Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                  </DialogDescription>
                </DialogHeader>
                <ContactForm onFormSubmit={() => setIsContactModalOpen(false)}/>
              </DialogContent>
            </Dialog>
            <Link
              href="/mentions-legales"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              prefetch={false}
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              prefetch={false}
            >
              Politique de confidentialité
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              prefetch={false}
            >
              Charte du site
            </Link>
          </nav>

          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground mb-2">Suivez-nous</p>
            <div className="flex justify-center md:justify-end gap-4">
              <Link href="https://www.instagram.com/grp_st_martin_brethencourt/" className="text-muted-foreground hover:text-foreground">
                📷 Instagram
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
