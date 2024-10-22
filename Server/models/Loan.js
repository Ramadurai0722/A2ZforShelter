const mongoose = require('mongoose');
const loanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: { type: String, required: true },  
    email: { type: String, required: true },
    BankDearlerName: { type: String },
    phoneNumber: { type: String, required: true },
    description: { type: String },
    loanType: { type: String, required: true },
    category: { type: String, default: "loan" }, 
});

module.exports = mongoose.model('Loan', loanSchema);
