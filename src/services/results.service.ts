import { Result } from "@/models/Result.js";
import {
  DeepPartial,
  DeleteResult,
  Repository,
  SaveOptions,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  UpdateResult,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";

class ResultsService {
  constructor(private readonly resultsRepository: Repository<Result>) {}

  async create(createResultDto: DeepPartial<Result>, options?: SaveOptions) {
    return await this.resultsRepository.save(createResultDto, options);
  }

  async findAll(options?: FindManyOptions<Result>): Promise<Result[]> {
    return await this.resultsRepository.find(options);
  }

  async findOne(options: FindOneOptions<Result>): Promise<Result | null> {
    return await this.resultsRepository.findOne(options);
  }

  async update(
    options: FindOptionsWhere<Result>,
    updateResultDto: QueryDeepPartialEntity<Result>,
  ): Promise<UpdateResult> {
    return await this.resultsRepository.update(options, updateResultDto);
  }

  async delete(criteria: FindOptionsWhere<Result>): Promise<DeleteResult> {
    return await this.resultsRepository.delete(criteria);
  }
}

export default ResultsService;
