import { calculateSubtotal } from "../../backend/services/orderService";

describe("calculateSubtotal", () => {
  test("converts prices to numbers and includes item quantity", async () => {
    await expect(calculateSubtotal([{ productId: 2, quantity: 2 }])).resolves.toBe(70);
  });

  test("returns 0 when cart is empty", async () => {
    await expect(calculateSubtotal([])).resolves.toBe(0);
  });
});
