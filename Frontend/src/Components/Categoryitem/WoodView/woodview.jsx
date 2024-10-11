import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../../config';
import './woodview.css';  
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const WoodView = () => {
  const { id } = useParams();
  const [wood, setWood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContact, setShowContact] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchWood = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/woodRoute/wood/${id}`);
        setWood(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWood();
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
  if (!wood) return 

  return (
    <>
      <Navbar />
      <div className="woodview-container">
        <div className="woodview-card">
          <div className="woodview-images-section">
            {wood.images && wood.images.length > 0 ? (
              <div className="woodview-image-grid">
                {wood.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${config.apiURL}/${image}`}
                    alt={`Wood Image ${index + 1}`}
                    className="woodview-image-item"
                    onClick={() => handleImageClick(`${config.apiURL}/${image}`)}
                  />
                ))}
              </div>
            ) : (
              <p>No images available</p>
            )}
          </div>

          <div className="woodview-details-section">
            <h2 className="woodview-title">{wood.wood || 'N/A'}</h2>
            <p><strong>Seller Name:</strong> {wood.name || 'N/A'}</p>
            <p><strong>Thickness:</strong> {wood.thickness || 'N/A'}</p>
            <p><strong>Quantity Type:</strong> {wood.quantityType || 'N/A'}</p>
            <p><strong>Quantity:</strong> {wood.quantity || 'N/A'}</p>
            <p><strong>Price:</strong> {wood.price || 'N/A'} RPS</p>
            <p><strong>Description:</strong> {wood.description || 'N/A'}</p>
            <p><strong>Address:</strong> {wood.sellerAddress || 'N/A'}</p>

            <button className="woodview-contact-details-button" onClick={handleToggleContact}>
              {showContact ? 'Hide Contact Details' : 'Show Contact Details'}
            </button>

            {showContact && (
              <div className="woodview-contact-details">
                <p><strong>Phone Number:</strong> {wood.phoneNumber || 'N/A'}</p>
                <p><strong>Email ID:</strong> {wood.email || 'N/A'}</p>
              </div>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="woodview-modal-overlay" onClick={handleCloseModal}>
            <div className="woodview-modal-content">
              <span className="woodview-close-button" onClick={handleCloseModal}>X</span>
              <img src={selectedImage} alt="Enlarged View" className="woodview-modal-image" />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WoodView;
