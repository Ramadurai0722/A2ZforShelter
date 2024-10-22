import React, { useState, useEffect } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom"; 
import config from "../../config";
import Snackbar from '@mui/material/Snackbar'; 
import MuiAlert from '@mui/material/Alert'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem("authToken");
      const storedExpiryTime = localStorage.getItem("expiryTime");
      const now = new Date().getTime();

      if (token && storedExpiryTime) {
        if (now > storedExpiryTime) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          localStorage.removeItem("expiryTime");
          setIsLoggedIn(false);
          console.log("Token has expired.");
        } else {
          setIsLoggedIn(true);
          fetchUserProfile(token);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    checkTokenValidity();
  }, []);


  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(`${config.apiURL}/api/getprofile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfileImage(`${config.apiURL}/${data.profileImage}`);
      } else {
        console.error("Failed to fetch profile", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? "" : dropdown);
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handlePostPropertiesClick = () => {
    if (isLoggedIn) {
      navigate("/post"); 
    } else {
      setSnackbarMessage("Please log in to access this feature."); 
      setSnackbarOpen(true); 
      setTimeout(() => {
        navigate("/login"); 
      }, 1200);
    }
  };

  const handlePricetabelClick = () => {
    if (isLoggedIn) {
      navigate("/pricetable"); 
    } else {
      setSnackbarMessage("Please log in to access this feature."); 
      setSnackbarOpen(true); 
      setTimeout(() => {
        navigate("/login"); 
      }, 1200);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); 
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiryTime");
    setIsLoggedIn(false);
    setShowProfileDropdown(false);
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img
            src="/media/companylogo12.png"
            alt="Logo"
          />
        </a>
      </div>


      {/* Toggle menu */}
      <button className="navbar-toggle" onClick={toggleMenu}>
        {isOpen ? "✖" : "☰"}
      </button>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        {/* Home Loans */}
        {/* <div
          className={`navbar-dropdown ${activeDropdown === "land" ? "active" : ""}`}
          onMouseEnter={() => handleMouseEnter("land")}
          onMouseLeave={() => setActiveDropdown("")}
        >
          <span className="home-loan-text" onClick={() => toggleDropdown("land")}>
            Home Loans
            <span className={`dropdown-arrow ${activeDropdown === "land" ? "rotate" : ""}`}>▼</span>
          </span>
          {activeDropdown === "land" && (
            <div className="dropdown-menu land-menu">
              <div className="link-row" style={{ display: "flex", padding: "10px", marginTop: "10px" }}>
                <a href="/agentsList" className="navbar-link">Agents</a>
                <a href="/Loanall" className="navbar-link">Loan</a>
                <a href="/sbihomeloan" className="navbar-link">Loan Calculator</a>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1, padding: "4px", fontSize: "12px" }}>
                  <h4>Monthly EMI Calculator</h4>
                  <a href="/sbiemi">Sbi EMI Calculator</a><br />
                  <a href="/hdfcemi">Hdfc EMI Calculator</a><br />
                  <a href="/kotakemi">Kotak EMI Calculator</a><br />
                  <a href="/l&temi">L&T EMI Calculator</a><br />
                  <a href="/axisemi">Axis EMI Calculator</a><br />
                  <a href="/bajajemi">Bajaj EMI Calculator</a>
                </div>
              </div>
            </div>
          )}
        </div> */}

        {/* Interiors */}
        <div
          className={`navbar-dropdown ${activeDropdown === "interiors" ? "active" : ""}`}
          onMouseEnter={() => handleMouseEnter("interiors")}
          onMouseLeave={() => setActiveDropdown("")}
        >
          <span onClick={() => toggleDropdown("interiors")}>
            Interiors
            <span className={`dropdown-arrow ${activeDropdown === "interiors" ? "rotate" : ""}`}>▼</span>
          </span>
          {activeDropdown === "interiors" && (
            <div className="dropdown-menu interiors-menu">
              <div className="column">
                <a href="/interior/Wall & Table Decor">Wall & Table Decor</a>
                <a href="/interior/Soft Furnishings">Soft Furnishings</a>
                <a href="/interior/Furniture">Furniture</a>
                <a href="/interior/Storage & Organization">Storage & Organization</a>
                <a href="/interior/Lighting">Lighting</a>
              </div>
              <div className="column">
                <a href="/interior/Plants & Natural Elements">Plants & Natural Elements</a>
                <a href="/interior/Textiles & Accessories">Textiles & Accessories</a>
                <a href="/interior/Tiles">Tiles</a>
                <a href="/interior/Paints">Paints</a>
                <a href="/interior/False Ceiling (Parceiling) Products">False Ceiling (Parceiling) Products</a>
                <a href="/interior/Bathroom Products">Bathroom Products</a>
                <a href="/interior/Kitchen Products">Kitchen Products</a>
              </div>
            </div>
          )}
        </div>

        {/* Buy */}
        <div
          className={`navbar-dropdown ${activeDropdown === "buy" ? "active" : ""}`}
          onMouseEnter={() => handleMouseEnter("buy")}
          onMouseLeave={() => setActiveDropdown("")}
        >
          <span className="span" onClick={() => toggleDropdown("buy")}>
            Buy
            <span className={`dropdown-arrow ${activeDropdown === "buy" ? "rotate" : ""}`}>▼</span>
          </span>
          {activeDropdown === "buy" && (
            <div className="dropdown-menu buy-menu">
              <a href="/cementall">Cement</a>
              <a href="/houseall">House</a>
              <a href="/interiorall">Interiors</a>
              <a href="/pgall">PG Hostel</a>
              <a href="/pipewireall">Pipes & Wires</a>
              <a href="/sandall">Sand</a>
              <a href="/steelall">Steel</a>
              <a href="/stoneall">Stone</a>
              <a href="/woodall">Wood</a>
            </div>
          )}
        </div>

        {/* Services */}
        <div
          className={`navbar-dropdown ${activeDropdown === "service" ? "active" : ""}`}
          onMouseEnter={() => handleMouseEnter("service")}
          onMouseLeave={() => setActiveDropdown("")}
        >
          <span className="span" onClick={() => toggleDropdown("service")}>
            Services
            <span className={`dropdown-arrow ${activeDropdown === "service" ? "rotate" : ""}`}>▼</span>
          </span>
          {activeDropdown === "service" && (
            <div className="dropdown-menu service-menu">
            <a href="/cateringall">Catering Service</a>
              <a href="/borewellall">BoreWell</a>
              <a href="/civilall">Civil Engineers</a>
            </div>
          )}
        </div>

        {/* Design */}
        <div
          className={`navbar-dropdown ${activeDropdown === "design" ? "active" : ""}`}
          onMouseEnter={() => handleMouseEnter("design")}
          onMouseLeave={() => setActiveDropdown("")}
        >
          <span className="span" onClick={() => toggleDropdown("design")}>
            Design
            <span className={`dropdown-arrow ${activeDropdown === "design" ? "rotate" : ""}`}>▼</span>
          </span>
          {activeDropdown === "design" && (
            <div className="dropdown-menu design-menu">
              <a href="/floorplan">2D-Design</a>
              <a href="https://a2z-home-planner-design.netlify.app/" target="_self" rel="noopener noreferrer">3D-Planner</a>
            </div>
          )}
        </div>

        {/* Final Links */}
        <a href="#" className="navbar-link" onClick={handlePostPropertiesClick}>
          Post Properties
        </a>
        <a href="#" className="navbar-link" onClick={handlePricetabelClick}>
          Premium
        </a>
        <a href="#footer" className="navbar-link">Contact Us</a>
      </div>

      {/* Profile Section */}
      <div className="navbar-auth">
        {isLoggedIn ? (
          <div className="navbar-profileimage" onClick={handleProfileClick}>
            <img
              src={profileImage || "/media/profile.webp"}
              alt="Profile"
              className="navbar-profile-image"
            />
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <a href="/profile" className="profile-link">View Profile</a>
                <a href="/login" className="profile-link" onClick={handleLogout}>Logout</a>
              </div>
            )}
          </div>
        ) : (
          <a href="/login" className="navbar-button">Access Portal</a>
        )}
      </div>
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={2000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
      >
        <MuiAlert onClose={handleSnackbarClose} severity="error" elevation={6} variant="filled">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </nav>
  );
};

export default Navbar;
