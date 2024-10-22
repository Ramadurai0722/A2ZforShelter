import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Paper,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import customIcon from "../images/location.png";
import config from "../../../config";
import bannerImage from '../../../assets/house banner1.jpg';
import "./HeroSection.css";
import AdsCarousel from "./Adds";
import { SearchContext } from './context/searchcontext';
import { useNavigate } from "react-router-dom";
import Searchresult from "./Searchresult/searchresult";

const customMarkerIcon = new L.Icon({
  iconUrl: customIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});


function MapView({ center, zoom, onMapClick }) {
  const map = useMap();

  useEffect(() => {
    if (center && zoom) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  useEffect(() => {
    map.on("click", onMapClick);

    return () => {
      map.off("click", onMapClick);
    };
  }, [map, onMapClick]);

  return null;
}

function HeroSection() {
  const [mapCenter, setMapCenter] = useState([11.0168, 76.9558]);
  const [markerPosition, setMarkerPosition] = useState([11.0168, 76.9558]);
  const [mapZoom, setMapZoom] = useState(13);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [locationFetch, setLocationFetch] = useState(true)
  const [searchLocation, setSearchLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]); 
  const [searchProduct, setSearchProduct] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);
  const { updateSearchValues } = useContext(SearchContext);
  const searchResultRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    customPaging: (i) => <div className="slick-dot" />,
  };
  const handleSearch = () => {
    const trimmedSearchProduct = searchProduct.trim();
    if (
        searchLocation.trim() || 
        selectedState || 
        selectedDistrict || 
        selectedCity || 
        trimmedSearchProduct 
    ) {
        const results = {
            state: states.find(state => state.geonameId === selectedState)?.name || "",
            district: districts.find(district => district.geonameId === selectedDistrict)?.name || "",
            city: cities.find(city => city.geonameId === selectedCity)?.name || "",
            searchLocation: searchLocation,
            searchProduct: trimmedSearchProduct,
        };
        
        setSearchResults(results);
        setShowSearchResult(true);
        
        updateSearchValues(results);
        
        if (searchResultRef.current) {
            searchResultRef.current.scrollIntoView({ behavior: "smooth" });
        }
    } else {
        console.log('Please enter at least one search criteria');
    }
};


  if (locationFetch == true) {

    useEffect(() => {
      const fetchStates = async () => {
        try {
          const response = await fetch(`${config.apiURL}/api/states`);
          const statesData = await response.json();
          setStates(statesData || []);
        } catch (error) {
          console.error("Failed to fetch states:", error);
        }
      };

      fetchStates();
    }, []);

    useEffect(() => {
      if (selectedState) {
        const fetchDistricts = async () => {
          try {
            const response = await fetch(`${config.apiURL}/api/districts?stateGeonameId=${selectedState}`);
            const data = await response.json();
            setDistricts(data || []);
            setSelectedDistrict("");
            setSelectedCity("");
          } catch (error) {
            console.error("Failed to fetch districts:", error);
          }
        };
        fetchDistricts();
      } else {
        setDistricts([]);
        setSelectedDistrict("");
        setSelectedCity("");
      }
    }, [selectedState]);

    useEffect(() => {
      if (selectedDistrict) {
        const fetchCities = async () => {
          try {
            const response = await fetch(`${config.apiURL}/api/cities?districtGeonameId=${selectedDistrict}`);
            const data = await response.json();
            setCities(data || []);
            setSelectedCity("");
          } catch (error) {
            console.error("Failed to fetch cities:", error);
          }
        };
        fetchCities();
      } else {
        setCities([]);
        setSelectedCity("");
      }
    }, [selectedDistrict]);

  } else {
    useEffect(() => {
      const fetchStates = async () => {
        try {
          const response = await fetch(`${config.apiURL}/api/states`);
          const statesData = await response.json();
          setStates(statesData || []);
        } catch (error) {
          console.error("Failed to fetch states:", error);
        }
      };

      fetchStates();
    }, []);

    useEffect(() => {
      if (selectedState) {
        const fetchDistricts = async () => {
          try {
            const response = await fetch(`${config.apiURL}/api/districts?stateGeonameId=${selectedState}`);
            const data = await response.json();
            setDistricts(data || []);
            setSelectedDistrict("");
            setSelectedCity("");
          } catch (error) {
            console.error("Failed to fetch districts:", error);
          }
        };
        fetchDistricts();
      } else {
        setDistricts([]);
        setSelectedDistrict("");
        setSelectedCity("");
      }
    }, []);

    useEffect(() => {
      if (selectedDistrict) {
        const fetchCities = async () => {
          try {
            const response = await fetch(`${config.apiURL}/api/cities?districtGeonameId=${selectedDistrict}`);
            const data = await response.json();
            setCities(data || []);
            setSelectedCity("");
          } catch (error) {
            console.error("Failed to fetch cities:", error);
          }
        };
        fetchCities();
      } else {
        setCities([]);
        setSelectedCity("");
      }
    }, []);
  }
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setLocationFetch(true); 

    setSelectedDistrict("");
    setSelectedCity("");
  };

  const handleLocationSearch = async () => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchLocation}`);
    const data = await response.json();

    if (data.length > 0) {
      const newPosition = [data[0].lat, data[0].lon];
      setMapCenter(newPosition);
      setMarkerPosition(newPosition);
      setMapZoom(13);

      await fetchLocationData(data[0].lat, data[0].lon);
    } else {
      console.log('Location not found');
    }
  };
  const fetchLocationData = async (lat, lng) => {
    setLocationFetch(false);
    try {
      const response = await fetch(`${config.apiURL}/api/getLocationByLatLng?lat=${lat}&lng=${lng}`);
      const data = await response.json();

      const { state, district, city } = data;

      if (state) {
        setSelectedState(state.geonameId);
        setStates((prevStates) => {
          const exists = prevStates.some(s => s.geonameId === state.geonameId);
          return exists ? prevStates : [...prevStates, state];
        });
      }

      if (district) {
        setSelectedDistrict(district.geonameId);
        setDistricts((prevDistricts) => {
          const exists = prevDistricts.some(d => d.geonameId === district.geonameId);
          return exists ? prevDistricts : [...prevDistricts, district];
        });
      }

      if (city) {
        setSelectedCity(city.geonameId);
        setCities((prevCities) => {
          const exists = prevCities.some(c => c.geonameId === city.geonameId);
          return exists ? prevCities : [...prevCities, city];
        });
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };


  const handleMapClick = async (event) => {
    const { lat, lng } = event.latlng;

    setMarkerPosition([lat, lng]);
    setMapCenter([lat, lng]);
    setMapZoom(13);

    await fetchLocationData(lat, lng);
  };

  const handleLocationSearch1 = () => {
    if (searchLocation.trim()) {
      console.log('Searching for:', searchLocation);
    } else {
      console.log('Please enter a location to search');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLocationSearch1();
    }
  };

  return (
    <React.Fragment>
      <Box className="hero-container">
        <Box
          style={{
            position: "relative",
            height: "85vh",
            overflow: "hidden",
          }}
        >
          <img
            src={bannerImage}
            alt="Banner"
            style={{
              width: '100%',
              height: '90%',
              top: 0,
              left: 0,
            }}
          />
        </Box>
      </Box>

      <div className="search-container">
        <Paper elevation={3} className="search-box">
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "red" }}>
              --------------------------Select place ----------------------
            </p>
          </div>
          <br />
          <Grid container spacing={2} style={{ display: "flex", justifyContent: "center" }}>
            <Grid item xs={12} sm={6} md={3}>
              <label htmlFor="state-select">State</label>
              <select
                id="state-select"
                value={selectedState}
                onChange={handleStateChange}
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
              >
                <option value="" disabled>Select State</option>
                {states.map((state) => (
                  <option key={state.geonameId} value={state.geonameId}>
                    {state.name}
                  </option>
                ))}
              </select>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <label htmlFor="district-select">District</label>
              <select
                id="district-select"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedState}
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
              >
                <option value="" disabled>Select District</option>
                {districts.map((district) => (
                  <option key={district.geonameId} value={district.geonameId}>
                    {district.name}
                  </option>
                ))}
              </select>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <label htmlFor="city-select">City</label>
              <select
                id="city-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedDistrict}
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
              >
                <option value="" disabled>Select City</option>
                {cities.map((city) => (
                  <option key={city.geonameId} value={city.geonameId}>
                    {city.name}
                  </option>
                ))}
              </select>
            </Grid>

          </Grid>
          <br />
          <div style={{ textAlign: "center" }}>
            <p>OR</p><br />
            <p style={{ color: "red" }}>
              --------- Search Location With Products/ Properties ---------
            </p>
          </div>

          <Grid container spacing={2} style={{ marginTop: '10px' }}>
            <Grid item xs={12} sm={6}>
              <label htmlFor="location-search">Search Location</label>
              <input
                id="location-search"
                type="text"
                className="search-location"
                placeholder="Search For State,District,City"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleLocationSearch();
                  }
                }}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <label htmlFor="item-search">Search Products/Properties</label>
              <input
                id="item-search"
                type="text"
                placeholder="Search Products or Properties"
                value={searchProduct} 
                onChange={(e) => setSearchProduct(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </Grid>


            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                style={{ padding: '10px 20px' }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>


      <Box className="map-container" style={{ marginTop: '35px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: "500px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapView center={mapCenter} zoom={mapZoom} onMapClick={handleMapClick} />
              <Marker position={markerPosition} icon={customMarkerIcon}>
                <Popup>A custom marker!</Popup>
              </Marker>
            </MapContainer>
          </Grid>
          <Grid item xs={12} md={3}>
            <AdsCarousel />
          </Grid>
        </Grid>
      </Box>

      <div ref={searchResultRef} style={{ display: showSearchResult ? 'block' : 'none', marginTop: '3px' }}>
        <div className="search-results-box" style={{backgroundColor:"transparent"}}>
          <Typography variant="h5" style={{ textAlign: "center", padding: "20px", fontSize:"40px",fontWeight:"bold" }}>
            Search Results
          </Typography>
          <Searchresult />
        </div>
      </div>
    </React.Fragment>

  );
}

export default HeroSection;
