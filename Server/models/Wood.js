const mongoose = require('mongoose');

const woodSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  sellerAddress: { type: String, required: true },
  wood: { type: String, required: true },
  thickness: { type: String, required: true },
  quantityType: { type: String, required: true },
  quantity: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, default: "wood" }, 
  images: [{ type: String, required: true }], 
}, { timestamps: true });

const Wood = mongoose.model('Wood', woodSchema);

module.exports = Wood;
