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
    this.logger.debug("creating answer");
    const { questionId, ...rest } = req.body as CreateAnswerDto;
    const question = await this.questionsService.findOne({ id: questionId });

    if (!question) {
      this.logger.error("question not found");
      return next(createHttpError.NotFound("question not found"));
    }
    const Answer = await this.answersService.create({ ...rest, question });
    this.logger.debug("answer created");
    return res.status(201).json(Answer);
  }

  async findAll(req: Request, res: Response) {
    this.logger.debug("finding all answers");
    const answers = await this.answersService.findAll();
    this.logger.debug("answers found");
    return res.json(answers);
  }

  async findOne(req: Request, res: Response) {
    this.logger.debug("finding answer");
    const answer = await this.answersService.findOne({
      id: req.params.id,
    });
    if (!answer) {
      this.logger.error("answer not found");
      return res.status(404).json({ error: "answer not found" });
    }
    this.logger.debug("answer found");
    return res.json(answer);
  }

  async update(req: Request, res: Response) {
    this.logger.debug("updating answer");
    const answer = await this.answersService.update(
      { id: req.params.id },
      req.body as UpdateAnswerDto,
    );
    this.logger.debug("answer updated");
    return res.json(answer);
  }

  async delete(req: Request, res: Response) {
    this.logger.debug("deleting answer");
    const answer = await this.answersService.delete({
      id: req.params.id,
    });
    this.logger.debug("answer deleted");
    return res.json(answer);
  }
}

export default AnswersController;
