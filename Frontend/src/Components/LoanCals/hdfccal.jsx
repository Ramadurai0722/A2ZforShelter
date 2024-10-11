import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Grid, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import './Loancal.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const HDFCLoanCalculator = () => {
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

    const hdfc = [
        { key: '1', loanslap: 'For Women* (upto 30 Lakhs)', termLoan: '8.60 - 9.10' },
        { key: '2', loanslap: 'For Others* (upto 30 Lakhs)', termLoan: '8.65 - 9.15' },
        { key: '3', loanslap: 'For Women* (30.01 Lakhs to 75 Lakhs)', termLoan: '8.85 - 9.35' },
        { key: '4', loanslap: 'For Others* (30.01 Lakhs to 75 Lakhs', termLoan: '8.90 - 9.40' },
        { key: '5', loanslap: 'For Women* (75.01 Lakhs & Above)', termLoan: '8.95 - 9.45' },
        { key: '6', loanslap: 'For Others*(75.01 Lakhs & Above)', termLoan: '9.00 - 9.50' },
    ];

    const hdfc1 = [
        { key: '1', loanslap: 'Processing Fees', termLoan: '0.50% of loan amount or Rs 3,000 (whichever is higher)' },
        { key: '2', loanslap: 'Foreclosure or Prepayment Charges', termLoan: 'Up to 2%' },
        { key: '3', loanslap: 'Delayed payment charges', termLoan: 'Up to 24% p.a.' },
        { key: '4', loanslap: 'Check dishonor charges', termLoan: 'Rs. 300' },
        { key: '5', loanslap: 'PDC Swap Charges', termLoan: 'Up to Rs. 500' },
    ];

    const columns = {
        hdfc: [
            { title: 'Loan Slap', dataIndex: 'loanslap', key: 'loanslap' },
            { title: 'Home Loan Interest Rates (% p.a.)', dataIndex: 'termLoan', key: 'termLoan' },
        ],
    };
    const column = {
        hdfc1: [
            {  dataIndex: 'loanslap', key: 'loanslap' },
            {  dataIndex: 'termLoan', key: 'termLoan' },
        ],
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
                            HDFC Home Loan Interest Calculator
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Loan Amount (₹)"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(e.target.value)}
                                    variant="outlined"
                                    type="number"
                                />
                                <Typography variant="body2" color="textSecondary" style={{ marginTop: 10 }}>
                                    {loanAmountInWords}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Interest Rate (%)"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                    variant="outlined"
                                    step="0.01"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Loan Tenure (Months)"
                                    value={loanTenure}
                                    onChange={(e) => setLoanTenure(e.target.value)}
                                    variant="outlined"
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
                            <Card className="loan-summary-card">
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
                                    <Table
                                        columns={[
                                            { title: 'Month', dataIndex: 'month', key: 'month' },
                                            { title: 'Monthly EMI', dataIndex: 'emi', key: 'emi' },
                                            { title: 'Interest Payment', dataIndex: 'interest', key: 'interest' },
                                            { title: 'Principal Repayment', dataIndex: 'principal', key: 'principal' }
                                        ]}
                                        dataSource={result.monthlyInterestPayment.map((interest, index) => ({
                                            key: index + 1,
                                            month: index + 1,
                                            emi: result.emi,
                                            interest: interest,
                                            principal: result.principalRepayment[index]
                                        }))}
                                        pagination={false}
                                    />
                                </CardContent>
                            </Card>
                        )}

                        <div className="loan-details">

                            <Typography variant="h5" component="h3" textAlign="center" gutterBottom className="typography-subheading">
                            HDFC Home Loan Interest Rates
                            </Typography>
                            <Table columns={columns.hdfc} dataSource={hdfc} pagination={false} />

                            <Typography variant="h5" component="h3" textAlign="center" gutterBottom className="typography-subheading">
                            What Other Fees & Charges are Applicable?
                            </Typography>
                            <Table columns={column.hdfc1} dataSource={hdfc1} pagination={false} />

                        </div>
                        <p>Last Updated 17-September-2024</p>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </>
    );
};

export default HDFCLoanCalculator;
