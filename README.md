# 🚀 Fonctionnalités principales

## Modes de jeu

- ✔ Multijoueur (salles en ligne avec des amis ou des joueurs aléatoires).
- ✔ Mode personnalisé avec des règles définies par l'hôte.
- ✔ Système de rôles : Chaque joueur a un rôle unique tel que Marin, Pirate ou Sirène.
- ✔ Mises à jour en temps réel : Utilisation de WebSockets pour synchroniser les joueurs et l’état du jeu.
- ✔ Interface moderne et responsive : Conçue avec TailwindCSS, optimisée pour desktop & mobile.
- ✔ Backend robuste : Gestion des salles, des joueurs et des états du jeu avec Prisma et Supabase.
- ✔ Déconnexion automatique : Lorsqu'un joueur ferme sa fenêtre, il est automatiquement retiré de la salle.

## 📂Structure du projet

```plaintext
ICO-CARD-GAME/
├── .next/                  # Build Next.js
├── node_modules/           # Dépendances npm
├── prisma/                 # Base de données Prisma
├── public/                 # Assets publics (icônes, images, etc.)
├── src/
│   ├── app/                # Pages principales (Next.js)
│   │   ├── api/            # API Routes Next.js
│   │   ├── bonus/          # Pages de bonus et récompenses
│   │   ├── bug-report/     # Page pour signaler un bug
│   │   ├── contact/        # Page de contact
│   │   ├── dashboard/      # Tableau de bord utilisateur
│   │   ├── game/           # Gestion des parties de jeu
│   │   │   ├── createpartie/                  # Création de partie
│   │   │   ├── identification-sirene/         # Identification des sirènes
│   │   │   ├── partie/                         # Partie en cours
│   │   │   ├── rooms/                          # Gestion des salles
│   │   │   │   ├── [roomcode]/                # Salles spécifiques aux parties
│   │   │   │   │   ├── choix-action-membres/  # Sélection des actions des membres
│   │   │   │   │   ├── choix-action-revelation/  # Révélation des actions
│   │   │   │   │   ├── choix-action-spectateur/  # Affichage des actions aux spectateurs
│   │   │   │   │   ├── choix-capitaines/      # Sélection du capitaine
│   │   │   │   │   ├── components/            # Composants spécifiques aux salles
│   │   │   │   │   ├── distribution-roles/    # Distribution des rôles (Pirate, Marin, Sirène)
│   │   │   │   │   ├── selection-equipage-capitaine/  # Sélection de l'équipage par le capitaine
│   │   │   │   │   ├── vote-equipage/         # Vote pour accepter ou refuser l'équipage
│   │   │   │   │   ├── victoire/              # Gestion de la fin de partie et victoire
│   │   │   │   │   ├── page.tsx               # Page principale de la salle
│   │   │   │   │   ├── players.tsx            # Liste des joueurs
│   │   ├── profile/         # Page de profil utilisateur
│   │   ├── register/        # Page d'inscription
│   │   ├── regles/          # Règles du jeu
│   │   ├── signin/          # Page de connexion
│   │   ├── _app.tsx         # Point d'entrée Next.js
│   │   ├── layout.tsx       # Layout global de l'application
│   │   ├── page.tsx         # Page principale
│   │   ├── globals.css      # Styles globaux
│   ├── components/          # Composants réutilisables
│   ├── context/             # Gestion du state global (React Context)
│   ├── lib/                 # WebSocket client, Prisma, Supabase
│   ├── services/            # Gestion des API
│   ├── types/               # Types TypeScript
│   ├── utils/               # Fonctions utilitaires
│   ├── tests/               # Fichiers de tests
├── .env.local               # Variables d'environnement
├── .gitignore               # Fichiers ignorés par Git
├── eslint.config.mjs        # Configuration ESLint
├── message.js               # Gestion des messages WebSocket
├── middleware.ts            # Middleware de Next.js
├── prismaClient.ts          # Configuration Prisma
├── package.json             # Dépendances et scripts NPM
├── package-lock.json        # Fichier de verrouillage npm
├── postcss.config.mjs       # Configuration PostCSS
├── README.md                # Documentation du projet
├── server.js                # Serveur WebSocket
├── tailwind.config.ts       # Configuration TailwindCSS
├── tsconfig.json            # Configuration TypeScript
└── tsconfig.tsbuildinfo     # Build cache TypeScript
```

# 📦 Installation

## Prérequis
- Node.js v18+
- npm ou yarn
- PostgreSQL (via Supabase)

## Étapes d'installation

Clonez le projet :

```bash
git clone https://github.com/ibrahima-eemi/ico-card-game.git
cd ico-card-game
```

Installez les dépendances :

```bash
npm install
# ou avec yarn
yarn install
```

Créez un fichier `.env.local` et ajoutez-y les clés nécessaires :

```env
# WebSocket
NEXT_PUBLIC_WEBSOCKET_URL="ws://localhost:5000"

# API
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://shddkejukrddghgmddmb.supabase.co"

NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoZGRrZWp1a3JkZGdoZ21kZG1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NzczMTUsImV4cCI6MjA1MjM1MzMxNX0.iSuYjhzTSfYoPMw7Gggsudc_imNR22x-SOgRH8uVAK0"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoZGRrZWp1a3JkZGdoZ21kZG1iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjc3NzMxNSwiZXhwIjoyMDUyMzUzMzE1fQ.h0BKZBdbFHkeYEu_SJKyoK9I4zEtcIkXe4zoG_cceAc"


# Database (Prisma)
DATABASE_URL="postgresql://postgres.shddkejukrddghgmddmb:Randorisec69*@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.shddkejukrddghgmddmb:Randorisec69*@aws-0-us-west-1.pooler.supabase.com:5432/postgres"

EMAIL_APP_USER="alex2709.meme@gmail.com"
EMAIL_APP_PASSWORD="cmob kiwc sbdf ebkf"

```

## Initialisation de la base de données

```bash
npx prisma migrate dev --name init_schema
npx prisma generate
npx prisma validate
```

Lancez le projet en mode développement :

```bash
npm run dev
```

Accédez à l'application : [http://localhost:3000](http://localhost:3000)

# 🖥️ Scripts disponibles

### Démarrer le serveur en dev 🛠️

```bash
npm run dev
```

### Build de production 🚀

```bash
npm run build
```

### Vérifier la qualité du code avec ESLint 📝

```bash
npm run lint
```

### Vérifier les types TypeScript 🏗️

```bash
npm run type-check
```

# ⚙️ Backend & API Routes

## Prisma & Supabase

Prisma gère les modèles de données et la connexion à Supabase (PostgreSQL). Chaque joueur et chaque salle est stocké et géré en base de données.

## Routes API

| Méthode | Endpoint       | Description               |
|---------|----------------|---------------------------|
| POST    | /api/rooms     | Créer une nouvelle salle  |
| GET     | /api/rooms     | Récupérer toutes les salles|
| POST    | /api/rooms/join| Rejoindre une salle       |

## Serveur WebSocket

- Gestion des salles en temps réel.
- Chaque joueur est ajouté et retiré dynamiquement.
- Mise à jour automatique de la liste des joueurs.
- Gestion des déconnexions automatiques.

# 🧪 Tests WebSocket

Vous pouvez tester la connexion au serveur WebSocket avec wscat :

```bash
wscat -c ws://localhost:5000
```

## Rejoindre une salle

```json
{"type": "JOIN_ROOM", "roomCode": "ABC123", "username": "Ibra"}
```

Réponse attendue :

```json
{"type": "ROOM_UPDATE", "players": [{"username": "Ibra"}]}
```

## Envoyer un message dans la salle

```json
{"type": "SEND_MESSAGE", "roomCode": "ABC123", "message": "Hello!"}
```

Réponse attendue :

```json
{"type":"NEW_MESSAGE","sender":"Ibra","message":"Hello!"}
```

## Déconnexion d'un joueur

```json
{"type": "LEAVE_ROOM", "roomCode": "ABC123", "username": "Ibra"}
```

Réponse attendue :

```json
{"type":"ROOM_UPDATE","players":[]}
```

# 📅 Fonctionnalités à venir

- ✅ Ajout d'un mode spectateur pour les joueurs éliminés.
- ✅ Implémentation d'un chat en temps réel entre les joueurs.
- ✅ Système de statistiques pour suivre l'historique des parties.
- ✅ Ajout d'une IA pour un mode solo.

# 🤝 Contribution

Les contributions sont les bienvenues ! 🛠️ Si vous avez une amélioration ou souhaitez corriger un bug, ouvrez une issue ou une pull request.

## Comment contribuer

1. Fork le projet.
2. Créez une nouvelle branche :

    ```bash
    git checkout -b feature/ma-fonctionnalite
    ```

3. Faites vos modifications et committez :

    ```bash
    git commit -m "Ajout de ma nouvelle fonctionnalité"
    ```

4. Poussez votre branche :

    ```bash
    git push origin feature/ma-fonctionnalite
    ```

5. Ouvrez une Pull Request et proposez vos changements.

# 📄 Licence

Ce projet est sous licence MIT. Consultez le fichier LICENSE pour plus de détails.

# 👨‍💻 Auteurs

- Ibrahima DIALLO
- Sebastian ONISE
- Damien DA SILVA
- Alexandre MEME

🚀 Amusez-vous bien avec ICO Card Game ! 🃏