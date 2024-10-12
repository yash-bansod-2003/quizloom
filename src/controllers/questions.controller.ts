import { NextFunction, Request, Response } from "express";
import QuestionsService from "@/services/questions.service";
import { CreateQuestionDto, UpdateQuestionDto } from "@/dto/questions";
import { Logger } from "winston";
import createHttpError from "http-errors";
import QuizzesService from "@/services/quizzes.service";

class QuestionsController {
  constructor(
    private readonly QuestionsService: QuestionsService,
    private readonly quizzesService: QuizzesService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    this.logger.info(
      `Creating new question with data: ${JSON.stringify(req.body)}`,
    );
    const { quizId, ...rest } = req.body as CreateQuestionDto;
    const quiz = await this.quizzesService.findOne({ id: quizId });

    if (!quiz) {
      return next(createHttpError.NotFound("quiz not found"));
    }
    const Question = await this.QuestionsService.create({ ...rest, quiz });
    this.logger.info(`Created new question with id: ${Question.id}`);
    return res.status(201).json(Question);
  }

  async findAll(req: Request, res: Response) {
    this.logger.info("Fetching all questions");
    const Questions = await this.QuestionsService.findAll();
    return res.json(Questions);
  }

  async findOne(req: Request, res: Response) {
    this.logger.info(`Fetching question with id: ${req.params.id}`);
    const Questions = await this.QuestionsService.findOne({
      id: req.params.id,
    });
    return res.json(Questions);
  }

  async update(req: Request, res: Response) {
    this.logger.info(
      `Updating question with id: ${req.params.id} with data: ${JSON.stringify(req.body)}`,
    );
    const question = await this.QuestionsService.update(
      { id: req.params.id },
      req.body as UpdateQuestionDto,
    );
    this.logger.info(`Updated question with id: ${req.params.id}`);
    return res.json(question);
  }

  async delete(req: Request, res: Response) {
    this.logger.info(`Deleting question with id: ${req.params.id}`);
    const question = await this.QuestionsService.delete({
      id: req.params.id,
    });
    this.logger.info(`Deleted question with id: ${req.params.id}`);
    return res.json(question);
  }
}

export default QuestionsController;
