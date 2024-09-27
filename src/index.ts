import "reflect-metadata";
import { type Express } from "express";
import { createServer } from "@/server";
import configuration from "@/config/configuration";
import { AppDataSource } from "@/data-source";

const port = configuration.port ? parseInt(configuration.port) : 5000;
const host = configuration.host ?? "localhost";
const server: Express = createServer();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
server.listen(port, host, async () => {
  try {
    await AppDataSource.initialize();
    console.log(`Server Listening on port ${port}`);
  } catch (error: unknown) {
    console.error(error);
    process.exit(1);
  }
});
