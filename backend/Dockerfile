FROM node:alpine

WORKDIR /backend

COPY package*.json /backend

RUN npm install express knex pg

COPY . .

EXPOSE 8080

CMD ["npm", "start"]