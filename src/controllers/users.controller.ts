import { Request, Response } from "express";
import UsersService from "@/services/user.service";
import RestaurantsService from "@/services/quizzes.service";
import { CreateUserDto, UpdateUserDto } from "@/dto/users";
import { Logger } from "winston";

class UsersController {
  constructor(
    private usersService: UsersService,
    private restaurantsService: RestaurantsService,
    private logger: Logger,
  ) {}

  async create(req: Request, res: Response) {
    const { restaurantId, ...rest } = req.body as CreateUserDto;
    const restaurant = await this.restaurantsService.findOne({
      id: restaurantId as unknown as string,
    });

    if (!restaurant) {
      return res.status(400).json({
        message: "restaurant not found",
      });
    }

    const user = await this.usersService.create({
      ...rest,
      restaurant,
    });
    res.json(user);
  }

  async findAll(req: Request, res: Response) {
    const users = await this.usersService.findAll();
    return res.json(users);
  }

  async findOne(req: Request, res: Response) {
    const user = await this.usersService.findOne({ id: req.params.id });
    res.json(user);
  }

  async update(req: Request, res: Response) {
    const { restaurantId, ...rest } = req.body as UpdateUserDto;
    const restaurant = await this.restaurantsService.findOne({
      id: restaurantId as unknown as string,
    });
    const user = await this.usersService.update(
      { id: req.params.id },
      {
        ...rest,
        restaurant: restaurant as never,
      },
    );
    res.json(user);
  }

  async delete(req: Request, res: Response) {
    const user = await this.usersService.delete({ id: req.params.id });
    return res.json(user);
  }
}

export default UsersController;
