import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import './landall.css'; 
import config from "../../../config";

const LandList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const landRoute = `${config.apiURL}/landRoute/lands`; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(landRoute);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (landId) => {
    navigate(`/landview/${landId}`);
  };

  const filteredData = data.filter((land) => {
    const query = searchQuery.toLowerCase();
    return (
      (land.projectName && land.projectName.toLowerCase().includes(query)) ||
      (land.location && land.location.toLowerCase().includes(query)) ||
      (land.facilities && land.facilities.some(facility => facility.toLowerCase().includes(query))) ||
      (land.landArea && land.landArea.toString().toLowerCase().includes(query)) ||
      (land.price && land.price.toString().toLowerCase().includes(query))
    );
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="landall-category-container">
        <div className="landall-header-container">
          <h2>Available Lands</h2>
          <div className="landall-search-container">
            <input
              type="text"
              placeholder="Search by project name, location, facilities, area, or price"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="landall-search-input"
            />
            <button 
              onClick={() => setSearchQuery('')} 
              className="landall-search-button"
            > 
              Clear
            </button>
          </div>
        </div>

        <div className="landall-card-container">
          {filteredData.length === 0 ? (
            <p>No lands available for "{searchQuery}". Please try a different search.</p>
          ) : (
            filteredData.map((land) => {
              const landId = land._id;

              return (
                <div key={landId} className="landall-card" onClick={() => handleCardClick(landId)}>
                  <div className="landall-card-header">
                    <p className="landall-area-price">
                      <span className="landall-area">{land.landArea} sq ft</span>
                      <span className="landall-price">${land.price}</span>
                    </p>
                  </div>
                  <Carousel
                    showThumbs={false}
                    infiniteLoop
                    autoPlay
                    stopOnHover
                    dynamicHeight
                    className="landall-carousel"
                  >
                    {land.photos.map((photo, idx) => (
                      <div key={idx}>
                        <img src={`${config.apiURL}/${photo}`} alt={`Land ${idx}`} className="landall-carousel-image" />
                      </div>
                    ))}
                  </Carousel>
                  <div className="landall-card-content">
                    <h3>{land.projectName}</h3>
                    <p><strong>Location:</strong> {land.location}</p>
                    <p><strong>Facilities:</strong> {land.facilities.join(', ')}</p>
                    <div className="landall-card-buttons">
                      <button className="landall-view-details-button">View Details</button>
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

export default LandList;
