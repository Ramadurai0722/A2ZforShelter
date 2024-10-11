const express = require('express');
const router = express.Router();
const borewellController = require('../Controller/borewellController');

router.post('/create', borewellController.createBorewell);
router.get('/getall', borewellController.getAllBorewells);
router.get('/get/:id', borewellController.getBorewellById);
router.put('/edit/:id', borewellController.updateBorewell);
router.delete('/delete/:id', borewellController.deleteBorewell);

module.exports = router;
