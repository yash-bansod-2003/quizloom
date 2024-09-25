import { type Express } from "express";
import { createServer } from "@/server";
import configuration from "./config/configuration";

const port = configuration.port ? parseInt(configuration.port) : 5000;
const host = configuration.host ?? "localhost";

const server: Express = createServer();

server.listen(port, host, () => {
  try {
    console.log(`Server Listening on port ${port}`);
  } catch (error: unknown) {
    console.error(error);
    process.exit(1);
  }
});
