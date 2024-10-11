import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../../../config";
import "./stoneview.css";
import Navbar from "../../../Navbar/Navbar";
import Footer from "../../../Footer/Footer";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
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

const SellerStoneView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stone, setStone] = useState(null);
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
    const fetchStone = async () => {
      try {
        const response = await axios.get(
          `${config.apiURL}/stoneRoute/stone/${id}`
        );
        setStone(response.data);
        setEditData(response.data); // Initialize editData with fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStone();
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
    setEditData(stone); // Reset to original data
  };

  const handleSaveEdit = async () => {
    setIsProcessing(true);
    try {
      await axios.put(`${config.apiURL}/stoneRoute/stone/${id}`, editData);
      setStone(editData); // Update the view with new data
      setIsEditing(false);
      setSnackbarMessage("Stone details updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage("Failed to update stone details.");
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
      await axios.delete(`${config.apiURL}/stoneRoute/stone/${id}`);
      setOpenDeleteDialog(false);
      setSnackbarMessage("Stone post deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/sellDashBoard"); // Redirect after deletion
    } catch (err) {
      setSnackbarMessage("Failed to delete stone post.");
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
  if (!stone) return

  return (
    <>
      <Navbar />
      <div className="stoneview2-product-view-container">
        <div className="stoneview2-product-card">
          <div className="stoneview2-product-images-section">
            {stone.images && stone.images.length > 0 ? (
              <div className="stoneview2-product-image-grid">
                {stone.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${config.apiURL}/${image}`}
                    alt={`Stone Image ${index + 1}`}
                    className="stoneview2-product-image-item"
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
  
          <div className="stoneview2-product-details-section">
            {isEditing ? (
              <>
                <label htmlFor="">Category</label>
                <input
                  type="text"
                  name="stoneCategory"
                  value={editData.stoneCategory || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Type</label>
                <input
                  type="text"
                  name="stoneType"
                  value={editData.stoneType || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Quantity</label>
                <input
                  type="text"
                  name="quantity"
                  value={editData.quantity || ""}
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
                  name="sellerAddress"
                  value={editData.sellerAddress || ""}
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
                <h2 className="stoneview2-product-title">
                  {stone.stoneCategory || "N/A"}
                </h2>
                <p>
                  <strong>Seller Name:</strong> {stone.name || "N/A"}
                </p>
                <p>
                  <strong>Stone Type:</strong> {stone.stoneType || "N/A"}
                </p>
                <p>
                  <strong>Quantity:</strong> {stone.quantity || "1 Tonne"}
                </p>
                <p>
                  <strong>Price:</strong> {stone.price || "N/A"} RPS
                </p>
                <p>
                  <strong>Description:</strong> {stone.description || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {stone.sellerAddress || "N/A"}
                </p>
                <p>
                  <strong>Phone Number:</strong> {stone.phoneNumber || "N/A"}
                </p>
                <p>
                  <strong>Email ID:</strong> {stone.email || "N/A"}
                </p>
              </>
            )}
  
            {/* Action Buttons for Edit/Delete */}
            <div className="stoneview2-action-buttons">
              {isEditing ? (
                <>
                  <button
                    className="stoneview2-save-button"
                    onClick={handleSaveEdit}
                    disabled={isProcessing}
                  >
                    Save
                  </button>
                  <button
                    className="stoneview2-cancel-button"
                    onClick={handleCancelEdit}
                    disabled={isProcessing}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="stoneview2-edit-button"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                  <button
                    className="stoneview2-delete-button"
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
          <div className="stoneview2-modal-overlay" onClick={handleCloseModal}>
            <div className="stoneview2-modal-content">
              <span className="stoneview2-close-button" onClick={handleCloseModal}>
                X
              </span>
              <img
                src={selectedImage}
                alt="Enlarged View"
                className="stoneview2-modal-image"
              />
            </div>
          </div>
        )}
  
        {/* Dialog for delete confirmation */}
        <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this stone post? This action cannot be undone.
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

export default SellerStoneView;
