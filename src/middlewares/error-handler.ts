import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { ZodError } from "zod";
import { TokenExpiredError } from "jsonwebtoken";

export interface ErrorResponse {
  issues: Array<Record<string, string>>;
  name: string;
}

const errorHandler = (
  err: Error | HttpError | ZodError | TokenExpiredError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextFunction,
) => {
  let errorResponse: ErrorResponse;

  if (err instanceof ZodError) {
    errorResponse = {
      issues: err.issues as unknown as Array<Record<string, string>>,
      name: err.name,
    };
  } else if (err instanceof TokenExpiredError) {
    errorResponse = {
      issues: [
        {
          path: "",
          message: err.message,
          code: "TOKEN_EXPIRED",
        },
      ],
      name: err.name,
    };
  } else if (err instanceof HttpError) {
    errorResponse = {
      issues: [
        {
          path: "",
          message: err.message,
          code: err.statusCode.toString(),
        },
      ],
      name: err.name,
    };
  } else {
    errorResponse = {
      issues: [
        {
          path: "",
          message: "Internal Server Error",
          code: "INTERNAL_SERVER_ERROR",
        },
      ],
      name: "InternalServerError",
    };
  }

  res.status((err as HttpError).status || 500).json(errorResponse);
};

export default errorHandler;
