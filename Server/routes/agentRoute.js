const express = require("express");
const { createAgent, getAllAgent, getAgentById } = require("../Controller/agentController");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


router.post("/createAgent", upload.array("images", 10), createAgent);
router.get('/GetAgent', getAllAgent);
router.get('/agents/:id', getAgentById);


module.exports = router;
