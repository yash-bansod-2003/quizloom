import JsonWebToken from "jsonwebtoken";
import fs from "node:fs";

abstract class TokensService {
  abstract generate(payload: JsonWebToken.JwtPayload): string;
  abstract verify(token: string): JsonWebToken.JwtPayload | string;
}

class AccessTokensService extends TokensService {
  generate(payload: JsonWebToken.JwtPayload): string {
    const privateKey = fs.readFileSync("certs/private.pem");
    if (!privateKey) {
      throw new Error("private key not found");
    }
    const accessToken = JsonWebToken.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "1h",
      issuer: "food_authentication",
    });
    return accessToken;
  }

  verify(token: string): JsonWebToken.JwtPayload | string {
    return JsonWebToken.verify(token, "secret");
  }
}

class RefreshTokensService extends TokensService {
  generate(payload: JsonWebToken.JwtPayload): string {
    const accessToken = JsonWebToken.sign(payload, "secret");
    return accessToken;
  }

  verify(token: string): JsonWebToken.JwtPayload | string {
    return JsonWebToken.verify(token, "secret");
  }
}

export { AccessTokensService, RefreshTokensService };
