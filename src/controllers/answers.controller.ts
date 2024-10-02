import { NextFunction, Request, Response } from "express";
import AnswersService from "@/services/answers.service";
import { CreateAnswerDto, UpdateAnswerDto } from "@/dto/answers";
import { Logger } from "winston";
import createHttpError from "http-errors";
import QuestionsService from "@/services/questions.service";

class AnswersController {
  constructor(
    private readonly answersService: AnswersService,
    private readonly questionsService: QuestionsService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    const { questionId, ...rest } = req.body as CreateAnswerDto;
    const question = await this.questionsService.findOne({ id: questionId });

    if (!question) {
      return next(createHttpError.NotFound("question not found"));
    }
    const Answer = await this.answersService.create({ ...rest, question });
    return res.status(201).json(Answer);
  }

  async findAll(req: Request, res: Response) {
    const answers = await this.answersService.findAll();
    return res.json(answers);
  }

  async findOne(req: Request, res: Response) {
    const answer = await this.answersService.findOne({
      id: req.params.id,
    });
    return res.json(answer);
  }

  async update(req: Request, res: Response) {
    const answer = await this.answersService.update(
      { id: req.params.id },
      req.body as UpdateAnswerDto,
    );
    return res.json(answer);
  }

  async delete(req: Request, res: Response) {
    const answer = await this.answersService.delete({
      id: req.params.id,
    });
    return res.json(answer);
  }
}

export default AnswersController;
