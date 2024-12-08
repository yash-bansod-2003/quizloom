import { NextFunction, Request, Response } from "express";
import { Logger } from "winston";
import createHttpError from "http-errors";
import SubmissionsService from "@/services/submissions.service.js";
import { CreateSubmissionDto } from "@/dto/submissions.js";
import QuestionsService from "@/services/questions.service.js";
import QuizzesService from "@/services/quizzes.service.js";
import UserService from "@/services/users.service.js";
import AnswersService from "@/services/answers.service.js";
import { AuthenticatedRequest } from "@/middlewares/authenticate.js";
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
    const user = await this.usersService.findOne({
      where: { id: Number(userId) },
    });

    if (!user) {
      this.logger.error(`User with id ${userId} not found`);
      return next(createHttpError.NotFound("user not found"));
    }
    const { quizId, questionId, answerId } = req.body as CreateSubmissionDto;

    const quiz = await this.quizzesService.findOne({ where: { id: quizId } });

    if (!quiz) {
      this.logger.error(`Quiz with id ${quizId} not found`);
      return next(createHttpError.NotFound("quiz not found"));
    }

    const question = await this.questionsService.findOne({
      where: { id: questionId },
    });

    if (!question) {
      this.logger.error(`Question with id ${questionId} not found`);
      return next(createHttpError.NotFound("question not found"));
    }

    const answer = await this.answersService.findOne({
      where: { id: answerId },
    });

    if (!answer) {
      this.logger.error(`Answer with id ${answerId} not found`);
      return next(createHttpError.NotFound("answer not found"));
    }

    const Submission = await this.submissionsService.create({
      user,
      quiz,
      question,
      answer,
    });
    this.logger.info(`Created new submission with id: ${Submission.id}`);
    return res.status(201).json(Submission);
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const submissions = await this.submissionsService.findAll();
      return res.json(submissions);
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const submissionId = Number(req.params.id);
    const submission = await this.submissionsService.findOne({
      where: { id: submissionId },
    });
    if (!submission) {
      this.logger.error(`Submission with id ${req.params.id} not found`);
      return next(createHttpError.NotFound("submission not found"));
    }
    return res.json(submission);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const submissionId = Number(req.params.id);
    const submission = await this.submissionsService.delete({
      id: submissionId,
    });
    if (!submission) {
      this.logger.error(`Submission with id ${submissionId} not found`);
      return next(createHttpError.NotFound("submission not found"));
    }
    this.logger.info(`Deleted submission with id: ${submissionId}`);
    return res.json(submission);
  }
}

export default SubmissionsController;
