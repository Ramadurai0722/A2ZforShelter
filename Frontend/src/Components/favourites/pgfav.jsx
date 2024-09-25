import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Snackbar, Button } from "@mui/material";
import { Carousel } from 'react-responsive-carousel';
import { Alert } from "@mui/material";
import './fav.css';
import config from "../../config";
import { FaHeart } from 'react-icons/fa'; // Import heart icon

const PgHostelWithFavourites = () => {
  const [pgHostelData, setPgHostelData] = useState([]);
  const [favouriteData, setFavouriteData] = useState([]);
  const [matchedPgHostels, setMatchedPgHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Retrieve the user ID

  useEffect(() => {
    const fetchPgHostelAndFavourites = async () => {
      try {
        const pgHostelResponse = await axios.get(`${config.apiURL}/pgHostelRoute/pgHostel`);
        setPgHostelData(pgHostelResponse.data);

        const favouriteResponse = await axios.get(`${config.apiURL}/favourites/all/${userId}`);
        setFavouriteData(favouriteResponse.data);

        const matchedItems = pgHostelResponse.data.filter((pgHostel) =>
          favouriteResponse.data.some(fav => fav.toString() === pgHostel._id.toString())
        );

        setMatchedPgHostels(matchedItems);
      } catch (err) {
        setError(err.message);
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPgHostelAndFavourites();
  }, [userId]);

  const handleViewDetailsClick = (pgHostelId) => {
    navigate(`/productviewpg/${pgHostelId}`);
  };

  const handleRemoveFavourite = async (pgHostelId) => {
    try {
      await axios.delete(`${config.apiURL}/favourites/remove`, { data: { userId, productId: pgHostelId } });
      // Refresh the favorites list after removal
      const updatedFavouriteResponse = await axios.get(`${config.apiURL}/favourites/all/${userId}`);
      setFavouriteData(updatedFavouriteResponse.data);
      // Update the displayed favorites
      const updatedMatchedItems = pgHostelData.filter((pgHostel) =>
        updatedFavouriteResponse.data.some(fav => fav.toString() === pgHostel._id.toString())
      );
      setMatchedPgHostels(updatedMatchedItems);
    } catch (error) {
      setError("Failed to remove from favourites");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) return <CircularProgress />;

  if (error)
    return (
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    );

  return (
    <div className="category-container">
      <div className="card-container">
        {matchedPgHostels.map((item) => (
          <div className="card" key={item._id}>
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="carousel"
            >
              {item.photos.map((photo, idx) => (
                <div key={idx}>
                  <img src={`${config.apiURL}/${photo}`} alt={`PG Hostel ${item.name}`} />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              <h3>{item.pgHostelName}</h3>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Total Floor:</strong> {item.totalFloors}</p>
              <p><strong>Room:</strong> {item.acRoom}</p>
              <p><strong>Food:</strong> {item.food}</p>
              <p><strong>Car Parking:</strong> {item.carParking}</p>
              <p><strong>Monthly Maintenance:</strong> {item.maintenance}</p>
              <p><strong>Price:</strong> {item.price} RPS</p>
              <div className="card-buttons">
                <Button
                  className="view-details-button"
                  onClick={() => handleViewDetailsClick(item._id)}
                >
                  View Details
                </Button>
                <Button 
                  className="favourite-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFavourite(item._id);
                  }}
                >
                  <FaHeart className="favourite-icon filled" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PgHostelWithFavourites;
