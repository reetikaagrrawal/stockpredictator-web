import { motion } from 'framer-motion';
import { Card } from 'react-bootstrap';
import { FaChartLine } from 'react-icons/fa'; // new icon for professional feel

const PredictionResult = ({ symbol, predictions }) => {
  if (!predictions?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="my-5"
    >
      <Card className="glass-card p-4 shadow-lg border-0 dark:bg-white/10 bg-white/20 backdrop-blur-md transition">
        <div className="flex items-center justify-center gap-2 mb-3">
          {/* Floating chart icon with glow */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="text-cyan-400 drop-shadow-glow"
          >
            <FaChartLine size={22} />
          </motion.div>
          <h4 className="text-center fw-bold m-0 text-lg md:text-xl" style={{ color: 'var(--text-color)' }}>
            Prediction for {symbol}
          </h4>
        </div>

        <ul className="list-unstyled text-center">
          {predictions.map((price, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-2 text-base font-medium"
              style={{ color: 'var(--text-color)' }}
            >
              <span className="font-semibold">Day {index + 1}</span>: ₹ {price.toFixed(2)}
            </motion.li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
};

export default PredictionResult;
