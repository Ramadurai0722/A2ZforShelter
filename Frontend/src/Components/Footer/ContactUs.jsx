// import React, { useState } from 'react';

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     issueType: 'Feedback',
//     message: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Data Submitted: ', formData);
//     // Here you can handle form submission logic (API call or email service)
//   };

//   return (
//     <div className="contact-form">
//       <h2>How can we help?</h2>
//       <p>help</p>
//       <p>
//         Fill out the form below, and we’ll get back to you soon. All orders will appear on your billing statement.
//       </p>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Please enter your name"
//             required
//           />
//         </div>

//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Please enter your email"
//             required
//           />
//         </div>

//         <div>
//           <label>Issue Type</label>
//           <select
//             name="issueType"
//             value={formData.issueType}
//             onChange={handleChange}
//           >
//             <option value="Feedback">Feedback</option>
//             <option value="Billing">Catagories</option>
//             <option value="Billing">Payment</option>
//             <option value="My Account">My Account</option>
//             <option value="Technical">Technical</option>
//             <option value="Other">Other / not listed</option>
//           </select>
//         </div>

//         <div>
//           <label>What can we help you with?</label>w
//           <textarea
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             placeholder="Describe your issue or feedback"
//             required
//           />
//         </div>

//         <button type="submit">Send Message</button>
//       </form>

//       <div className="contact-info">
//         <h3>TamilNadu</h3>
//         <p>000-000-0000<br />9am to 8pm Monday to Friday </p>

//         <h3>Delhi</h3>
//         <p>0-000-000-000<br />9am to 8pm Monday to Friday</p>

//         <h3>Kerala</h3>
//         <p>0000-000-000<br />9am to 8pm Monday to Friday </p>

//         <h3>Karnataka</h3>
//         <p>0000-000-000<br />9am to 8pm Monday to Friday </p>
//       </div>
//     </div>
//   );
// };

// export default ContactForm;









import React, { useState } from 'react';
import './ContactForm.css'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueType: 'Feedback',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted: ', formData);
    // Here you can handle form submission logic (API call or email service)
  };

  return (
    <div className="contact-form-container">
      <h2 className="contact-form-title">How can we help?</h2>
      <p className="contact-form-help-text">Fill out the form below, and we’ll get back to you soon. All orders will appear on your billing statement.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-group">
          <label className="contact-form-label">Name</label>
          <input
            className="contact-form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Please enter your name"
            required
          />
        </div>

        <div className="contact-form-group">
          <label className="contact-form-label">Email</label>
          <input
            className="contact-form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Please enter your email"
            required
          />
        </div>

        <div className="contact-form-group">
          <label className="contact-form-label">Issue Type</label>
          <select
            className="contact-form-select"
            name="issueType"
            value={formData.issueType}
            onChange={handleChange}
          >
            <option value="Feedback">Feedback</option>
            <option value="Billing">Catagories</option>
            <option value="Billing">Payment</option>
            <option value="My Account">My Account</option>
            <option value="Technical">Technical</option>
            <option value="Other">Other / not listed</option>
          </select>
        </div>

        <div className="contact-form-group">
          <label className="contact-form-label">What can we help you with?</label>
          <textarea
            className="contact-form-textarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe your issue or feedback"
            required
          />
        </div>

        <button className="contact-form-submit" type="submit">Send Message</button>
      </form>

      <div className="contact-form-info">
        <h3>TamilNadu</h3>
        <p>000-000-0000<br />9am to 8pm Monday to Friday </p>

        <h3>Delhi</h3>
        <p>0-000-000-000<br />9am to 8pm Monday to Friday</p>

        <h3>Kerala</h3>
        <p>0000-000-000<br />9am to 8pm Monday to Friday </p>

        <h3>Karnataka</h3>
        <p>0000-000-000<br />9am to 8pm Monday to Friday </p>
      </div>
    </div>
  );
};

export default ContactForm;
