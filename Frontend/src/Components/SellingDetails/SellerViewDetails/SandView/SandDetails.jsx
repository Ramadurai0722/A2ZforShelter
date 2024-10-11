import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../../../config";
import "./sandview.css";
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

const SellerSandView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sand, setSand] = useState(null);
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
    const fetchSand = async () => {
      try {
        const response = await axios.get(
          `${config.apiURL}/sandRoute/sand/${id}`
        );
        setSand(response.data);
        setEditData(response.data); // Initialize editData with fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSand();
  }, [id]);

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
    setEditData(sand); // Reset to original data
  };

  const handleSaveEdit = async () => {
    setIsProcessing(true);
    try {
      await axios.put(`${config.apiURL}/sandRoute/sand/${id}`, editData);
      setSand(editData); // Update the view with the new data
      setIsEditing(false);
      setSnackbarMessage("Sand details updated successfully!");
      setSnackbarSeverity("success");
    } catch (err) {
      setSnackbarMessage("Failed to update sand details.");
      setSnackbarSeverity("error");
    } finally {
      setIsProcessing(false);
      setSnackbarOpen(true);
    }
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setIsProcessing(true);
    try {
      await axios.delete(`${config.apiURL}/sandRoute/sand/${id}`);
      setOpenDeleteDialog(false);
      setSnackbarMessage("Sand deleted successfully!");
      setSnackbarSeverity("success");
      navigate("/sellDashBoard"); 
    } catch (err) {
      setSnackbarMessage("Failed to delete sand.");
      setSnackbarSeverity("error");
    } finally {
      setIsProcessing(false);
      setSnackbarOpen(true);
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
  if (!sand) return 

  return (
    <>
      <Navbar />
      <div className="sandview2-product-view-container">
        <div className="sandview2-product-card">
          <div className="sandview2-product-images-section">
            {sand.images && sand.images.length > 0 ? (
              <div className="sandview2-product-image-grid">
                {sand.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${config.apiURL}/${image}`}
                    alt={`Sand Image ${index + 1}`}
                    className="sandview2-product-image-item"
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

          <div className="sandview2-product-details-section">
            {isEditing ? (
              <>
                <label htmlFor="">Sand Type</label>
                <input
                  type="text"
                  name="sandType"
                  value={editData.sandType || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name || ""}
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
                <h2 className="sandview2-product-title">{sand.sandType || "N/A"}</h2>
                <p>
                  <strong>Seller Name:</strong> {sand.name || "N/A"}
                </p>
                <p>
                  <strong>Quantity:</strong> {sand.quantity || "N/A"}
                </p>
                <p>
                  <strong>Price:</strong> {sand.price || "N/A"} RPS
                </p>
                <p>
                  <strong>Description:</strong> {sand.description || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {sand.sellerAddress || "N/A"}
                </p>
                <p>
                  <strong>Phone Number:</strong> {sand.phoneNumber || "N/A"}
                </p>
                <p>
                  <strong>Email ID:</strong> {sand.email || "N/A"}
                </p>
              </>
            )}

            <div className="sandview2-action-buttons">
              {isEditing ? (
                <>
                  <Button
                    className="sandview2-save-button"
                    onClick={handleSaveEdit}
                    disabled={isProcessing}
                  >
                    Save
                  </Button>
                  <Button
                    className="sandview2-cancel-button"
                    onClick={handleCancelEdit}
                    disabled={isProcessing}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="sandview2-edit-button"
                    onClick={handleEditClick}
                  >
                    Edit
                  </Button>
                  <Button
                    className="sandview2-delete-button"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="sandview2-modal-overlay" onClick={handleCloseModal}>
          <div className="sandview2-modal-content">
            <span className="sandview2-close-button" onClick={handleCloseModal}>
              X
            </span>
            <img
              src={selectedImage}
              alt="Enlarged View"
              className="sandview2-modal-image"
            />
          </div>
        </div>
      )}

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this sand post? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      <Footer />
    </>
  );
};

export default SellerSandView;