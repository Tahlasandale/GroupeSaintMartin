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
  console.log('Processing contact submission...');
  const parsedData = contactFormSchema.safeParse(formData);

  if (!parsedData.success) {
    const errorMessage = 'Invalid form data: ' + parsedData.error.flatten().fieldErrors;
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }

  const { fullName, email, message } = parsedData.data;

  // 1. Save to Firestore
  try {
    console.log('Initializing Firebase and preparing to save submission...');
    const { firestore } = initializeFirebase();
    const submissionData = {
      fullName,
      email,
      message,
      createdAt: new Date().toISOString(),
    };
    const submissionsCollection = collection(firestore, 'contact-submissions');
    await addDoc(submissionsCollection, submissionData);
    console.log('Contact submission successfully saved to Firestore.');
  } catch (dbError: any) {
    console.error('Firestore error while saving contact submission:', dbError);
    return { success: false, error: `Database error: ${dbError.message}` };
  }

  // 2. Send email
  try {
    console.log('Preparing to send contact email...');
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
  } catch (emailError: any) {
      console.error('SendGrid error while sending email:', emailError);
      return { success: false, error: `Email sending error: ${emailError.message}` };
  }

  return { success: true };
}
