import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("test the basic end point", () => {
  it("Get the / endpoint", async () => {
      const respons = await request.get("/");
      expect(respons.status).toBe(200);
  });
});