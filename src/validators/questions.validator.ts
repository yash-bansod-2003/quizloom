import { z } from "zod";
import { NextFunction, Request, Response } from "express";

export const QuestionCreateValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationSchema = z.object({
    text: z.string(),
    type: z.enum(["mcq", "true_false", "written"]),
  });
  try {
    validationSchema.parse(req.body);
    next();
  } catch (error) {
    return next(error);
  }
};
