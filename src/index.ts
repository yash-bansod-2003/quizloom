import "reflect-metadata";
import { Express } from "express";
import { createServer } from "@/server.js";
import configuration from "@/config/configuration.js";
import { AppDataSource } from "@/data-source.js";
import logger from "@/config/logger.js";

const port = configuration.port ? parseInt(configuration.port) : 5000;
const host = configuration.host ?? "localhost";
const server: Express = createServer();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
server.listen(port, host, async () => {
  try {
    await AppDataSource.initialize();
    logger.info(`Server Listening on  http://${host}:${port}`);
  } catch (error: unknown) {
    console.error(error);
    process.exit(1);
  }
});
