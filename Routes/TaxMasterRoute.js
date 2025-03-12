const express = require("express");
const router = express.Router();

const { InsertTax, getAllTaxMaster, getSingleTaxRecord, updateTaxRecord, deleteTaxRecord } = require("../controllers/TaxController.js")

router.post('/add_tax', InsertTax)
router.get("/AllTaxMaster", getAllTaxMaster)
router.get("/getSingleRecord/:id", getSingleTaxRecord)
router.put('/updateTaxrecord/:id', updateTaxRecord)
router.delete('/deleteRecord/:id', deleteTaxRecord)

module.exports = router;