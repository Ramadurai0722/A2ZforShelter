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
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredData = data.filter(loan => {
    const { Name, BankDearlerName, email, phoneNumber, description, loanType } = loan;
    const query = searchQuery.toLowerCase();
    return (
      (Name && Name.toLowerCase().includes(query)) ||
      (BankDearlerName && BankDearlerName.toLowerCase().includes(query)) ||
      (email && email.toLowerCase().includes(query)) ||
      (phoneNumber && phoneNumber.toLowerCase().includes(query)) ||
      (description && description.toLowerCase().includes(query)) ||
      (loanType && loanType.toLowerCase().includes(query))
    );
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="loanall-container">
        <div className="loanall-header-container">
          <h2>Loan Services</h2>
          <div className="loanall-search-container">
            <input
              type="text"
              placeholder="Search by dealer name, bank name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="loanall-search-input"
            />
            <button 
              onClick={() => setSearchQuery('')} 
              className="loanall-search-button"
            > 
              Clear
            </button>
          </div>
        </div>

        <div className="loanall-card-container">
          {filteredData.length > 0 ? (
            filteredData.map((loan) => (
              <div key={loan._id} className="loanall-card">
                <div className="loanall-card-content">
                  <h3>{loan.loanType}</h3>
                  <p><strong>Dealer Name:</strong> {loan.Name}</p>
                  <p><strong>Bank Name:</strong> {loan.BankDearlerName}</p>
                  <p><strong>Email:</strong> {loan.email}</p>
                  <p><strong>Phone Number:</strong> {loan.phoneNumber}</p>
                  <p><strong>Description:</strong> {loan.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-loans-message">
              No loans available matching "<strong>{searchQuery}</strong>"
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryLoanAll;
