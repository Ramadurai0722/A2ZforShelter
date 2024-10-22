
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feedback.css'; // For custom styling
import config from "../../config";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    rating: '',
    comments: '',
    name: '',
    email: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      axios
        .get(`${config.apiURL}/api/getprofile`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          const { username, email, phoneNumber } = response.data;
          setFeedback((prevData) => ({
            ...prevData,
            name: username,
            email,
            phoneNumber,
          }));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!feedback.rating) newErrors.rating = 'Please select a rating';
    if (!feedback.comments) newErrors.comments = 'Comments are required';
    if (!feedback.name) newErrors.name = 'Name is required';
    if (!feedback.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(feedback.email)) newErrors.email = 'Email is invalid';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post(`${config.apiURL}/feedback/send-feedback`, feedback);
      setMessage('Feedback sent successfully!');
    } catch (error) {
      setMessage('Error sending feedback.');
      console.error('Error sending feedback!', error);
    }

    setFeedback({ rating: '', comments: '', name: '', email: '' });
    setErrors({});
  };

  return (
    <div className="feedback-form-container">
    <div className="feedback-form">
      <h2 className="feedback-form__title">Feedback</h2>
      <form className="feedback-form__form" onSubmit={handleSubmit}>
        <label className="feedback-form__label">Rate your experience:</label>
        <div className="feedback-form__rating">
          <input
            type="radio"
            name="rating"
            value="bad"
            checked={feedback.rating === 'bad'}
            onChange={handleChange}
            className="feedback-form__radio"
          /> Bad
          <input
            type="radio"
            name="rating"
            value="good"
            checked={feedback.rating === 'good'}
            onChange={handleChange}
            className="feedback-form__radio"
          /> Good
          <input
            type="radio"
            name="rating"
            value="excellent"
            checked={feedback.rating === 'excellent'}
            onChange={handleChange}
            className="feedback-form__radio"
          /> Excellent
        </div>
        {errors.rating && <p className="feedback-form__error">{errors.rating}</p>}

        <label className="feedback-form__label">Comments:</label>
        <textarea
          name="comments"
          value={feedback.comments}
          onChange={handleChange}
          className="feedback-form__textarea"
          required
        />
        {errors.comments && <p className="feedback-form__error">{errors.comments}</p>}

        <button type="submit" className="feedback-form__submit">Submit Feedback</button>
      </form>

      {message && <p className="feedback-form__message">{message}</p>}
    </div>
    </div>
  );
};

export default FeedbackForm;
