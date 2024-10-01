import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Quiz } from "./entity/Quiz";
import configuration from "./config/configuration";
import { Question } from "./entity/Question";
import { Answer } from "./entity/Answer";
import { Submission } from "./entity/Submission";
import { Result } from "./entity/Result";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: configuration.database.host,
  port: parseInt(configuration.database.port ?? "5432"),
  username: configuration.database.user,
  password: configuration.database.password,
  database: configuration.database.database,
  synchronize: false,
  logging: false,
  entities: [User, Quiz, Question, Answer, Submission, Result],
  migrations: ["src/migration/*.{ts,js}"],
  subscribers: [],
});
