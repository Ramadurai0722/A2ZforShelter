import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Snackbar, Button } from "@mui/material";
import { Carousel } from 'react-responsive-carousel';
import { Alert } from "@mui/material";
import './fav.css';
import config from "../../config";
import { FaHeart } from 'react-icons/fa';

const SandFav = () => {
  const [sandData, setSandData] = useState([]);
  const [favouriteData, setFavouriteData] = useState([]);
  const [matchedSandItems, setMatchedSandItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchSandAndFavourites = async () => {
      try {
        const sandResponse = await axios.get(`${config.apiURL}/sandRoute/sand`);
        setSandData(sandResponse.data);

        const favouriteResponse = await axios.get(`${config.apiURL}/favourites/all/${userId}`);
        setFavouriteData(favouriteResponse.data);

        const matchedItems = sandResponse.data.filter((sandItem) =>
          favouriteResponse.data.some(fav => fav.toString() === sandItem._id.toString())
        );

        setMatchedSandItems(matchedItems);
      } catch (err) {
        setError(err.message);
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSandAndFavourites();
  }, [userId]);

  const handleViewDetailsClick = (sandId) => {
    navigate(`/sandview/${sandId}`);
  };

  const handleRemoveFavourite = async (sandId) => {
    try {
      await axios.delete(`${config.apiURL}/favourites/remove`, { data: { userId, productId: sandId } });

      // Remove the item from the matchedSandItems list and update the state
      setMatchedSandItems((prevItems) => prevItems.filter(item => item._id !== sandId));

      // Optionally, update favouriteData if needed
      setFavouriteData((prevFavourites) => prevFavourites.filter(fav => fav !== sandId));

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
        {matchedSandItems.map((item) => (
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
                  <img src={`${config.apiURL}/${photo}`} alt={`Sand ${item.name}`} />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              <h3>{item.sandType}</h3>
              <p><strong>Seller Name:</strong> {item.name}</p>
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

export default SandFav;
