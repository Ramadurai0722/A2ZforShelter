import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import config from "../../../../config";
import "./wood.css";

const CategoryWood1 = () => {
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
          `${config.apiURL}/woodRoute/GetUserWood`,
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

  const handleViewDetailsClick = (woodId) => {
    navigate(`/Sellerwoodview/${woodId}`);
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
    <div className="wood21-category-container">
      <div className="wood21-header-container">
        <h2>Wood Products</h2>
      </div>

      <div className="wood21-card-container">
        {data.map((wood, index) => (
          <div
            key={index}
            className="wood21-card"
            onClick={() => handleViewDetailsClick(wood._id)}
          >
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="wood21-carousel"
            >
              {wood.images.map((photo, idx) => (
                <div key={idx}>
                  <img
                    src={`${config.apiURL}/${photo}`}
                    alt={`Wood ${wood.name}`}
                    className="wood21-image"
                  />
                </div>
              ))}
            </Carousel>
            <div className="wood21-card-content">
              <h3>{wood.wood}</h3>
              <p>
                <strong>Seller Name:</strong> {wood.name}
              </p>
              <p>
                <strong>Thickness:</strong> {wood.thickness}
              </p>
              <p>
                <strong>Quantity:</strong> {wood.quantity}
              </p>
              <p>
                <strong>Price:</strong> {wood.price} RPS
              </p>
              <div className="wood21-card-buttons">
                <button
                  onClick={() => handleViewDetailsClick(wood._id)}
                  className="wood21-view-details-button"
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

export default CategoryWood1;
