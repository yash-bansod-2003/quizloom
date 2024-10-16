/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import AutenticationController from "@/controllers/authentication.controller";
import UsersService from "@/services/users.service";
import TokensService from "@/services/tokens.service";
import HashingService from "@/services/hashing.service";
import MailService from "@/services/notification/mail";
import { AppDataSource } from "@/data-source";
import { User } from "@/entity/User";
import authenticationMiddleware from "@/middlewares/authenticate";
import { userCreateValidator } from "@/validators/users.validators";
import logger from "@/config/logger";
import configuration from "@/config/configuration";
import { RefreshToken } from "@/entity/RefreshToken";

const router = Router();

const usersRepository = AppDataSource.getRepository(User);
const refreshTokensRepository = AppDataSource.getRepository(RefreshToken);
const accessTokensService = new TokensService(configuration.jwt.secret.access!);
const refreshTokensService = new TokensService(
  configuration.jwt.secret.refresh!,
  refreshTokensRepository,
);
const forgotPasswordTokensService = new TokensService(
  configuration.jwt.secret.forgot_password!,
);
const usersService = new UsersService(usersRepository);
const hashingService = new HashingService();
const mailService = new MailService(logger);
const authenticationController = new AutenticationController(
  usersService,
  hashingService,
  accessTokensService,
  refreshTokensService,
  mailService,
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

router.post(
  "/refresh",
  authenticationMiddleware,
  authenticationController.refresh.bind(authenticationController),
);

router.post(
  "/logout",
  authenticationMiddleware,
  authenticationController.logout.bind(authenticationController),
);

export default router;
