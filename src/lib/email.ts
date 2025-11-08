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
  console.log('=== DÉBUT ENVOI EMAIL ===');
  console.log('Configuration SendGrid:');
  console.log('- API Key présent:', !!process.env.SENDGRID_API_KEY);
  
  const verifiedSender = process.env.SENDGRID_VERIFIED_EMAIL;
  console.log('- Email vérifié configuré:', verifiedSender);

  if (!process.env.SENDGRID_API_KEY || !verifiedSender) {
    const errorMsg = 'SendGrid API Key or Verified Email is not configured.';
    console.error(errorMsg);
    
    if (process.env.NODE_ENV === 'production') {
        throw new Error('Email service is not configured.');
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

  console.log('\nDétails du message:');
  console.log('- À:', to);
  console.log('- De:', verifiedSender);
  console.log('- Objet:', subject);
  console.log('\nConnexion à SendGrid...');

  try {
    console.log('Envoi du message en cours...');
    const response = await sgMail.send(msg);
    console.log('✅ Email envoyé avec succès à', to);
    console.log('Réponse SendGrid:', response[0].statusCode, response[0].headers);
  } catch (error: any) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:');
    console.error('- Code:', error.code);
    console.error('- Message:', error.message);
    if (error.response) {
      console.error('- Réponse complète:', JSON.stringify(error.response.body, null, 2));
    }
    // En cas d'erreur réelle de l'API, nous la propageons pour que l'appelant puisse la gérer.
    throw new Error('Failed to send email via SendGrid.');
  }
}
