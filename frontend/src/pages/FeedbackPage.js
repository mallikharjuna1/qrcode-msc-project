import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import "../css/FeedbackPage.css";

const FeedbackPage = () => {
  const { businessId } = useParams();
  const [services, setServices] = useState([]);
  const [businessName, setBusinessName] = useState('');
  const [feedbacks, setFeedbacks] = useState({});
  const [message, setMessage] = useState('');
  const [blink, setBlink] = useState(false);

  const location = useLocation();
  const accessGranted = location.state?.accessGranted;

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/feedback/business/${businessId}`);
        setBusinessName(res.data.name);
        setServices(res.data.services);
      } catch (err) {
        console.error('Failed to fetch business data');
      }
    };
    fetchBusiness();
  }, [businessId]);

  const handleSubmit = async (index, serviceName) => {
    const fb = feedbacks[index];
    if (!fb?.rating || !fb?.comment) {
      setMessage('Please provide both rating and comment.');
      setBlink(true);
      return;
    }

    try {
      await axios.post(`http://localhost:5050/api/feedback/business/${businessId}`, {
        serviceName,
        rating: fb.rating,
        comment: fb.comment
      });

      setMessage(`Feedback submitted for "${serviceName}"`);
      setBlink(true);
      setFeedbacks(prev => ({
        ...prev,
        [index]: { rating: '', comment: '' }
      }));
    } catch (err) {
      setMessage('Error submitting feedback.');
      setBlink(true);
    }
  };

  useEffect(() => {
    if (blink) {
      const timer = setTimeout(() => setBlink(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [blink]);

  const handleInputChange = (index, field, value) => {
    setFeedbacks(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value
      }
    }));
  };

  if (!accessGranted) return <Navigate to="/" />;

  return (
    <div className="feedback-container">
      <h2 className="page-title">Feedback for {businessName}</h2>
      {services.map((service, index) => (
        <div key={index} className="feedback-card">
          <img src={`http://localhost:5050${service.image}`} alt={service.name} className="service-image" />
          <div className="feedback-content">
            <h3>{service.name}</h3>
            <p className="service-desc">{service.description}</p>
            <p>£{service.price}</p>

            <div className="input-group">
              <label htmlFor={`rating-${index}`}>Rating (1-5)</label>
              <input
                id={`rating-${index}`}
                type="number"
                min="1"
                max="5"
                value={feedbacks[index]?.rating || ''}
                onChange={e => handleInputChange(index, 'rating', e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor={`comment-${index}`}>Comment</label>
              <textarea
                id={`comment-${index}`}
                placeholder="Write your comment..."
                value={feedbacks[index]?.comment || ''}
                onChange={e => handleInputChange(index, 'comment', e.target.value)}
              />
            </div>

            <button className="submit-btn" onClick={() => handleSubmit(index, service.name)}>
              Submit Feedback
            </button>
          </div>
        </div>
      ))}

      {message && (
        <p className={`feedback-message ${blink ? 'blink' : ''}`}>{message}</p>
      )}
    </div>
  );
};

export default FeedbackPage;
