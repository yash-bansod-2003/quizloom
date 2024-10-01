/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import QuestionsController from "@/controllers/questions.controller";
import QuestionsService from "@/services/questions.service";
import QuizzesService from "@/services/quizzes.service";
import { AppDataSource } from "@/data-source";
import authenticate from "@/middlewares/authenticate";
import authorization from "@/middlewares/authorization";
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
  authorization(["admin", "manager"]),
  QuestionCreateValidator,
  questionsController.create.bind(questionsController),
);

router.get(
  "/",
  authenticate,
  authorization(["admin", "manager"]),
  questionsController.findAll.bind(questionsController),
);

router.get(
  "/:id",
  authenticate,
  authorization(["admin", "manager"]),
  questionsController.findOne.bind(questionsController),
);

router.put(
  "/:id",
  authenticate,
  authorization(["admin", "manager"]),
  questionsController.update.bind(questionsController),
);

router.delete(
  "/:id",
  authenticate,
  authorization(["admin", "manager"]),
  questionsController.delete.bind(questionsController),
);

export default router;
