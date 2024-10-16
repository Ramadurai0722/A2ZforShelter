import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Grid, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import './Loancal.css'; // Make sure to include your CSS styles
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const BajajLoanCalculator = () => {
    const [loanAmount, setLoanAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(8.05);
    const [loanTenure, setLoanTenure] = useState(12);
    const [result, setResult] = useState(null);

    const convertNumberToWords = (num) => {
        const a = [
            '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
            'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
            'eighteen', 'nineteen',
        ];
        const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

        const n = (num) => {
            if (num === 0) return 'zero';
            if (num < 20) return a[num];
            if (num < 100) return b[Math.floor(num / 10)] + (num % 10 ? ' ' + a[num % 10] : '');
            if (num < 1000) return a[Math.floor(num / 100)] + ' hundred' + (num % 100 ? ' and ' + n(num % 100) : '');
            if (num < 100000) return n(Math.floor(num / 1000)) + ' thousand' + (num % 1000 ? ' ' + n(num % 1000) : '');
            if (num < 10000000) return n(Math.floor(num / 100000)) + ' lakh' + (num % 100000 ? ' ' + n(num % 100000) : '');
            return n(Math.floor(num / 10000000)) + ' crore' + (num % 10000000 ? ' ' + n(num % 10000000) : '');
        };

        return n(num);
    };

    const loanAmountInWords = loanAmount ? convertNumberToWords(parseInt(loanAmount, 10)) : '';

    const calculateEMI = () => {
        const principal = parseFloat(loanAmount);
        const monthlyInterestRate = parseFloat(interestRate) / 12 / 100;
        const numberOfMonths = parseInt(loanTenure);

        if (isNaN(principal) || isNaN(monthlyInterestRate) || isNaN(numberOfMonths) || numberOfMonths <= 0) {
            setResult(null);
            return;
        }
        const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
            (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

        const totalPayment = emi * numberOfMonths;
        const totalInterest = totalPayment - principal;
        let monthlyInterestPayment = [];
        let principalRepayment = [];
        let balance = principal;

        for (let i = 0; i < numberOfMonths; i++) {
            const interestPayment = balance * monthlyInterestRate;
            const principalPayment = emi - interestPayment;
            balance -= principalPayment;

            monthlyInterestPayment.push(interestPayment.toFixed(2));
            principalRepayment.push(principalPayment.toFixed(2));
        }

        setResult({
            emi: emi.toFixed(2),
            totalPayment: totalPayment.toFixed(2),
            totalInterest: totalInterest.toFixed(2),
            monthlyInterestPayment: monthlyInterestPayment,
            principalRepayment: principalRepayment,
            loanDetails: {
                principal: principal.toFixed(2),
                monthlyInterestRate: (monthlyInterestRate * 100).toFixed(2) + '%',
                totalPayment: totalPayment.toFixed(2),
                totalInterest: totalInterest.toFixed(2),
            }
        });
    };

    const bajajHousingFinance = [
        { key: '1', highlight: 'Interest Rate', details: '8.45% p.a. onwards' },
        { key: '2', highlight: 'Loan Amount', details: 'Up to Rs. 5 crore' },
        { key: '3', highlight: 'Loan Tenure', details: 'Up to 40 years' },
        { key: '4', highlight: 'Processing Charges', details: '0.50% onwards' },
    ];

    const loanTypes = [
        { key: '1', loanType: 'Home Loan', interestRate: '8.45% to 14.00%' },
        { key: '2', loanType: 'Home Loan Balance Transfer', interestRate: '8.45% to 14.00%' },
        { key: '3', loanType: 'Top-up', interestRate: '9.20% to 15.00%' },
    ];

    const selfEmployedNonProfessionals = [
        { key: '1', loanType: 'Home Loan', interestRate: '8.45% to 14.00%' },
        { key: '2', loanType: 'Home Loan Balance Transfer', interestRate: '8.45% to 14.00%' },
        { key: '3', loanType: 'Top-up', interestRate: '9.40% to 15.00%' },
    ];

    const processingFees = [
        { key: '1', feeType: 'Processing Fees', details: 'Up to 0.50% of your home loan account' },
        { key: '2', feeType: 'Interest and Principal Statement Charges', details: 'NIL' },
        { key: '3', feeType: 'Loan Statement Charges', details: 'NIL' },
        { key: '4', feeType: 'Penal Interest', details: 'Up to 2%' },
        { key: '5', feeType: 'EMI Bounce Charges', details: 'Up to Rs. 3000' },
        { key: '6', feeType: 'Secure Fee', details: 'One-time charges (Up to Rs. 4,999)' },
        { key: '7', feeType: 'Part Prepayment and Foreclosure Charges', details: 'NIL' },
    ];

    return (
        <>
            <Navbar />
            <div className="container">
                <AppBar position="static" className="app-bar">
                    <Toolbar>
                        <Button component={Link} to="/sbihomeloan" color="inherit" className="nav-button">SBI</Button>
                        <Button component={Link} to="/hdfchomeloan" color="inherit" className="nav-button">HDFC</Button>
                        <Button component={Link} to="/kotakhomeloan" color="inherit" className="nav-button">Kotak</Button>
                        <Button component={Link} to="/landthomeloan" color="inherit" className="nav-button">L&T</Button>
                        <Button component={Link} to="/axishomeloan" color="inherit" className="nav-button">Axis</Button>
                        <Button component={Link} to="/bajajhomeloan" color="inherit" className="nav-button">Bajaj</Button>
                    </Toolbar>
                </AppBar>

                <Card className="MuiCard-root" sx={{ maxWidth: 900, margin: 'auto', padding: 2 }}>
                    <CardContent>
                        <Typography variant="h4" component="h2" textAlign="center" gutterBottom className="typography-heading">
                            Bajaj Home Loan Calculator
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <label htmlFor="loanAmount">Loan Amount (₹)</label>
                                <input
                                    id="loanAmount"
                                    style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(e.target.value)}
                                    type="number"
                                />
                                <Typography variant="body2" color="textSecondary" style={{ marginTop: 10 }}>
                                    {loanAmountInWords}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <label htmlFor="interestRate">Interest Rate (%)</label>
                                <input
                                    id="interestRate"
                                    style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                    type="number"
                                    step="0.01"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <label htmlFor="loanTenure">Loan Tenure (Months)</label>
                                <input
                                    id="loanTenure"
                                    style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                                    value={loanTenure}
                                    onChange={(e) => setLoanTenure(e.target.value)}
                                    type="number"
                                />
                            </Grid>
                        </Grid>

                        <Button
                            fullWidth
                            variant="contained"
                            className="MuiButton-containedPrimary"
                            sx={{ marginTop: 2 }}
                            onClick={calculateEMI}>
                            Calculate Loan Details
                        </Button>

                        {result && result.loanDetails && (
                            <Card className="loan-summary-card" style={{ marginTop: '20px' }}>
                                <CardContent>
                                    <Typography variant="h5" component="h3" textAlign="center" gutterBottom>
                                        Loan Summary
                                    </Typography>
                                    <Typography variant="body1"><strong>Monthly EMI: </strong> ₹{result.emi}</Typography>
                                    <Typography variant="body1"><strong>Total Interest: </strong> ₹{result.totalInterest}</Typography>
                                    <Typography variant="body1"><strong>Monthly Interest Rate: </strong> {result.loanDetails.monthlyInterestRate}</Typography>
                                    <Typography variant="body1"><strong>Total Payment: </strong> ₹{result.totalPayment}</Typography>
                                    <Typography variant="body1"><strong>Principal Amount: </strong> ₹{result.loanDetails.principal}</Typography>
                                    <Typography variant="h6" component="h4" gutterBottom>
                                        Detailed Breakdown:
                                    </Typography>
                                    <div className="table-container"> {/* Add the table-container class here */}
                                        <table className="table-responsive"> {/* Use table-responsive class */}
                                            <thead className="table-header"> {/* Add table-header class */}
                                                <tr>
                                                    <th>Month</th>
                                                    <th>Monthly EMI</th>
                                                    <th>Interest Payment</th>
                                                    <th>Principal Repayment</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-body"> {/* Add table-body class */}
                                                {result.monthlyInterestPayment.map((interest, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>₹{result.emi}</td>
                                                        <td>₹{interest}</td>
                                                        <td>₹{result.principalRepayment[index]}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        )}


                        <Typography variant="h6" style={{ marginTop: 20 }}>Bajaj Housing Finance Offerings</Typography>
                        {bajajHousingFinance.map(item => (
                            <div key={item.key}>
                                <Typography variant="body1"><strong>{item.highlight}:</strong> {item.details}</Typography>
                            </div>
                        ))}

                        <Typography variant="h6" style={{ marginTop: 20 }}>Loan Types</Typography>
                        {loanTypes.map(item => (
                            <div key={item.key}>
                                <Typography variant="body1"><strong>{item.loanType}:</strong> {item.interestRate}</Typography>
                            </div>
                        ))}

                        <Typography variant="h6" style={{ marginTop: 20 }}>Self Employed Non-Professionals</Typography>
                        {selfEmployedNonProfessionals.map(item => (
                            <div key={item.key}>
                                <Typography variant="body1"><strong>{item.loanType}:</strong> {item.interestRate}</Typography>
                            </div>
                        ))}

                        <Typography variant="h6" style={{ marginTop: 20 }}>Processing Fees</Typography>
                        {processingFees.map(item => (
                            <div key={item.key}>
                                <Typography variant="body1"><strong>{item.feeType}:</strong> {item.details}</Typography>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <br />
                <p>Last Updated 14-October-2024</p>
            </div>
            <Footer />
        </>
    );
};

export default BajajLoanCalculator;
