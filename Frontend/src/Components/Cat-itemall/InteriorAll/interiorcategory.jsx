import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import config from "../../../config";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import './interiorall.css';
import { Snackbar } from '@mui/material';

const CategoryInteriorall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const interiorRoute = `${config.apiURL}/interiorRoute/interior`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(interiorRoute);
        setData(response.data);
        const counts = await Promise.all(response.data.map(interior =>
          axios.get(`${config.apiURL}/favourites/count/${interior._id}`)
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
      const userId = getUserId();
      try {
        const response = await axios.get(`${config.apiURL}/favourites/all/${userId}`);
        setFavourites(response.data);
      } catch (err) {
        console.error('Error fetching favourites:', err);
      }
    };

    fetchData();
    fetchFavourites();
  }, []);

  const getUserId = () => {
    return localStorage.getItem('userId');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCardClick = (interiorId) => {
    navigate(`/interiorview/${interiorId}`);
  };

  const handleViewDetailsClick = (interiorId) => {
    navigate(`/interiorview/${interiorId}`);
  };

  const handleAddToFavourites = async (interiorId) => {
    const userId = getUserId();
    const productId = interiorId;


    if (!userId) {

      setSnackbarOpen(true);
      setTimeout(() => {
        navigate('/Login');
      }, 1500);
      return;
    }

    try {
      if (favourites.includes(productId)) {
        await axios.delete(`${config.apiURL}/favourites/remove`, {
          params: { userId, productId }
        });
        setFavourites(prevFavourites => prevFavourites.filter(id => id !== productId));
      } else {
        await axios.post(`${config.apiURL}/favourites/add`, { userId, productId });
        setFavourites(prevFavourites => [...prevFavourites, productId]);
      }
      const { data: countData } = await axios.get(`${config.apiURL}/favourites/count/${productId}`);
      setLikeCounts(prevCounts => ({
        ...prevCounts,
        [productId]: countData.count
      }));
    } catch (err) {
      console.error('Error updating favourites:', err);
    }
  };

  const isNumeric = (value) => {
    return !isNaN(value) && !isNaN(parseFloat(value));
  };

  const queryNumber = parseFloat(searchQuery);

  const filteredData = data.filter(item =>
    item.products.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (isNumeric(searchQuery) && item.price && item.price >= queryNumber)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="interiorall-category-container">
        <div className="interiorall-header-container">
          <h2>Interior Products</h2>
        </div>
        
        <div className="interiorall-search-container">
            <input
              type="text"
              placeholder="Search by product name, seller name, or price..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="interiorall-search-input"
            />
            <button onClick={() => setSearchQuery(searchQuery)} className="interiorall-search-button">
              Search
            </button>
          </div>

        <div className="interiorall-card-container">
          {filteredData.length === 0 ? (
            <p style={{ textAlign: "center" }}>No products found for "{searchQuery}".</p>
          ) : (
            filteredData.map((interior) => {
              const interiorId = interior._id;

              return (
                <div key={interiorId} className={`interiorall-card ${favourites.includes(interiorId) ? 'favourite' : ''}`} onClick={() => handleCardClick(interiorId)}>
                  <div className="interiorall-card-content">
                    <div className="interiorall-header">
                      <h3>{interior.products}</h3>
                      <p className="interiorall-price" style={{ color: "green" }}>{interior.price} RPS</p>
                    </div>
                    <Carousel
                      showThumbs={false}
                      infiniteLoop
                      autoPlay
                      stopOnHover
                      dynamicHeight
                      className="interiorall-carousel"
                    >
                      {interior.images.map((photo, idx) => (
                        <div key={idx}>
                          <img src={`${config.apiURL}/${photo}`} alt={`Interior ${interior.products}`} />
                        </div>
                      ))}
                    </Carousel>

                    <div className="interiorall-like-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToFavourites(interiorId);
                        }}
                        className="interiorall-favourite-button"
                      >
                        {favourites.includes(interiorId) ? (
                          <FaHeart className="interiorall-favourite-icon filled" />
                        ) : (
                          <FaRegHeart className="interiorall-favourite-icon" />
                        )}
                      </button>
                      <span className="interiorall-like-count">{likeCounts[interiorId] || 0} Likes</span>
                    </div>
                    <p><strong>Seller Name:</strong> {interior.name}</p>
                    <p><strong>Category:</strong> {interior.category}</p>

                    <div className="interiorall-card-buttons">
                      <button onClick={() => handleViewDetailsClick(interiorId)} className="interiorall-view-details-button">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message="You need to log in to add to favourites."
        autoHideDuration={2000}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#f44336', 
            color: '#fff', 
            borderRadius: '8px', 
            padding: '11px',
            fontSize: '0.8rem', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)', 
          },
        }}
      />
      </div>
      <Footer />
    </>
  );
};

export default CategoryInteriorall;
