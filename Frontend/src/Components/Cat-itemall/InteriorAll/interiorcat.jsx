import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import config from "../../../config";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import './interiorall.css';

const InteriorCategoryPage = () => {
  const { category } = useParams();
  const [interior, setInterior] = useState([]);
  const [filteredInterior, setFilteredInterior] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterior = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/interiorRoute/interior`);
        setInterior(response.data);

        const counts = await Promise.all(
          response.data.map(item =>
            axios.get(`${config.apiURL}/favourites/count/${item._id}`)
          )
        );
        const likeCountMap = counts.reduce((acc, curr, index) => {
          acc[response.data[index]._id] = curr.data.count;
          return acc;
        }, {});
        setLikeCounts(likeCountMap);
      } catch (err) {
        console.error("Error fetching data:", err);
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
        console.error("Error fetching favourites:", err);
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
    return localStorage.getItem("userId");
  };

  const handleCardClick = (interiorId) => {
    navigate(`/interiorview/${interiorId}`);
  };

  const handleAddToFavourites = async (interiorId) => {
    const userId = getUserId();
    const productId = interiorId;

    try {
      if (favourites.includes(productId)) {
        await axios.delete(`${config.apiURL}/favourites/remove`, { params: { userId, productId } });
        setFavourites(prevFavourites => prevFavourites.filter(id => id !== productId));
      } else {
        await axios.post(`${config.apiURL}/favourites/add`, { userId, productId });
        setFavourites(prevFavourites => [...prevFavourites, productId]);
      }
      const { data: countData } = await axios.get(`${config.apiURL}/favourites/count/${productId}`);
      setLikeCounts(prevCounts => ({
        ...prevCounts,
        [productId]: countData.count
      }));
    } catch (err) {
      console.error('Error updating favourites:', err);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      setSearchQuery(e.target.value);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const isNumeric = (value) => {
    return !isNaN(value) && !isNaN(parseFloat(value));
  };
  
  const queryNumber = parseFloat(searchQuery);

  const filteredByCategory = filteredInterior.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.products.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      (isNumeric(searchQuery) && item.price && item.price >= queryNumber)
    );
  });

  return (
    <>
      <Navbar />
      <div className="interiorall-category-container">
        <div className="interiorall-header-container">
          <h2 style={{ marginTop: "100px" }}>{category} Products</h2>
        </div>

        <div className="cat-search-container">
          <input
            type="text"
            placeholder="Search by product name, seller name, or price..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="cat-search-input"
          />
          <button onClick={handleSearch} className="cat-search-button"> 
            Search
          </button>
        </div>

        {filteredByCategory.length === 0 ? (
          <p style={{ textAlign: "center" }}>No products found for "{searchQuery}" in this category.</p>
        ) : (
          <div className="interiorall-card-container">
            {filteredByCategory.map((item) => {
              const interiorId = item._id;

              return (
                <div
                  key={interiorId}
                  className={`interiorall-card ${favourites.includes(interiorId) ? 'favourite' : ''}`}
                  onClick={() => handleCardClick(interiorId)}
                >
                  <div className="interiorall-card-content">
                    <div className="interiorall-header">
                      <h3>{item.products}</h3>
                      <p className="interiorall-price" style={{ color: "green" }}>{item.price} RPS</p>
                    </div>
                    <Carousel
                      showThumbs={false}
                      infiniteLoop
                      autoPlay
                      stopOnHover
                      dynamicHeight
                      className="interiorall-carousel"
                    >
                      {item.images.map((photo, idx) => (
                        <div key={idx}>
                          <img src={`${config.apiURL}/${photo}`} alt={`Interior ${item.products}`} />
                        </div>
                      ))}
                    </Carousel>

                    <div className="interiorall-like-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToFavourites(interiorId);
                        }}
                        className="interiorall-favourite-button"
                      >
                        {favourites.includes(interiorId) ? (
                          <FaHeart className="interiorall-favourite-icon filled" />
                        ) : (
                          <FaRegHeart className="interiorall-favourite-icon" />
                        )}
                      </button>
                      <span className="interiorall-like-count">{likeCounts[interiorId] || 0} Likes</span>
                    </div>
                    <p><strong>Seller Name:</strong> {item.name}</p>
                    <p><strong>Category:</strong> {item.category}</p>

                    <div className="interiorall-card-buttons">
                      <button
                        onClick={() => handleCardClick(interiorId)}
                        className="interiorall-view-details-button"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default InteriorCategoryPage;
