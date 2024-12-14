FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Étape de production avec Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Configuration Nginx pour le routage React
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 