import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import config from "../../../config";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import './pipewireall.css'; 

const CategoryPipeWireall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const pipeWireRoute = `${config.apiURL}/pipeWiresRoute/pipewires`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(pipeWireRoute);
        setData(response.data);
        const counts = await Promise.all(response.data.map(item =>
          axios.get(`${config.apiURL}/favourites/count/${item._id}`)
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

  const handleCardClick = (itemId) => {
    navigate(`/pipe&wireview/${itemId}`);
  };

  const handleViewDetailsClick = (itemId) => {
    navigate(`/pipe&wireview/${itemId}`);
  };

  const handleAddToFavourites = async (itemId) => {
    const userId = getUserId();
    const productId = itemId;

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

  const filteredData = data.filter(item =>
    item.Type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.Type === "Pipes" && item.pipeBrand.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.Type === "Wires" && item.wireBrand.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (isNumeric(searchQuery) && item.price && item.price >= queryNumber)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="pipewireall-category-container">
        <div className="pipewireall-header-container">
          <h2>Pipe & Wire Products</h2>
        </div>

        <div className="cat-search-container">
          <input
            type="text"
            placeholder="Search by product type or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="cat-search-input"
          />
          <button onClick={() => setSearchQuery(searchQuery)} className="cat-search-button">
            Search
          </button>
        </div>

        <div className="pipewireall-card-container">
          {filteredData.length === 0 ? (
            <p style={{ textAlign: "center" }}>No products found for "{searchQuery}".</p>
          ) : (
            filteredData.map((item) => {
              const itemId = item._id;

              return (
                <div key={itemId} className={`pipewireall-card ${favourites.includes(itemId) ? 'favourite' : ''}`} onClick={() => handleCardClick(itemId)}>
                  <div className="pipewireall-card-content">
                    <div className="pipewireall-header">
                      <h3>{item.Type}</h3>
                      <p className="pipewireall-price" style={{ color: "green" }}>{item.price} RPS</p>
                    </div>

                    <Carousel
                      showThumbs={false}
                      infiniteLoop
                      autoPlay
                      stopOnHover
                      dynamicHeight
                      className="pipewireall-carousel"
                    >
                      {item.images.map((photo, idx) => (
                        <div key={idx}>
                          <img src={`${config.apiURL}/${photo}`} alt={`${item.Type} ${item.name}`} />
                        </div>
                      ))}
                    </Carousel>

                    <div className="pipewireall-like-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToFavourites(itemId);
                        }}
                        className="pipewireall-favourite-button"
                      >
                        {favourites.includes(itemId) ? (
                          <FaHeart className="pipewireall-favourite-icon filled" />
                        ) : (
                          <FaRegHeart className="pipewireall-favourite-icon" />
                        )}
                      </button>
                      <span className="pipewireall-like-count">{likeCounts[itemId] || 0} Likes</span>
                    </div>

                    {item.Type === "Pipes" ? (
                      <>
                        <h4>{item.pipeBrand}</h4>
                        <p><strong>Seller Name:</strong> {item.name}</p>
                        <p><strong>Pipe Type:</strong> {item.pipeType}</p>
                        <p><strong>Diameter:</strong> {item.pipeDiameter}</p>
                        <p><strong>Length:</strong> {item.pipeLength}</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                      </>
                    ) : (
                      <>
                        <h4>{item.wireBrand}</h4>
                        <p><strong>Seller Name:</strong> {item.name}</p>
                        <p><strong>Wire Type:</strong> {item.wireType}</p>
                        <p><strong>Diameter:</strong> {item.wireDiameter}</p>
                        <p><strong>Length:</strong> {item.wireLength}</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                      </>
                    )}

                    <div className="pipewireall-card-buttons">
                      <button onClick={() => handleViewDetailsClick(itemId)} className="pipewireall-view-details-button">
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

export default CategoryPipeWireall;
