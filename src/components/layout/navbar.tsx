'use client';

import { Link, useNavigate } from 'react-router-dom';
import { Leaf, LogOut, Menu, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { signOut } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';
import { useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { useRole } from '@/hooks/use-role';
import type { UserRole } from '@/types/roles';

export function Navbar() {
  const { user } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { role, isAdmin } = useRole();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    } finally {
      setIsSheetOpen(false);
    }
  };

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  const canAccess = (requiredRoles: UserRole[]): boolean => {
    if (!role) return false;
    if (role === 'admin') return true;
    return requiredRoles.includes(role);
  };

  const publicNavLinks = (
    <>
      <Button variant="link" asChild>
        <Link to="/qui-sommes-nous" onClick={handleLinkClick}>
          Qui sommes-nous
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link to="/le-scoutisme-a-saint-martin" onClick={handleLinkClick}>
          Le scoutisme à Saint-Martin
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link to="/activites" onClick={handleLinkClick}>
          Activités
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link to="/carnet-chants" onClick={handleLinkClick}>
          Carnet de chants
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link to="/contacts" onClick={handleLinkClick}>
          Contacts
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link to="/login" onClick={handleLinkClick}>
          Se connecter
        </Link>
      </Button>
    </>
  );

  const authNavLinks = (
    <>
      <Button variant="link" asChild>
        <Link to="/dashboard" onClick={handleLinkClick}>
          Dashboard
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link to="/lieux" onClick={handleLinkClick}>
          Lieux
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link to="/carnet-chants" onClick={handleLinkClick}>
          Carnet de chants
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link to="/jeux-veillee" onClick={handleLinkClick}>
          Jeux de veillée
        </Link>
      </Button>
      {canAccess(['aine', 'chef_louveteaux', 'cheftaine_louvettes', 'chef_scouts', 'cheftaine_guides', 'admin']) && (
        <Button variant="link" asChild>
          <Link to="/routiers" onClick={handleLinkClick}>
            Routiers
          </Link>
        </Button>
      )}
      {isAdmin && (
        <Button variant="link" asChild>
          <Link to="/osl" onClick={handleLinkClick}>
            OSL
          </Link>
        </Button>
      )}
      {canAccess(['chef_louveteaux', 'admin']) && (
        <Button variant="link" asChild>
          <Link to="/ressources-louveteaux" onClick={handleLinkClick}>
            Ressources LL
          </Link>
        </Button>
      )}
      {canAccess(['cheftaine_louvettes', 'admin']) && (
        <Button variant="link" asChild>
          <Link to="/ressources-louvettes" onClick={handleLinkClick}>
            Ressources Louvettes
          </Link>
        </Button>
      )}
      {canAccess(['chef_scouts', 'admin']) && (
        <Button variant="link" asChild>
          <Link to="/ressources-scouts" onClick={handleLinkClick}>
            Ressources SG
          </Link>
        </Button>
      )}
      {canAccess(['cheftaine_guides', 'admin']) && (
        <Button variant="link" asChild>
          <Link to="/ressources-guides" onClick={handleLinkClick}>
            Ressources Guides
          </Link>
        </Button>
      )}
      <Button variant="ghost" onClick={handleSignOut}>
        <LogOut className="mr-2 h-4 w-4" />
        Se déconnecter
      </Button>
    </>
  );

  const navLinks = user ? authNavLinks : publicNavLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6 h-14 flex items-center">
      <Link to="/" className="flex items-center justify-center mr-auto">
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
                <Link to="/" onClick={handleLinkClick} className="flex items-center justify-start">
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
