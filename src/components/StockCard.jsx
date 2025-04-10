import { Card } from 'react-bootstrap'
import { motion } from 'framer-motion'

const StockCard = ({ title, value, trend }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className="h-100 border-0 shadow-sm">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="text-muted mb-2">{title}</h6>
            <span className={`badge ${trend === 'up' ? 'bg-success' : 'bg-danger'}`}>
              {trend === 'up' ? '↑' : '↓'}
            </span>
          </div>
          <h3 className="mb-0 fw-bold">{value}</h3>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default StockCard
