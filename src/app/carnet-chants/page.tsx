'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useFirestore, useUser } from '@/firebase';
import { collection, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';
import { Music, Plus, Search, Edit, Trash2, Check } from 'lucide-react';
import { AddChantForm } from '@/components/add-chant-form';

interface Chant {
  id: string;
  titre: string;
  paroles: string;
  branche: string;
  ambiance: string;
  validated?: boolean;
}

export default function CarnetChantsPage() {
  const [chants, setChants] = useState<Chant[]>([]);
  const [filteredChants, setFilteredChants] = useState<Chant[]>([]);
  const [brancheFilter, setBrancheFilter] = useState<string>('all');
  const [ambianceFilter, setAmbianceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  // Get user document to check admin status
  const userDocRef = useMemo(() =>
    user ? doc(firestore, 'users', user.uid) : null,
    [firestore, user?.uid]
  );
  const { data: userData } = useDoc(userDocRef);
  const isAdmin = userData?.isAdmin === true;

  const handleAddChant = () => {
    if (user) {
      setIsAddModalOpen(true);
    } else {
      router.push('/login');
    }
  };

  const handleAddSuccess = () => {
    setIsAddModalOpen(false);
    // Refresh the chants list
    fetchChants();
  };

  const handleValidateChant = async (chantId: string, validated: boolean) => {
    try {
      const chantRef = doc(firestore, 'chants', chantId);
      await updateDoc(chantRef, { validated });
      fetchChants();
    } catch (error) {
      console.error('Error updating chant validation:', error);
    }
  };

  const handleDeleteChant = async (chantId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce chant ?')) {
      try {
        const chantRef = doc(firestore, 'chants', chantId);
        await deleteDoc(chantRef);
        fetchChants();
      } catch (error) {
        console.error('Error deleting chant:', error);
      }
    }
  };

  const handleEditChant = (chantId: string) => {
    // TODO: Implement edit functionality
    console.log('Edit chant:', chantId);
  };

  const fetchChants = async () => {
    try {
      const chantsRef = collection(firestore, 'chants');
      const snapshot = await getDocs(chantsRef);
      const chantsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Chant)).sort((a, b) => a.titre.localeCompare(b.titre));
      setChants(chantsData);
      setFilteredChants(chantsData);
    } catch (error) {
      console.error('Error fetching chants:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChants();
  }, [firestore]);

  useEffect(() => {
    let filtered = chants;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(chant =>
        chant.titre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply branch filter
    if (brancheFilter !== 'all') {
      filtered = filtered.filter(chant => chant.branche === brancheFilter);
    }

    // Apply ambiance filter
    if (ambianceFilter !== 'all') {
      filtered = filtered.filter(chant => chant.ambiance === ambianceFilter);
    }

    setFilteredChants(filtered);
  }, [chants, searchQuery, brancheFilter, ambianceFilter]);

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
          <h1 className="text-4xl font-bold">Carnet de Chants</h1>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddChant}>
                <Plus className="mr-2 h-4 w-4" />
                {user ? 'Ajouter un chant' : 'Se connecter pour ajouter'}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Ajouter un chant</DialogTitle>
                <DialogDescription>
                  Ajoutez un nouveau chant au Carnet de Chants. Tous les champs sont obligatoires.
                </DialogDescription>
              </DialogHeader>
              <AddChantForm onSuccess={handleAddSuccess} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher un chant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
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
                <SelectItem value="veillée">Veillée</SelectItem>
                <SelectItem value="prière">Prière</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          {filteredChants.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">Aucun chant trouvé.</p>
              </CardContent>
            </Card>
          ) : (
            filteredChants.map((chant) => (
              <div
                key={chant.id}
                className="group flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors relative"
                onClick={() => router.push(`/carnet-chants/${chant.id}`)}
              >
                <div className="flex items-center space-x-3">
                  <Music className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">{chant.titre}</h3>
                    <p className="text-sm text-muted-foreground">
                      {chant.branche} • {chant.ambiance}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isAdmin && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={chant.validated || false}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleValidateChant(chant.id, e.target.checked);
                        }}
                        className="w-4 h-4"
                        title="Marquer comme validé"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditChant(chant.id);
                        }}
                        className="p-1 hover:bg-muted rounded"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteChant(chant.id);
                        }}
                        className="p-1 hover:bg-red-100 text-red-600 rounded"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <div className="text-muted-foreground">
                    →
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}