import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import config from "../../../config";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import './sandall.css'; 

const CategorySandall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const sandRoute = `${config.apiURL}/sandRoute/sand`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(sandRoute);
        setData(response.data);

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
    const productId = sandId;

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
  
  // Filtering logic based on the search query
  const filteredData = data.filter(sand =>
    sand.sandType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sand.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (isNumeric(searchQuery) && sand.price && sand.price >= queryNumber)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="sandall-category-container">
        <div className="sandall-header-container">
          <h2>Sand Products</h2>
        </div>

        <div className="cat-search-container">
          <input
            type="text"
            placeholder="Search by sand type, seller, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="cat-search-input"
          />
          <button className="cat-search-button">
            Search
          </button>
        </div>

        <div className="sandall-card-container">
          {filteredData.length === 0 ? (
            <p style={{ textAlign: "center" }}>No products found for "{searchQuery}".</p>
          ) : (
            filteredData.map((sand) => {
              const sandId = sand._id;

              return (
                <div key={sandId} className={`sandall-card ${favourites.includes(sandId) ? 'favourite' : ''}`} onClick={() => handleCardClick(sandId)}>
                  <div className="sandall-card-content">
                    <div className="sandall-header">
                      <h3>{sand.quantity}</h3>
                      <p className="sandall-price" style={{ color: "green" }}>{sand.price} RPS</p>
                    </div>
                    <Carousel
                      showThumbs={false}
                      infiniteLoop
                      autoPlay
                      stopOnHover
                      dynamicHeight
                      className="sandall-carousel"
                    >
                      {sand.images.map((photo, idx) => (
                        <div key={idx}>
                          <img src={`${config.apiURL}/${photo}`} alt={`Sand ${sand.sandType}`} />
                        </div>
                      ))}
                    </Carousel>

                    <div className="sandall-like-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToFavourites(sandId);
                        }}
                        className="sandall-favourite-button"
                      >
                        {favourites.includes(sandId) ? (
                          <FaHeart className="sandall-favourite-icon filled" />
                        ) : (
                          <FaRegHeart className="sandall-favourite-icon" />
                        )}
                      </button>
                      <span className="sandall-like-count">{likeCounts[sandId] || 0} Likes</span>
                    </div>
                    <h6>{sand.sandType}</h6>
                    <p><strong>Seller Name:</strong> {sand.name}</p>
                    <p><strong>Description:</strong> {sand.description}</p>

                    <div className="sandall-card-buttons">
                      <button onClick={() => handleViewDetailsClick(sandId)} className="sandall-view-details-button">
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

export default CategorySandall;
