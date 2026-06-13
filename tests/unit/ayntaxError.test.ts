import { searchProducts as searchProductsController } from "../../backend/controllers/productController";
import * as productService from "../../backend/services/productService";

jest.mock("../../backend/services/productService"); // opcional pero recomendado

test("debe buscar productos y devolverlos en res.json", async () => {
    const products = [
        { id: 1, name: "Producto 1" }
    ] as any;

  jest
    .spyOn(productService, "searchProducts")
    .mockResolvedValue(products);

  const req = {
    query: {
      q: "iphone"
    }
  };

  const res = {
    json: jest.fn()
  };

  const next = jest.fn();

  await searchProductsController(req as any, res as any, next);

  expect(productService.searchProducts)
    .toHaveBeenCalledWith("iphone");

  expect(res.json)
    .toHaveBeenCalledWith(products);

  expect(next)
    .not.toHaveBeenCalled();
});