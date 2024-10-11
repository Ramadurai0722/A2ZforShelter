import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import config from '../../config';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './borewellall.css'; 

const BorewellList = () => {
  const [borewells, setBorewells] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBorewells = async () => {
      try {
        const response = await fetch(`${config.apiURL}/borewell/getall`);
        if (response.ok) {
          const data = await response.json();
          setBorewells(data);
        } else {
          throw new Error('Failed to fetch borewell data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBorewells();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return

  return (
    <>
      <Navbar />
      <div className="category-container">
        <div className="header-container">
          <h2>Borewell Services List</h2>
        </div>

        <div className="card-container">
          {borewells.map(borewell => (
            <div key={borewell._id} className="card">
                <div className="card-content">
                  <h3>Name : {borewell.Name}</h3>
                  <p><strong>Location : </strong> {borewell.location}</p>
                  <p><strong>Depth : </strong> {borewell.borewellDepth} ft</p>
                  <p><strong>Water Source : </strong> {borewell.waterSourceType}</p>
                  <p><strong>Equipement Details : </strong> {borewell.equipmentDetails}</p>
                  <p><strong>Drilling Type : </strong> {borewell.drillingType}</p>
                  <p><strong>Email : </strong> {borewell.email}</p>
                  <p><strong>Phone Number : </strong> {borewell.phoneNumber}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BorewellList;
