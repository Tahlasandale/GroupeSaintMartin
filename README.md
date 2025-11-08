# SaaS Template - Next.js 15 + Firebase + GenAI

A comprehensive SaaS application template built with modern technologies to accelerate your SaaS development. Features complete authentication, admin dashboard, contact management, subscription system, and AI integration - everything you need to launch your SaaS product quickly.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Tahlasandale/SaasTemplate.git
cd SaasTemplate

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Configure your Firebase and SendGrid credentials

# Start development server
npm run dev
```

## ✨ Key Features

### 🔐 Authentication & User Management
- **Firebase Authentication** - Email/password and Google OAuth
- **Role-based Access Control** - Admin and user roles
- **Secure User Profiles** - User management with Firestore
- **Session Management** - Persistent authentication state

### 📊 Admin Dashboard
- **Contact Management** - View and respond to user inquiries
- **Email Campaigns** - Send bulk emails to subscribers
- **User Analytics** - Track user engagement and activity
- **Content Management** - Manage application content

### 💰 Subscription System
- **Pricing Tiers** - Free and Pro subscription plans
- **Payment Integration** - Ready for Stripe/Polar.sh integration
- **Feature Gates** - Control access based on subscription level
- **Upgrade Flows** - Seamless subscription management

### 📧 Communication Tools
- **Contact Forms** - User inquiry submission system
- **Email Integration** - SendGrid-powered email delivery
- **Reply Management** - Admin response system
- **Email Templates** - Pre-built email templates

### 🤖 AI Integration
- **Google GenAI** - AI/ML capabilities integration
- **Intelligent Features** - Ready for AI-powered functionality
- **Development Tools** - GenAI development environment

### 🎨 Modern UI/UX
- **Responsive Design** - Mobile-first approach
- **Accessible Components** - WCAG compliant UI components
- **Dark/Light Themes** - Theme switching capability
- **Modern Design System** - Consistent visual language

## 🛠 Tech Stack

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Firebase](https://firebase.google.com/)** - Backend as a Service
- **[Google GenAI](https://ai.google.dev/)** - AI/ML capabilities

### UI & Styling
- **[shadcn/ui](https://ui.shadcn.com/)** - Modern component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible UI primitives
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icon set

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling
- **[Zod](https://zod.dev/)** - Schema validation
- **[date-fns](https://date-fns.org/)** - Date utilities

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Prettier** - Code formatting
- **Turbopack** - Fast development builds

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── admin/                    # Admin dashboard pages
│   │   ├── contacts/            # Contact management
│   │   ├── dashboard/           # Admin overview
│   │   └── send-email/          # Email campaign tools
│   ├── abonnement/              # Subscription pricing page
│   ├── dashboard/               # User dashboard
│   ├── login/                   # Authentication page
│   ├── pre-registration/        # Lead capture form
│   └── template/                # Template demonstration
├── components/                   # Reusable UI components
│   ├── ui/                      # shadcn/ui components
│   ├── layout/                  # Layout components
│   ├── contact-form.tsx         # Contact form component
│   ├── reply-form.tsx           # Reply form component
│   └── auth-form.tsx            # Authentication form
├── actions/                      # Server actions
│   ├── send-contact-email.ts    # Contact email handling
│   └── send-reply-email.ts      # Reply email handling
├── firebase/                     # Firebase integration
│   ├── firestore/               # Firestore hooks and utilities
│   ├── config.ts                # Firebase configuration
│   ├── provider.tsx             # Firebase context provider
│   └── non-blocking-*.tsx       # Optimized operations
├── lib/                         # Utility functions
│   ├── email.ts                 # Email service utilities
│   └── utils.ts                 # General utilities
├── hooks/                       # Custom React hooks
└── ai/                          # AI/ML integration
    ├── genkit.ts                # GenAI configuration
    └── dev.ts                   # Development utilities
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_VERIFIED_EMAIL=your_verified_email@example.com

# Google GenAI (Optional)
GOOGLE_GENAI_API_KEY=your_genai_api_key
```

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication with Email/Password and Google providers
3. Enable Firestore Database
4. Copy your Firebase config to `.env.local`

### SendGrid Setup

1. Create a SendGrid account at [sendgrid.com](https://sendgrid.com)
2. Generate an API key
3. Verify a sender email address
4. Add credentials to `.env.local`

## 🚀 Available Scripts

```bash
# Development
npm run dev              # Start development server (port 9002)
npm run genkit:dev       # Start GenAI development server
npm run genkit:watch     # Start GenAI with watch mode

# Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript type checking
```

## 🎯 Use Cases

This template is perfect for:

- **SaaS Applications** - Build subscription-based software
- **Admin Dashboards** - Create management interfaces
- **Contact Management** - Handle customer inquiries
- **Email Marketing** - Send campaigns and newsletters
- **AI-Powered Apps** - Integrate machine learning features
- **B2B Platforms** - Build business-to-business solutions

## 🔧 Customization

### Adding New Features

1. **Pages**: Add new routes in `src/app/`
2. **Components**: Create reusable components in `src/components/`
3. **API Routes**: Add server actions in `src/actions/`
4. **Database**: Update Firestore rules and schemas

### Styling

- Modify `tailwind.config.ts` for custom themes
- Update `src/app/globals.css` for global styles
- Customize shadcn/ui components in `src/components/ui/`

### Authentication

- Modify user roles in Firestore security rules
- Add new auth providers in Firebase console
- Customize auth flows in `src/components/auth-form.tsx`

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [SendGrid Documentation](https://docs.sendgrid.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Ready to build your SaaS?** This template provides everything you need to get started quickly. Focus on your business logic while we handle the infrastructure! 🚀
