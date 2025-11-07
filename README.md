# Next.js 15 with Firebase and GenAI Template

A modern web application template built with Next.js 15, Firebase, and Google's GenAI, featuring a complete authentication flow, responsive design, and modern UI components.

## Key Technologies

### Core
- [Next.js 15](https://nextjs.org/) - React framework with App Router and Server Components
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Firebase](https://firebase.google.com/) - Authentication and Firestore database
- [Google GenAI](https://ai.google.dev/) - AI/ML capabilities

### UI & Styling
- [shadcn/ui](https://ui.shadcn.com/) - Radix-based component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [Embla Carousel](https://www.embla-carousel.com/) - Touch-enabled carousel

### State & Forms
- [React Hook Form](https://react-hook-form.com/) - Performant form validation
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [date-fns](https://date-fns.org/) - Date utility library

## Project Structure

```
src/
├── app/                    # App router pages and layouts
│   └── template/           # Template page component
├── components/             # Reusable UI components
├── firebase/               # Firebase configuration and hooks
│   ├── config.ts           # Firebase configuration
│   ├── provider.tsx        # Firebase provider component
│   ├── non-blocking-*.tsx  # Optimized auth flows
│   └── firestore/          # Firestore hooks and utilities
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
└── ai/                     # AI/ML integration
    ├── genkit.ts           # GenAI configuration
    └── dev.ts              # Development utilities
```

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   # Update the values in .env.local
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. For AI development:
   ```bash
   npm run genkit:dev
   ```

## Key Features

- **Authentication**: Complete auth flow with Firebase
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript support
- **Modern UI**: Pre-built, accessible components
- **AI Integration**: Ready for GenAI features
- **Optimized Performance**: Code splitting, lazy loading
