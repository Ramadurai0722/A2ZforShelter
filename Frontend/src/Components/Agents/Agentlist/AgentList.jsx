import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import config from "../../../config";
import "./AgentList.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

const AgentSlist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setSnackbarMessage("Please log in");
        setSnackbarOpen(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${config.apiURL}/agentRoute/GetAgent`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (agentId) => {
    navigate(`/agents/${agentId}`);
  };

  const handleViewDetailsClick = (agentId) => {
    navigate(`/agents/${agentId}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const filteredData = data.filter((agent) => {
    const query = searchQuery.toLowerCase();
    return (
      agent.firstName.toLowerCase().includes(query) ||
      agent.lastName.toLowerCase().includes(query) ||
      agent.companyName.toLowerCase().includes(query) ||
      agent.phoneNumber.includes(searchQuery)
    );
  });

  if (loading) return <CircularProgress />;

  if (error)
    return (
      <Snackbar
        open={true}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          Error: {error}
        </Alert>
      </Snackbar>
    );

  return (
    <>
      <Navbar />
      <div className="agents-category-container">
        <div className="agents-header-container">
          <h2>Agents</h2>
          <div className="agents-search-container">
            <input
              type="text"
              placeholder="Search by name, company, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="agents-search-input"
            />
            <button 
              onClick={() => setSearchQuery('')} 
              className="agents-search-button"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="agents-card-container">
          {filteredData.length > 0 ? (
            filteredData.map((agent, index) => (
              <div
                key={index}
                className="agents-card"
                onClick={() => handleCardClick(agent._id)}
              >
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  stopOnHover
                  dynamicHeight
                  className="agents-carousel"
                >
                  {agent.images.map((photo, idx) => (
                    <div key={idx}>
                      <img
                        src={`${config.apiURL}/${photo}`}
                        alt={`Agent ${agent.firstName} ${agent.lastName}`}
                      />
                    </div>
                  ))}
                </Carousel>
                <div className="agents-card-content">
                  <h3>
                    {agent.firstName} {agent.lastName}
                  </h3>
                  <p>
                    <strong>Company:</strong> {agent.companyName}
                  </p>
                  <p>
                    <strong>Phone:</strong> {agent.phoneNumber}
                  </p>
                  <div className="agents-card-buttons">
                    <button
                      onClick={() => handleViewDetailsClick(agent._id)}
                      className="agents-view-details-button"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-agents-message">
              No agents available matching "<strong>{searchQuery}</strong>"
            </p>
          )}
        </div>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="warning">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
      <Footer />
    </>
  );
};

export default AgentSlist;
