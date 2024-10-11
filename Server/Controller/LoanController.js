const Loan = require('../models/Loan');

exports.registerLoan = async (req, res) => {
    try {
        const { userId, name, email, BankDearlerName, phoneNumber, description, loanType } = req.body;  
        const newLoan = new Loan({
            userId,
            name,  
            email,
            BankDearlerName,
            phoneNumber,
            description,
            loanType,
        });
        await newLoan.save();
        res.status(201).json({ message: 'Loan dealer registered successfully!' });
    } catch (error) {
        console.error('Error registering loan dealer:', error);  
        res.status(500).json({ error: 'Failed to register loan dealer' });
    }
};


exports.getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.find();
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch loans' });
    }
};

exports.getLoanById = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch loan' });
    }
};

exports.getLoansByUserId = async (req, res) => {
    try {
        const loans = await Loan.find({ userId: req.params.userId });
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch loans by user ID' });
    }
};

exports.updateLoan = async (req, res) => {
    try {
        const updatedLoan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLoan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.status(200).json(updatedLoan);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update loan' });
    }
};

exports.deleteLoan = async (req, res) => {
    try {
        const deletedLoan = await Loan.findByIdAndDelete(req.params.id);
        if (!deletedLoan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.status(200).json({ message: 'Loan deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete loan' });
    }
};
