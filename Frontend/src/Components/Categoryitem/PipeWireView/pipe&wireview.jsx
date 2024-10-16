import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../../config';
import './pipewireview.css';  
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const PipeWireView = () => {
  const { id } = useParams();
  const [pipeWire, setPipeWire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContact, setShowContact] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchPipeWire = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/pipeWiresRoute/pipewire/${id}`);
        setPipeWire(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPipeWire();
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
  if (!pipeWire) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="pipewireview-container">
        <div className="pipewireview-card">
          <div className="pipewireview-images-section">
            <img
              src={`${config.apiURL}/${pipeWire.images[0]}`}
              alt="Main PipeWire"
              className="pipewireview-main-image"
              onClick={() => handleImageClick(`${config.apiURL}/${pipeWire.images[0]}`)}
            />
            <div className="pipewireview-thumbnail-carousel">
              {pipeWire.images.map((image, index) => (
                <img
                  key={index}
                  src={`${config.apiURL}/${image}`}
                  alt={`PipeWire Image ${index + 1}`}
                  className="pipewireview-thumbnail"
                  onClick={() => handleImageClick(`${config.apiURL}/${image}`)}
                />
              ))}
            </div>
          </div>

          <div className="pipewireview-details-section">
            <h2 className="pipewireview-title">{pipeWire.Type === "Pipes" ? pipeWire.pipeBrand : pipeWire.wireBrand || 'N/A'}</h2>
            <p><strong>Seller Name:</strong> {pipeWire.name}</p>
            <p><strong>{pipeWire.Type === "Pipes" ? 'Pipe Type' : 'Wire Type'}:</strong> {pipeWire.Type === "Pipes" ? pipeWire.pipeType : pipeWire.wireType}</p>
            <p><strong>Diameter:</strong> {pipeWire.Type === "Pipes" ? pipeWire.pipeDiameter : pipeWire.wireDiameter}</p>
            <p><strong>Length:</strong> {pipeWire.Type === "Pipes" ? pipeWire.pipeLength : pipeWire.wireLength}</p>
            <p><strong>Quantity:</strong> {pipeWire.quantity}</p>
            <p><strong>Address:</strong> {pipeWire.sellerAddress}</p>
            <p><strong>Description:</strong> {pipeWire.description}</p>
            <p><strong>Price:</strong> {pipeWire.price} RPS</p>

            <button className="pipewireview-contact-details-button" onClick={handleToggleContact}>
              {showContact ? 'Hide Contact Details' : 'Show Contact Details'}
            </button>

            {showContact && (
              <div className="pipewireview-contact-details">
                <p><strong>Phone Number:</strong> {pipeWire.phoneNumber || 'N/A'}</p>
                <p><strong>Email ID:</strong> {pipeWire.email || 'N/A'}</p>
              </div>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="pipewireview-modal-overlay" onClick={handleCloseModal}>
            <div className="pipewireview-modal-content">
              <span className="pipewireview-close-button" onClick={handleCloseModal}>✖</span>
              <img src={selectedImage} alt="Enlarged View" className="pipewireview-modal-image" />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PipeWireView;
