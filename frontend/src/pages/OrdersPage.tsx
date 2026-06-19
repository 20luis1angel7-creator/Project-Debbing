import { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import type { Order } from "../types";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    apiGet<Order[]>("/orders?userId=1")
      .then((data) => {
        setOrders(data);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <div>
      <header className="page-header">
        <div>
          <h2>Ordenes</h2>
          <p>{loaded ? `${orders.length} ordenes` : "Cargando..."}</p>
        </div>
      </header>

      <section className="panel">
        {orders.map((order) => (
          <div className="row" key={order.id}>
            <span>Orden #{order.id}</span>
            <strong>${order.total}</strong>
            <span>{order.status}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
