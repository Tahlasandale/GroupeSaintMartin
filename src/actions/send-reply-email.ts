'use server';

import { z } from 'zod';
import { sendEmail } from '@/lib/email';

const replySchema = z.object({
  to: z.string().email(),
  subject: z.string(),
  body: z.string(),
});

export async function sendReplyEmail(formData: unknown) {
  const parsedData = replySchema.safeParse(formData);

  if (!parsedData.success) {
    const errorMessage = 'Invalid form data: ' + parsedData.error.flatten().fieldErrors;
    return { success: false, error: errorMessage };
  }

  const { to, subject, body } = parsedData.data;

  try {
    await sendEmail({
      to: to,
      subject: subject,
      text: body,
      html: `<p>${body.replace(/\n/g, '<br>')}</p>`,
    });
    return { success: true };
  } catch (emailError: any) {
    console.error('Reply Email Sending Error:', emailError);
    return { success: false, error: `Email sending error: ${emailError.message}` };
  }
}
