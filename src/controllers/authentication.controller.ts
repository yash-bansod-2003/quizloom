import { Request, Response } from "express";
import JsonWebToken from "jsonwebtoken";
import UserService from "@/services/user.service";
import { AccessTokensService } from "@/services/tokens.service";
import { CreateUserDto } from "@/dto/users";

class AutenticationController {
  constructor(
    private userService: UserService,
    private accessTokensService: AccessTokensService,
  ) {}

  async register(req: Request, res: Response) {
    const user = await this.userService.create(req.body as CreateUserDto);
    res.json(user);
  }

  async login(req: Request, res: Response) {
    const { firstName } = req.body as CreateUserDto;
    const user = await this.userService.findOne({
      firstName,
    });

    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    const payload: JsonWebToken.JwtPayload = {
      sub: String(user.id),
      firstName: user.firstName,
    };

    const accessToken = this.accessTokensService.generate(payload);

    return res.json({ accessToken });
  }
}

export default AutenticationController;
