import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../../config';
import './cateringview.css';  
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const CateringView = () => {
  const { id } = useParams();
  const [catering, setCatering] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContact, setShowContact] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchCatering = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/cateringRoute/catering/${id}`);
        setCatering(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCatering();
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
  if (!catering) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="cateringview-container">
        <div className="cateringview-card">
          <div className="cateringview-images-section">
            <img
              src={`${config.apiURL}/${catering.images[0]}`}
              alt="Main Catering"
              className="cateringview-main-image"
              onClick={() => handleImageClick(`${config.apiURL}/${catering.images[0]}`)}
            />
            <div className="cateringview-thumbnail-carousel">
              {catering.images.map((image, index) => (
                <img
                  key={index}
                  src={`${config.apiURL}/${image}`}
                  alt={`Catering Image ${index + 1}`}
                  className="cateringview-thumbnail"
                  onClick={() => handleImageClick(`${config.apiURL}/${image}`)}
                />
              ))}
            </div>
          </div>

          <div className="cateringview-details-section">
            <h2 className="cateringview-title">{catering.name || 'N/A'}</h2>
            <p className="cateringview-price">{catering.price || 'N/A'} RPS</p>
            <p><strong>Meals Offered:</strong> {catering.meals || 'N/A'}</p>
            <p><strong>Number of Consumers:</strong> {catering.numberOfPeople || 'N/A'}</p>
            <p><strong>Description:</strong> {catering.description || 'N/A'}</p>
            <p><strong>Menu Catalogues:</strong> {catering.menuCatalogues || 'N/A'}</p>
            <p><strong>Address:</strong> {catering.shopAddress || 'N/A'}</p>

            <button className="cateringview-contact-details-button" onClick={handleToggleContact}>
              {showContact ? 'Hide Contact Details' : 'Show Contact Details'}
            </button>

            {showContact && (
              <div className="cateringview-contact-details">
                <p><strong>Phone Number:</strong> {catering.phoneNumber || 'N/A'}</p>
                <p><strong>Email ID:</strong> {catering.email || 'N/A'}</p>
              </div>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="cateringview-modal-overlay" onClick={handleCloseModal}>
            <div className="cateringview-modal-content">
              <span className="cateringview-close-button" onClick={handleCloseModal}>✖</span>
              <img src={selectedImage} alt="Enlarged View" className="cateringview-modal-image" />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CateringView;
