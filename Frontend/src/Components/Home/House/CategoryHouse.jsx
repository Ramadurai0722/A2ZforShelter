import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import config from '../../../config';
import "./house.css";

const CategoryHouse = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const navigate = useNavigate();

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

  const handleArrowClick = () => {
    navigate('/houseall');
  };

  const handleCardClick = (productId) => {
    navigate(`/houseview/${productId}`);
  };

  const handleViewDetailsClick = (productId) => {
    navigate(`/houseview/${productId}`);
  };

  const handleAddToFavourites = async (houseId) => {
    const userId = getUserId();
    const productId = houseId;

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="house-category-container">
      <div className="house-header-container">
        <h2>House Rent & Sale</h2>
        <div className="house-arrow-container" onClick={handleArrowClick}>
          ➡️
        </div>
      </div>

      <div className="house-card-container">
        {data.slice(0, 4).map((house) => {
          const productId = house._id;

          return (
            <div key={productId} className={`house-card ${favourites.includes(productId) ? 'house-favourite' : ''}`} onClick={() => handleCardClick(productId)}>
              <Carousel
                showThumbs={false}
                infiniteLoop
                autoPlay
                stopOnHover
                dynamicHeight
                className="house-carousel"
              >
                {house.photos.map((photo, idx) => (
                  <div key={idx}>
                    <img src={`${config.apiURL}/${photo}`} alt={`House ${house.adTitle}`} />
                  </div>
                ))}
              </Carousel>
              <div className="house-card-content">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToFavourites(productId);
                  }}
                  className="house-favourite-button"
                >
                  {favourites.includes(productId) ? (
                    <FaHeart className="house-favourite-icon filled" />
                  ) : (
                    <FaRegHeart className="house-favourite-icon" />
                  )}
                </button>
                <span className="house-like-count">{likeCounts[productId] || 0} Likes</span>

                <h3>{house.adTitle}</h3>
                <p>{house.projectName}</p>
                <p><strong>Location:</strong> {house.location}, {house.cityName}</p>
                <p><strong>House:</strong> {house.bedrooms} BHK</p>
                <p><strong>Bathrooms:</strong> {house.bathrooms}</p>
                <p><strong>Price:</strong> {house.price} RPS</p>
                <div className="house-card-buttons">
                  <button onClick={() => handleViewDetailsClick(productId)} className="house-view-details-button">
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

export default CategoryHouse;
