FROM node:alpine

WORKDIR /frontend

COPY package*.json /frontend

RUN npm install react-router-dom

COPY . .

EXPOSE 3000

CMD ["npm", "start"]