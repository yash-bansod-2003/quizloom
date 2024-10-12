/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { AppDataSource } from "@/data-source";
import authenticate from "@/middlewares/authenticate";
import logger from "@/config/logger";
import { ResultCreateValidator } from "@/validators/results.validator";
import { User } from "@/entity/User";
import { Quiz } from "@/entity/Quiz";
import UserService from "@/services/users.service";
import QuizzesService from "@/services/quizzes.service";
import { Result } from "@/entity/Result";
import ResultsService from "@/services/results.service";
import ResultsController from "@/controllers/results.controller";
import { Submission } from "@/entity/Submission";
import SubmissionsService from "@/services/submissions.service";

const router = Router();

const usersRepository = AppDataSource.getRepository(User);
const quizzesRepository = AppDataSource.getRepository(Quiz);
const resultsRepository = AppDataSource.getRepository(Result);
const submissionsRepository = AppDataSource.getRepository(Submission);

const usersService = new UserService(usersRepository);
const quizzessService = new QuizzesService(quizzesRepository);
const resultsService = new ResultsService(resultsRepository);
const submissionsService = new SubmissionsService(submissionsRepository);

const resultsController = new ResultsController(
  resultsService,
  usersService,
  quizzessService,
  submissionsService,
  logger,
);

router.post(
  "/",
  authenticate,
  ResultCreateValidator,
  resultsController.create.bind(resultsController),
);

router.get(
  "/",
  authenticate,
  resultsController.findAll.bind(resultsController),
);

router.get(
  "/:id",
  authenticate,
  resultsController.findOne.bind(resultsController),
);

router.delete(
  "/:id",
  authenticate,
  resultsController.delete.bind(resultsController),
);

export default router;
