const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  item: String,
  price: Number,
  quantity: { type: Number, default: 1 }
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  items: [orderItemSchema],
  totalPrice: Number,
  status: { type: String, enum: ["pending", "accepted", "preparing", "out_for_delivery", "delivered", "cancelled"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);