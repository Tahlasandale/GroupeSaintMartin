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
  const verifiedSender = process.env.SENDGRID_VERIFIED_EMAIL;

  if (!process.env.SENDGRID_API_KEY || !verifiedSender) {
    console.error('SendGrid API Key or Verified Email is not configured.');
    // En production, nous devrions lever une erreur pour indiquer un problème de configuration.
    if (process.env.NODE_ENV === 'production') {
        throw new Error('Email service is not configured.');
    }
    // En développement, simuler l'envoi pour ne pas bloquer.
    console.log(`
    ====================
    📧 SIMULATED EMAIL (Sending Disabled) 📧
    To: ${to}
    From: ${verifiedSender || 'not-configured@example.com'}
    Subject: ${subject}
    --------------------
    Body (HTML): ${html}
    ====================
    `);
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
    // En cas d'erreur réelle de l'API, nous la propageons pour que l'appelant puisse la gérer.
    throw new Error('Failed to send email via SendGrid.');
  }
}
