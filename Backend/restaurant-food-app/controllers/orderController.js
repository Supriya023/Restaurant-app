const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");

exports.placeOrder = async (req, res) => {
  try {
    const { restaurantId, items } = req.body;
    if (!restaurantId || !items || !items.length) return res.status(400).json({ error: "Missing fields" });
    const rest = await Restaurant.findById(restaurantId);
    if (!rest) return res.status(400).json({ error: "Restaurant not found" });

    const totalPrice = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 1), 0);
    const order = new Order({ userId: req.user._id, restaurantId, items, totalPrice });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    // Customers: their orders, Restaurant owners: orders for their restaurant, Admin (not implemented) could see all
    if (req.user.role === "customer") {
      const orders = await Order.find({ userId: req.user._id }).populate("restaurantId");
      return res.json(orders);
    } else if (req.user.role === "restaurant") {
      // find restaurants owned by user
      const rests = await Restaurant.find({ owner: req.user._id }).select("_id");
      const restIds = rests.map(r => r._id);
      const orders = await Order.find({ restaurantId: { $in: restIds } }).populate("userId");
      return res.json(orders);
    } else {
      const orders = await Order.find().populate("userId").populate("restaurantId");
      res.json(orders);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Not found" });
    // simple permission: restaurant owners of the restaurant can update
    const rest = await Restaurant.findById(order.restaurantId);
    if (rest.owner && req.user._id.toString() !== rest.owner.toString()) {
      return res.status(403).json({ error: "Not allowed" });
    }
    order.status = req.body.status || order.status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};