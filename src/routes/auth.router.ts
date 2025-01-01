import { Router } from "express";
import AutenticationController from "@/controllers/authentication.controller.js";
import UsersService from "@/services/users.service.js";
import TokensService from "@/services/tokens.service.js";
import HashingService from "@/services/hashing.service.js";
import MailService from "@/services/notification/mail.js";
import { AppDataSource } from "@/data-source.js";
import { User } from "@/models/User.js";
import authenticationMiddleware from "@/middlewares/authenticate.js";
import { userCreateValidator } from "@/validators/users.validators.js";
import logger from "@/config/logger.js";
import configuration from "@/config/configuration.js";
import { RefreshToken } from "@/models/RefreshToken.js";

const router = Router();

const usersRepository = AppDataSource.getRepository(User);
const refreshTokensRepository = AppDataSource.getRepository(RefreshToken);
const accessTokensService = new TokensService(configuration.jwt.secret.access);
const refreshTokensService = new TokensService(
  configuration.jwt.secret.refresh,
  refreshTokensRepository,
);
const verificationTokensService = new TokensService(
  configuration.jwt.secret.forgot_password,
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
  verificationTokensService,
  logger,
);

router.post("/register", userCreateValidator, async (req, res, next) => {
  await authenticationController.register(req, res, next);
});

router.post("/login", async (req, res, next) => {
  await authenticationController.login(req, res, next);
});

router.get("/profile", authenticationMiddleware, async (req, res, next) => {
  await authenticationController.profile(req, res, next);
});

router.post("/forgot", async (req, res, next) => {
  await authenticationController.forgot(req, res, next);
});

router.put("/reset/:token", async (req, res, next) => {
  await authenticationController.reset(req, res, next);
});

router.post("/refresh", async (req, res, next) => {
  await authenticationController.refresh(req, res, next);
});

router.post("/logout", authenticationMiddleware, async (req, res, next) => {
  await authenticationController.logout(req, res, next);
});

export default router;
