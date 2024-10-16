import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import config from '../../../config';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import './cateringall.css';

const CategoryCateringall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const cateringRoute = `${config.apiURL}/cateringRoute/catering`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(cateringRoute);
        setData(response.data);
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

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      setSearchQuery(e.target.value);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  const filteredData = data.filter(catering => {
    const { name, meals, menuCatalogues, location, price } = catering;
    const query = searchQuery.toLowerCase();
    const queryNumber = parseFloat(searchQuery);
    const isNumericQuery = !isNaN(queryNumber) && searchQuery.trim() !== '';
    return (
      (name && name.toLowerCase().includes(query)) ||
      (meals && meals.toLowerCase().includes(query)) ||
      (menuCatalogues && menuCatalogues.toLowerCase().includes(query)) ||
      (location && location.toLowerCase().includes(query)) ||
      (isNumericQuery && price >= queryNumber)
    );
  });

  return (
    <>
      <Navbar />
      <div className="cateringall-category-container">
        <div className="cateringall-header-container">
          <h2>Catering Services</h2>
        </div>

        <div className="cat-search-container">
          <input
            type="text"
            placeholder="Search by name, meals, location, Price..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="cat-search-input"
          />
          <button onClick={handleSearch} className="cat-search-button"> 
            Search
          </button>
        </div>


        <div className="cateringall-card-container">
          {filteredData.length === 0 && searchQuery && (
            <p>No items matched for "{searchQuery}"</p>
          )}
          {filteredData.map((catering) => {
            const productId = catering._id;

            return (
              <div key={productId} className={`cateringall-card ${favourites.includes(productId) ? 'favourite' : ''}`} onClick={() => handleCardClick(productId)}>
                <div className="cateringall-card-content">
                  <div className="cateringall-header">
                    <h3>{catering.meals}</h3>
                    <p className="cateringall-price" style={{ color: "green" }}>{catering.price} RPS</p>
                  </div>
                  <Carousel
                    showThumbs={false}
                    infiniteLoop
                    autoPlay
                    stopOnHover
                    dynamicHeight
                    className="cateringall-carousel"
                  >
                    {catering.images.map((photo, idx) => (
                      <div key={idx}>
                        <img src={`${config.apiURL}/${photo}`} alt={`Catering ${catering.name}`} />
                      </div>
                    ))}
                  </Carousel>

                  <div className="cateringall-like-container">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToFavourites(productId);
                      }}
                      className="cateringall-favourite-button"
                    >
                      {favourites.includes(productId) ? (
                        <FaHeart className="cateringall-favourite-icon filled" />
                      ) : (
                        <FaRegHeart className="cateringall-favourite-icon" />
                      )}
                    </button>
                    <span className="cateringall-like-count">{likeCounts[productId] || 0} Likes</span>
                  </div>
                  <h6>{catering.name}</h6>
                  <p><strong>Menu:</strong> {catering.menuCatalogues}</p>
                  <p><strong>Number of People:</strong> {catering.numberOfPeople}</p>

                  <div className="cateringall-card-buttons">
                    <button onClick={() => handleViewDetailsClick(productId)} className="cateringall-view-details-button">
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
