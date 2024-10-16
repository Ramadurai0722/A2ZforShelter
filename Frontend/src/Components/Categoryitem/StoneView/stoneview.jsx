import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../../config';
import './stoneview.css';  
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const StoneView = () => {
  const { id } = useParams();
  const [stone, setStone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContact, setShowContact] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchStone = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/stoneRoute/stone/${id}`);
        setStone(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStone();
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
  if (loading) return <p>Loading...</p>;
  if (!stone) return <p>No stone data available.</p>;

  return (
    <>
      <Navbar />
      <div className="stoneview-container">
        <div className="stoneview-card"> 
          <div className="stoneview-images-section">
            {stone.images && stone.images.length > 0 ? (
              <>
                <img
                  src={`${config.apiURL}/${stone.images[0]}`}
                  alt="Main Stone"
                  className="stoneview-main-image"
                  onClick={() => handleImageClick(`${config.apiURL}/${stone.images[0]}`)}
                />
                <div className="stoneview-thumbnail-carousel">
                  {stone.images.map((image, index) => (
                    <img
                      key={index}
                      src={`${config.apiURL}/${image}`}
                      alt={`Stone Image ${index + 1}`}
                      className="stoneview-thumbnail"
                      onClick={() => handleImageClick(`${config.apiURL}/${image}`)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <p>No images available</p>
            )}
          </div>

          <div className="stoneview-details-section"> 
            <h2 className="stoneview-title">{stone.stoneCategory || 'N/A'}</h2> 
            <p><strong>Seller Name:</strong> {stone.name || 'N/A'}</p>
            <p><strong>Stone Type:</strong> {stone.stoneType || 'N/A'}</p>
            <p><strong>Quantity:</strong> {stone.quantity || '1 Tonne'}</p>
            <p><strong>Price:</strong> {stone.price || 'N/A'} RPS</p>
            <p><strong>Description:</strong> {stone.description || 'N/A'}</p>
            <p><strong>Address:</strong> {stone.sellerAddress || 'N/A'}</p>

            <button className="stoneview-contact-details-button" onClick={handleToggleContact}> 
              {showContact ? 'Hide Contact Details' : 'Show Contact Details'}
            </button>

            {showContact && (
              <div className="stoneview-contact-details"> 
                <p><strong>Phone Number:</strong> {stone.phoneNumber || 'N/A'}</p>
                <p><strong>Email ID:</strong> {stone.email || 'N/A'}</p>
              </div>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="stoneview-modal-overlay" onClick={handleCloseModal}> 
            <div className="stoneview-modal-content"> 
              <span className="stoneview-close-button" onClick={handleCloseModal}>✖</span>
              <img src={selectedImage} alt="Enlarged View" className="stoneview-modal-image" /> 
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default StoneView;
