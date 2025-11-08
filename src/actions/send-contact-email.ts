'use server';

import { z } from 'zod';
import { sendEmail } from '@/lib/email';
import { initializeFirebase } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

const contactFormSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  message: z.string(),
});

const RECIPIENT_EMAIL = 'ziduweuliqui-7545@yopmail.com';

export async function sendContactEmail(formData: unknown) {
  const parsedData = contactFormSchema.safeParse(formData);

  if (!parsedData.success) {
    console.error('Invalid form data:', parsedData.error);
    return { success: false, error: 'Invalid form data.' };
  }

  const { fullName, email, message } = parsedData.data;

  try {
    // 1. Save to Firestore
    try {
      const { firestore } = initializeFirebase();
      const submissionData = {
        fullName,
        email,
        message,
        createdAt: new Date().toISOString(),
      };
      const submissionsCollection = collection(firestore, 'contact-submissions');
      await addDoc(submissionsCollection, submissionData);
      console.log('Contact submission saved to Firestore.');
    } catch (dbError) {
      console.error('Firestore error while saving contact submission:', dbError);
      // We can decide if we still want to send the email even if DB save fails.
      // For now, we'll throw to be caught by the outer catch block.
      throw new Error('Failed to save submission to database.');
    }

    // 2. Send email
    try {
      await sendEmail({
        to: RECIPIENT_EMAIL,
        subject: `New Contact Form Submission from ${fullName}`,
        text: `You have a new message from:\nName: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr>
          <h4>Message:</h4>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });
       console.log('Contact email sent successfully.');
    } catch (emailError) {
        console.error('SendGrid error while sending email:', emailError);
        throw new Error('Failed to send contact email.');
    }


    return { success: true };
  } catch (error) {
    console.error('Failed to process the submission:', error);
    // This will now catch more specific errors from the inner try/catch blocks
    return { success: false, error: 'Failed to process the submission.' };
  }
}
