import supertest from "supertest";
import { createServer } from "@/server";
import { App } from "supertest/types";

describe("server", () => {
  describe("get /status", () => {
    it("should returns status 200", async () => {
      await supertest(createServer() as unknown as App)
        .get("/status")
        .expect(200)
        .then((res) => {
          expect(res.ok).toBe(true);
        });
    });
  });

  describe("get /message/:name", () => {
    it("should endpoint says hello", async () => {
      await supertest(createServer() as unknown as App)
        .get("/message/john")
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({ message: "hello john" });
        });
    });
  });
});
