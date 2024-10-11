import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import config from "../../../../config";
import './steel.css'; 

const CategorySteel1 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setSnackbarMessage("Please log in");
        setSnackbarOpen(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${config.apiURL}/steelRoute/GetUserSteel`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewDetailsClick = (steelId) => {
    navigate(`/Sellersteelview/${steelId}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <CircularProgress className="loading-container" />;
  if (error)
    return (
      <Snackbar
        open={true}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          Error: {error}
        </Alert>
      </Snackbar>
    );

  return (
    <div className="steel21-category-container">
      <div className="steel21-header-container">
        <h2>Steel Products</h2>
      </div>

      <div className="steel21-card-container">
        {data.map((steel, index) => (
          <div
            key={index}
            className="steel21-card"
            onClick={() => handleViewDetailsClick(steel._id)}
          >
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="steel21-carousel"
            >
              {steel.images.map((photo, idx) => (
                <div key={idx}>
                  <img
                    src={`${config.apiURL}/${photo}`}
                    alt={`Steel ${steel.name}`}
                    className="steel21-image"
                  />
                </div>
              ))}
            </Carousel>
            <div className="steel21-card-content">
              <h3>{steel.brand}</h3>
              <p>
                <strong>Seller Name:</strong> {steel.name}
              </p>
              <p>
                <strong>Category:</strong> {steel.steelCategory}
              </p>
              <p>
                <strong>Type:</strong> {steel.steelType}
              </p>
              <p>
                <strong>Thickness:</strong> {steel.steelThickness}
              </p>
              <p>
                <strong>Length:</strong> {steel.meter}
              </p>
              <p>
                <strong>Price:</strong> {steel.price} RPS
              </p>
              <div className="steel21-card-buttons">
                <button
                  onClick={() => handleViewDetailsClick(steel._id)}
                  className="steel21-view-details-button"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="warning">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CategorySteel1;
