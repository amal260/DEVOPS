# Étape 1 : Utilise l'image officielle Node.js pour construire le frontend
FROM node:18 as build

# Définit le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier le reste du code source
COPY . .

# Construire l'application
RUN npm run build

# Étape 2 : Utiliser une image Nginx pour servir l'application
FROM nginx:alpine

# Copier les fichiers construits depuis l'étape précédente
COPY --from=build /app/build /usr/share/nginx/html

# Copier le fichier de configuration Nginx personnalisé (optionnel)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose le port utilisé par Nginx
EXPOSE 80

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
