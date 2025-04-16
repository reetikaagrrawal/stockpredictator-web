import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import axios from "axios";

// Components
import CustomNavbar from "./components/Navbar";
import StockInputForm from "./components/StockInputForm";
import PredictionResult from "./components/PredictionResult";
import PredictionChart from "./components/PredictionChart";
import TradingViewWidget from "./components/TradingViewWidget";
import ScrollReveal from "./components/ScrollReveal";
import CursorTrail from "./components/CursorTrail";

// Global styles
import "./styles/global.css";

function App() {
  const [predictionData, setPredictionData] = useState(null);

  // ✅ Enforce dark mode on first load
  useEffect(() => {
    document.body.classList.add("dark-mode");
  }, []);

  // ✅ Handle API call for stock prediction
  const handlePredictionRequest = async (symbol) => {
    try {
      console.log("Predicting for:", symbol);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/predict`,
        { stock_symbol: symbol }
      );

      setPredictionData({
        symbol: response.data.stock,
        predictions: response.data.predicted_prices,
      });
    } catch (err) {
      console.error("Prediction error:", err);
    }
  };

  return (
    <>
      {/* Neon Cursor Trail */}
      <CursorTrail />

      {/* Navbar */}
      <CustomNavbar />

      {/* Theme Toggle */}
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button
          onClick={() => document.body.classList.toggle("dark-mode")}
          className="glass-card"
          style={{
            border: "none",
            background: "transparent",
            color: "var(--text-color)",
            padding: "0.5rem 1rem",
            fontWeight: "600",
          }}
        >
          Toggle Theme
        </button>
      </div>

      {/* Animated Background Wrapper */}
      <div className="bg-wrapper">
        {/* Hero Section */}
        <motion.div
          className="hero-text neon-hero"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="neon-background" />
          <h1 className="display-3 fw-bold text-center gradient-text">
            Welcome to Stock Predictor
          </h1>
          <p className="lead text-center glow-text">
            Make smarter investment decisions with AI
          </p>
        </motion.div>

        {/* Form + Predictions */}
        <Container className="mt-5">
          {/* Input Form */}
          <ScrollReveal>
            <StockInputForm onSubmit={handlePredictionRequest} />
          </ScrollReveal>

          {/* Display Results After Prediction */}
          {predictionData && (
            <>
              <ScrollReveal delay={0.3}>
                <PredictionResult
                  symbol={predictionData.symbol}
                  predictions={predictionData.predictions}
                />
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <PredictionChart
                  symbol={predictionData.symbol}
                  predictions={predictionData.predictions}
                />
              </ScrollReveal>

              <ScrollReveal delay={0.6}>
                <TradingViewWidget symbol={predictionData.symbol} />
              </ScrollReveal>
            </>
          )}
        </Container>
      </div>
    </>
  );
}

export default App;
