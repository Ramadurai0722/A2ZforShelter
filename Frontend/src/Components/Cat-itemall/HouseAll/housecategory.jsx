import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import config from "../../../config";
import './houseall.css';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { Snackbar } from '@mui/material';

const CategoryHouseall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const houseRoute = `${config.apiURL}/houseRoute/houses`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(houseRoute);
        setData(response.data);
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

  const handleCardClick = (productId) => {
    navigate(`/houseview/${productId}`);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleViewDetailsClick = (productId) => {
    navigate(`/houseview/${productId}`);
  };

  const handleAddToFavourites = async (houseId) => {
    const userId = getUserId();
    const productId = houseId;

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

  const filteredData = data.filter(house => {
    const { adTitle, projectName, location, price } = house;
    const query = searchQuery.toLowerCase();

    const queryNumber = parseFloat(searchQuery);
    const isNumericQuery = !isNaN(queryNumber) && searchQuery.trim() !== '';

    return (
      (adTitle && adTitle.toLowerCase().includes(query)) ||
      (projectName && projectName.toLowerCase().includes(query)) ||
      (location && location.toLowerCase().includes(query)) ||
      (isNumericQuery && price >= queryNumber)
    );
  });

  return (
    <>
      <Navbar />
      <div className="houseall-category-container">
        <div className="houseall-header-container">
          <h2>House Rent & Sale</h2>
        </div>

        <div className="houseall-search-container">
          <input
            type="text"
            placeholder="Search by title, project name, location, or price..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="houseall-search-input"
          />
          <button onClick={handleSearch} className="houseall-search-button"> 
            Search
          </button>
        </div>

        <div className="houseall-card-container">
          {filteredData.length === 0 && searchQuery && (
            <p>No items matched for "{searchQuery}"</p>
          )}
          {filteredData.map((house) => {
            const productId = house._id;

            return (
              <div key={productId} className={`houseall-card ${favourites.includes(productId) ? 'favourite' : ''}`} onClick={() => handleCardClick(productId)}>
                <div className="houseall-card-content">
                  <div className="houseall-header">
                    <h3>{house.bedrooms} BHK</h3>
                    <p className="houseall-price" style={{ color: "green" }}>{house.price} RPS</p>
                  </div>
                  <Carousel
                    showThumbs={false}
                    infiniteLoop
                    autoPlay
                    stopOnHover
                    dynamicHeight
                    className="houseall-carousel"
                  >
                    {house.photos.map((photo, idx) => (
                      <div key={idx}>
                        <img src={`${config.apiURL}/${photo}`} alt={`House ${house.adTitle}`} />
                      </div>
                    ))}
                  </Carousel>

                  <div className="houseall-like-container">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToFavourites(productId);
                      }}
                      className="houseall-favourite-button"
                    >
                      {favourites.includes(productId) ? (
                        <FaHeart className="houseall-favourite-icon filled" />
                      ) : (
                        <FaRegHeart className="houseall-favourite-icon" />
                      )}
                    </button>
                    <span className="houseall-like-count">{likeCounts[productId] || 0} Likes</span>
                  </div>

                  <h4>{house.purpose}</h4>
                  <p>{house.projectName}</p>
                  <p>{house.adTitle}</p>
                  <p><strong>Location:</strong> {house.location}</p>
                  <p><strong>Bathrooms:</strong> {house.bathrooms}</p>

                  <div className="houseall-card-buttons">
                    <button onClick={() => handleViewDetailsClick(productId)} className="houseall-view-details-button">
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

export default CategoryHouseall;
