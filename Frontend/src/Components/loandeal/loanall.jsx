import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './loanall.css'; 
import config from '../../config';

const CategoryLoanAll = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loanRoute = `${config.apiURL}/loanRoute/loans`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(loanRoute);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="category-container">
        <div className="header-container">
          <h2>Loan Services</h2>
        </div>

        <div className="card-container">
          {data.map((loan) => (
            <div key={loan._id} className="card">
              <div className="card-content">
                <h3>{loan.loanType}</h3>
                <p><strong>Dealer Name:</strong> {loan.Name}</p>
                <p><strong>Bank Name:</strong> {loan.BankDearlerName}</p>
                <p><strong>Email:</strong> {loan.email}</p>
                <p><strong>Phone Number:</strong> {loan.phoneNumber}</p>
                <p><strong>Description:</strong> {loan.description}</p>
                <div className="card-buttons">
                  <button className="view-details-button">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryLoanAll;
