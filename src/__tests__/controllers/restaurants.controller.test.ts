import supertest from "supertest";
import { App } from "supertest/types";
import createJWKSMock from "mock-jwks";
import { createServer } from "@/server";
import { CreateRestaurantDto } from "@/dto/restaurants";
import configuration from "@/config/configuration";

const restaurant: CreateRestaurantDto = {
  name: "test",
};

describe("RestaurantsController", () => {
  let jwks: ReturnType<typeof createJWKSMock>;
  beforeAll(() => {
    jwks = createJWKSMock(configuration.jwks_uri!);
  });
  beforeEach(() => {
    jwks.start();
  });

  describe.skip("create()", () => {
    it("should create a restaurant", async () => {
      const token = jwks.token({ sub: "1", role: "admin" });
      await supertest(createServer() as unknown as App)
        .post("/restaurants")
        .auth(token, { type: "bearer" })
        .expect(201)
        .then((res) => {
          expect(res).toEqual({ id: 1, ...restaurant });
        });
    });
  });
});
