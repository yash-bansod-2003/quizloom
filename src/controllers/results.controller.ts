import { NextFunction, Request, Response } from "express";
import ResultsService from "@/services/results.service";
import { CreateResultDto } from "@/dto/results";
import { Logger } from "winston";
import createHttpError from "http-errors";
import QuizzesService from "@/services/quizzes.service";
import UserService from "@/services/users.service";
import { AuthenticatedRequest } from "@/middlewares/authenticate";
import SubmissionsService from "@/services/submissions.service";
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
    const userId = (req as AuthenticatedRequest).user.sub;
    const user = await this.usersService.findOne({
      where: { id: Number(userId) },
    });

    if (!user) {
      return next(createHttpError.NotFound("user not found"));
    }
    const { quizId } = req.body as CreateResultDto;

    const quiz = await this.quizzesService.findOne({ id: quizId });

    if (!quiz) {
      return next(createHttpError.NotFound("quiz not found"));
    }
    const submissions = await this.submissionsService.findAll({
      user: { id: user.id },
      quiz: { id: quiz.id },
    });

    if (!submissions) {
      return next(createHttpError.NotFound("submissions not found"));
    }

    const score = submissions.reduce((acc, submission) => {
      return acc + (submission.answer.is_correct ? 1 : 0);
    }, 0);

    this.logger.info(`creating new result with score: ${score}`);

    const Result = await this.resultsService.create({
      user,
      quiz,
      score,
    });
    return res.status(201).json(Result);
  }

  async findAll(req: Request, res: Response) {
    this.logger.info("finding all results");
    const results = await this.resultsService.findAll();
    return res.json(results);
  }

  async findOne(req: Request, res: Response) {
    this.logger.info(`finding result with id: ${req.params.id}`);
    const result = await this.resultsService.findOne({
      id: req.params.id,
    });
    return res.json(result);
  }

  async delete(req: Request, res: Response) {
    this.logger.info(`deleting result with id: ${req.params.id}`);
    const result = await this.resultsService.delete({
      id: req.params.id,
    });
    return res.json(result);
  }
}

export default ResultsController;
