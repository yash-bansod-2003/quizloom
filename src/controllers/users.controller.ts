import { Request, Response } from "express";
import UserService from "@/services/user.service";
import { CreateUserDto, UpdateUserDto } from "@/dto/users";

class UsersController {
  constructor(private userService: UserService) {}

  async create(req: Request, res: Response) {
    const user = await this.userService.create(req.body as CreateUserDto);
    res.json(user);
  }

  async findAll(req: Request, res: Response) {
    const users = await this.userService.findAll();
    return res.json(users);
  }

  async findOne(req: Request, res: Response) {
    const user = await this.userService.findOne({ id: req.params.id });
    res.json(user);
  }

  async update(req: Request, res: Response) {
    const user = await this.userService.update(
      { id: req.params.id },
      req.body as UpdateUserDto,
    );
    res.json(user);
  }

  async delete(req: Request, res: Response) {
    const user = await this.userService.delete({ id: req.params.id });
    return res.json(user);
  }
}

export default UsersController;
