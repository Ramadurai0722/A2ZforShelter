import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import config from "../../../../config";
import "./pghostel.css"; 

const CategoryPgHostel1 = () => {
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
          `${config.apiURL}/pgHostelRoute/GetUserPG`,
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

  const handleViewDetailsClick = (pgHostelId) => {
    navigate(`/SellerPgView/${pgHostelId}`);
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
    <div className="pg21-house-category-container">
      <div className="pg21-house-header-container">
        <h2>PG Hostels</h2>
      </div>

      <div className="pg21-house-card-container">
        {data.map((pgHostel, index) => (
          <div
            key={index}
            className="pg21-house-card"
            onClick={() => handleViewDetailsClick(pgHostel._id)}
          >
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="pg21-house-carousel"
            >
              {pgHostel.photos && pgHostel.photos.length > 0 ? (
                pgHostel.photos.map((photo, idx) => (
                  <div key={idx}>
                    <img
                      src={`${config.apiURL}/${photo}`}
                      alt={`PG Hostel ${pgHostel.pgHostelName}`}
                      className="pg21-house-image"
                    />
                  </div>
                ))
              ) : (
                <div>No images available</div>
              )}
            </Carousel>
            <div className="pg21-house-card-content">
              <h3>{pgHostel.pgHostelName}</h3>
              <p>
                <strong>Location:</strong> {pgHostel.location}
              </p>
              <p>
                <strong>Total Floor:</strong> {pgHostel.totalFloors}
              </p>
              <p>
                <strong>Room:</strong> {pgHostel.acRoom}
              </p>
              <p>
                <strong>Food:</strong> {pgHostel.food}
              </p>
              <p>
                <strong>Car Parking:</strong> {pgHostel.carParking}
              </p>
              <p>
                <strong>Monthly Maintenance:</strong> {pgHostel.maintenance}
              </p>
              <p>
                <strong>Price:</strong> {pgHostel.price} RPS
              </p>
              <div className="pg21-house-card-buttons">
                <button
                  onClick={() => handleViewDetailsClick(pgHostel._id)}
                  className="pg21-house-view-details-button"
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

export default CategoryPgHostel1;
