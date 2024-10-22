import React from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
} from "@mui/material";

const AboutUs = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: "80px", marginBottom: "80px" }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
        A2Z for Shelter
      </Typography>
      <Paper elevation={3} sx={{ padding: "20px", backgroundColor: "#ecf0f1" }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#34495e' }}>
          About Us
        </Typography>
        <Typography paragraph sx={{ color: '#555' }}>
          A2Z for Shelter is your go-to platform for buying and selling all products related to house building. Whether you're looking to sell houses, land, or apartments, our application is designed to connect buyers and sellers seamlessly. 
          Our primary goal is to provide a user-friendly experience that enables easy access to information and reliable services. 
          Buyers and sellers can promote their products and stores to a broader audience effortlessly.
        </Typography>
        <Typography paragraph sx={{ color: '#555' }}>
          We offer a wide range of product categories, including:
        </Typography>
        <Box sx={{ marginLeft: "20px", color: '#555' }}>
          <Typography>• Cement</Typography>
          <Typography>• Stone</Typography>
          <Typography>• Sand</Typography>
          <Typography>• Steel</Typography>
          <Typography>• Bricks</Typography>
          <Typography>• Interiors</Typography>
        </Box>
        <Typography paragraph sx={{ color: '#555' }}>
          Our services include catering services, borewell drilling, and civil engineering solutions. 
          Additionally, we provide property listings for houses, PG hostels, land, and more.
        </Typography>
        <Typography paragraph sx={{ color: '#555' }}>
          A unique feature of our platform is the 2D and 3D design generator and designing tools that allow users to visualize their dream homes based on personal preferences.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#34495e', marginTop: '30px' }}>
          Our Mission
        </Typography>
        <Typography paragraph sx={{ color: '#555' }}>
          To create a seamless and efficient platform that connects buyers and sellers in the housing market, providing the tools and resources necessary for successful transactions.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#34495e', marginTop: '30px' }}>
          Our Vision
        </Typography>
        <Typography paragraph sx={{ color: '#555' }}>
          To be the leading online marketplace for real estate and building materials, revolutionizing how people buy and sell properties and services.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutUs;
