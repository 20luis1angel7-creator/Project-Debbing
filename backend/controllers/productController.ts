import type { NextFunction, Request, Response } from "express";
import * as productService from "../services/productService";

export async function listProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const products = await productService.listProducts(page, limit);
    res.json(products);
  } catch (error) {
    next(error);
  }
}

export async function getProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await productService.getProduct(Number(req.params.id));
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    next(error);
  }
}

export async function searchProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const q = typeof req.query.q === "string" ? req.query.q : "";
    const products = await productService.searchProducts(q);
    res.json(products);
  } catch (error) {
    next(error);
  }
}
