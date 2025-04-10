import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { Moon, Sun } from 'react-feather' // You can also use Font Awesome

const CustomNavbar = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80 }}
    >
      <Navbar expand="lg" className="shadow-sm" bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'}>
        <Container>
          <Navbar.Brand href="#" className="fw-bold">📊 StockPredictor</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="me-3">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">About</Nav.Link>
              <Nav.Link href="#">Contact</Nav.Link>
            </Nav>
            <Button variant={darkMode ? 'light' : 'dark'} onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  )
}

export default CustomNavbar
