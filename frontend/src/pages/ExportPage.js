import React, { useContext, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../css/ExportPage.css'; 

export default function ExportPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const { token, business } = useContext(AuthContext);

  const handleExport = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5050/api/reports/export`,
        {
          params: {
            start: startDate,
            end: endDate,
            businessId: business.id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob',
        }
      );

      if (response.status !== 200) {
        throw new Error('Failed to generate PDF report');
      }

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Feedback_Report_${startDate}_to_${endDate}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      alert('Something went wrong while exporting the report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <h1 className="page-title">Export Feedback Report</h1>
        <div className="form-section">
          <label className="label">Select Date Range:</label>
          <div className="date-inputs">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="date-picker"
            />
            <span className="to-label">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="date-picker"
            />
          </div>
          <button
            className="export-button"
            onClick={handleExport}
            disabled={loading}
          >
            {loading ? 'Exporting...' : 'Export as PDF'}
          </button>
        </div>
      </main>
    </div>
  );
}
