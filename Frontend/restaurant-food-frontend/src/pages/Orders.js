import { useEffect, useState } from "react";
import API from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.map((o) => (
        <div key={o._id}>
          <p>Status: {o.status} | Total: ₹{o.totalPrice}</p>
        </div>
      ))}
    </div>
  );
}