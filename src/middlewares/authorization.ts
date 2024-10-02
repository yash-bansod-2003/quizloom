import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "@/middlewares/authenticate";
import createHttpError from "http-errors";

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
