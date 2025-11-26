'use client';

import Link from 'next/link';
import { Leaf, LogOut, Menu, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export function Navbar() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    } finally {
      setIsSheetOpen(false);
    }
  };

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  const publicNavLinks = (
    <>
      <Button variant="link" asChild>
        <Link href="/qui-sommes-nous" prefetch={false} onClick={handleLinkClick}>
          Qui sommes-nous
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/le-scoutisme-a-saint-martin" prefetch={false} onClick={handleLinkClick}>
          Le scoutisme à Saint-Martin
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/activites" prefetch={false} onClick={handleLinkClick}>
          Activités
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/contacts" prefetch={false} onClick={handleLinkClick}>
          Contacts
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link href="/login" prefetch={false} onClick={handleLinkClick}>
          Connexion
        </Link>
      </Button>
    </>
  );

  const authNavLinks = (
    <>
      <Button variant="link" asChild>
        <Link href="/dashboard" prefetch={false} onClick={handleLinkClick}>
          Dashboard
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/lieux" prefetch={false} onClick={handleLinkClick}>
          Lieux
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/carnet-chants" prefetch={false} onClick={handleLinkClick}>
          Carnet de chants
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/jeux-veillee" prefetch={false} onClick={handleLinkClick}>
          Jeux de veillée
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/textes-route" prefetch={false} onClick={handleLinkClick}>
          Textes route
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/osl" prefetch={false} onClick={handleLinkClick}>
          OSL
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/ressources-chefs" prefetch={false} onClick={handleLinkClick}>
          Ressources chefs
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/carte-clan" prefetch={false} onClick={handleLinkClick}>
          Carte du clan
        </Link>
      </Button>
      <Button variant="ghost" onClick={handleSignOut}>
        <LogOut className="mr-2 h-4 w-4" />
        Déconnexion
      </Button>
    </>
  );

  const navLinks = user ? authNavLinks : publicNavLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6 h-14 flex items-center">
      <Link href="/" className="flex items-center justify-center mr-auto" prefetch={false}>
        <img src="/favicon.png" alt="Groupe Saint Martin" className="h-8 w-8 mr-2" />
        <span className="text-lg font-bold text-primary font-headline">Groupe Saint Martin</span>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="ml-auto hidden md:flex items-center gap-4 sm:gap-6">
        {navLinks}
      </nav>

      {/* Mobile Navigation */}
      <div className="ml-auto flex items-center md:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="sr-only">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              <Button variant="link" asChild>
                <Link href="/" prefetch={false} onClick={handleLinkClick} className="flex items-center justify-start">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </Button>
              {navLinks}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
