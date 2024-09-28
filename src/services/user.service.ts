import { User } from "@/entity/User";
import { DeepPartial, DeleteResult, Repository, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

class UserService {
  constructor(private usersRepository: Repository<User>) {}
  async create(createUserDto: DeepPartial<User>) {
    return await this.usersRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(expression: Record<string, string>): Promise<User | null> {
    return this.usersRepository.findOneBy(expression);
  }

  update(
    expression: Record<string, string>,
    updateUserDto: QueryDeepPartialEntity<User>,
  ): Promise<UpdateResult> {
    return this.usersRepository.update(expression, updateUserDto);
  }

  delete(expression: Record<string, string>): Promise<DeleteResult> {
    return this.usersRepository.delete(expression);
  }
}

export default UserService;
