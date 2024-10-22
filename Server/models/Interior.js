const mongoose = require('mongoose');

const interiorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    sellerAddress: { type: String, required: true },
    type: { type: String, required: true },
    products: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    category: { type: String, default: "interior" }, 
}, { timestamps: true });

const Interior = mongoose.model('Interior', interiorSchema);

module.exports = Interior;
