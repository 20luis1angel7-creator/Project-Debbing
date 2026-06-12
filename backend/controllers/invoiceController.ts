import type { NextFunction, Request, Response } from "express";
import * as invoiceService from "../services/invoiceService";

export async function createInvoice(req: Request, res: Response, next: NextFunction) {
  try {
    const invoice = await invoiceService.createInvoice(req.body.orderId, req.body.total);
    res.status(201).json(invoice);
  } catch (error) {
    next(error);
  }
}
