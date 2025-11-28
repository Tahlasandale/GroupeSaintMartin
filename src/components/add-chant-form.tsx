'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useFirestore, useUser } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection, doc, updateDoc } from 'firebase/firestore';

const chantSchema = z.object({
  titre: z.string().min(3, { message: 'Le titre doit contenir au moins 3 caractères.' }),
  paroles: z.string().min(10, { message: 'Les paroles doivent contenir au moins 10 caractères.' }),
  branche: z.enum(['LL', 'SG', 'RGA'], { message: 'Veuillez sélectionner une branche.' }),
  ambiance: z.enum(['marche', 'veillée', 'prière'], { message: 'Veuillez sélectionner une ambiance.' }),
});

type ChantFormValues = z.infer<typeof chantSchema>;

interface AddChantFormProps {
  onSuccess?: () => void;
  initialValues?: Partial<ChantFormValues>;
  chantId?: string;
}

export function AddChantForm({ onSuccess, initialValues, chantId }: AddChantFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();

  const form = useForm<ChantFormValues>({
    resolver: zodResolver(chantSchema),
    defaultValues: {
      titre: initialValues?.titre || '',
      paroles: initialValues?.paroles || '',
      branche: initialValues?.branche || 'LL',
      ambiance: initialValues?.ambiance || 'veillée',
    },
  });

  const onSubmit = async (values: ChantFormValues) => {
    setIsLoading(true);

    try {
      if (chantId) {
        // Edit mode
        const chantRef = doc(firestore, 'chants', chantId);
        await updateDoc(chantRef, values);

        toast({
          title: 'Chant modifié !',
          description: 'Le chant a été modifié avec succès.',
        });
      } else {
        // Add mode
        const chantsRef = collection(firestore, 'chants');
        await addDocumentNonBlocking(chantsRef, {
          ...values,
          createdAt: new Date().toISOString(),
          createdBy: user?.uid,
          validated: false,
        });

        toast({
          title: 'Chant ajouté !',
          description: 'Le chant a été ajouté au Carnet avec succès.',
        });

        form.reset();
      }

      onSuccess?.();
    } catch (error) {
      console.error('Error saving chant:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de sauvegarder le chant. Veuillez réessayer.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 py-4">
        <FormField
          control={form.control}
          name="titre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre du chant</FormLabel>
              <FormControl>
                <Input placeholder="Entrez le titre..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="branche"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branche</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une branche" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="LL">Louveteaux / Louvettes</SelectItem>
                    <SelectItem value="SG">Scouts / Guides</SelectItem>
                    <SelectItem value="RGA">Routiers / Guides Aînées</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ambiance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ambiance</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une ambiance" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="marche">Marche</SelectItem>
                    <SelectItem value="veillée">Veillée</SelectItem>
                    <SelectItem value="prière">Prière</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="paroles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paroles</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Entrez les paroles complètes du chant..."
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {chantId ? 'Modifier le chant' : 'Ajouter le chant'}
        </Button>
      </form>
    </Form>
  );
}