import { NextFunction, Request, Response } from "express";
import { Logger } from "winston";
import createHttpError from "http-errors";
import ResultsService from "@/services/results.service.js";
import { CreateResultDto } from "@/dto/results.js";
import QuizzesService from "@/services/quizzes.service.js";
import UserService from "@/services/users.service.js";
import { AuthenticatedRequest } from "@/middlewares/authenticate.js";
import SubmissionsService from "@/services/submissions.service.js";

class ResultsController {
  constructor(
    private readonly resultsService: ResultsService,
    private readonly usersService: UserService,
    private readonly quizzesService: QuizzesService,
    private readonly submissionsService: SubmissionsService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    this.logger.info(
      `creating new result with data: ${JSON.stringify(req.body)}`,
    );
    try {
      const userId = (req as AuthenticatedRequest).user.sub;

      const user = await this.usersService.findOne({
        where: { id: Number(userId) },
      });

      if (!user) {
        throw createHttpError.NotFound("user not found");
      }

      const { quizId } = req.body as CreateResultDto;

      const quiz = await this.quizzesService.findOne({ where: { id: quizId } });

      if (!quiz) {
        throw createHttpError.NotFound("quiz not found");
      }

      const submissions = await this.submissionsService.findAll({
        where: {
          user: { id: user.id },
          quiz: { id: quiz.id },
        },
      });

      if (!submissions) {
        throw createHttpError.NotFound("submissions not found");
      }

      const score = submissions.reduce((acc, submission) => {
        return acc + (submission.answer.is_correct ? 1 : 0);
      }, 0);

      const previousResults = await this.resultsService.findAll({
        where: {
          user: { id: user.id },
          quiz: { id: quiz.id },
        },
      });

      const attempt = previousResults.length + 1;

      this.logger.info(`creating new result with score: ${score}`);

      const Result = await this.resultsService.create({
        user,
        quiz,
        score,
        attempt,
      });
      res.status(201).json(Result);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    this.logger.info("finding all results");
    try {
      const results = await this.resultsService.findAll();
      res.json(results);
    } catch (error) {
      this.logger.error(`error finding all results: ${error}`);
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const resultId = Number(req.params.id);
    this.logger.info(`finding result with id: ${resultId}`);
    try {
      const result = await this.resultsService.findOne({
        where: { resultId },
      });

      if (!result) {
        throw createHttpError.NotFound("result not found");
      }

      res.json(result);
    } catch (error) {
      this.logger.error(
        `error finding result with id ${req.params.id}: ${error}`,
      );
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const resultId = Number(req.params.id);
    this.logger.info(`deleting result with id: ${resultId}`);
    try {
      const result = await this.resultsService.delete({
        resultId: resultId,
      });

      if (!result) {
        throw createHttpError.NotFound("result not found");
      }

      res.json(result);
    } catch (error) {
      this.logger.error(
        `error deleting result with id ${req.params.id}: ${error}`,
      );
      next(error);
    }
  }
}

export default ResultsController;
