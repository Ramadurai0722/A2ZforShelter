import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import config from '../../config';
import './CategoryHouse.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer';

const InteriorCategoryPage = () => {
  const { category } = useParams();
  const [interior, setInterior] = useState([]);
  const [filteredInterior, setFilteredInterior] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterior = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/interiorRoute/interior`);
        setInterior(response.data);
        
        const counts = await Promise.all(response.data.map(item => 
          axios.get(`${config.apiURL}/favourites/count/${item._id}`)
        ));
        const likeCountMap = counts.reduce((acc, curr, index) => {
          acc[response.data[index]._id] = curr.data.count;
          return acc;
        }, {});
        setLikeCounts(likeCountMap);
      } catch (err) {
        console.error('Error fetching data:', err);
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

    fetchInterior();
    fetchFavourites();
  }, []);

  useEffect(() => {
    if (interior.length > 0) {
      const filtered = interior.filter(item => item.category === category);
      setFilteredInterior(filtered);
    }
  }, [interior, category]);

  const getUserId = () => {
    return localStorage.getItem('userId');
  };

  const handleCardClick = (interiorId) => {
    navigate(`/interiorview/${interiorId}`);
  };

  const handleViewDetailsClick = (interiorId) => {
    navigate(`/interiorview/${interiorId}`);
  };

  const handleAddToFavourites = async (interiorId) => {
    const userId = getUserId();
    const productId = interiorId;

    try {
      if (favourites.includes(productId)) {
        await axios.delete(`${config.apiURL}/favourites/remove`, { data: { userId, productId } });
        setFavourites((prevFavourites) => prevFavourites.filter((id) => id !== productId));
      } else {
        await axios.post(`${config.apiURL}/favourites/add`, { userId, productId });
        setFavourites((prevFavourites) => [...prevFavourites, productId]);
      }
      // Update like counts
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
    <>
      <Navbar />
      <div className="category-container">
        <div className="header-container">
          <h2>{category} Products</h2>
        </div>

        {filteredInterior.length === 0 ? (
          <p style={{textAlign:"center"}}>No products found in this category.</p>
        ) : (
          <div className="card-container">
            {filteredInterior.map((item) => (
              <div key={item._id} className={`card ${favourites.includes(item._id) ? 'favourite' : ''}`} onClick={() => handleCardClick(item._id)}>
                <Carousel showThumbs={false} infiniteLoop autoPlay stopOnHover dynamicHeight className="carousel">
                  {item.images.map((photo, idx) => (
                    <div key={idx}>
                      <img src={`${config.apiURL}/${photo}`} alt={`Interior ${item.name}`} />
                    </div>
                  ))}
                </Carousel>
                <div className="card-content">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavourites(item._id);
                    }}
                    className="favourite-button"
                  >
                    {favourites.includes(item._id) ? (
                      <FaHeart className="favourite-icon filled" />
                    ) : (
                      <FaRegHeart className="favourite-icon" />
                    )}
                    <span className="like-count">{likeCounts[item._id] || 0} Likes</span> {/* Display like count */}
                  </button>
                  <h3>{item.products}</h3>
                  <p><strong>Seller Name:</strong> {item.name}</p>
                  <p><strong>Category:</strong> {item.category}</p>
                  <p><strong>Description:</strong> {item.description}</p>
                  <p><strong>Price:</strong> {item.price} RPS</p>
                  <div className="card-buttons">
                    <button onClick={() => handleViewDetailsClick(item._id)} className="view-details-button">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default InteriorCategoryPage;
