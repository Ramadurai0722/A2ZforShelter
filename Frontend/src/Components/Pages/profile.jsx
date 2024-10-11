import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import "./profile.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: "",
    phoneNumber: "",
    gender: "",
    about: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await fetch(`${config.apiURL}/api/getprofile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setFormData({
            username: data.username,
            email: data.email,
            age: data.age,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            about: data.about,
            profileImage: data.profileImage,
          });
          setImagePreview(
            data.profileImage ? `${config.apiURL}/${data.profileImage}` : ""
          );
        } else {
          console.error("Failed to fetch profile", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDashBaord = () => {
    navigate("/sellDashBoard");
  };

  const handleFav = () => {
    navigate("/favcategory");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/Login", { replace: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      if (file) {
        formDataToSend.append("profileImage", file);
      }

      const response = await fetch(`${config.apiURL}/api/updateprofile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setIsEditing(false);
      } else {
        console.error("Failed to update profile", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const showOverlay = () => setIsOverlayVisible(true);
  const hideOverlay = () => setIsOverlayVisible(false);

  return (
    <>
      <Navbar />
      <div className="profile-card-container">
        <div className="profile-card">
          <h2>{isEditing ? "Edit Profile" : "Profile"}</h2>
          {loading ? (
            <div className="loading-indicator">
              <p>Loading...</p>
            </div>
          ) : isEditing ? (
            <div className="profile-info">
              <div className="profile-image-container">
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="profile-image"
                  onClick={() => document.getElementById("file-input").click()}
                />
                <input
                  type="file"
                  id="file-input"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
              <p>Change profile Image</p>
              <label>
                Name:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-input"
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </label>
              <label>
                Age:
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="form-input"
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="form-input"
                />
              </label>
              <label>
                Gender:
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>
                About:
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  className="form-textarea"
                />
              </label>
              <div className="button-group">
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-info">
              <div className="profile-image-container">
                <img
                  src={
                    userData?.profileImage
                      ? `${config.apiURL}/${userData.profileImage}`
                      : "/media/profile.jpg"
                  }
                  alt="Profile"
                  className="profile-image"
                  onClick={showOverlay}
                />
              </div>
              <div className="profile-details">
                <p>
                  <strong>Name:</strong> {userData?.username}
                </p>
                <p>
                  <strong>Email:</strong> {userData?.email}
                </p>
                <p>
                  <strong>Age:</strong> {userData?.age}
                </p>
                <p>
                  <strong>Phone Number:</strong> {userData?.phoneNumber}
                </p>
                <p>
                  <strong>Gender:</strong> {userData?.gender}
                </p>
                <p>{userData?.about}</p>
              </div>
              <div className="button-group">
                <button
                  className="edit-profile-button"
                  onClick={handleEditClick}
                >
                  Edit Profile
                </button>
                <button className="dashboard-button" onClick={handleDashBaord}>
                  DashBoard
                </button>

                <button className="dashboard-button" onClick={handleFav}>
                  My Favourites
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {isOverlayVisible && (
        <div className="overlay">
          <div className="overlay-content">
            <button className="close-button" onClick={hideOverlay}>
              X
            </button>
            <img src={imagePreview} alt="Profile" className="overlay-image" />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Profile;
