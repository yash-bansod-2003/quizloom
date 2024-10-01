/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import QuizzesController from "@/controllers/quizzes.controller";
import QuizzesService from "@/services/quizzes.service";
import UsersService from "@/services/user.service";
import { AppDataSource } from "@/data-source";
import { Quiz } from "@/entity/Quiz";
import authenticate from "@/middlewares/authenticate";
import authorization from "@/middlewares/authorization";
import logger from "@/config/logger";
import { QuizCreateValidator } from "@/validators/quizzes.validator";
import { User } from "@/entity/User";

const router = Router();

const quizzesRepository = AppDataSource.getRepository(Quiz);
const usersRepository = AppDataSource.getRepository(User);
const quizzesService = new QuizzesService(quizzesRepository);
const usersService = new UsersService(usersRepository);
const quizzesController = new QuizzesController(
  quizzesService,
  usersService,
  logger,
);

router.post(
  "/",
  authenticate,
  authorization(["admin", "manager"]),
  QuizCreateValidator,
  quizzesController.create.bind(quizzesController),
);

router.get(
  "/",
  authenticate,
  authorization(["admin", "manager"]),
  quizzesController.findAll.bind(quizzesController),
);

router.get(
  "/:id",
  authenticate,
  authorization(["admin", "manager"]),
  quizzesController.findOne.bind(quizzesController),
);

router.put(
  "/:id",
  authenticate,
  authorization(["admin", "manager"]),
  quizzesController.update.bind(quizzesController),
);

router.delete(
  "/:id",
  authenticate,
  authorization(["admin", "manager"]),
  quizzesController.delete.bind(quizzesController),
);

export default router;
