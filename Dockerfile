FROM node:20-alpine

WORKDIR /usr/src/nutri_api

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "dev"]