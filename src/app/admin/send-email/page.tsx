'use client';

import { useState, useEffect } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useMemoFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { doc, getDocs, collection, Firestore } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Leaf, Loader2 } from 'lucide-react';
import { sendEmail } from '@/lib/email';
import { useDoc } from '@/firebase';

const emailSchema = z.object({
  subject: z.string().min(1, { message: 'Subject is required.' }),
  body: z.string().min(1, { message: 'Body is required.' }),
});

async function getPreRegisteredEmails(db: Firestore): Promise<string[]> {
  const preRegistrationsRef = collection(db, 'pre-registrations');
  try {
    const querySnapshot = await getDocs(preRegistrationsRef);
    return querySnapshot.docs.map((doc) => doc.data().email);
  } catch (error: any) {
    const permissionError = new FirestorePermissionError({
        path: preRegistrationsRef.path,
        operation: 'list',
    });
    errorEmitter.emit('permission-error', permissionError);
    // Re-throw the original error to notify the caller of the failure.
    throw error;
  }
}

export default function SendEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  // Admin access check
  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [user, firestore]
  );
  const { data: userData, isLoading: isUserDataLoading } = useDoc(userDocRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }

    if (!isUserDataLoading && userData) {
      if (!(userData as any).isAdmin) {
        router.push('/dashboard');
      }
    }
  }, [user, isUserLoading, userData, isUserDataLoading, router]);

  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      subject: '',
      body: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof emailSchema>) => {
    setIsLoading(true);
    try {
      const emails = await getPreRegisteredEmails(firestore);

      if (emails.length === 0) {
        toast({
          title: 'No emails to send',
          description: 'There are no users in the pre-registration list.',
        });
        setIsLoading(false);
        return;
      }

      // We send emails one by one. For a very large list, this should be a backend job.
      for (const email of emails) {
        await sendEmail({
          to: email,
          subject: values.subject,
          text: values.body,
          html: `<p>${values.body.replace(/\n/g, '<br>')}</p>`,
        });
      }

      toast({
        title: 'Emails sent successfully!',
        description: `Sent to ${emails.length} pre-registered users.`,
      });
      form.reset();

    } catch (error) {
      // The contextual error is already emitted by getPreRegisteredEmails.
      // We only show a generic toast here.
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Could not fetch pre-registration emails. Please check permissions.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isUserLoading || isUserDataLoading || !userData || !(userData as any).isAdmin) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Leaf className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Send Email to Pre-registrations</CardTitle>
          <CardDescription>
            Compose and send an email to all users on the waiting list.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Announcing our launch!" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Body</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Hello everyone, we are excited to announce..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Email
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
