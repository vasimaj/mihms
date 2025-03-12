const express = require('express');

const router = express.Router();
const { insertState, getAllState, getStateById, updateState, deleteState } = require('../controllers/StateController.js')

router.post('/add_State', insertState);
router.get('/get_State', getAllState);

router.get('/get_State/:id', getStateById);

router.put('/update_State/:id', updateState);

router.delete('/delete_State/:id', deleteState);



module.exports = router;

