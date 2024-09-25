import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Snackbar, Button, Alert } from "@mui/material";
import { Carousel } from 'react-responsive-carousel';
import './fav.css';
import config from "../../config";
import { FaHeart } from 'react-icons/fa'; 

const CateringWithFavourites = () => {
  const [cateringData, setCateringData] = useState([]);
  const [favouriteData, setFavouriteData] = useState([]);
  const [matchedCatering, setMatchedCatering] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); 

  const fetchCateringAndFavourites = async () => {
    try {
      const cateringResponse = await axios.get(`${config.apiURL}/cateringRoute/catering`);
      setCateringData(cateringResponse.data);

      const favouriteResponse = await axios.get(`${config.apiURL}/favourites/all/${userId}`);
      setFavouriteData(favouriteResponse.data);

      const matchedItems = cateringResponse.data.filter((catering) =>
        favouriteResponse.data.some(fav => fav.toString() === catering._id.toString())
      );

      setMatchedCatering(matchedItems);
    } catch (err) {
      setError(err.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCateringAndFavourites(); 
  }, [userId]); 

  const handleViewDetailsClick = (cateringId) => {
    navigate(`/cateringview/${cateringId}`);
  };

  const handleRemoveFavourite = async (cateringId) => {
    try {
      await axios.delete(`${config.apiURL}/favourites/remove`, { data: { userId, productId: cateringId } });
      await fetchCateringAndFavourites(); 
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
        {matchedCatering.map((item) => (
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
                  <img src={`${config.apiURL}/${photo}`} alt={`Catering ${item.name}`} />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              <h3>{item.name}</h3>
              <p><strong>Meals:</strong> {item.meals}</p>
              <p><strong>Menu:</strong> {item.menuCatlogues}</p>
              <p><strong>Number of People:</strong> {item.numberOfPeople}</p>
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

export default CateringWithFavourites;
