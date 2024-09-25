import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Snackbar, Button } from "@mui/material";
import { Carousel } from 'react-responsive-carousel';
import { Alert } from "@mui/material";
import './fav.css';
import config from "../../config";
import { FaHeart } from 'react-icons/fa'; // Import the heart icon

const HouseWithFavourites = () => {
  const [houseData, setHouseData] = useState([]);
  const [favouriteData, setFavouriteData] = useState([]);
  const [matchedHouses, setMatchedHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate(); 
  const userId = localStorage.getItem("userId"); 

  const fetchHouseAndFavourites = async () => {
    try {
      const houseResponse = await axios.get(`${config.apiURL}/houseRoute/houses`);
      setHouseData(houseResponse.data);

      const favouriteResponse = await axios.get(`${config.apiURL}/favourites/all/${userId}`);
      setFavouriteData(favouriteResponse.data);

      const matchedItems = houseResponse.data.filter((house) =>
        favouriteResponse.data.some(fav => fav.toString() === house._id.toString())
      );

      setMatchedHouses(matchedItems);
    } catch (err) {
      setError(err.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouseAndFavourites();
  }, [userId]);

  const handleViewDetailsClick = (houseId) => {
    navigate(`/houseview/${houseId}`);
  };

  const handleRemoveFavourite = async (houseId) => {
    try {
      await axios.delete(`${config.apiURL}/favourites/remove`, { data: { userId, productId: houseId } });
      await fetchHouseAndFavourites(); // Refresh data after removal
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
        {matchedHouses.length > 0 && ( // Only render if there are matched houses
          matchedHouses.map((item) => (
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
                    <img src={`${config.apiURL}/${photo}`} alt={`House ${item.name}`} />
                  </div>
                ))}
              </Carousel>
              <div className="card-content">
                <h3>{item.adTitle}</h3>
                <p>{item.projectName}</p>
                <p><strong>Location:</strong> {item.location}, {item.cityName}</p>
                <p><strong>House:</strong> {item.bedrooms} BHK</p>
                <p><strong>Bathrooms:</strong> {item.bathrooms}</p>
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
          ))
        )}
      </div>
    </div>
  );
};

export default HouseWithFavourites;
