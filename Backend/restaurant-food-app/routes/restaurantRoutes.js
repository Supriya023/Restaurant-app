const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
// const { restrictTo } = require("../middleware/auth");

router.get("/", restaurantController.getRestaurants);
router.get("/:id", restaurantController.getRestaurantById);

// creating or modifying restaurant:  (restaurant owners)
router.post("/", restaurantController.createRestaurant);
router.put("/:id", restaurantController.updateRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;