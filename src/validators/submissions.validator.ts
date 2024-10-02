import { z } from "zod";
import { NextFunction, Request, Response } from "express";

/**
 * Validates the body of a request to create a new submission.
 *
 * @param {Request} req The Express.js request object.
 * @param {Response} res The Express.js response object.
 * @param {NextFunction} next The Express.js next function.
 */
export const SubmissionCreateValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationSchema = z.object({
    quizId: z.number(),
    questionId: z.number(),
    answerId: z.number(),
  });
  try {
    validationSchema.parse(req.body);
    next();
  } catch (error) {
    return res.json(error);
  }
};
