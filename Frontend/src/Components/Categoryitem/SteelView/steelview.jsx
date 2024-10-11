import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../../config';
import './steelview.css';  
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const SteelView = () => {
  const { id } = useParams();
  const [steel, setSteel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContact, setShowContact] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchSteel = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/steelRoute/steel/${id}`);
        setSteel(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSteel();
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
  if (!steel) return 

  return (
    <>
      <Navbar />
      <div className="steelview-container">
        <div className="steelview-card">
          <div className="steelview-images-section">
            {steel.images && steel.images.length > 0 ? (
              <div className="steelview-image-grid">
                {steel.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${config.apiURL}/${image}`}
                    alt={`Steel Image ${index + 1}`}
                    className="steelview-image-item"
                    onClick={() => handleImageClick(`${config.apiURL}/${image}`)}
                  />
                ))}
              </div>
            ) : (
              <p>No images available</p>
            )}
          </div>

          <div className="steelview-details-section">
            <h2 className="steelview-title">{steel.brand || 'N/A'}</h2>
            <p><strong>Steel Type:</strong> {steel.steelType || 'N/A'}</p>
            <p><strong>Steel Category:</strong> {steel.steelCategory || 'N/A'}</p>
            <p><strong>Steel Thickness:</strong> {steel.steelThickness || 'N/A'}</p>
            <p><strong>Meter:</strong> {steel.meter || '1 Meter'}</p>
            <p><strong>Price:</strong> {steel.price || 'N/A'} RPS</p>
            <p><strong>Description:</strong> {steel.description || 'N/A'}</p>
            <p><strong>Address:</strong> {steel.shopAddress || 'N/A'}</p>

            <button className="steelview-contact-details-button" onClick={handleToggleContact}>
              {showContact ? 'Hide Contact Details' : 'Show Contact Details'}
            </button>

            {showContact && (
              <div className="steelview-contact-details">
                <p><strong>Phone Number:</strong> {steel.phoneNumber || 'N/A'}</p>
                <p><strong>Email ID:</strong> {steel.email || 'N/A'}</p>
              </div>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="steelview-modal-overlay" onClick={handleCloseModal}>
            <div className="steelview-modal-content">
              <span className="steelview-close-button" onClick={handleCloseModal}>X</span>
              <img src={selectedImage} alt="Enlarged View" className="steelview-modal-image" />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SteelView;
