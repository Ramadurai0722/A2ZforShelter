import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import config from "../../../config";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import './cementall.css'; 

const CategoryCementall = () => {
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
      <div className="cementall-category-container">
        <div className="cementall-header-container">
          <h2>Cement Products</h2>
        </div>

        <div className="cementall-card-container">
          {data.map((cement) => {
            const cementId = cement._id;

            return (
              <div key={cementId} className={`cementall-card ${favourites.includes(cementId) ? 'cementall-favourite' : ''}`} onClick={() => handleCardClick(cementId)}>
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  stopOnHover
                  dynamicHeight
                  className="cementall-carousel"
                >
                  {cement.images.map((photo, idx) => (
                    <div key={idx}>
                      <img src={`${config.apiURL}/${photo}`} alt={`Cement ${cement.name}`} />
                    </div>
                  ))}
                </Carousel>
                <div className="cementall-card-content">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavourites(cementId);
                    }}
                    className="cementall-favourite-button"
                  >
                    {favourites.includes(cementId) ? (
                      <FaHeart className="cementall-favourite-icon filled" />
                    ) : (
                      <FaRegHeart className="cementall-favourite-icon" />
                    )}
                    <span className="cementall-like-count">{likeCounts[cementId] || 0} Likes</span>
                  </button>
                  <h3>{cement.brand}</h3>
                  <p><strong>Seller Name:</strong> {cement.name}</p>
                  <p><strong>Type:</strong> {cement.cementType}</p>
                  <p><strong>Quantity:</strong> {cement.quantity} <span>Kg</span></p>
                  <p><strong>Price:</strong> {cement.price} RPS</p>
                  <div className="cementall-card-buttons">
                    <button onClick={() => handleViewDetailsClick(cementId)} className="cementall-view-details-button">
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

export default CategoryCementall;
