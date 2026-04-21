import { useEffect, useState } from "react";
import API from "../api";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    API.get("/restaurants").then((res) => setRestaurants(res.data));
  }, []);

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
  };

  return (
    <div>
      <h2>Restaurants</h2>
      {restaurants.map((res) => (
        <div key={res._id}>
          <h3>{res.name}</h3>
          <ul>
            {res.menu.map((m, idx) => (
              <li key={idx}>
                {m.item} - ₹{m.price} 
                <button onClick={() => addToCart(m)}>Add</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}