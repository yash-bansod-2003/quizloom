import { createLogger, transports, format } from "winston";
import configuration from "@/config/configuration.js";

const logger = createLogger({
  level: "info",
  defaultMeta: { serviceName: "templete" },
  transports: [
    new transports.Console({
      level: "debug",
      format: format.combine(format.timestamp(), format.simple()),
      silent: configuration.node_env === "test",
    }),
    new transports.File({
      dirname: "logs",
      filename: "combined.log",
      level: "info",
      format: format.combine(format.timestamp(), format.simple()),
      silent:
        configuration.node_env === "test" ||
        configuration.node_env === "development",
    }),
    new transports.File({
      dirname: "logs",
      filename: "errors.log",
      level: "error",
      format: format.combine(format.timestamp(), format.simple()),
      silent: configuration.node_env === "test",
    }),
  ],
});

export default logger;
