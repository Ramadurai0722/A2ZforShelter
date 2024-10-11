import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import config from "../../../config";
import './woodall.css'; 
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const CategoryWoodall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const navigate = useNavigate();

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

  const handleCardClick = (woodId) => {
    navigate(`/woodview/${woodId}`);
  };

  const handleViewDetailsClick = (woodId) => {
    navigate(`/woodview/${woodId}`);
  };

  const handleAddToFavourites = async (woodId) => {
    const userId = getUserId();
    const productId = woodId;

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
      <div className="woodall-category-container">
        <div className="woodall-header-container">
          <h2>Wood Products</h2>
        </div>
        
        <div className="woodall-card-container">
          {data.map((wood) => {
            const woodId = wood._id;

            return (
              <div key={woodId} className={`woodall-card ${favourites.includes(woodId) ? 'favourite' : ''}`} onClick={() => handleCardClick(woodId)}>
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
                <div className="woodall-card-content">
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
                    <span className="woodall-like-count">{likeCounts[woodId] || 0} Likes</span>
                  </button>
                  <h3>{wood.wood}</h3>
                  <p><strong>Seller Name:</strong> {wood.name}</p>
                  <p><strong>Thickness:</strong> {wood.thickness}</p>
                  <p><strong>Quantity:</strong> {wood.quantity}</p>
                  <p><strong>Price:</strong> {wood.price} RPS</p>
                  <div className="woodall-card-buttons">
                    <button onClick={() => handleViewDetailsClick(woodId)} className="woodall-view-details-button">
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

export default CategoryWoodall;
