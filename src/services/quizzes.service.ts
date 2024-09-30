import { Quiz } from "@/entity/Quiz";
import { DeepPartial, DeleteResult, Repository, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

class QuizzesService {
  constructor(private readonly quizzesRepository: Repository<Quiz>) {}
  async create(createQuizDto: DeepPartial<Quiz>) {
    return await this.quizzesRepository.save(createQuizDto);
  }

  findAll(): Promise<Quiz[]> {
    return this.quizzesRepository.find({ relations: { user: true } });
  }

  findOne(expression: Record<string, string>): Promise<Quiz | null> {
    return this.quizzesRepository.findOneBy(expression);
  }

  update(
    expression: Record<string, string>,
    updateQuizDto: QueryDeepPartialEntity<Quiz>,
  ): Promise<UpdateResult> {
    return this.quizzesRepository.update(expression, updateQuizDto);
  }

  delete(expression: Record<string, string>): Promise<DeleteResult> {
    return this.quizzesRepository.delete(expression);
  }
}

export default QuizzesService;
