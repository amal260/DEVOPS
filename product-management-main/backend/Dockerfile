# Utilise l'image officielle Node.js
FROM node:18

# Répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Exposer le port utilisé par le backend
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["npm", "start"]
