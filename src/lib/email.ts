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
  const verifiedSender = process.env.SENDGRID_VERIFIED_EMAIL || 'humbartdev@proton.me';

  if (!process.env.SENDGRID_API_KEY) {
    console.error('SendGrid API Key is not configured. Skipping email.');
    // In a real app, you might want to throw an error or handle this more gracefully.
    // For local dev, we can simulate a success without sending.
    if (process.env.NODE_ENV !== 'production') {
      console.log(`SIMULATED EMAIL:
      To: ${to}
      From: ${verifiedSender}
      Subject: ${subject}
      Body: ${text}`);
      return;
    }
    throw new Error('Email configuration is missing.');
  }

  const msg = {
    to,
    from: verifiedSender,
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
