'use server';

import { z } from 'zod';
import { sendEmail } from '@/lib/email';

const contactFormSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

const RECIPIENT_EMAIL = 'ziduweuliqui-7545@yopmail.com';

export async function sendContactEmail(formData: unknown) {
  const parsedData = contactFormSchema.safeParse(formData);

  if (!parsedData.success) {
    const errorMessage = 'Invalid form data: ' + parsedData.error.flatten().fieldErrors;
    return { success: false, error: errorMessage };
  }

  const { fullName, email, subject, message } = parsedData.data;

  // This server action now ONLY sends the email.
  // The data is saved to Firestore on the client-side.
  try {
    await sendEmail({
      to: RECIPIENT_EMAIL,
      subject: `New Contact: ${subject} from ${fullName}`,
      text: `You have a new message from:\nName: ${fullName}\nEmail: ${email}\n\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject}</p>
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
