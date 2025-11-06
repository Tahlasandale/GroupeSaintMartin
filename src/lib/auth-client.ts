import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, User } from 'firebase/auth';
import { auth } from './firebase';

type SignUpParams = {
  email: string;
  password: string;
  name: string;
  image?: string;
  callbackURL?: string;
  fetchOptions?: {
    onResponse?: () => void;
    onRequest?: () => void;
    onError?: (error: { error: { message: string } }) => void;
    onSuccess?: () => void;
  };
};

export const signUp = {
  email: async ({
    email,
    password,
    name,
    image,
    callbackURL = '/',
    fetchOptions = {}
  }: SignUpParams) => {
    const { onRequest, onResponse, onError, onSuccess } = fetchOptions;
    
    try {
      onRequest?.();
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (userCredential.user) {
        // Mise à jour du profil avec le nom et l'image
        await updateProfile(userCredential.user, {
          displayName: name,
          photoURL: image
        });
        
        onSuccess?.();
        
        // Redirection après inscription réussie
        if (typeof window !== 'undefined') {
          window.location.href = callbackURL;
        }
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      onError?.({ error: { message: error.message || 'An error occurred during sign up' } });
    } finally {
      onResponse?.();
    }
  }
};

export const signIn = {
  email: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user, error: null };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { user: null, error: error.message };
    }
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error: any) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const onAuthStateChanged = (
  callback: (user: User | null) => void
) => {
  return auth.onAuthStateChanged(callback);
};
