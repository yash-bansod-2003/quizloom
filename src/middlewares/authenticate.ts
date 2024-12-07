import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import TokensService from "@/services/tokens.service.js";
import configuration from "@/config/configuration.js";
const accessTokensService = new TokensService(configuration.jwt.secret.access);
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authenticationHeader = req.headers.authorization;
  const authenticationToken = authenticationHeader?.split(" ")[1];
  if (!authenticationToken) {
    return next(createHttpError.Unauthorized());
  }
  const match = accessTokensService.verify(authenticationToken);
  if (!match) {
    return next(createHttpError.Unauthorized());
  }
  req["user"] = match;
  next();
};

export interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    role: string;
    iat: number;
    exp: number;
  };
}

export default authenticate;
