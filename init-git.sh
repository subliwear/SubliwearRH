#!/bin/bash

echo "Initialisation du dépôt Git pour SubliwearRH..."

# Initialiser le dépôt Git
git init

# Ajouter l'origine distante
git remote add origin https://github.com/subliwear/SubliwearRH.git

# Créer les fichiers nécessaires s'ils n'existent pas
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "Fichier .env créé à partir de .env.example"
fi

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit: Setup MERN stack application with Docker"

# Pousser vers GitHub
echo "Poussée vers GitHub..."
git push -u origin main

echo "Terminé ! Le projet a été initialisé et poussé vers GitHub." 