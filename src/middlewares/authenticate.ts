import { Request, Response, NextFunction } from "express";
import { AccessTokensService } from "@/services/tokens.service";
const accessTokensService = new AccessTokensService();
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authenticationHeader = req.headers.authorization;
  const authenticationToken = authenticationHeader?.split(" ")[1];
  if (!authenticationToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const match = await accessTokensService.verify(authenticationToken);
  if (!match) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req["user"] = match;
  next();
};

export interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    role: string;
    restaurantId: number;
    iat: number;
    exp: number;
  };
}

export default authenticate;
