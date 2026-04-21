const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  item: String,
  price: Number
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  menu: [menuItemSchema],
  address: String
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);