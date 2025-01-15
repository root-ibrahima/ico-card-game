# ICO Card Game 🎮

Un jeu de cartes interactif et stratégique inspiré des jeux de rôle comme Loup-Garou. Ce projet est développé avec Next.js, WebSocket, et d'autres technologies modernes pour offrir une expérience de jeu fluide et immersive.

## 🚀 Fonctionnalités principales

### Modes de jeu

- Multijoueur (salle en ligne avec des amis ou des joueurs aléatoires).
- Mode personnalisé avec des règles définies par l'hôte.
- Système de rôles : Chaque joueur a un rôle unique tel que marin, pirate, ou sirène.
- Temps réel : Utilisation des WebSockets pour permettre des mises à jour instantanées (nouveaux joueurs, mises à jour des rôles, etc.).
- Interface utilisateur moderne : Conçue avec TailwindCSS et optimisée pour les écrans desktop et mobile.
- Backend robuste : Gestion des salles, des joueurs et des états de jeu en temps réel.

## 📂 Structure du projet

```plaintext
ico-card-game/
├── public/                 # Assets publics (icônes, images, etc.)
├── src/
│   ├── app/                # Pages principales (Next.js structure)
│   │   ├── game/           # Pages liées au jeu
│   │   ├── api/            # Routes API pour WebSocket et gestion des salles
│   ├── components/         # Composants réutilisables (Navbar, GameBoard, etc.)
│   ├── context/            # Contexte global pour la gestion du jeu
│   ├── styles/             # Fichiers CSS et Tailwind
│   ├── backend/            # Serveur WebSocket et logique backend
│   └── utils/              # Utilitaires (Socket, constantes, helpers, etc.)
├── README.md               # Documentation du projet
├── package.json            # Dépendances et scripts NPM
├── tsconfig.json           # Configuration TypeScript
├── tailwind.config.js      # Configuration TailwindCSS
└── next.config.js          # Configuration Next.js
```

## 📦 Installation

### Prérequis

- Node.js v18+
- npm ou yarn
- Une base de données (optionnel selon votre configuration).

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

```bash
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:5000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
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

### Serveur WebSocket

Géré via `ws` pour créer des salles et gérer les joueurs en temps réel.

### API Endpoints

- `POST /api/rooms/create` : Créer une nouvelle salle.
- `POST /api/rooms/join` : Rejoindre une salle existante.
- `GET /api/rooms` : Liste des salles.

## 🛠️ Technologies utilisées

### Frontend

- Next.js : Framework React moderne.
- TailwindCSS : Framework CSS pour une interface utilisateur stylée.
- TypeScript : Typage statique pour des applications robustes.

### Backend

- WebSocket : Gestion des communications en temps réel.
- Express.js : API REST pour gérer les salles et les joueurs.

### Autres

- ESLint & Prettier : Pour maintenir un code propre et uniforme.
- Heroicons : Icônes SVG modernes.

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [WebSocket Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 🚀 Fonctionnalités futures

- Ajouter un mode spectateur pour les joueurs éliminés.
- Implémenter un chat en temps réel entre les joueurs.
- Ajout d'une IA pour un mode solo.
- Système de statistiques pour les joueurs et les parties.

## 🤝 Contribution

Les contributions sont les bienvenues ! Si vous avez une idée ou souhaitez corriger un bug, n'hésitez pas à ouvrir une issue ou une pull request.

### Étapes pour contribuer

1. Fork le dépôt.
2. Créez une nouvelle branche :

    ```bash
    git checkout -b ma-fonctionnalite
    ```

3. Faites vos modifications.
4. Commitez vos changements :

    ```bash
    git commit -m "Ajout de ma fonctionnalité"
    ```

5. Poussez la branche :

    ```bash
    git push origin ma-fonctionnalite
    ```

6. Ouvrez une pull request.

## 📄 Licence

Ce projet est sous licence MIT. Consultez le fichier LICENSE pour plus de détails.

## 👨‍💻 Auteurs

- [Ibrahima](https://github.com/ibrahima-eemi)
- Sebastian OONISE
- Damien DA SILVA
- Alexandre MEME