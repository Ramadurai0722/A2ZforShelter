const mongoose = require("mongoose");

const landSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["New Launch", "Ready to Sale", "Urgent Sale"],
        required: true,
    },
    listedBy: {
        type: String,
        enum: ["Dealer", "Owner"],
        required: true,
    },
    landArea: {
        type: Number,
        required: true,
    },
   facing: {
        type: String,
        enum: ['North', 'South', 'East', 'West'], 
        required: true,
    },
    projectName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        enum: ["Sell"],
        required: true,
    },
    facilities: {
        type: [String], 
    },
    stateName: {
        type: String,
    },
    districtName: {
        type: String,
    },
    cityName: {
        type: String,
    },
    photos: {
        type: [String], 
    },
    category: { type: String, default: "land" }, 
});

const Land = mongoose.model("Land", landSchema);
module.exports = Land;
