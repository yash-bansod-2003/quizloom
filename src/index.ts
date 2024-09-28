import "reflect-metadata";
import { Express } from "express";
import { createServer } from "@/server";
import configuration from "@/config/configuration";
import { AppDataSource } from "@/data-source";
import logger from "@/config/logger";

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
