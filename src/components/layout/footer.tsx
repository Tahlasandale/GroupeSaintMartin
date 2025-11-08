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
      <div className="container mx-auto px-4 md:px-6 py-6 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
          &copy; 2024 AuthZen. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6 items-center">
          <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
            <DialogTrigger asChild>
              <Button variant="link" className="text-sm text-muted-foreground p-0 h-auto">Contact Us</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Contact Us</DialogTitle>
                <DialogDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
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
            Legal Notice
          </Link>
          <Link
            href="/politique-de-confidentialite"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            prefetch={false}
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
