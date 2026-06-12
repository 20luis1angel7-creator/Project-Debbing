import express from "express";
import { getProduct, listProducts, searchProducts } from "../controllers/productController";

const router = express.Router();

router.get("/", listProducts);
router.get("/search", searchProducts);
router.get("/:id", getProduct);

export default router;
