import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../../../config";
import "./pipewire.css";
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

const SellerPipeWireView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pipeWire, setPipeWire] = useState(null);
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
    const fetchPipeWire = async () => {
      try {
        const response = await axios.get(
          `${config.apiURL}/pipeWiresRoute/pipewire/${id}`
        );
        setPipeWire(response.data);
        setEditData(response.data); // Initialize the edit data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPipeWire();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(pipeWire); // Reset to original data
  };

  const handleSaveEdit = async () => {
    setIsProcessing(true);
    try {
      await axios.put(
        `${config.apiURL}/pipeWiresRoute/pipewires/${id}`,
        editData
      );
      setPipeWire(editData); 
      setIsEditing(false);
      setSnackbarMessage("Pipe/Wire details updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage("Failed to update Pipe/Wire details.");
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
      await axios.delete(`${config.apiURL}/pipeWiresRoute/pipewires/${id}`);
      setOpenDeleteDialog(false);
      setSnackbarMessage("Pipe/Wire product deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/sellDashBoard"); 
    } catch (err) {
      setSnackbarMessage("Failed to delete Pipe/Wire product.");
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
  if (!pipeWire) return 

  return (
    <>
      <Navbar />
      <div className="pipewireview2-product-view-container">
        <div className="pipewireview2-product-card">
          <div className="pipewireview2-product-images-section">
            {pipeWire.images && pipeWire.images.length > 0 ? (
              <div className="pipewireview2-product-image-grid">
                {pipeWire.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${config.apiURL}/${image}`}
                    alt={`PipeWire Image ${index + 1}`}
                    className="pipewireview2-product-image-item"
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

          <div className="pipewireview2-product-details-section">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="pipeBrand"
                  value={editData.pipeBrand || ""}
                  onChange={handleFieldChange}
                  placeholder="Pipe Brand"
                />
                <input
                  type="text"
                  name="pipeType"
                  value={editData.pipeType || ""}
                  onChange={handleFieldChange}
                  placeholder="Pipe Type"
                />
                <input
                  type="number"
                  name="pipeDiameter"
                  value={editData.pipeDiameter || ""}
                  onChange={handleFieldChange}
                  placeholder="Pipe Diameter"
                />
                <input
                  type="text"
                  name="description"
                  value={editData.description || ""}
                  onChange={handleFieldChange}
                  placeholder="Description"
                />
                <input
                  type="number"
                  name="price"
                  value={editData.price || ""}
                  onChange={handleFieldChange}
                  placeholder="Price"
                />
                {/* Add other fields as needed */}
              </>
            ) : (
              <>
                <h2 className="pipewireview2-product-title">
                  {pipeWire.pipeBrand || "N/A"}
                </h2>
                <p>
                  <strong>Seller Name:</strong> {pipeWire.name}
                </p>
                <p>
                  <strong>Type:</strong>{" "}
                  {pipeWire.Type === "Pipes" ? "Pipe" : "Wire"}
                </p>
                <p>
                  <strong>Diameter:</strong>{" "}
                  {pipeWire.pipeDiameter || pipeWire.wireDiameter}
                </p>
                <p>
                  <strong>Length:</strong>{" "}
                  {pipeWire.pipeLength || pipeWire.wireLength}
                </p>
                <p>
                  <strong>Quantity:</strong> {pipeWire.quantity}
                </p>
                <p>
                  <strong>Address:</strong> {pipeWire.sellerAddress}
                </p>
                <p>
                  <strong>Description:</strong> {pipeWire.description}
                </p>
                <p>
                  <strong>Price:</strong> {pipeWire.price} RPS
                </p>
              </>
            )}

            <div className="pipewireview2-action-buttons">
              {isEditing ? (
                <>
                  <Button
                    className="pipewireview2-save-button"
                    onClick={handleSaveEdit}
                    disabled={isProcessing}
                  >
                    Save
                  </Button>
                  <Button
                    className="pipewireview2-cancel-button"
                    onClick={handleCancelEdit}
                    disabled={isProcessing}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="pipewireview2-edit-button"
                    onClick={handleEditClick}
                  >
                    Edit
                  </Button>
                  <Button
                    className="pipewireview2-delete-button"
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

      {/* Modal for showing larger image */}
      {isModalOpen && (
        <div className="pipewireview2-modal-overlay" onClick={handleCloseModal}>
          <div className="pipewireview2-modal-content">
            <span className="pipewireview2-close-button" onClick={handleCloseModal}>
              X
            </span>
            <img
              src={selectedImage}
              alt="Enlarged View"
              className="pipewireview2-modal-image"
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

export default SellerPipeWireView;