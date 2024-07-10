FROM node:18.20.4

COPY ./carecentive-framework /src/carecentive-framework
COPY ./carecentive-core /src/carecentive-core
WORKDIR /src/carecentive-framework

RUN npm install --prefix ../carecentive-core
RUN npm install ../carecentive-core
RUN npm install

CMD npx knex migrate:latest
CMD npm start
