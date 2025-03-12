const express = require('express');
const router = express.Router();

const { login } = require('../controllers/LoginController.js');


router.post('/login', login);



module.exports = router;