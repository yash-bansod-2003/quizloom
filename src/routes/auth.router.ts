import { Router, Request, Response } from "express";
const router = Router();

router.post("/register", (req: Request, res: Response) => {
  return res.json({ message: "register" });
});

router.post("/login", (req: Request, res: Response) => {
  return res.json({ message: "login" });
});

export default router;
