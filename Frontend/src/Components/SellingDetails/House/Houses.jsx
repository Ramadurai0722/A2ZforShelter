import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Houses.css";
import config from "../../../config";
import CircularProgress from "@mui/material/CircularProgress";

function AdList() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/houseRoute/houses`);
        setAds(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching ads:", err);
        setError("Failed to fetch ads. Please try again later.");
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading)
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="ad-list-container">
      <h2>Available Ads</h2>
      <div className="ad-list">
        {ads.map((ad) => (
          <div key={ad._id} className="ad-card">
            <div className="ad-card-header">
              <h3>{ad.adTitle}</h3>
              <p className="ad-price">₹{ad.price.toLocaleString()}</p>
            </div>
            <div className="ad-photos">
              {ad.photos.length > 0 ? (
                ad.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={`${config.apiURL}/${photo}`}
                    alt={`Photo ${index + 1}`}
                    className="ad-photo"
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
            <div className="ad-details">
              <p>
                <strong>Location:</strong> {ad.location}
              </p>
              <p>
                <strong>Bedrooms:</strong> {ad.bedrooms}
              </p>
              <p>
                <strong>Bathrooms:</strong> {ad.bathrooms}
              </p>
              <p>
                <strong>Furnishing:</strong> {ad.furnishing}
              </p>
              <p>
                <strong>Construction Status:</strong> {ad.constructionStatus}
              </p>
              <p>
                <strong>Listed By:</strong> {ad.listedBy}
              </p>
              <p>{ad.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdList;
