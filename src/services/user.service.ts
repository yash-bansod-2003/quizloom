import { User } from "@/entity/User";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "@/dto/users";

class UserService {
  constructor(private usersRepository: Repository<User>) {}
  async create(createUserDto: CreateUserDto) {
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
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersRepository.update(expression, updateUserDto);
  }

  delete(expression: Record<string, string>): Promise<DeleteResult> {
    return this.usersRepository.delete(expression);
  }
}

export default UserService;
