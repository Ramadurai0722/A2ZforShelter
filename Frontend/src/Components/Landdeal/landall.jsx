import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import './landall.css'; 
import config from "../../config";

const LandList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const navigate = useNavigate();

  const landRoute = `${config.apiURL}/landRoute/lands`; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(landRoute);
        setData(response.data);
        const counts = await Promise.all(response.data.map(land =>
          axios.get(`${config.apiURL}/favourites/count/${land._id}`)
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

  const handleCardClick = (landId) => {
    navigate(`/landview/${landId}`);
  };
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="category-container">
        <div className="header-container">
          <h2>Available Lands</h2>
        </div>

        <div className="card-container">
          {data.map((land) => {
            const landId = land._id;

            return (
              <div key={landId} className={`card`} onClick={() => handleCardClick(landId)}>
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  stopOnHover
                  dynamicHeight
                  className="carousel"
                >
                  {land.photos.map((photo, idx) => (
                    <div key={idx}>
                      <img src={photo} alt={`Land ${idx}`} />
                    </div>
                  ))}
                </Carousel>
                <div className="card-content">
                  <h3>{land.projectName}</h3>
                  <p><strong>Location:</strong> {land.location}</p>
                  <p><strong>Area:</strong> {land.landArea} sq ft</p>
                  <p><strong>Facilities:</strong> {land.facilities}</p>
                  <p><strong>Price:</strong> ${land.price}</p>
                  <div className="card-buttons">
                    <button className="view-details-button">
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

export default LandList;
