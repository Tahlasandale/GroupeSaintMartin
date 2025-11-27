# 🏕️ Spécification Fonctionnelle — Site Groupe Saint Martin de Brethencourt

**DA : vert & blanc sobres + nuances de bleu**

---

## 🎨 Direction Artistique (DA)

### 🎨 Palette

- **Vert principal (identité scoute)** : #2E6B3A
- **Vert foncé (accents)** : #1F4728
- **Blanc** : #FFFFFF
- **Bleu clair (détails / surlignages)** : #A7C6E8
- **Bleu nuit (texte secondaire / hover)** : #093C5A

### 🌱 Style général

- Design sobre, épuré, naturel
- Icônes fines style "line icons"
- Formes légèrement arrondies (border-radius 4–8px)
- Fonds dominants : blanc et vert pâle, avec touches de bleu
- Titres en vert foncé
- **Boutons** :
  - Primary : vert principal, texte blanc
  - Secondary : contour bleu, texte bleu nuit

### 📐 Typographie

- **Titres** : Montserrat / Poppins
- **Corps** : Inter / Roboto

---

## 🧭 Modèles Interface — Navbar et Footer

### 🌐 Navbar (modulaire)

- Logo : blason ou symbole Saint Martin de Brethencourt
- **Items visibles en mode public** :
  - Accueil
  - Qui sommes-nous
  - Activités
  - Contacts
- Bouton Login (bleu)
- **En mode authentifié** :
  - Dashboard
  - Lieux
  - Carnet de chants
  - Jeux de veillée
  - Textes route
  - OSL
  - Ressources chefs
  - Carte du clan
  - Profil + Déconnexion

### 🦶 Footer (modulaire)

- Logo miniature du groupe
- **Liens utiles** :
  - Mentions légales
  - Contact
  - Charte du site
- Réseaux sociaux
- **Phrase signature en vert** :
  > "Toujours Prêt – Groupe Saint Martin de Brethencourt"

---

## 🔐 Politique d'accès : Login Wall

⚠️ Seules les pages de la vitrine sont publiques. Tout le reste → authentification obligatoire.

### Accessible sans compte :
- Accueil
- Qui sommes-nous
- Activités
- Contacts

### Requiert login :
- Dashboard
- Lieux
- Carnet de chants
- Jeux de veillée
- Textes
- OSL
- Ressources chefs
- Carte du clan
- Tous les fichiers internes

---

## 🌐 1. Site Vitrine (Public)

### ➤ Page d'accueil

- Grande bannière vert + bleu (photo du groupe)
- Texte d'accueil : "Bienvenue au Groupe Saint Martin de Brethencourt"
- **Encadré Nos unités** :
  - 🐺 Louveteaux / Louvettes
  - 🔥 Scouts / Guides
  - 🛡️ Routiers / Guides Aînées
- Dernières actualités
- Bouton "Nous contacter"

### ➤ Qui sommes-nous ?

- Historique du groupe
- Valeurs : fraternité, service, spiritualité
- **Présentation des branches** :
  - Méthode LL
  - Méthode SG
  - Route R/GA
- Photos de maîtrise

### ➤ Activités

- Camps (galerie)
- Sorties LL / SG / RGA
- Projets de service routiers
- Moments marquants

### ➤ Contacts

- Email officiel
- Contacts maîtrises LL / SG / RGA
- Localisation du local
- Formulaire de message

---

## 🔐 2. Espace Authentifié

Dès qu'une page authentifiée est demandée → login wall vert/blanc/bleu.

### ➤ Connexion

- Logo du groupe
- Champs email + mot de passe
- Message d'accueil : "Espace membres du Groupe Saint Martin de Brethencourt"
- Bouton connexion vert
- Lien mot de passe oublié

### ➤ Tableau de bord

- Prochaines activités
- Derniers documents ajoutés
- Photos récentes
- **Accès rapide** :
  - Lieux
  - Carte
  - Jeux
  - Chants
  - Textes
  - OSL

---

## 🏞️ 3. Lieux (auth requis)

- Liste des lieux utilisés par le groupe
- **Fiche détail** :
  - Adresse
  - GPS
  - Photos
  - Pour quelle branche (LL/SG/RGA)
  - Notes logistiques

---

## 🎵 4. Carnet de Chants (auth requis)

- Filtre par branches et ambiance : LL / SG / RGA • marche • veillée • prière
- **Page d'un chant** :
  - Paroles
  - Accords (si permis)
  - Audio / vidéo
- Mode nuit bleu profond

---

## 🔥 5. Jeux de Veillée (auth requis)

- Liste de jeux classés (calme, dynamique, hilarant…)
- **Fiche jeu** :
  - Durée
  - Matériel
  - Déroulé
  - Energie
- Bouton bleu : "Jeu Aléatoire"

---

## 📖 6. Textes de Route / Spiritualité (auth requis)

- Textes pour veillées R/GA et SG
- Classés : prière, route, service, fraternité
- Mode lecture épuré

---

## 🛡️ 7. OSL – Ordre Saint Louis (auth requis)

- Présentation
- Valeurs et symboliques
- Parcours d'un membre
- Événements OSL
- Galerie

---

## 👨‍🏫 8. Ressources pour Chefs (auth requis)

- Sites utiles
- Techniques scouts (nœuds, feu, installations…)
- Pédagogie branche par branche
- Checklists
- Documents admin

---

## 🗺️ 9. Carte du Clan (auth requis)

- Carte interactive (vert & bleu)
- Camps réalisés (LL / SG / RGA)
- Lieux de service
- Lieux historiques du groupe
- Filtre par branche
- Filtre par année
- Timeline
- Stats

---

## 📌 Résumé des pages + accès

| Page              | Public | Auth |
|-------------------|--------|------|
| Accueil           | ✔      | ✖    |
| Qui sommes-nous   | ✔      | ✖    |
| Activités         | ✔      | ✖    |
| Contacts          | ✔      | ✖    |
| Login             | ✔      | —    |
| Dashboard         | ✖      | ✔    |
| Lieux             | ✖      | ✔    |
| Carnet de chants  | ✖      | ✔    |
| Jeux              | ✖      | ✔    |
| Textes            | ✖      | ✔    |
| OSL               | ✖      | ✔    |
| Ressources        | ✖      | ✔    |
| Carte             | ✖      | ✔    |
DA : vert & blanc sobres + nuances de bleu


---

🎨 Direction Artistique (DA)

🎨 Palette

Vert principal (identité scoute) : #2E6B3A

Vert foncé (accents) : #1F4728

Blanc : #FFFFFF

Bleu clair (détails / surlignages) : #A7C6E8

Bleu nuit (texte secondaire / hover) : #093C5A


🌱 Style général

Design sobre, épuré, naturel

Icônes fines style “line icons”

Formes légèrement arrondies (border-radius 4–8px)

Fonds dominants : blanc et vert pâle, avec touches de bleu

Titres en vert foncé

Boutons :

Primary : vert principal, texte blanc

Secondary : contour bleu, texte bleu nuit



📐 Typographie

Titres : Montserrat / Poppins

Corps : Inter / Roboto



---

🧭 Modèles Interface — Navbar et Footer

🌐 Navbar (modulaire)

Logo : blason ou symbole Saint Martin de Brethencourt

Items visibles en mode public :

Accueil

Qui sommes-nous

Activités

Contacts


Bouton Login (bleu)

En mode authentifié :

Dashboard

Lieux

Carnet de chants

Jeux de veillée

Textes route

OSL

Ressources chefs

Carte du clan

Profil + Déconnexion



🦶 Footer (modulaire)

Logo miniature du groupe

Liens utiles :

Mentions légales

Contact

Charte du site


Réseaux sociaux

Phrase signature en vert :

> “Toujours Prêt – Groupe Saint Martin de Brethencourt”





---

🔐 Politique d'accès : Login Wall

⚠️ Seules les pages de la vitrine sont publiques
Tout le reste → authentification obligatoire

Accessible sans compte :

Accueil

Qui sommes-nous

Activités

Contacts


Requiert login :

Dashboard

Lieux

Carnet de chants

Jeux de veillée

Textes

OSL

Ressources chefs

Carte du clan

Tous les fichiers internes



---

🌐 1. Site Vitrine (Public)

➤ Page d’accueil

Grande bannière vert + bleu (photo du groupe)

Texte d’accueil :
“Bienvenue au Groupe Saint Martin de Brethencourt”

Encadré Nos unités :

🐺 Louveteaux / Louvettes

🔥 Scouts / Guides

🛡️ Routiers / Guides Aînées


Dernières actualités

Bouton “Nous contacter”


➤ Qui sommes-nous ?

Historique du groupe

Valeurs : fraternité, service, spiritualité

Présentation des branches :

Méthode LL

Méthode SG

Route R/GA


Photos de maîtrise


➤ Activités

Camps (galerie)

Sorties LL / SG / RGA

Projets de service routiers

Moments marquants


➤ Contacts

Email officiel

Contacts maîtrises LL / SG / RGA

Localisation du local

Formulaire de message



---

🔐 2. Espace Authentifié

Dès qu’une page authentifiée est demandée → login wall vert/blanc/bleu.

➤ Connexion

Logo du groupe

Champs email + mot de passe

Message d’accueil :
“Espace membres du Groupe Saint Martin de Brethencourt”

Bouton connexion vert

Lien mot de passe oublié


➤ Tableau de bord

Prochaines activités

Derniers documents ajoutés

Photos récentes

Accès rapide :

Lieux

Carte

Jeux

Chants

Textes

OSL




---

🏞️ 3. Lieux (auth requis)

Liste des lieux utilisés par le groupe

Fiche détail :

Adresse

GPS

Photos

Pour quelle branche (LL/SG/RGA)

Notes logistiques




---

🎵 4. Carnet de Chants (auth requis)

Filtre par branches et ambiance :
LL / SG / RGA • marche • veillée • prière

Page d'un chant :

Paroles

Accords (si permis)

Audio / vidéo


Mode nuit bleu profond



---

🔥 5. Jeux de Veillée (auth requis)

Liste de jeux classés (calme, dynamique, hilarant…)

Fiche jeu :

Durée

Matériel

Déroulé

Energie


Bouton bleu : “Jeu Aléatoire”



---

📖 6. Textes de Route / Spiritualité (auth requis)

Textes pour veillées R/GA et SG

Classés : prière, route, service, fraternité

Mode lecture épuré



---

🛡️ 7. OSL – Ordre Saint Louis (auth requis)

Présentation

Valeurs et symboliques

Parcours d'un membre

Événements OSL

Galerie



---

👨‍🏫 8. Ressources pour Chefs (auth requis)

Sites utiles

Techniques scouts (nœuds, feu, installations…)

Pédagogie branche par branche

Checklists

Documents admin



---

🗺️ 9. Carte du Clan (auth requis)

Carte interactive (vert & bleu)

Camps réalisés (LL / SG / RGA)

Lieux de service

Lieux historiques du groupe

Filtre par branche

Filtre par année

Timeline

Stats



---

📌 Résumé des pages + accès

Page	Public	Auth

Accueil	✔	✖
Qui sommes-nous	✔	✖
Activités	✔	✖
Contacts	✔	✖
Login	✔	—
Dashboard	✖	✔
Lieux	✖	✔
Carnet de chants	✖	✔
Jeux	✖	✔
Textes	✖	✔
OSL	✖	✔
Ressources	✖	✔
Carte	✖	✔


