import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const QRPage = () => {
  const [qrCode, setQrCode] = useState('');
  const [feedbackUrl, setFeedbackUrl] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return;
    const fetchQRCode = async () => {
      try {
        const res = await axios.get('http://localhost:5050/api/qr', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setQrCode(res.data.qrCodeImage);
        setFeedbackUrl(res.data.feedbackUrl);
      } catch (error) {
        console.error('Failed to load QR code', error);
      }
    };

    fetchQRCode();
  }, [token]);

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Sidebar />
      <main style={{
        flex: 1,
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Your Feedback QR Code</h2>

        <div style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%'
        }}>
          {qrCode ? (
            <>
              <img
                src={qrCode}
                alt="Feedback QR Code"
                style={{
                  width: '100%',
                  maxWidth: '250px',
                  marginBottom: '15px'
                }}
              />
              <p style={{ fontSize: '14px', wordWrap: 'break-word' }}>
                <strong>Link:</strong>{' '}
                <a href={feedbackUrl} target="_blank" rel="noopener noreferrer">
                  {feedbackUrl}
                </a>
              </p>
            </>
          ) : (
            <p style={{ fontSize: '16px', color: '#777' }}>Loading QR code...</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default QRPage;
