'use client';

import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Leaf, Shield, Mail, Users } from 'lucide-react';
import { doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [user, firestore]
  );
  const { data: userData, isLoading: isUserDataLoading } = useDoc(userDocRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }

    if (!isUserDataLoading && userData) {
      if (!(userData as any).isAdmin) {
        router.push('/dashboard');
      }
    }
  }, [user, isUserLoading, userData, isUserDataLoading, router]);

  if (isUserLoading || isUserDataLoading || !userData || !(userData as any).isAdmin) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Leaf className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center items-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome, {user?.email || 'Admin'}. You have special privileges.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Button asChild>
            <Link href="/admin/send-email">
              <Mail className="mr-2 h-4 w-4" />
              Send Bulk Email
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/contacts">
              <Users className="mr-2 h-4 w-4" />
              View Contacts
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
