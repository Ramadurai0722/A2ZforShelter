import React, { useState } from 'react';

const BoreWell = () => {
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    phoneNumber: '',
    description: '',
    borewellDepth: '',
    waterSourceType: '',
    drillingType: '',
    location: '',
    equipmentDetails: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add form submission logic (e.g., API call)
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h2>Borewell Services Registration Form</h2>

      {/* Name */}
      <label htmlFor="Name">Name *</label>
      <input
        type="text"
        name="Name"
        placeholder="Full Name"
        value={formData.Name}
        onChange={handleChange}
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
        required
      />

      {/* Borewell Depth */}
      <label htmlFor="borewellDepth">Borewell Depth (in feet) *</label>
      <input
        type="number"
        name="borewellDepth"
        placeholder="Enter depth"
        value={formData.borewellDepth}
        onChange={handleChange}
        required
      />

      {/* Water Source Type */}
      <label htmlFor="waterSourceType">Water Source Type *</label>
      <select
        name="waterSourceType"
        value={formData.waterSourceType}
        onChange={handleChange}
        required
      >
        <option value="">--Select Water Source--</option>
        <option value="groundwater">Groundwater</option>
        <option value="surface-water">Surface Water</option>
      </select>

      {/* Drilling Type */}
      <label htmlFor="drillingType">Drilling Type *</label>
      <select
        name="drillingType"
        value={formData.drillingType}
        onChange={handleChange}
        required
      >
        <option value="">--Select Drilling Type--</option>
        <option value="rotary-drilling">Rotary Drilling</option>
        <option value="percussion-drilling">Percussion Drilling</option>
      </select>

      {/* Location */}
      <label htmlFor="location">Location *</label>
      <input
        type="text"
        name="location"
        placeholder="Enter location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      {/* Equipment Details */}
      <label htmlFor="equipmentDetails">Equipment Details *</label>
      <textarea
        name="equipmentDetails"
        placeholder="Specify equipment used"
        value={formData.equipmentDetails}
        onChange={handleChange}
        required
      ></textarea>

      {/* Description */}
      <label htmlFor="description">Additional Description</label>
      <textarea
        name="description"
        placeholder="Additional details about the borewell project"
        value={formData.description}
        onChange={handleChange}
      ></textarea>

      {/* Submit Button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default BoreWell;
