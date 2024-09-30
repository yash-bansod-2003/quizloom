import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import JsonWebToken from "jsonwebtoken";
import UserService from "@/services/user.service";
import TokensService from "@/services/tokens.service";
import { CreateUserDto } from "@/dto/users";
import { ForgotPasswordDto, ResetPasswordDto } from "@/dto/autentication";
import { AuthenticatedRequest } from "@/middlewares/authenticate";
import { Logger } from "winston";

class AutenticationController {
  constructor(
    private readonly userService: UserService,
    private readonly accessTokensService: TokensService,
    private readonly forgotPasswordTokensService: TokensService,
    private readonly logger: Logger,
  ) {}

  async register(req: Request, res: Response, next: NextFunction) {
    const { email, ...rest } = req.body as CreateUserDto;
    this.logger.debug(`initiate registering user ${email}`);
    const userExists = await this.userService.findOne({ email });
    if (userExists) {
      this.logger.debug(`user already exists with ${email} email`);
      return next(createError.Conflict("user already exists"));
    }
    this.logger.debug("registering user");
    const user = await this.userService.create({ email, ...rest });
    this.logger.debug("user registered successfully");
    res.json(user);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body as CreateUserDto;
    this.logger.debug(`initiate login user ${email}`);
    const user = await this.userService.findOne({
      email,
    });

    if (!user) {
      return next(createError.NotFound("user not found"));
    }

    this.logger.debug("verifying password");
    if (user.password !== password) {
      return next(createError.UnprocessableEntity("invalid credentials"));
    }

    const payload: JsonWebToken.JwtPayload = {
      sub: String(user.id),
      role: user.role,
    };

    this.logger.debug("generating access token");
    const accessToken = this.accessTokensService.sign(payload);

    this.logger.debug("login user successfully");
    return res.json({ accessToken });
  }
  async profile(req: Request, res: Response, next: NextFunction) {
    const id = (req as AuthenticatedRequest).user.sub;
    const user = await this.userService.findOne({ id });
    if (!user) {
      return next(createError.NotFound("user not found"));
    }
    return res.json(user);
  }

  async forgot(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body as ForgotPasswordDto;
    const user = await this.userService.findOne({ email });
    if (!user) {
      return next(createError.NotFound("user not found"));
    }
    const payload: JsonWebToken.JwtPayload = {
      sub: String(user.id),
      role: user.role,
      email: user.email,
    };
    const token = this.forgotPasswordTokensService.sign(payload);

    return res.json({ token });
  }

  async reset(req: Request, res: Response, next: NextFunction) {
    const { token } = req.params;
    const match = this.forgotPasswordTokensService.verify(token);
    if (!match) {
      return next(createError.InternalServerError());
    }
    const { email } = match as JsonWebToken.JwtPayload;

    const userExists = await this.userService.findOne({
      email: email as string,
    });

    if (!userExists) {
      return next(createError.NotFound("user not found"));
    }

    const { password } = req.body as ResetPasswordDto;

    const user = await this.userService.update(
      { email: email as string },
      {
        password,
      },
    );

    if (!user) {
      return next(createError.InternalServerError());
    }

    return res.json(user);
  }
}

export default AutenticationController;
