import { calculateSubtotal, createOrder } from "../../backend/services/orderService";
import { get, run } from "../../backend/database/db";

describe("calculateSubtotal", () => {
  test("converts prices to numbers and includes item quantity", async () => {
    await expect(calculateSubtotal([{ productId: 2, quantity: 2 }])).resolves.toBe(70);
  });

  test("returns 0 when cart is empty", async () => {
    await expect(calculateSubtotal([])).resolves.toBe(0);
  });
});


describe("createOrder", () => {
  beforeEach(async () => {
    await run("UPDATE products SET stock = ? WHERE id = ?", [1, 1]);
    await run("DELETE FROM invoices");
    await run("DELETE FROM orders");
    process.env.FORCE_INVOICE_FAIL = "false";
  });

  test("prevents simultaneous orders from making stock negative", async () => {
    const payload = {
      userId: 1,
      items: [{ productId: 1, quantity: 1 }]
    };

    const results = await Promise.allSettled([
      createOrder(payload),
      createOrder(payload)
    ]);

    const successful = results.filter((result) => result.status === "fulfilled");
    const failed = results.filter((result) => result.status === "rejected");

    const product = await get<{ stock: number }>(
      "SELECT stock FROM products WHERE id = ?",
      [1]
    );

    expect(successful).toHaveLength(1);
    expect(failed).toHaveLength(1);
    expect(product?.stock).toBe(0);
  });

  test("invoice failed", async () => {
    process.env.FORCE_INVOICE_FAIL = "true"
    
    const beforeStock = await get<{ stock: number }>(
      "SELECT stock FROM products WHERE id = ?",
      [1]
    )

    await expect(
      createOrder({
        userId: 1,
        items: [{ productId: 1, quantity: 1 }]
      })
    ).rejects.toThrow("Invoice provider unavailable")

    const afterStock = await get<{ stock: number }>(
      "SELECT stock FROM products WHERE id = ?",
      [1]
    )

    const orders = await get("SELECT COUNT(*) as count FROM orders")
    const invoices = await get("SELECT COUNT(*) as count FROM invoices")

    expect(afterStock?.stock).toBe(beforeStock?.stock)
    expect(orders).toEqual({ count: 0 })
    expect(invoices).toEqual({ count: 0 })
  })
});