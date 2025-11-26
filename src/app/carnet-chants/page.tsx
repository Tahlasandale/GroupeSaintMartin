'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFirestore } from '@/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Music, Play } from 'lucide-react';

interface Chant {
  id: string;
  titre: string;
  paroles: string;
  accords?: string;
  audio?: string;
  video?: string;
  branche: string;
  ambiance: string;
}

export default function CarnetChantsPage() {
  const [chants, setChants] = useState<Chant[]>([]);
  const [filteredChants, setFilteredChants] = useState<Chant[]>([]);
  const [brancheFilter, setBrancheFilter] = useState<string>('all');
  const [ambianceFilter, setAmbianceFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    const fetchChants = async () => {
      try {
        const chantsRef = collection(firestore, 'chants');
        const snapshot = await getDocs(chantsRef);
        const chantsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Chant));
        setChants(chantsData);
        setFilteredChants(chantsData);
      } catch (error) {
        console.error('Error fetching chants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChants();
  }, [firestore]);

  useEffect(() => {
    let filtered = chants;

    if (brancheFilter !== 'all') {
      filtered = filtered.filter(chant => chant.branche === brancheFilter);
    }

    if (ambianceFilter !== 'all') {
      filtered = filtered.filter(chant => chant.ambiance === ambianceFilter);
    }

    setFilteredChants(filtered);
  }, [chants, brancheFilter, ambianceFilter]);

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
        <h1 className="text-4xl font-bold mb-8">Carnet de Chants</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select value={brancheFilter} onValueChange={setBrancheFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filtrer par branche" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les branches</SelectItem>
              <SelectItem value="LL">LL</SelectItem>
              <SelectItem value="SG">SG</SelectItem>
              <SelectItem value="RGA">RGA</SelectItem>
            </SelectContent>
          </Select>

          <Select value={ambianceFilter} onValueChange={setAmbianceFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filtrer par ambiance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les ambiances</SelectItem>
              <SelectItem value="marche">Marche</SelectItem>
              <SelectItem value="veillee">Veillée</SelectItem>
              <SelectItem value="priere">Prière</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6">
          {filteredChants.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">Aucun chant trouvé.</p>
              </CardContent>
            </Card>
          ) : (
            filteredChants.map((chant) => (
              <Card key={chant.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Music className="mr-2 h-5 w-5" />
                    {chant.titre}
                  </CardTitle>
                  <CardDescription>
                    {chant.branche} • {chant.ambiance}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-line text-sm mb-4">
                    {chant.paroles}
                  </div>
                  {chant.accords && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">Accords :</h4>
                      <p className="text-sm text-muted-foreground">{chant.accords}</p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    {chant.audio && (
                      <Button variant="outline" size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        Audio
                      </Button>
                    )}
                    {chant.video && (
                      <Button variant="outline" size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        Vidéo
                      </Button>
                    )}
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