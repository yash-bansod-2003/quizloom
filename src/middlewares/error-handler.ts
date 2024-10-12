import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { ZodError } from "zod";
import { TokenExpiredError } from "jsonwebtoken";
import zodErrorAdapter from "@/adapters/error/zod.error";
import httpErrorAdapter from "@/adapters/error/http.error";
import configuration from "@/config/configuration";
export interface ErrorResponse {
  name: string;
  code: number;
  errors: unknown[];
  stack?: string;
}

const errorHandler = (
  err: Error | HttpError | ZodError | TokenExpiredError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextFunction,
) => {
  let errorResponse: ErrorResponse | undefined = undefined;

  errorResponse = {
    name: "Internal Server Error",
    code: 500,
    errors: [
      {
        message: "Internal Server Error",
        path: "",
      },
    ],
    ...(configuration.node_env !== "production" && { stack: err.stack }),
  };

  if (err instanceof ZodError) {
    errorResponse = zodErrorAdapter(err);
  }

  if (err instanceof HttpError) {
    errorResponse = httpErrorAdapter(err);
  }

  if (err instanceof TokenExpiredError) {
    errorResponse = {
      name: err.name,
      code: 400,
      errors: [
        {
          message: err.message,
          path: "",
        },
      ],
    };
  }
  res.status(errorResponse.code).json(errorResponse);
};

export default errorHandler;
