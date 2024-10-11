import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Grid, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { toWords } from 'number-to-words';
import './Loancal.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const AxisLoanCalculator = () => {
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

    const axisBankHomeLoans = [
        { key: '1', product: 'Axis Bank Home Loan (floating rate)', salariedRate: '6.90% - 8.40%', selfEmployedRate: '7.00% - 8.55%' },
        { key: '2', product: 'Axis Bank Home Loan (fixed rate)', rate: '12.00%' },
        { key: '3', product: 'Axis Bank QuikPay Home Loan', rate: '6.90% onwards' },
        { key: '4', product: 'Axis Bank Shubh Aarambh Home Loan', rate: '6.90% onwards' },
        { key: '5', product: 'Axis Bank Fast Forward Home Loan', rate: '6.90% onwards' },
        { key: '6', product: 'Axis Bank Asha Home Loan', salariedRate: '10.05% - 11.00%', selfEmployedRate: '10.30% - 11.50%' },
        { key: '7', product: 'Axis Bank Super Saver Home Loan', rate: '6.90% onwards' },
        { key: '8', product: 'Axis Bank Power Advantage Home Loan', rate: '6.90% onwards' },
        { key: '9', product: 'Top-up Home Loan', rate: '8.65% onwards' },
        { key: '10', product: 'PMAY CLSS', rate: '6.90% onwards' },
    ];

    const columns = {
        axisBankHomeLoans: [
            { title: 'Product', dataIndex: 'product', key: 'product' },
            { title: 'Salaried Interest Rate (% p.a.)', dataIndex: 'salariedRate', key: 'salariedRate', render: (text) => text || '-' },
            { title: 'Self-Employed Interest Rate (% p.a.)', dataIndex: 'selfEmployedRate', key: 'selfEmployedRate', render: (text) => text || '-' },
            { title: 'Interest Rate', dataIndex: 'rate', key: 'rate', render: (text) => text || '-' },
        ],
    };

    const loanCharges = [
        { key: '1', chargeType: 'Processing Charges', details: 'Up to 1% of the sanctioned loan amount (with a minimum of Rs. 10,000 + GST)' },
        { key: '2', chargeType: 'Prepayment Charges (Floating Rate Loan)', details: 'Nil' },
        { key: '3', chargeType: 'Prepayment Charges (Fixed Rate Loan)', details: '2% of the outstanding principal' },
        { key: '4', chargeType: 'Penal Rate of Interest', details: 'No charges within 60 km. radius / Rs. 750 for any subsequent visits' },
        { key: '5', chargeType: 'Valuation Fee (Construction-Linked)', details: '2% per month. 24% per annum' },
        { key: '6', chargeType: 'Switching Fees (Base Rate/BPLR to Fixed Rate)', details: 'A minimum of Rs 10,000 or 1% of the outstanding principal (whichever is highest)' },
        { key: '7', chargeType: 'Switching Fees (Fixed Rate to Floating Rate)', details: '2% of the outstanding amount of principal' },
        { key: '8', chargeType: 'Cheque Return Charges / Repayment Instructions', details: 'Rs. 500 each time' },
        { key: '9', chargeType: 'Cheque/Instrument Swapping Charges', details: 'Rs. 500 each time' },
        { key: '10', chargeType: 'Issuance Charges for Duplicate Statement', details: 'Rs. 250 each time' },
        { key: '11', chargeType: 'CERSAI Charges', details: 'For a loan amount up to Rs. 5 lakhs – Rs. 50 / For a loan amount above Rs. 5 lakhs – Rs. 100' },
        { key: '12', chargeType: 'Insurance/ Loan Cover', details: 'Compulsory as per the actuals to be paid to the insurance company' },
    ];

    const column = {
        loanCharges: [
            { title: 'Particulars', dataIndex: 'chargeType', key: 'chargeType' },
            { title: 'Charges Applicable', dataIndex: 'details', key: 'details' },
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
                            Axis Bank Home Loan Interest Calculator
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
                                Axis Bank Home Loan Products
                            </Typography>
                            <Table columns={columns.axisBankHomeLoans} dataSource={axisBankHomeLoans} pagination={false} />

                            <Typography variant="h5" component="h3" textAlign="center" gutterBottom className="typography-subheading">
                                Loan Charges and Fees
                            </Typography>
                            <Table columns={column.loanCharges} dataSource={loanCharges} pagination={false} />

                        </div>
                        <p>Last Updated 17-September-2024</p>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </>
    );
};

export default AxisLoanCalculator;
