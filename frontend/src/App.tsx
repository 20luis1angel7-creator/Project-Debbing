import { useState } from "react";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import type { CartItem, Product } from "./types";

const tabs = [
  { id: "products", label: "Productos" },
  { id: "profile", label: "Perfil" },
  { id: "checkout", label: "Checkout" },
  { id: "orders", label: "Ordenes" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState("products");
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.productId === product.id);
      if (existing) {
        return current.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { productId: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <h1>DebugMart</h1>
        <nav>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <section className="workspace">
        {activeTab === "products" && <ProductsPage onAdd={addToCart} />}
        {activeTab === "profile" && <ProfilePage />}
        {activeTab === "checkout" && <CheckoutPage cart={cart} setCart={setCart} />}
        {activeTab === "orders" && <OrdersPage />}
      </section>
    </main>
  );
}
