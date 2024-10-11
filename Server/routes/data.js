const express = require('express');
const router = express.Router();
const { getCities, getDistricts, getStates } = require('../Controller/dataController');

router.get('/states', getStates);
router.get('/districts', getDistricts);
router.get('/cities', getCities);

module.exports = router;
