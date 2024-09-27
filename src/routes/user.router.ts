import { Router } from "express";
import UsersController from "@/controllers/users.controller";
import UsersService from "@/services/user.service";
import { AppDataSource } from "@/data-source";
import { User } from "@/entity/User";
const router = Router();

const usersRepository = AppDataSource.getRepository(User);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/", usersController.create.bind(usersController));

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/", usersController.findAll.bind(usersController));

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/:id", usersController.findOne.bind(usersController));

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put("/:id", usersController.update.bind(usersController));

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.delete("/:id", usersController.delete.bind(usersController));

export default router;
