import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';

// Register all necessary chart elements
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const PredictionChart = ({ data }) => {
  // Initialize dark mode based on whether the document has the 'dark' class
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  // Use a MutationObserver to update dark mode status live
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Construct chart data with contrasting colors based on theme
  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      {
        label: 'AAPL Price Prediction',
        data: data,
        borderColor: isDarkMode ? '#00ffc3' : '#0d6efd', // Neon for dark, blue for light
        backgroundColor: isDarkMode ? 'rgba(0, 255, 195, 0.2)' : 'rgba(13, 110, 253, 0.2)',
        tension: 0.4,
        borderWidth: 3,           // Thicker line for visibility
        pointBorderColor: isDarkMode ? '#00ffc3' : '#0d6efd',
        pointBackgroundColor: isDarkMode ? '#001f3f' : '#ffffff',
        pointRadius: 5,
      },
    ],
  };

  // Configure chart options for better contrast and styling
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#ffffff' : '#000000',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(50,50,50,0.8)' : 'rgba(255,255,255,0.9)',
        titleColor: isDarkMode ? '#ffffff' : '#000000',
        bodyColor: isDarkMode ? '#ffffff' : '#000000',
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000',
          font: { size: 14 },
        },
        grid: {
          color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000',
          font: { size: 14 },
        },
        grid: {
          color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        },
        // You can set beginAtZero to false if you want auto-scale based on data
        beginAtZero: false,
        // Optionally set min/max if your data range is known, for example:
        // min: 100,
        // max: 200,
      },
    },
  };

  return (
    <div className="glass-card">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PredictionChart;
