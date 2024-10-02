import { Answer } from "@/entity/Answer";
import { DeepPartial, DeleteResult, Repository, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

class AnswersService {
  constructor(private readonly answersRepository: Repository<Answer>) {}
  async create(createAnswerDto: DeepPartial<Answer>) {
    return await this.answersRepository.save(createAnswerDto);
  }

  findAll(): Promise<Answer[]> {
    return this.answersRepository.find();
  }

  findOne(expression: Record<string, unknown>): Promise<Answer | null> {
    return this.answersRepository.findOne({
      where: expression,
    });
  }

  update(
    expression: Record<string, unknown>,
    updateAnswerDto: QueryDeepPartialEntity<Answer>,
  ): Promise<UpdateResult> {
    return this.answersRepository.update(expression, updateAnswerDto);
  }

  delete(expression: Record<string, unknown>): Promise<DeleteResult> {
    return this.answersRepository.delete(expression);
  }
}

export default AnswersService;
