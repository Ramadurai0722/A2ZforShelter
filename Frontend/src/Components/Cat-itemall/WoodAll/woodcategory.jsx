import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import config from '../../../config';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import './woodall.css';
import { Snackbar } from '@mui/material';

const CategoryWoodall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const woodRoute = `${config.apiURL}/woodRoute/wood`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(woodRoute);
        setData(response.data);
        
        const counts = await Promise.all(response.data.map(wood =>
          axios.get(`${config.apiURL}/favourites/count/${wood._id}`)
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
  const handleCardClick = (woodId) => {
    navigate(`/woodview/${woodId}`);
  };

  const handleAddToFavourites = async (woodId) => {
    const userId = getUserId();
    const productId = woodId;
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
        setFavourites((prevFavourites) => prevFavourites.filter((id) => id !== productId));
      } else {
        await axios.post(`${config.apiURL}/favourites/add`, { userId, productId });
        setFavourites((prevFavourites) => [...prevFavourites, productId]);
      }
      const { data: countData } = await axios.get(`${config.apiURL}/favourites/count/${productId}`);
      setLikeCounts((prevCounts) => ({
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
  

  const filteredData = data.filter(wood =>
    wood.wood.toLowerCase().includes(searchQuery.toLowerCase()) ||
    wood.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (isNumeric(searchQuery) && wood.price && wood.price >= queryNumber)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="woodall-category-container">
        <div className="woodall-header-container">
          <h2>Wood Products</h2>
        </div>

        <div className="woodall-search-container">
          <input
            type="text"
            placeholder="Search by wood type or seller..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="woodall-search-input"
          />
          <button className="woodall-search-button">
            Search
          </button>
        </div>

        <div className="woodall-card-container">
          {filteredData.length === 0 ? (
            <p style={{ textAlign: "center" }}>No products found for "{searchQuery}".</p>
          ) : (
            filteredData.map((wood) => {
              const woodId = wood._id;

              return (
                <div key={woodId} className={`woodall-card ${favourites.includes(woodId) ? 'favourite' : ''}`} onClick={() => handleCardClick(woodId)}>
                  <div className="woodall-card-content">
                    <div className="woodall-header">
                      <h3>{wood.quantity}</h3>
                      <p className="woodall-price" style={{ color: "green" }}>{wood.price} RPS</p>
                    </div>
                    <Carousel
                      showThumbs={false}
                      infiniteLoop
                      autoPlay
                      stopOnHover
                      dynamicHeight
                      className="woodall-carousel"
                    >
                      {wood.images.map((photo, idx) => (
                        <div key={idx}>
                          <img src={`${config.apiURL}/${photo}`} alt={`Wood ${wood.name}`} />
                        </div>
                      ))}
                    </Carousel>

                    <div className="woodall-like-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToFavourites(woodId);
                        }}
                        className="woodall-favourite-button"
                      >
                        {favourites.includes(woodId) ? (
                          <FaHeart className="woodall-favourite-icon filled" />
                        ) : (
                          <FaRegHeart className="woodall-favourite-icon" />
                        )}
                      </button>
                      <span className="woodall-like-count">{likeCounts[woodId] || 0} Likes</span>
                    </div>
                    <h6>{wood.wood}</h6>
                    <p><strong>Seller Name:</strong> {wood.name}</p>
                    <p><strong>Thickness:</strong> {wood.thickness}</p>

                    <div className="woodall-card-buttons">
                      <button onClick={() => handleCardClick(woodId)} className="woodall-view-details-button">
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

export default CategoryWoodall;
