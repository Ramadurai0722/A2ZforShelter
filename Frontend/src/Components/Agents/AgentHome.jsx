import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios"; // Import axios to send token to backend

import "./Style.css";
import config from "../../config";
import AgentSlist from "./AgentList";

function AgentDashboard() {
  const [tokenValid, setTokenValid] = useState(true); // Token validity state
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("authToken");

      // If token is missing, show the snackbar and navigate to login
      if (!token) {
        setTokenValid(false);
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }

      try {
        // Send token to backend to check its validity
        const response = await axios.post(
          `${config.apiURL}/api/validateToken`,
          {
            token: token,
          }
        );

        if (response.data.valid) {
          // Token is valid, continue rendering the dashboard
          setTokenValid(true);
        } else {
          // Token is invalid or expired, show snackbar and redirect
          setTokenValid(false);
          setOpenSnackbar(true);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        // If there's an error (e.g., network issue or server error), treat it as invalid token
        console.error("Error validating token:", error);
        setTokenValid(false);
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

    checkTokenValidity();
  }, [navigate]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (!tokenValid) {
    // If token is invalid, show white screen and snackbar
    return (
      <div style={{ backgroundColor: "white", height: "100vh" }}>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Please login.
          </Alert>
        </Snackbar>
      </div>
    );
  }

  // Render dashboard components if token is valid
  if (tokenValid) {
    return (
      <>
        <Navbar />
        <AgentSlist />
        <Footer />
      </>
    );
  }
}

export default AgentDashboard;
