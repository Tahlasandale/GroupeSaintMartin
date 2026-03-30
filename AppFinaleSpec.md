# Architecture de l'Application Groupe Saint Martin (Unifiée)

## Table des matières

1.  [Stack Technique "Lean"](#stack-technique-lean)
2.  [Arborescence des Fichiers](#arborescence-des-fichiers)
3.  [Structure des Pages](#structure-des-pages)
4.  [Détail des Pages et Fonctionnalités](#détail-des-pages-et-fonctionnalités)
5.  [Composants Principaux](#composants-principaux)
6.  [Authentification et Sécurité](#authentification-et-sécurité)

-----

## 1\. Stack Technique "Lean"

Cette pile technologique remplace Next.js pour offrir un temps de compilation quasi nul et une application Single Page (SPA) extrêmement véloce.

| Catégorie | Technologie | Rôle / Avantage |
| :--- | :--- | :--- |
| **Cœur Frontend** | **Vite + Preact + TS** | SPA ultra-légère, alternative minimaliste à React/Next.js. |
| **Routage** | **wouter** ou **vite-plugin-pages** | Routage basé sur le système de fichiers (garde la DX de Next.js). |
| **Stylisation** | **Tailwind CSS 3.4** | Zéro CSS au runtime, intégration directe des anciens styles. |
| **UI Components** | **shadcn/ui** | Primitives accessibles (Radix) adaptées pour Preact. |
| **Backend / Auth** | **Firebase Lite** | Authentification et stockage déporté, empreinte minimale. |
| **IA / GenAI** | **Mistral API / Genkit** | Génération de programmes via appels sécurisés côté serveur/Edge. |
| **Icônes & UI** | **Lucide React** | Bibliothèque d'icônes SVG optimisée. |

-----

## 2\. Arborescence des Fichiers


Voici l'arborescence complète:

```text
/
├── public/
│   ├── drapeau-ile-de-france.png
│   ├── Ensemble des chants scouts.pdf
│   └── social-card.svg
├── src/
│   ├── app/                    
│   │   ├── layout.tsx         
│   │   ├── page.tsx          
│   │   ├── activites/
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
│   │   ├── meute/                      # 🐺 FUSION : Meute III & Akela Toolbox
│   │   │   ├── layout.tsx              # Navigation spécifique Meute
│   │   │   ├── page.tsx                # Accueil Meute
│   │   │   ├── calendrier/
│   │   │   │   └── page.tsx            
│   │   │   ├── compta/
│   │   │   │   └── page.tsx            
│   │   │   ├── intendance/
│   │   │   │   └── page.tsx            
│   │   │   ├── materiel/
│   │   │   │   └── page.tsx            # Hub matériel (complet, utile, à acheter)
│   │   │   ├── veillee/
│   │   │   │   └── page.tsx            # Hub veillée (techniques sketch)
│   │   │   └── boite-a-outils/         
│   │   │       ├── generateur/
│   │   │       │   └── page.tsx        # AkelaAI
│   │   │       ├── jeux/
│   │   │       │   └── page.tsx        # Liste des jeux Louveteaux
│   │   │       └── nouveau-jeu/
│   │   │           └── page.tsx        # Formulaire d'ajout
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
│   │   ├── ui/                 
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx                # Ajouté pour le Hub Matériel
│   │   │   └── ... 
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   └── footer.tsx
│   │   ├── auth-form.tsx
│   │   ├── contact-form.tsx
│   │   ├── add-chant-form.tsx
│   │   └── csv-upload.tsx
│   ├── firebase/
│   │   ├── index.ts           
│   │   ├── auth.tsx           
│   │   ├── client.tsx         
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
│   ├── actions/               
│   │   └── mistral-api.ts              # Appel serveur sécurisé pour AkelaAI
│   ├── ai/
│   │   └── index.ts           
│   ├── main.tsx                        # Point d'entrée Vite
│   └── vite-env.d.ts
├── Data/
│   ├── chants/
│   └── imports/                        # (ex: CSV Akela Toolbox pour migration)
├── docs/
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
├── package.json
├── components.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts                      # Remplace next.config.ts
```

-----

## 3\. Structure des Pages

### Pages du Groupe (Publiques & Membres)

  * `/` : Page d'accueil (Bannière, présentation unités, actualités).
  * `/activites` : Camps, sorties, rythme des activités.
  * `/carnet-chants` & `/[id]` : Liste filtrable des chants et affichage des paroles.
  * `/carte-clan` : Carte interactive des lieux visités.
  * `/contacts` : Coordonnées et formulaire de contact.
  * `/jeux-veillee` : Hub général des jeux pour tout le groupe.
  * `/lieux` : Lieux de camp/sortie (Protégé).
  * `/textes-route` : Textes spirituels et de progression.
  * Informations statiques : `/qui-sommes-nous`, `/le-scoutisme-a-saint-martin`, `/ressources-chefs`, `/mentions-legales`, `/politique-de-confidentialite`.

### Hub Meute (Spécifique Louveteaux & Chefs)

  * `/meute` : Accueil de la section (ex-site Meute III).
  * `/meute/calendrier` : Dates clés et événements de l'année.
  * `/meute/materiel` : Centralisation de l'inventaire complet, sac de week-end et liste d'achats (via onglets).
  * `/meute/intendance` : Proportions et quantités pour les courses.
  * `/meute/compta` : Tableau de bord financier de l'unité.
  * `/meute/veillee` : Techniques d'animation (sketch, mime, etc.) et règles spécifiques.
  * `/meute/boite-a-outils/jeux` : Liste filtrable et outil de recherche des jeux Louveteaux.
  * `/meute/boite-a-outils/generateur` : IA d'assistance à la création de programmes (AkelaAI).
  * `/meute/boite-a-outils/nouveau-jeu` : Formulaire collaboratif de soumission d'activités.

### Pages d'Administration

  * `/login` : Authentification.
  * `/dashboard` : Redirection intelligente selon le profil.
  * `/admin/dashboard` : Hub de gestion principal.
  * `/admin/contacts` : Suivi et traitement des messages reçus.
  * `/osl` : Ordre Saint Louis (protégé, réservé admin).

-----

## 4\. Détail des Pages et Fonctionnalités

### Le Hub Matériel (`/meute/materiel`)

Fusionne trois anciennes pages statiques en une seule interface interactive utilisant des onglets (`Tabs` de shadcn). Permet aux chefs de consulter d'un seul coup d'œil l'inventaire total, l'équipement standard pour un week-end, et les achats manquants à planifier.

### Boîte à Outils : Générateur IA (`/meute/boite-a-outils/generateur`)

Remplace l'ancienne intégration frontend de l'Akela Toolbox. L'utilisateur saisit ses contraintes (date, durée, météo) via un formulaire sécurisé. La requête est envoyée au serveur/Edge qui communique avec l'API Mistral (avec des instructions strictes sur les horaires et l'interdiction de temps libre) avant de renvoyer le programme généré à l'interface.

### Boîte à Outils : Gestion des Jeux

  * **Liste (`/jeux`) :** Moteur de recherche en temps réel, tri par durée et date d'ajout. Analyse intelligente des temps de jeu.
  * **Soumission (`/nouveau-jeu`) :** Formulaire avec validation stricte (durée positive, champs requis) permettant à la communauté d'enrichir le catalogue.

### Carnet de Chants (`/carnet-chants`)

Outil de consultation avancé avec filtres croisés (branche, ambiance). Intègre des fonctionnalités d'import massif (CSV) pour les administrateurs et la possibilité de télécharger un PDF pré-compilé regroupant l'ensemble du répertoire.

-----

## 5\. Composants Principaux

### Layout & Navigation

  * **RootLayout** : Encapsule la Navbar globale, le Footer et les fournisseurs de contexte (Firebase).
  * **MeuteLayout** : Sous-navigation spécifique apparaissant uniquement dans la section `/meute` pour un accès rapide aux outils de branche.

### UI & Formulaires

  * **Composants Radix/shadcn** : Boutons, cartes, boîtes de dialogue, formulaires de sélection et onglets, garantissant l'accessibilité tout en gardant un poids minime grâce au portage Preact.
  * **AuthForm & ContactForm** : Formulaires standardisés avec validation Zod ou ArkType.
  * **CsvUpload** : Outil d'importation de données pour faciliter les migrations de l'admin.

-----

## 6\. Authentification et Sécurité

Le système s'appuie sur un fournisseur d'identité sécurisé (Firebase Auth).

  * **Routage Protégé :** Les pages comme `/lieux`, le `/dashboard` et les outils avancés de la meute nécessitent une connexion active.
  * **Droits d'Administration :** Une vérification de rôle ("admin") est effectuée pour accéder à `/admin/*`, valider les chants, lire les soumissions de formulaires de contact ou accéder à la page de l'Ordre Saint Louis (`/osl`).
  * **Sécurité API :** Tous les appels vers des services tiers génératifs (Mistral) sont strictement masqués côté client et opérés via des fonctions serveur (ou Edge actions), éliminant l'exposition des clés d'API.

