import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import config from "../../config"; 

function PropertyGrid() {
  const [properties, setProperties] = useState([]);
  const [interiors, setInteriors] = useState([]); 
  const [pgHostels, setPgHostels] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/houseRoute/houses`);
        setProperties(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchInteriors = async () => { 
      try {
        const response = await axios.get(`${config.apiURL}/interiorRoute/interior`);
        setInteriors(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchPgHostels = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/pgHostelRoute/pgHostel`);
        setPgHostels(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchProperties(), fetchInteriors(), fetchPgHostels()]); 
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container maxWidth="lg" style={{ marginTop: '40px',marginBottom:"30px"}}>
      <Grid container spacing={4} style={{ justifyContent: "center" }}>
        
        <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card 
            style={{ 
              height: '300px', 
              width: '100%', 
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)', 
              borderRadius: '10px', 
              transition: 'transform 0.3s', 
              '&:hover': { transform: 'scale(1.05)' } 
            }} 
            onClick={() => navigate('/houseall')} 
          >
            <Carousel 
              showThumbs={false} 
              showIndicators={false} 
              infiniteLoop 
              autoPlay 
              stopOnHover 
              dynamicHeight 
              className="carousel"
            >
              {properties.map((property) => 
                property.photos.map((photo, index) => (
                  <div key={index} style={{ height: '230px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img 
                      src={`${config.apiURL}/${photo}`}
                      alt={`Photo of ${property.title}`} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        borderRadius: '10px 10px 0 0' 
                      }}
                    />
                  </div>
                ))
              )}
            </Carousel>
            <CardContent>
              <Typography variant="h5" component="h2" align="center" style={{ cursor: 'pointer', color: '#1976d2' }}>
                Houses & Apartments
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Second Card: Interior Products */}
        <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card 
            style={{ 
              height: '300px', 
              width: '100%', 
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)', 
              borderRadius: '10px', 
              transition: 'transform 0.3s', 
              '&:hover': { transform: 'scale(1.05)' } 
            }} 
            onClick={() => navigate('/interiorall')} 
          >
            <Carousel 
              showThumbs={false} 
              showIndicators={false} 
              infiniteLoop 
              autoPlay 
              stopOnHover 
              dynamicHeight 
              className="carousel"
            >
              {interiors.map((interior) => 
                interior.images.map((photo, index) => (
                  <div key={index} style={{ height: '230px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img 
                      src={`${config.apiURL}/${photo}`}
                      alt={`Interior of ${interior.products}`} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        borderRadius: '10px 10px 0 0' 
                      }}
                    />
                  </div>
                ))
              )}
            </Carousel>
            <CardContent>
              <Typography variant="h5" component="h2" align="center" style={{ cursor: 'pointer', color: '#1976d2' }}>
                Interior Products
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Third Card: PG Hostels */}
        <Grid item xs={12} sm={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card 
            style={{ 
              height: '300px', 
              width: '100%', 
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)', 
              borderRadius: '10px', 
              transition: 'transform 0.3s', 
              '&:hover': { transform: 'scale(1.05)' } 
            }} 
            onClick={() => navigate('/pgall')} 
          >
            <Carousel 
              showThumbs={false} 
              showIndicators={false} 
              infiniteLoop 
              autoPlay 
              stopOnHover 
              dynamicHeight 
              className="carousel"
            >
              {pgHostels.map((pgHostel) => 
                pgHostel.photos.map((photo, index) => (
                  <div key={index} style={{ height: '230px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img 
                      src={`${config.apiURL}/${photo}`}
                      alt={`PG Hostel ${pgHostel.pgHostelName}`} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        borderRadius: '10px 10px 0 0' 
                      }}
                    />
                  </div>
                ))
              )}
            </Carousel>
            <CardContent>
              <Typography variant="h5" component="h2" align="center" style={{ cursor: 'pointer', color: '#1976d2' }}>
                PG Hostels
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PropertyGrid;
