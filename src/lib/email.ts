'use server';
import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn('SENDGRID_API_KEY not found in environment variables. Email sending will be disabled.');
}

type MailOptions = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export async function sendEmail({ to, subject, text, html }: MailOptions) {
  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_VERIFIED_EMAIL) {
    console.error('SendGrid API Key or Verified Email is not configured. Skipping email.');
    // In a real app, you might want to throw an error or handle this more gracefully.
    return;
  }

  const msg = {
    to,
    from: process.env.SENDGRID_VERIFIED_EMAIL,
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    // Depending on the use case, you might want to re-throw the error
    // to let the calling function know that the email failed to send.
    throw new Error('Failed to send email.');
  }
}
