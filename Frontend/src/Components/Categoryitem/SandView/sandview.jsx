import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../../config';
import './sandview.css';  
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const SandView = () => {
  const { id } = useParams();
  const [sand, setSand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContact, setShowContact] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchSand = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/sandRoute/sand/${id}`);
        setSand(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSand();
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
  if (!sand) return

  return (
    <>
      <Navbar />
      <div className="sandview-container">
        <div className="sandview-card">
          <div className="sandview-images-section">
            {sand.images && sand.images.length > 0 ? (
              <div className="sandview-image-grid">
                {sand.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${config.apiURL}/${image}`}
                    alt={`Sand Image ${index + 1}`}
                    className="sandview-image-item"
                    onClick={() => handleImageClick(`${config.apiURL}/${image}`)}
                  />
                ))}
              </div>
            ) : (
              <p>No images available</p>
            )}
          </div>

          <div className="sandview-details-section">
            <h2 className="sandview-title">{sand.sandType || 'N/A'}</h2>
            <p><strong>Seller Name:</strong> {sand.name || 'N/A'}</p>
            <p><strong>Quantity:</strong> {sand.quantity || 'N/A'}</p>
            <p><strong>Price:</strong> {sand.price || 'N/A'} RPS</p>
            <p><strong>Description:</strong> {sand.description || 'N/A'}</p>
            <p><strong>Address:</strong> {sand.sellerAddress || 'N/A'}</p>

            <button className="sandview-contact-details-button" onClick={handleToggleContact}>
              {showContact ? 'Hide Contact Details' : 'Show Contact Details'}
            </button>

            {showContact && (
              <div className="sandview-contact-details">
                <p><strong>Phone Number:</strong> {sand.phoneNumber || 'N/A'}</p>
                <p><strong>Email ID:</strong> {sand.email || 'N/A'}</p>
              </div>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="sandview-modal-overlay" onClick={handleCloseModal}>
            <div className="sandview-modal-content">
              <span className="sandview-close-button" onClick={handleCloseModal}>X</span>
              <img src={selectedImage} alt="Enlarged View" className="sandview-modal-image" />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SandView;
