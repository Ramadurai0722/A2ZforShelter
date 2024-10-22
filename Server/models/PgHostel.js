const mongoose = require('mongoose');

const PgHostelSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    purpose: String,
    type: String,
    furnishing: String,
    food: String,
    acRoom: String,
    maintenance: Number,
    totalFloors: Number,
    carParking: String,
    pgHostelName: String,
    description: String,
    price: Number,
    stateName: String,
    districtName: String,
    cityName: String,
    location: String,
    name: String,
    phoneNumber: String,
    category: { type: String, default: "pghostel" }, 
    photos: [String],
});

module.exports = mongoose.model('PgHostel', PgHostelSchema);
