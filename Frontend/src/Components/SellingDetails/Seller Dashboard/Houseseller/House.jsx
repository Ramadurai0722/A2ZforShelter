import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import config from "../../../../config";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./house.css";

const CategoryHouse1 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch user's houses
        const response = await axios.get(
          `${config.apiURL}/houseRoute/GetUserHouse`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
          }
        );
        setData(response.data);

        // Fetch like counts
        const counts = await Promise.all(response.data.map(house =>
          axios.get(`${config.apiURL}/favourites/count/${house._id}`)
        ));
        const likeCountMap = counts.reduce((acc, curr, index) => {
          acc[response.data[index]._id] = curr.data.count;
          return acc;
        }, {});
        setLikeCounts(likeCountMap);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchFavourites = async () => {
      const userId = localStorage.getItem("userId"); 
      try {
        const response = await axios.get(`${config.apiURL}/favourites/all/${userId}`);
        const userFavourites = response.data.map(fav => fav.houseId);
        setFavourites(userFavourites);
      } catch (err) {
        console.error('Error fetching favourites:', err);
      }
    };

    fetchData();
    fetchFavourites();
  }, []);
  
  
  const handleViewDetailsClick = (houseId) => {
    navigate(`/Sellerhouseview/${houseId}`);
  };

  const handleAddToFavourites = async (houseId) => {
    const userId = localStorage.getItem("userId");
    try {
      if (favourites.includes(houseId)) {
        await axios.delete(`${config.apiURL}/favourites/remove`, {
          params: { userId, productId: houseId } // Change houseId to productId
        });
        setFavourites((prev) => prev.filter(id => id !== houseId));
      } else {
        await axios.post(`${config.apiURL}/favourites/add`, { userId, productId: houseId }); // Change houseId to productId
        setFavourites((prev) => [...prev, houseId]);
      }
      const { data: countData } = await axios.get(`${config.apiURL}/favourites/count/${houseId}`);
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [houseId]: countData.count
      }));
    } catch (err) {
      console.error("Error updating favourites:", err);
    }
  };
  

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <div className="house21-loading-container">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <>
        <p>Error: {error}</p>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </>
    );
  }

  return (
    <div className="house21-category-container">
      <div className="house21-header-container">
        <h2>House Rent & Sale</h2>
      </div>

      <div className="house21-card-container">
        {data.map((house) => {
          const productId = house._id;

          return (
            <div
              key={productId}
              className={`house21-card ${favourites.includes(productId) ? 'favourite' : ''}`}
              onClick={() => handleViewDetailsClick(productId)}
            >
              <div className="house21-card-content">
                <div className="house21-header">
                  <h3>{house.bedrooms} BHK</h3>
                  <p className="house21-price" style={{ color: "green" }}>{house.price} RPS</p>
                </div>
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  stopOnHover
                  dynamicHeight
                  className="house21-carousel"
                >
                  {house.photos.map((photo, idx) => (
                    <div key={idx}>
                      <img src={`${config.apiURL}/${photo}`} alt={`House ${house.adTitle}`} />
                    </div>
                  ))}
                </Carousel>

                <div className="house21-like-container">
                  <span className="house21-like-count">{likeCounts[productId] || 0} Likes</span>
                </div>
                <br />

                <h4>{house.purpose}</h4>
                <p>{house.projectName}</p>
                <p>{house.adTitle}</p>
                <p><strong>Location:</strong> {house.location}</p>
                <p><strong>Bathrooms:</strong> {house.bathrooms}</p>

                <div className="house21-card-buttons">
                  <button onClick={() => handleViewDetailsClick(productId)} className="house21-view-details-button">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          Please login to view houses.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CategoryHouse1;