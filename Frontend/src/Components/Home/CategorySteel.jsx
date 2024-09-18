import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import config from '../../config';
import './CategoryHouse.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

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

        // Fetch like counts
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
    try {
      if (favourites.includes(steelId)) {
        await axios.delete(`${config.apiURL}/favourites/remove`, { data: { userId, productId: steelId } });
        setFavourites((prevFavourites) => prevFavourites.filter((id) => id !== steelId));
      } else {
        await axios.post(`${config.apiURL}/favourites/add`, { userId, productId: steelId });
        setFavourites((prevFavourites) => [...prevFavourites, steelId]);
      }

      // Update like counts
      const { data: countData } = await axios.get(`${config.apiURL}/favourites/count/${steelId}`);
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [steelId]: countData.count
      }));
    } catch (err) {
      console.error('Error updating favourites:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="category-container">
      <div className="header-container">
        <h2>Steel Products</h2>
        <div className="arrow-container" onClick={handleArrowClick}>
          ➡️
        </div>
      </div>

      <div className="card-container">
        {data.slice(0, 4).map((steel) => {
            const steelId = steel._id;

            return (
              <div key={steelId} className={`card ${favourites.includes(steelId) ? 'favourite' : ''}`} onClick={() => handleCardClick(steelId)}>
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  stopOnHover
                  dynamicHeight
                  className="carousel"
                >
                  {steel.images.map((photo, idx) => (
                    <div key={idx}>
                      <img src={`${config.apiURL}/${photo}`} alt={`Steel ${steel.name}`} />
                    </div>
                  ))}
                </Carousel>
                <div className="card-content">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavourites(steelId);
                    }}
                    className="favourite-button"
                  >
                    {favourites.includes(steelId) ? (
                      <FaHeart className="favourite-icon filled" />
                    ) : (
                      <FaRegHeart className="favourite-icon" />
                    )}
                    <span className="like-count">{likeCounts[steelId] || 0} Likes</span>
                  </button>
                  <h3>{steel.brand}</h3>
                  <p><strong>Seller Name:</strong> {steel.name}</p>
                  <p><strong>Category:</strong> {steel.steelCategory}</p>
                  <p><strong>Type:</strong> {steel.steelType}</p>
                  <p><strong>Thickness:</strong> {steel.steelThickness}</p>
                  <p><strong>Length:</strong> {steel.meter}</p>
                  <p><strong>Price:</strong> {steel.price} RPS</p>
                  <div className="card-buttons">
                    <button onClick={() => handleViewDetailsClick(steelId)} className="view-details-button">
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
