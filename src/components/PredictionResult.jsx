// src/components/PredictionResult.jsx
import { motion } from 'framer-motion'
import { Card } from 'react-bootstrap'

const PredictionResult = ({ symbol, predictions }) => {
  if (!predictions?.length) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="my-5"
    >
      <Card className="glass-card p-4 shadow-lg border-0">
        <h4 className="text-center fw-bold mb-3">📊 Prediction for {symbol}</h4>
        <ul className="list-unstyled text-center">
          {predictions.map((price, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-2"
            >
              <span className="fw-medium">Day {index + 1}</span>: ₹ {price.toFixed(2)}
            </motion.li>
          ))}
        </ul>
      </Card>
    </motion.div>
  )
}

export default PredictionResult
