'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowLeft, Music, Check } from 'lucide-react';

interface Chant {
  id: string;
  titre: string;
  paroles: string;
  branche: string;
  ambiance: string;
}

export default function ChantDetailPage() {
  const [chant, setChant] = useState<Chant | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const firestore = useFirestore();
  const router = useRouter();

  useEffect(() => {
    const fetchChant = async () => {
      if (!id || typeof id !== 'string') return;

      try {
        const chantRef = doc(firestore, 'chants', id);
        const chantSnap = await getDoc(chantRef);

        if (chantSnap.exists()) {
          setChant({
            id: chantSnap.id,
            ...chantSnap.data()
          } as Chant);
        } else {
          // Chant not found, redirect to main page
          router.push('/carnet-chants');
        }
      } catch (error) {
        console.error('Error fetching chant:', error);
        router.push('/carnet-chants');
      } finally {
        setLoading(false);
      }
    };

    fetchChant();
  }, [id, firestore, router]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  if (!chant) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="text-center">Chant non trouvé</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.push('/carnet-chants')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au Carnet de Chants
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Music className="mr-3 h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-3xl mb-3">{chant.titre}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {chant.branche}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      {chant.ambiance}
                    </span>
                    {chant.validated && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <Check className="w-4 h-4 mr-1" />
                        Validé
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-4 text-lg">Paroles</h3>
              <div className="whitespace-pre-line text-lg leading-relaxed font-mono">
                {chant.paroles}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}