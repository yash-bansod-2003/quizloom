import { Router } from "express";
import AutenticationController from "@/controllers/authentication.controller";
import UsersService from "@/services/user.service";
import { AccessTokensService } from "@/services/tokens.service";
import { AppDataSource } from "@/data-source";
import { User } from "@/entity/User";
import authenticationMiddleware from "@/middlewares/authenticate";

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
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  authenticationController.register.bind(authenticationController),
);

router.post(
  "/login",
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  authenticationController.login.bind(authenticationController),
);

router.get(
  "/profile",
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  authenticationMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  authenticationController.profile.bind(authenticationController),
);

export default router;
