import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../../config';
import './landview.css';  
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const LandView = () => {
  const { id } = useParams();
  const [land, setLand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContact, setShowContact] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchLand = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/landRoute/land/${id}`);
        setLand(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLand();
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!land) return <p>No land details available.</p>;

  return (
    <>
      <Navbar />
      <div className="landview-container">
        <div className="landview-card">
          <div className="landview-images-section">
            {land.photos && land.photos.length > 0 ? (
              <>
                <img
                  src={`${config.apiURL}/${land.photos[0]}`}
                  alt="Main Land"
                  className="landview-main-image"
                  onClick={() => handleImageClick(`${config.apiURL}/${land.photos[0]}`)}
                />
                <div className="landview-thumbnail-carousel">
                  {land.photos.map((image, index) => (
                    <img
                      key={index}
                      src={`${config.apiURL}/${image}`}
                      alt={`Land Image ${index + 1}`}
                      className="landview-image-item"
                      onClick={() => handleImageClick(`${config.apiURL}/${image}`)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <p>No images available</p>
            )}
          </div>

          <div className="landview-details-section">
            <h2 className="landview-title">{land.projectName || 'N/A'}</h2>
            <p><strong>Purpose:</strong> {land.purpose || 'N/A'}</p>
            <p><strong>Location:</strong> {land.location || 'N/A'}</p>
            <p><strong>Area:</strong> {land.landArea || 'N/A'} sq ft</p>
            <p><strong>Status:</strong> {land.status || 'N/A'}</p>
            <p><strong>Facing:</strong> {land.facing || 'N/A'}</p>
            <p><strong>Price:</strong> ${land.price || 'N/A'}</p>
            <p><strong>Listed By:</strong> {land.listedBy || 'N/A'}</p>
            <p><strong>Description:</strong> {land.description || 'N/A'}</p>

            <button className="landview-contact-details-button" onClick={handleToggleContact}>
              {showContact ? 'Hide Contact Details' : 'Show Contact Details'}
            </button>

            {showContact && (
              <div className="landview-contact-details">
                <p><strong>Phone Number:</strong> {land.phoneNumber || 'N/A'}</p>
                <p><strong>Email ID:</strong> {land.email || 'N/A'}</p>
              </div>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="landview-modal-overlay" onClick={handleCloseModal}>
            <div className="landview-modal-content">
              <span className="landview-close-button" onClick={handleCloseModal}>✖</span>
              <img src={selectedImage} alt="Enlarged View" className="landview-modal-image" />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default LandView;
