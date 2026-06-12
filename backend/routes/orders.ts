import express from "express";
import { createOrder, listOrders } from "../controllers/orderController";

const router = express.Router();

router.get("/", listOrders);
router.post("/", createOrder);

export default router;
