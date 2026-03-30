export type UserRole = 
  | 'scout'
  | 'aine'
  | 'chef_louveteaux'
  | 'cheftaine_louvettes'
  | 'chef_scouts'
  | 'cheftaine_guides'
  | 'admin';

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  scout: 1,
  aine: 2,
  chef_louveteaux: 3,
  cheftaine_louvettes: 3,
  chef_scouts: 3,
  cheftaine_guides: 3,
  admin: 10,
};

export const ROLE_LABELS: Record<UserRole, string> = {
  scout: 'Scout',
  aine: 'Aîné',
  chef_louveteaux: 'Chef Louveteaux',
  cheftaine_louvettes: 'Cheftaine Louvettes',
  chef_scouts: 'Chef Scouts',
  cheftaine_guides: 'Cheftaine Guides',
  admin: 'Administrateur',
};

export const canAccessRoute = (role: UserRole | null, requiredRoles: UserRole[]): boolean => {
  if (!role) return false;
  if (role === 'admin') return true;
  return requiredRoles.includes(role);
};

export const ALL_ROLES: UserRole[] = [
  'scout',
  'aine',
  'chef_louveteaux',
  'cheftaine_louvettes',
  'chef_scouts',
  'cheftaine_guides',
  'admin',
];
