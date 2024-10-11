import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import config from '../../../config';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './steel.css'; 

const CategorySteel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const navigate = useNavigate();

  const steelRoute = `${config.apiURL}/steelRoute/steel`; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(steelRoute);
        setData(response.data);

        const counts = await Promise.all(response.data.map(steel =>
          axios.get(`${config.apiURL}/favourites/count/${steel._id}`)
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
    navigate('/steelall');
  };

  const handleCardClick = (steelId) => {
    navigate(`/steelview/${steelId}`);
  };

  const handleViewDetailsClick = (steelId) => {
    navigate(`/steelview/${steelId}`);
  };

  const handleAddToFavourites = async (steelId) => {
    const userId = getUserId();
    const productId = steelId;

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
    <div className="steel-category-container">
      <div className="steel-header-container">
        <h2>Steel Products</h2>
        <div className="steel-arrow-container" onClick={handleArrowClick}>
          ➡️
        </div>
      </div>

      <div className="steel-card-container">
        {data.slice(0, 4).map((steel) => {
            const steelId = steel._id;

            return (
              <div key={steelId} className={`steel-card ${favourites.includes(steelId) ? 'steel-favourite' : ''}`} onClick={() => handleCardClick(steelId)}>
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  stopOnHover
                  dynamicHeight
                  className="steel-carousel"
                >
                  {steel.images.map((photo, idx) => (
                    <div key={idx}>
                      <img src={`${config.apiURL}/${photo}`} alt={`Steel ${steel.name}`} />
                    </div>
                  ))}
                </Carousel>
                <div className="steel-card-content">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavourites(steelId);
                    }}
                    className="steel-favourite-button"
                  >
                    {favourites.includes(steelId) ? (
                      <FaHeart className="steel-favourite-icon filled" />
                    ) : (
                      <FaRegHeart className="steel-favourite-icon" />
                    )}
                    <span className="steel-like-count">{likeCounts[steelId] || 0} Likes</span>
                  </button>
                  <h3>{steel.brand}</h3>
                  <p><strong>Seller Name:</strong> {steel.name}</p>
                  <p><strong>Category:</strong> {steel.steelCategory}</p>
                  <p><strong>Type:</strong> {steel.steelType}</p>
                  <p><strong>Thickness:</strong> {steel.steelThickness}</p>
                  <p><strong>Length:</strong> {steel.meter}</p>
                  <p><strong>Price:</strong> {steel.price} RPS</p>
                  <div className="steel-card-buttons">
                    <button onClick={() => handleViewDetailsClick(steelId)} className="steel-view-details-button">
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

export default CategorySteel;
