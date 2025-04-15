import { useState } from 'react'
import { motion } from 'framer-motion'
import { Form, Button, Container, Row, Col, FloatingLabel } from 'react-bootstrap'

const StockInputForm = ({ onSubmit }) => {
  const [stockSymbol, setStockSymbol] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (stockSymbol.trim()) {
      onSubmit(stockSymbol.trim().toUpperCase())
      setStockSymbol('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="py-5"
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Form onSubmit={handleSubmit} className="glass-card p-4 rounded-4 shadow-lg">
              <h3 className="text-center mb-4 fw-bold gradient-text">
                <span className="display-6">🔍</span> Predict Stock Prices
              </h3>
              <FloatingLabel label="Enter Stock Symbol (e.g. AAPL, TSLA)" className="mb-4">
                <Form.Control
                  type="text"
                  placeholder="AAPL"
                  value={stockSymbol}
                  onChange={(e) => setStockSymbol(e.target.value)}
                  className="rounded-3 border-2"
                  style={{ color: 'var(--text-color)', backgroundColor: 'transparent' }}
                />
              </FloatingLabel>
              <div className="d-grid">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary btn-lg fw-semibold rounded-3"
                  type="submit"
                >
                  Predict 📈
                </motion.button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </motion.div>
  )
}

export default StockInputForm
