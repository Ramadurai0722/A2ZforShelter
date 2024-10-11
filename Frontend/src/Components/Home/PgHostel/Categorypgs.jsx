import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import config from '../../../config';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './pg.css'; 

const CategoryPgHostel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const navigate = useNavigate();

  const pgHostelRoute = `${config.apiURL}/pgHostelRoute/pgHostel`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(pgHostelRoute);
        setData(response.data);
        
        const counts = await Promise.all(response.data.map(pgHostel =>
          axios.get(`${config.apiURL}/favourites/count/${pgHostel._id}`)
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
    navigate('/pgall');
  };

  const handleCardClick = (pgHostelId) => {
    navigate(`/productviewpg/${pgHostelId}`);
  };

  const handleViewDetailsClick = (pgHostelId) => {
    navigate(`/productviewpg/${pgHostelId}`);
  };

  const handleAddToFavourites = async (pgHostelId) => {
    const userId = getUserId();
  
    try {
      if (favourites.includes(pgHostelId)) {
        await axios.delete(`${config.apiURL}/favourites/remove`, {
          params: { userId, productId: pgHostelId }
        });
        setFavourites((prevFavourites) => prevFavourites.filter((id) => id !== pgHostelId));
      } else {
        await axios.post(`${config.apiURL}/favourites/add`, { userId, productId: pgHostelId });
        setFavourites((prevFavourites) => [...prevFavourites, pgHostelId]);
      }
      const { data: countData } = await axios.get(`${config.apiURL}/favourites/count/${pgHostelId}`);
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [pgHostelId]: countData.count
      }));
    } catch (err) {
      console.error('Error updating favourites:', err);
    }
  };
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="pg-category-container">
      <div className="pg-header-container">
        <h2>PG Hostels</h2>
        <div className="pg-arrow-container" onClick={handleArrowClick}>
          ➡️
        </div>
      </div>

      <div className="pg-card-container">
        {data.slice(0, 4).map((pgHostel) => {
            const pgHostelId = pgHostel._id;

            return (
              <div key={pgHostelId} className={`pg-card ${favourites.includes(pgHostelId) ? 'pg-favourite' : ''}`} onClick={() => handleCardClick(pgHostelId)}>
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  stopOnHover
                  dynamicHeight
                  className="pg-carousel"
                >
                  {pgHostel.photos && pgHostel.photos.length > 0 ? (
                    pgHostel.photos.map((photo, idx) => (
                      <div key={idx}>
                        <img src={`${config.apiURL}/${photo}`} alt={`PG Hostel ${pgHostel.pgHostelName}`} />
                      </div>
                    ))
                  ) : (
                    <div>No images available</div>
                  )}
                </Carousel>
                <div className="pg-card-content">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavourites(pgHostelId);
                    }} 
                    className="pg-favourite-button"
                  >
                    {favourites.includes(pgHostelId) ? (
                      <FaHeart className="pg-favourite-icon filled" />
                    ) : (
                      <FaRegHeart className="pg-favourite-icon" />
                    )}
                    <span className="pg-like-count">{likeCounts[pgHostelId] || 0} Likes</span>
                  </button>
                  <h3>{pgHostel.pgHostelName}</h3>
                  <p><strong>Location:</strong> {pgHostel.location}</p>
                  <p><strong>Total Floor:</strong> {pgHostel.totalFloors}</p>
                  <p><strong>Room:</strong> {pgHostel.acRoom}</p>
                  <p><strong>Food:</strong> {pgHostel.food}</p>
                  <p><strong>Car Parking:</strong> {pgHostel.carParking}</p>
                  <p><strong>Monthly Maintenance:</strong> {pgHostel.maintenance}</p>
                  <p><strong>Price:</strong> {pgHostel.price} RPS</p>
                  <div className="pg-card-buttons">
                    <button onClick={() => handleViewDetailsClick(pgHostelId)} className="pg-view-details-button">
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

export default CategoryPgHostel;
