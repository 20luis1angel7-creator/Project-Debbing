import { apiPost } from "../../frontend/src/services/api";

describe("apiPost", () => {
  test("sends a POST request and returns the response body", async () => {
    const responseBody = { id: 1 };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: jest.fn().mockResolvedValue(responseBody)
    }) as jest.Mock;

    const result = await apiPost("/orders", { userId: 1 });

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/orders",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 1 })
      })
    );
    expect(result).toEqual(responseBody);
  });

  test("throws when the server responds with an error", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: jest.fn()
    }) as jest.Mock;

    await expect(apiPost("/orders", {})).rejects.toThrow("Error 500");
  });
});
