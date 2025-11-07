'use client';

import Link from 'next/link';
import { Leaf, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background shadow-sm">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <Leaf className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-bold text-primary font-headline">AuthZen</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Button variant="link" asChild size="sm">
          <Link href="/dashboard" prefetch={false}>
            Dashboard
          </Link>
        </Button>
        <Button variant="link" asChild size="sm">
          <Link href="/template" prefetch={false}>
            Template
          </Link>
        </Button>
        {user ? (
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        ) : (
          <Button asChild size="sm" variant="default">
            <Link href="/login" prefetch={false}>
              Sign In
            </Link>
          </Button>
        )}
      </nav>
    </header>
  );
}
