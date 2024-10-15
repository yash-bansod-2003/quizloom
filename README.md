# Food

This is a repository for the Authentication service of a Food Delivery web application, built using a microservices architecture. The application is designed to be scalable and fault-tolerant, with a focus on providing a seamless user experience.

## Setup Installation

### Typescript

First, install typescript using npm by running the following command

```bash
npm install --save-dev typescript
```

Next, initialize typescript by running the following command

```bash
npx tsc --init
```

### Migrations

To generate the migrations with the help of typeorm

```bash
npm run migration:generate -- src/migrations/migration -d src/data-source.ts
```

To run generated migrations

```bash
npm run migration:run -- -d src/data-source.ts
```
