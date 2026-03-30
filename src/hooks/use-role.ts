import { useMemo } from 'react';
import { useUser, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';
import type { UserRole } from '@/types/roles';

export function useRole(): {
  role: UserRole | null;
  isLoading: boolean;
  isAdmin: boolean;
  isChef: boolean;
  canAccess: (roles: UserRole[]) => boolean;
} {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemo(() => 
    user ? doc(firestore, 'users', user.uid) : null,
    [firestore, user?.uid]
  );
  
  const { data: userData, isLoading: isUserDataLoading } = useDoc(userDocRef);

  const role = userData?.role as UserRole | null;
  const isAdmin = role === 'admin';
  const isChef = role?.startsWith('chef_') ?? false;

  const canAccess = (requiredRoles: UserRole[]): boolean => {
    if (!role) return false;
    if (role === 'admin') return true;
    return requiredRoles.includes(role);
  };

  return {
    role,
    isLoading: isUserLoading || isUserDataLoading,
    isAdmin,
    isChef,
    canAccess,
  };
}
