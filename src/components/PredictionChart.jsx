import React from 'react';
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
import { useTheme } from 'next-themes';

// Register chart elements
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const PredictionChart = ({ data }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  const labels = data.map((_, i) => `Day ${i + 1}`);
  const lastPrediction = data[data.length - 1]?.toFixed(2);

  // Dynamic y-axis range padding
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const padding = (maxValue - minValue) * 0.1 || 1; // prevent 0 padding if values are flat

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'AAPL Price Prediction',
        data: data,
        borderColor: isDarkMode ? '#00ffc3' : '#0d6efd',
        backgroundColor: isDarkMode ? 'rgba(0, 255, 195, 0.2)' : 'rgba(13, 110, 253, 0.2)',
        tension: 0.4,
        borderWidth: 4,
        pointBorderColor: isDarkMode ? '#00ffc3' : '#0d6efd',
        pointBackgroundColor: isDarkMode ? '#001f3f' : '#ffffff',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#ffffff' : '#000000',
          font: { size: 16 },
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(50,50,50,0.9)' : 'rgba(255,255,255,0.95)',
        titleColor: isDarkMode ? '#00ffc3' : '#0d6efd',
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
          color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
        },
      },
      y: {
        beginAtZero: false,
        min: minValue - padding,
        max: maxValue + padding,
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000',
          font: { size: 14 },
        },
        grid: {
          color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
        },
      },
    },
  };

  return (
    <div className="glass-card p-6 rounded-2xl shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-primary tracking-wide">
          📈 AAPL Price Prediction
        </h2>
        {lastPrediction && (
          <div className="text-lg text-accent font-medium">
            Final predicted price: <span className="font-bold">${lastPrediction}</span>
          </div>
        )}
      </div>

      {/* Chart with glow via shadow */}
      <div className="relative z-10 drop-shadow-[0_0_10px_rgba(0,255,195,0.3)]">
        <Line data={chartData} options={options} />
      </div>

      {/* Value Labels */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-center">
        {data.map((value, i) => (
          <div
            key={i}
            className="text-sm text-muted-foreground bg-background/30 rounded-xl py-1 px-2 backdrop-blur-sm border border-border/30"
          >
            Day {i + 1}: <span className="font-semibold">${value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionChart;
