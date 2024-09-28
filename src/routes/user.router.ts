/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import UsersController from "@/controllers/users.controller";
import UsersService from "@/services/user.service";
import RestaurantsService from "@/services/restaurants.service";
import { AppDataSource } from "@/data-source";
import { User } from "@/entity/User";
import { Restaurant } from "@/entity/Restaurant";
import authenticate from "@/middlewares/authenticate";
import authorization from "@/middlewares/authorization";

const router = Router();

const usersRepository = AppDataSource.getRepository(User);
const restaurantsRepository = AppDataSource.getRepository(Restaurant);
const usersService = new UsersService(usersRepository);
const restaurantsService = new RestaurantsService(restaurantsRepository);
const usersController = new UsersController(usersService, restaurantsService);

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
