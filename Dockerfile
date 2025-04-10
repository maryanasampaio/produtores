FROM node:20

# Adiciona cliente do PostgreSQL
RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD bash -c "until pg_isready -h db -p 5432 -U postgres; do sleep 1; done && npm run migration:run && npm run start:dev"
