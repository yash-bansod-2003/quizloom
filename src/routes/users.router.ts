/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import UsersController from "@/controllers/users.controller";
import UsersService from "@/services/user.service";
import RestaurantsService from "@/services/quizzes.service";
import { AppDataSource } from "@/data-source";
import { User } from "@/entity/User";
import { Quiz } from "@/entity/Quiz";
import authenticate from "@/middlewares/authenticate";
import authorization from "@/middlewares/authorization";
import logger from "@/config/logger";

const router = Router();

const usersRepository = AppDataSource.getRepository(User);
const quizzesRepository = AppDataSource.getRepository(Quiz);
const usersService = new UsersService(usersRepository);
const restaurantsService = new RestaurantsService(quizzesRepository);
const usersController = new UsersController(
  usersService,
  restaurantsService,
  logger,
);

router.post(
  "/",
  authenticate,
  authorization(["admin"]),
  usersController.create.bind(usersController),
);

router.get(
  "/",
  authenticate,
  authorization(["admin"]),
  usersController.findAll.bind(usersController),
);

router.get(
  "/:id",
  authenticate,
  authorization(["admin"]),
  usersController.findOne.bind(usersController),
);

router.put(
  "/:id",
  authenticate,
  authorization(["admin"]),
  usersController.update.bind(usersController),
);

router.delete(
  "/:id",
  authenticate,
  authorization(["admin"]),
  usersController.delete.bind(usersController),
);

export default router;
