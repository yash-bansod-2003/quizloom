import { RefreshToken } from "@/models/RefreshToken.js";
import JsonWebToken from "jsonwebtoken";
import {
  DeepPartial,
  DeleteResult,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from "typeorm";

class TokenService {
  constructor(
    private readonly secret: string,
    private readonly refreshTokensRepository?: Repository<RefreshToken>,
  ) {
    this.secret = secret;
  }

  /**
   * Signs a token with the provided payload and options.
   * @param payload The payload to sign.
   * @param options Options for the token.
   * @returns The signed token.
   */
  sign(
    payload: JsonWebToken.JwtPayload,
    options: JsonWebToken.SignOptions = {},
  ): string {
    return JsonWebToken.sign(payload, this.secret, options);
  }

  /**
   * Verifies a token and returns the decoded payload.
   * @param token The token to verify.
   * @returns The decoded payload, or string if the token is invalid.
   */
  verify(token: string): JsonWebToken.JwtPayload | string {
    return JsonWebToken.verify(token, this.secret);
  }

  async create(
    createRefreshTokenDto: DeepPartial<RefreshToken>,
  ): Promise<RefreshToken | undefined> {
    if (this.refreshTokensRepository) {
      return await this.refreshTokensRepository.save(createRefreshTokenDto);
    }
  }

  async findOne(
    options: FindOneOptions<RefreshToken>,
  ): Promise<RefreshToken | null | undefined> {
    if (this.refreshTokensRepository) {
      return this.refreshTokensRepository.findOne(options);
    }
  }

  async delete(
    criteria: FindOptionsWhere<RefreshToken>,
  ): Promise<DeleteResult | undefined> {
    if (this.refreshTokensRepository) {
      return this.refreshTokensRepository.delete(criteria);
    }
  }
}

export default TokenService;
