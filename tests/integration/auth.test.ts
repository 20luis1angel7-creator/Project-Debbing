import request from "supertest";
import app from "../../backend/server";

describe("auth", () => {
  test("invalid credentials return 401", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "missing@example.com", password: "wrong" });

    expect(response.status).toBe(401);
  });

  test("valid credentials return 200", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ 
        email: "luis@example.com", 
        password: "123456" 
      })
    
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("token")
    expect(response.body.user.email).toBe("luis@example.com")
  })
});
