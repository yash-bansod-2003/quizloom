import { NextFunction, Request, Response } from "express";
import { Logger } from "winston";
import createError from "http-errors";
import UsersService from "@/services/users.service.js";
import { CreateUserDto, UpdateUserDto } from "@/dto/users.js";
import HashingService from "@/services/hashing.service.js";

class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    this.logger.debug("creating user", { ...req.body, password: "******" });
    try {
      const createUserDto = req.body as CreateUserDto;
      const password = await this.hashingService.hash(createUserDto.password);
      const user = await this.usersService.create({
        password,
        ...createUserDto,
      });
      if (!user) {
        this.logger.debug("user not created");
        throw createError("user not created");
      }
      this.logger.debug("user created successfully");
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    this.logger.debug("finding all users");
    try {
      const users = await this.usersService.findAll();
      this.logger.debug("users found successfully");
      res.json(users);
    } catch (error) {
      this.logger.error(`error finding users ${error}`);
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    this.logger.debug("finding user by id", { id: req.params.id });
    try {
      const user = await this.usersService.findOne({
        where: { id: Number(req.params.id) },
      });
      if (!user) {
        this.logger.debug("user not found", { id: req.params.id });
        throw createError(404, "user not found");
      }
      this.logger.debug("user found successfully");
      res.json(user);
    } catch (error) {
      this.logger.error("error finding user", {
        id: req.params.id,
        error: String(error),
      });
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.params.id);
    this.logger.debug("updating user", { id: userId, ...req.body });
    try {
      const user = await this.usersService.update(
        { id: userId },
        req.body as UpdateUserDto,
      );
      if (!user) {
        this.logger.debug("user not updated", { id: userId });
        throw createError("user not updated");
      }
      this.logger.debug("user updated successfully");
      res.json(user);
    } catch (error) {
      this.logger.error("error updating user", {
        id: req.params.id,
        error: String(error),
      });
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    this.logger.debug("deleting user", { id: req.params.id });
    try {
      const user = await this.usersService.delete({
        id: Number(req.params.id),
      });
      if (!user) {
        this.logger.debug("user not deleted", { id: req.params.id });
        throw createError("user not deleted");
      }
      this.logger.debug("user deleted successfully");
      res.json(user);
    } catch (error) {
      this.logger.error("error deleting user", {
        id: req.params.id,
        error: String(error),
      });
      next(error);
    }
  }
}

export default UsersController;
