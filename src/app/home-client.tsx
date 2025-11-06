'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export default function HomeClient() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // S'assurer que le code s'exécute uniquement côté client
    if (typeof window !== 'undefined') {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/auth/signin');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button 
        size="lg" 
        className="text-lg px-8 flex items-center" 
        onClick={handleGetStarted}
      >
        {user ? 'Accéder au tableau de bord' : 'Commencer maintenant'}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      <Button variant="outline" size="lg" className="text-lg px-8">
        En savoir plus
      </Button>
    </div>
  );
}
