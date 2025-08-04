import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import FeedbackTable from './pages/FeedbackTable';
import ExportPage from './pages/ExportPage';
import QRPage from './pages/QRPage';

import './App.css';
import FeedbackPage from './pages/FeedbackPage';
import ServicesPage from './pages/ServicePage';
import FeedbackAccess from './pages/FeedbackAccess';
import PrivateRoute from './routes/PrivateRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
        <Route path="/feedback-table" element={<PrivateRoute><FeedbackTable /> </PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><ExportPage /></PrivateRoute>} />
        <Route path="/services" element={<PrivateRoute><ServicesPage /></PrivateRoute>} />
        <Route path="/qr" element={<PrivateRoute><QRPage /></PrivateRoute>} />
        
        {/* For customers */}
        <Route path="/feedback/:businessId" element={<FeedbackAccess />} />
        <Route path="/feedback-form/:businessId" element={<FeedbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
