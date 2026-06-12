import request from "supertest";
import app from "../../backend/server";

describe("auth", () => {
  test("invalid credentials return 401", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "missing@example.com", password: "wrong" });

    expect(response.status).toBe(401);
  });
});
