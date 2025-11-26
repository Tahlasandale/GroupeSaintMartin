'use client';

import { useEffect, useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { sendContactEmail } from '@/actions/send-contact-email';
import { useFirestore } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection } from 'firebase/firestore';

const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Le nom complet doit contenir au moins 2 caractères.' }),
  email: z.string().email({ message: 'Veuillez saisir une adresse email valide.' }),
  subject: z.string().min(5, { message: 'Le sujet doit contenir au moins 5 caractères.' }),
  message: z.string().min(10, { message: 'Le message doit contenir au moins 10 caractères.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  initialSubject?: string;
  onFormSubmit?: () => void;
}

export function ContactForm({ initialSubject = '', onFormSubmit }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      subject: initialSubject,
      message: '',
    },
  });

  useEffect(() => {
    form.reset({
      fullName: '',
      email: '',
      subject: initialSubject,
      message: '',
    });
  }, [initialSubject, form]);

  const onSubmit = async (values: ContactFormValues) => {
    setIsLoading(true);

    try {
      // 1. Save to Firestore from the client
      const submissionsRef = collection(firestore, 'contact-submissions');
      await addDocumentNonBlocking(submissionsRef, {
        ...values,
        createdAt: new Date().toISOString(),
        read: false,
        processed: false,
      });

      // 2. Send email via server action
      const result = await sendContactEmail(values);

      if (result.success) {
        toast({
          title: 'Message envoyé !',
          description: 'Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.',
        });
        form.reset();
        onFormSubmit?.();
      } else {
        // If email sending fails, inform the user but the data is still saved.
        toast({
          variant: 'destructive',
          title: 'Erreur d\'envoi d\'email',
          description: result.error || 'Votre message a été sauvegardé, mais nous n\'avons pas pu envoyer la notification par email.',
        });
      }
    } catch (error) {
      // This will catch errors from writing to Firestore
      console.error("Error saving contact submission: ", error);
      toast({
        variant: 'destructive',
        title: 'Erreur de soumission',
        description: 'Impossible de sauvegarder votre message. Vérifiez votre connexion et réessayez.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom complet</FormLabel>
              <FormControl>
                <Input placeholder="Jean Dupont" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="jean.dupont@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sujet</FormLabel>
              <FormControl>
                <Input placeholder="Concernant..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Votre message ici..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Envoyer le message
        </Button>
      </form>
    </Form>
  );
}
