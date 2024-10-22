const express = require('express');
const router = express.Router();
const { getCities, getDistricts, getStates,getLocationByLatLng } = require('../Controller/dataController');

router.get('/states', getStates);
router.get('/districts', getDistricts);
router.get('/cities', getCities);
router.get('/getLocationByLatLng', getLocationByLatLng);

module.exports = router;