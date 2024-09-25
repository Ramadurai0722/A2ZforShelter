import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Snackbar, Button, Alert } from "@mui/material";
import { Carousel } from 'react-responsive-carousel';
import './fav.css';
import config from "../../config";
import { FaHeart } from 'react-icons/fa';

const InteriorWithFavourites = () => {
  const [interiorData, setInteriorData] = useState([]);
  const [favouriteData, setFavouriteData] = useState([]);
  const [matchedInteriors, setMatchedInteriors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchInteriorAndFavourites = async () => {
      try {
        const interiorResponse = await axios.get(`${config.apiURL}/interiorRoute/interior`);
        setInteriorData(interiorResponse.data);

        const favouriteResponse = await axios.get(`${config.apiURL}/favourites/all/${userId}`);
        setFavouriteData(favouriteResponse.data);

        const matchedItems = interiorResponse.data.filter((interior) =>
          favouriteResponse.data.some(fav => fav.toString() === interior._id.toString())
        );

        setMatchedInteriors(matchedItems);
      } catch (err) {
        setError(err.message);
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    fetchInteriorAndFavourites();
  }, [userId]);

  const handleViewDetailsClick = (interiorId) => {
    navigate(`/interiorview/${interiorId}`);
  };

  const handleRemoveFavourite = async (interiorId) => {
    try {
      await axios.delete(`${config.apiURL}/favourites/remove`, { data: { userId, productId: interiorId } });
      const updatedMatchedInteriors = matchedInteriors.filter(item => item._id !== interiorId);
      setMatchedInteriors(updatedMatchedInteriors); // Update state after removal
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
        {matchedInteriors.map((item) => (
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
                  <img src={`${config.apiURL}/${photo}`} alt={`Interior ${item.title}`} />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              <h3>{item.products}</h3>
              <p><strong>Seller Name:</strong> {item.name}</p>
              <p><strong>Category:</strong> {item.category}</p>
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

export default InteriorWithFavourites;
