import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import config from '../../config';
import './CategoryHouse.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer';

const CategoryCateringall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const navigate = useNavigate();

  const cateringRoute = `${config.apiURL}/cateringRoute/catering`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(cateringRoute);
        setData(response.data);

        // Fetch like counts after fetching catering data
        const counts = await Promise.all(response.data.map(catering =>
          axios.get(`${config.apiURL}/favourites/count/${catering._id}`)
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

  const handleCardClick = (cateringId) => {
    navigate(`/cateringview/${cateringId}`);
  };

  const handleViewDetailsClick = (cateringId) => {
    navigate(`/cateringview/${cateringId}`);
  };

  const handleAddToFavourites = async (cateringId) => {
    const userId = getUserId();
    const productId = cateringId;

    console.log('UserId:', userId);
    console.log('ProductId:', productId);

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
          <h2>Catering Services</h2>
        </div>

        <div className="card-container">
          {data.map((catering, index) => {
            const productId = catering._id;

            return (
              <div key={productId} className={`card ${favourites.includes(productId) ? 'favourite' : ''}`} onClick={() => handleCardClick(productId)}>
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  stopOnHover
                  dynamicHeight
                  className="carousel"
                >
                  {catering.images.map((photo, idx) => (
                    <div key={idx}>
                      <img src={`${config.apiURL}/${photo}`} alt={`Catering ${catering.name}`} />
                    </div>
                  ))}
                </Carousel>
                <div className="card-content">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavourites(productId);
                    }}
                    className="favourite-button"
                  >
                    {favourites.includes(productId) ? (
                      <FaHeart className="favourite-icon filled" />
                    ) : (
                      <FaRegHeart className="favourite-icon" />
                    )}
                    <span className="like-count">{likeCounts[productId] || 0} Likes</span> {/* Display like count */}
                  </button>
                  <h3>{catering.name}</h3>
                  <p><strong>Meals:</strong> {catering.meals}</p>
                  <p><strong>Menu:</strong> {catering.menuCatlogues}</p>
                  <p><strong>Number of People:</strong> {catering.numberOfPeople}</p>
                  <p><strong>Price:</strong> {catering.price} RPS</p>
                  <div className="card-buttons">
                    <button onClick={() => handleViewDetailsClick(productId)} className="view-details-button">
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

export default CategoryCateringall;
