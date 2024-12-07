import { User } from "@/models/User.js";
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SaveOptions,
  UpdateResult,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";

class UsersService {
  constructor(private readonly usersRepository: Repository<User>) {}
  async create(createUserDto: DeepPartial<User>, options?: SaveOptions) {
    return await this.usersRepository.save(createUserDto, options);
  }

  findAll(options?: FindManyOptions<User>): Promise<User[]> {
    return this.usersRepository.find(options);
  }

  findOne(options: FindOneOptions<User>): Promise<User | null> {
    return this.usersRepository.findOne(options);
  }

  update(
    expression: Record<string, string>,
    updateUserDto: QueryDeepPartialEntity<User>,
  ): Promise<UpdateResult> {
    return this.usersRepository.update(expression, updateUserDto);
  }

  delete(criteria: FindOptionsWhere<User>): Promise<DeleteResult> {
    return this.usersRepository.delete(criteria);
  }
}

export default UsersService;
