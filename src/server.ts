import "reflect-metadata";
import express, { Express } from "express";
import usersRouter from "@/routes/user.router";
import authRouter from "@/routes/auth.router";
import restaurantsRouter from "@/routes/restaurants.router";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(express.json())
    .use(express.static("public"))
    .get("/status", (_, res) => {
      return res.json({ ok: true });
    })
    .get("/message/:name", (req, res) => {
      res.json({ message: `hello ${req.params.name}` });
    })
    .use("/auth", authRouter)
    .use("/users", usersRouter)
    .use("/restaurants", restaurantsRouter);

  return app;
};
