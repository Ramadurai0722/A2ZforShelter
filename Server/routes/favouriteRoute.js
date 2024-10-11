const express = require('express');
const router = express.Router();
const { addFavourite, getAllFavourites,removeFavourite,getFavouriteCount } = require('../Controller/favouriteController');

router.post('/add', addFavourite);
router.get('/all/:userId', getAllFavourites);
router.delete('/remove', removeFavourite);
router.get('/count/:productId', getFavouriteCount);


module.exports = router;