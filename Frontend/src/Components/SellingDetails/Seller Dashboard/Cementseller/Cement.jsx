import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import config from "../../../../config";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import "./cement.css"; 

const CategoryCement1 = () => {
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
          `${config.apiURL}/cementRoutes/GetUserCement`,
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

  const handleViewDetailsClick = (cementId) => {
    navigate(`/Sellercementview/${cementId}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <CircularProgress />;

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
    <div className="cement21-category-container">
      <div className="cement21-header-container">
        <h2>Cement Products</h2>
      </div>

      <div className="cement21-card-container">
        {data.map((cement, index) => (
          <div
            key={index}
            className="cement21-card"
            onClick={() => handleViewDetailsClick(cement._id)}
          >
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="cement21-carousel"
            >
              {cement.images.map((photo, idx) => (
                <div key={idx}>
                  <img
                    src={`${config.apiURL}/${photo}`}
                    alt={`Cement ${cement.brand}`}
                    className="cement21-carousel-image" 
                  />
                </div>
              ))}
            </Carousel>
            <div className="cement21-card-content">
              <h3>{cement.brand}</h3>
              <p>
                <strong>Seller Name:</strong> {cement.name}
              </p>
              <p>
                <strong>Type:</strong> {cement.cementType}
              </p>
              <p>
                <strong>Quantity:</strong> {cement.quantity} <span>Kg</span>
              </p>
              <p>
                <strong>Price:</strong> {cement.price} RPS
              </p>
              <div className="cement21-card-buttons">
                <button
                  onClick={() => handleViewDetailsClick(cement._id)}
                  className="cement21-view-details-button"
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

export default CategoryCement1;
