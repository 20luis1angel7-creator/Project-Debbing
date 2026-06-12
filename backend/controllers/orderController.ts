import type { NextFunction, Request, Response } from "express";
import * as orderService from "../services/orderService";

export async function listOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await orderService.listOrders(Number(req.query.userId || 1));
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

export async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}
