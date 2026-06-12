import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import productRoutes from "./routes/products";
import authRoutes from "./routes/auth";
import orderRoutes from "./routes/orders";
import userRoutes from "./routes/users";
import invoiceRoutes from "./routes/invoices";
import logger from "./middleware/logger";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(logger);

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "debugmart-api" });
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/invoices", invoiceRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("[unhandled]", err);
  res.status(500).json({ error: "Internal Server Error" });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`DebugMart API running on http://localhost:${PORT}`);
  });
}

export default app;
