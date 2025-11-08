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
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { sendReplyEmail } from '@/actions/send-reply-email';

const replySchema = z.object({
  subject: z.string().min(2, 'Subject must be at least 2 characters.'),
  body: z.string().min(10, 'Message must be at least 10 characters.'),
});

type ReplyFormValues = z.infer<typeof replySchema>;

interface ReplyFormProps {
  recipientEmail: string;
  originalMessage?: string;
  onReplySent?: () => void;
}

export function ReplyForm({ recipientEmail, originalMessage, onReplySent }: ReplyFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const quotedMessage = originalMessage 
    ? `\n\n--- Original Message ---\n${originalMessage}`
    : '';

  const form = useForm<ReplyFormValues>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      subject: 'Re: Your contact form submission',
      body: '',
    },
  });

  const onSubmit = async (values: ReplyFormValues) => {
    setIsLoading(true);
    try {
      const result = await sendReplyEmail({
        to: recipientEmail,
        subject: values.subject,
        body: values.body + quotedMessage,
      });

      if (result.success) {
        toast({
          title: 'Reply Sent!',
          description: `Your message has been sent to ${recipientEmail}.`,
        });
        form.reset();
        onReplySent?.();
      } else {
        toast({
          variant: 'destructive',
          title: 'Email Sending Error',
          description: result.error,
        });
      }
    } catch (error) {
      console.error("Error sending reply: ", error);
      toast({
        variant: 'destructive',
        title: 'An unexpected error occurred',
        description: 'Could not send your reply. Please try again.',
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
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Re: Your message" {...field} />
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
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your reply here..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Reply
        </Button>
      </form>
    </Form>
  );
}
