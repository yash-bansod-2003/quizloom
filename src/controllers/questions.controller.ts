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
    const { quizId, ...rest } = req.body as CreateQuestionDto;
    const quiz = await this.quizzesService.findOne({ id: quizId });

    if (!quiz) {
      return next(createHttpError.NotFound("quiz not found"));
    }
    const Question = await this.QuestionsService.create({ ...rest, quiz });
    return res.status(201).json(Question);
  }

  async findAll(req: Request, res: Response) {
    const Questions = await this.QuestionsService.findAll();
    return res.json(Questions);
  }

  async findOne(req: Request, res: Response) {
    const Questions = await this.QuestionsService.findOne({
      id: req.params.id,
    });
    return res.json(Questions);
  }

  async update(req: Request, res: Response) {
    const Question = await this.QuestionsService.update(
      { id: req.params.id },
      req.body as UpdateQuestionDto,
    );
    return res.json(Question);
  }

  async delete(req: Request, res: Response) {
    const Question = await this.QuestionsService.delete({
      id: req.params.id,
    });
    return res.json(Question);
  }
}

export default QuestionsController;
