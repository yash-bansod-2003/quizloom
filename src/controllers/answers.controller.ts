import { NextFunction, Request, Response } from "express";
import { Logger } from "winston";
import createHttpError from "http-errors";
import AnswersService from "@/services/answers.service.js";
import { CreateAnswerDto, UpdateAnswerDto } from "@/dto/answers.js";
import QuestionsService from "@/services/questions.service.js";

class AnswersController {
  constructor(
    private readonly answersService: AnswersService,
    private readonly questionsService: QuestionsService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    this.logger.debug("creating answer");
    const { questionId, ...rest } = req.body as CreateAnswerDto;
    try {
      const question = await this.questionsService.findOne({
        where: { id: questionId },
      });

      if (!question) {
        this.logger.error("question not found");
        throw createHttpError.NotFound("question not found");
      }

      const answer = await this.answersService.create({ ...rest, question });

      if (!answer) {
        this.logger.error("answer not created");
        throw createHttpError.InternalServerError("answer not created");
      }

      this.logger.debug("answer created");
      res.status(201).json(answer);
    } catch (error) {
      this.logger.error(`error creating answer: ${error}`);
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    this.logger.debug("finding all answers");
    try {
      const answers = await this.answersService.findAll({ where: req.query });
      this.logger.debug("answers found");
      res.json(answers);
    } catch (error) {
      this.logger.error(`error finding all answers: ${error}`);
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    this.logger.debug("finding answer");
    try {
      const answer = await this.answersService.findOne({
        where: { id: Number(req.params.id) },
      });
      if (!answer) {
        this.logger.error("answer not found");
        throw createHttpError.NotFound("answer not found");
      }
      this.logger.debug("answer found");
      res.json(answer);
    } catch (error) {
      this.logger.error(`error finding answer: ${error}`);
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    this.logger.debug("updating answer");
    try {
      const answer = await this.answersService.update(
        { id: Number(req.params.id) },
        req.body as UpdateAnswerDto,
      );
      if (!answer) {
        this.logger.error("answer not updated");
        throw createHttpError.InternalServerError("answer not updated");
      }
      this.logger.debug("answer updated");
      res.json(answer);
    } catch (error) {
      this.logger.error(`error updating answer: ${error}`);
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    this.logger.debug("deleting answer");
    try {
      const answer = await this.answersService.delete({
        id: Number(req.params.id),
      });
      if (!answer) {
        this.logger.error("answer not deleted");
        throw createHttpError.InternalServerError("answer not deleted");
      }
      this.logger.debug("answer deleted");
      res.json(answer);
    } catch (error) {
      this.logger.error(`error deleting answer: ${error}`);
      next(error);
    }
  }
}

export default AnswersController;
