const express = require("express");
const { createCementPost, getAllCement, getUserCementData, getCementById, updateCement, deleteCement } = require("../Controller/cementController");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// @route   POST /api/cementPosts
// @desc    Create a new cement post
router.post("/cement", upload.array("images", 10), createCementPost);
router.get('/cement', getAllCement);
router.get('/cement/:id', getCementById);
router.get('/GetUserCement', authMiddleware, getUserCementData);
router.put('/cement/:id', updateCement);
router.delete('/cement/:id', deleteCement);
module.exports = router;
