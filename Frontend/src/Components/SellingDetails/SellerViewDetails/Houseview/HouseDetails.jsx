import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../../../config";
import "./houseview.css";
import Navbar from "../../../Navbar/Navbar";
import Footer from "../../../Footer/Footer";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// Alert component for Snackbar
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const SellerHouseView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/houseRoute/house/${id}`);
        setHouse(response.data);
        setEditData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHouse();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(house); // Reset to original data
  };

  const handleSaveEdit = async () => {
    setIsProcessing(true);
    try {
      await axios.put(`${config.apiURL}/houseRoute/house/${id}`, editData);
      setHouse(editData); // Update the view with the new data
      setIsEditing(false);
      setSnackbarMessage("House details updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage("Failed to update house details.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setIsProcessing(true);
    try {
      await axios.delete(`${config.apiURL}/houseRoute/house/${id}`);
      setOpenDeleteDialog(false);
      setSnackbarMessage("House deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/sellDashBoard"); 
    } catch (err) {
      setSnackbarMessage("Failed to delete house.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Close the snackbar after a few seconds
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  if (error) return 
  if (!house) return

  return (
    <>
      <Navbar />
      <div className="houseview2-product-view-container">
        <div className="houseview2-product-card">
          <div className="houseview2-product-images-section">
            {house.photos && house.photos.length > 0 ? (
              <div className="houseview2-product-image-grid">
                {house.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={`${config.apiURL}/${photo}`}
                    alt={`House Image ${index + 1}`}
                    className="houseview2-product-image-item"
                    onClick={() => handleImageClick(`${config.apiURL}/${photo}`)}
                  />
                ))}
              </div>
            ) : (
              <p>No images available</p>
            )}
          </div>

          <div className="houseview2-product-details-section">
            {isEditing ? (
              <>
                <h2>Edit House details</h2>
                <label>Title</label>
                <input
                  type="text"
                  name="adTitle"
                  value={editData.adTitle || ""}
                  onChange={handleFieldChange}
                />
                <label>Project Name</label>
                <input
                  type="text"
                  name="projectName"
                  value={editData.projectName || ""}
                  onChange={handleFieldChange}
                />
                <label>Type</label>
                <input
                  type="text"
                  name="type"
                  value={editData.type || ""}
                  onChange={handleFieldChange}
                />
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={editData.location || ""}
                  onChange={handleFieldChange}
                />
                <label>Number of Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={editData.bedrooms || ""}
                  onChange={handleFieldChange}
                />
                <label>Number of Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={editData.bathrooms || ""}
                  onChange={handleFieldChange}
                />
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={editData.price || ""}
                  onChange={handleFieldChange}
                />
              </>
            ) : (
              <>
                <h2 className="houseview2-product-title">{house.adTitle || "N/A"}</h2>
                <p>
                  <strong>Project Name:</strong> {house.projectName || "N/A"}
                </p>
                <p>
                  <strong>Type:</strong> {house.type || "N/A"}
                </p>
                <p>
                  <strong>Location:</strong>{" "}
                  {`${house.location || "N/A"}, ${house.cityName || "N/A"}, ${
                    house.districtName || "N/A"
                  }, ${house.stateName || "N/A"}`}
                </p>
                <p>
                  <strong>Bedrooms:</strong> {house.bedrooms || "N/A"} BHK
                </p>
                <p>
                  <strong>Bathrooms:</strong> {house.bathrooms || "N/A"}
                </p>
                <p>
                  <strong>Price:</strong> {house.price || "N/A"} RPS
                </p>
              </>
            )}

            <div className="houseview2-action-buttons">
              {isEditing ? (
                <>
                  <button
                    className="houseview2-save-button"
                    onClick={handleSaveEdit}
                    disabled={isProcessing}
                  >
                    Save
                  </button>
                  <button
                    className="houseview2-cancel-button"
                    onClick={handleCancelEdit}
                    disabled={isProcessing}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="houseview2-edit-button"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                  <button
                    className="houseview2-delete-button"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Modal for Image Popup */}
        {isModalOpen && (
          <div className="houseview2-modal-overlay" onClick={handleCloseModal}>
            <div className="houseview2-modal-content">
              <span className="houseview2-close-button" onClick={handleCloseModal}>
                X
              </span>
              <img
                src={selectedImage}
                alt="Enlarged View"
                className="houseview2-modal-image"
              />
            </div>
          </div>
        )}

        {/* Dialog for delete confirmation */}
        <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this item? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              color="secondary"
              disabled={isProcessing}
            >
              {isProcessing ? <CircularProgress size={24} /> : "Confirm"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for success/failure messages */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

       
      </div>
      <Footer />
    </>
  );
};

export default SellerHouseView;
