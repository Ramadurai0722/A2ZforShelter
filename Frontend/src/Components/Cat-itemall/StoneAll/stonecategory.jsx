import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import config from "../../../config";
import './stoneall.css'; 
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const CategoryStoneall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const navigate = useNavigate();

  const stoneRoute = `${config.apiURL}/stoneRoute/stone`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(stoneRoute);
        setData(response.data);

        // Fetch favourite counts for each stone
        const counts = await Promise.all(response.data.map(stone =>
          axios.get(`${config.apiURL}/favourites/count/${stone._id}`)
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

  const handleCardClick = (stoneId) => {
    navigate(`/stoneview/${stoneId}`);
  };

  const handleViewDetailsClick = (stoneId) => {
    navigate(`/stoneview/${stoneId}`);
  };

  const handleAddToFavourites = async (stoneId) => {
    const userId = getUserId();
    const productId = stoneId;

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
      <div className="stoneeall-category-container">
        <div className="stoneeall-header-container">
          <h2>Stone Products</h2>
        </div>

        <div className="stoneeall-card-container">
          {data.map((stone) => {
            const stoneId = stone._id;

            return (
              <div key={stoneId} className={`stoneeall-card ${favourites.includes(stoneId) ? 'favourite' : ''}`} onClick={() => handleCardClick(stoneId)}>
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  stopOnHover
                  dynamicHeight
                  className="stoneeall-carousel"
                >
                  {stone.images.map((photo, idx) => (
                    <div key={idx}>
                      <img src={`${config.apiURL}/${photo}`} alt={`Stone ${stone.name}`} />
                    </div>
                  ))}
                </Carousel>
                <div className="stoneeall-card-content">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavourites(stoneId);
                    }}
                    className="stoneeall-favourite-button"
                  >
                    {favourites.includes(stoneId) ? (
                      <FaHeart className="stoneeall-favourite-icon filled" />
                    ) : (
                      <FaRegHeart className="stoneeall-favourite-icon" />
                    )}
                    <span className="stoneeall-like-count">{likeCounts[stoneId] || 0} Likes</span>
                  </button>
                  <h3>{stone.stoneCategory}</h3>
                  <p><strong>Seller Name:</strong> {stone.name}</p>
                  <p><strong>Type:</strong> {stone.stoneType}</p>
                  <p><strong>Quantity:</strong> {stone.quantity}</p>
                  <p><strong>Price:</strong> {stone.price} RPS</p>
                  <div className="stoneeall-card-buttons">
                    <button onClick={() => handleViewDetailsClick(stoneId)} className="stoneeall-view-details-button">
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

export default CategoryStoneall;
