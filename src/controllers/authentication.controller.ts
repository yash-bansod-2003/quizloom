import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import JsonWebToken from "jsonwebtoken";
import UserService from "@/services/users.service";
import TokensService from "@/services/tokens.service";
import { CreateUserDto } from "@/dto/users";
import { ForgotPasswordDto, ResetPasswordDto } from "@/dto/autentication";
import { AuthenticatedRequest } from "@/middlewares/authenticate";
import { Logger } from "winston";
import HashingService from "@/services/hashing.service";
import MailService from "@/services/notification/mail";

class AutenticationController {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly accessTokensService: TokensService,
    private readonly refreshTokensService: TokensService,
    private readonly mailService: MailService,
    private readonly forgotPasswordTokensService: TokensService,
    private readonly logger: Logger,
  ) {}

  async register(req: Request, res: Response, next: NextFunction) {
    const { email, password, ...rest } = req.body as CreateUserDto;
    this.logger.debug(`initiate registering user ${email}`);
    try {
      const userExists = await this.userService.findOne({ where: { email } });
      if (userExists) {
        this.logger.debug(`user already exists with ${email} email`);
        return next(createError.Conflict("user already exists"));
      }
      this.logger.debug("hashing user password");
      const hashPassword = await this.hashingService.hash(password);
      this.logger.debug("registering user");
      const user = await this.userService.create({
        email,
        password: hashPassword,
        ...rest,
      });
      this.logger.debug("user registered successfully");
      res.json({ ...user, password: undefined });
    } catch (error) {
      this.logger.error("register user failed", error);
      next(createError.InternalServerError());
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body as CreateUserDto;
    this.logger.debug(`initiate login user ${email}`);
    try {
      const user = await this.userService.findOne({
        where: { email },
      });

      if (!user) {
        this.logger.debug("user not found");
        return next(createError.NotFound("user not found"));
      }

      this.logger.debug("verifying password");
      if (!(await this.hashingService.compare(password, user.password))) {
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

      this.logger.debug("persist refresh token");
      const savedRefreshToken = await this.refreshTokensService.persist({
        user,
      });

      if (!savedRefreshToken) {
        this.logger.debug("persist refresh token failed");
        return next(
          createError.InternalServerError("refresh token not persist"),
        );
      }

      this.logger.debug("generating refresh token");
      const refreshToken = this.refreshTokensService.sign(
        { ...payload, refreshTokenId: savedRefreshToken.id },
        tokenOptions,
      );

      this.logger.debug("login user successfully");
      return res.json({ accessToken, refreshToken });
    } catch (error) {
      this.logger.error("login user failed", error);
      next(createError.InternalServerError());
    }
  }

  async profile(req: Request, res: Response, next: NextFunction) {
    const id = (req as AuthenticatedRequest).user.sub;
    try {
      const user = await this.userService.findOne({
        where: { id: Number(id) },
      });
      if (!user) {
        this.logger.debug("user not found");
        return next(createError.NotFound("user not found"));
      }
      this.logger.debug("profile user successfully");
      return res.json({ ...user, password: undefined });
    } catch (error) {
      this.logger.error("profile user failed", error);
      next(createError.InternalServerError());
    }
  }

  async forgot(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body as ForgotPasswordDto;
    this.logger.debug(`initiate forgot password process for ${email}`);
    try {
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
      const token = this.forgotPasswordTokensService.sign(
        payload,
        tokenOptions,
      );
      // This link change according how we handle it on frontend
      const forgotLink = `http://localhost:3000/reset-password/${token}`;

      await this.mailService.send({ user, link: forgotLink });
      this.logger.debug("forgot password process completed successfully");
      return res.json({ token });
    } catch (error) {
      this.logger.error("forgot password process failed", error);
      next(createError.InternalServerError());
    }
  }

  async reset(req: Request, res: Response, next: NextFunction) {
    const { token } = req.params;
    this.logger.debug(`initiate reset password process for ${token}`);
    try {
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
    } catch (error) {
      this.logger.error("reset password process failed", error);
      next(createError.InternalServerError());
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.body as Record<string, string>;
    this.logger.debug(`initiate refresh token process for ${refreshToken}`);

    try {
      const match = this.refreshTokensService.verify(refreshToken);
      if (!match) {
        this.logger.debug("invalid token");
        return next(createError.Unauthorized());
      }
      const { sub: userId, refreshTokenId } = match as JsonWebToken.JwtPayload;
      const user = await this.userService.findOne({
        where: { id: Number(userId) },
      });
      if (!user) {
        this.logger.debug("user not found");
        return next(createError.NotFound("user not found"));
      }

      const refreshTokenExists = await this.refreshTokensService.findOne({
        where: { id: Number(refreshTokenId) },
      });

      if (!refreshTokenExists) {
        this.logger.debug("refresh token not found");
        return next(createError.NotFound("refresh token not found"));
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

      this.logger.debug("persist refresh token");
      const savedRefreshToken = await this.refreshTokensService.persist({
        user,
      });

      if (!savedRefreshToken) {
        this.logger.debug("persist refresh token failed");
        return next(
          createError.InternalServerError("refresh token not persist"),
        );
      }

      this.logger.debug("generating refresh token");
      const refreshTokenNew = this.refreshTokensService.sign(
        { ...payload, refreshTokenId: savedRefreshToken.id },
        tokenOptions,
      );

      this.logger.debug("token refreshed successfully");
      return res.json({ accessToken, refreshToken: refreshTokenNew });
    } catch (error) {
      this.logger.debug(error);
    }
  }
}

export default AutenticationController;
