const express = require("express");

const router = express.Router();

const { insertIndustry, getAllIndustry, getIndustryById, updateIndustryById, deleteIndustry } = require('../controllers/IndustryController.js');


router.post('/add_industry', insertIndustry);
router.get('/getAllIndustry', getAllIndustry)

router.get('/get_industry/:id', getIndustryById);

router.put('/update_industry/:id', updateIndustryById);

router.delete('/delete_industry/:id', deleteIndustry);





module.exports = router;