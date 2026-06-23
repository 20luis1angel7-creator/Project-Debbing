import { all, get, run } from "../database/db";
import type { CreateOrderPayload, OrderItem, OrderRow, Product } from "../types";
import { applyCoupon } from "./couponService";
import { createInvoice } from "./invoiceService";
import { chargePayment } from "./paymentService";

export async function listOrders(userId: number) {
  return all<OrderRow>("SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC", [userId]);
}

export async function createOrder(payload: CreateOrderPayload) {
  const { userId = 1, items = [], couponCode, forcePaymentFail = false } = payload;

  const subtotal = await calculateSubtotal(items);
  const { total, discount } = applyCoupon(subtotal, couponCode);

  for (const item of items) {
    const product = await get<Product>("SELECT * FROM products WHERE id = ?", [item.productId]);
    if (!product) throw new Error(`Product ${item.productId} not found`);
    if (product.stock < item.quantity) throw new Error(`Not enough stock for ${product.name}`);
  }

  const payment = await chargePayment({ total, forceFail: forcePaymentFail });

  for (const item of items) {
    await new Promise((resolve) => setTimeout(resolve, 120));
    await run("UPDATE products SET stock = stock - ? WHERE id = ?", [item.quantity, item.productId]);
  }

  const orderResult = await run(
    "INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)",
    [userId, total, "paid"]
  );

  const invoice = await createInvoice(orderResult.id, total);

  return {
    id: orderResult.id,
    userId,
    total,
    discount,
    payment,
    invoice
  };
}

export async function calculateSubtotal(items: OrderItem[]) {
  if (!items.length) {
    return 0;
  }

  let subtotal = 0;
  for (const item of items) {
    const product = await get<Pick<Product, "price">>("SELECT price FROM products WHERE id = ?", [item.productId]);
    if (!product) throw new Error(`Product ${item.productId} not found`);
    subtotal += Number(product.price) * item.quantity;
  }
  return subtotal;
}
