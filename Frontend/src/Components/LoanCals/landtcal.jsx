import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Grid, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import './Loancal.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const LandtLoanCalculator = () => {
    const [loanAmount, setLoanAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(8.05);
    const [loanTenure, setLoanTenure] = useState(12);
    const [result, setResult] = useState(null);

    const convertNumberToWords = (num) => {
        const a = [
            '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
        ];
        const b = [
            '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety',
        ];

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
                            L&T Home Loan Interest Calculator
                        </Typography>
    
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <label htmlFor="loanAmount">Loan Amount (₹)</label>
                                <input
                                    id="loanAmount"
                                    className="input-field"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(e.target.value)}
                                    type="number"
                                    style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                                />
                                <Typography variant="body2" color="textSecondary" style={{ marginTop: 10 }}>
                                    {loanAmountInWords}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <label htmlFor="interestRate">Interest Rate (%)</label>
                                <input
                                    id="interestRate"
                                    className="input-field"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                    type="number"
                                    step="0.01"
                                    style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <label htmlFor="loanTenure">Loan Tenure (Months)</label>
                                <input
                                    id="loanTenure"
                                    className="input-field"
                                    value={loanTenure}
                                    onChange={(e) => setLoanTenure(e.target.value)}
                                    type="number"
                                    style={{ width: '100%', padding: '10px', marginTop: '5px' }}
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
                                    <div className="table-container"> 
                                        <table className="table-responsive"> 
                                            <thead className="table-header"> 
                                                <tr>
                                                    <th>Month</th>
                                                    <th>Monthly EMI</th>
                                                    <th>Interest Payment</th>
                                                    <th>Principal Repayment</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-body"> 
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
                                L&T HFL Home Loan Schemes
                            </Typography>
                            <Typography variant="body1"><strong>1. L&T Home Loan:</strong> 8.40% p.a. (Salaried), 8.60% p.a. (Self-Employed)</Typography>
                            <Typography variant="body1"><strong>2. L&T Balance Transfer:</strong> 8.40% p.a. (Salaried), 8.60% p.a. (Self-Employed)</Typography>
                            <Typography variant="body1"><strong>3. Top Up Loan:</strong> 1% more than existing loan</Typography>
                            <Typography variant="body1"><strong>4. L&T Loan Against Property:</strong> 9.40%</Typography>
    
                            <Typography variant="h5" component="h3" textAlign="center" gutterBottom className="typography-subheading" style={{ marginTop: '20px' }}>
                                Loan Fees and Charges
                            </Typography>
                            <Typography variant="body1"><strong>Processing Fees:</strong> Up to 3% on Sanctioned Amount + applicable taxes</Typography>
                            <Typography variant="body1"><strong>Interest on Late Payment:</strong> 3% per month on overdue EMI</Typography>
                            <Typography variant="body1"><strong>Foreclosure or Prepayment Charges:</strong> NIL on floating rate of interest</Typography>
                            <Typography variant="body1"><strong>Penal Interest Rate:</strong> 3% on outstanding installment</Typography>
                        </div>
    
                        <Typography variant="body2" textAlign="center" style={{ marginTop: '20px' }}>
                            Last Updated 17-September-2024
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </>
    );
    
};

export default LandtLoanCalculator;
