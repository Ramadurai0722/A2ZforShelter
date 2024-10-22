const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: { type: String, required: true },
    bedrooms: { type: String, required: true },
    bathrooms: { type: String, required: true },
    furnishing: { type: String, required: true },
    constructionStatus: { type: String, required: true },
    listedBy: { type: String, required: true },
    superBuiltupArea: { type: Number, required: true },
    carpetArea: { type: Number, required: true },
    maintenance: { type: Number },
    totalFloors: { type: Number, required: true },
    floorNo: { type: Number, required: true },
    carParking: { type: String, required: true },
    facing: { type: String, required: true },
    projectName: { type: String, required: true },
    adTitle: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    stateName: { type: String, required: true },
    districtName: { type: String, required: true },
    cityName: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    purpose: { type: String, required: true },
    photos: [{ type: String }],
    category: { type: String, default: "house" }, 
}, { timestamps: true });

module.exports = mongoose.model("House", houseSchema);
