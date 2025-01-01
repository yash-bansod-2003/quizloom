import "reflect-metadata";
import { DataSource } from "typeorm";
import configuration from "./config/configuration.js";
import path from "path";

const __dirname = path.resolve();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: configuration.database.host,
  port: parseInt(configuration.database.port ?? "5432"),
  username: configuration.database.user,
  password: configuration.database.password,
  database: configuration.database.database,
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, "src", "models/**/*.{js,ts}")],
  migrations: [path.join(__dirname, "src", "migrations/**/*.{js,ts}")],
  subscribers: [],
});
