import { Answer } from "@/models/Answer.js";
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
  SaveOptions,
  UpdateResult,
  FindOptionsWhere,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";

class AnswersService {
  constructor(private readonly answersRepository: Repository<Answer>) {}

  async create(createAnswerDto: DeepPartial<Answer>, options?: SaveOptions) {
    return await this.answersRepository.save(createAnswerDto, options);
  }

  async findAll(options?: FindManyOptions<Answer>): Promise<Answer[]> {
    return await this.answersRepository.find(options);
  }

  async findOne(options: FindOneOptions<Answer>): Promise<Answer | null> {
    return await this.answersRepository.findOne(options);
  }

  async update(
    options: FindOptionsWhere<Answer>,
    updateAnswerDto: QueryDeepPartialEntity<Answer>,
  ): Promise<UpdateResult> {
    return await this.answersRepository.update(options, updateAnswerDto);
  }

  async delete(criteria: FindOptionsWhere<Answer>): Promise<DeleteResult> {
    return await this.answersRepository.delete(criteria);
  }
}

export default AnswersService;
