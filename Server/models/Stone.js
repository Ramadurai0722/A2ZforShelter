const mongoose = require('mongoose');

const stoneSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  sellerAddress: { type: String, required: true },
  stoneCategory: { type: String, required: true },
  stoneType: { type: String, required: true },
  quantity: { type: String, default: "1 Tonne" },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, default: "stone" }, 
  images: [{ type: String, required: true }], 
}, { timestamps: true });

const Stone = mongoose.model('Stone', stoneSchema);

module.exports = Stone;
