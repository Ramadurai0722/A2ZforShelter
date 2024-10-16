import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './SbiEmi.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

ChartJS.register(ArcElement, Tooltip, Legend);

const BajajEmi = () => {
  const [loanAmount, setLoanAmount] = useState(6500000);
  const [interestRate, setInterestRate] = useState(9);
  const [loanTenure, setLoanTenure] = useState(5);
  const [emi, setEmi] = useState(0);
  const [interestAmount, setInterestAmount] = useState(0);
  const [principalAmount, setPrincipalAmount] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);
  const [eligibleEmi, setEligibleEmi] = useState(0);

  const calculateEMI = () => {
    let principal = loanAmount;
    let annualInterestRate = interestRate;
    let tenureInYears = loanTenure;

    let monthlyInterestRate = annualInterestRate / (12 * 100);
    let tenureInMonths = tenureInYears * 12;

    let emiCalculated = (
      principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, tenureInMonths)
    ) / (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1);

    let totalRepaymentAmount = emiCalculated * tenureInMonths;
    let totalInterest = totalRepaymentAmount - principal;

    setEmi(emiCalculated.toFixed(2));
    setInterestAmount(totalInterest.toFixed(2));
    setPrincipalAmount(principal);
    setTotalRepayment(totalRepaymentAmount.toFixed(2));
    setEligibleEmi(emiCalculated.toFixed(2));
  };

  const pieData = {
    labels: ['Eligible EMI', 'Principal Amount', 'Interest Amount'],
    datasets: [
      {
        label: 'EMI Breakdown',
        data: [eligibleEmi, principalAmount, interestAmount],
        backgroundColor: ['#007bff', '#28a745', '#ff6384'],
        hoverBackgroundColor: ['#0056b3', '#1e7e34', '#ff4d67'],
      },
    ],
  };

  return (
    <>
    <Navbar />
    <div className="sbi-emi-container">
      <header className="header">
        <h1>BAJAJ Home Loan EMI Calculator</h1>
      </header>

      <section className="content-container">
        <div className="chart-section">
          <h2 className="sub-header">EMI Breakdown</h2>
          <div className="chart-wrapper">
            <Pie data={pieData} />
          </div>
        </div>

        <div className="input-section">
          <h2 className="sub-header">Calculate Your EMI</h2>
          <div className="input-container">
            <label className="label">Loan Amount (₹): </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="input"
            />

            <label className="label">Interest Rate (% p.a.): </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="input"
            />

            <label className="label">Loan Tenure (years): </label>
            <input
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
              className="input"
            />

            <button onClick={calculateEMI} className="button">
              Calculate EMI
            </button>
          </div>

          <div className="result-container">
            <h3>Your EMI: ₹{emi}</h3>
          </div>
        </div>
      </section>

      <section className="summary-section">
        <h2 className="sub-header">Loan Summary</h2>
        <p>Total Principal: ₹{principalAmount}</p>
        <p>Total Interest: ₹{interestAmount}</p>
        <p>Total Repayment Amount: ₹{totalRepayment}</p>
      </section>

      <section className="info-section">
        <h1>Home Loan Prepayment Calculator</h1>
        <p>
          For purchasing or constructing a property, home loans are the ideal financing option. The SBI home loan is available to all businessmen, self-employed, and salaried people. Women borrowers can avail special interest rates. If you are unsure about the monthly installments, using an SBI home loan calculator will prove to be beneficial. It will allow you to pre-plan the repayment process once you are accustomed to the interest and EMI amounts.
        </p>
      </section>

      <section className="formula-section">
        <h1>Home Loan EMI Calculation Formula</h1>
        <p>
          Curious about how the home loan EMI calculator works? Well, it works on the following standardized formula –<br/>
          <strong>E = [P.r. (1+r)^n]/[(1+r)^n-1]</strong><br/>
          where <strong>P</strong> = Principal/Loan Amount<br/>
          <strong>E</strong>= applicable amount of EMI<br/>
          <strong>r</strong> = rate of interest per month (annual rate of interest divided by 12)<br/>
          <strong>n</strong> = tenure (in months)<br/>
          For example, if any borrower avails a loan of 40 lakh for a tenure of 10 years at a 6.80% p.a. rate of interest, the applicable EMI will be –<br/>
          <strong>E = 40,00,000 × .0056 × (1+.0056)^120/([(1+.0056)^120]-1)</strong><br/>
          EMI = Rs. 46,032<br/>
          Manually calculating the home loan EMI can be confusing and time-consuming. To help you generate accurate EMI results, Magicbricks offers a free tool known as the Magicbricks Home Loan EMI Calculator.
        </p>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default BajajEmi;
