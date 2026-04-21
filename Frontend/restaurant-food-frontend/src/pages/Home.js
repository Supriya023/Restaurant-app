import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="banner">
        <h1>Welcome to FoodieHub 🍴</h1>
        <p>Order your favorite meals from top restaurants!</p>
        <button>Order Now</button>
      </div>

      <div className="categories">
        <h2>Popular Categories</h2>
        <div className="category-list">
          <div className="category-card">🍕 Pizza</div>
          <div className="category-card">🍔 Burgers</div>
          <div className="category-card">🍜 Noodles</div>
          <div className="category-card">🥗 Healthy</div>
        </div>
      </div>
    </div>
  );
}

export default Home;