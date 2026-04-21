import { useState } from "react";
import API from "../api";

export default function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  const placeOrder = async () => {
    const total = cart.reduce((sum, i) => sum + i.price, 0);
    await API.post("/orders", { items: cart, totalPrice: total });
    alert("Order Placed!");
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((c, i) => (
        <p key={i}>{c.item} - ₹{c.price}</p>
      ))}
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}