import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../../config';
import './cementview.css';  
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const CementView = () => {
  const { id } = useParams();
  const [cement, setCement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContact, setShowContact] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchCement = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/cementRoutes/cement/${id}`);
        setCement(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCement();
  }, [id]);

  const handleToggleContact = () => {
    setShowContact(!showContact);  
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  if (error) return <p>Error: {error}</p>;
  if (!cement) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="cementview-container">
        <div className="cementview-card"> 
          <div className="cementview-images-section">
            <img
              src={`${config.apiURL}/${cement.images[0]}`}
              alt="Main Cement"
              className="cementview-main-image"
              onClick={() => handleImageClick(`${config.apiURL}/${cement.images[0]}`)}
            />
            <div className="cementview-thumbnail-carousel">
              {cement.images.map((image, index) => (
                <img
                  key={index}
                  src={`${config.apiURL}/${image}`}
                  alt={`Cement Image ${index + 1}`}
                  className="cementview-thumbnail"
                  onClick={() => handleImageClick(`${config.apiURL}/${image}`)}
                />
              ))}
            </div>
          </div>

          <div className="cementview-details-section"> 
            <h2 className="cementview-title">{cement.brand || 'N/A'}</h2> 
            <p><strong>Name:</strong> {cement.name || 'N/A'}</p>
            <p><strong>Type:</strong> {cement.cementType || 'N/A'}</p>
            <p><strong>Quantity:</strong> {cement.quantity || 'N/A'}</p>
            <p><strong>Price:</strong> {cement.price || 'N/A'} RPS</p>
            <p><strong>Description:</strong> {cement.description || 'N/A'}</p>
            <p><strong>Shop Address:</strong> {cement.shopAddress || 'N/A'}</p>

            <button className="cementview-contact-details-button" onClick={handleToggleContact}> 
              {showContact ? 'Hide Contact Details' : 'Show Contact Details'}
            </button>

            {showContact && (
              <div className="cementview-contact-details"> 
                <p><strong>Phone Number:</strong> {cement.phoneNumber || 'N/A'}</p>
                <p><strong>Email ID:</strong> {cement.email || 'N/A'}</p>
              </div>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="cementview-modal-overlay" onClick={handleCloseModal}> 
            <div className="cementview-modal-content"> 
              <span className="cementview-close-button" onClick={handleCloseModal}>✖</span>
              <img src={selectedImage} alt="Enlarged View" className="cementview-modal-image" /> 
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CementView;
