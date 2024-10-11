import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import config from '../../../config';
import './pgall.css'; 
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const CategoryPgHostelall = () => {
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

  const handleCardClick = (pgHostelId) => {
    navigate(`/productviewpg/${pgHostelId}`);
  };

  const handleViewDetailsClick = (pgHostelId) => {
    navigate(`/productviewpg/${pgHostelId}`);
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
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="pgall-category-container">
        <div className="pgall-header-container">
          <h2>PG Hostels</h2>
        </div>

        <div className="pgall-card-container">
          {data.map((pgHostel) => {
            const pgHostelId = pgHostel._id;

            return (
              <div key={pgHostelId} className={`pgall-card ${favourites.includes(pgHostelId) ? 'favourite' : ''}`} onClick={() => handleCardClick(pgHostelId)}>
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  stopOnHover
                  dynamicHeight
                  className="pgall-carousel"
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
                <div className="pgall-card-content">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavourites(pgHostelId);
                    }} 
                    className="pgall-favourite-button"
                  >
                    {favourites.includes(pgHostelId) ? (
                      <FaHeart className="pgall-favourite-icon filled" />
                    ) : (
                      <FaRegHeart className="pgall-favourite-icon" />
                    )}
                    <span className="pgall-like-count">{likeCounts[pgHostelId] || 0} Likes</span>
                  </button>
                  <h3>{pgHostel.pgHostelName}</h3>
                  <p><strong>Location:</strong> {pgHostel.location}</p>
                  <p><strong>Total Floor:</strong> {pgHostel.totalFloors}</p>
                  <p><strong>Room:</strong> {pgHostel.acRoom}</p>
                  <p><strong>Food:</strong> {pgHostel.food}</p>
                  <p><strong>Car Parking:</strong> {pgHostel.carParking}</p>
                  <p><strong>Monthly Maintenance:</strong> {pgHostel.maintenance}</p>
                  <p><strong>Price:</strong> {pgHostel.price} RPS</p>
                  <div className="pgall-card-buttons">
                    <button onClick={() => handleViewDetailsClick(pgHostelId)} className="pgall-view-details-button">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPgHostelall;
