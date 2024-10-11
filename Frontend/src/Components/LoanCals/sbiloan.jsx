import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Grid, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import './Loancal.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const SBILoanCalculator = () => {
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


    const homeLoanHighlights = [
        {
            key: '1',
            interestRate: '8.05% – 9.05% p.a.',
            loanAmount: 'Up to 90% of property value',
            tenure: 'Up to 30 years',
            processingCharges: '0.35% of loan amount (₹2,000-₹10,000) with 50% waiver',
        },
    ];

    const regularHomeLoans = [
        {
            key: '1',
            cibil: '≥800',
            termLoan: '8.05%',
            maxgain: '8.45%',
        },
        {
            key: '2',
            cibil: '750-799',
            termLoan: '8.15%',
            maxgain: '8.55%',
        },
        {
            key: '3',
            cibil: '700-749',
            termLoan: '8.25%',
            maxgain: '8.65%',
        },
        {
            key: '4',
            cibil: '650-699',
            termLoan: '8.35%',
            maxgain: '8.75%',
        },
        {
            key: '5',
            cibil: '550-649',
            termLoan: '8.55%',
            maxgain: '8.95%',
        },
        {
            key: '6',
            cibil: 'NTC/No CIBIL Score/-1',
            termLoan: '8.25%',
            maxgain: '8.65%',
        },
    ];

    const realtyLoans = [
        { key: '1', cibil: '800 and above', termLoan: '8.35%' },
        { key: '2', cibil: '750-799', termLoan: '8.45%' },
        { key: '3', cibil: '700-749', termLoan: '8.55%' },
        { key: '4', cibil: '650-699', termLoan: '8.65%' },
        { key: '5', cibil: '550-649', termLoan: '8.75%' },
        { key: '6', cibil: 'NTC/No CIBIL Score/-1', termLoan: '8.55%' },
    ];

    const tribalPlusLoans = [
        { key: '1', cibil: '800 and above', termLoan: '8.15%' },
        { key: '2', cibil: '750-799', termLoan: '8.25%' },
        { key: '3', cibil: '700-749', termLoan: '8.35%' },
        { key: '4', cibil: '650-699', termLoan: '8.45%' },
        { key: '5', cibil: '550-649', termLoan: '8.65%' },
        { key: '6', cibil: 'NTC/No CIBIL Score/-1', termLoan: '8.35%' },
    ];

    const columns = {
        highlights: [
            { title: 'Interest Rate', dataIndex: 'interestRate', key: 'interestRate' },
            { title: 'Loan Amount', dataIndex: 'loanAmount', key: 'loanAmount' },
            { title: 'Loan Tenure', dataIndex: 'tenure', key: 'tenure' },
            { title: 'Processing Charges', dataIndex: 'processingCharges', key: 'processingCharges' },
        ],
        regular: [
            { title: 'CIBIL Score', dataIndex: 'cibil', key: 'cibil' },
            { title: 'Term Loan (p.a.)', dataIndex: 'termLoan', key: 'termLoan' },
            { title: 'Maxgain (p.a.)', dataIndex: 'maxgain', key: 'maxgain' },
        ],
        realty: [
            { title: 'CIBIL Score', dataIndex: 'cibil', key: 'cibil' },
            { title: 'Term Loan (p.a.)', dataIndex: 'termLoan', key: 'termLoan' },
        ],
        tribal: [
            { title: 'CIBIL Score', dataIndex: 'cibil', key: 'cibil' },
            { title: 'Term Loan (p.a.)', dataIndex: 'termLoan', key: 'termLoan' },
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
                            SBI Home Loan Interest Calculator
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
                                SBI Home Loan Highlights
                            </Typography>
                            <Table columns={columns.highlights} dataSource={homeLoanHighlights} pagination={false} />

                            <Typography variant="h5" component="h3" textAlign="center" gutterBottom className="typography-subheading">
                                SBI Regular Home Loans
                            </Typography>
                            <Table columns={columns.regular} dataSource={regularHomeLoans} pagination={false} />

                            <Typography variant="h5" component="h3" textAlign="center" gutterBottom className="typography-subheading">
                                SBI Realty Loans
                            </Typography>
                            <Table columns={columns.realty} dataSource={realtyLoans} pagination={false} />

                            <Typography variant="h5" component="h3" textAlign="center" gutterBottom className="typography-subheading">
                                SBI Tribal Plus Loans
                            </Typography>
                            <Table columns={columns.tribal} dataSource={tribalPlusLoans} pagination={false} />
                        </div>
                        <p>Last Updated 17-September-2024</p>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </>
    );
};

export default SBILoanCalculator;
