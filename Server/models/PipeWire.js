const mongoose = require('mongoose');

const pipeWireSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    sellerAddress: { type: String, required: true },
    Type: { type: String, required: true },
    pipeType: { type: String },
    pipeBrand: { type: String },
    pipeDiameter: { type: String },
    pipeLength: { type: String },
    wireBrand: { type: String },
    wireType: { type: String },
    wireDiameter: { type: String },
    wireLength: { type: String },
    quantity: { type: String, default: "1 Piece" },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, default: "pipewire" }, 
    images: [{ type: String, required: true }], 
}, { timestamps: true });

const PipeWire = mongoose.model('PipeWire', pipeWireSchema);

module.exports = PipeWire;
