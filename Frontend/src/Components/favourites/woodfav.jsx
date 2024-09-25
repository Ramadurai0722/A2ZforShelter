import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Snackbar, Button, Alert } from "@mui/material";
import { Carousel } from 'react-responsive-carousel';
import './fav.css'; 
import config from "../../config";
import { FaHeart } from 'react-icons/fa';

const WoodFav = () => {
  const [woodData, setWoodData] = useState([]);
  const [favouriteData, setFavouriteData] = useState([]);
  const [matchedWoodItems, setMatchedWoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchWoodAndFavourites();
  }, [userId]);

  const fetchWoodAndFavourites = async () => {
    try {
      const woodResponse = await axios.get(`${config.apiURL}/woodRoute/wood`);
      setWoodData(woodResponse.data);

      const favouriteResponse = await axios.get(`${config.apiURL}/favourites/all/${userId}`);
      setFavouriteData(favouriteResponse.data);

      const matchedItems = woodResponse.data.filter((woodItem) =>
        favouriteResponse.data.some(fav => fav.toString() === woodItem._id.toString())
      );

      setMatchedWoodItems(matchedItems);
    } catch (err) {
      setError(err.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetailsClick = (woodId) => {
    navigate(`/woodview/${woodId}`);
  };

  const handleRemoveFavourite = async (woodId) => {
    try {
      await axios.delete(`${config.apiURL}/favourites/remove`, { data: { userId, productId: woodId } });
      setSuccessMessage("Removed from favourites");
      setMatchedWoodItems((prev) => prev.filter(item => item._id !== woodId)); // Update the state immediately
    } catch (error) {
      setError("Failed to remove from favourites");
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSuccessMessage(null);
    setError(null);
  };

  if (loading) return <CircularProgress />;

  return (
    <div className="category-container">
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={error ? "error" : "success"}>
          {error || successMessage}
        </Alert>
      </Snackbar>

      <div className="card-container">
        {matchedWoodItems.map((item) => (
          <div className="card" key={item._id}>
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="carousel"
            >
              {item.images.map((photo, idx) => (
                <div key={idx}>
                  <img src={`${config.apiURL}/${photo}`} alt={`Wood ${item.name}`} />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              <h3>{item.wood}</h3>
              <p><strong>Seller Name:</strong> {item.name}</p>
              <p><strong>Thickness:</strong> {item.thickness}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
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
}

export default WoodFav;
