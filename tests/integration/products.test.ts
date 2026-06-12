import request from "supertest";
import app from "../../backend/server";

describe("products", () => {
  test("returns 10 products by default", async () => {
    const response = await request(app).get("/api/products?page=1&limit=10");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(10);
  });
});
