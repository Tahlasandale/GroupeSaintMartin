# Architecture de l'Application Groupe Saint Martin

## Table des matières

- [Stack technique](#stack-technique)
- [Arborescence des fichiers](#arborescence-des-fichiers)
- [Structure des pages](#structure-des-pages)
- [Détail des pages](#détail-des-pages)
- [Composants principaux](#composants-principaux)
- [Base de données Firestore](#base-de-données-firestore)
- [Authentification](#authentification)

---

## Stack technique

| Catégorie | Technologie |
|-----------|-------------|
| Framework | Next.js 15.3.3 (App Router) |
| Langage | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 3.4.1 + CSS Variables |
| UI Components | shadcn/ui (Radix UI primitives) |
| Icônes | Lucide React |
| Formulaires | React Hook Form + Zod validation |
| Backend/Auth | Firebase 11.9.1 (Auth + Firestore) |
| AI/GenAI | Genkit 1.20.0 + Google GenAI |
| Graphiques | Recharts 2.15.1 |
| Email | SendGrid 8.1.3 |
| Date Picker | react-day-picker 8.10.1 |
| Animations | Tailwind animate + embla-carousel |
| Linting | ESLint 9.39.1 |
| Hébergement | Firebase App Hosting |

---

## Arborescence des fichiers

```
/
├── src/
│   ├── app/                    # Pages Next.js (App Router)
│   │   ├── layout.tsx         # Layout racine
│   │   ├── page.tsx          # Page d'accueil
│   │   ├──activites/
│   │   │   └── page.tsx
│   │   ├── admin/
│   │   │   ├── contacts/
│   │   │   │   └── page.tsx
│   │   │   └── dashboard/
│   │   │       └── page.tsx
│   │   ├── carnet-chants/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── carte-clan/
│   │   │   └── page.tsx
│   │   ├── contacts/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── jeux-veillee/
│   │   │   └── page.tsx
│   │   ├── le-scoutisme-a-saint-martin/
│   │   │   └── page.tsx
│   │   ├── lieux/
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── mentions-legales/
│   │   │   └── page.tsx
│   │   ├── osl/
│   │   │   └── page.tsx
│   │   ├── politique-de-confidentialite/
│   │   │   └── page.tsx
│   │   ├── qui-sommes-nous/
│   │   │   └── page.tsx
│   │   ├── ressources-chefs/
│   │   │   └── page.tsx
│   │   ├── routier/
│   │   │   └── page.tsx
│   │   └── textes-route/
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/                 # Composants shadcn/ui (35 composants)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   └── ... (30 autres)
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   └── footer.tsx
│   │   ├── auth-form.tsx
│   │   ├── contact-form.tsx
│   │   ├── add-chant-form.tsx
│   │   └── csv-upload.tsx
│   ├── firebase/
│   │   ├── index.ts           # Exports Firebase
│   │   ├── auth.tsx           # Provider Auth
│   │   ├── client.tsx         # FirebaseProvider
│   │   ├── error-listener.tsx
│   │   └── firestore/
│   │       ├── use-collection.ts
│   │       └── use-doc.ts
│   ├── hooks/
│   │   ├── use-toast.ts
│   │   └── use-mobile.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── placeholder-image.ts
│   ├── actions/               # Server Actions (vide)
│   └── ai/
│       └── index.ts           # Configuration GenAI
├── public/
│   ├── drapeau-ile-de-france.png
│   └── Ensemble des chants scouts.pdf
├── Data/
│   └── chants/
├── docs/
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
├── next.config.ts
├── tailwind.config.ts
├── components.json
└── tsconfig.json
```

---

## Structure des pages

### Pages publiques

| Route | Fichier | Description |
|-------|---------|-------------|
| `/` | `page.tsx` | Page d'accueil avec bannière et présentation des unités |
| `/activites` | `page.tsx` | Description des camps, sorties et projets de service |
| `/carnet-chants` | `page.tsx` | Liste des chants avec recherche et filtres |
| `/carnet-chants/[id]` | `page.tsx` | Détail d'un chant avec paroles |
| `/carte-clan` | `page.tsx` | Carte interactive des lieux visités |
| `/contacts` | `page.tsx` | Formulaire de contact et coordonnées |
| `/jeux-veillee` | `page.tsx` | Liste des jeux de veillée |
| `/le-scoutisme-a-saint-martin` | `page.tsx` | Présentation du scoutisme Europa |
| `/lieux` | `page.tsx` | Liste des lieux (réservé aux utilisateurs connectés) |
| `/login` | `page.tsx` | Page de connexion/authentification |
| `/mentions-legales` | `page.tsx` | Mentions légales |
| `/politique-de-confidentialite` | `page.tsx` | Politique de confidentialité |
| `/qui-sommes-nous` | `page.tsx` | Historique et présentation du groupe |
| `/ressources-chefs` | `page.tsx` | Ressources pédagogiques pour chefs |
| `/routiers` | `page.tsx` | Page de redirection vers carte-clan et textes-route |
| `/textes-route` | `page.tsx` | Textes spirituels et de route |

### Pages d'administration (réservées aux admins)

| Route | Fichier | Description |
|-------|---------|-------------|
| `/dashboard` | `page.tsx` | Dashboard utilisateur (redirection vers admin si admin) |
| `/admin/dashboard` | `page.tsx` | Dashboard administrateur |
| `/admin/contacts` | `page.tsx` | Gestion des soumissions de contact |
| `/osl` | `page.tsx` | Page OSL (réservée aux admins) |

---

## Détail des pages

### Page d'accueil (`/`)

**Fichier**: `src/app/page.tsx`

- Grande bannière avec image de fond (`drapeau-ile-de-france.png`)
- Présentation des 3 unités (Louveteaux, Scouts, Routiers) sous forme de cartes
- Section "Dernières actualités" avec 3 nouvelles
- Bouton "Nous contacter" vers `/contacts`

### Activités (`/activites`)

**Fichier**: `src/app/activites/page.tsx`

- Section Camps : durée par branche, galerie photos (placeholder)
- Section Rythme des activités : coordination entre groupes
- Section Sorties par branche
- Section Projets de service routiers
- Section Moments marquants (galerie placeholder)

### Carnet de Chants (`/carnet-chants`)

**Fichier**: `src/app/carnet-chants/page.tsx`

**Fonctionnalités**:
- Liste des chants depuis Firestore (collection `chants`)
- Recherche par titre/paroles
- Filtres par branche (LL, SG, RGA) et ambiance (marche, veillée, prière)
- Ajout de chant (utilisateurs connectés)
- Import CSV (admins uniquement)
- Téléchargement du PDF "Ensemble des chants scouts"
- Actions admin : valider, modifier, supprimer, supprimer tous

**Interface Firestore**:
```typescript
interface Chant {
  id: string;
  titre: string;
  paroles: string;
  branche: string;      // "LL" | "SG" | "RGA"
  ambiance: string;     // "marche" | "veillée" | "prière"
  validated?: boolean;
  createdAt?: string;
}
```

### Détail d'un Chant (`/carnet-chants/[id]`)

**Fichier**: `src/app/carnet-chants/[id]/page.tsx`

- Affichage du titre, branche, ambiance, statut validé
- Paroles formatées avec `whitespace-pre-line`
- Bouton retour vers la liste

### Contacts (`/contacts`)

**Fichier**: `src/app/contacts/page.tsx`

- Email officiel du groupe
- Localisation du local
- Contacts par groupe (Garçons/Filles) avec emails et téléphones
- Formulaire de contact (`ContactForm`)

### Dashboard (`/dashboard`)

**Fichier**: `src/app/dashboard/page.tsx`

- Vérifie l'authentification
- Redirige vers `/admin/dashboard` si admin
- Affiche un message de bienvenue simple

### Dashboard Admin (`/admin/dashboard`)

**Fichier**: `src/app/admin/dashboard/page.tsx`

- Vérifie le flag `isAdmin` dans Firestore
- Liens vers contacts et gestion des chants

### Admin Contacts (`/admin/contacts`)

**Fichier**: `src/app/admin/contacts/page.tsx`

- Liste des soumissions de contact depuis Firestore
- Filtres : All, Unread, Read (Unprocessed), Processed
- Actions : marquer comme lu, marquer comme traité
- Tableau avec date, nom, email, message

**Interface Firestore**:
```typescript
interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  message: string;
  createdAt: string;
  read?: boolean;
  processed?: boolean;
}
```

### OSL (`/osl`)

**Fichier**: `src/app/osl/page.tsx`

- Réservé aux admins (`isAdmin === true`)
- Présentation de l'Ordre Saint Louis
- Valeurs : Foi, Service, Fraternité
- Parcours d'un membre (3 étapes)
- Événements OSL
- Galerie placeholder

### Qui sommes-nous (`/qui-sommes-nous`)

**Fichier**: `src/app/qui-sommes-nous/page.tsx`

- Historique du groupe avec citation du père Jacques Sevin
- Les 5 buts du scoutisme
- Présentation des 3 branches
- Conclusion avec citation du Chanoine Cornette
- Photos de maîtrise (placeholders)

### Ressources Chefs (`/ressources-chefs`)

**Fichier**: `src/app/ressources-chefs/page.tsx`

- Sites utiles (liens externes)
- Techniques scouts : nœuds, feu, installations
- Pédagogie par branche
- Checklists : préparation de camp, sécurité, documents admin

### Le scoutisme à Saint-Martin (`/le-scoutisme-a-saint-martin`)

**Fichier**: `src/app/le-scoutisme-a-saint-martin/page.tsx`

- L'esprit scout (citation)
- Présentation Europa Scouts
- Les 5 buts du scoutisme
- La pédagogie par branches
- Organisation des activités
- Citation de conclusion

### Jeux de Veillée (`/jeux-veillee`)

**Fichier**: `src/app/jeux-veillee/page.tsx`

- Liste des jeux depuis Firestore (collection `jeux-veillee`)
- Bouton "Jeu Aléatoire"
- Filtres par catégorie : Tous, Calme, Dynamique, Hilarant
- Affichage : titre, description, durée, matériel, déroulé, énergie

**Interface Firestore**:
```typescript
interface Jeu {
  id: string;
  titre: string;
  description: string;
  duree: string;
  materiel: string;
  deroule: string;
  energie: string;
  categorie: string;
}
```

### Lieux (`/lieux`)

**Fichier**: `src/app/lieux/page.tsx`

- Réservé aux utilisateurs connectés
- Liste des lieux depuis Firestore (collection `lieux`)
- Bouton "Ajouter un lieu" (non implémenté)

**Interface Firestore**:
```typescript
interface Lieu {
  id: string;
  adresse: string;
  gps?: string;
  photos?: string[];
  branche: string;
  notes: string;
}
```

### Carte du Clan (`/carte-clan`)

**Fichier**: `src/app/carte-clan/page.tsx`

- Filtres par branche et année
- Statistiques : camps réalisés, lieux visités, projets service
- Timeline des événements
- Carte interactive (placeholder Google Maps)
- Liste des camps et lieux de service

### Textes de Route (`/textes-route`)

**Fichier**: `src/app/textes-route/page.tsx`

- Liste des textes depuis Firestore (collection `textes-route`)
- Filtres par catégorie : Tous, Prière, Route, Service, Fraternité
- Affichage du titre, catégorie, branche, contenu

**Interface Firestore**:
```typescript
interface Texte {
  id: string;
  titre: string;
  contenu: string;
  categorie: string;
  branche: string;
}
```

### Routiers (`/routiers`)

**Fichier**: `src/app/routiers/page.tsx`

- Page simple avec liens vers `/carte-clan` et `/textes-route`

### Mentions Légales (`/mentions-legales`)

**Fichier**: `src/app/mentions-legales/page.tsx`

- Informations sur l'éditeur du site (AuthZen placeholder)
- Hébergement (Firebase Hosting / Google)
- Propriété intellectuelle
- Données personnelles

### Politique de Confidentialité (`/politique-de-confidentialite`)

**Fichier**: `src/app/politique-de-confidentialite/page.tsx`

- Introduction
- Collecte d'informations
- Utilisation des informations
- Sécurité
- Contact

### Login (`/login`)

**Fichier**: `src/app/login/page.tsx`

- Composant `AuthForm` (formulaire d'authentification Firebase)
- Redirection vers `/dashboard` si déjà connecté

---

## Composants principaux

### Layout

| Composant | Fichier | Description |
|-----------|---------|-------------|
| RootLayout | `src/app/layout.tsx` | Layout racine avec Navbar, Footer, FirebaseProvider, metadata |
| Navbar | `src/components/layout/navbar.tsx` | Navigation responsive avec menu mobile (Sheet) |
| Footer | `src/components/layout/footer.tsx` | Pied de page avec liens légaux et contact |

### Formulaires

| Composant | Fichier | Description |
|-----------|---------|-------------|
| AuthForm | `src/components/auth-form.tsx` | Formulaire login/register Firebase |
| ContactForm | `src/components/contact-form.tsx` | Formulaire de contact |
| AddChantForm | `src/components/add-chant-form.tsx` | Formulaire ajout/modification chant |
| CsvUpload | `src/components/csv-upload.tsx` | Upload de fichier CSV |

### Firebase

| Hook/Fonction | Fichier | Description |
|---------------|---------|-------------|
| useUser | `src/firebase/auth.tsx` | Hook pour l'utilisateur connecté |
| useFirestore | `src/firebase/client.tsx` | Hook pour l'instance Firestore |
| useDoc | `src/firebase/firestore/use-doc.ts` | Hook pour lire un document |
| useCollection | `src/firebase/firestore/use-collection.ts` | Hook pour lire une collection |
| updateDocumentNonBlocking | `src/firebase/index.ts` | Mise à jour non-bloquante |

---

## Base de données Firestore

### Collections

| Collection | Usage | Structure |
|------------|-------|-----------|
| `users` | Profils utilisateurs | `{ uid, email, isAdmin, ... }` |
| `chants` | Carnet de chants | `{ titre, paroles, branche, ambiance, validated, createdAt }` |
| `contact-submissions` | Messages de contact | `{ fullName, email, message, createdAt, read, processed }` |
| `jeux-veillee` | Jeux de veillée | `{ titre, description, duree, materiel, deroule, energie, categorie }` |
| `lieux` | Lieux scout | `{ adresse, gps, photos, branche, notes }` |
| `textes-route` | Textes spirituels | `{ titre, contenu, categorie, branche }` |

### Règles de sécurité (Résumé)

- `users`: Lecture/écriture pour le propriétaire + admins
- `chants`: Lecture publique, écriture pour utilisateurs connectés
- `contact-submissions`: Lecture/écriture admins
- `jeux-veillee`, `lieux`, `textes-route`: Lecture publique

---

## Authentification

### Provider

- Firebase Authentication avec email/password
- Drapeau `isAdmin` dans le document Firestore `users/{uid}`

### Routes protégées

| Route | Protection |
|-------|------------|
| `/dashboard` | Utilisateur connecté |
| `/lieux` | Utilisateur connecté |
| `/admin/*` | Utilisateur avec `isAdmin === true` |
| `/osl` | Utilisateur avec `isAdmin === true` |

### Flux d'authentification

1. Page `/login` → `AuthForm` → Firebase Auth
2. Création automatique du document `users/{uid}` dans Firestore
3. Redirection vers `/dashboard`
4. Vérification `isAdmin` pour les routes admin
