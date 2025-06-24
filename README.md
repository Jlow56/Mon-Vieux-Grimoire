# 📚 Mon Vieux Grimoire — API Backend

Projet 6 du parcours Développeur Web OpenClassrooms.

## 🚀 Présentation

"Mon Vieux Grimoire" est une plateforme de présentation et de notation de livres. Ce dépôt contient le **backend** de l’application, développé en **Node.js** avec **Express** et une base de données **MongoDB**.

## 🧩 Fonctionnalités principales

- Authentification des utilisateurs (signup / login)
- Création, modification, suppression de livres
- Ajout d’une image de couverture pour chaque livre
- Notation des livres par les utilisateurs
- Calcul automatique de la moyenne des notes
- Affichage des 3 livres les mieux notés

---

## 🛠️ Technologies utilisées

- Node.js + Express
- MongoDB + Mongoose
- JSON Web Token (JWT)
- Multer (upload d’image)
- Bcrypt (hachage des mots de passe)
- Helmet (sécurité des headers HTTP)
- Express-validator (validation des entrées utilisateur)
- Sharp (optimisation des images)

---

## 🧠 Cas d’usage

L'application permet à un utilisateur :
    1. de s'inscrire et se connecter de façon sécurisée,
    2. de déposer un livre à vendre avec une image et des détails,
    3. de noter les livres proposés par d'autres utilisateurs,
    4. de consulter les livres les mieux notés.

---

## 🔐 Sécurité mise en place

- **Protection des mots de passe** avec Bcrypt
- **Authentification sécurisée** avec JWT
- **Protection des headers HTTP** avec Helmet
- **Sanitization des entrées utilisateur** avec express-validator
- **Contrôle d'accès** : seules les personnes connectées peuvent noter ou modifier des livres
- **Nettoyage automatique** des images inutilisées lors de la suppression ou modification

---

## ⚙️ Installation du projet

1. Cloner le projet
Assure-toi d'avoir Node.js installé sur ta machine.

```bash
git clone https://github.com/Jlow56/Mon-Vieux-Grimoire.git
cd mon-vieux-grimoire-backend
```

---

2. Installer les dépendances :

```bash
npm install bcryptjs cors dotenv express express-validator jsonwebtoken mongodb mongoose mongoose-unique-validator multer sharp
npm install --save-dev nodemon sharp-cli
```

Description des dépendances principales :

-express : Framework web.

- cors : Permet d'activer les requêtes cross-origin, indispensable pour la communication entre frontend et backend sur des domaines différents.

- dotenv : Permet de charger les variables d’environnement depuis un fichier .env pour configurer ton application (ex: clés secrètes, port).

- express-validator : Outil pour valider et nettoyer les données reçues dans les requêtes HTTP.

- jsonwebtoken : Permet de créer et vérifier des tokens JWT pour l’authentification sécurisée.

- bcryptjs : Utilisé pour hasher et vérifier les mots de passe des utilisateurs.

- mongodb et mongoose : Bibliothèques pour gérer la connexion et les opérations avec une base de données MongoDB, mongoose simplifie la manipulation des données via un ORM.

- mongoose-unique-validator : Plugin Mongoose pour garantir l’unicité de certains champs dans la base de données.

- multer : Middleware pour gérer l’upload de fichiers (images, documents, etc.) dans les requêtes HTTP.

- sharp et sharp-cli : Librairie et outil en ligne de commande pour manipuler et optimiser les images (redimensionnement, compression).

- nodemon (dev) : Redémarrage automatique du serveur en dev.

---

3. Configurer les variables d’environnement :
Créer un fichier .env à la racine avec les variables suivantes :
env

### Database info connection

DB_USER = "username"
DB_PASSWORD = "password"
DB_CLUSTER = "databasename"

DB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/monvieuxgrimoire
TOKEN_SECRET=VotreCléSecrèteJWT
🛑 Ne pas partager ce fichier .env. Il contient des informations sensibles.

---

4. Lancer le serveur backend :

```bash

-> npm run dev pour la version avec nodemon
->npm satrt pour la version normal

```

📂 Structure du projet

backend/
├── controllers/        # Logique métier (livres, utilisateurs)
├── middlewares/        # Auth, multer, validation
├── models/             # Schémas Mongoose
├── routes/             # Endpoints API REST
├── images/             # Stockage local des images
├── .env                # Configuration environnement (à créer)
├── app.js              # App Express
└── server.js           # Démarrage du serveur

🧪 Routes principales de l'API
Méthode Endpoint Description
POST /api/auth/signup : Inscription utilisateur
POST /api/auth/login : Connexion utilisateur
GET /api/books : Liste des livres
POST /api/books : Ajouter un livre
GET /api/books/:id : Détail d’un livre
PUT /api/books/:id : Modifier un livre
DELETE /api/books/:id : Supprimer un livre
POST /api/books/:id/rating : Noter un livre
GET /api/books/bestrating : Top 3 des livres les mieux notés
