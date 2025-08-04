import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { AuthContext } from '../context/AuthContext';
import '../css/Dashboard.css';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [flaggedCount, setFlaggedCount] = useState(0);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const { business, token } = useContext(AuthContext);



  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {

        await axios.get('http://localhost:5050/api/insights/summary', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const res = await axios.post('http://localhost:5050/api/business/feedbacks', { business }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = res.data.feedbacks;
        setFeedbacks(data);

        const total = data.reduce((acc, curr) => acc + curr.rating, 0);
        const avg = data.length ? (total / data.length).toFixed(1) : 0;
        setAverageRating(avg);

        const flagged = data.filter(f => f.isFlagged).length;
        setFlaggedCount(flagged);


      } catch (err) {
        console.error('Failed to fetch feedbacks', err);
      }
    };

    fetchFeedbacks();
  }, []);

  const monthlyCounts = Array(12).fill(0);

  const sentimentCounts = {
    POSITIVE: 0,
    NEUTRAL: 0,
    NEGATIVE: 0
  };

  feedbacks.forEach(fb => {
    if (fb.sentiment && sentimentCounts[fb.sentiment] !== undefined) {
      sentimentCounts[fb.sentiment]++;
    }
  });

  const sentimentChartData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: 'Sentiment',
        data: [
          sentimentCounts.POSITIVE,
          sentimentCounts.NEUTRAL,
          sentimentCounts.NEGATIVE
        ],
        backgroundColor: ['#C8E6C9', '#FFECB3', '#FFCDD2'],
        borderColor: ['#A5D6A7', '#FFE082', '#EF9A9A'],

        borderWidth: 1
      }
    ]
  };

  const sentimentChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };


  feedbacks.forEach((fb) => {
    const date = new Date(fb.createdAt);
    if (date.getFullYear() === currentYear) {
      monthlyCounts[date.getMonth()]++;
    }
  });

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: `Feedbacks in ${currentYear}`,
      data: monthlyCounts,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.3
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  const handleYearChange = (direction) => {
    setCurrentYear(prev => prev + direction);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard-main">
        <h1>Dashboard</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Feedback</h3>
            <p>{feedbacks.length}</p>
          </div>
          <div className="stat-card">
            <h3>Average Rating</h3>
            <p>{averageRating} ⭐</p>
          </div>
          <div className="stat-card danger">
            <h3>Flagged</h3>
            <p>{flaggedCount}</p>
          </div>
        </div>

        <div className='charts_details'>
          <div className="chart-card">
            <div className="chart-header">
              <h2>Feedback Trends</h2>
              <div>
                <button onClick={() => handleYearChange(-1)}>&lt; Prev</button>
                <span style={{ margin: '0 12px', fontWeight: '600' }}>{currentYear}</span>
                <button onClick={() => handleYearChange(1)}>Next &gt;</button>
              </div>
            </div>
            <Line data={chartData} options={chartOptions} />
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h2>Sentiment Overview</h2>
            </div>
            <Pie data={sentimentChartData} options={sentimentChartOptions} />
          </div>
        </div>

      </main>
    </div>
  );
}
