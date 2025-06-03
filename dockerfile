FROM node:22-alpine3.19

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

# la seleccion EXPOSE tiene funcionalidad en ciertos casos, por ejemplo si hay un docker-compose.yml la seleccion EXPOSE 
# deja de "funcionar" o pasa a un segundo plano. Puede ser simplemente documentacion y/o sistema de comunicacion interna.
# EXPOSE 8888: puedo incluirlo o no y sigue funcionando.

ENV DATABASE_URL=file:./dev.db

RUN npx prisma migrate dev
RUN npx prisma generate

EXPOSE 3000

# se pueden definir variables de entorno en el dockerfile y tambien en el docker-compose.yml 
# ENV PORT=3000
