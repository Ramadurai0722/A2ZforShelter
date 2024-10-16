import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../../config';
import './interiorview.css';  
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const InteriorView = () => {
  const { id } = useParams();
  const [interior, setInterior] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContact, setShowContact] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchInterior = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/interiorRoute/interior/${id}`);
        setInterior(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInterior();
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
  if (!interior) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="interiorview-container">
        <div className="interiorview-card">
          <div className="interiorview-images-section">
            <img
              src={`${config.apiURL}/${interior.images[0]}`}
              alt="Main Interior"
              className="interiorview-main-image"
              onClick={() => handleImageClick(`${config.apiURL}/${interior.images[0]}`)}
            />
            <div className="interiorview-thumbnail-carousel">
              {interior.images.map((image, index) => (
                <img
                  key={index}
                  src={`${config.apiURL}/${image}`}
                  alt={`Interior Image ${index + 1}`}
                  className="interiorview-thumbnail"
                  onClick={() => handleImageClick(`${config.apiURL}/${image}`)}
                />
              ))}
            </div>
          </div>

          <div className="interiorview-details-section">
            <h2 className="interiorview-title">{interior.category || 'N/A'}</h2>
            <p><strong>Seller Name:</strong> {interior.name || 'N/A'}</p>
            <p><strong>Product:</strong> {interior.products || 'N/A'}</p>
            <p><strong>Price:</strong> {interior.price || 'N/A'} RPS</p>
            <p><strong>Description:</strong> {interior.description || 'N/A'}</p>
            <p><strong>Address:</strong> {interior.sellerAddress || 'N/A'}</p>

            <button className="interiorview-contact-details-button" onClick={handleToggleContact}>
              {showContact ? 'Hide Contact Details' : 'Show Contact Details'}
            </button>

            {showContact && (
              <div className="interiorview-contact-details">
                <p><strong>Phone Number:</strong> {interior.phoneNumber || 'N/A'}</p>
                <p><strong>Email ID:</strong> {interior.email || 'N/A'}</p>
              </div>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="interiorview-modal-overlay" onClick={handleCloseModal}>
            <div className="interiorview-modal-content">
              <span className="interiorview-close-button" onClick={handleCloseModal}>✖</span>
              <img src={selectedImage} alt="Enlarged View" className="interiorview-modal-image" />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default InteriorView;
