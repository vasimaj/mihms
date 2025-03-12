const express = require("express");
const router = express.Router();


const { InsertUnitMaster, getAllUnitMaster, getSingleRecord, UpdateUnitMasterById, deleteUnitMaster } = require("../controllers/UnitMasterController.js");

router.post('/addunit', InsertUnitMaster)
router.get('/getAllUnit', getAllUnitMaster)
router.get('/getSingleUnitRecord/:id', getSingleRecord)
router.put('/updateUnitMaster/:id', UpdateUnitMasterById)
router.delete('/delete/:id', deleteUnitMaster)

module.exports = router;