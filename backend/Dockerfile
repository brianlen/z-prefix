FROM node:alpine

WORKDIR /backend

COPY package*.json /backend

RUN npm install
RUN npm install --save-dev nodemon
RUN npm install express knex pg cors bcryptjs

COPY . .

EXPOSE 8080

CMD ["npm", "start", "&&", "npx knex migrate:latest", "&&", "npx knex seed:run"]