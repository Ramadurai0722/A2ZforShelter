const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    companyName: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    productInterest: {
        type: String,
    },
    images: [{ type: String, required: true }],
    category: { type: String, default: "agents" },
}, { timestamps: true });

const Agent = mongoose.model('Agent', AgentSchema);

module.exports = Agent;
