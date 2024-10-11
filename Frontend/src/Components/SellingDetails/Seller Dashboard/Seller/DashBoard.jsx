import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../Navbar/Navbar";
import Footer from "../../../Footer/Footer";
import CategorySidebar from "./dashsidebar";
import CategoryHouse from "../Houseseller/House";
import CategoryPgHostel from "../Pgseller/PGHostel";
import CategoryCatering from "../Cateringseller/Catering";
import CategoryCement from "../Cementseller/Cement";
import CategoryInterior from "../Interiorseller/Interior";
import CategoryPipeWires from "../PipeWireseller/Pipewires";
import CategorySand from "../Sandseller/Sand";
import CategorySteel from "../Steelseller/Steel";
import CategoryStone from "../Stoneseller/Stone";
import CategoryWood from "../Woodseller/Wood";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import config from "../../../../config";

function SellerDashboard() {
  const [tokenValid, setTokenValid] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [categoriesData, setCategoriesData] = useState({
    house: [],
    pgHostel: [],
    catering: [],
    cement: [],
    interior: [],
    pipeWires: [],
    sand: [],
    steel: [],
    stone: [],
    wood: [],
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const { category } = useParams(); 

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setTokenValid(false);
        handleError("No authentication token found. Redirecting to login...");
        return;
      }

      try {
        const response = await axios.post(
          `${config.apiURL}/api/validateToken`,
          {
            token: token,
          }
        );

        if (response.data.valid) {
          setTokenValid(true);
          fetchCategoriesData(token);
        } else {
          setTokenValid(false);
          handleError("Invalid token. Please log in again.");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          handleError("Unauthorized access. Redirecting to login...");
        } else {
          handleError(
            "An error occurred during token validation. Please try again later."
          );
        }
        setTokenValid(false);
      }
    };

    const fetchCategoriesData = async (token) => {
      try {
        const [
          house,
          pgHostel,
          catering,
          cement,
          interior,
          pipeWires,
          sand,
          steel,
          stone,
          wood,
        ] = await Promise.all([
          axios.get(`${config.apiURL}/houseRoute/GetUserHouse`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.apiURL}/pgHostelRoute/GetUserPG`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.apiURL}/cateringRoute/GetUserCatering`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.apiURL}/cementRoutes/GetUserCement`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.apiURL}/interiorRoute/GetUserInterior`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.apiURL}/pipeWiresRoute/GetUserPipeWire`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.apiURL}/sandRoute/GetUserSand`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.apiURL}/steelRoute/GetUserSteel`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.apiURL}/stoneRoute/GetUserStone`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.apiURL}/woodRoute/GetUserWood`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setCategoriesData({
          house: house.data,
          pgHostel: pgHostel.data,
          catering: catering.data,
          cement: cement.data,
          interior: interior.data,
          pipeWires: pipeWires.data,
          sand: sand.data,
          steel: steel.data,
          stone: stone.data,
          wood: wood.data,
        });

        // Set the selected category based on the URL parameter
        if (category) {
          setSelectedCategory(category);
        }
      } catch (error) {
        console.error("Error fetching categories data:", error);
        handleError("Failed to load categories. Please try again later.");
      }
    };


    checkTokenValidity();
  }, [navigate, category]);

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

  const hasData = categoriesData[selectedCategory] && categoriesData[selectedCategory].length > 0;

  if (!tokenValid) {
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
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }

  const renderCategoryProducts = () => {
    switch (selectedCategory) {
      case "house":
        return <CategoryHouse data={categoriesData.house} />;
      case "pgHostel":
        return <CategoryPgHostel data={categoriesData.pgHostel} />;
      case "catering":
        return <CategoryCatering data={categoriesData.catering} />;
      case "cement":
        return <CategoryCement data={categoriesData.cement} />;
      case "interior":
        return <CategoryInterior data={categoriesData.interior} />;
      case "pipeWires":
        return <CategoryPipeWires data={categoriesData.pipeWires} />;
      case "sand":
        return <CategorySand data={categoriesData.sand} />;
      case "steel":
        return <CategorySteel data={categoriesData.steel} />;
      case "stone":
        return <CategoryStone data={categoriesData.stone} />;
      case "wood":
        return <CategoryWood data={categoriesData.wood} />;
      default:
        return <div>Select a category to view products.</div>;
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-layout" style={{ display: 'flex' }}>
        <CategorySidebar categories={categoriesData} setSelectedCategory={setSelectedCategory} />
        <div className="category-products" style={{ marginLeft: '20px', flex: 1 }}>
          {hasData ? renderCategoryProducts() : (
            <div
              className="no-products-available"
              style={{
                height: "50vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "20px",
                marginTop: "100px",
                marginBottom: "100px",
                backgroundColor: "transparent",
              }}
            >
              <h2 style={{ fontSize: "24px", color: "#333", marginBottom: "16px" }}>
                No Products Available
              </h2>
              <a
                onClick={() => navigate("/post")}
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  borderRadius: "4px",
                  textDecoration: "none",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Post a New Product
              </a>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SellerDashboard;
