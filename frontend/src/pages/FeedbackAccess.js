
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FeedbackAccess = () => {
  const { businessId } = useParams();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:5050/api/access/feedback/feedback-request`, {
        businessId,
        email,
      });
      console.log(res);
      setMessage(res.data.message || 'Code sent to your email.');
      setError('');
      setStep(2);
    } catch (err) {
      setError('Failed to send code. Please try again.');
      setMessage('');
    }
  };

  const handleCodeSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:5050/api/access/feedback/verify-code`, {
        businessId,
        email,
        code,
      });

      console.log(res);

      if (res.data.success) {
        navigate(`/feedback-form/${businessId}`, { state: { accessGranted: true } });
      } else {
        setError('Invalid code. Please check and try again.');
        setMessage('');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
      setMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Access Feedback Form</h2>
      <p style={styles.subtitle}>
        {step === 1
          ? 'Enter your email to receive a one-time access code.'
          : 'Enter the verification code sent to your email.'}
      </p>

      <input
        type={step === 1 ? 'email' : 'text'}
        value={step === 1 ? email : code}
        onChange={(e) => (step === 1 ? setEmail(e.target.value) : setCode(e.target.value))}
        placeholder={step === 1 ? 'Your email address' : 'Verification code'}
        style={styles.input}
      />

      <button
        onClick={step === 1 ? handleEmailSubmit : handleCodeSubmit}
        style={styles.button}
      >
        {step === 1 ? 'Send Code' : 'Verify & Proceed'}
      </button>

      {message && <p style={{ ...styles.message, color: 'green' }}>{message}</p>}
      {error && <p style={{ ...styles.message, color: 'red' }}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '400px',
    margin: '5vh auto',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    marginBottom: '1rem',
    fontSize: '1.8rem',
    color: '#333',
  },
  subtitle: {
    marginBottom: '1.5rem',
    color: '#555',
    fontSize: '0.95rem',
  },
  input: {
    width: '92%',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    marginBottom: '1.25rem',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: '#3A5A99',
    color: '#fff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '1rem',
    fontSize: '0.95rem',
  },
};

export default FeedbackAccess;
