import React, { useState } from 'react';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    rating: '',
    comments: '',
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({
      ...feedback,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    console.log('Feedback submitted:', feedback);
  };

  return (
    <div>
      <h2>Feedback</h2>
      <div className="mb-4 small">Please provide your feedback in the form below</div>
      <form id="feedback_form" onSubmit={handleSubmit}>
        <label>How do you rate your overall experience?</label>
        <div className="mb-3 d-flex flex-row py-1">
          <div className="form-check mr-3">
            <input
              className="form-check-input"
              type="radio"
              name="rating"
              id="rating_bad"
              value="bad"
              checked={feedback.rating === 'bad'}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="rating_bad">
              Bad
            </label>
          </div>

          <div className="form-check mx-3">
            <input
              className="form-check-input"
              type="radio"
              name="rating"
              id="rating_good"
              value="good"
              checked={feedback.rating === 'good'}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="rating_good">
              Good
            </label>
          </div>

          <div className="form-check mx-3">
            <input
              className="form-check-input"
              type="radio"
              name="rating"
              id="rating_excellent"
              value="excellent"
              checked={feedback.rating === 'excellent'}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="rating_excellent">
              Excellent!
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="feedback_comments">
            Comments:
          </label>
          <textarea
            className="form-control"
            required
            rows="6"
            name="comments"
            id="feedback_comments"
            value={feedback.comments}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <div className="col">
            <label className="form-label" htmlFor="feedback_name">
              Your Name:
            </label>
            <input
              type="text"
              required
              name="name"
              className="form-control"
              id="feedback_name"
              value={feedback.name}
              onChange={handleChange}
            />
          </div>

          <div className="col mb-4">
            <label className="form-label" htmlFor="feedback_email">
              Email:
            </label>
            <input
              type="email"
              name="email"
              required
              className="form-control"
              id="feedback_email"
              value={feedback.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success btn-lg">
          Post
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
