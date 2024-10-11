import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import config from "../../../../config";
import "./interior.css"; 

const CategoryInterior1 = () => {
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
          `${config.apiURL}/interiorRoute/GetUserInterior`,
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

  const handleViewDetailsClick = (interiorId) => {
    navigate(`/Sellerinteriorview/${interiorId}`);
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
    <div className="interior21-category-container">
      <div className="interior21-header-container">
        <h2>Interior Products</h2>
      </div>

      <div className="interior21-card-container">
        {data.map((interior, index) => (
          <div
            key={index}
            className="interior21-card"
            onClick={() => handleViewDetailsClick(interior._id)}
          >
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="interior21-carousel"
            >
              {interior.images.map((photo, idx) => (
                <div key={idx}>
                  <img
                    src={`${config.apiURL}/${photo}`}
                    alt={`Interior ${interior.name}`}
                    className="interior21-image"
                  />
                </div>
              ))}
            </Carousel>
            <div className="interior21-card-content">
              <h3>{interior.products}</h3>
              <p>
                <strong>Seller Name:</strong> {interior.name}
              </p>
              <p>
                <strong>Category:</strong> {interior.category}
              </p>
              <p>
                <strong>Description:</strong> {interior.description}
              </p>
              <p>
                <strong>Price:</strong> {interior.price} RPS
              </p>
              <div className="interior21-card-buttons">
                <button
                  onClick={() => handleViewDetailsClick(interior._id)}
                  className="interior21-view-details-button"
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

export default CategoryInterior1;
