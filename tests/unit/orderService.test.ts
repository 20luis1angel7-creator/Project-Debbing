import { calculateSubtotal } from "../../backend/services/orderService";

describe("calculateSubtotal", () => {
  test("returns 0 when cart is empty", async () => {
    await expect(calculateSubtotal([])).resolves.toBe(0);
  });
});
