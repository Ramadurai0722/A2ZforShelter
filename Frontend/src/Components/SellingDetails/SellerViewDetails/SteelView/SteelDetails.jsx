import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../../../config";
import "./steelview.css";
import Navbar from "../../../Navbar/Navbar";
import Footer from "../../../Footer/Footer";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// Alert component for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SellerSteelView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [steel, setSteel] = useState(null);
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
    const fetchSteel = async () => {
      try {
        const response = await axios.get(
          `${config.apiURL}/steelRoute/steel/${id}`
        );
        setSteel(response.data);
        setEditData(response.data); // Initialize editData with fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSteel();
  }, [id]);

  const handleToggleContact = () => {
    setShowContact(!showContact);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(steel); // Reset to original data
  };

  const handleSaveEdit = async () => {
    setIsProcessing(true);
    try {
      await axios.put(`${config.apiURL}/steelRoute/steel/${id}`, editData);
      setSteel(editData); // Update the view with new data
      setIsEditing(false);
      setSnackbarMessage("Steel details updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage("Failed to update steel details.");
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
      await axios.delete(`${config.apiURL}/steelRoute/steel/${id}`);
      setOpenDeleteDialog(false);
      setSnackbarMessage("Steel post deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/sellDashBoard"); 
    } catch (err) {
      setSnackbarMessage("Failed to delete steel post.");
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

  if (error) return 
  if (!steel) return 

  return (
    <>
      <Navbar />
      <div className="steelview2-product-view-container">
        <div className="steelview2-product-card">
          <div className="steelview2-product-images-section">
            {steel.images && steel.images.length > 0 ? (
              <div className="steelview2-product-image-grid">
                {steel.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${config.apiURL}/${image}`}
                    alt={`Steel Image ${index + 1}`}
                    className="steelview2-product-image-item"
                    onClick={() =>
                      handleImageClick(`${config.apiURL}/${image}`)
                    }
                  />
                ))}
              </div>
            ) : (
              <p>No images available</p>
            )}
          </div>
  
          <div className="steelview2-product-details-section">
            {isEditing ? (
              <>
                <label htmlFor=""> Brand Name</label>
                <input
                  type="text"
                  name="brand"
                  value={editData.brand || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Type</label>
                <input
                  type="text"
                  name="steelType"
                  value={editData.steelType || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Category</label>
                <input
                  type="text"
                  name="steelCategory"
                  value={editData.steelCategory || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Thickness</label>
                <input
                  type="text"
                  name="steelThickness"
                  value={editData.steelThickness || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Meter</label>
                <input
                  type="text"
                  name="meter"
                  value={editData.meter || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editData.price || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Description</label>
                <input
                  type="text"
                  name="description"
                  value={editData.description || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Address</label>
                <input
                  type="text"
                  name="shopAddress"
                  value={editData.shopAddress || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={editData.phoneNumber || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  name="email"
                  value={editData.email || ""}
                  onChange={handleFieldChange}
                />
              </>
            ) : (
              <>
                <h2 className="steelview2-product-title">{steel.brand || "N/A"}</h2>
                <p>
                  <strong>Steel Type:</strong> {steel.steelType || "N/A"}
                </p>
                <p>
                  <strong>Steel Category:</strong> {steel.steelCategory || "N/A"}
                </p>
                <p>
                  <strong>Steel Thickness:</strong> {steel.steelThickness || "N/A"}
                </p>
                <p>
                  <strong>Meter:</strong> {steel.meter || "1 Meter"}
                </p>
                <p>
                  <strong>Price:</strong> {steel.price || "N/A"} RPS
                </p>
                <p>
                  <strong>Description:</strong> {steel.description || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {steel.shopAddress || "N/A"}
                </p>
                <p>
                  <strong>Phone Number:</strong> {steel.phoneNumber || "N/A"}
                </p>
                <p>
                  <strong>Email ID:</strong> {steel.email || "N/A"}
                </p>
              </>
            )}
  
            {/* Action Buttons for Edit/Delete */}
            <div className="steelview2-action-buttons">
              {isEditing ? (
                <>
                  <button
                    className="steelview2-save-button"
                    onClick={handleSaveEdit}
                    disabled={isProcessing}
                  >
                    Save
                  </button>
                  <button
                    className="steelview2-cancel-button"
                    onClick={handleCancelEdit}
                    disabled={isProcessing}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="steelview2-edit-button"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                  <button
                    className="steelview2-delete-button"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
  
        {/* Modal for showing larger image */}
        {isModalOpen && (
          <div className="steelview2-modal-overlay" onClick={handleCloseModal}>
            <div className="steelview2-modal-content">
              <span className="steelview2-close-button" onClick={handleCloseModal}>
                X
              </span>
              <img
                src={selectedImage}
                alt="Enlarged View"
                className="steelview2-modal-image"
              />
            </div>
          </div>
        )}
  
        {/* Dialog for delete confirmation */}
        <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this steel post? This action cannot be undone.
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

export default SellerSteelView;
