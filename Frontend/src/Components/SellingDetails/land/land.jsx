import React, { useState, useEffect } from "react";
import config from "../../../config";
import {
  TextField,
  MenuItem,
  Grid,
  Snackbar,
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Card,
} from "@mui/material";
import Navbar from "../../Navbar/Navbar"; 
import Footer from "../../Footer/Footer"; 

function LandForm() {
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    userId,
    status: "",
    listedBy: "",
    landArea: "",
    facing: "",
    projectName: "",
    description: "",
    price: "",
    location: "",
    name: "Harish",
    phoneNumber: "+916382318872",
    purpose: "",
    facilities: [],
  });

  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(""); 
  const [selectedCity, setSelectedCity] = useState(""); 
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(`${config.apiURL}/api/states`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setStates(data.map(state => ({
            id: state.geonameId,
            name: state.name,
            lat: state.lat,
            lon: state.lng,
          })));
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

  useEffect(() => {
    if (selectedState) {
      const fetchDistricts = async () => {
        try {
          const response = await fetch(`${config.apiURL}/api/districts?stateGeonameId=${selectedState}`);
          const data = await response.json();
          if (Array.isArray(data)) {
            setDistricts(data.map(district => ({
              id: district.geonameId,
              name: district.name,
              lat: district.lat,
              lon: district.lng,
            })));
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

  useEffect(() => {
    if (selectedDistrict) {
      const fetchCities = async () => {
        try {
          const response = await fetch(`${config.apiURL}/api/cities?districtGeonameId=${selectedDistrict}`);
          const data = await response.json();
          if (Array.isArray(data)) {
            setCities(data.map(city => ({
              id: city.geonameId,
              name: city.name,
              lat: city.lat,
              lon: city.lng,
            })));
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + photos.length > 20) {
      setSnackbarMessage("You can only upload up to 20 photos.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    setPhotos([...photos, ...files]);
    const previews = files.map(file => URL.createObjectURL(file));
    setPhotoPreviews([...photoPreviews, ...previews]);
  };

  const handleRemoveImage = (index) => {
    const newPhotos = [...photos];
    const newPreviews = [...photoPreviews];
    newPhotos.splice(index, 1);
    newPreviews.splice(index, 1);
    setPhotos(newPhotos);
    setPhotoPreviews(newPreviews);
  };

  const handleFacilityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, facilities: [...formData.facilities, value] });
    } else {
      setFormData({
        ...formData,
        facilities: formData.facilities.filter(facility => facility !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedStateName = states.find(state => state.id === selectedState)?.name;
    const selectedDistrictName = districts.find(district => district.id === selectedDistrict)?.name;
    const selectedCityName = cities.find(city => city.id === selectedCity)?.name;

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append("stateName", selectedStateName || "");
    data.append("districtName", selectedDistrictName || "");
    data.append("cityName", selectedCityName || "");

    photos.forEach(photo => {
      data.append("photos", photo);
    });

    try {
      const response = await fetch(`${config.apiURL}/landRoute/land`, {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json(); 
      setSnackbarMessage(result.message || "Land Ad posted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setFormData({
        userId,
        status: "",
        listedBy: "",
        landArea: "",
        facing: "",
        projectName: "",
        description: "",
        price: "",
        location: "",
        name: "Harish",
        phoneNumber: "+916382318872",
        purpose: "",
        facilities: [],
      });
      setPhotos([]);
      setPhotoPreviews([]);
      setSelectedState("");
      setSelectedDistrict("");
      setSelectedCity("");
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
      <Box sx={{ margin: "0 auto", padding: "20px", maxWidth: "900px", marginTop: "100px" }}>
        <Card sx={{ padding: "30px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", marginBottom: "30px" }}>
            LAND & PLOTS SALE
          </Typography>

          <form onSubmit={handleSubmit} style={{ fontFamily: "'Roboto', sans-serif" }}>
            <Grid container spacing={3}>
              {/* Purpose */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  For *
                </Typography>
                <Grid container spacing={2}>
                  {["Sell"].map((option) => (
                    <Grid item key={option}>
                      <Button
                        variant={formData.purpose === option ? "contained" : "outlined"}
                        onClick={() => handleOptionChange("purpose", option)}
                        sx={{
                          padding: "10px 20px",
                          fontSize: "14px",
                          textTransform: "none",
                        }}
                      >
                        {option}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              {/* Status */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Status *
                </Typography>
                <Grid container spacing={2}>
                  {["New Launch", "Ready to Sale", "Urgent Sale"].map((option) => (
                    <Grid item key={option}>
                      <Button
                        variant={formData.status === option ? "contained" : "outlined"}
                        onClick={() => handleOptionChange("status", option)}
                        sx={{
                          padding: "10px 20px",
                          fontSize: "14px",
                          textTransform: "none",
                        }}
                      >
                        {option}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              {/* Listed By */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Listed By *
                </Typography>
                <Grid container spacing={2}>
                  {["Dealer", "Owner"].map((option) => (
                    <Grid item key={option}>
                      <Button
                        variant={formData.listedBy === option ? "contained" : "outlined"}
                        onClick={() => handleOptionChange("listedBy", option)}
                        sx={{
                          padding: "10px 20px",
                          fontSize: "14px",
                          textTransform: "none",
                        }}
                      >
                        {option}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              {/* Land Area */}
              <Grid item xs={12}>
                <label style={{ fontSize: "16px", fontWeight: "500" }}>Land Area (in Sq. ft.) *</label>
                <input
                  type="text"
                  name="landArea"
                  value={formData.landArea}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    marginBottom: "15px",
                  }}
                  required
                />
              </Grid>

              {/* Facing */}
              <Grid item xs={12}>
                <label style={{ fontSize: "16px", fontWeight: "500" }}>Facing *</label>
                <select
                  name="facing"
                  value={formData.facing}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    marginBottom: "15px",
                  }}
                  required
                >
                  <option value="">Select Facing</option>
                  {["North", "South", "East", "West"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Grid>

              {/* Project Name */}
              <Grid item xs={12}>
                <label style={{ fontSize: "16px", fontWeight: "500" }}>Project Name</label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    marginBottom: "15px",
                  }}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <label style={{ fontSize: "16px", fontWeight: "500" }}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    marginBottom: "15px",
                  }}
                ></textarea>
              </Grid>

              {/* Price */}
              <Grid item xs={12}>
                <label style={{ fontSize: "16px", fontWeight: "500" }}>Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    marginBottom: "15px",
                  }}
                  required
                />
              </Grid>

              {/* Location */}
              <Grid item xs={12}>
                <label style={{ fontSize: "16px", fontWeight: "500" }}>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    marginBottom: "15px",
                  }}
                />
              </Grid>

              {/* State, District, City */}
              <Grid item xs={12}>
                <label style={{ fontSize: "16px", fontWeight: "500" }}>State *</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    marginBottom: "15px",
                  }}
                  required
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </Grid>

              {/* Facilities */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Facilities
                </Typography>
                <Grid container spacing={2}>
                  {["Water Supply", "Electricity", "Internet", "Parking"].map((facility) => (
                    <Grid item key={facility}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.facilities.includes(facility)}
                            onChange={handleFacilityChange}
                            value={facility}
                          />
                        }
                        label={facility}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              {/* Upload Images */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Upload Images (max 20)
                </Typography>
                <input type="file" multiple accept="image/*" onChange={handleFileChange} />

                {/* Image Preview */}
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "20px",
                  }}
                >
                  {photoPreviews.map((photo, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        width: "150px",
                        height: "150px",
                        marginRight: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <img
                        src={photo}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
                        }}
                      />
                      <Button
                        onClick={() => handleRemoveImage(index)}
                        sx={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          backgroundColor: "rgba(255, 0, 0, 0.8)",
                          color: "#fff",
                          padding: "5px",
                          minWidth: "auto",
                        }}
                      >
                        &times;
                      </Button>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Box sx={{ textAlign: "center", marginTop: "30px" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                sx={{
                  padding: "12px 30px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#28a745",
                  "&:hover": {
                    backgroundColor: "#218838",
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Card>

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
      <Footer />
    </>
  );
}

export default LandForm;