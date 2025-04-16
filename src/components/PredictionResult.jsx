import { motion } from 'framer-motion';
import { Card } from 'react-bootstrap';
import { useTheme } from 'next-themes';

const PredictionResult = ({ symbol, predictions }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  if (!predictions?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="my-5"
    >
      <Card
        className="glass-card p-4 shadow-lg border-0 backdrop-blur-md"
        style={{
          backgroundColor: isDarkMode
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(0, 0, 0, 0.03)',
        }}
      >
        <h4
          className="text-center fw-bold mb-3"
          style={{ color: isDarkMode ? '#00ffc3' : '#0d6efd' }}
        >
          📊 Prediction for {symbol}
        </h4>
        <ul className="list-unstyled text-center">
          {predictions.map((price, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-2"
              style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
            >
              <span className="fw-medium">Day {index + 1}</span>:{' '}
              <span className="fw-bold">₹ {price.toFixed(2)}</span>
            </motion.li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
};

export default PredictionResult;
