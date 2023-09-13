FROM node:18.17.1-alpine3.18

WORKDIR /nodejs-app

COPY . .
RUN npm install

RUN npm run build

ENTRYPOINT node dist/main