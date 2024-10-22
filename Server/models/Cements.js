const mongoose = require("mongoose");

const cementSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    shopAddress: { type: String, required: true },
    brand: { type: String, required: true },
    cementType: { type: String, required: true },
    quantity: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    description: { type: String, required: true },
    category: { type: String, default: "cement" }, 
});

const CementPost = mongoose.model("Cements", cementSchema);

module.exports = CementPost;
