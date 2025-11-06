// Types pour les emails
export interface EmailUser {
  email: string;
  name?: string;
  displayName?: string;
}

export interface EmailTemplate {
  to: string | string[];
  from: string;
  subject: string;
  html: string;
  text?: string;
  templateId?: string;
  dynamicData?: Record<string, any>;
}

export interface EmailConfig {
  provider: 'sendgrid' | 'postmark' | 'nodemailer';
  apiKey?: string;
  fromEmail: string;
  fromName: string;
  smtpConfig?: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
}

// Templates d'emails
export class EmailTemplates {
  static welcome(user: EmailUser): EmailTemplate {
    const { email, name = email } = user;
    
    return {
      to: email,
      from: 'noreply@monapp.com',
      subject: 'Bienvenue sur MonApp !',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenue sur MonApp</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4f46e5; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9fafb; }
            .button { display: inline-block; padding: 12px 24px; background: #4f46e5; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Bienvenue sur MonApp !</h1>
            </div>
            <div class="content">
              <p>Bonjour ${name},</p>
              <p>Nous sommes ravis de vous accueillir sur MonApp ! Votre compte a été créé avec succès.</p>
              <p>Pour commencer, nous vous invitons à confirmer votre adresse email en cliquant sur le bouton ci-dessous :</p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${this.generateToken(email)}" class="button">
                Confirmer mon email
              </a>
              <p>Si le bouton ne fonctionne pas, vous pouvez copier-coller ce lien dans votre navigateur :</p>
              <p>${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${this.generateToken(email)}</p>
              <p>À bientôt sur MonApp !</p>
            </div>
            <div class="footer">
              <p>Cet email a été envoyé automatiquement. Ne répondez pas à cet email.</p>
              <p>© ${new Date().getFullYear()} MonApp. Tous droits réservés.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Bienvenue sur MonApp !
        
        Bonjour ${name},
        
        Nous sommes ravis de vous accueillir sur MonApp ! Votre compte a été créé avec succès.
        
        Pour commencer, veuillez confirmer votre adresse email :
        ${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${this.generateToken(email)}
        
        À bientôt sur MonApp !
        
        © ${new Date().getFullYear()} MonApp. Tous droits réservés.
      `
    };
  }

  static passwordReset(user: EmailUser, resetToken: string): EmailTemplate {
    const { email, name = email } = user;
    
    return {
      to: email,
      from: 'noreply@monapp.com',
      subject: 'Réinitialisation de votre mot de passe',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Réinitialisation du mot de passe</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9fafb; }
            .button { display: inline-block; padding: 12px 24px; background: #dc2626; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
            .warning { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Réinitialisation du mot de passe</h1>
            </div>
            <div class="content">
              <p>Bonjour ${name},</p>
              <p>Vous avez demandé la réinitialisation de votre mot de passe pour votre compte MonApp.</p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}" class="button">
                Réinitialiser mon mot de passe
              </a>
              <div class="warning">
                <p><strong>Important :</strong></p>
                <p>Ce lien expirera dans 1 heure. Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.</p>
              </div>
              <p>Si le bouton ne fonctionne pas, vous pouvez copier-coller ce lien dans votre navigateur :</p>
              <p>${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}</p>
            </div>
            <div class="footer">
              <p>Cet email a été envoyé automatiquement. Ne répondez pas à cet email.</p>
              <p>© ${new Date().getFullYear()} MonApp. Tous droits réservés.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Réinitialisation du mot de passe
        
        Bonjour ${name},
        
        Vous avez demandé la réinitialisation de votre mot de passe pour votre compte MonApp.
        
        Cliquez sur ce lien pour réinitialiser votre mot de passe :
        ${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}
        
        Important : Ce lien expirera dans 1 heure. Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.
        
        © ${new Date().getFullYear()} MonApp. Tous droits réservés.
      `
    };
  }

  static emailVerification(user: EmailUser, verifyToken: string): EmailTemplate {
    const { email, name = email } = user;
    
    return {
      to: email,
      from: 'noreply@monapp.com',
      subject: 'Vérifiez votre adresse email',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Vérification de l'email</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #059669; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9fafb; }
            .button { display: inline-block; padding: 12px 24px; background: #059669; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Vérifiez votre adresse email</h1>
            </div>
            <div class="content">
              <p>Bonjour ${name},</p>
              <p>Merci de vous être inscrit sur MonApp ! Pour finaliser votre inscription, veuillez vérifier votre adresse email en cliquant sur le bouton ci-dessous :</p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verifyToken}" class="button">
                Vérifier mon email
              </a>
              <p>Si le bouton ne fonctionne pas, vous pouvez copier-coller ce lien dans votre navigateur :</p>
              <p>${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verifyToken}</p>
              <p>Ce lien expirera dans 24 heures.</p>
            </div>
            <div class="footer">
              <p>Cet email a été envoyé automatiquement. Ne répondez pas à cet email.</p>
              <p>© ${new Date().getFullYear()} MonApp. Tous droits réservés.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Vérifiez votre adresse email
        
        Bonjour ${name},
        
        Merci de vous être inscrit sur MonApp ! Pour finaliser votre inscription, veuillez vérifier votre adresse email :
        ${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verifyToken}
        
        Ce lien expirera dans 24 heures.
        
        © ${new Date().getFullYear()} MonApp. Tous droits réservés.
      `
    };
  }

  private static generateToken(email: string): string {
    // Simuler la génération de token
    return Buffer.from(`${email}:${Date.now()}`).toString('base64');
  }
}

// Service d'envoi d'emails
export class EmailService {
  private config: EmailConfig;

  constructor(config: EmailConfig) {
    this.config = config;
  }

  async sendEmail(template: EmailTemplate): Promise<{ success: boolean; error?: string }> {
    try {
      switch (this.config.provider) {
        case 'sendgrid':
          return await this.sendWithSendGrid(template);
        case 'postmark':
          return await this.sendWithPostmark(template);
        case 'nodemailer':
          return await this.sendWithNodemailer(template);
        default:
          throw new Error('Provider non supporté');
      }
    } catch (error) {
      console.error('Erreur envoi email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  private async sendWithSendGrid(template: EmailTemplate): Promise<{ success: boolean; error?: string }> {
    // Importer SendGrid uniquement côté serveur
    if (typeof window !== 'undefined') {
      throw new Error('SendGrid ne fonctionne que côté serveur');
    }

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(this.config.apiKey!);

    const msg = {
      to: template.to,
      from: {
        email: this.config.fromEmail,
        name: this.config.fromName,
      },
      subject: template.subject,
      html: template.html,
      text: template.text,
    };

    try {
      await sgMail.send(msg);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.body?.errors?.[0]?.message || error.message
      };
    }
  }

  private async sendWithPostmark(template: EmailTemplate): Promise<{ success: boolean; error?: string }> {
    // Importer Postmark uniquement côté serveur
    if (typeof window !== 'undefined') {
      throw new Error('Postmark ne fonctionne que côté serveur');
    }

    const postmark = require('postmark');
    const client = new postmark.ServerClient(this.config.apiKey!);

    try {
      await client.sendEmail({
        From: `${this.config.fromName} <${this.config.fromEmail}>`,
        To: Array.isArray(template.to) ? template.to.join(', ') : template.to,
        Subject: template.subject,
        HtmlBody: template.html,
        TextBody: template.text,
      });
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Erreur Postmark'
      };
    }
  }

  private async sendWithNodemailer(template: EmailTemplate): Promise<{ success: boolean; error?: string }> {
    // Importer Nodemailer uniquement côté serveur
    if (typeof window !== 'undefined') {
      throw new Error('Nodemailer ne fonctionne que côté serveur');
    }

    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransporter(this.config.smtpConfig!);

    try {
      await transporter.sendMail({
        from: `${this.config.fromName} <${this.config.fromEmail}>`,
        to: template.to,
        subject: template.subject,
        html: template.html,
        text: template.text,
      });
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Erreur SMTP'
      };
    }
  }

  // Méthodes utilitaires
  async sendWelcomeEmail(user: EmailUser): Promise<{ success: boolean; error?: string }> {
    const template = EmailTemplates.welcome(user);
    return this.sendEmail(template);
  }

  async sendPasswordResetEmail(user: EmailUser, resetToken: string): Promise<{ success: boolean; error?: string }> {
    const template = EmailTemplates.passwordReset(user, resetToken);
    return this.sendEmail(template);
  }

  async sendEmailVerification(user: EmailUser, verifyToken: string): Promise<{ success: boolean; error?: string }> {
    const template = EmailTemplates.emailVerification(user, verifyToken);
    return this.sendEmail(template);
  }
}

// Configuration par défaut
export const defaultEmailConfig: EmailConfig = {
  provider: 'sendgrid', // ou 'postmark' ou 'nodemailer'
  apiKey: process.env.SENDGRID_API_KEY || process.env.POSTMARK_API_KEY,
  fromEmail: 'noreply@monapp.com',
  fromName: 'MonApp',
  smtpConfig: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  },
};

// Instance par défaut
export const emailService = new EmailService(defaultEmailConfig);