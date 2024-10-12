import { z } from "zod";
import { NextFunction, Request, Response } from "express";

export const QuizCreateValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationSchema = z.object({
    name: z.string(),
    description: z.string(),
  });
  try {
    validationSchema.parse(req.body);
    next();
  } catch (error) {
    return next(error);
  }
};
