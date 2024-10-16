import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import config from "../../../config";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import './pgall.css';

const CategoryPgHostelall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleAddToFavourites = async (pgHostelId) => {
    const userId = getUserId();

    try {
      if (favourites.includes(pgHostelId)) {
        await axios.delete(`${config.apiURL}/favourites/remove`, {
          params: { userId, productId: pgHostelId }
        });
        setFavourites(prevFavourites => prevFavourites.filter(id => id !== pgHostelId));
      } else {
        await axios.post(`${config.apiURL}/favourites/add`, { userId, productId: pgHostelId });
        setFavourites(prevFavourites => [...prevFavourites, pgHostelId]);
      }

      const { data: countData } = await axios.get(`${config.apiURL}/favourites/count/${pgHostelId}`);
      setLikeCounts(prevCounts => ({
        ...prevCounts,
        [pgHostelId]: countData.count
      }));
    } catch (err) {
      console.error('Error updating favourites:', err);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("Search initiated: ", searchQuery);
    }
  };
  const queryNumber = parseFloat(searchQuery);
  const isNumericQuery = !isNaN(queryNumber) && searchQuery.trim() !== '';
  
  const filteredData = data.filter(pgHostel => {
    const matchesName = pgHostel.pgHostelName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = pgHostel.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = pgHostel.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = isNumericQuery && pgHostel.price >= queryNumber; 
    return matchesName || matchesType || matchesLocation || matchesPrice;
  });
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="pgall-category-container">
        <div className="pgall-header-container">
          <h2>PG Hostels</h2>
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
          <button onClick={() => console.log("Search initiated: ", searchQuery)} className="cat-search-button"> 
            Search
          </button>
        </div>

        <div className="pgall-card-container">
          {filteredData.length === 0 ? (
            <p style={{ textAlign: "center" }}>No products found for "{searchQuery}" in this category.</p>
          ) : (
            filteredData.map((pgHostel) => {
              const pgHostelId = pgHostel._id;

              return (
                <div key={pgHostelId} className={`pgall-card ${favourites.includes(pgHostelId) ? 'favourite' : ''}`} onClick={() => handleCardClick(pgHostelId)}>
                  <div className="pgall-card-content">
                    <div className="pgall-header">
                      <h3>{pgHostel.type}</h3>
                      <p className="pgall-price" style={{ color: "green" }}>{pgHostel.price} RPS</p>
                    </div>

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

                    <div className="pgall-like-container">
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
                      </button>
                      <span className="pgall-like-count">{likeCounts[pgHostelId] || 0} Likes</span>
                    </div>

                    <h5>{pgHostel.pgHostelName}</h5>
                    <p><strong>Location:</strong> {pgHostel.location}</p>
                    <p><strong>Food:</strong> {pgHostel.food}</p>
                    <p><strong>Monthly Maintenance:</strong> {pgHostel.maintenance}</p>

                    <div className="pgall-card-buttons">
                      <button onClick={() => handleCardClick(pgHostelId)} className="pgall-view-details-button">
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

export default CategoryPgHostelall;
