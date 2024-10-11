import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import config from "../../../config";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./interior.css"; 

const CategoryInterior = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const navigate = useNavigate();

  const interiorRoute = `${config.apiURL}/interiorRoute/interior`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(interiorRoute);
        setData(response.data);
        const counts = await Promise.all(response.data.map(interior =>
          axios.get(`${config.apiURL}/favourites/count/${interior._id}`)
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

  const handleArrowClick = () => {
    navigate("/interiorall");
  };

  const handleCardClick = (interiorId) => {
    navigate(`/interiorview/${interiorId}`);
  };

  const handleViewDetailsClick = (interiorId) => {
    navigate(`/interiorview/${interiorId}`);
  };

  const handleAddToFavourites = async (interiorId) => {
    const userId = getUserId();
  
    try {
      if (favourites.includes(interiorId)) {
        await axios.delete(`${config.apiURL}/favourites/remove`, {
          params: { userId, productId: interiorId }
        });
        setFavourites((prevFavourites) => prevFavourites.filter((id) => id !== interiorId));
      } else {
        await axios.post(`${config.apiURL}/favourites/add`, { userId, productId: interiorId });
        setFavourites((prevFavourites) => [...prevFavourites, interiorId]);
      }
      const { data: countData } = await axios.get(`${config.apiURL}/favourites/count/${interiorId}`);
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [interiorId]: countData.count
      }));
    } catch (err) {
      console.error('Error updating favourites:', err);
    }
  };
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="interior-category-container">
      <div className="interior-header-container">
        <h2>Interior Products</h2>
        <div className="interior-arrow-container" onClick={handleArrowClick}>
          ➡️
        </div>
      </div>

      <div className="interior-card-container">
        {data.slice(0, 4).map((interior) => {
            const interiorId = interior._id;

            return (
              <div key={interiorId} className={`interior-card ${favourites.includes(interiorId) ? 'interior-favourite' : ''}`} onClick={() => handleCardClick(interiorId)}>
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  stopOnHover
                  dynamicHeight
                  className="interior-carousel"
                >
                  {interior.images.map((photo, idx) => (
                    <div key={idx}>
                      <img src={`${config.apiURL}/${photo}`} alt={`Interior ${interior.products}`} />
                    </div>
                  ))}
                </Carousel>
                <div className="interior-card-content">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavourites(interiorId);
                    }}
                    className="interior-favourite-button"
                  >
                    {favourites.includes(interiorId) ? (
                      <FaHeart className="interior-favourite-icon filled" />
                    ) : (
                      <FaRegHeart className="interior-favourite-icon" />
                    )}
                    <span className="interior-like-count">{likeCounts[interiorId] || 0} Likes</span>
                  </button>
                  <h3>{interior.products}</h3>
                  <p><strong>Seller Name:</strong> {interior.name}</p>
                  <p><strong>Category:</strong> {interior.category}</p>
                  <p><strong>Description:</strong> {interior.description}</p>
                  <p><strong>Price:</strong> {interior.price} RPS</p>
                  <div className="interior-card-buttons">
                    <button onClick={() => handleViewDetailsClick(interiorId)} className="interior-view-details-button">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CategoryInterior;
