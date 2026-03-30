'use client';

import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Leaf, Shield, Music, Users } from 'lucide-react';
import { doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function AdminDashboardPage() {
  const { user, isUserLoading } = useUser();
  const navigate = useNavigate();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [user, firestore]
  );
  const { data: userData, isLoading: isUserDataLoading } = useDoc(userDocRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      navigate('/login');
    }

    if (!isUserDataLoading && userData) {
      if (!(userData as any).isAdmin) {
        navigate('/dashboard');
      }
    }
  }, [user, isUserLoading, userData, isUserDataLoading, navigate]);

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
            <Link to="/admin/contacts">
              <Users className="mr-2 h-4 w-4" />
              Voir les Contacts
            </Link>
          </Button>
          <Button asChild>
            <Link to="/carnet-chants">
              <Music className="mr-2 h-4 w-4" />
              Gérer les Chants
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
