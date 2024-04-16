FROM node:alpine

WORKDIR /backend

COPY package*.json /backend

RUN npm install express knex pg cors

COPY . .

EXPOSE 8080

RUN npx knex migrate:latest && npx knex seed:run

CMD ["npm", "start"]