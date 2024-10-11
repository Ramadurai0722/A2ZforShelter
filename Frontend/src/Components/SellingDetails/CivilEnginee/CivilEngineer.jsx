import React, { useState, useEffect } from 'react';
import config from '../../../config';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const CivilEngineer = () => {
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    projectName: '',
    phoneNumber: '',
    describe: '',
    constructionType: '',
    experience: '',
    servicesProvided: [],
    location: '',
    availability: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem('authToken');

      if (authToken) {
        try {
          const response = await axios.get(`${config.apiURL}/api/getprofile`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          const { username, email, phoneNumber } = response.data;
          setFormData((prevData) => ({
            ...prevData,
            Name: username,
            email,
            phoneNumber,
          }));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const newServices = checked
      ? [...formData.servicesProvided, value]
      : formData.servicesProvided.filter((service) => service !== value);
    setFormData({ ...formData, servicesProvided: newServices });
  };

  const validateForm = () => {
    let isValid = true;

    for (const [key, value] of Object.entries(formData)) {
      if (key !== 'servicesProvided' && !value) {
        setSnackbarMessage(`${key} is required.`);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        isValid = false;
        break;
      }
    }

    if (formData.servicesProvided.length === 0) {
      setSnackbarMessage('At least one service must be provided.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop the submission if the form is not valid
    }

    const jsonData = {
      ...formData,
      servicesProvided: formData.servicesProvided.join(','),
    };

    try {
      const response = await fetch(`${config.apiURL}/civil/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok: ${errorData.message}`);
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data);
      setSnackbarMessage('Form submitted successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSnackbarMessage('Error submitting form. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const resetForm = () => {
    setFormData({
      Name: '',
      email: '',
      projectName: '',
      phoneNumber: '',
      describe: '',
      constructionType: '',
      experience: '',
      servicesProvided: [],
      location: '',
      availability: '',
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Engineer Registration Form</h2>

        {/* Name */}
        <label htmlFor="Name">Name *</label>
        <input
          type="text"
          name="Name"
          placeholder="Full Name"
          value={formData.Name}
          onChange={handleChange}
          readOnly
          required
        />

        {/* Email */}
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          name="email"
          placeholder="example@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Phone Number */}
        <label htmlFor="phoneNumber">Phone Number *</label>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          readOnly
          required
        />

        {/* Project Name */}
        <label htmlFor="projectName">Construction Name</label>
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          value={formData.projectName}
          onChange={handleChange}
        />

        {/* Describe Project */}
        <label htmlFor="describe">Describe Your Project</label>
        <textarea
          name="describe"
          placeholder="Brief description of your project"
          value={formData.describe}
          onChange={handleChange}
        ></textarea>

        {/* Type of Construction */}
        <label htmlFor="constructionType">Type of Construction *</label>
        <select
          name="constructionType"
          value={formData.constructionType}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Construction Type</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Industrial">Industrial</option>
          <option value="Infrastructure">Infrastructure</option>
        </select>

        {/* Years of Experience */}
        <label htmlFor="experience">Years of Experience *</label>
        <input
          type="number"
          name="experience"
          placeholder="Years of Experience"
          value={formData.experience}
          onChange={handleChange}
          required
        />

        {/* Construction Services Provided */}
        <label>Services Provided *</label>
        <div className="services-checkbox">
          {['Architecture', 'Civil Engineering', 'Plumbing', 'Electrical', 'Structural Engineering'].map((service) => (
            <div key={service}>
              <label>
                <input
                  type="checkbox"
                  value={service}
                  checked={formData.servicesProvided.includes(service)}
                  onChange={handleCheckboxChange}
                />
                {service}
              </label>
            </div>
          ))}
        </div>

        {/* Location */}
        <label htmlFor="location">Location of Operation *</label>
        <input
          type="text"
          name="location"
          placeholder="City/State"
          value={formData.location}
          onChange={handleChange}
          required
        />

        {/* Availability */}
        <label htmlFor="availability">Availability *</label>
        <select
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Availability</option>
          <option value="Full-Time">Contract-based</option>
          <option value="Part-Time">SemiContract-based</option>
          <option value="Freelance">Freelance</option>
        </select>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>

      {/* Snackbar for feedback */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      {/* Internal CSS */}
      <style>
        {`
         .registration-form {
          background-color: white; 
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 20px auto;
          margin-top: 100px;  
          margin-bottom: 50px;
}

          }

          .registration-form h2 {
            text-align: center;
            color: #333;
          }

          .registration-form label {
            margin: 10px 0 5px;
            display: block;
          }

          .registration-form input,
          .registration-form select,
          .registration-form textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
          }

          .registration-form button {
            background-color: #1890ff;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 10px 15px;
            cursor: pointer;
            font-size: 16px;
          }

          @media (max-width: 600px) {
            .registration-form {
              padding: 15px;
            }

            .registration-form input,
            .registration-form select,
            .registration-form textarea {
              font-size: 14px;
            }

            .registration-form button {
              padding: 8px 10px;
              font-size: 14px;
            }
          }
        `}
      </style>
      <Footer />
    </>
  );
};

export default CivilEngineer;
