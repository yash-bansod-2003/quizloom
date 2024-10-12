import { Request, Response } from "express";
import UsersService from "@/services/users.service";
import { CreateUserDto, UpdateUserDto } from "@/dto/users";
import { Logger } from "winston";

class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response) {
    this.logger.debug("creating user", { ...req.body, password: "******" });
    const user = await this.usersService.create(req.body as CreateUserDto);
    this.logger.debug("user created successfully");
    res.json(user);
  }

  async findAll(req: Request, res: Response) {
    this.logger.debug("finding all users");
    const users = await this.usersService.findAll();
    this.logger.debug("users found successfully");
    res.json(users);
  }

  async findOne(req: Request, res: Response) {
    this.logger.debug("finding user by id", { id: req.params.id });
    const user = await this.usersService.findOne({
      where: { id: Number(req.params.id) },
    });
    this.logger.debug("user found successfully");
    res.json(user);
  }

  async update(req: Request, res: Response) {
    this.logger.debug("updating user", { id: req.params.id, ...req.body });
    const user = await this.usersService.update(
      { id: req.params.id },
      req.body as UpdateUserDto,
    );
    this.logger.debug("user updated successfully");
    res.json(user);
  }

  async delete(req: Request, res: Response) {
    this.logger.debug("deleting user", { id: req.params.id });
    const user = await this.usersService.delete({ id: Number(req.params.id) });
    this.logger.debug("user deleted successfully");
    res.json(user);
  }
}

export default UsersController;
