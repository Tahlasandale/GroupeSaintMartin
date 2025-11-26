'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFirestore } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Shuffle, Clock, Users, Zap } from 'lucide-react';

interface Jeu {
  id: string;
  titre: string;
  description: string;
  duree: string;
  materiel: string;
  deroule: string;
  energie: string;
  categorie: string;
}

export default function JeuxVeilleePage() {
  const [jeux, setJeux] = useState<Jeu[]>([]);
  const [filteredJeux, setFilteredJeux] = useState<Jeu[]>([]);
  const [categorieFilter, setCategorieFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    const fetchJeux = async () => {
      try {
        const jeuxRef = collection(firestore, 'jeux-veillee');
        const snapshot = await getDocs(jeuxRef);
        const jeuxData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Jeu));
        setJeux(jeuxData);
        setFilteredJeux(jeuxData);
      } catch (error) {
        console.error('Error fetching jeux:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJeux();
  }, [firestore]);

  useEffect(() => {
    if (categorieFilter === 'all') {
      setFilteredJeux(jeux);
    } else {
      setFilteredJeux(jeux.filter(jeu => jeu.categorie === categorieFilter));
    }
  }, [jeux, categorieFilter]);

  const getRandomJeu = () => {
    if (filteredJeux.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredJeux.length);
      // Could scroll to or highlight the random jeu
      console.log('Jeu aléatoire:', filteredJeux[randomIndex].titre);
    }
  };

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
          <h1 className="text-4xl font-bold">Jeux de Veillée</h1>
          <Button onClick={getRandomJeu} variant="outline">
            <Shuffle className="mr-2 h-4 w-4" />
            Jeu Aléatoire
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={categorieFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategorieFilter('all')}
          >
            Tous
          </Button>
          <Button
            variant={categorieFilter === 'calme' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategorieFilter('calme')}
          >
            Calme
          </Button>
          <Button
            variant={categorieFilter === 'dynamique' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategorieFilter('dynamique')}
          >
            Dynamique
          </Button>
          <Button
            variant={categorieFilter === 'hilarant' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategorieFilter('hilarant')}
          >
            Hilarant
          </Button>
        </div>

        <div className="grid gap-6">
          {filteredJeux.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">Aucun jeu trouvé.</p>
              </CardContent>
            </Card>
          ) : (
            filteredJeux.map((jeu) => (
              <Card key={jeu.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{jeu.titre}</CardTitle>
                      <CardDescription>{jeu.description}</CardDescription>
                    </div>
                    <Badge variant="secondary">{jeu.categorie}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4" />
                      Durée : {jeu.duree}
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4" />
                      Matériel : {jeu.materiel}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Déroulé :</h4>
                    <p className="text-sm text-muted-foreground">{jeu.deroule}</p>
                  </div>
                  <div className="flex items-center text-sm">
                    <Zap className="mr-2 h-4 w-4" />
                    Énergie : {jeu.energie}
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