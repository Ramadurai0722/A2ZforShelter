import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
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
  const [searchLocation, setSearchLocation] = useState("");

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

  const handleMapClick = async (event) => {
    const { lat, lng } = event.latlng;
    setMarkerPosition([lat, lng]);
    setMapCenter([lat, lng]);
    setMapZoom(13);

    const fetchLocationData = async (lat, lng) => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await response.json();
        if (data && data.address) {
          const { address } = data;

          const state = states.find((s) => s.name === address.state);
          if (state) {
            setSelectedState(state.geonameId);

            const responseDistricts = await fetch(`${config.apiURL}/api/districts?stateGeonameId=${state.geonameId}`);
            const districtsData = await responseDistricts.json();
            setDistricts(districtsData || []);

            const district = districtsData.find((d) => d.name === address.district);
            if (district) {
              setSelectedDistrict(district.geonameId);


              const responseCities = await fetch(`${config.apiURL}/api/cities?districtGeonameId=${district.geonameId}`);
              const citiesData = await responseCities.json();
              setCities(citiesData || []);


              const city = citiesData.find((c) => c.name === address.city);
              if (city) {
                setSelectedCity(city.geonameId);
              } else {
                setSelectedCity("");
              }
            } else {
              setSelectedDistrict("");
              setCities([]);
              setSelectedCity("");
            }
          } else {
            setSelectedState("");
            setDistricts([]);
            setSelectedDistrict("");
            setCities([]);
            setSelectedCity("");
          }
        }
      } catch (error) {
        console.error("Failed to fetch location data:", error);
      }
    };

    fetchLocationData(lat, lng);
  };

  const handleLocationSearch = async () => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchLocation}`);
    const data = await response.json();
    if (data.length > 0) {
      const newPosition = [data[0].lat, data[0].lon];
      setMapCenter(newPosition);
      setMarkerPosition(newPosition);
      setMapZoom(13);
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <label htmlFor="state-select">State</label>
              <select
                id="state-select"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
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
            <Grid item xs={12} sm={6} md={3}>
              <label htmlFor="location-search">Search Location</label>
              <input
                id="location-search"
                type="text"
                className="search-location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleLocationSearch();
                  }
                }}
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="center" style={{ marginTop: '10px' }}>
            <Grid item xs={12} sm={8} md={6}>
              <label htmlFor="item-search">Search Item</label>
              <input
                id="item-search"
                type="text"
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </Grid>
          </Grid>
        </Paper>
      </div>

      <Box className="map-container" style={{ marginTop: '35px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: "500px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapView center={mapCenter} zoom={mapZoom} onMapClick={handleMapClick} />
              <Marker position={markerPosition} icon={customMarkerIcon}>
                <Popup>A custom marker!</Popup>
              </Marker>
            </MapContainer>
          </Grid>
          <Grid item xs={12} md={6}>
            <AdsCarousel />
          </Grid>
        </Grid>
      </Box>



    </React.Fragment>
  );
}

export default HeroSection;
