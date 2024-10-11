import React from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  { name: "Insurance & Agency", subcategories: ["Agents"] },
  { name: "Loan Availables", subcategories: ["Loan Dialer"] },
];

const SaleHouse = () => {
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = React.useState(null);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
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
      "BoreWell Details":"/borewellpost",
      "Civil Engineering Details":"/civilpost",
    
    };

    if (routes[subcategory]) {
      navigate(routes[subcategory]);
    } else {
      setSelectedSubcategory(subcategory);
    }
  };

  return (
    <Container>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#333", paddingBottom: "20px" }}
      >
        CHOOSE A CATEGORY
      </Typography>
      <Grid container>
        <Grid item xs={4}>
          <List
            sx={{ backgroundColor: "#f5f5f5", padding: 0, borderRadius: "8px" }}
          >
            {categories.map((category, index) => (
              <React.Fragment key={index}>
                <ListItem
                  button
                  onClick={() => handleCategoryClick(category.name)}
                  sx={{
                    backgroundColor:
                      selectedCategory === category.name
                        ? "#e0e0e0"
                        : "transparent",
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                    padding: "10px 20px",
                    borderRadius: "8px",
                  }}
                >
                  <ListItemText
                    primary={category.name}
                    primaryTypographyProps={{
                      fontWeight:
                        selectedCategory === category.name ? "bold" : "normal",
                    }}
                  />
                </ListItem>
                {category.subcategories.length > 0 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Grid>
        <Grid item xs={8} sx={{ paddingLeft: "20px" }}>
          {selectedCategory && (
            <>
              <List>
                {categories
                  .find((category) => category.name === selectedCategory)
                  .subcategories.map((subcategory, subIndex) => (
                    <ListItem
                      button
                      key={subIndex}
                      onClick={() => handleSubcategoryClick(subcategory)}
                      sx={{
                        padding: "10px 20px",
                        "&:hover": {
                          backgroundColor: "#e0e0e0",
                        },
                      }}
                    >
                      <ListItemText primary={subcategory} />
                    </ListItem>
                  ))}
              </List>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SaleHouse;
