import { Restaurant } from "@/entity/Restaurant";
import { DeepPartial, DeleteResult, Repository, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

class UserService {
  constructor(private restaurantsRepository: Repository<Restaurant>) {}
  async create(createRestaurantDto: DeepPartial<Restaurant>) {
    return await this.restaurantsRepository.save(createRestaurantDto);
  }

  findAll(): Promise<Restaurant[]> {
    return this.restaurantsRepository.find({ relations: { users: true } });
  }

  findOne(expression: Record<string, string>): Promise<Restaurant | null> {
    return this.restaurantsRepository.findOneBy(expression);
  }

  update(
    expression: Record<string, string>,
    updateRestaurantDto: QueryDeepPartialEntity<Restaurant>,
  ): Promise<UpdateResult> {
    return this.restaurantsRepository.update(expression, updateRestaurantDto);
  }

  delete(expression: Record<string, string>): Promise<DeleteResult> {
    return this.restaurantsRepository.delete(expression);
  }
}

export default UserService;
