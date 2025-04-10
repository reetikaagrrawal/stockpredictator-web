import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PredictionChart = ({ symbol, predictions }) => {
  if (!predictions?.length) return null;

  const labels = predictions.map((_, index) => `Day ${index + 1}`);
  const data = {
    labels,
    datasets: [
      {
        label: `${symbol} Price Prediction`,
        data: predictions,
        borderColor: 'rgba(13, 110, 253, 0.9)',
        backgroundColor: 'rgba(13, 110, 253, 0.3)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  return <Line data={data} />;
};

export default PredictionChart;
