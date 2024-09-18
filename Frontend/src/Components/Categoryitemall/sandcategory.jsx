import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import config from "../../config";
import './CategoryHouse.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer';

const CategorySandall = () => {
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

        // Fetch like counts for each sand
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

  const handleCardClick = (sandId) => {
    navigate(`/sandview/${sandId}`);
  };

  const handleViewDetailsClick = (sandId) => {
    navigate(`/sandview/${sandId}`);
  };

  const handleAddToFavourites = async (sandId) => {
    const userId = getUserId();

    try {
      if (favourites.includes(sandId)) {
        await axios.delete(`${config.apiURL}/favourites/remove`, { data: { userId, productId: sandId } });
        setFavourites((prevFavourites) => prevFavourites.filter((id) => id !== sandId));
      } else {
        await axios.post(`${config.apiURL}/favourites/add`, { userId, productId: sandId });
        setFavourites((prevFavourites) => [...prevFavourites, sandId]);
      }
      // Update like counts
      const { data: countData } = await axios.get(`${config.apiURL}/favourites/count/${sandId}`);
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [sandId]: countData.count
      }));
    } catch (err) {
      console.error('Error updating favourites:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="category-container">
        <div className="header-container">
          <h2>Sand Products</h2>
        </div>
        
        <div className="card-container">
          {data.map((sand) => {
            const sandId = sand._id;

            return (
              <div key={sandId} className={`card ${favourites.includes(sandId) ? 'favourite' : ''}`} onClick={() => handleCardClick(sandId)}>
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  stopOnHover
                  dynamicHeight
                  className="carousel"
                >
                  {sand.images.map((photo, idx) => (
                    <div key={idx}>
                      <img src={`${config.apiURL}/${photo}`} alt={`Sand ${sand.sandType}`} />
                    </div>
                  ))}
                </Carousel>
                <div className="card-content">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleAddToFavourites(sandId);
                    }} 
                    className="favourite-button"
                  >
                    {favourites.includes(sandId) ? (
                      <FaHeart className="favourite-icon filled" />
                    ) : (
                      <FaRegHeart className="favourite-icon" />
                    )}
                    <span className="like-count">{likeCounts[sandId] || 0} Likes</span> {/* Display like count */}
                  </button>
                  <h3>{sand.sandType}</h3>
                  <p><strong>Seller Name:</strong> {sand.name}</p>
                  <p><strong>Quantity:</strong> {sand.quantity}</p>
                  <p><strong>Price:</strong> {sand.price} RPS</p>
                  <div className="card-buttons">
                    <button onClick={() => handleViewDetailsClick(sandId)} className="view-details-button">
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

export default CategorySandall;
