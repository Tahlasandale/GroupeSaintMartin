'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection } from 'firebase/firestore';

const preRegistrationSchema = z.object({
  email: z.string().email({ message: 'Adresse e-mail invalide.' }),
});

export default function PreRegistrationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm({
    resolver: zodResolver(preRegistrationSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof preRegistrationSchema>) => {
    setIsLoading(true);
    try {
      const preRegistrationsRef = collection(firestore, 'pre-registrations');
      await addDocumentNonBlocking(preRegistrationsRef, {
        email: values.email,
        createdAt: new Date().toISOString(),
      });
      setIsSubmitted(true);
      toast({
        title: 'Inscription réussie !',
        description: 'Merci pour votre intérêt. Nous vous tiendrons informé.',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Une erreur est survenue',
        description: "Nous n'avons pas pu enregistrer votre e-mail. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center py-12 px-4 md:px-6">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Rejoignez notre liste d'attente</CardTitle>
          <CardDescription className="pt-2">
            Soyez le premier informé du lancement de notre application révolutionnaire ! Promesses, bla bla, vous allez adorer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="text-center text-lg font-medium text-primary">
              <p>Merci ! Votre e-mail a bien été enregistré.</p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse e-mail</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="votre.email@example.com"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Me pré-inscrire
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
