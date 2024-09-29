import { Request, Response } from "express";
import JsonWebToken from "jsonwebtoken";
import UserService from "@/services/user.service";
import {
  AccessTokensService,
  ForgotTokensService,
} from "@/services/tokens.service";
import { CreateUserDto } from "@/dto/users";
import { ForgotPasswordDto, ResetPasswordDto } from "@/dto/autentication";
import { AuthenticatedRequest } from "@/middlewares/authenticate";
import { Logger } from "winston";

class AutenticationController {
  constructor(
    private userService: UserService,
    private accessTokensService: AccessTokensService,
    private forgotTokensService: ForgotTokensService,
    private logger: Logger,
  ) {}

  async register(req: Request, res: Response) {
    const { email, ...rest } = req.body as CreateUserDto;
    this.logger.debug(`initiate registering user ${email}`);
    const userExists = await this.userService.findOne({ email });
    if (userExists) {
      this.logger.debug(`user already exists with ${email} email`);
      return res.json({ message: "user already exists" });
    }
    this.logger.debug("registering user");
    const user = await this.userService.create({ email, ...rest });
    this.logger.debug("user registered successfully");
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

  async forgot(req: Request, res: Response) {
    const { email } = req.body as ForgotPasswordDto;
    const user = await this.userService.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const payload: JsonWebToken.JwtPayload = {
      sub: String(user.id),
      role: user.role,
      email: user.email,
    };
    const token = this.forgotTokensService.generate(payload);

    return res.json({ token });
  }

  async reset(req: Request, res: Response) {
    const { token } = req.params;
    const match = this.forgotTokensService.verify(token);
    if (!match) {
      return res.status(500).json({ message: "internal server error" });
    }
    const { email } = match as JsonWebToken.JwtPayload;

    const userExists = await this.userService.findOne({
      email: email as string,
    });

    if (!userExists) {
      return res.status(404).json({ message: "user not found" });
    }

    const { password } = req.body as ResetPasswordDto;

    const user = await this.userService.update(
      { email: email as string },
      {
        password,
      },
    );

    if (!user) {
      return res.status(500).json({ message: "internal server error" });
    }

    return res.json(user);
  }
}

export default AutenticationController;
