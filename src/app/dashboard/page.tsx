'use client';

import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Leaf, User } from 'lucide-react';
import { doc } from 'firebase/firestore';
import { useRole } from '@/hooks/use-role';
import { ROLE_LABELS } from '@/types/roles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const navigate = useNavigate();
  const firestore = useFirestore();
  const { role } = useRole();

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
      if ((userData as any).isAdmin) {
        navigate('/admin/dashboard');
      }
    }
  }, [user, isUserLoading, userData, isUserDataLoading, navigate]);

  if (isUserLoading || isUserDataLoading || !user) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Leaf className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const displayRole = role ? ROLE_LABELS[role] : 'Pas de rôle';

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Mon Profil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-lg font-medium">{user.email}</p>
              <p className="text-sm text-muted-foreground">Compte actif</p>
            </div>
            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground text-center">Mon rôle</p>
              <p className="text-xl font-bold text-center mt-1">{displayRole}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
