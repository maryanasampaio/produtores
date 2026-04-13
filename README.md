# API de Produtores Rurais

API REST desenvolvida com NestJS, TypeORM e PostgreSQL para cadastro de produtores rurais, fazendas, culturas plantadas e consulta de indicadores agregados.

## Funcionalidades

- Cadastro de produtores rurais
- Consulta, atualização e remoção lógica de produtores
- Validação de CPF ou CNPJ
- Validação da soma das áreas da fazenda
- Listagem paginada de produtores
- Indicadores agregados por fazendas, hectares e culturas por estado
- Rate limiting global para proteção básica contra abuso

## Tecnologias

- NestJS
- TypeORM
- PostgreSQL
- Docker e Docker Compose
- Class Validator e Class Transformer
- Jest
- ESLint e Prettier

## Requisitos

- Node.js 20 ou superior
- npm
- Docker e Docker Compose, se optar pela execução em containers
- PostgreSQL, se optar pela execução local sem Docker

## Configuração de ambiente

Use o arquivo .env.example como base para criar o seu .env.

Exemplo de variáveis:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=sua_senha_aqui
DB_NAME=produtores
THROTTLE_TTL_MS=60000
THROTTLE_LIMIT=20
```

Descrição das variáveis:

| Variável | Descrição |
| --- | --- |
| DB_HOST | Host do PostgreSQL |
| DB_PORT | Porta do PostgreSQL |
| DB_USER | Usuário do banco |
| DB_PASS | Senha do banco |
| DB_NAME | Nome do banco |
| THROTTLE_TTL_MS | Janela de tempo do rate limit em milissegundos |
| THROTTLE_LIMIT | Quantidade máxima de requisições por janela |

## Como executar com Docker

Comando para subir toda a aplicação:

```bash
docker compose up --build
```

Esse fluxo:

- cria a imagem da API em modo de produção
- sobe o banco PostgreSQL
- aguarda o banco ficar saudável antes de iniciar a API
- inicia a aplicação na porta 3000

Base URL:

```text
http://localhost:3000
```

## Como executar localmente

1. Instale as dependências:

```bash
npm install
```

2. Garanta que o PostgreSQL esteja rodando e configurado com os valores do .env.

3. Execute as migrations:

```bash
npm run migration:run
```

4. Inicie a aplicação em desenvolvimento:

```bash
npm run start:dev
```

Se quiser validar a compilação antes de subir a aplicação:

```bash
npm run build
```

## Scripts úteis

```bash
npm run start:dev
npm run build
npm run start:prod
npm run migration:run
npm run test
npm run test:cov
npm run lint
```

## Regras de negócio principais

- CPF ou CNPJ deve ser válido
- área agricultável + área de vegetação não pode ser maior que a área total
- campos textuais são normalizados na entrada
- estado é armazenado em maiúsculas
- exclusão de produtor é feita com soft delete

## Endpoints

### Produtores

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | /produtores | Cria um produtor |
| GET | /produtores | Lista produtores com paginação |
| GET | /produtores/:id | Busca um produtor por id |
| PUT | /produtores/:id | Atualiza um produtor |
| DELETE | /produtores/:id | Remove um produtor com soft delete |

### Indicadores

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | /indicadores/total-fazendas | Retorna o total de fazendas cadastradas |
| GET | /indicadores/soma-hectares | Retorna a soma total de hectares |
| GET | /indicadores/culturas-por-estado | Retorna culturas agrupadas por estado |

## Exemplo de criação de produtor

Requisição:

```http
POST /produtores
Content-Type: application/json
```

```json
{
  "cpfOuCnpj": "529.982.247-25",
  "nomeProdutor": "Maria Oliveira",
  "nomeFazenda": "Fazenda Sao Jose",
  "cidade": "Uberlandia",
  "estado": "mg",
  "areaTotal": 100,
  "areaAgricultavel": 60,
  "areaVegetacao": 40,
  "culturas": ["Soja", "Milho"]
}
```

## Exemplo de listagem paginada

Requisição:

```http
GET /produtores?page=1&limit=10
```

Resposta:

```json
{
  "data": [
    {
      "id": "8bbf05b5-4fcf-4897-9fc2-c1f02ef0b6b8",
      "cpfOuCnpj": "52998224725",
      "nomeProdutor": "Maria Oliveira",
      "nomeFazenda": "Fazenda Sao Jose",
      "cidade": "Uberlandia",
      "estado": "MG",
      "areaTotal": 100,
      "areaAgricultavel": 60,
      "areaVegetacao": 40,
      "culturas": ["Soja", "Milho"],
      "criadoEm": "2026-04-13T00:00:00.000Z",
      "atualizadoEm": "2026-04-13T00:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

## Testes

Executar todos os testes:

```bash
npm test
```

Executar cobertura:

```bash
npm run test:cov
```

Executar um teste específico:

```bash
npm test -- --runTestsByPath src/produtores/produtores.service.spec.ts
```

## Observações

- O schema do banco é controlado por migrations
- O synchronize do TypeORM está desabilitado
- A listagem de produtores usa paginação com page e limit
- O projeto possui limitação global de requisições configurável por ambiente
