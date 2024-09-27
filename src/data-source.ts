import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@/entity/User";
import { Restaurant } from "@/entity/Restaurant";
import configuration from "./config/configuration";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: configuration.database.host,
  port: parseInt(configuration.database.port ?? "5432"),
  username: configuration.database.user,
  password: configuration.database.password,
  database: configuration.database.database,
  synchronize: true,
  logging: false,
  entities: [User, Restaurant],
  migrations: [],
  subscribers: [],
});
