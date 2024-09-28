import { z } from "zod";
import { NextFunction, Request, Response } from "express";

export const userCreateValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
    restaurantId: z.string().optional(),
  });
  try {
    validationSchema.parse(req.body);
    next();
  } catch (error) {
    return res.json(error);
  }
};
