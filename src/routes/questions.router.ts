/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import QuestionsController from "@/controllers/questions.controller";
import QuestionsService from "@/services/questions.service";
import QuizzesService from "@/services/quizzes.service";
import { AppDataSource } from "@/data-source";
import authenticate from "@/middlewares/authenticate";
import logger from "@/config/logger";
import { QuestionCreateValidator } from "@/validators/questions.validator";
import { Quiz } from "@/entity/Quiz";
import { Question } from "@/entity/Question";

const router = Router();

const questionsRepository = AppDataSource.getRepository(Question);
const quizzesRepository = AppDataSource.getRepository(Quiz);
const questionsService = new QuestionsService(questionsRepository);
const quizzesService = new QuizzesService(quizzesRepository);

const questionsController = new QuestionsController(
  questionsService,
  quizzesService,
  logger,
);

router.post(
  "/",
  authenticate,
  QuestionCreateValidator,
  questionsController.create.bind(questionsController),
);

router.get(
  "/",
  authenticate,
  questionsController.findAll.bind(questionsController),
);

router.get(
  "/:id",
  authenticate,
  questionsController.findOne.bind(questionsController),
);

router.put(
  "/:id",
  authenticate,
  questionsController.update.bind(questionsController),
);

router.delete(
  "/:id",
  authenticate,
  questionsController.delete.bind(questionsController),
);

export default router;
