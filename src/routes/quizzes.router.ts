/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import QuizzesController from "@/controllers/quizzes.controller";
import QuizzesService from "@/services/quizzes.service";
import UsersService from "@/services/user.service";
import { AppDataSource } from "@/data-source";
import { Quiz } from "@/entity/Quiz";
import authenticate from "@/middlewares/authenticate";
import logger from "@/config/logger";
import { QuizCreateValidator } from "@/validators/quizzes.validator";
import { User } from "@/entity/User";
import Aiservice from "@/services/ai.service";

const router = Router();

const quizzesRepository = AppDataSource.getRepository(Quiz);
const usersRepository = AppDataSource.getRepository(User);
const quizzesService = new QuizzesService(quizzesRepository);
const usersService = new UsersService(usersRepository);
const aiService = new Aiservice();

const quizzesController = new QuizzesController(
  quizzesService,
  usersService,
  aiService,
  logger,
);

router.post(
  "/",
  authenticate,
  QuizCreateValidator,
  quizzesController.create.bind(quizzesController),
);

router.post(
  "/generate",
  authenticate,
  QuizCreateValidator,
  quizzesController.generate.bind(quizzesController),
);

router.get(
  "/",
  authenticate,
  quizzesController.findAll.bind(quizzesController),
);

router.get(
  "/:id",
  authenticate,
  quizzesController.findOne.bind(quizzesController),
);

router.put(
  "/:id",
  authenticate,
  quizzesController.update.bind(quizzesController),
);

router.delete(
  "/:id",
  authenticate,
  quizzesController.delete.bind(quizzesController),
);

export default router;
