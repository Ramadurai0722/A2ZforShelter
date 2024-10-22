import React from "react";
import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Collapse,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// Define categories for listing
const categories = [
  {
    name: "House",
    subcategories: [
      "For Sale: Houses & Apartments",
      "For Rent: Houses & Apartments",
      "PG & Guest Houses",
    ],
  },
  { name: "Land", subcategories: ["Lands & Plots"] },
  {
    name: "Constructions",
    subcategories: ["BoreWell Details", "Civil Engineering Details"],
  },
  {
    name: "Sale Construction Property",
    subcategories: [
      "Sale: Cement",
      "Sale: Sand",
      "Sale: Steel",
      "Sale: Stone",
      "Sale: Wood",
      "Sale: Pipes and Wires",
      "Sale: Interior Items",
      "Sale: Caterings",
    ],
  },
  // Uncomment if needed
  // { name: "Insurance & Agency", subcategories: ["Agents"] },
  // { name: "Loan Availables", subcategories: ["Loan Dialer"] },
];

const SaleHouse = () => {
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [openCategories, setOpenCategories] = React.useState({});
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSubcategoryClick = (subcategory) => {
    const routes = {
      "For Sale: Houses & Apartments": "/posthouse",
      "For Rent: Houses & Apartments": "/posthouse",
      "PG & Guest Houses": "/pgHostel",
      "Sale: Cement": "/cementpost",
      "Sale: Sand": "/sandpost",
      "Sale: Steel": "/steelpost",
      "Sale: Stone": "/stonepost",
      "Sale: Wood": "/woodpost",
      "Sale: Caterings": "/cateringpost",
      "Sale: Interior Items": "/interiorpost",
      "Sale: Pipes and Wires": "/Pipe&wires",
      Agents: "/agents",
      "Loan Dialer": "/Loanpost",
      "Lands & Plots": "/Landpost",
      "BoreWell Details": "/borewellpost",
      "Civil Engineering Details": "/civilpost",
    };

    if (routes[subcategory]) {
      navigate(routes[subcategory]);
    }
  };

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "120px", marginBottom: "150px" }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#2c3e50", paddingBottom: "20px", textAlign: 'center' }}
        >
          CHOOSE A CATEGORY
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <List
              sx={{
                backgroundColor: "#ecf0f1",
                padding: 0,
                borderRadius: "8px",
                boxShadow: 3,
              }}
            >
              {categories.map((category, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    button
                    onClick={() => handleCategoryClick(category.name)}
                    sx={{
                      backgroundColor:
                        selectedCategory === category.name
                          ? "#bdc3c7"
                          : "transparent",
                      "&:hover": {
                        backgroundColor: "#bdc3c7",
                      },
                      padding: "15px",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <ListItemText
                      primary={category.name}
                      primaryTypographyProps={{
                        fontWeight:
                          selectedCategory === category.name
                            ? "bold"
                            : "normal",
                        textAlign: 'center',
                        color: selectedCategory === category.name ? "#fff" : "#34495e",
                      }}
                    />
                    {openCategories[category.name] ? (
                      <ExpandLessIcon sx={{ color: "#34495e" }} />
                    ) : (
                      <ExpandMoreIcon sx={{ color: "#34495e" }} />
                    )}
                  </ListItem>
                  <Collapse in={openCategories[category.name]} timeout="auto">
                    <List component="div" disablePadding>
                      {category.subcategories.map((subcategory, subIndex) => (
                        <ListItem
                          button
                          key={subIndex}
                          onClick={() => handleSubcategoryClick(subcategory)}
                          sx={{
                            padding: "10px 20px",
                            "&:hover": {
                              backgroundColor: "#d5dbdb",
                            },
                            justifyContent: "center",
                          }}
                        >
                          <ListItemText primary={subcategory} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                  {index < categories.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default SaleHouse;
