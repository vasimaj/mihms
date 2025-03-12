const express = require("express");
const router = express.Router();

const { insertCategory, getAllCategory, getCategorById, updateCategory, deleteCategory } = require("../controllers/CategoryController.js");

router.post("/add_category", insertCategory)
router.get("/getAllCategory", getAllCategory)
router.get("/getCategorById/:id", getCategorById)

router.put("/updateCategory/:id", updateCategory)

router.delete("/dalete/:id", deleteCategory)



module.exports = router;