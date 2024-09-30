import { Request, Response } from "express";
import QuizzesService from "@/services/quizzes.service";
import { CreateQuizDto, UpdateQuizDto } from "@/dto/quizzes";
import { Logger } from "winston";

class QuizzesController {
  constructor(
    private quizzesService: QuizzesService,
    private logger: Logger,
  ) {}

  async create(req: Request, res: Response) {
    const quiz = await this.quizzesService.create(req.body as CreateQuizDto);
    return res.status(201).json(quiz);
  }

  async findAll(req: Request, res: Response) {
    const quizzes = await this.quizzesService.findAll();
    return res.json(quizzes);
  }

  async findOne(req: Request, res: Response) {
    const quizzes = await this.quizzesService.findOne({
      id: req.params.id,
    });
    return res.json(quizzes);
  }

  async update(req: Request, res: Response) {
    const quiz = await this.quizzesService.update(
      { id: req.params.id },
      req.body as UpdateQuizDto,
    );
    return res.json(quiz);
  }

  async delete(req: Request, res: Response) {
    const quiz = await this.quizzesService.delete({
      id: req.params.id,
    });
    return res.json(quiz);
  }
}

export default QuizzesController;
