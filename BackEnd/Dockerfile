FROM node:20.9.0

WORKDIR /BackEnd

COPY package*.json ./

RUN npm install --force

COPY . .

CMD ["npm", "start"]

EXPOSE 3000
