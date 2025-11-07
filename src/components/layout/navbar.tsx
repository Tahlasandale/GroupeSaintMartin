'use client';

import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';

export function Navbar() {
  const { user } = useUser();

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background shadow-sm">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <Leaf className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-bold text-primary font-headline">AuthZen</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Button variant="link" asChild size="sm">
          <Link href="/" prefetch={false}>
            Home
          </Link>
        </Button>
        <Button variant="link" asChild size="sm">
          <Link href="/dashboard" prefetch={false}>
            Dashboard
          </Link>
        </Button>
        {!user && (
          <>
            <Button asChild size="sm">
              <Link href="/login" prefetch={false}>
                Sign In
              </Link>
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
