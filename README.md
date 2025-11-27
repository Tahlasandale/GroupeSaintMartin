# 🏕️ Site Web Groupe Saint Martin de Brethencourt

Site web officiel du Groupe Saint Martin de Brethencourt, unité scoute française. Présente les activités du groupe, permet aux membres de consulter les ressources internes et facilite la communication avec la communauté scoute.

## 🚀 Démarrage Rapide

```bash
# Cloner le dépôt
git clone https://github.com/Tahlasandale/GroupeSaintMartin.git
cd GroupeSaintMartin

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.local.example .env.local
# Configurer vos clés Firebase

# Lancer le serveur de développement
npm run dev
```

## ✨ Fonctionnalités Principales

### 🔐 Politique d'Accès
- **Login Wall** : Seules les pages vitrines sont publiques
- **Authentification obligatoire** pour l'accès aux ressources internes
- **Gestion des rôles** : Utilisateurs standards et administrateurs

### 🌐 Site Vitrine (Public)
- **Page d'accueil** - Présentation du groupe avec bannière, unités, actualités
- **Qui sommes-nous** - Historique, valeurs, branches, photos de maîtrise
- **Activités** - Camps, sorties, projets service, moments marquants
- **Contacts** - Formulaire de contact, informations maîtrises, localisation

### 🔐 Espace Authentifié (Membres)
- **Tableau de bord** - Accès rapide aux ressources, dernières actualités
- **Lieux** - Liste des lieux utilisés par le groupe avec détails logistiques
- **Carnet de chants** - Chants classés par branches et ambiance
- **Jeux de veillée** - Jeux classés par énergie avec descriptions détaillées
- **Textes route** - Textes spirituels pour R/GA et SG
- **OSL** - Présentation de l'Ordre Saint Louis
- **Ressources chefs** - Techniques scouts, pédagogie, checklists
- **Carte du clan** - Carte interactive des camps et lieux historiques

### 🎨 Direction Artistique
- **Palette** : Vert principal (#2E6B3A), vert foncé (#1F4728), blanc (#FFFFFF), bleu clair (#A7C6E8), bleu nuit (#093C5A)
- **Style** : Design sobre, épuré, naturel avec icônes fines et formes arrondies
- **Typographie** : Montserrat/Poppins pour titres, Inter/Roboto pour corps

## 🛠 Pile Technologique

### Framework Core
- **[Next.js 15](https://nextjs.org/)** - Framework React avec App Router
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript typé
- **[Firebase](https://firebase.google.com/)** - Backend as a Service

### UI & Styling
- **[shadcn/ui](https://ui.shadcn.com/)** - Bibliothèque de composants moderne
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitaire
- **[Radix UI](https://www.radix-ui.com/)** - Primitives UI accessibles
- **[Lucide Icons](https://lucide.dev/)** - Jeu d'icônes élégant

### Formulaires & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Gestion performante des formulaires
- **[Zod](https://zod.dev/)** - Validation de schémas

### Outils de Développement
- **ESLint** - Linting du code
- **TypeScript** - Vérification des types
- **Turbopack** - Builds rapides en développement

## 📁 Structure du Projet

```
src/
├── app/                          # Pages Next.js App Router
│   ├── admin/                    # Pages admin (contacts, dashboard, emails)
│   ├── contacts/                 # Page contacts publique
│   ├── activites/                # Page activités publique
│   ├── qui-sommes-nous/          # Page présentation publique
│   ├── login/                    # Page de connexion
│   ├── dashboard/                # Tableau de bord membres
│   ├── lieux/                    # Gestion des lieux
│   ├── carnet-chants/            # Carnet de chants
│   ├── jeux-veillee/             # Jeux de veillée
│   ├── textes-route/             # Textes spirituels
│   ├── osl/                      # Page Ordre Saint Louis
│   ├── ressources-chefs/         # Ressources pédagogiques
│   ├── carte-clan/               # Carte interactive du clan
│   └── page.tsx                  # Page d'accueil
├── components/                   # Composants UI réutilisables
│   ├── ui/                      # Composants shadcn/ui
│   ├── layout/                  # Composants de layout (navbar, footer)
│   ├── contact-form.tsx         # Formulaire de contact
│   └── auth-form.tsx            # Formulaire d'authentification
├── actions/                      # Actions serveur
│   ├── send-contact-email.ts    # Gestion emails de contact
│   └── send-reply-email.ts      # Gestion réponses admin
├── firebase/                     # Intégration Firebase
│   ├── firestore/               # Hooks et utilitaires Firestore
│   ├── config.ts                # Configuration Firebase
│   ├── provider.tsx             # Provider de contexte Firebase
│   └── non-blocking-*.tsx       # Opérations optimisées
├── lib/                         # Fonctions utilitaires
│   ├── email.ts                 # Utilitaires service email
│   └── utils.ts                 # Utilitaires généraux
└── hooks/                       # Hooks React personnalisés
```

## ⚙️ Configuration

### Variables d'Environnement

Créer un fichier `.env.local` avec les variables suivantes :

```env
# Configuration Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=votre_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=votre_app_id



### Configuration Firebase

1. Créer un projet Firebase sur [console.firebase.google.com](https://console.firebase.google.com)
2. Activer l'Authentification avec Email/Mot de passe
3. Activer Firestore Database
4. Copier la config Firebase dans `.env.local`
5. Déployer les règles de sécurité : `firebase deploy --only firestore:rules`

### Schéma Base de Données

#### Collections Principales
- **users** : `id`, `email`, `name`, `isAdmin`, `signUpDate`, `lastLogin`
- **pre-registrations** : `email`, `createdAt`
- **contact-submissions** : `fullName`, `email`, `subject`, `message`, `createdAt`, `read`, `processed`
- **lieux** : `adresse`, `gps`, `photos`, `branche`, `notes`
- **chants** : `titre`, `paroles`, `accords`, `audio`, `video`, `branche`, `ambiance`
- **jeux-veillee** : `titre`, `description`, `duree`, `materiel`, `deroule`, `energie`, `categorie`
- **textes-route** : `titre`, `contenu`, `categorie`, `branche`
- **users/{userId}/dashboards** : `userId`, données personnalisées du tableau de bord



## 🚀 Scripts Disponibles

```bash
# Développement
npm run dev              # Serveur développement (port 9002)

# Production
npm run build            # Build de production
npm run start            # Serveur de production

# Qualité du code
npm run lint             # Lancer ESLint
npm run typecheck        # Vérification TypeScript
```

## 🎯 Cas d'Usage

Ce site est adapté pour :

- **Associations scoutes** - Gestion des unités et ressources
- **Organisations communautaires** - Communication interne et externe
- **Groupes pédagogiques** - Partage de ressources éducatives
- **Communautés locales** - Présentation d'activités et contact

## 🔧 Personnalisation

### Ajout de Fonctionnalités

1. **Pages** : Ajouter de nouvelles routes dans `src/app/`
2. **Composants** : Créer des composants réutilisables dans `src/components/`
3. **Actions** : Ajouter des actions serveur dans `src/actions/`
4. **Base de données** : Mettre à jour les règles Firestore et schémas

### Styling

- Modifier `tailwind.config.ts` pour des thèmes personnalisés
- Mettre à jour `src/app/globals.css` pour les styles globaux
- Personnaliser les composants shadcn/ui dans `src/components/ui/`

### Authentification

- Modifier les rôles utilisateur dans les règles de sécurité Firestore
- Ajouter de nouveaux providers dans la console Firebase
- Personnaliser les flux d'auth dans `src/components/auth-form.tsx`

## 📚 Documentation

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Firebase](https://firebase.google.com/docs)
- [Documentation shadcn/ui](https://ui.shadcn.com/)


## 📄 Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

---

**Prêt à développer votre site scout ?** Ce template fournit tout ce dont vous avez besoin pour commencer rapidement. Concentrez-vous sur votre mission scoute pendant que nous gérons l'infrastructure ! 🏕️
