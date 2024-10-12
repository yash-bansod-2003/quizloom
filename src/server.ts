import "reflect-metadata";
import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import usersRouter from "@/routes/users.router";
import authRouter from "@/routes/auth.router";
import quizzesRouter from "@/routes/quizzes.router";
import questionsRouter from "@/routes/questions.router";
import answersRouter from "@/routes/answers.router";
import submissionsRouter from "@/routes/submissions.router";
import resultsRouter from "@/routes/results.router";

import globalErrorHandler from "@/middlewares/error-handler";

export const createServer = (): Express => {
  const app = express();
  app
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    .use(helmet({ contentSecurityPolicy: false }))
    .use(morgan("dev"))
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
    .use("/quizzes", quizzesRouter)
    .use("/questions", questionsRouter)
    .use("/answers", answersRouter)
    .use("/submissions", submissionsRouter)
    .use("/results", resultsRouter)
    .use(globalErrorHandler);
  return app;
};
