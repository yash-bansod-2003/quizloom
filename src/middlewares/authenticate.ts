import { Request, Response, NextFunction } from "express";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authenticationHeader = req.headers.authorization;
  const authenticationToken = authenticationHeader?.split(" ")[1];
  if (!authenticationToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export default authenticate;
