import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Snackbar, Button, Alert } from "@mui/material";
import { Carousel } from 'react-responsive-carousel';
import './fav.css'; 
import config from "../../config";
import { FaHeart } from 'react-icons/fa';

const SteelFav = () => {
  const [steelData, setSteelData] = useState([]);
  const [favouriteData, setFavouriteData] = useState([]);
  const [matchedSteelItems, setMatchedSteelItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchSteelAndFavourites = async () => {
      try {
        const steelResponse = await axios.get(`${config.apiURL}/steelRoute/steel`);
        setSteelData(steelResponse.data);

        const favouriteResponse = await axios.get(`${config.apiURL}/favourites/all/${userId}`);
        setFavouriteData(favouriteResponse.data);

        const matchedItems = steelResponse.data.filter((steelItem) =>
          favouriteResponse.data.some(fav => fav.toString() === steelItem._id.toString())
        );

        setMatchedSteelItems(matchedItems);
      } catch (err) {
        setError(err.message);
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSteelAndFavourites();
  }, [userId]);

  const handleViewDetailsClick = (steelId) => {
    navigate(`/steelview/${steelId}`);
  };

  const handleRemoveFavourite = async (steelId) => {
    try {
      await axios.delete(`${config.apiURL}/favourites/remove`, { data: { userId, productId: steelId } });
      setMatchedSteelItems((prevItems) => prevItems.filter(item => item._id !== steelId));
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
        {matchedSteelItems.map((item) => (
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
                  <img src={`${config.apiURL}/${photo}`} alt={`Steel ${item.name}`} />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              <h3>{item.brand}</h3>
              <p><strong>Seller Name:</strong> {item.name}</p>
              <p><strong>Category:</strong> {item.steelCategory}</p>
              <p><strong>Type:</strong> {item.steelType}</p>
              <p><strong>Thickness:</strong> {item.steelThickness}</p>
              <p><strong>Length:</strong> {item.meter}</p>
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
                  onClick={() => handleRemoveFavourite(item._id)}
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

export default SteelFav;
