import { NextFunction, Request, Response } from "express";
import { Logger } from "winston";
import QuestionsService from "@/services/questions.service.js";
import { CreateQuestionDto, UpdateQuestionDto } from "@/dto/questions.js";
import createHttpError from "http-errors";
import QuizzesService from "@/services/quizzes.service.js";

class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly quizzesService: QuizzesService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      this.logger.info(
        `Creating new question with data: ${JSON.stringify(req.body)}`,
      );
      const { quizId, ...questionData } = req.body as CreateQuestionDto;
      const quiz = await this.quizzesService.findOne({ id: quizId });

      if (!quiz) {
        this.logger.error(`Quiz with id ${quizId} not found`);
        throw createHttpError.NotFound("Quiz not found");
      }

      const question = await this.questionsService.create({
        ...questionData,
        quiz,
      });
      if (!question) {
        this.logger.error("Failed to create question");
        throw createHttpError.InternalServerError("Question not created");
      }

      this.logger.info(`Created new question with id: ${question.id}`);
      return res.status(201).json(question);
    } catch (error) {
      this.logger.error(`Error creating question: ${error}`);
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      this.logger.info("Fetching all questions");
      const questions = await this.questionsService.findAll();
      if (!questions) {
        this.logger.error("Failed to obtain questions");
        throw createHttpError.InternalServerError("Failed to obtain questions");
      }
      return res.json(questions);
    } catch (error) {
      this.logger.error(`Error fetching all questions: ${error}`);
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const questionId = req.params.id;
      this.logger.info(`Fetching question with id: ${questionId}`);
      const question = await this.questionsService.findOne({ id: questionId });

      if (!question) {
        this.logger.error(`Question with id ${questionId} not found`);
        throw createHttpError.NotFound("Question not found");
      }

      return res.json(question);
    } catch (error) {
      this.logger.error(
        `Error fetching question with id ${req.params.id}: ${error}`,
      );
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const questionId = req.params.id;
      this.logger.info(
        `Updating question with id: ${questionId} with data: ${JSON.stringify(req.body)}`,
      );
      const updatedQuestion = await this.questionsService.update(
        { id: questionId },
        req.body as UpdateQuestionDto,
      );

      if (!updatedQuestion) {
        this.logger.error(`Failed to update question with id ${questionId}`);
        throw createHttpError.InternalServerError("Question not updated");
      }

      this.logger.info(`Updated question with id: ${questionId}`);
      return res.json(updatedQuestion);
    } catch (error) {
      this.logger.error(
        `Error updating question with id ${req.params.id}: ${error}`,
      );
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const questionId = req.params.id;
      this.logger.info(`Deleting question with id: ${questionId}`);
      const deletedQuestion = await this.questionsService.delete({
        id: questionId,
      });

      if (!deletedQuestion) {
        this.logger.error(`Failed to delete question with id ${questionId}`);
        throw createHttpError.InternalServerError("Question not deleted");
      }

      this.logger.info(`Deleted question with id: ${questionId}`);
      return res.json(deletedQuestion);
    } catch (error) {
      this.logger.error(
        `Error deleting question with id ${req.params.id}: ${error}`,
      );
      next(error);
    }
  }
}

export default QuestionsController;
