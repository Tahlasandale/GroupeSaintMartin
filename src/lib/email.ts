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
    const errorMsg = 'Email service is not configured: SendGrid API Key or Verified Email is missing.';
    console.error(errorMsg);
    
    if (process.env.NODE_ENV === 'production') {
        throw new Error(errorMsg);
    }
    
    console.log(`\n    ====================\n    📧 SIMULATED EMAIL (Sending Disabled) 📧\n    To: ${to}\n    From: ${verifiedSender || 'not-configured@example.com'}\n    Subject: ${subject}\n    --------------------\n    Body (HTML): ${html}\n    ====================\n    `);
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
    console.log('Sending email with SendGrid...');
    await sgMail.send(msg);
    console.log('✅ Email sent successfully to', to);
  } catch (error: any) {
    console.error('❌ SendGrid API error:');
    if (error.response) {
      console.error(JSON.stringify(error.response.body, null, 2));
    } else {
      console.error(error.message);
    }
    throw new Error('Failed to send email via SendGrid.');
  }
}
