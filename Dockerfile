FROM node:latest

WORKDIR /app
EXPOSE 80

COPY package.json .
COPY package-lock.json .

RUN npm install --omit=dev

COPY /dist/src .

ENTRYPOINT [ "node", "./index.js" ]