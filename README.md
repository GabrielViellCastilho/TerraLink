# TerraLink

CRUD de Continentes, Países e Cidades --- TypeScript, Express, React e
PostgreSQL

TerraLink é uma aplicação full-stack desenvolvida em TypeScript,
dividida entre um backend em Express e um frontend em React. O sistema
permite gerenciar continentes, países e cidades, além de integrar
informações externas das APIs World Bank e REST Countries.

## Tecnologias Utilizadas

### Backend

-   TypeScript
-   Node.js + Express
-   Prisma ORM
-   PostgreSQL
-   Docker e Docker Compose (opcional)

### Frontend

-   React + TypeScript
-   Vite\
-   Axios

### APIs Externas

-   World Bank API
-   REST Countries API

## Informações Importantes

-   Ao executar o projeto pela primeira vez, o banco de dados estará
    vazio.\
    Os continentes, países e cidades devem ser cadastrados manualmente
    através da aplicação.

-   No formulário **Create New Country**, o nome do país deve ser
    informado **em inglês**, para que as APIs externas retornem os dados
    corretamente.

-   Alguns campos retornados pela API World Bank, como **GDP per
    Capita** e **Inflation (%)**, podem não estar disponíveis para todos
    os países.\
    Esses campos **não são obrigatórios**.

-   Algumas requisições às APIs externas (principalmente a do World
    Bank) podem demorar alguns segundos.

## Banco de Dados

### 1. Usando Docker Compose (recomendado)

O arquivo `.env.template` já está pré-configurado. Basta renomear para
`.env` e executar o Docker Compose.

``` bash
docker compose up -d
```

### 2. Usando PostgreSQL localmente

Configure sua conexão manualmente no `.env`, por exemplo:

    DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"

## Como Rodar o Projeto

### 1. Clonar o repositório

``` bash
git clone https://github.com/GabrielViellCastilho/TerraLink.git
```

### 2. Backend

``` bash
cd TerraLink
cd backend
mv .env.template .env
```

Configurar o `.env` caso não utilize Docker Compose.

Rodar o Prisma:

``` bash
cd src
npx prisma migrate dev
npx prisma generate
```

Instalar dependências e iniciar:

``` bash
npm install
npm run dev
```

### 3. Frontend

Abrir outro terminal:

``` bash
cd frontend
npm install
npm run dev
```

### 4. Acessar a aplicação

    http://localhost:5173/


## Preview do Projeto

### Backend Preview


### Frontend Preview
