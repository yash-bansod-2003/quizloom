import { Request, Response } from "express";
import UsersService from "@/services/user.service";
import RestaurantsService from "@/services/quizzes.service";
import { CreateUserDto, UpdateUserDto } from "@/dto/users";
import { Logger } from "winston";

class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly restaurantsService: RestaurantsService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response) {
    const user = await this.usersService.create(req.body as CreateUserDto);
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
    const user = await this.usersService.update(
      { id: req.params.id },
      req.body as UpdateUserDto,
    );
    res.json(user);
  }

  async delete(req: Request, res: Response) {
    const user = await this.usersService.delete({ id: req.params.id });
    return res.json(user);
  }
}

export default UsersController;
