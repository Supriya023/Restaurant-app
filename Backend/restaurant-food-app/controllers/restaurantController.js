const Restaurant = require("../models/Restaurant");

exports.createRestaurant = async (req, res) => {
  try {
    // only restaurant role users can be owners — but owner field is optional
    const { name, menu, address } = req.body;
    const restaurant = new Restaurant({ name, owner: req.user ? req.user._id : undefined, menu: menu || [], address });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const r = await Restaurant.findById(req.params.id);
    if (!r) return res.status(404).json({ error: "Not found" });
    res.json(r);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const r = await Restaurant.findById(req.params.id);
    if (!r) return res.status(404).json({ error: "Not found" });
    // only owner can update
    if (r.owner && req.user && r.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not allowed" });
    }
    Object.assign(r, req.body);
    await r.save();
    res.json(r);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const r = await Restaurant.findById(req.params.id);
    if (!r) return res.status(404).json({ error: "Not found" });
    if (r.owner && req.user && r.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not allowed" });
    }
    await r.remove();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};