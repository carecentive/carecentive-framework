FROM node:18.20.4

COPY ./carecentive-framework /src/carecentive-framework
COPY ./carecentive-core /src/carecentive-core
WORKDIR /src/carecentive-framework

CMD ["sh", "-c", "npm install --prefix ../carecentive-core && npm install ../carecentive-core && npm install && npx knex migrate:latest && npm start"]
