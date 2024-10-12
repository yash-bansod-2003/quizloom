/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import AutenticationController from "@/controllers/authentication.controller";
import UsersService from "@/services/users.service";
import TokensService from "@/services/tokens.service";
import HashingService from "@/services/hashing.service";
import { AppDataSource } from "@/data-source";
import { User } from "@/entity/User";
import authenticationMiddleware from "@/middlewares/authenticate";
import { userCreateValidator } from "@/validators/users.validators";
import logger from "@/config/logger";
import configuration from "@/config/configuration";

const router = Router();

const usersRepository = AppDataSource.getRepository(User);
const accessTokensService = new TokensService(configuration.jwt.secret.access!);
const forgotPasswordTokensService = new TokensService(
  configuration.jwt.secret.forgot_password!,
);
const usersService = new UsersService(usersRepository);
const hashingService = new HashingService();
const authenticationController = new AutenticationController(
  usersService,
  hashingService,
  accessTokensService,
  forgotPasswordTokensService,
  logger,
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

router.post(
  "/forgot",
  authenticationController.forgot.bind(authenticationController),
);

router.put(
  "/reset/:token",
  authenticationController.reset.bind(authenticationController),
);

export default router;
