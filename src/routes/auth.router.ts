/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import AutenticationController from "@/controllers/authentication.controller";
import UsersService from "@/services/user.service";
import { AccessTokensService } from "@/services/tokens.service";
import { AppDataSource } from "@/data-source";
import { User } from "@/entity/User";
import authenticationMiddleware from "@/middlewares/authenticate";
import { userCreateValidator } from "@/validators/users.validators";

const router = Router();

const usersRepository = AppDataSource.getRepository(User);
const accessTokensService = new AccessTokensService();
const usersService = new UsersService(usersRepository);
const authenticationController = new AutenticationController(
  usersService,
  accessTokensService,
);

router.post(
  "/register",
  userCreateValidator,
  authenticationController.register.bind(authenticationController),
);

router.post(
  "/login",
  authenticationController.login.bind(authenticationController),
);

router.get(
  "/profile",
  authenticationMiddleware,
  authenticationController.profile.bind(authenticationController),
);

export default router;
