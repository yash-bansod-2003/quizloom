/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import AnswersController from "@/controllers/answers.controller";
import AnswersService from "@/services/answers.service";
import QuestionsService from "@/services/questions.service";
import { AppDataSource } from "@/data-source";
import authenticate from "@/middlewares/authenticate";
import logger from "@/config/logger";
import { AnswerCreateValidator } from "@/validators/answers.validator";
import { Question } from "@/entity/Question";
import { Answer } from "@/entity/Answer";

const router = Router();

const answersRepository = AppDataSource.getRepository(Answer);
const questionsRepository = AppDataSource.getRepository(Question);
const answersService = new AnswersService(answersRepository);
const questionsService = new QuestionsService(questionsRepository);

const answersController = new AnswersController(
  answersService,
  questionsService,
  logger,
);

router.post(
  "/",
  authenticate,
  AnswerCreateValidator,
  answersController.create.bind(answersController),
);

router.get(
  "/",
  authenticate,
  answersController.findAll.bind(answersController),
);

router.get(
  "/:id",
  authenticate,
  answersController.findOne.bind(answersController),
);

router.put(
  "/:id",
  authenticate,
  answersController.update.bind(answersController),
);

router.delete(
  "/:id",
  authenticate,
  answersController.delete.bind(answersController),
);

export default router;
