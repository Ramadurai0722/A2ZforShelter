import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Snackbar, Button, Alert } from "@mui/material";
import { Carousel } from 'react-responsive-carousel';
import './fav.css';
import config from "../../config";
import { FaHeart } from 'react-icons/fa';

const CementWithFavourites = () => {
  const [cementData, setCementData] = useState([]);
  const [favouriteData, setFavouriteData] = useState([]);
  const [matchedCement, setMatchedCement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate(); 
  const userId = localStorage.getItem("userId"); 

  const fetchCementAndFavourites = async () => {
    try {
      const cementResponse = await axios.get(`${config.apiURL}/cementRoutes/cement`);
      setCementData(cementResponse.data);

      const favouriteResponse = await axios.get(`${config.apiURL}/favourites/all/${userId}`);
      setFavouriteData(favouriteResponse.data);

      const matchedItems = cementResponse.data.filter((cement) =>
        favouriteResponse.data.some(fav => fav.toString() === cement._id.toString())
      );

      setMatchedCement(matchedItems);
    } catch (err) {
      setError(err.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCementAndFavourites(); 
  }, [userId]); 

  const handleViewDetailsClick = (cementId) => {
    navigate(`/cementview/${cementId}`);
  };
  const handleRemoveFavourite = async (cementId) => {
    try {
      await axios.delete(`${config.apiURL}/favourites/remove`, { data: { userId, productId: cementId } });
      await fetchCementAndFavourites();
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
        {matchedCement.map((item) => (
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
                  <img src={`${config.apiURL}/${photo}`} alt={`Cement ${item.name}`} />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              <h3>{item.brand}</h3>
              <p><strong>Seller Name:</strong> {item.name}</p>
              <p><strong>Type:</strong> {item.cementType}</p>
              <p><strong>Quantity:</strong> {item.quantity} <span>Kg</span></p>
              <p><strong>Price:</strong> {item.price} RPS</p>
              <p><strong>Description:</strong> {item.description}</p>
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
export default CementWithFavourites;
