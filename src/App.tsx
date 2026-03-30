import { createBrowserRouter, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Navbar } from './components/layout/navbar';
import { Footer } from './components/layout/footer';
import HomePage from './app/page';
import LoginPage from './app/login/page';
import DashboardPage from './app/dashboard/page';
import CarnetChantsPage from './app/carnet-chants/page';
import CarnetChantDetailPage from './app/carnet-chants/[id]/page';
import OslPage from './app/osl/page';
import LieuxPage from './app/lieux/page';
import RoutiersPage from './app/routiers/page';
import AdminDashboardPage from './app/admin/dashboard/page';
import AdminContactsPage from './app/admin/contacts/page';
import ContactsPage from './app/contacts/page';
import QuiSommesNousPage from './app/qui-sommes-nous/page';
import ActivitesPage from './app/activites/page';
import LeScoutismePage from './app/le-scoutisme-a-saint-martin/page';
import RessourcesChefsPage from './app/ressources-chefs/page';
import RessourcesLouveteauxPage from './app/ressources-louveteaux/page';
import RessourcesLouvettesPage from './app/ressources-louvettes/page';
import RessourcesScoutsPage from './app/ressources-scouts/page';
import RessourcesGuidesPage from './app/ressources-guides/page';
import CarteClanPage from './app/carte-clan/page';
import TextesRoutePage from './app/textes-route/page';
import JeuxVeilleePage from './app/jeux-veillee/page';
import MentionsLegalesPage from './app/mentions-legales/page';
import PolitiqueConfidentialitePage from './app/politique-de-confidentialite/page';
import { useRole } from './hooks/use-role';
import type { UserRole } from './types/roles';

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

const NotFound = () => (
  <div className="container mx-auto py-12 px-4 text-center">
    <h1 className="text-4xl font-bold mb-4">404</h1>
    <p className="text-muted-foreground">Page non trouvée</p>
  </div>
);

const AccessDenied = () => (
  <div className="container mx-auto py-12 px-4 text-center">
    <h1 className="text-4xl font-bold mb-4">Accès refusé</h1>
    <p className="text-muted-foreground">Vous n'avez pas accès à cette page.</p>
  </div>
);

function ProtectedRoute({ 
  children, 
  requiredRoles 
}: { 
  children: ReactNode; 
  requiredRoles: UserRole[];
}) {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'admin' && !requiredRoles.includes(role)) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return <Layout>{children}</Layout>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><HomePage /></Layout>,
  },
  {
    path: '/login',
    element: <Layout><LoginPage /></Layout>,
  },
  {
    path: '/dashboard',
    element: <Layout><DashboardPage /></Layout>,
  },
  {
    path: '/carnet-chants',
    element: <Layout><CarnetChantsPage /></Layout>,
  },
  {
    path: '/carnet-chants/:id',
    element: <Layout><CarnetChantDetailPage /></Layout>,
  },
  {
    path: '/osl',
    element: <Layout><OslPage /></Layout>,
  },
  {
    path: '/lieux',
    element: <Layout><LieuxPage /></Layout>,
  },
  {
    path: '/routiers',
    element: <Layout><RoutiersPage /></Layout>,
  },
  {
    path: '/admin/dashboard',
    element: <Layout><AdminDashboardPage /></Layout>,
  },
  {
    path: '/admin/contacts',
    element: <Layout><AdminContactsPage /></Layout>,
  },
  {
    path: '/contacts',
    element: <Layout><ContactsPage /></Layout>,
  },
  {
    path: '/qui-sommes-nous',
    element: <Layout><QuiSommesNousPage /></Layout>,
  },
  {
    path: '/activites',
    element: <Layout><ActivitesPage /></Layout>,
  },
  {
    path: '/le-scoutisme-a-saint-martin',
    element: <Layout><LeScoutismePage /></Layout>,
  },
  {
    path: '/ressources-chefs',
    element: <Layout><RessourcesChefsPage /></Layout>,
  },
  {
    path: '/ressources-louveteaux',
    element: <ProtectedRoute requiredRoles={['chef_louveteaux', 'admin']}>
      <RessourcesLouveteauxPage />
    </ProtectedRoute>,
  },
  {
    path: '/ressources-louvettes',
    element: <ProtectedRoute requiredRoles={['cheftaine_louvettes', 'admin']}>
      <RessourcesLouvettesPage />
    </ProtectedRoute>,
  },
  {
    path: '/ressources-scouts',
    element: <ProtectedRoute requiredRoles={['chef_scouts', 'admin']}>
      <RessourcesScoutsPage />
    </ProtectedRoute>,
  },
  {
    path: '/ressources-guides',
    element: <ProtectedRoute requiredRoles={['cheftaine_guides', 'admin']}>
      <RessourcesGuidesPage />
    </ProtectedRoute>,
  },
  {
    path: '/carte-clan',
    element: <Layout><CarteClanPage /></Layout>,
  },
  {
    path: '/textes-route',
    element: <Layout><TextesRoutePage /></Layout>,
  },
  {
    path: '/jeux-veillee',
    element: <Layout><JeuxVeilleePage /></Layout>,
  },
  {
    path: '/mentions-legales',
    element: <Layout><MentionsLegalesPage /></Layout>,
  },
  {
    path: '/politique-de-confidentialite',
    element: <Layout><PolitiqueConfidentialitePage /></Layout>,
  },
  {
    path: '*',
    element: <Layout><NotFound /></Layout>,
  },
]);
