const mongoose = require('mongoose');

const BorewellSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    description: { type: String },
    borewellDepth: { type: Number, required: true },
    waterSourceType: { type: String, required: true },
    drillingType: { type: String, required: true },
    location: { type: String, required: true },
    equipmentDetails: { type: String, required: true },
    category: { type: String, default: "borewell" }, 
});

const Borewell = mongoose.model('Borewell', BorewellSchema);
module.exports = Borewell;
