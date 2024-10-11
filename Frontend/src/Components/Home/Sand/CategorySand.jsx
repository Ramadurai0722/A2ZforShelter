import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import config from "../../../config";
import './sand.css';

const CategorySand = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const navigate = useNavigate();

  const sandRoute = `${config.apiURL}/sandRoute/sand`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(sandRoute);
        setData(response.data);

        const counts = await Promise.all(response.data.map(sand =>
          axios.get(`${config.apiURL}/favourites/count/${sand._id}`)
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

  const handleArrowClick = () => {
    navigate('/sandall');
  };

  const handleCardClick = (sandId) => {
    navigate(`/sandview/${sandId}`);
  };

  const handleViewDetailsClick = (sandId) => {
    navigate(`/sandview/${sandId}`);
  };

  const handleAddToFavourites = async (sandId) => {
    const userId = getUserId();
    const productId = sandId;

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

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="sand-category-container">
      <div className="sand-header-container">
        <h2>Sand Products</h2>
        <div className="sand-arrow-container" onClick={handleArrowClick}>
          ➡️
        </div>
      </div>
      
      <div className="sand-card-container">
        {data.slice(0, 4).map((sand) => {
            const sandId = sand._id;

            return (
              <div key={sandId} className={`sand-card ${favourites.includes(sandId) ? 'sand-favourite' : ''}`} onClick={() => handleCardClick(sandId)}>
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  stopOnHover
                  dynamicHeight
                  className="sand-carousel"
                >
                  {sand.images.map((photo, idx) => (
                    <div key={idx}>
                      <img src={`${config.apiURL}/${photo}`} alt={`Sand ${sand.sandType}`} />
                    </div>
                  ))}
                </Carousel>
                <div className="sand-card-content">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleAddToFavourites(sandId);
                    }} 
                    className="sand-favourite-button"
                  >
                    {favourites.includes(sandId) ? (
                      <FaHeart className="sand-favourite-icon filled" />
                    ) : (
                      <FaRegHeart className="sand-favourite-icon" />
                    )}
                    <span className="sand-like-count">{likeCounts[sandId] || 0} Likes</span>
                  </button>
                  <h3>{sand.sandType}</h3>
                  <p><strong>Seller Name:</strong> {sand.name}</p>
                  <p><strong>Quantity:</strong> {sand.quantity}</p>
                  <p><strong>Price:</strong> {sand.price} RPS</p>
                  <div className="sand-card-buttons">
                    <button onClick={() => handleViewDetailsClick(sandId)} className="sand-view-details-button">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CategorySand;
