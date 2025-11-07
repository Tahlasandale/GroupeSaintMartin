'use server';
import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

type MailOptions = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export async function sendEmail({ to, subject, text, html }: MailOptions): Promise<void> {
  const verifiedSender = process.env.SENDGRID_VERIFIED_EMAIL || 'humbartdev@proton.me';

  if (!process.env.SENDGRID_API_KEY) {
    console.log(`
    ====================
    📧 SIMULATED EMAIL (Sending Disabled) 📧
    To: ${to}
    From: ${verifiedSender}
    Subject: ${subject}
    --------------------
    Body (HTML): ${html}
    ====================
    `);
    // In all environments, if the key is missing, resolve the promise to avoid errors.
    return Promise.resolve();
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
    console.error('Error sending email via SendGrid:', error);
    // In case of a real API error, re-throw to be caught by the caller.
    throw new Error('Failed to send email via SendGrid.');
  }
}
