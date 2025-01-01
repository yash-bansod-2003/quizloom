import { Router } from "express";
import AnswersService from "@/services/answers.service.js";
import QuestionsService from "@/services/questions.service.js";
import { AppDataSource } from "@/data-source.js";
import authenticate from "@/middlewares/authenticate.js";
import logger from "@/config/logger.js";
import { SubmissionCreateValidator } from "@/validators/submissions.validator.js";
import { Question } from "@/models/Question.js";
import { Answer } from "@/models/Answer.js";
import { User } from "@/models/User.js";
import { Quiz } from "@/models/Quiz.js";
import UserService from "@/services/users.service.js";
import QuizzesService from "@/services/quizzes.service.js";
import { Submission } from "@/models/Submission.js";
import SubmissionsService from "@/services/submissions.service.js";
import SubmissionsController from "@/controllers/submissions.controller.js";

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
  async (req, res, next) => {
    await submissionsController.create(req, res, next);
  },
);

router.get("/", authenticate, async (req, res, next) => {
  await submissionsController.findAll(req, res, next);
});

router.get("/:id", authenticate, async (req, res, next) => {
  await submissionsController.findOne(req, res, next);
});

router.delete("/:id", authenticate, async (req, res, next) => {
  await submissionsController.delete(req, res, next);
});

export default router;
