FROM node:latest

WORKDIR /app
EXPOSE 80

COPY /dist .
COPY package.json .
COPY package-lock.json .

RUN npm install --omit=dev
ENTRYPOINT [ "node", "./src/index.js" ]