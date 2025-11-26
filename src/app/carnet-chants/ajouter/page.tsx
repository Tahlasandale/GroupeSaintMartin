'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AddChantForm } from '@/components/add-chant-form';
import { useUser } from '@/firebase';

export default function AddChantPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
      return;
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSuccess = () => {
    router.push('/carnet-chants');
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Ajouter un chant</h1>

        <Card>
          <CardHeader>
            <CardTitle>Nouveau chant</CardTitle>
            <CardDescription>
              Ajoutez un chant au Carnet de Chants. Tous les champs sont obligatoires.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddChantForm onSuccess={handleSuccess} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}