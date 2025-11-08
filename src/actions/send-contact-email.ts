'use server';

import { z } from 'zod';
import { sendEmail } from '@/lib/email';

const contactFormSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  message: z.string(),
});

const RECIPIENT_EMAIL = 'alt.s2-cob4i0xv@yopmail.fr';

export async function sendContactEmail(formData: unknown) {
  const parsedData = contactFormSchema.safeParse(formData);

  if (!parsedData.success) {
    return { success: false, error: 'Invalid form data.' };
  }

  const { fullName, email, message } = parsedData.data;

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

    return { success: true };
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return { success: false, error: 'Failed to send the email.' };
  }
}
