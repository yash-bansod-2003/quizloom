import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { AuthenticatedRequest } from "@/middlewares/authenticate.js";

const authorization = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = (req as AuthenticatedRequest).user.role;
    if (!roles.includes(role)) {
      return next(createHttpError.Forbidden());
    }
    next();
  };
};

export default authorization;
