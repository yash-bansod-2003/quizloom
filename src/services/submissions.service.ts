import { Submission } from "@/entity/Submission";
import { DeepPartial, DeleteResult, Repository } from "typeorm";

class SubmissionsService {
  constructor(private readonly submissionsRepository: Repository<Submission>) {}
  async create(createSubmissionDto: DeepPartial<Submission>) {
    return await this.submissionsRepository.save(createSubmissionDto);
  }

  findAll(expression: Record<string, unknown> = {}): Promise<Submission[]> {
    return this.submissionsRepository.find({
      where: expression,
      relations: { answer: true },
    });
  }

  findOne(expression: Record<string, unknown>): Promise<Submission | null> {
    return this.submissionsRepository.findOne({
      where: expression,
      relations: { answer: true },
    });
  }

  delete(expression: Record<string, unknown>): Promise<DeleteResult> {
    return this.submissionsRepository.delete(expression);
  }
}

export default SubmissionsService;
