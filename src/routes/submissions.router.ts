/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import AnswersService from "@/services/answers.service";
import QuestionsService from "@/services/questions.service";
import { AppDataSource } from "@/data-source";
import authenticate from "@/middlewares/authenticate";
import logger from "@/config/logger";
import { SubmissionCreateValidator } from "@/validators/submissions.validator";
import { Question } from "@/entity/Question";
import { Answer } from "@/entity/Answer";
import { User } from "@/entity/User";
import { Quiz } from "@/entity/Quiz";
import UserService from "@/services/users.service";
import QuizzesService from "@/services/quizzes.service";
import { Submission } from "@/entity/Submission";
import SubmissionsService from "@/services/submissions.service";
import SubmissionsController from "@/controllers/submissions.controller";

const router = Router();

const usersRepository = AppDataSource.getRepository(User);
const quizzesRepository = AppDataSource.getRepository(Quiz);
const questionsRepository = AppDataSource.getRepository(Question);
const answersRepository = AppDataSource.getRepository(Answer);
const submissionsRepository = AppDataSource.getRepository(Submission);

const usersService = new UserService(usersRepository);
const quizzessService = new QuizzesService(quizzesRepository);
const questionsService = new QuestionsService(questionsRepository);
const answersService = new AnswersService(answersRepository);
const submissionsService = new SubmissionsService(submissionsRepository);

const submissionsController = new SubmissionsController(
  submissionsService,
  usersService,
  quizzessService,
  questionsService,
  answersService,
  logger,
);

router.post(
  "/",
  authenticate,
  SubmissionCreateValidator,
  submissionsController.create.bind(submissionsController),
);

router.get(
  "/",
  authenticate,
  submissionsController.findAll.bind(submissionsController),
);

router.get(
  "/:id",
  authenticate,
  submissionsController.findOne.bind(submissionsController),
);

router.delete(
  "/:id",
  authenticate,
  submissionsController.delete.bind(submissionsController),
);

export default router;
