import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import config from "../../../config";
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import './stoneall.css'; 

const CategoryStoneall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();

  const stoneRoute = `${config.apiURL}/stoneRoute/stone`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(stoneRoute);
        setData(response.data);
        
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

  const isNumeric = (value) => {
    return !isNaN(value) && !isNaN(parseFloat(value));
  };
  
  const queryNumber = parseFloat(searchQuery);

  const filteredData = data.filter(stone =>
    stone.stoneType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stone.stoneCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (isNumeric(searchQuery) && stone.price && stone.price >= queryNumber)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="stoneall-category-container">
        <div className="stoneall-header-container">
          <h2>Stone Products</h2>
        </div>

        <div className="cat-search-container">
          <input
            type="text"
            placeholder="Search by stone type, category, or seller..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="cat-search-input"
          />
          <button className="cat-search-button">
            Search
          </button>
        </div>

        <div className="stoneall-card-container">
          {filteredData.length === 0 ? (
            <p style={{ textAlign: "center" }}>No products found for "{searchQuery}".</p>
          ) : (
            filteredData.map((stone) => {
              const stoneId = stone._id;

              return (
                <div key={stoneId} className={`stoneall-card ${favourites.includes(stoneId) ? 'favourite' : ''}`} onClick={() => handleCardClick(stoneId)}>
                  <div className="stoneall-card-content">
                    <div className="stoneall-header">
                      <h3>{stone.quantity}</h3>
                      <p className="stoneall-price" style={{ color: "green" }}>{stone.price} RPS</p>
                    </div>
                    <Carousel
                      showThumbs={false}
                      infiniteLoop
                      autoPlay
                      stopOnHover
                      dynamicHeight
                      className="stoneall-carousel"
                    >
                      {stone.images.map((photo, idx) => (
                        <div key={idx}>
                          <img src={`${config.apiURL}/${photo}`} alt={`Stone ${stone.name}`} />
                        </div>
                      ))}
                    </Carousel>
                    <div className="stoneall-like-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToFavourites(stoneId);
                        }}
                        className="stoneall-favourite-button"
                      >
                        {favourites.includes(stoneId) ? (
                          <FaHeart className="stoneall-favourite-icon filled" />
                        ) : (
                          <FaRegHeart className="stoneall-favourite-icon" />
                        )}
                      </button>
                      <span className="stoneall-like-count">{likeCounts[stoneId] || 0} Likes</span>
                    </div>
                    <h6>{stone.stoneCategory}</h6>
                    <p><strong>Seller Name:</strong> {stone.name}</p>
                    <p><strong>Type:</strong> {stone.stoneType}</p>

                    <div className="stoneall-card-buttons">
                      <button onClick={() => handleCardClick(stoneId)} className="stoneall-view-details-button">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryStoneall;
