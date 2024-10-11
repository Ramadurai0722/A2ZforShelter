import React, { useEffect, useState } from 'react';
import config from '../../config';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './civilall.css'; 

const CivilEngineerList = () => {
  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const response = await fetch(`${config.apiURL}/civil/getall`);
        if (response.ok) {
          const data = await response.json();
          setEngineers(data);
        } else {
          throw new Error('Failed to fetch civil engineer data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEngineers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="category-container">
        <div className="header-container">
          <h2>Civil Engineer Services List</h2>
        </div>

        <div className="card-container">
          {engineers.map(engineer => (
            <div key={engineer._id} className="card">
              <div className="card-content">
                <h3>Name: {engineer.Name}</h3>
                <p><strong>Email:</strong> {engineer.email}</p>
                <p><strong>Phone Number:</strong> {engineer.phoneNumber}</p>
                <p><strong>Location:</strong> {engineer.location}</p>
                <p><strong>Experience:</strong> {engineer.experience} years</p>
                <p><strong>Construction Type:</strong> {engineer.constructionType}</p>
                <p><strong>Services Provided:</strong> {engineer.servicesProvided}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CivilEngineerList;
