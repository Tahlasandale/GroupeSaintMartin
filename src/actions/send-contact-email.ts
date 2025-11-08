'use server';

import { z } from 'zod';
import { sendEmail } from '@/lib/email';
import { getAdminApp } from '@/firebase/admin';

const contactFormSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  message: z.string(),
});

const RECIPIENT_EMAIL = 'ziduweuliqui-7545@yopmail.com';

export async function sendContactEmail(formData: unknown) {
  const parsedData = contactFormSchema.safeParse(formData);

  if (!parsedData.success) {
    const errorMessage = 'Invalid form data: ' + parsedData.error.flatten().fieldErrors;
    return { success: false, error: errorMessage };
  }

  const { fullName, email, message } = parsedData.data;

  // 1. Save to Firestore using the Admin SDK
  try {
    const firestore = (await getAdminApp()).firestore();
    const submissionData = {
      fullName,
      email,
      message,
      createdAt: new Date().toISOString(),
    };
    await firestore.collection('contact-submissions').add(submissionData);
  } catch (dbError: any) {
    console.error('Firestore Admin SDK Error:', dbError);
    const errorMessage = `Database error: ${dbError.message}`;
    return { success: false, error: errorMessage };
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
  } catch (emailError: any) {
      console.error('Email Sending Error:', emailError);
      return { success: false, error: `Email sending error: ${emailError.message}` };
  }

  return { success: true };
}
