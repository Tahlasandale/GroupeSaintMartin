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
import { sendEmail } from '@/lib/email';

const preRegistrationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
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
      
      // Send confirmation email
      await sendEmail({
        to: values.email,
        subject: 'Thank you for pre-registering!',
        text: 'You are on the list! We will notify you when we launch.',
        html: '<strong>You are on the list!</strong> We will notify you when we launch.',
      });

      setIsSubmitted(true);
      toast({
        title: 'Registration successful!',
        description: 'Thank you for your interest. We have sent you a confirmation email.',
      });
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error && error.message === 'Failed to send email'
        ? 'We could not send a confirmation email.'
        : 'We could not save your email. Please try again.';

      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center py-12 px-4 md:px-6">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Join our waiting list</CardTitle>
          <CardDescription className="pt-2">
            Be the first to know when our revolutionary app launches! Promises, blah blah, you'll love it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="text-center text-lg font-medium text-primary">
              <p>Thank you! Your email has been successfully registered.</p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
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
                  Pre-register
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
