# SubliwearRH - Application de Gestion RH

Application web de gestion des ressources humaines développée avec la stack MERN (MongoDB, Express, React, Node.js).

## Fonctionnalités

- Gestion des employés
- Pointage et suivi des présences
- Calendrier des absences
- Planification des horaires
- Interface responsive et moderne
- Authentification sécurisée

## Prérequis

- Node.js (v18 ou supérieur)
- Docker et Docker Compose
- Git

## Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/subliwear/SubliwearRH.git
cd SubliwearRH
```

2. Copiez le fichier d'environnement :
```bash
cp .env.example .env
```

3. Modifiez le fichier `.env` avec vos paramètres

4. Lancez l'application avec Docker :
```bash
docker-compose up -d --build
```

## Développement

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## Déploiement

1. Assurez-vous d'avoir Docker et Docker Compose installés sur votre serveur

2. Clonez le dépôt et configurez l'environnement :
```bash
git clone https://github.com/subliwear/SubliwearRH.git
cd SubliwearRH
cp .env.example .env
# Modifiez le fichier .env avec vos paramètres de production
```

3. Lancez l'application :
```bash
docker-compose up -d --build
```

## Structure du Projet

```
SubliwearRH/
├── backend/             # API Node.js/Express
├── frontend/            # Application React
├── docker-compose.yml   # Configuration Docker
├── .env.example        # Exemple de variables d'environnement
└── README.md           # Documentation
```

## Sécurité

- Toutes les routes API sont protégées par JWT
- Les mots de passe sont hashés avec bcrypt
- Les uploads sont sécurisés et filtrés
- CORS configuré pour la production

## Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## License

MIT License 