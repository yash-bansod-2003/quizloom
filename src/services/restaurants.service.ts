import { Restaurant } from "@/entity/Restaurant";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateRestaurantDto, UpdateRestaurantDto } from "@/dto/restaurants";

class UserService {
  constructor(private restaurantsRepository: Repository<Restaurant>) {}
  async create(createRestaurantDto: CreateRestaurantDto) {
    return await this.restaurantsRepository.save(createRestaurantDto);
  }

  findAll(): Promise<Restaurant[]> {
    return this.restaurantsRepository.find();
  }

  findOne(expression: Record<string, string>): Promise<Restaurant | null> {
    return this.restaurantsRepository.findOneBy(expression);
  }

  update(
    expression: Record<string, string>,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<UpdateResult> {
    return this.restaurantsRepository.update(expression, updateRestaurantDto);
  }

  delete(expression: Record<string, string>): Promise<DeleteResult> {
    return this.restaurantsRepository.delete(expression);
  }
}

export default UserService;
