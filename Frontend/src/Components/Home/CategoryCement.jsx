import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import config from "../../config";
import "./CategoryHouse.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CategoryCement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const navigate = useNavigate();

  const cementRoute = `${config.apiURL}/cementRoutes/cement`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(cementRoute);
        setData(response.data);
        const counts = await Promise.all(response.data.map(cement =>
          axios.get(`${config.apiURL}/favourites/count/${cement._id}`)
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
    navigate("/cementall");
  };

  const handleCardClick = (cementId) => {
    navigate(`/cementview/${cementId}`);
  };

  const handleViewDetailsClick = (cementId) => {
    navigate(`/cementview/${cementId}`);
  };

  const handleAddToFavourites = async (cementId) => {
    const userId = getUserId();
    const productId = cementId;

    try {
      if (favourites.includes(productId)) {
        await axios.delete(`${config.apiURL}/favourites/remove`, { data: { userId, productId } });
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="category-container">
      <div className="header-container">
        <h2>Cement Products</h2>
        <div className="arrow-container" onClick={handleArrowClick}>
          ➡️
        </div>
      </div>

      <div className="card-container">
        {data.slice(0, 4).map((cement) => {
            const cementId = cement._id;

            return (
              <div key={cementId} className={`card ${favourites.includes(cementId) ? 'favourite' : ''}`} onClick={() => handleCardClick(cementId)}>
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  stopOnHover
                  dynamicHeight
                  className="carousel"
                >
                  {cement.images.map((photo, idx) => (
                    <div key={idx}>
                      <img src={`${config.apiURL}/${photo}`} alt={`Cement ${cement.name}`} />
                    </div>
                  ))}
                </Carousel>
                <div className="card-content">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavourites(cementId);
                    }}
                    className="favourite-button"
                  >
                    {favourites.includes(cementId) ? (
                      <FaHeart className="favourite-icon filled" />
                    ) : (
                      <FaRegHeart className="favourite-icon" />
                    )}
                    <span className="like-count">{likeCounts[cementId] || 0} Likes</span> {/* Display like count */}
                  </button>
                  <h3>{cement.brand}</h3>
                  <p><strong>Seller Name:</strong> {cement.name}</p>
                  <p><strong>Type:</strong> {cement.cementType}</p>
                  <p><strong>Quantity:</strong> {cement.quantity} <span>Kg</span></p>
                  <p><strong>Price:</strong> {cement.price} RPS</p>
                  <div className="card-buttons">
                    <button onClick={() => handleViewDetailsClick(cementId)} className="view-details-button">
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

export default CategoryCement;
