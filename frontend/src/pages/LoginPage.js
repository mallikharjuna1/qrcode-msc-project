import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5050/api/auth/login', {
        email,
        password,
      });

      const { business, token } = response.data;

      console.log(business, token);
      // Dispatch login
      dispatch({
        type: 'LOGIN',
        payload: {
          business,
          token,
        },
      });



      setError('');
      navigate('/dashboard');
      
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
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
          <h2 style={{ textAlign: 'center' }}>Login to Your Business</h2>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
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
          <button className="button" onClick={handleLogin}>Login</button>
          <p style={{ marginTop: '15px', textAlign: 'center' }}>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}


export default LoginPage;