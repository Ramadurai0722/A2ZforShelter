import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../House/PostHouse.css";
import config from "../../../config";
import { TextField, MenuItem, Grid, Snackbar, Alert } from "@mui/material";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

function PGHostel() {
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    userId,
    purpose: "",
    type: "",
    furnishing: "",
    food: "",
    aCRoom: "AC ROOM",
    maintenance: "",
    totalFloors: "",
    carParking: "0",
    pgHostelName: "",
    description: "",
    price: "",
    location: "",
    name: "Harish",
    phoneNumber: "+916382318872",
  });

  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Handle closing Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Fetch states
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(`${config.apiURL}/api/states`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setStates(
            data.map((state) => ({
              id: state.geonameId,
              name: state.name,
              lat: state.lat,
              lon: state.lng,
            }))
          );
        } else {
          console.error("Expected an array but got:", data);
          setStates([]);
        }
      } catch (error) {
        console.error("Failed to fetch states:", error);
        setStates([]);
      }
    };
    fetchStates();
  }, []);

  // Fetch districts when state changes
  useEffect(() => {
    if (selectedState) {
      const fetchDistricts = async () => {
        try {
          const response = await fetch(
            `${config.apiURL}/api/districts?stateGeonameId=${selectedState}`
          );
          const data = await response.json();
          if (Array.isArray(data)) {
            setDistricts(
              data.map((district) => ({
                id: district.geonameId,
                name: district.name,
                lat: district.lat,
                lon: district.lng,
              }))
            );
          } else {
            console.error("Expected an array but got:", data);
            setDistricts([]);
          }
          setCities([]);
          setSelectedDistrict("");
          setSelectedCity("");
          setFormData({
            ...formData,
          });
        } catch (error) {
          console.error("Failed to fetch districts:", error);
          setDistricts([]);
        }
      };
      fetchDistricts();
    }
  }, [selectedState]);

  // Fetch cities when district changes
  useEffect(() => {
    if (selectedDistrict) {
      const fetchCities = async () => {
        try {
          const response = await fetch(
            `${config.apiURL}/api/cities?districtGeonameId=${selectedDistrict}`
          );
          const data = await response.json();
          if (Array.isArray(data)) {
            setCities(
              data.map((city) => ({
                id: city.geonameId,
                name: city.name,
                lat: city.lat,
                lon: city.lng,
              }))
            );
          } else {
            console.error("Expected an array but got:", data);
            setCities([]);
          }
          setSelectedCity("");
          setFormData({ ...formData });
        } catch (error) {
          console.error("Failed to fetch cities:", error);
          setCities([]);
        }
      };
      fetchCities();
    }
  }, [selectedDistrict]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle option change
  const handleOptionChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + photos.length > 20) {
      // Set snackbar message for max photo limit
      setSnackbarMessage("You can only upload up to 20 photos.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    setPhotos([...photos, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPhotoPreviews([...photoPreviews, ...previews]);
  };

  // Handle remove image
  const handleRemoveImage = (index) => {
    const newPhotos = [...photos];
    const newPreviews = [...photoPreviews];
    newPhotos.splice(index, 1);
    newPreviews.splice(index, 1);
    setPhotos(newPhotos);
    setPhotoPreviews(newPreviews);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedStateName = states.find(
      (state) => state.id === selectedState
    )?.name;
    const selectedDistrictName = districts.find(
      (district) => district.id === selectedDistrict
    )?.name;
    const selectedCityName = cities.find((city) => city.id === selectedCity)
      ?.name;

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append("stateName", selectedStateName || "");
    data.append("districtName", selectedDistrictName || "");
    data.append("cityName", selectedCityName || "");

    photos.forEach((photo) => {
      data.append("photos", photo);
    });

    try {
      const response = await axios.post(
        `${config.apiURL}/pgHostelRoute/pgHostel`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSnackbarMessage("House Ad posted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setFormData({
        purpose: "",
        type: "",
        furnishing: "",
        food: "",
        aCRoom: "",
        maintenance: "",
        totalFloors: "",
        carParking: "0",
        pgHostelName: "",
        description: "",
        price: "",
        location: "",
        name: "Harish",
        phoneNumber: "+916382318872",
      });
      setPhotos([]);
      setPhotoPreviews([]);
    } catch (error) {
      console.error("Error posting ad:", error);
      setSnackbarMessage("Failed to post the ad. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
    <Navbar />
    <div className="ad-form-container">
      <form className="ad-form" onSubmit={handleSubmit}>
        <h3>Include some details</h3>

        {/* Purpose */}
        <div className="form-group">
          <label>You are here to *</label>
          <div className="options">
            {["Sell", "Rent/Lease"].map((option) => (
              <div
                key={option}
                className={`option ${
                  formData.purpose === option ? "selected" : ""
                }`}
                onClick={() => handleOptionChange("purpose", option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {/* Type */}
        <div className="form-group">
          <label>Type *</label>
          <div className="options">
            {["Gents Hostel", "Ladies Hostel"].map((option) => (
              <div
                key={option}
                className={`option ${
                  formData.type === option ? "selected" : ""
                }`}
                onClick={() => handleOptionChange("type", option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {/* Furnishing */}
        <div className="form-group">
          <label>Furnishing *</label>
          <div className="options">
            {["Furnished", "Semi-Furnished", "Unfurnished"].map((option) => (
              <div
                key={option}
                className={`option ${
                  formData.furnishing === option ? "selected" : ""
                }`}
                onClick={() => handleOptionChange("furnishing", option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {/* Construction Status */}
        <div className="form-group">
          <label>Food *</label>
          <div className="options">
            {["With Food", "Without Food"].map((option) => (
              <div
                key={option}
                className={`option ${
                  formData.food === option ? "selected" : ""
                }`}
                onClick={() => handleOptionChange("food", option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {/* Listed by */}
        <div className="form-group">
          <label>AC ROOM*</label>
          <div className="options">
            {["AC ROOM", "Non AC Room"].map((option) => (
              <div
                key={option}
                className={`option ${
                  formData.aCRoom === option ? "selected" : ""
                }`}
                onClick={() => handleOptionChange("acRoom", option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance */}
        <div className="form-group">
          <label htmlFor="maintenance">Maintenance (Monthly)</label>
          <input
            type="number"
            id="maintenance"
            name="maintenance"
            value={formData.maintenance}
            onChange={handleInputChange}
            min="0"
          />
        </div>

        {/* Total Floors */}
        <div className="form-group">
          <label htmlFor="totalFloors">Total Floors *</label>
          <input
            type="number"
            id="totalFloors"
            name="totalFloors"
            value={formData.totalFloors}
            onChange={handleInputChange}
            required
            min="1"
          />
        </div>

        {/* Car Parking */}
        <div className="form-group">
          <label>Car Parking *</label>
          <div className="options">
            {["0", "1", "2", "3", "3+"].map((option) => (
              <div
                key={option}
                className={`option ${
                  formData.carParking === option ? "selected" : ""
                }`}
                onClick={() => handleOptionChange("carParking", option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {/* Project Name */}
        <div className="form-group">
          <label htmlFor="pgHostelName">PGHostel Name *</label>
          <input
            type="text"
            id="pgHostelName"
            name="pgHostelName"
            value={formData.pgHostelName}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        {/* Price */}
        <div className="form-group">
          <label htmlFor="price">Rent Price (₹) *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            min="0"
          />
        </div>

        {/* State, District, City */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4}>
            <TextField
              fullWidth
              select
              label="State"
              variant="outlined"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict(""); // Reset district when state changes
                setSelectedCity(""); // Reset city when state changes
              }}
            >
              {states.map((state) => (
                <MenuItem key={state.id} value={state.id}>
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextField
              fullWidth
              select
              label="District"
              variant="outlined"
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedCity(""); // Reset city when district changes
              }}
              disabled={!selectedState}
            >
              {districts.map((district) => (
                <MenuItem key={district.id} value={district.id}>
                  {district.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextField
              fullWidth
              select
              label="City"
              variant="outlined"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedDistrict}
            >
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Location */}
        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number *</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Photos */}
        <div className="form-group">
          <label>Photos</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*"
          />
          <div className="photo-previews">
            {photoPreviews.map((preview, index) => (
              <div key={index} className="photo-preview">
                <img src={preview} alt={`Preview ${index}`} />
                <button type="button" onClick={() => handleRemoveImage(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>


         {/* Snackbar for status messages */}
         <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </form>
    </div>
    <Footer />
    </>
  );
}

export default PGHostel;
