FROM node:alpine

WORKDIR /backend

COPY package*.json /backend

RUN npm install
RUN npm install -g nodemon
RUN npm install express knex pg cors bcryptjs

COPY . .

EXPOSE 8080

CMD ["npm", "start"]