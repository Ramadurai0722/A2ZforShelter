import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import CateringWithFavourites from "./Cateringfav";
import CementWithFavourites from "./Cementfav";
import HouseWithFavourites from "./housefav";
import InteriorWithFavourites from "./interiorfav";
import PgHostelWithFavourites from "./pgfav";
import PipeWireWithFavourites from "./pipewire";
import SandWithFavourites from "./sandfav";
import SteelWithFavourites from "./steelfav";
import StoneWithFavourites from "./stonefav";
import WoodWithFavourites from "./woodfav";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import config from "../../config";
// import "./main.css";

function FavCategories() {
  const [tokenValid, setTokenValid] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setTokenValid(false);
        handleError("No authentication token found. Redirecting to login...");
        return;
      }

      try {
        const response = await axios.post(`${config.apiURL}/api/validateToken`, {
          token: token,
        });

        if (!response.data.valid) {
          setTokenValid(false);
          handleError("Invalid token. Please log in again.");
        }
      } catch (error) {
        handleError("An error occurred during token validation. Please try again later.");
        setTokenValid(false);
      }
    };

    checkTokenValidity();
  }, [navigate]);

  const handleError = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (!tokenValid) {
    return (
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    );
  }

  const itemComponents = [
    <CateringWithFavourites />,
    <CementWithFavourites />,
    <HouseWithFavourites />,
    <InteriorWithFavourites />,
    <PgHostelWithFavourites />,
    <PipeWireWithFavourites />,
    <SandWithFavourites />,
    <SteelWithFavourites />,
    <StoneWithFavourites />,
    <WoodWithFavourites />,
  ];
  const itemsToDisplay = itemComponents.filter(item => item !== null && item !== false && item !== undefined);

  return (
    <>
      <Navbar />
      <div className="category-container">
        <h2>Favorite Categories</h2>
        <div className="items-grid">
          {itemsToDisplay.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FavCategories;
