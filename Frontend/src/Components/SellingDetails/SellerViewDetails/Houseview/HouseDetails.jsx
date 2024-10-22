import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../../../config";
import Navbar from "../../../Navbar/Navbar";
import Footer from "../../../Footer/Footer";
import './houseview.css';

const SellerHouseView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/houseRoute/house/${id}`);
        setHouse(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHouse();
  }, [id]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${config.apiURL}/houseRoute/house/${id}`);
      navigate('/sellDashBoard'); 
    } catch (err) {
      setError("Failed to delete house.");
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Loading...</p>;
  if (!house) return <p>No house data available.</p>;

  return (
    <>
      <Navbar />
      <div className="houseview-container">
        <div className="houseview-card">
          <div className="houseview-image-preview-container">
            {house.photos && house.photos.length > 0 ? (
              <img
                src={`${config.apiURL}/${house.photos[0]}`}
                alt="House Preview"
                className="houseview-image-preview"
                onClick={() => handleImageClick(`${config.apiURL}/${house.photos[0]}`)}
              />
            ) : (
              <p>No images available</p>
            )}
            <div className="houseview-image-grid">
              {house.photos && house.photos.map((photo, index) => (
                <img
                  key={index}
                  src={`${config.apiURL}/${photo}`}
                  alt={`House Image ${index + 1}`}
                  className="houseview-image-item"
                  onClick={() => handleImageClick(`${config.apiURL}/${photo}`)}
                />
              ))}
            </div>
          </div>

          <div className="houseview-details-section">
            <h2 className="houseview-title">{house.adTitle || 'N/A'}</h2>
            <div className="houseview-info">
              <p><strong>Project Name:</strong> {house.projectName || 'N/A'}</p>
              <p><strong>Type:</strong> {house.type || 'N/A'}</p>
              <p><strong>Location:</strong> {`${house.location || 'N/A'}, ${house.cityName || 'N/A'}, ${house.districtName || 'N/A'}, ${house.stateName || 'N/A'}`}</p>
              <p><strong>House:</strong> {house.bedrooms || 'N/A'} BHK</p>
              <p><strong>Bathrooms:</strong> {house.bathrooms || 'N/A'}</p>
              <p><strong>Furnishing:</strong> {house.furnishing || 'N/A'}</p>
              <p><strong>Construction Status:</strong> {house.constructionStatus || 'N/A'}</p>
              <p><strong>Listed By:</strong> {house.listedBy || 'N/A'}</p>
              <p><strong>Super Built-up Area:</strong> {house.superBuiltupArea || 'N/A'} sqft</p>
              <p><strong>Carpet Area:</strong> {house.carpetArea || 'N/A'} sqft</p>
              <p><strong>Total Floors:</strong> {house.totalFloors || 'N/A'}</p>
              <p><strong>Floor No:</strong> {house.floorNo || 'N/A'}</p>
              <p><strong>Car Parking:</strong> {house.carParking || 'N/A'}</p>
              <p><strong>Facing:</strong> {house.facing || 'N/A'}</p>
              <p><strong>Price:</strong> {house.price || 'N/A'} RPS</p>
              <p><strong>Maintenance:</strong> {house.maintenance || 'N/A'} RPS</p>
              <p><strong>Purpose:</strong> {house.purpose || 'N/A'}</p>
              <p><strong>Description:</strong> {house.description || 'N/A'}</p>
            </div>
          
            <button onClick={() => navigate(`/editHouse/${id}`)} className="houseview-edit-button">
              Edit
            </button>
            <button onClick={handleDelete} className="houseview-delete-button">
              Delete
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="houseview-modal-overlay" onClick={handleCloseModal}>
            <div className="houseview-modal-content">
              <span className="houseview-close-button" onClick={handleCloseModal}>X</span>
              <img src={selectedImage} alt="Enlarged View" className="houseview-modal-image" />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SellerHouseView;
