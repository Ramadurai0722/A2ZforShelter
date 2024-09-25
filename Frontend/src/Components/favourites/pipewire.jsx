import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Button } from '@mui/material';
import config from "../../config";
import './fav.css';

const PipeWireWithFavourites = () => {
  const [pipeWireData, setPipeWireData] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPipeWireData = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/pipeWiresRoute/pipewires`);
        setPipeWireData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchFavourites = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const response = await axios.get(`${config.apiURL}/favourites/all/${userId}`);
          setFavourites(response.data);
        } catch (err) {
          console.error('Error fetching favourites:', err);
        }
      }
    };

    fetchPipeWireData();
    fetchFavourites();
  }, []);

  const handleViewDetailsClick = (itemId) => {
    navigate(`/pipe&wireview/${itemId}`);
  };

  const handleAddToFavourites = async (itemId) => {
    const userId = localStorage.getItem('userId');

    try {
      if (favourites.includes(itemId)) {
        await axios.delete(`${config.apiURL}/favourites/remove`, { data: { userId, productId: itemId } });
        setFavourites(prevFavourites => prevFavourites.filter(id => id !== itemId));
      } else {
        await axios.post(`${config.apiURL}/favourites/add`, { userId, productId: itemId });
        setFavourites(prevFavourites => [...prevFavourites, itemId]);
      }
    } catch (err) {
      console.error('Error updating favourites:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="category-container">
      <div className="card-container">
        {pipeWireData.filter(item => favourites.includes(item._id)).map(item => (
          <div key={item._id} className="card">
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="carousel"
            >
              {item.images.map((photo, idx) => (
                <div key={idx}>
                  <img src={`${config.apiURL}/${photo}`} alt={`${item.Type} ${item.name}`} />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              {item.Type === "Pipes" ? (
                <>
                  <h3>{item.pipeBrand}</h3>
                  <p><strong>Seller Name:</strong> {item.name}</p>
                  <p><strong>Pipe Type:</strong> {item.pipeType}</p>
                  <p><strong>Diameter:</strong> {item.pipeDiameter}</p>
                  <p><strong>Length:</strong> {item.pipeLength}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Price:</strong> {item.price} RPS</p>
                </>
              ) : item.Type === "Wires" ? (
                <>
                  <h3>{item.wireBrand}</h3>
                  <p><strong>Seller Name:</strong> {item.name}</p>
                  <p><strong>Wire Type:</strong> {item.wireType}</p>
                  <p><strong>Diameter:</strong> {item.wireDiameter}</p>
                  <p><strong>Length:</strong> {item.wireLength}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Price:</strong> {item.price} RPS</p>
                </>
              ) : null}

              <div className="card-buttons">
                <button onClick={() => handleViewDetailsClick(item._id)} className="view-details-button">
                  View Details
                </button>
                <Button 
                  className="favourite-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToFavourites(item._id);
                  }}
                >
                  <FaHeart className="favourite-icon filled" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipeWireWithFavourites;
