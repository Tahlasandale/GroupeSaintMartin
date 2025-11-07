'use client';

import Link from 'next/link';
import { Leaf, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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

  const navLinks = (
    <>
      <Button variant="link" asChild>
        <Link href="/pre-registration" prefetch={false} onClick={handleLinkClick}>
          Pre-registration
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/dashboard" prefetch={false} onClick={handleLinkClick}>
          Dashboard
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/template" prefetch={false} onClick={handleLinkClick}>
          Template
        </Link>
      </Button>
      {user ? (
        <Button variant="ghost" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      ) : (
        <Button asChild variant="default">
          <Link href="/login" prefetch={false} onClick={handleLinkClick}>
            Sign In
          </Link>
        </Button>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6 h-14 flex items-center">
      <Link href="/" className="flex items-center justify-center mr-auto" prefetch={false}>
        <Leaf className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-bold text-primary font-headline">AuthZen</span>
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
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
