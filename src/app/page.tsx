import { AuthForm } from "@/components/auth-form";
import { Leaf } from "lucide-react";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-8 left-8 flex items-center gap-2 text-lg font-bold text-primary">
        <Leaf className="h-6 w-6" />
        <span className="font-headline">AuthZen</span>
      </div>
      <AuthForm />
    </main>
  );
}
