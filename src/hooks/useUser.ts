"use client";

import { useState, useEffect, createContext, useContext, ReactNode, useCallback } from "react";
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile,
  onAuthStateChanged,
  User as FirebaseUser,
  User
} from "firebase/auth";
import { auth } from "@/lib/firebase";

// Types
export type AppUser = FirebaseUser;

interface AuthState {
  user: AppUser | null;
  loading: boolean;
  error: string | null;
}

interface UserContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
  refreshUser: () => Promise<void>;
}

// Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider
interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Gestion de l'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setState(prev => ({
        ...prev,
        user,
        loading: false,
        error: null,
      }));
    });

    return () => unsubscribe();
  }, []);

  // Connexion utilisateur
  const login = useCallback(async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la connexion';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw new Error(errorMessage);
    }
  }, []);

  // Inscription utilisateur
  const register = useCallback(async (email: string, password: string, displayName: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (userCredential.user) {
        await updateFirebaseProfile(userCredential.user, { displayName });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erreur lors de l'inscription";
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw new Error(errorMessage);
    }
  }, []);

  // Déconnexion utilisateur
  const logout = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await signOut(auth);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la déconnexion';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw new Error(errorMessage);
    }
  }, []);

  // Réinitialisation du mot de passe
  const resetPassword = useCallback(async (email: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await sendPasswordResetEmail(auth, email);
      setState(prev => ({ ...prev, loading: false }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la réinitialisation du mot de passe';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw new Error(errorMessage);
    }
  }, []);

  // Mise à jour du profil utilisateur
  const updateProfile = useCallback(async (data: { displayName?: string; photoURL?: string }) => {
    if (!auth.currentUser) {
      throw new Error('Aucun utilisateur connecté');
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await updateFirebaseProfile(auth.currentUser, data);
      
      setState(prev => ({
        ...prev,
        user: auth.currentUser ? { ...auth.currentUser } : null,
        loading: false
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la mise à jour du profil';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw new Error(errorMessage);
    }
  }, []);

  // Rafraîchir les données utilisateur
  const refreshUser = useCallback(async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await currentUser.reload();
      
      setState(prev => ({
        ...prev,
        user: auth.currentUser ? { ...auth.currentUser } : null,
        loading: false
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors du rafraîchissement des données';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw new Error(errorMessage);
    }
  }, []);

  const value: UserContextType = {
    ...state,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
    refreshUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte utilisateur
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser doit être utilisé à l\'intérieur d\'un UserProvider');
  }
  return context;
}

// Hook simplifié pour accéder à l'utilisateur courant
export function useCurrentUser() {
  const { user } = useUser();
  return user;
}

// Hook pour vérifier si l'utilisateur est authentifié
export function useIsAuthenticated() {
  const { user } = useUser();
  return user !== null;
}

// Hook pour vérifier si l'email est vérifié
export function useIsEmailVerified() {
  const { user } = useUser();
  return user?.emailVerified || false;
}
