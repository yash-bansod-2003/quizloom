import { Question } from "@/entity/Question";
import { DeepPartial, DeleteResult, Repository, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

class QuestionsService {
  constructor(private readonly questionsRepository: Repository<Question>) {}
  async create(createQuestionDto: DeepPartial<Question>) {
    return await this.questionsRepository.save(createQuestionDto);
  }

  findAll(): Promise<Question[]> {
    return this.questionsRepository.find({
      relations: { answers: true, quiz: true },
    });
  }

  findOne(expression: Record<string, unknown>): Promise<Question | null> {
    return this.questionsRepository.findOneBy(expression);
  }

  update(
    expression: Record<string, unknown>,
    updateQuestionDto: QueryDeepPartialEntity<Question>,
  ): Promise<UpdateResult> {
    return this.questionsRepository.update(expression, updateQuestionDto);
  }

  delete(expression: Record<string, unknown>): Promise<DeleteResult> {
    return this.questionsRepository.delete(expression);
  }
}

export default QuestionsService;
