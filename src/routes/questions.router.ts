import { Router } from "express";
import QuestionsController from "@/controllers/questions.controller.js";
import QuestionsService from "@/services/questions.service.js";
import QuizzesService from "@/services/quizzes.service.js";
import { AppDataSource } from "@/data-source.js";
import authenticate from "@/middlewares/authenticate.js";
import logger from "@/config/logger.js";
import { QuestionCreateValidator } from "@/validators/questions.validator.js";
import { Quiz } from "@/models/Quiz.js";
import { Question } from "@/models/Question.js";

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
  async (req, res, next) => {
    await questionsController.create(req, res, next);
  },
);

router.get("/", authenticate, async (req, res, next) => {
  await questionsController.findAll(req, res, next);
});

router.get("/:id", authenticate, async (req, res, next) => {
  await questionsController.findOne(req, res, next);
});

router.put("/:id", authenticate, async (req, res, next) => {
  await questionsController.update(req, res, next);
});

router.delete("/:id", authenticate, async (req, res, next) => {
  await questionsController.delete(req, res, next);
});

export default router;
