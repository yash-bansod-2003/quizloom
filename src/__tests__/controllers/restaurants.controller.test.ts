import supertest from "supertest";
import { App } from "supertest/types";
import createJWKSMock from "mock-jwks";
import { createServer } from "@/server";
import { CreateRestaurantDto } from "@/dto/quizzes";
import configuration from "@/config/configuration";
import { DataSource } from "typeorm";
import { AppDataSource } from "@/data-source";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const restaurant: CreateRestaurantDto = {
  name: "test",
};

describe.skip("RestaurantsController", () => {
  let connection: DataSource;
  let jwks: ReturnType<typeof createJWKSMock>;
  beforeAll(async () => {
    jwks = createJWKSMock(`http://${configuration.host}:${configuration.port}`);
    connection = await AppDataSource.initialize();
  });
  beforeEach(async () => {
    jwks.start();
    await connection.dropDatabase();
    await connection.synchronize();
  });
  afterEach(() => {
    jwks.stop();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  describe("create()", () => {
    it("should create a restaurant", async () => {
      const token = jwks.token({ sub: "1", role: "admin" });
      await supertest(createServer() as unknown as App)
        .post("/restaurants")
        .auth(token, { type: "bearer" })
        .expect(201);
    });
  });
});
