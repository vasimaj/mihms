const express = require("express");

const router = express.Router();
const {
  insertCity,
  getAllCity,
  getCityById,
  updateCity,
  deleteCity,
} = require("../controllers/CityController.js");

router.post("/add_City", insertCity);
router.get("/get_City", getAllCity);

router.get("/get_City/:id", getCityById);

router.put("/update_City/:id", updateCity);

router.delete("/delete_City/:id", deleteCity);

module.exports = router;
