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
  if (!pipeWire) return 

  return (
    <>
      <Navbar />
      <div className="pipewireview-container">
        <div className="pipewireview-card">
          <div className="pipewireview-images-section">
            {pipeWire.images && pipeWire.images.length > 0 ? (
              <div className="pipewireview-image-grid">
                {pipeWire.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${config.apiURL}/${image}`}
                    alt={`PipeWire Image ${index + 1}`}
                    className="pipewireview-image-item"
                    onClick={() => handleImageClick(`${config.apiURL}/${image}`)}
                  />
                ))}
              </div>
            ) : (
              <p>No images available</p>
            )}
          </div>

          <div className="pipewireview-details-section">
            {pipeWire.Type === "Pipes" ? (
              <>
                <h2 className="pipewireview-title">{pipeWire.pipeBrand || 'N/A'}</h2>
                <p><strong>Seller Name:</strong> {pipeWire.name}</p>
                <p><strong>Pipe Type:</strong> {pipeWire.pipeType}</p>
                <p><strong>Diameter:</strong> {pipeWire.pipeDiameter}</p>
                <p><strong>Length:</strong> {pipeWire.pipeLength}</p>
                <p><strong>Quantity:</strong> {pipeWire.quantity}</p>
                <p><strong>Address:</strong> {pipeWire.sellerAddress}</p>
                <p><strong>Description:</strong> {pipeWire.description}</p>
                <p><strong>Price:</strong> {pipeWire.price} RPS</p>
              </>
            ) : pipeWire.Type === "Wires" ? (
              <>
                <h2 className="pipewireview-title">{pipeWire.wireBrand || 'N/A'}</h2>
                <p><strong>Seller Name:</strong> {pipeWire.name}</p>
                <p><strong>Wire Type:</strong> {pipeWire.wireType}</p>
                <p><strong>Diameter:</strong> {pipeWire.wireDiameter}</p>
                <p><strong>Length:</strong> {pipeWire.wireLength}</p>
                <p><strong>Quantity:</strong> {pipeWire.quantity}</p>
                <p><strong>Address:</strong> {pipeWire.sellerAddress}</p>
                <p><strong>Description:</strong> {pipeWire.description}</p>
                <p><strong>Price:</strong> {pipeWire.price} RPS</p>
              </>
            ) : null}

            {/* Button to toggle contact details */}
            <button className="pipewireview-contact-details-button" onClick={handleToggleContact}>
              {showContact ? 'Hide Contact Details' : 'Show Contact Details'}
            </button>

            {/* Contact details section */}
            {showContact && (
              <div className="pipewireview-contact-details">
                <p><strong>Phone Number:</strong> {pipeWire.phoneNumber || 'N/A'}</p>
                <p><strong>Email ID:</strong> {pipeWire.email || 'N/A'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal for showing larger image */}
        {isModalOpen && (
          <div className="pipewireview-modal-overlay" onClick={handleCloseModal}>
            <div className="pipewireview-modal-content">
              <span className="pipewireview-close-button" onClick={handleCloseModal}>X</span>
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
