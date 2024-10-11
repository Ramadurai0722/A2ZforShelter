const express = require('express');
const router = express.Router();
const engineerController = require('../Controller/civilController');

router.post('/create', engineerController.createEngineer);
router.get('/getall', engineerController.getAllEngineers);
router.get('/get/:id', engineerController.getEngineerById);
router.put('/update/:id', engineerController.updateEngineer);
router.delete('/delete/:id', engineerController.deleteEngineer);

module.exports = router;
