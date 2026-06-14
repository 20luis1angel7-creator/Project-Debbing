import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { apiPost } from "../services/api";
import type { CartItem } from "../types";

type CheckoutPageProps = {
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
};

export default function CheckoutPage({ cart, setCart }: CheckoutPageProps) {
  const [couponCode, setCouponCode] = useState("DEBUG10");
  const [forcePaymentFail, setForcePaymentFail] = useState(false);
  const [message, setMessage] = useState("");

  async function checkout() {
    setMessage("Procesando...");

    try {
      const payload = { 
        userId: 1, 
        items: cart, 
        couponCode, 
        forcePaymentFail 
      };
      await apiPost("/orders", payload);

      setCart([]); 

      setMessage("Orden creada");
    } catch (err) {
      console.error(err)
      setMessage("Error creando la orden");
    }
  }

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  return (
    <div>
      <header className="page-header">
        <div>
          <h2>Checkout</h2>
          <p>{cart.length} productos en carrito</p>
        </div>
      </header>

      <section className="panel">
        {cart.map((item) => (
          <div className="row" key={item.productId}>
            <span>{item.name}</span>
            <span>x{item.quantity}</span>
            <strong>${item.price}</strong>
          </div>
        ))}

        <label>
          Cupon
          <input value={couponCode} onChange={(event) => setCouponCode(event.target.value)} />
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={forcePaymentFail}
            onChange={(event) => setForcePaymentFail(event.target.checked)}
          />
          Forzar fallo de pago
        </label>

        <div className="row total">
          <span>Subtotal</span>
          <strong>${subtotal}</strong>
        </div>

        <button onClick={checkout}>Comprar</button>
        {message && <p>{message}</p>}
      </section>
    </div>
  );
}
