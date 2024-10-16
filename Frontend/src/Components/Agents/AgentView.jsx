import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import config from "../../config";
import "./AgentView.css"; 
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const AgentViewId = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/agentRoute/agents/${id}`);
        setAgent(response.data);
      } catch (err) {
        setError(err.message);
        setSnackbarMessage("Error fetching agent details");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [id]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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
    <div className="agentviewid-container">
      <div className="agentviewid-header">
        <h2>
          Agent Detail
        </h2>
      </div>

      <div className="agentviewid-card">
        <img
          src={`${config.apiURL}/${agent.images[0]}`} 
          alt={`Agent ${agent.firstName} ${agent.lastName}`}
          className="agentviewid-image"
        />
        <div className="agentviewid-info">
        <p><strong>Name :</strong> {agent.firstName} {agent.lastName}</p>
          <p>
            <strong>Company:</strong> {agent.companyName}
          </p>
          <p>
            <strong>Email:</strong> {agent.email}
          </p>
          <p>
            <strong>Phone:</strong> {agent.phoneNumber}
          </p>
          <p>
            <strong>Product Interest:</strong> {agent.productInterest}
          </p>
        </div>
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

export default AgentViewId;
