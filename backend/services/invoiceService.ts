import { run } from "../database/db";

export async function createInvoice(orderId: number, total: number) {
  if (process.env.FORCE_INVOICE_FAIL === "true") {
    throw new Error("Invoice provider unavailable");
  }

  const invoiceNumber = `INV-${Date.now()}`;
  const result = await run(
    "INSERT INTO invoices (order_id, invoice_number, total) VALUES (?, ?, ?)",
    [orderId, invoiceNumber, total]
  );

  return { id: result.id, orderId, invoiceNumber, total };
}
