import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import config from "../../../../config";
import "./sand.css";

const CategorySand1 = () => {
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
          `${config.apiURL}/sandRoute/GetUserSand`,
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

  const handleViewDetailsClick = (sandId) => {
    navigate(`/Sellersandview/${sandId}`);
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
    <div className="sand21-category-container">
      <div className="sand21-header-container">
        <h2>Sand Products</h2>
      </div>

      <div className="sand21-card-container">
        {data.map((sand, index) => (
          <div
            key={index}
            className="sand21-card"
            onClick={() => handleViewDetailsClick(sand._id)}
          >
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="sand21-carousel"
            >
              {sand.images.map((photo, idx) => (
                <div key={idx}>
                  <img
                    src={`${config.apiURL}/${photo}`}
                    alt={`Sand ${sand.name}`}
                    className="sand21-image"
                  />
                </div>
              ))}
            </Carousel>
            <div className="sand21-card-content">
              <h3>{sand.sandType}</h3>
              <p>
                <strong>Seller Name:</strong> {sand.name}
              </p>
              <p>
                <strong>Quantity:</strong> {sand.quantity}
              </p>
              <p>
                <strong>Price:</strong> {sand.price} RPS
              </p>
              <div className="sand21-card-buttons">
                <button
                  onClick={() => handleViewDetailsClick(sand._id)}
                  className="sand21-view-details-button"
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

export default CategorySand1;
