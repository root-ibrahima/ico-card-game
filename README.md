# ICO Card Game 🎮

Un jeu de cartes interactif et stratégique inspiré des jeux de rôle comme Loup-Garou. Ce projet est développé avec Next.js, Prisma, WebSocket, et d'autres technologies modernes pour offrir une expérience de jeu fluide et immersive.

## 🚀 Fonctionnalités principales

### Modes de jeu

- Multijoueur (salle en ligne avec des amis ou des joueurs aléatoires).
- Mode personnalisé avec des règles définies par l'hôte.
- Système de rôles : Chaque joueur a un rôle unique tel que marin, pirate, ou sirène.
- Temps réel : Utilisation des WebSockets pour permettre des mises à jour instantanées (nouveaux joueurs, mises à jour des rôles, etc.).
- Interface utilisateur moderne : Conçue avec TailwindCSS et optimisée pour les écrans desktop et mobile.
- Backend robuste : Gestion des salles, des joueurs et des états de jeu en temps réel via Prisma et Supabase.

## 📂 Structure du projet

```plaintext
ico-card-game/
├── public/                 # Assets publics (icônes, images, etc.)
├── src/
│   ├── app/                # Pages principales (Next.js structure)
│   │   ├── game/           # Pages liées au jeu
│   │   ├── api/            # Routes API pour la gestion des salles
│   ├── components/         # Composants réutilisables (Navbar, GameBoard, etc.)
│   ├── context/            # Contexte global pour la gestion du jeu
│   ├── lib/                # Prisma client et outils WebSocket
│   ├── services/           # Services pour gérer les interactions avec l'API
│   └── utils/              # Fichiers utilitaires
├── prisma/                 # Configuration Prisma
│   ├── schema.prisma       # Modèles de base de données
│   └── migrations/         # Fichiers de migration
├── .env.local              # Variables d'environnement
├── package.json            # Dépendances et scripts NPM
├── tsconfig.json           # Configuration TypeScript
├── tailwind.config.js      # Configuration TailwindCSS
└── README.md               # Documentation du projet
```

## 📦 Installation

### Prérequis

- Node.js v18+
- npm ou yarn
- Une base de données PostgreSQL (gérée ici avec Supabase).

### Étapes d'installation

Cloner le projet :

```bash
git clone https://github.com/ibrahima-eemi/ico-card-game.git
cd ico-card-game
```

Installer les dépendances :

```bash
npm install
# ou avec yarn
yarn install
```

Configurer les variables d'environnement : Créez un fichier `.env.local` à la racine du projet et ajoutez-y les clés nécessaires :

```env
# WebSocket URL
NEXT_PUBLIC_WEBSOCKET_URL="ws://localhost:5000"

# API URL
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://shddkejukrddghgmddmb.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoZGRrZWp1a3JkZGdoZ21kZG1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NzczMTUsImV4cCI6MjA1MjM1MzMxNX0.iSuYjhzTSfYoPMw7Gggsudc_imNR22x-SOgRH8uVAK0"

# Database (Prisma)
DATABASE_URL="postgresql://postgres.shddkejukrddghgmddmb:Randorisec69*@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.shddkejukrddghgmddmb:Randorisec69*@aws-0-us-west-1.pooler.supabase.com:5432/postgres"

# NextAuth
NEXTAUTH_SECRET="secret"
```

Configurer Prisma : Synchronisez les modèles Prisma avec la base de données :

```bash
npx prisma migrate dev
```

Générer le client Prisma :

```bash
npx prisma generate
```

Vérifier le schéma Prisma :

```bash
npx prisma validate
```

Démarrer le projet en mode développement :

```bash
npm run dev
```

Accéder à l'application : Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🖥️ Scripts disponibles

Démarrer le serveur de développement :

```bash
npm run dev
```

Build de production :

```bash
npm run build
```

Linter avec ESLint :

```bash
npm run lint
```

Vérification des types TypeScript :

```bash
npm run type-check
```

## ⚙️ Fonctionnalités Backend

Le backend est géré via un serveur WebSocket qui permet une communication en temps réel.

### Prisma

Gère les modèles de données et les interactions avec la base de données.

### Routes API

- `POST /api/rooms` : Créer une nouvelle salle.
- `GET /api/rooms` : Récupérer toutes les salles.
- `POST /api/rooms/join` : Rejoindre une salle existante.

### Serveur WebSocket

Permet la gestion en temps réel des joueurs et des mises à jour des salles.

## 🧪 Tests WebSocket

Le projet inclut un serveur WebSocket pour gérer les salles et la communication en temps réel. Voici comment tester ces fonctionnalités.

![alt text](image.png)

1. Connexion au serveur WebSocket
    Utilisez wscat pour vous connecter au serveur WebSocket :

    ```bash
    wscat -c ws://localhost:4000
    ```

2. Rejoindre une salle
    Envoyez un message pour rejoindre une salle spécifique :

    ```json
    {"type": "JOIN_ROOM", "roomCode": "test-room"}
    ```

    Réponse attendue :

    ```json
    {"type":"ROOM_JOINED","message":"Vous avez rejoint la salle test-room"}
    ```

3. Envoyer un message dans la salle

    ```json
    {"type": "SEND_MESSAGE", "roomCode": "test-room", "payload": {"content": "Bonjour à tous !"}}
    ```

    Réponse attendue :

    ```json
    {"type":"MESSAGE_RECEIVED","payload":{"content":"Bonjour à tous !"}}
    ```

4. Envoyer un message non valide

    ```plaintext
    kk
    ```

    Réponse attendue :

    ```json
    {"type":"ERROR","message":"Le message doit être un JSON valide."}
    ```

## 🚀 Fonctionnalités futures

- Ajouter un mode spectateur pour les joueurs éliminés.
- Implémenter un chat en temps réel entre les joueurs.
- Ajout d'une IA pour un mode solo.
- Système de statistiques pour les joueurs et les parties.

## 🤝 Contribution

Les contributions sont les bienvenues ! Si vous avez une idée ou souhaitez corriger un bug, n'hésitez pas à ouvrir une issue ou une pull request.

### Étapes pour contribuer

1. Forkez le dépôt.
2. Créez une nouvelle branche :

    ```bash
    git checkout -b feature/ma-nouvelle-fonctionnalite
    ```

3. Faites vos modifications.
4. Commitez vos changements :

    ```bash
    git commit -m "Ajout de ma nouvelle fonctionnalité"
    ```

5. Poussez la branche :

    ```bash
    git push origin feature/ma-nouvelle-fonctionnalite
    ```

6. Ouvrez une pull request.

## 📄 Licence

Ce projet est sous licence MIT. Consultez le fichier LICENSE pour plus de détails.

## 👨‍💻 Auteurs

- [Ibrahima DIALLO](https://github.com/ibrahima-eemi)
- Sebastian ONISE
- Damien DA SILVA
- Alexandre MEME
