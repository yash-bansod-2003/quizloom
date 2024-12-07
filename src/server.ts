import "reflect-metadata";
import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import usersRouter from "@/routes/users.router.js";
import authRouter from "@/routes/auth.router.js";
import quizzesRouter from "@/routes/quizzes.router.js";
import questionsRouter from "@/routes/questions.router.js";
import answersRouter from "@/routes/answers.router.js";
import submissionsRouter from "@/routes/submissions.router.js";
import resultsRouter from "@/routes/results.router.js";

import globalErrorHandler from "@/middlewares/error-handler.js";

export const createServer = (): Express => {
  const app = express();
  app

    .use(helmet({ contentSecurityPolicy: false }))
    .use(morgan("dev"))
    .use(express.json())
    .use(express.static("public"))
    .get("/status", (_, res) => {
      res.json({ ok: true });
    })
    .get("/message/:name", (req, res) => {
      res.json({ message: `hello ${req.params.name}` });
    })
    .use("/auth", authRouter)
    .use("/users", usersRouter)
    .use("/quizzes", quizzesRouter)
    .use("/questions", questionsRouter)
    .use("/answers", answersRouter)
    .use("/submissions", submissionsRouter)
    .use("/results", resultsRouter)
    .use(globalErrorHandler);
  return app;
};
