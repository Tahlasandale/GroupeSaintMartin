'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFirestore, useUser } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { MapPin, Plus } from 'lucide-react';

interface Lieu {
  id: string;
  adresse: string;
  gps?: string;
  photos?: string[];
  branche: string;
  notes: string;
}

export default function LieuxPage() {
  const [lieux, setLieux] = useState<Lieu[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
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

  useEffect(() => {
    const fetchLieux = async () => {
      try {
        const lieuxRef = collection(firestore, 'lieux');
        const snapshot = await getDocs(lieuxRef);
        const lieuxData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Lieu));
        setLieux(lieuxData);
      } catch (error) {
        console.error('Error fetching lieux:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLieux();
  }, [firestore]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Lieux</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un lieu
          </Button>
        </div>

        <div className="grid gap-6">
          {lieux.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">Aucun lieu enregistré pour le moment.</p>
              </CardContent>
            </Card>
          ) : (
            lieux.map((lieu) => (
              <Card key={lieu.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    {lieu.adresse}
                  </CardTitle>
                  <CardDescription>Branche : {lieu.branche}</CardDescription>
                </CardHeader>
                <CardContent>
                  {lieu.gps && (
                    <p className="text-sm text-muted-foreground mb-2">
                      GPS : {lieu.gps}
                    </p>
                  )}
                  {lieu.notes && (
                    <p className="text-sm mb-4">
                      Notes : {lieu.notes}
                    </p>
                  )}
                  {lieu.photos && lieu.photos.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {lieu.photos.map((photo, index) => (
                        <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">Photo {index + 1}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}