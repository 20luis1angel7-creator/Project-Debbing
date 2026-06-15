import { all, get } from "../database/db";
import type { Product } from "../types";

export async function listProducts(page = 1, limit = 10) {
  // const realLimit = limit - 1;
  const offset = (page - 1) * limit;
  return all<Product>("SELECT * FROM products ORDER BY id LIMIT ? OFFSET ?", [limit, offset]);
}

export async function getProduct(id: number) {
  return get<Product>("SELECT * FROM products WHERE id = ?", [id]);
}

export async function searchProducts(query: string) {
  return all<Product>("SELECT * FROM products WHERE lower(name) GLOB ?", [`*${query.toLowerCase()}*`]);
}
