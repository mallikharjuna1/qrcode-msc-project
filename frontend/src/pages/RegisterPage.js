import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {
  const { dispatch } = useContext(AuthContext);

  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5050/api/auth/register', {
        name: businessName,
        email,
        password
      });

      console.log(response);

      const { business, token } = response.data;

      dispatch({
        type: 'LOGIN',
        payload: {
          business,
          token
        }
      });

      localStorage.setItem('business', JSON.stringify(business));
    
      setError('');
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{
        flex: 1,
        background: "url('/first-image.jpg') center/cover no-repeat",
      }}></div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '400px' }}>
          <h2 style={{ textAlign: 'center' }}>Register Your Business</h2>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <input
            type="text"
            placeholder="Business Name"
            className="input"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="button" onClick={handleRegister}>Register</button>
          <p style={{ marginTop: '15px', textAlign: 'center' }}>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
