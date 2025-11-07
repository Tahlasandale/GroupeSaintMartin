'use client';

import { AuthForm } from '@/components/auth-form';
import { useUser } from '@/firebase';
import { Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || user) {
    return (
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
        <div className="flex items-center gap-2 text-lg font-bold text-primary">
          <Leaf className="h-6 w-6 animate-spin" />
          <span className="font-headline">AuthZen</span>
        </div>
        <p className="text-muted-foreground">Loading...</p>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-8 left-8 flex items-center gap-2 text-lg font-bold text-primary">
        <Leaf className="h-6 w-6" />
        <span className="font-headline">AuthZen</span>
      </div>
      <AuthForm />
    </main>
  );
}
