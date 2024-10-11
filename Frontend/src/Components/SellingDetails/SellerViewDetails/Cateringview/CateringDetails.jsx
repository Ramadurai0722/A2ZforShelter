import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../../../config";
import Navbar from "../../../Navbar/Navbar";
import Footer from "../../../Footer/Footer";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./cateringview.css"

// Alert component for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SellerCateringView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [catering, setCatering] = useState(null);
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
    const fetchCatering = async () => {
      try {
        const response = await axios.get(
          `${config.apiURL}/cateringRoute/catering/${id}`
        );
        setCatering(response.data);
        setEditData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCatering();
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
    setEditData(catering); 
  };

  const handleSaveEdit = async () => {
    setIsProcessing(true);
    try {
      await axios.put(
        `${config.apiURL}/cateringRoute/catering/${id}`,
        editData
      );
      setCatering(editData); 
      setIsEditing(false);
      setSnackbarMessage("Catering item updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage("Failed to update catering item.");
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
      await axios.delete(`${config.apiURL}/cateringRoute/catering/${id}`);
      setOpenDeleteDialog(false);
      setSnackbarMessage("Catering item deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/sellDashBoard"); 
    } catch (err) {
      setSnackbarMessage("Failed to delete catering item.");
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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  if (error) return 
  if (!catering) return 

  return (
    <>
      <Navbar />
      <div className="cateringview2-product-view-container">
        <div className="cateringview2-product-card">
          <div className="cateringview2-product-images-section">
            {catering.images && catering.images.length > 0 ? (
              <div className="cateringview2-product-image-grid">
                {catering.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${config.apiURL}/${image}`}
                    alt={`Catering Image ${index + 1}`}
                    className="cateringview2-product-image-item"
                    onClick={() => handleImageClick(`${config.apiURL}/${image}`)}
                  />
                ))}
              </div>
            ) : (
              <p>No images available</p>
            )}
          </div>

          <div className="cateringview2-product-details-section">
            {isEditing ? (
              <>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name || ""}
                  onChange={handleFieldChange}
                />
                <label>Meals Offered</label>
                <input
                  type="text"
                  name="meals"
                  value={editData.meals || ""}
                  onChange={handleFieldChange}
                />
                <label>Number of People</label>
                <input
                  type="number"
                  name="numberOfPeople"
                  value={editData.numberOfPeople || ""}
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
                <input
                  type="text"
                  name="description"
                  value={editData.description || ""}
                  onChange={handleFieldChange}
                />
                <label>Menu Catalogues</label>
                <input
                  type="text"
                  name="menuCatalogues"
                  value={editData.menuCatalogues || ""}
                  onChange={handleFieldChange}
                />
                <label>Address</label>
                <input
                  type="text"
                  name="shopAddress"
                  value={editData.shopAddress || ""}
                  onChange={handleFieldChange}
                />
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={editData.phoneNumber || ""}
                  onChange={handleFieldChange}
                />
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={editData.email || ""}
                  onChange={handleFieldChange}
                />
              </>
            ) : (
              <>
                <h2 className="cateringview2-product-title">{catering.name || "N/A"}</h2>
                <p>
                  <strong>Meals Offered:</strong> {catering.meals || "N/A"}
                </p>
                <p>
                  <strong>Number of Consumers:</strong> {catering.numberOfPeople || "N/A"}
                </p>
                <p>
                  <strong>Price:</strong> {catering.price || "N/A"} RPS
                </p>
                <p>
                  <strong>Description:</strong> {catering.description || "N/A"}
                </p>
                <p>
                  <strong>Menu Catalogues:</strong> {catering.menuCatalogues || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {catering.shopAddress || "N/A"}
                </p>
                <p>
                  <strong>Phone Number:</strong> {catering.phoneNumber || "N/A"}
                </p>
                <p>
                  <strong>Email ID:</strong> {catering.email || "N/A"}
                </p>
              </>
            )}

            <div className="cateringview2-action-buttons">
              {isEditing ? (
                <>
                  <Button onClick={handleSaveEdit} disabled={isProcessing} variant="contained" color="primary">
                    Save
                  </Button>
                  <Button onClick={handleCancelEdit} disabled={isProcessing} variant="outlined" color="secondary">
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleEditClick} variant="contained" color="primary">
                    Edit
                  </Button>
                  <Button onClick={handleDeleteClick} disabled={isProcessing} variant="outlined" color="secondary">
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Delete Catering Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this catering item?
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
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <img
          src={selectedImage}
          alt="Catering"
          style={{ width: "100%", height: "auto" }}
        />
      </Dialog>

      {/* Snackbar for notifications */}
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

      <Footer />
    </>
  );
};

export default SellerCateringView;