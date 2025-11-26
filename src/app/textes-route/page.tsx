'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFirestore } from '@/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface Texte {
  id: string;
  titre: string;
  contenu: string;
  categorie: string;
  branche: string;
}

export default function TextesRoutePage() {
  const [textes, setTextes] = useState<Texte[]>([]);
  const [filteredTextes, setFilteredTextes] = useState<Texte[]>([]);
  const [categorieFilter, setCategorieFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    const fetchTextes = async () => {
      try {
        const textesRef = collection(firestore, 'textes-route');
        const snapshot = await getDocs(textesRef);
        const textesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Texte));
        setTextes(textesData);
        setFilteredTextes(textesData);
      } catch (error) {
        console.error('Error fetching textes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTextes();
  }, [firestore]);

  useEffect(() => {
    if (categorieFilter === 'all') {
      setFilteredTextes(textes);
    } else {
      setFilteredTextes(textes.filter(texte => texte.categorie === categorieFilter));
    }
  }, [textes, categorieFilter]);

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
        <h1 className="text-4xl font-bold mb-8">Textes de Route / Spiritualité</h1>

        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={categorieFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategorieFilter('all')}
          >
            Tous
          </Button>
          <Button
            variant={categorieFilter === 'priere' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategorieFilter('priere')}
          >
            Prière
          </Button>
          <Button
            variant={categorieFilter === 'route' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategorieFilter('route')}
          >
            Route
          </Button>
          <Button
            variant={categorieFilter === 'service' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategorieFilter('service')}
          >
            Service
          </Button>
          <Button
            variant={categorieFilter === 'fraternite' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategorieFilter('fraternite')}
          >
            Fraternité
          </Button>
        </div>

        <div className="grid gap-6">
          {filteredTextes.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">Aucun texte trouvé.</p>
              </CardContent>
            </Card>
          ) : (
            filteredTextes.map((texte) => (
              <Card key={texte.id}>
                <CardHeader>
                  <CardTitle>{texte.titre}</CardTitle>
                  <CardDescription>
                    {texte.categorie} • {texte.branche}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-line text-sm">
                    {texte.contenu}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}