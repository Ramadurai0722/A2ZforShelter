import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../../../config";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const EditHouse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    adTitle: "",
    projectName: "",
    type: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
    description: "",
    furnishing: "",
    constructionStatus: "",
    listedBy: "",
    superBuiltupArea: "",
    carpetArea: "",
    totalFloors: "",
    floorNo: "",
    carParking: "",
    facing: "",
    maintenance: "",
    purpose: "",
  });

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/houseRoute/house/${id}`);
        setHouse(response.data);
        setFormData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHouse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${config.apiURL}/houseRoute/house/${id}`, formData);
      navigate(`/Sellerhouseview/${id}`);
    } catch (err) {
      setError("Failed to update house data.");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;
  if (!house) return <p>No house data available.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Ad Title</label>
        <input
          type="text"
          name="adTitle"
          value={formData.adTitle}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Project Name</label>
        <input
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Type</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Bedrooms</label>
        <input
          type="number"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Bathrooms</label>
        <input
          type="number"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Furnishing</label>
        <input
          type="text"
          name="furnishing"
          value={formData.furnishing}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Construction Status</label>
        <input
          type="text"
          name="constructionStatus"
          value={formData.constructionStatus}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Listed By</label>
        <input
          type="text"
          name="listedBy"
          value={formData.listedBy}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Super Built-up Area</label>
        <input
          type="number"
          name="superBuiltupArea"
          value={formData.superBuiltupArea}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Carpet Area</label>
        <input
          type="number"
          name="carpetArea"
          value={formData.carpetArea}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Total Floors</label>
        <input
          type="number"
          name="totalFloors"
          value={formData.totalFloors}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Floor No</label>
        <input
          type="number"
          name="floorNo"
          value={formData.floorNo}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Car Parking</label>
        <input
          type="text"
          name="carParking"
          value={formData.carParking}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Facing</label>
        <input
          type="text"
          name="facing"
          value={formData.facing}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Maintenance</label>
        <input
          type="number"
          name="maintenance"
          value={formData.maintenance}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Purpose</label>
        <input
          type="text"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </form>
  );
};

export default EditHouse;
