import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Snackbar,
  Alert,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import config from "../../config";
import { FaHeart } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import './fav.css';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const FavCategories = () => {
  const [tokenValid, setTokenValid] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState('');
  const [favouriteData, setFavouriteData] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const categories = [
    { name: "Catering", endpoint: `${config.apiURL}/cateringRoute/catering` },
    { name: "Cement", endpoint: `${config.apiURL}/cementRoutes/cement` },
    { name: "Houses", endpoint: `${config.apiURL}/houseRoute/houses` },
    { name: "Interior", endpoint: `${config.apiURL}/interiorRoute/interior` },
    { name: "PG Hostels", endpoint: `${config.apiURL}/pgHostelRoute/pgHostel` },
    { name: "Pipe Wires", endpoint: `${config.apiURL}/pipeWiresRoute/pipewires` },
    { name: "Sand", endpoint: `${config.apiURL}/sandRoute/sand` },
    { name: "Steel", endpoint: `${config.apiURL}/steelRoute/steel` },
    { name: "Stone", endpoint: `${config.apiURL}/stoneRoute/stone` },
    { name: "Wood", endpoint: `${config.apiURL}/woodRoute/wood` },
  ];

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setTokenValid(false);
        handleError("No authentication token found. Redirecting to login...");
        return;
      }

      try {
        const response = await axios.post(`${config.apiURL}/api/validateToken`, { token });
        if (!response.data.valid) {
          setTokenValid(false);
          handleError("Invalid token. Please log in again.");
        }
      } catch (error) {
        handleError("An error occurred during token validation. Please try again later.");
        setTokenValid(false);
      }
    };

    const fetchFavourites = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/favourites/all/${userId}`);
        setFavouriteData(response.data);
      } catch (error) {
        console.error("Error fetching favourites:", error);
        handleError("Error fetching favorites. Please try again later.");
      }
    };



    const fetchAllCategories = async () => {
      try {
        const categoryPromises = categories.map((category) => axios.get(category.endpoint));
        const responses = await Promise.all(categoryPromises);
        const allCategoryItems = responses.flatMap((response) => response.data);
        setAllCategories(allCategoryItems);
      } catch (error) {
        console.error("Error fetching categories:", error);
        handleError("Error fetching categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    checkTokenValidity();
    fetchFavourites();
    fetchAllCategories();
  }, [navigate, userId]);

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

  const handleViewDetails = (item) => {
    const categoryRoutes = {
      catering: `/cateringview/${item._id}`,
      cement: `/cementview/${item._id}`,
      house: `/housesview/${item._id}`,
      interior: `/interiorview/${item._id}`,
      pghostel: `/pghostelview/${item._id}`,
      pipewire: `/pipewiresview/${item._id}`,
      sand: `/sandview/${item._id}`,
      steel: `/steelview/${item._id}`,
      stone: `/stoneview/${item._id}`,
      wood: `/woodview/${item._id}`,
    };

    const route = categoryRoutes[item.category];
    if (route) {
      navigate(route);
    } else {
      console.error("Unknown category");
    }
  };

  const handleRemoveFavourite = async (itemId) => {
    try {
      await axios.delete(`${config.apiURL}/favourites/remove`, {
        params: { userId, productId: itemId }
      });

      const updatedFavourites = favouriteData.filter(fav => fav.toString() !== itemId.toString());
      setFavouriteData(updatedFavourites);
      setSnackbarMessage("Successfully removed from favourites.");
      setSnackbarType("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error removing favourite:", error);
      setSnackbarMessage("Failed to remove from favourites");
      setSnackbarType("error");
      setOpenSnackbar(true);
    }
  };

  if (loading) return <CircularProgress />;

  if (!tokenValid) {
    return (
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    );
  }

  const filteredFavourites = allCategories.filter(item => favouriteData.includes(item._id));

  const renderFieldsHead = (item) => {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px',
        backgroundColor: '#f9f9f9',
        transition: 'background-color 0.3s',
      }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}>
        <div style={{ textAlign: 'left' }}>

          {item.category === 'catering' && item.meals && (
            <Typography variant="h6" style={{ fontSize: '15px', color: '#343a40' }}>
              {item.meals}
            </Typography>
          )}

          {item.category === 'house' && item.bedrooms && (
            <Typography variant="h6" style={{ fontSize: '15px', color: '#343a40' }}>
              {item.bedrooms} BHK
            </Typography>
          )}
          {item.category === 'cement' && item.quantity && (
            <Typography variant="h6" style={{ fontSize: '15px', color: '#343a40' }}>
              {item.quantity} KG
            </Typography>
          )}
          {item.category === 'interior' && item.type && (
            <Typography variant="body2" style={{ fontSize: '12px', color: '#343a40' }}>
              {item.type}
            </Typography>
          )}
          {item.category === 'pghostel' && item.type && (
            <Typography variant="h6" style={{ fontSize: '15px', color: '#343a40' }}>
              {item.type}
            </Typography>
          )}
          {item.category === 'pipewire' && (
            <Typography variant="h6" style={{ fontSize: '15px', color: '#343a40' }}>
              {item.Type === "Pipes" ? item.pipeBrand : item.wireBrand}
            </Typography>
          )}
          {(item.category === 'sand' || item.category === 'stone' || item.category === 'wood') && item.quantity && (
            <Typography variant="h6" style={{ fontSize: '15px', color: '#343a40' }}>
              {item.quantity}
            </Typography>
          )}
          {item.category === 'steel' && item.steelType && (
            <Typography variant="h6" style={{ fontSize: '15px', color: '#343a40' }}>
              {item.steelType}
            </Typography>
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          {item.price && (
            <Typography
              variant="body2"
              style={{
                color: "green",
                fontSize: '20px',
                fontWeight: 'bold',
                padding: '2px 5px',
                borderRadius: '4px',
                backgroundColor: '#dff0d8'
              }}
            >
              {item.price} RPS
            </Typography>
          )}
        </div>
      </div>
    );
  };

  const renderFields = (item) => {
    const styles = {
      title: { fontSize: '16px', fontWeight: 'bold', margin: '8px 0', color: '#333', marginLeft: "10px" },
      subtitle: { fontSize: '14px', margin: '4px 0', color: '#666', marginLeft: "10px" },
      label: { fontWeight: 'bold', color: '#333', marginLeft: "3px" },
      container: { marginBottom: '12px' }
    };

    return (
      <div style={styles.container}>
        {item.category === 'house' && (
          <>
            {item.purpose && <Typography variant="h4" style={styles.title}>{item.purpose}</Typography>}
            {item.projectName && <Typography variant="body1" style={styles.subtitle}>{item.projectName}</Typography>}
            {item.adTitle && <Typography variant="body1" style={styles.subtitle}>{item.adTitle}</Typography>}
            {item.bathrooms && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Bathrooms:</span> {item.bathrooms}</Typography>}
            {item.location && (
              <Typography variant="body2" style={styles.subtitle}>
                <span style={styles.label}>Location:</span>
                <span style={{ fontSize: "11.2px" }}> {item.location.split(',').slice(-3).join(',').trim()}</span>
              </Typography>
            )}
          </>
        )}

        {item.category === 'catering' && (
          <>
            {item.name && <Typography variant="h6" style={styles.title}>{item.name}</Typography>}
            {item.numberOfPeople && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>No.Of People:</span> {item.numberOfPeople}</Typography>}
            {item.menuCatalogues && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Menu:</span> {item.menuCatalogues}</Typography>}
            {item.shopAddress && (
              <Typography variant="body2" style={styles.subtitle}>
                <span style={styles.label}>Location:</span>
                <span style={{ fontSize: "11.2px" }}> {item.shopAddress.split(',').slice(-3).join(',').trim()}</span>
              </Typography>
            )}
          </>
        )}

        {item.category === 'cement' && (
          <>
            {item.brand && <Typography variant="h6" style={styles.title}>{item.brand}</Typography>}
            {item.name && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Seller Name:</span> {item.name}</Typography>}
            {item.cementType && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Type:</span> {item.cementType}</Typography>}
            {item.shopAddress && (
              <Typography variant="body2" style={styles.subtitle}>
                <span style={styles.label}>Location:</span>
                <span style={{ fontSize: "11.2px" }}> {item.shopAddress.split(',').slice(-3).join(',').trim()}</span>
              </Typography>
            )}
          </>
        )}
        {item.category === 'interior' && (
          <>
            {item.products && <Typography variant="h3" style={styles.title}>{item.products}</Typography>}
            {item.name && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Seller Name:</span> {item.name}</Typography>}
            {item.sellerAddress && (
              <Typography variant="body2" style={styles.subtitle}>
                <span style={styles.label}>Location:</span>
                <span style={{ fontSize: "11.2px" }}> {item.sellerAddress.split(',').slice(-3).join(',').trim()}</span>
              </Typography>
            )}
          </>
        )}
        {item.category === 'pghostel' && (
          <>
            {item.pgHostelName && <Typography variant="h5" style={styles.title}>{item.pgHostelName}</Typography>}
            {item.food && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Food:</span> {item.food}</Typography>}
            {item.maintenance && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Monthly Maintenance:</span> {item.maintenance}</Typography>}
            {item.location && (
              <Typography variant="body2" style={styles.subtitle}>
                <span style={styles.label}>Location:</span>
                <span style={{ fontSize: "11.2px" }}> {item.location.split(',').slice(-3).join(',').trim()}</span>
              </Typography>
            )}
          </>
        )}
        {item.category === 'pipewire' && (
          <>
            {item.Type === "Pipes" ? (
              <>
                <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Seller Name:</span> {item.name}</Typography>
                {/* <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Pipe Type:</span> {item.pipeType}</Typography> */}
                <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Diameter:</span> {item.pipeDiameter}</Typography>
                <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Length:</span> {item.pipeLength} m</Typography>
                <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Quantity:</span> {item.quantity}</Typography>
                <Typography variant="body2" style={styles.subtitle}>
                  <span style={styles.label}>Location:</span>
                  <span style={{ fontSize: "11.2px" }}> {item.sellerAddress.split(',').slice(-3).join(',').trim()}</span>
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Seller Name:</span> {item.name}</Typography>
                {/* <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Wire Type:</span> {item.wireType}</Typography> */}
                <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Diameter:</span> {item.wireDiameter}</Typography>
                <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Length:</span> {item.wireLength} m</Typography>
                <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Quantity:</span> {item.quantity}</Typography>
                <Typography variant="body2" style={styles.subtitle}>
                  <span style={styles.label}>Location:</span>
                  <span style={{ fontSize: "11.2px" }}> {item.sellerAddress.split(',').slice(-3).join(',').trim()}</span>
                </Typography>
              </>
            )}
          </>
        )}
        {item.category === 'sand' && (
          <>
            {item.sandType && <Typography variant="h6" style={styles.title}>{item.sandType}</Typography>}
            {item.name && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Seller Name:</span> {item.name}</Typography>}
            {item.sellerAddress && (
              <Typography variant="body2" style={styles.subtitle}>
                <span style={styles.label}>Location:</span>
                <span style={{ fontSize: "11.2px" }}> {item.sellerAddress.split(',').slice(-3).join(',').trim()}</span>
              </Typography>
            )}
          </>
        )}
        {item.category === 'stone' && (
          <>
            {item.stoneType && <Typography variant="h6" style={styles.title}>{item.stoneType}</Typography>}
            {item.name && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Seller Name:</span> {item.name}</Typography>}
            {item.stoneCategory && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Stone Category:</span> {item.stoneCategory}</Typography>}
            {item.sellerAddress && (
              <Typography variant="body2" style={styles.subtitle}>
                <span style={styles.label}>Location:</span>
                <span style={{ fontSize: "11.2px" }}> {item.sellerAddress.split(',').slice(-3).join(',').trim()}</span>
              </Typography>
            )}
          </>
        )}
        {item.category === 'wood' && (
          <>
            {item.woodType && <Typography variant="h6" style={styles.title}>{item.woodType}</Typography>}
            {item.name && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Seller Name:</span> {item.name}</Typography>}
            {item.thickness && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Thickness:</span>{item.thickness} </Typography>}
            {item.quantityType && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Quantity Type:</span>{item.quantityType} </Typography>}
            {item.sellerAddress && (
              <Typography variant="body2" style={styles.subtitle}>
                <span style={styles.label}>Location:</span>
                <span style={{ fontSize: "11.2px" }}> {item.sellerAddress.split(',').slice(-3).join(',').trim()}</span>
              </Typography>
            )}
          </>
        )}
        {item.category === 'steel' && (
          <>
            {item.steelType && <Typography variant="h6" style={styles.title}>{item.steelType}</Typography>}
            {item.name && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Seller Name:</span> {item.name}</Typography>}
            {item.shopAddress && (
              <Typography variant="body2" style={styles.subtitle}>
                <span style={styles.label}>Location:</span>
                <span style={{ fontSize: "11.2px" }}> {item.shopAddress.split(',').slice(-3).join(',').trim()}</span>
              </Typography>
            )}
          </>
        )}
      </div>
    );
  };


  return (
    <>
    <Navbar />
    <Box className="favcategories-container">
      {filteredFavourites.length === 0 ? (
        <Typography>No favorite items found.</Typography>
      ) : (
        <div className="favcategories-card-grid">
          {filteredFavourites.map(item => (
            <div key={item._id} className="favcategories-card">
              {renderFieldsHead(item)}
              <div className="favcategories-card-image-container">
                {(item.images && item.images.length > 0) || (item.photos && item.photos.length > 0) ? (
                  <Carousel
                    showThumbs={false}
                    infiniteLoop
                    autoPlay
                    stopOnHover
                    showStatus={false}
                    className="favcategories-carousel"
                  >
                    {(item.images && item.images.length > 0 ? item.images : item.photos).map((image, index) => (
                      <div key={index}>
                        <img
                          src={`${config.apiURL}/${image}`}
                          alt={item.name || `Image ${index + 1}`}
                          className="favcategories-card-image"
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <div>No images available</div>
                )}
              </div>

              <div className="favcategories-like-container">
                <FaHeart onClick={() => handleRemoveFavourite(item._id)} className="heart-icon" />
              </div>

              {renderFields(item)}
              <button
                className="view-details-button"
                onClick={() => handleViewDetails(item)}
                style={{ backgroundColor: "transparent", color: "blue" }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: snackbarType === 'success' ? '#4caf50' : '#f44336', // Green for success, red for error
            color: '#fff',
            borderRadius: '8px',
            padding: '11px',
            fontSize: '0.8rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          },
        }}
      />
    </Box>
    <Footer />
    </>
  );

};

export default FavCategories;