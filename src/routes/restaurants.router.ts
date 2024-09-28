import { Router } from "express";
import RestaurantsController from "@/controllers/restaurants.controller";
import RestaurantsService from "@/services/restaurants.service";
import { AppDataSource } from "@/data-source";
import { Restaurant } from "@/entity/Restaurant";
const router = Router();

const usersRepository = AppDataSource.getRepository(Restaurant);
const restaurantsService = new RestaurantsService(usersRepository);
const restaurantsController = new RestaurantsController(restaurantsService);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/", restaurantsController.create.bind(restaurantsController));

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/", restaurantsController.findAll.bind(restaurantsController));

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/:id", restaurantsController.findOne.bind(restaurantsController));

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put("/:id", restaurantsController.update.bind(restaurantsController));

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.delete("/:id", restaurantsController.delete.bind(restaurantsController));

export default router;
