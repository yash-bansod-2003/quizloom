import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import JsonWebToken from "jsonwebtoken";
import UserService from "@/services/users.service";
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
    const userExists = await this.userService.findOne({ where: { email } });
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
      where: { email },
    });

    if (!user) {
      this.logger.debug("user not found");
      return next(createError.NotFound("user not found"));
    }

    this.logger.debug("verifying password");
    if (user.password !== password) {
      this.logger.debug("invalid credentials");
      return next(createError.UnprocessableEntity("invalid credentials"));
    }

    const payload: JsonWebToken.JwtPayload = {
      sub: String(user.id),
      role: user.role,
    };
    const tokenOptions: JsonWebToken.SignOptions = {
      expiresIn: "30m",
    };
    this.logger.debug("generating access token");
    const accessToken = this.accessTokensService.sign(payload, tokenOptions);

    this.logger.debug("login user successfully");
    return res.json({ accessToken });
  }

  async profile(req: Request, res: Response, next: NextFunction) {
    const id = (req as AuthenticatedRequest).user.sub;
    const user = await this.userService.findOne({ where: { id: Number(id) } });
    if (!user) {
      this.logger.debug("user not found");
      return next(createError.NotFound("user not found"));
    }
    this.logger.debug("profile user successfully");
    return res.json(user);
  }

  async forgot(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body as ForgotPasswordDto;
    this.logger.debug(`initiate forgot password process for ${email}`);
    const user = await this.userService.findOne({ where: { email } });
    if (!user) {
      this.logger.debug("user not found");
      return next(createError.NotFound("user not found"));
    }

    const payload: JsonWebToken.JwtPayload = {
      sub: String(user.id),
      role: user.role,
      email: user.email,
    };
    const tokenOptions: JsonWebToken.SignOptions = {
      expiresIn: "10m",
    };
    this.logger.debug("generating forgot password token");
    const token = this.forgotPasswordTokensService.sign(payload, tokenOptions);

    this.logger.debug("forgot password process completed successfully");
    return res.json({ token });
  }

  async reset(req: Request, res: Response, next: NextFunction) {
    const { token } = req.params;
    this.logger.debug(`initiate reset password process for ${token}`);
    const match = this.forgotPasswordTokensService.verify(token);
    if (!match) {
      this.logger.debug("invalid token");
      return next(createError.InternalServerError());
    }
    const { email } = match as JsonWebToken.JwtPayload;

    const userExists = await this.userService.findOne({
      where: {
        email: email as string,
      },
    });

    if (!userExists) {
      this.logger.debug("user not found");
      return next(createError.NotFound("user not found"));
    }

    const { password } = req.body as ResetPasswordDto;

    this.logger.debug("updating user password");
    const user = await this.userService.update(
      { email: email as string },
      {
        password,
      },
    );

    if (!user) {
      this.logger.debug("user update failed");
      return next(createError.InternalServerError());
    }

    this.logger.debug("user password updated successfully");
    return res.json(user);
  }
}

export default AutenticationController;
