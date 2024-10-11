import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PostHouse.css";
import config from "../../../config";
import { TextField, MenuItem, Grid, Snackbar, Alert,Button } from "@mui/material";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

function PostHouse() {
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    userId,
    type: "",
    bedrooms: "1",
    bathrooms: "1",
    furnishing: "",
    constructionStatus: "",
    listedBy: "",
    superBuiltupArea: "",
    carpetArea: "",
    maintenance: "",
    totalFloors: "",
    floorNo: "",
    carParking: "0",
    facing: "",
    projectName: "",
    adTitle: "",
    description: "",
    price: "",
    location: "",
    name: "Harish",
    phoneNumber: "+916382318872",
    purpose: "",
  });

  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Snackbar state management
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Snackbar close handler
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

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
            setDistricts([]);
          }
          setCities([]);
          setSelectedDistrict("");
          setSelectedCity("");
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
            setCities([]);
          }
          setSelectedCity("");
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
    const selectedCityName = cities.find(
      (city) => city.id === selectedCity
    )?.name;

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
      await axios.post(`${config.apiURL}/houseRoute/houses`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSnackbarMessage("House Ad posted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setFormData({
        type: "",
        bedrooms: "1",
        bathrooms: "1",
        furnishing: "",
        constructionStatus: "",
        listedBy: "",
        superBuiltupArea: "",
        carpetArea: "",
        maintenance: "",
        totalFloors: "",
        floorNo: "",
        carParking: "0",
        facing: "",
        projectName: "",
        adTitle: "",
        description: "",
        price: "",
        location: "",
        name: "Harish",
        phoneNumber: "+916382318872",
        purpose: "",
      });
      setPhotos([]);
      setPhotoPreviews([]);
    } catch (error) {
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
   <h2>Post House Details</h2>
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
            {[
              "Apartments",
              "Builder Floors",
              "Farm Houses",
              "Houses & Villas",
            ].map((option) => (
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

        {/* Bedrooms */}
        <div className="form-group">
          <label>Bedrooms *</label>
          <div className="options">
            {["1", "2", "3", "4", "4+"].map((option) => (
              <div
                key={option}
                className={`option ${
                  formData.bedrooms === option ? "selected" : ""
                }`}
                onClick={() => handleOptionChange("bedrooms", option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div className="form-group">
          <label>Bathrooms *</label>
          <div className="options">
            {["1", "2", "3", "4", "4+"].map((option) => (
              <div
                key={option}
                className={`option ${
                  formData.bathrooms === option ? "selected" : ""
                }`}
                onClick={() => handleOptionChange("bathrooms", option)}
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
          <label>Construction Status *</label>
          <div className="options">
            {["New Launch", "Ready to Move", "Under Construction"].map(
              (option) => (
                <div
                  key={option}
                  className={`option ${
                    formData.constructionStatus === option ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleOptionChange("constructionStatus", option)
                  }
                >
                  {option}
                </div>
              )
            )}
          </div>
        </div>

        {/* Listed by */}
        <div className="form-group">
          <label>Listed by *</label>
          <div className="options">
            {["Builder", "Dealer", "Owner"].map((option) => (
              <div
                key={option}
                className={`option ${
                  formData.listedBy === option ? "selected" : ""
                }`}
                onClick={() => handleOptionChange("listedBy", option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {/* Super Builtup Area */}
        <div className="form-group">
          <label htmlFor="superBuiltupArea">Super Builtup area (ft²) *</label>
          <input
            type="number"
            id="superBuiltupArea"
            name="superBuiltupArea"
            value={formData.superBuiltupArea}
            onChange={handleInputChange}
            required
            min="0"
          />
        </div>

        {/* Carpet Area */}
        <div className="form-group">
          <label htmlFor="carpetArea">Carpet Area (ft²) *</label>
          <input
            type="number"
            id="carpetArea"
            name="carpetArea"
            value={formData.carpetArea}
            onChange={handleInputChange}
            required
            min="0"
          />
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

        {/* Floor No */}
        <div className="form-group">
          <label htmlFor="floorNo">Floor No *</label>
          <input
            type="number"
            id="floorNo"
            name="floorNo"
            value={formData.floorNo}
            onChange={handleInputChange}
            required
            min="0"
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

        {/* Facing */}
        <div className="form-group">
          <label>Facing *</label>
          <div className="options">
            {["East", "West", "North", "South"].map((option) => (
              <div
                key={option}
                className={`option ${
                  formData.facing === option ? "selected" : ""
                }`}
                onClick={() => handleOptionChange("facing", option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {/* Project Name */}
        <div className="form-group">
          <label htmlFor="projectName">Project Name *</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Ad Title */}
        <div className="form-group">
          <label htmlFor="adTitle">Ad Title *</label>
          <input
            type="text"
            id="adTitle"
            name="adTitle"
            value={formData.adTitle}
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
          <label htmlFor="price">Price (₹) *</label>
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

        <div className="form-group">
            <label>Photos *</label>
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
                  <Button variant="contained" color="secondary" onClick={() => handleRemoveImage(index)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

        {/* Submit Button */}
        <div className="submit-button-container">
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>

          {/* Snackbar for showing messages */}
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

export default PostHouse;
