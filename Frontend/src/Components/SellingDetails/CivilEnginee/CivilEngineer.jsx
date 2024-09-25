// import React, { useState } from 'react';
// // import "./Agent.css";

// const CivilEngineer= () => {
//   const [formData, setFormData] = useState({
//     Name: '',
//     email: '',
//     projectName: '',
//     phoneNumber: '',
//     describe: '',
//     file: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, file: e.target.files[0] });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     // Add form submission logic here (e.g., API call)
//   };

//   return (
//     <form onSubmit={handleSubmit} className="registration-form">
//       <h2>Engineer Registration Form</h2>
      
//       <label htmlFor="Name">Name *</label>
//       <div className="name-fields">
//         <input
//           type="text"
//           name="Name"
//           placeholder="First Name"
//           value={formData.Name}
//           onChange={handleChange}
//           required
//         />
      
//       </div>

//       <label htmlFor="email">Email *</label>
//       <input
//         type="email"
//         name="email"
//         placeholder="example@example.com"
//         value={formData.email}
//         onChange={handleChange}
//         required
//       />

//       <label htmlFor="projectName">Constrction Name</label>
//       <input
//         type="text"
//         name="projectName"
//         value={formData.projectName}
//         onChange={handleChange}
//       />

//       <label htmlFor="phoneNumber">Phone Number *</label>
//       <input
//         type="tel"
//         name="phoneNumber"
//         value={formData.phoneNumber}
//         onChange={handleChange}
//         required
//       />

//       <label htmlFor="describe">Describe our Project</label>
//       <textarea
//         name="describe"
//         value={formData.describe}
//         onChange={handleChange}
//       ></textarea>

//       <label htmlFor="file">Upload File</label>
//       <input
//         type="file"
//         name="file"
//         onChange={handleFileChange}
//       />

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default CivilEngineer;





import React, { useState } from 'react';
// import "./Agent.css";

const CivilEngineer = () => {
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    projectName: '',
    phoneNumber: '',
    describe: '',
    file: null,
    constructionType: '',
    experience: '',
    servicesProvided: [],
    location: '',
    availability: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const newServices = checked
      ? [...formData.servicesProvided, value]
      : formData.servicesProvided.filter((service) => service !== value);
    setFormData({ ...formData, servicesProvided: newServices });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add form submission logic here (e.g., API call)
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h2>Engineer Registration Form</h2>

      {/* Name */}
      <label htmlFor="Name">Name *</label>
      <div className="name-fields">
        <input
          type="text"
          name="Name"
          placeholder="Full Name"
          value={formData.Name}
          onChange={handleChange}
          required
        />
      </div>

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

      {/* Project Name */}
      <label htmlFor="projectName">Construction Name</label>
      <input
        type="text"
        name="projectName"
        placeholder="Project Name"
        value={formData.projectName}
        onChange={handleChange}
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

      {/* Upload File */}
      <label htmlFor="file">Upload File</label>
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
      />

      {/* Submit Button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CivilEngineer;
