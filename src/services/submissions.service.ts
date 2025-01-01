import { Submission } from "@/models/Submission.js";
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

class SubmissionsService {
  constructor(private readonly submissionsRepository: Repository<Submission>) {}

  async create(
    createSubmissionDto: DeepPartial<Submission>,
    options?: SaveOptions,
  ) {
    return await this.submissionsRepository.save(createSubmissionDto, options);
  }

  async findAll(options?: FindManyOptions<Submission>): Promise<Submission[]> {
    return await this.submissionsRepository.find(options);
  }

  async findOne(
    options: FindOneOptions<Submission>,
  ): Promise<Submission | null> {
    return await this.submissionsRepository.findOne(options);
  }

  async update(
    criteria: FindOptionsWhere<Submission>,
    updateSubmissionDto: QueryDeepPartialEntity<Submission>,
  ): Promise<UpdateResult> {
    return await this.submissionsRepository.update(
      criteria,
      updateSubmissionDto,
    );
  }

  async delete(criteria: FindOptionsWhere<Submission>): Promise<DeleteResult> {
    return await this.submissionsRepository.delete(criteria);
  }
}

export default SubmissionsService;
