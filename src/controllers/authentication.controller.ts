import { NextFunction, Request, Response } from "express";
import { Logger } from "winston";
import JsonWebToken from "jsonwebtoken";
import createError from "http-errors";
import UserService from "@/services/users.service.js";
import TokensService from "@/services/tokens.service.js";
import { CreateUserDto } from "@/dto/users.js";
import { ForgotPasswordDto, ResetPasswordDto } from "@/dto/authentication.js";
import { AuthenticatedRequest } from "@/middlewares/authenticate.js";
import HashingService from "@/services/hashing.service.js";
import MailService from "@/services/notification/mail.js";
import configuration from "@/config/configuration.js";

class AuthenticationController {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly accessTokensService: TokensService,
    private readonly refreshTokensService: TokensService,
    private readonly mailService: MailService,
    private readonly verificationTokensService: TokensService,
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

      const payload: JsonWebToken.JwtPayload = {
        sub: String(user.id),
        role: user.role,
        email: user.email,
      };

      const tokenOptions: JsonWebToken.SignOptions = {
        expiresIn: "30m",
      };

      this.logger.debug("generating verify email token");
      const token = this.verificationTokensService.sign(payload, tokenOptions);

      // This link change according how we handle it on frontend
      const verificationLink = `${configuration.domain}/verify-email/${token}`;

      const content = {
        body: {
          name: user.firstName + " " + user.lastName,
          intro:
            "Welcome to Quizloom! We’re excited to have you on board. To get started, we need to verify your email address.",
          action: {
            instructions:
              "Please click on the following link, or paste this into your web browser to verify your email address:",
            button: {
              text: "Verify your email",
              link: verificationLink,
            },
          },
          outro:
            "If you did not sign up for Quizloom, please ignore this email.\n" +
            "\n" +
            "Best regards,\n" +
            "The Quizloom Team",
        },
      };

      const mailsend = await this.mailService.send({
        email: user.email,
        subject: "Verify email",
        content,
      });
      if (!mailsend) {
        this.logger.debug("mail not send");
        return next(createError.InternalServerError());
      }
      this.logger.debug(
        "send verification email process completed successfully",
      );
      return res.json({ id: user.id, email });
    } catch (error) {
      this.logger.error("register user failed", error);
      next(createError.InternalServerError());
    }
  }

  async verify(req: Request, res: Response, next: NextFunction) {
    const { token } = req.params;
    this.logger.debug(`initiate verify user process for ${token}`);
    try {
      const match = this.verificationTokensService.verify(token);
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

      this.logger.debug("updating user verification status");
      const user = await this.userService.update(
        { email: email as string },
        {
          is_verified: true,
        },
      );

      if (!user) {
        this.logger.debug("user update failed");
        return next(createError.InternalServerError());
      }

      this.logger.debug("user verification status updated successfully");
      return res.json(user);
    } catch (error) {
      this.logger.error("verification status process failed", error);
      return next(createError.InternalServerError());
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
      const savedRefreshToken = await this.refreshTokensService.create({
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
        { ...payload, jti: String(savedRefreshToken.id) },
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
      const token = this.verificationTokensService.sign(payload, tokenOptions);
      // This link change according how we handle it on frontend
      const forgotLink = `${configuration.domain}/reset-password/${token}`;

      const content = {
        body: {
          name: user.firstName + " " + user.lastName,
          intro:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.",
          action: {
            instructions:
              "Please click on the following link, or paste this into your web browser to complete the process:",
            button: {
              text: "Reset your password",
              link: forgotLink,
            },
          },
          outro:
            "If you did not request this, please ignore this email and your password will remain unchanged.\n" +
            "\n" +
            "Best regards,\n" +
            "The Quizloom Team",
        },
      };

      const mailsend = await this.mailService.send({
        email: user.email,
        subject: "Reset password",
        content,
      });
      if (!mailsend) {
        this.logger.debug("mail not send");
        return next(createError.InternalServerError());
      }
      this.logger.debug("forgot password process completed successfully");
      return res.json({ id: user.id, email });
    } catch (error) {
      this.logger.error("forgot password process failed", error);
      next(createError.InternalServerError());
    }
  }

  async reset(req: Request, res: Response, next: NextFunction) {
    const { token } = req.params;
    this.logger.debug(`initiate reset password process for ${token}`);
    try {
      const match = this.verificationTokensService.verify(token);
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
      const hashedPassword = await this.hashingService.hash(password);
      const user = await this.userService.update(
        { email: email as string },
        {
          password: hashedPassword,
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
      return next(createError.InternalServerError());
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.body as Record<string, string>;
    this.logger.debug(`initiate refresh token process`);

    try {
      const match = this.refreshTokensService.verify(refreshToken);
      if (!match) {
        this.logger.debug("invalid token");
        return next(createError.Unauthorized());
      }
      const { sub: userId, jti } = match as JsonWebToken.JwtPayload;
      const user = await this.userService.findOne({
        where: { id: Number(userId) },
      });
      if (!user) {
        this.logger.debug("user not found");
        return next(createError.NotFound("user not found"));
      }

      const refreshTokenExists = await this.refreshTokensService.findOne({
        where: { id: Number(jti) },
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

      const deleteUserRefreshToken = await this.refreshTokensService.delete({
        id: Number(jti),
      });

      if (!deleteUserRefreshToken) {
        this.logger.debug("delete user refresh token failed");
        return next(createError.InternalServerError());
      }

      this.logger.debug("persist refresh token");
      const savedRefreshToken = await this.refreshTokensService.create({
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
        { ...payload, jti: String(savedRefreshToken.id) },
        tokenOptions,
      );

      this.logger.debug("token refreshed successfully");
      return res.json({ accessToken, refreshToken: refreshTokenNew });
    } catch (error) {
      this.logger.debug(error);
      return next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    const id = (req as AuthenticatedRequest).user.sub;
    try {
      const user = await this.userService.findOne({
        where: { id: Number(id) },
      });
      if (!user) {
        this.logger.debug("user not found");
        return next(createError.NotFound("user not found"));
      }
      const deleteUserRefreshTokens = await this.refreshTokensService.delete({
        user: { id: user.id },
      });

      if (!deleteUserRefreshTokens) {
        this.logger.debug("delete user refresh tokens failed");
        return next(createError.InternalServerError());
      }

      return res.json({ accessToken: "", refreshToken: "" });
    } catch (error) {
      this.logger.error("logout user failed", error);
      next(createError.InternalServerError());
    }
  }
}

export default AuthenticationController;
