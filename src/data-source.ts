import "reflect-metadata";
import { DataSource } from "typeorm";
import configuration from "./config/configuration.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: configuration.database.host,
  port: parseInt(configuration.database.port ?? "5432"),
  username: configuration.database.user,
  password: configuration.database.password,
  database: configuration.database.database,
  synchronize: true,
  logging: false,
  entities: ["src/models/**/*.{js,ts}"],
  migrations: ["src/migrations/**/*.{js,ts}"],
  subscribers: [],
});
