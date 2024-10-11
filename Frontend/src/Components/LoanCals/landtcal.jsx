import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Grid, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
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

    const ltHfl = [
        { key: '1', scheme: 'L&T Home Loan', salariedRate: '8.40%', selfEmployedRate: '8.60%' },
        { key: '2', scheme: 'L&T Balance Transfer', salariedRate: '8.40%', selfEmployedRate: '8.60%' },
        { key: '3', scheme: 'Top Up Loan', rate: '1% more than existing loan' },
        { key: '4', scheme: 'L&T Loan Against Property', rate: '9.40%' },
    ];

    const columns = {
        ltHfl: [
            { title: 'Scheme', dataIndex: 'scheme', key: 'scheme' },
            { title: 'Salaried Interest Rate (% p.a.)', dataIndex: 'salariedRate', key: 'salariedRate', render: (text) => text || '-' },
            { title: 'Self-Employed Interest Rate (% p.a.)', dataIndex: 'selfEmployedRate', key: 'selfEmployedRate', render: (text) => text || '-' },
            { title: 'Additional Rate/Notes', dataIndex: 'rate', key: 'rate', render: (text) => text || '-' },
        ],
    };

    const loanFees = [
        { key: '1', feeType: 'Processing Fees', details: 'Up to 3% on Sanctioned Amount + applicable taxes' },
        { key: '2', feeType: 'Interest on Late Payment', details: '3% per month on overdue EMI' },
        { key: '3', feeType: 'Foreclosure or Prepayment Charges', details: 'NIL on floating rate of interest' },
        { key: '4', feeType: 'Penal Interest Rate', details: '3% on outstanding installment' },
    ];

    const column = {
        loanFees: [
            { title: 'Fee Type', dataIndex: 'feeType', key: 'feeType' },
            { title: 'Details', dataIndex: 'details', key: 'details' },
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
                            L&T Home Loan Interest Calculator
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
                                L&T HFL Home Loan Schemes
                            </Typography>
                            <Table columns={columns.ltHfl} dataSource={ltHfl} pagination={false} />

                            <Typography variant="h5" component="h3" textAlign="center" gutterBottom className="typography-subheading">
                                Loan Fees and Charges
                            </Typography>
                            <Table columns={column.loanFees} dataSource={loanFees} pagination={false} />

                        </div>
                        <p>Last Updated 17-September-2024</p>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </>
    );
};

export default LandtLoanCalculator;
