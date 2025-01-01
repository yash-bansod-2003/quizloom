import { Router } from "express";
import UsersController from "@/controllers/users.controller.js";
import UsersService from "@/services/users.service.js";
import HashingService from "@/services/hashing.service.js";
import { AppDataSource } from "@/data-source.js";
import { User } from "@/models/User.js";
import authenticate from "@/middlewares/authenticate.js";
import authorization from "@/middlewares/authorization.js";
import logger from "@/config/logger.js";

const router = Router();

const usersRepository = AppDataSource.getRepository(User);
const usersService = new UsersService(usersRepository);
const hashingService = new HashingService();
const usersController = new UsersController(
  usersService,
  hashingService,
  logger,
);

router.post(
  "/",
  authenticate,
  authorization(["admin"]),
  async (req, res, next) => {
    await usersController.create(req, res, next);
  },
);

router.get(
  "/",
  authenticate,
  authorization(["admin"]),
  async (req, res, next) => {
    await usersController.findAll(req, res, next);
  },
);

router.get(
  "/:id",
  authenticate,
  authorization(["admin"]),
  async (req, res, next) => {
    await usersController.findOne(req, res, next);
  },
);

router.put(
  "/:id",
  authenticate,
  authorization(["admin"]),
  async (req, res, next) => {
    await usersController.update(req, res, next);
  },
);

router.delete(
  "/:id",
  authenticate,
  authorization(["admin"]),
  async (req, res, next) => {
    await usersController.delete(req, res, next);
  },
);

export default router;
