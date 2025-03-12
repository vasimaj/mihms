const express = require('express');

const router = express.Router();
const { insertCountry, getAllCountries, getCountryById, updateCountry, deleteCountry } = require('../controllers/CountryController.js')

router.post('/add_country', insertCountry);
router.get('/get_countries', getAllCountries);

router.get('/get_country/:id', getCountryById);

router.put('/update_country/:id', updateCountry);

router.delete('/delete_country/:id', deleteCountry);



module.exports = router;

