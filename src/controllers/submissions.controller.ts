import { NextFunction, Request, Response } from "express";
import SubmissionsService from "@/services/submissions.service";
import { CreateSubmissionDto } from "@/dto/submissions";
import { Logger } from "winston";
import createHttpError from "http-errors";
import QuestionsService from "@/services/questions.service";
import QuizzesService from "@/services/quizzes.service";
import UserService from "@/services/user.service";
import AnswersService from "@/services/answers.service";
import { AuthenticatedRequest } from "@/middlewares/authenticate";
class SubmissionsController {
  constructor(
    private readonly submissionsService: SubmissionsService,
    private readonly usersService: UserService,
    private readonly quizzesService: QuizzesService,
    private readonly questionsService: QuestionsService,
    private readonly answersService: AnswersService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    const userId = (req as AuthenticatedRequest).user.sub;
    const user = await this.usersService.findOne({ id: userId });

    if (!user) {
      return next(createHttpError.NotFound("user not found"));
    }
    const { quizId, questionId, answerId } = req.body as CreateSubmissionDto;

    const quiz = await this.quizzesService.findOne({ id: quizId });

    if (!quiz) {
      return next(createHttpError.NotFound("quiz not found"));
    }

    const question = await this.questionsService.findOne({ id: questionId });

    if (!question) {
      return next(createHttpError.NotFound("question not found"));
    }

    const answer = await this.answersService.findOne({ id: answerId });

    if (!answer) {
      return next(createHttpError.NotFound("answer not found"));
    }

    const Submission = await this.submissionsService.create({
      user,
      quiz,
      question,
      answer,
    });
    return res.status(201).json(Submission);
  }

  async findAll(req: Request, res: Response) {
    const submissions = await this.submissionsService.findAll();
    return res.json(submissions);
  }

  async findOne(req: Request, res: Response) {
    const submission = await this.submissionsService.findOne({
      id: req.params.id,
    });
    return res.json(submission);
  }

  async delete(req: Request, res: Response) {
    const submission = await this.submissionsService.delete({
      id: req.params.id,
    });
    return res.json(submission);
  }
}

export default SubmissionsController;
