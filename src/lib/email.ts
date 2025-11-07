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

  // If the SendGrid API key is not set, simulate email sending in non-production environments
  if (!process.env.SENDGRID_API_KEY) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`
      ====================
      📧 SIMULATED EMAIL 📧
      To: ${to}
      From: ${verifiedSender}
      Subject: ${subject}
      --------------------
      Body (HTML): ${html}
      ====================
      `);
      // Return successfully without actually sending an email.
      return;
    } else {
      // In production, throw an error if not configured.
      console.error('CRITICAL: SendGrid API Key is not configured for production environment.');
      throw new Error('Email service is not configured.');
    }
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
    // Let the calling function know that the email failed to send.
    throw new Error('Failed to send email via SendGrid.');
  }
}
