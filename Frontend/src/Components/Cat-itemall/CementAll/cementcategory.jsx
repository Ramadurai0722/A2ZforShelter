import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import config from "../../../config";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import './cementall.css'; 
import { Snackbar } from '@mui/material';

const CategoryCementall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const cementRoute = `${config.apiURL}/cementRoutes/cement`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(cementRoute);
        setData(response.data);
        const counts = await Promise.all(response.data.map(cement =>
          axios.get(`${config.apiURL}/favourites/count/${cement._id}`)
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

  const handleCardClick = (cementId) => {
    navigate(`/cementview/${cementId}`);
  };

  const handleViewDetailsClick = (cementId) => {
    navigate(`/cementview/${cementId}`);
  };

  const handleAddToFavourites = async (cementId) => {
    const userId = getUserId();
    const productId = cementId;

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

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      setSearchQuery(e.target.value);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredData = data.filter(cement => {
    const { brand, name, cementType, price } = cement;
    const query = searchQuery.toLowerCase();
    
    const queryNumber = parseFloat(searchQuery);
    const isNumericQuery = !isNaN(queryNumber) && searchQuery.trim() !== '';
  
    return (
      (brand && brand.toLowerCase().includes(query)) ||
      (name && name.toLowerCase().includes(query)) ||
      (cementType && cementType.toLowerCase().includes(query)) ||
      (isNumericQuery && price >=queryNumber) 
    );
  });
  

  return (
    <>
      <Navbar />
      <div className="cementall-category-container">
        <div className="cementall-header-container">
          <h2>Cement Products</h2>
        </div>
        
        <div className="cementall-search-container">
          <input
            type="text"
            placeholder="Search by brand, seller name, type, or price..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="cementall-search-input"
          />
          <button onClick={handleSearch} className="cementall-search-button"> 
            Search
          </button>
        </div>

        <div className="cementall-card-container">
          {filteredData.length === 0 && searchQuery && (
            <p>No items matched for "{searchQuery}"</p>
          )}
          {filteredData.map((cement) => {
            const cementId = cement._id;

            return (
              <div key={cementId} className={`cementall-card ${favourites.includes(cementId) ? 'favourite' : ''}`} onClick={() => handleCardClick(cementId)}>
                <div className="cementall-card-content">
                  <div className="cementall-header">
                    <h3>{cement.quantity} KG</h3>
                    <p className="cementall-price" style={{color: "green"}}>{cement.price} RPS</p>
                  </div>
                  <Carousel
                    showThumbs={false}
                    infiniteLoop
                    autoPlay
                    stopOnHover
                    dynamicHeight
                    className="cementall-carousel"
                  >
                    {cement.images.map((photo, idx) => (
                      <div key={idx}>
                        <img src={`${config.apiURL}/${photo}`} alt={`Cement ${cement.name}`} />
                      </div>
                    ))}
                  </Carousel>

                  <div className="cementall-like-container">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToFavourites(cementId);
                      }}
                      className="cementall-favourite-button"
                    >
                      {favourites.includes(cementId) ? (
                        <FaHeart className="cementall-favourite-icon filled" />
                      ) : (
                        <FaRegHeart className="cementall-favourite-icon" />
                      )}
                    </button>
                    <span className="cementall-like-count">{likeCounts[cementId] || 0} Likes</span>
                  </div>
                  <h6>{cement.brand}</h6>
                  <p><strong>Seller Name:</strong> {cement.name}</p>
                  <p><strong>Type:</strong> {cement.cementType}</p>

                  <div className="cementall-card-buttons">
                    <button onClick={() => handleViewDetailsClick(cementId)} className="cementall-view-details-button">
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

export default CategoryCementall;
