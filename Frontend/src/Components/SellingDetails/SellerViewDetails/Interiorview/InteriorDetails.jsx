import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../../../config";
import "./interiorview.css";
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

const SellerInteriorView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interior, setInterior] = useState(null);
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
    const fetchInterior = async () => {
      try {
        const response = await axios.get(
          `${config.apiURL}/interiorRoute/interior/${id}`
        );
        setInterior(response.data);
        setEditData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInterior();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(interior); // Reset to original data
  };

  const handleSaveEdit = async () => {
    setIsProcessing(true);
    try {
      await axios.put(
        `${config.apiURL}/interiorRoute/interior/${id}`,
        editData
      );
      setInterior(editData); // Update the view with the new data
      setIsEditing(false);
      setSnackbarMessage("Interior details updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage("Failed to update interior details.");
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
      await axios.delete(`${config.apiURL}/interiorRoute/interior/${id}`);
      setOpenDeleteDialog(false);
      setSnackbarMessage("Interior service deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/sellDashBoard");
    } catch (err) {
      setSnackbarMessage("Failed to delete interior service.");
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
  if (!interior) return 

  return (
    <>
      <Navbar />
      <div className="interior2-product-view-container">
        <div className="interior2-product-card">
          <div className="interior2-product-images-section">
            {interior.images && interior.images.length > 0 ? (
              <div className="interior2-product-image-grid">
                {interior.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${config.apiURL}/${image}`}
                    alt={`Interior Image ${index + 1}`}
                    className="interior2-product-image-item"
                    onClick={() => handleImageClick(`${config.apiURL}/${image}`)}
                  />
                ))}
              </div>
            ) : (
              <p>No images available</p>
            )}
          </div>

          <div className="interior2-product-details-section">
            {isEditing ? (
              <>
                <label htmlFor="">Category</label>
                <input
                  type="text"
                  name="category"
                  value={editData.category || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Product</label>
                <input
                  type="text"
                  name="products"
                  value={editData.products || ""}
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
                <label htmlFor="">Shop Address</label>
                <input
                  type="text"
                  name="sellerAddress"
                  value={editData.sellerAddress || ""}
                  onChange={handleFieldChange}
                />
              </>
            ) : (
              <>
                <h2 className="interior2-product-title">{interior.category || "N/A"}</h2>
                <p>
                  <strong>Seller Name:</strong> {interior.name || "N/A"}
                </p>
                <p>
                  <strong>Product:</strong> {interior.products || "N/A"}
                </p>
                <p>
                  <strong>Price:</strong> {interior.price || "N/A"} RPS
                </p>
                <p>
                  <strong>Description:</strong> {interior.description || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {interior.sellerAddress || "N/A"}
                </p>
              </>
            )}

            <div className="interior2-action-buttons">
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    onClick={handleSaveEdit}
                    disabled={isProcessing}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleCancelEdit}
                    disabled={isProcessing}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="contained" onClick={handleEditClick}>
                    Edit
                  </Button>
                  <Button variant="outlined" onClick={handleDeleteClick}>
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Image Popup */}
      {isModalOpen && (
        <div className="interior2-modal-overlay" onClick={handleCloseModal}>
          <div className="interior2-modal-content">
            <span className="interior2-close-button" onClick={handleCloseModal}>
              X
            </span>
            <img
              src={selectedImage}
              alt="Enlarged View"
              className="interior2-modal-image"
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

      <Footer />
    </>
  );
};

export default SellerInteriorView;
