import JsonWebToken from "jsonwebtoken";

abstract class TokensService {
  abstract generate(payload: JsonWebToken.JwtPayload): string;
  abstract verify(token: string): JsonWebToken.JwtPayload | string;
}

class AccessTokensService extends TokensService {
  generate(payload: JsonWebToken.JwtPayload): string {
    const accessToken = JsonWebToken.sign(payload, "secret");
    return accessToken;
  }

  verify(token: string): JsonWebToken.JwtPayload | string {
    return JsonWebToken.verify(token, "secret");
  }
}

export { AccessTokensService };
