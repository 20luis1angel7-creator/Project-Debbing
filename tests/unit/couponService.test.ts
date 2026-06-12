import { applyCoupon } from "../../backend/services/couponService";

describe("applyCoupon", () => {
  test("does not apply DEBUG10 below the minimum subtotal", () => {
    const result = applyCoupon(80, "DEBUG10");
    expect(result.discount).toBe(0);
    expect(result.total).toBe(80);
  });

  test("caps discount at 50", () => {
    const result = applyCoupon(900, "DEBUG10");
    expect(result.discount).toBe(50);
    expect(result.total).toBe(850);
  });
});
