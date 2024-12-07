import { Result } from "@/models/Result.js";
import { DeepPartial, DeleteResult, Repository } from "typeorm";

class ResultsService {
  constructor(private readonly resultsRepository: Repository<Result>) {}
  async create(createResultDto: DeepPartial<Result>) {
    return await this.resultsRepository.save(createResultDto);
  }

  findAll(): Promise<Result[]> {
    return this.resultsRepository.find();
  }

  findOne(expression: Record<string, unknown>): Promise<Result | null> {
    return this.resultsRepository.findOne({
      where: expression,
    });
  }

  delete(expression: Record<string, unknown>): Promise<DeleteResult> {
    return this.resultsRepository.delete(expression);
  }
}

export default ResultsService;
