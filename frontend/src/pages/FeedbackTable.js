import { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../css/FeedbackTable.css';
import { CiWarning } from "react-icons/ci";

function FeedbackTable() {
  const [services, setServices] = useState([]);
  const { business, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        await axios.get('http://localhost:5050/api/insights/summary', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const res = await axios.post(
          `http://localhost:5050/api/business/feedbacks`,
          { business },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setServices(res.data.feedbacks);
      } catch (err) {
        console.error('Failed to fetch feedbacks', err);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '30px' }}>
        <h1>Feedback Table</h1>
        <div className="table-container">
          {services.length === 0 ? (
            <p style={{ padding: '20px', color: '#555' }}>No feedback found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Rating</th>
                  <th>Service Category</th>
                  <th>Comment</th>
                  <th>Sentiment</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={index}>
                    <td>{new Date(service.createdAt).toLocaleDateString()}</td>
                    <td>{service.rating}</td>
                    <td>{service.service}</td>
                    <td>{service.comment}</td>
                    <td><span className={`sentiment-label sentiment-${String(service?.sentiment).toLowerCase()}`}> {service?.sentiment} </span></td>
                    <td>{service.isFlagged && <CiWarning style={{ color: 'orange', fontSize: "2rem" }} />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default FeedbackTable;
