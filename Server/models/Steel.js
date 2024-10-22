const mongoose = require('mongoose');

const steelSchema = new mongoose.Schema({
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
  steelCategory: { type: String, required: true },
  steelType: { type: String, required: true },
  steelThickness: { type: String, required: true },
  meter: { type: String, default: "1 Meter" },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, default: "steel" }, 
  images: [{ type: String, required: true }], 
}, { timestamps: true });

const SteelPost = mongoose.model('Steel', steelSchema);

module.exports = SteelPost;
