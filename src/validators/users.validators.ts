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
  });
  try {
    validationSchema.parse(req.body);
    return next();
  } catch (error) {
    return next(error);
  }
};
