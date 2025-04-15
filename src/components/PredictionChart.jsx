import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const PredictionChart = ({ data }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    setIsDarkMode(root.classList.contains('dark'));
  }, []);

  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      {
        label: 'AAPL Price Prediction',
        data: data,
        borderColor: '#00ffff',
        backgroundColor: 'rgba(0,255,255,0.2)',
        tension: 0.4,
        pointBorderColor: '#00ffff',
        pointBackgroundColor: '#001f3f',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#ffffff' : '#000000',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000',
        },
        grid: {
          color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000',
        },
        grid: {
          color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        },
      },
    },
  };

  return (
    <div className="p-4 rounded-xl backdrop-blur-md bg-white/5 dark:bg-white/10 shadow-lg">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PredictionChart;
