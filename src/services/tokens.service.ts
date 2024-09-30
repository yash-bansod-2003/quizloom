import * as jwt from "jsonwebtoken";

class TokenService {
  constructor(private readonly secret: string) {
    this.secret = secret;
  }

  /**
   * Signs a token with the provided payload and options.
   * @param payload The payload to sign.
   * @param options Options for the token.
   * @returns The signed token.
   */
  sign(payload: jwt.JwtPayload, options: jwt.SignOptions = {}): string {
    return jwt.sign(payload, this.secret, options);
  }

  /**
   * Verifies a token and returns the decoded payload.
   * @param token The token to verify.
   * @returns The decoded payload, or string if the token is invalid.
   */
  verify(token: string): jwt.JwtPayload | string {
    return jwt.verify(token, this.secret);
  }
}

export default TokenService;
