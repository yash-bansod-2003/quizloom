import { Quiz } from "@/models/Quiz.js";
import { DeepPartial, DeleteResult, Repository, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";

class QuizzesService {
  constructor(private readonly quizzesRepository: Repository<Quiz>) {}
  async create(createQuizDto: DeepPartial<Quiz>) {
    return await this.quizzesRepository.save(createQuizDto);
  }

  findAll(expression: Record<string, unknown>): Promise<Quiz[]> {
    return this.quizzesRepository.find({
      where: expression,
      relations: { user: true },
    });
  }

  findOne(expression: Record<string, unknown>): Promise<Quiz | null> {
    return this.quizzesRepository.findOne({
      where: expression,
      relations: { user: true },
    });
  }

  update(
    expression: Record<string, unknown>,
    updateQuizDto: QueryDeepPartialEntity<Quiz>,
  ): Promise<UpdateResult> {
    return this.quizzesRepository.update(expression, updateQuizDto);
  }

  delete(expression: Record<string, unknown>): Promise<DeleteResult> {
    return this.quizzesRepository.delete(expression);
  }
}

export default QuizzesService;
