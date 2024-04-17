FROM node:alpine

WORKDIR /frontend

COPY package*.json /frontend

RUN npm install
RUN npm install react-router-dom bcryptjs
RUN npm install @mui/material @emotion/react @emotion/styled @fontsource/roboto

COPY . .

EXPOSE 3000

CMD ["npm", "start"]