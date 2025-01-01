import { Router } from "express";
import AnswersController from "@/controllers/answers.controller.js";
import AnswersService from "@/services/answers.service.js";
import QuestionsService from "@/services/questions.service.js";
import { AppDataSource } from "@/data-source.js";
import authenticate from "@/middlewares/authenticate.js";
import logger from "@/config/logger.js";
import { AnswerCreateValidator } from "@/validators/answers.validator.js";
import { Question } from "@/models/Question.js";
import { Answer } from "@/models/Answer.js";

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
  async (req, res, next) => {
    await answersController.create(req, res, next);
  },
);

router.get("/", authenticate, async (req, res, next) => {
  await answersController.findAll(req, res, next);
});

router.get("/:id", authenticate, async (req, res, next) => {
  await answersController.findOne(req, res, next);
});

router.put("/:id", authenticate, async (req, res, next) => {
  await answersController.update(req, res, next);
});

router.delete("/:id", authenticate, async (req, res, next) => {
  await answersController.delete(req, res, next);
});

export default router;
