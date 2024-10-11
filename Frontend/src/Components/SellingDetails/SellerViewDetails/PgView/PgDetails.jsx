import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../../../config";
import "./pgview.css";
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

const SellerPGView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
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
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${config.apiURL}/pgHostelRoute/pgHostel/${id}`
        );
        setProduct(response.data);
        setEditData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(product); // Reset to original data
  };

  const handleSaveEdit = async () => {
    setIsProcessing(true);
    try {
      await axios.put(
        `${config.apiURL}/pgHostelRoute/pgHostel/${id}`,
        editData
      );
      setProduct(editData); // Update the view with the new data
      setIsEditing(false);
      setSnackbarMessage("PG details updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage("Failed to update PG details.");
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
      await axios.delete(`${config.apiURL}/pgHostelRoute/pgHostel/${id}`);
      setOpenDeleteDialog(false);
      setSnackbarMessage("PG deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/sellDashBoard"); 
    } catch (err) {
      setSnackbarMessage("Failed to delete PG.");
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
  if (!product) return 

  return (
    <>
      <Navbar />
      <div className="pgview2-product-view-container">
        <div className="pgview2-product-card">
          <div className="pgview2-product-images-section">
            {product.photos && product.photos.length > 0 ? (
              <div className="pgview2-product-image-grid">
                {product.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={`${config.apiURL}/${photo}`}
                    alt={`PG Image ${index + 1}`}
                    className="pgview2-product-image-item"
                    onClick={() =>
                      handleImageClick(`${config.apiURL}/${photo}`)
                    }
                  />
                ))}
              </div>
            ) : (
              <p>No images available</p>
            )}
          </div>

          <div className="pgview2-product-details-section">
            {isEditing ? (
              <>
                <label>PGHostel Name</label>
                <input
                  type="text"
                  name="pgHostelName"
                  value={editData.pgHostelName || ""}
                  onChange={handleFieldChange}
                />
                <label>Location</label>
                <input
                  type="text"
                  name="cityName"
                  value={editData.cityName || ""}
                  onChange={handleFieldChange}
                />
                <label>Total Floors</label>
                <input
                  type="number"
                  name="totalFloors"
                  value={editData.totalFloors || ""}
                  onChange={handleFieldChange}
                />
                <label>Rooms Type</label>
                <input
                  type="text"
                  name="acRoom"
                  value={editData.acRoom || ""}
                  onChange={handleFieldChange}
                />
                <label>Food</label>
                <input
                  type="text"
                  name="food"
                  value={editData.food || ""}
                  onChange={handleFieldChange}
                />
                <label>Parking</label>
                <input
                  type="text"
                  name="carParking"
                  value={editData.carParking || ""}
                  onChange={handleFieldChange}
                />
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={editData.price || ""}
                  onChange={handleFieldChange}
                />
                <label>Description</label>
                <textarea
                  name="description"
                  value={editData.description || ""}
                  onChange={handleFieldChange}
                />
              </>
            ) : (
              <>
                <h2 className="pgview2-product-title">
                  {product.pgHostelName || "N/A"}
                </h2>
                <p>
                  <strong>Location:</strong>{" "}
                  {`${product.cityName || "N/A"}, ${product.districtName || "N/A"}, ${product.stateName || "N/A"}`}
                </p>
                <p>
                  <strong>Total Floors:</strong> {product.totalFloors || "N/A"}
                </p>
                <p>
                  <strong>Room Type:</strong> {product.acRoom || "N/A"}
                </p>
                <p>
                  <strong>Food Included:</strong> {product.food || "N/A"}
                </p>
                <p>
                  <strong>Car Parking:</strong> {product.carParking || "N/A"}
                </p>
                <p>
                  <strong>Price:</strong> {product.price || "N/A"} RPS
                </p>
                <p>
                  <strong>Description:</strong> {product.description || "N/A"}
                </p>
              </>
            )}

            <div className="pgview2-action-buttons">
              {isEditing ? (
                <>
                  <Button
                    className="pgview2-save-button"
                    onClick={handleSaveEdit}
                    disabled={isProcessing}
                  >
                    Save
                  </Button>
                  <Button
                    className="pgview2-cancel-button"
                    onClick={handleCancelEdit}
                    disabled={isProcessing}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="pgview2-edit-button"
                    onClick={handleEditClick}
                  >
                    Edit
                  </Button>
                  <Button
                    className="pgview2-delete-button"
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

      {/* Modal for Image Popup */}
      {isModalOpen && (
        <div className="pgview2-modal-overlay" onClick={handleCloseModal}>
          <div className="pgview2-modal-content">
            <span className="pgview2-close-button" onClick={handleCloseModal}>
              X
            </span>
            <img
              src={selectedImage}
              alt="Enlarged View"
              className="pgview2-modal-image"
            />
          </div>
        </div>
      )}

      {/* Dialog for delete confirmation */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item? This action cannot be undone.
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

      {/* Snackbar for success/failure messages */}
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

export default SellerPGView;