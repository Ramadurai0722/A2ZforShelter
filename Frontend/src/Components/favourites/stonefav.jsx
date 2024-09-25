import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Snackbar, Button, Alert } from "@mui/material";
import { Carousel } from 'react-responsive-carousel';
import './fav.css'; 
import config from "../../config";
import { FaHeart } from 'react-icons/fa';

const StoneFav = () => {
  const [stoneData, setStoneData] = useState([]);
  const [favouriteData, setFavouriteData] = useState([]);
  const [matchedStoneItems, setMatchedStoneItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchStoneAndFavourites = async () => {
      try {
        const stoneResponse = await axios.get(`${config.apiURL}/stoneRoute/stone`);
        setStoneData(stoneResponse.data);

        const favouriteResponse = await axios.get(`${config.apiURL}/favourites/all/${userId}`);
        setFavouriteData(favouriteResponse.data);

        const matchedItems = stoneResponse.data.filter((stoneItem) =>
          favouriteResponse.data.some(fav => fav.toString() === stoneItem._id.toString())
        );

        setMatchedStoneItems(matchedItems);
      } catch (err) {
        setError(err.message);
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStoneAndFavourites();
  }, [userId]);

  const handleViewDetailsClick = (stoneId) => {
    navigate(`/stoneview/${stoneId}`);
  };

  const handleRemoveFavourite = async (stoneId) => {
    try {
      await axios.delete(`${config.apiURL}/favourites/remove`, { data: { userId, productId: stoneId } });
      const updatedFavourites = favouriteData.filter(fav => fav.toString() !== stoneId.toString());
      setFavouriteData(updatedFavourites);
      const updatedMatchedItems = stoneData.filter((stoneItem) =>
        updatedFavourites.some(fav => fav.toString() === stoneItem._id.toString())
      );
      setMatchedStoneItems(updatedMatchedItems);
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
        {matchedStoneItems.map((item) => (
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
                  <img src={`${config.apiURL}/${photo}`} alt={`Stone ${item.name}`} />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              <h3>{item.stoneCategory}</h3>
              <p><strong>Seller Name:</strong> {item.name}</p>
              <p><strong>Type:</strong> {item.stoneType}</p>
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
};

export default StoneFav;
