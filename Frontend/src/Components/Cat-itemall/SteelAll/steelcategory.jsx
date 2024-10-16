import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import config from "../../../config";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import './steelall.css'; 

const CategorySteelall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();

  const steelRoute = `${config.apiURL}/steelRoute/steel`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(steelRoute);
        setData(response.data);

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

  const handleCardClick = (steelId) => {
    navigate(`/steelview/${steelId}`);
  };

  const handleAddToFavourites = async (steelId) => {
    const userId = getUserId();
    const productId = steelId;

    try {
      if (favourites.includes(productId)) {
        await axios.delete(`${config.apiURL}/favourites/remove`, {
          params: { userId, productId }
        });
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

  
  const isNumeric = (value) => {
    return !isNaN(value) && !isNaN(parseFloat(value));
  };
  
  const queryNumber = parseFloat(searchQuery);

  const filteredData = data.filter(steel =>
    steel.steelType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    steel.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    steel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    steel.steelCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (isNumeric(searchQuery) && steel.price && steel.price >= queryNumber)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="steeleall-category-container">
        <div className="steeleall-header-container">
          <h2>Steel Products</h2>
        </div>

        <div className="cat-search-container">
          <input
            type="text"
            placeholder="Search by steel type, brand, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="cat-search-input"
          />
          <button className="cat-search-button">
            Search
          </button>
        </div>

        <div className="steeleall-card-container">
          {filteredData.length === 0 ? (
            <p style={{ textAlign: "center" }}>No products found for "{searchQuery}".</p>
          ) : (
            filteredData.map((steel) => {
              const steelId = steel._id;

              return (
                <div key={steelId} className={`steeleall-card ${favourites.includes(steelId) ? 'favourite' : ''}`} onClick={() => handleCardClick(steelId)}>
                  <div className="steeleall-card-content">
                    <div className="steeleall-header">
                      <h3>{steel.steelType}</h3>
                      <p className="steeleall-price" style={{ color: "green" }}>{steel.price} RPS</p>
                    </div>

                    <Carousel
                      showThumbs={false}
                      infiniteLoop
                      autoPlay
                      stopOnHover
                      dynamicHeight
                      className="steeleall-carousel"
                    >
                      {steel.images.map((photo, idx) => (
                        <div key={idx}>
                          <img src={`${config.apiURL}/${photo}`} alt={`Steel ${steel.name}`} />
                        </div>
                      ))}
                    </Carousel>

                    <div className="steeleall-like-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToFavourites(steelId);
                        }}
                        className="steeleall-favourite-button"
                      >
                        {favourites.includes(steelId) ? (
                          <FaHeart className="steeleall-favourite-icon filled" />
                        ) : (
                          <FaRegHeart className="steeleall-favourite-icon" />
                        )}
                      </button>
                      <span className="steeleall-like-count">{likeCounts[steelId] || 0} Likes</span>
                    </div>

                    <h6>{steel.brand}</h6>
                    <p><strong>Seller Name:</strong> {steel.name}</p>
                    <p><strong>Category:</strong> {steel.steelCategory}</p>
                    <p><strong>Thickness:</strong> {steel.steelThickness}</p>
                    <p><strong>Length:</strong> {steel.meter}</p>

                    <div className="steeleall-card-buttons">
                      <button onClick={() => handleCardClick(steelId)} className="steeleall-view-details-button">
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

export default CategorySteelall;
