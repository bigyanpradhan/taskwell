FROM node:20-alpine

RUN addgroup app && adduser -S -G app app

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN chown app:app /app

USER app

EXPOSE 8000

CMD ["npm", "start"]