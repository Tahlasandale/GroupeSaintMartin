'use client';

import { useUser, useFirestore, useMemoFirebase, useCollection, useDoc, updateDocumentNonBlocking } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { doc, collection, query, orderBy } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';

import { Leaf, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type ContactSubmission = {
  id: string;
  fullName: string;
  email: string;
  message: string;
  createdAt: string;
  read?: boolean;
  processed?: boolean;
};

export default function AdminContactsPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  // Admin access check
  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [user, firestore]
  );
  const { data: userData, isLoading: isUserDataLoading } = useDoc(userDocRef);

  // Fetch contact submissions
  const contactsQuery = useMemoFirebase(
    () =>
      firestore
        ? query(collection(firestore, 'contact-submissions'), orderBy('createdAt', 'desc'))
        : null,
    [firestore]
  );
  const { data: contacts, isLoading: areContactsLoading, error: contactsError } = useCollection<ContactSubmission>(contactsQuery);

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

  const handleStatusChange = (submissionId: string, field: 'read' | 'processed', value: boolean) => {
    if (!firestore) return;
    const submissionRef = doc(firestore, 'contact-submissions', submissionId);
    updateDocumentNonBlocking(submissionRef, { [field]: value });
  };


  if (isUserLoading || isUserDataLoading || areContactsLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Leaf className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

   if (!userData || !(userData as any).isAdmin) {
     return null; 
   }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
       <Button asChild variant="outline" className="mb-4">
        <Link href="/admin/dashboard">
          &larr; Back to Admin Dashboard
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6" />
            <CardTitle>Contact Form Submissions</CardTitle>
          </div>
          <CardDescription>
            Here are the messages submitted through the contact form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {contactsError && (
              <div className="text-destructive p-4 bg-destructive/10 rounded-md">
                  <p><b>Error loading contacts:</b> {contactsError.message}</p>
                  <p className="mt-2 text-sm">Please ensure your Firestore security rules allow administrators to read the `contact-submissions` collection.</p>
              </div>
          )}
          <TooltipProvider>
            {!contactsError && contacts && contacts.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Date</TableHead>
                    <TableHead className="w-[200px]">From</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead className="text-center w-[80px]">Lu</TableHead>
                    <TableHead className="text-center w-[80px]">Traité</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div className="font-medium">
                          {formatDistanceToNow(new Date(submission.createdAt), { addSuffix: true })}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(submission.createdAt).toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{submission.fullName}</div>
                        <a href={`mailto:${submission.email}`} className="text-sm text-muted-foreground hover:text-primary">
                          {submission.email}
                        </a>
                      </TableCell>
                      <TableCell className="whitespace-pre-wrap">{submission.message}</TableCell>
                      <TableCell className="text-center">
                          <Checkbox
                              checked={submission.read || false}
                              onCheckedChange={(checked) => handleStatusChange(submission.id, 'read', !!checked)}
                              aria-label="Mark as read"
                          />
                      </TableCell>
                      <TableCell className="text-center">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className={!submission.read ? 'cursor-not-allowed' : ''}>
                                    <Checkbox
                                        checked={submission.processed || false}
                                        onCheckedChange={(checked) => handleStatusChange(submission.id, 'processed', !!checked)}
                                        aria-label="Mark as processed"
                                        disabled={!submission.read}
                                    />
                                </span>
                            </TooltipTrigger>
                            {!submission.read && (
                                <TooltipContent>
                                    <p>Vous devez marquer le message comme "Lu" avant de le traiter.</p>
                                </TooltipContent>
                            )}
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
           </TooltipProvider>
           {!contactsError && contacts && contacts.length === 0 && (
              <div className="text-center text-muted-foreground py-12">
                  <p>No contact submissions yet.</p>
              </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
