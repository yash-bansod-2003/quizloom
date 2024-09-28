import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "@/middlewares/authenticate";

const authorization = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = (req as AuthenticatedRequest).user.role;
    if (!roles.includes(role)) {
      return res.status(403).json({ message: "forbidden" });
    }
    next();
  };
};

export default authorization;
