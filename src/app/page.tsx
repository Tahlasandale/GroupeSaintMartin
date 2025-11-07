'use client';

import { Leaf, LogIn } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background shadow-sm">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Leaf className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold text-primary font-headline">AuthZen</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Sign In
          </Link>
          <Button asChild>
            <Link href="/login" prefetch={false}>Sign Up</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Secure and Seamless Authentication
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    AuthZen provides a ready-to-use, secure, and beautiful authentication solution for your Next.js applications.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/login" prefetch={false}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                 <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
                  <div className="flex items-center gap-2 text-lg font-bold text-primary">
                    <LogIn className="h-6 w-6" />
                    <span>Easy Authentication</span>
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    Get up and running in minutes with our simple and intuitive authentication flow. Supports email/password and Google sign-in.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center p-6 bg-background border-t">
          <p className="text-sm text-muted-foreground">&copy; 2024 AuthZen. All rights reserved.</p>
      </footer>
    </div>
  );
}
