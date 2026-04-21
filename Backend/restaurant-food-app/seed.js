require("dotenv").config();
const connectDB = require("./config/db");
const Restaurant = require("./models/Restaurant");

const seed = async () => {
  await connectDB();
  await Restaurant.deleteMany({});
  const data = [
    { name: "Tasty Bites", menu: [{ item: "Veg Burger", price: 80 }, { item: "Fries", price: 50 }], address: "MG Road" },
    { name: "Pasta Palace", menu: [{ item: "Tomato Pasta", price: 150 }, { item: "Garlic Bread", price: 60 }], address: "Brigade Rd" }
  ];
  await Restaurant.insertMany(data);
  console.log("Seeded restaurants");
  process.exit();
};

seed().catch(err => { console.error(err); process.exit(1); });