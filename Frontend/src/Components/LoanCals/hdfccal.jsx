import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Grid, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import './Loancal.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const HDFCLoanCalculator = () => {
    const [loanAmount, setLoanAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(8.05);
    const [loanTenure, setLoanTenure] = useState(12);
    const [result, setResult] = useState(null);

    const convertNumberToWords = (num) => {
        const a = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
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

    const hdfcRates = [
        { label: 'For Women* (upto 30 Lakhs)', rate: '8.60 - 9.10' },
        { label: 'For Others* (upto 30 Lakhs)', rate: '8.65 - 9.15' },
        { label: 'For Women* (30.01 Lakhs to 75 Lakhs)', rate: '8.85 - 9.35' },
        { label: 'For Others* (30.01 Lakhs to 75 Lakhs)', rate: '8.90 - 9.40' },
        { label: 'For Women* (75.01 Lakhs & Above)', rate: '8.95 - 9.45' },
        { label: 'For Others*(75.01 Lakhs & Above)', rate: '9.00 - 9.50' },
    ];

    const hdfcFees = [
        { label: 'Processing Fees', details: '0.50% of loan amount or Rs 3,000 (whichever is higher)' },
        { label: 'Foreclosure or Prepayment Charges', details: 'Up to 2%' },
        { label: 'Delayed payment charges', details: 'Up to 24% p.a.' },
        { label: 'Check dishonor charges', details: 'Rs. 300' },
        { label: 'PDC Swap Charges', details: 'Up to Rs. 500' },
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
                            HDFC Home Loan Calculator
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


                        <div className="loan-details" style={{ marginTop: '20px' }}>
                            <Typography variant="h5" component="h3" textAlign="center" gutterBottom className="typography-subheading">
                                HDFC Home Loan Interest Rates
                            </Typography>
                            <ul>
                                {hdfcRates.map((item, index) => (
                                    <li key={index}>
                                        <strong>{item.label}</strong>: {item.rate}
                                    </li>
                                ))}
                            </ul>
                            <br />

                            <Typography variant="h5" component="h3" textAlign="center" gutterBottom className="typography-subheading">
                                What Other Fees & Charges are Applicable?
                            </Typography>
                            <ul>
                                {hdfcFees.map((item, index) => (
                                    <li key={index}>
                                        <strong>{item.label}</strong>: {item.details}
                                    </li>
                                ))}
                            </ul>
                        </div>


                    </CardContent>
                </Card>
                <br />
                <p>Last Updated 14-October-2024</p>
            </div>
            <Footer />
        </>
    );
};

export default HDFCLoanCalculator;
