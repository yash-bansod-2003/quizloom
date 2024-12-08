import { Quiz } from "@/models/Quiz.js";
import {
  DeepPartial,
  DeleteResult,
  Repository,
  UpdateResult,
  SaveOptions,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";

class QuizzesService {
  constructor(private readonly quizzesRepository: Repository<Quiz>) {}

  async create(createQuizDto: DeepPartial<Quiz>, options?: SaveOptions) {
    return await this.quizzesRepository.save(createQuizDto, options);
  }

  async findAll(options?: FindManyOptions<Quiz>): Promise<Quiz[]> {
    return await this.quizzesRepository.find(options);
  }

  async findOne(options: FindOneOptions<Quiz>): Promise<Quiz | null> {
    return await this.quizzesRepository.findOne(options);
  }

  async update(
    criteria: FindOptionsWhere<Quiz>,
    updateQuizDto: QueryDeepPartialEntity<Quiz>,
  ): Promise<UpdateResult> {
    return await this.quizzesRepository.update(criteria, updateQuizDto);
  }

  async delete(criteria: FindOptionsWhere<Quiz>): Promise<DeleteResult> {
    return await this.quizzesRepository.delete(criteria);
  }
}

export default QuizzesService;
