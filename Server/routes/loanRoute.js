const express = require('express');
const {
    registerLoan,
    getAllLoans,
    getLoanById,
    getLoansByUserId,
    updateLoan,
    deleteLoan
} = require('../Controller/LoanController');

const router = express.Router();

router.post('/dealersregister', registerLoan);
router.get('/loans', getAllLoans);
router.get('/loans/:id', getLoanById);
router.get('/loans/:userId', getLoansByUserId);
router.put('/loans/:id', updateLoan);
router.delete('/loans/:id', deleteLoan);

module.exports = router;
