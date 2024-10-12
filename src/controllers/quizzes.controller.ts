import { NextFunction, Request, Response } from "express";
import QuizzesService from "@/services/quizzes.service";
import UsersService from "@/services/users.service";
import AiService from "@/services/ai.service";
import { CreateQuizDto, UpdateQuizDto } from "@/dto/quizzes";
import { Logger } from "winston";
import createHttpError from "http-errors";
import { AuthenticatedRequest } from "@/middlewares/authenticate";

class QuizzesController {
  constructor(
    private readonly quizzesService: QuizzesService,
    private readonly usersService: UsersService,
    private readonly aiService: AiService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    const createQuizDto = req.body as CreateQuizDto;
    const userId = Number((req as AuthenticatedRequest).user.sub);
    const user = await this.usersService.findOne({ where: { id: userId } });

    if (!user) {
      return next(createHttpError.NotFound());
    }
    this.logger.info(`Creating quiz for user ${userId}`);
    const quiz = await this.quizzesService.create({ ...createQuizDto, user });
    return res.status(201).json(quiz);
  }

  async generate(req: Request, res: Response, next: NextFunction) {
    const createQuizDto = req.body as CreateQuizDto;
    const userId = (req as AuthenticatedRequest).user.sub;
    const user = await this.usersService.findOne({
      where: { id: Number(userId) },
    });

    if (!user) {
      return next(createHttpError.NotFound());
    }
    this.logger.info(`Generating quiz for user ${userId}`);
    const quiz = await this.aiService.generateQuiz(createQuizDto);
    return res.status(200).json(quiz);
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    const userId = (req as AuthenticatedRequest).user.sub;
    const user = await this.usersService.findOne({
      where: { id: Number(userId) },
    });
    if (!user) {
      return next(createHttpError.NotFound());
    }
    this.logger.info(`Fetching all quizzes for user ${userId}`);
    const quizzes = await this.quizzesService.findAll({
      user: { id: user.id },
    });
    return res.json(quizzes);
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const userId = (req as AuthenticatedRequest).user.sub;
    const user = await this.usersService.findOne({
      where: { id: Number(userId) },
    });
    if (!user) {
      return next(createHttpError.NotFound());
    }
    this.logger.info(`Fetching quiz ${req.params.id} for user ${userId}`);
    const quiz = await this.quizzesService.findOne({
      id: req.params.id,
      user: { id: user.id },
    });
    return res.json(quiz);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const userId = (req as AuthenticatedRequest).user.sub;
    const user = await this.usersService.findOne({
      where: { id: Number(userId) },
    });
    if (!user) {
      return next(createHttpError.NotFound());
    }
    this.logger.info(`Updating quiz ${req.params.id} for user ${userId}`);
    const quiz = await this.quizzesService.update(
      { id: req.params.id, user: { id: user.id } },
      req.body as UpdateQuizDto,
    );
    return res.json(quiz);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const userId = (req as AuthenticatedRequest).user.sub;
    const user = await this.usersService.findOne({
      where: { id: Number(userId) },
    });
    if (!user) {
      return next(createHttpError.NotFound());
    }
    this.logger.info(`Deleting quiz ${req.params.id} for user ${userId}`);
    const quiz = await this.quizzesService.delete({
      id: req.params.id,
      user: { id: user.id },
    });
    return res.json(quiz);
  }
}

export default QuizzesController;
