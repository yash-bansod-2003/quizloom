import { Request, Response } from "express";
import JsonWebToken from "jsonwebtoken";
import UserService from "@/services/user.service";
import { AccessTokensService } from "@/services/tokens.service";
import { CreateUserDto } from "@/dto/users";
import { AuthenticatedRequest } from "@/middlewares/authenticate";

class AutenticationController {
  constructor(
    private userService: UserService,
    private accessTokensService: AccessTokensService,
  ) {}

  async register(req: Request, res: Response) {
    const { email, ...rest } = req.body as CreateUserDto;
    const userExists = await this.userService.findOne({ email });
    if (userExists) {
      return res.json({ message: "user already exists" });
    }
    const user = await this.userService.create({ email, ...rest });
    res.json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body as CreateUserDto;
    const user = await this.userService.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "wrong credentials",
      });
    }

    const payload: JsonWebToken.JwtPayload = {
      sub: String(user.id),
      restaurantId: user?.restaurant.id ?? null,
      role: user.role,
    };

    const accessToken = this.accessTokensService.generate(payload);

    return res.json({ accessToken });
  }
  async profile(req: Request, res: Response) {
    const id = (req as AuthenticatedRequest).user.sub;
    const user = await this.userService.findOne({ id });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.json(user);
  }
}

export default AutenticationController;
