# 🌾 API de Produtores Rurais

Esta é uma API RESTful desenvolvida em **NestJS** com **TypeORM** e **PostgreSQL**, que permite o cadastro de produtores rurais, suas fazendas, culturas e geração de indicadores agregados.

## 🚀 Como executar

Certifique-se de ter o **Docker** e **Docker Compose** instalados.

### Comando único para subir toda a aplicação:

```bash
docker-compose up --build
```

Isso irá:

Buildar a imagem da aplicação

Subir o container do NestJS

Subir o container do PostgreSQL com o banco produtor_db

Aplicar as migrations automaticamente (se configurado)

A API estará disponível em:
http://localhost:3000

 Exemplos de Requisições
✅ Criar produtor (POST /produtores)

POST http://localhost:3000/produtores

Content-Type: application/json

json
```
{
  "cpfOuCnpj": "12345678900",
  "nomeProdutor": "Maria Oliveira",
  "nomeFazenda": "Fazenda São José",
  "cidade": "Uberlândia",
  "estado": "MG",
  "areaTotal": 100,
  "areaAgricultavel": 60,
  "areaVegetacao": 40,
  "culturas": ["Soja", "Milho"]
}
```
📄 Listar produtores (GET /produtores)

GET http://localhost:3000/produtores
🔍 Buscar produtor por ID (GET /produtores/:id)

GET http://localhost:3000/produtores/f4b6d4dd-a2f6-489a-9c1f-b4a6c4dc408c
❌ Remover produtor (DELETE /produtores/:id)

DELETE http://localhost:3000/produtores/f4b6d4dd-a2f6-489a-9c1f-b4a6c4dc408c
📊 Indicadores (GET /indicadores)
🔢 Total de fazendas

GET http://localhost:3000/indicadores/total-fazendas
🔢 Soma total de hectares

GET http://localhost:3000/indicadores/soma-hectares
📍 Culturas por estado

GET http://localhost:3000/indicadores/culturas-por-estado


🧪 Tecnologias
NestJS

TypeORM

PostgreSQL

Docker & Docker Compose

ESLint / Prettier / Jest

📦 Instalação manual (sem Docker)

```bash
npm install
```
```
npm run build
```
```
npm run start:dev
```
