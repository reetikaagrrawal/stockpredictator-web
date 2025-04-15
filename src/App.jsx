import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import axios from "axios";

import CustomNavbar from "./components/Navbar";
import StockInputForm from "./components/StockInputForm";
import PredictionResult from "./components/PredictionResult";
import PredictionChart from "./components/PredictionChart"; // ✅ Chart.js
import TradingViewWidget from "./components/TradingViewWidget"; // ✅ Live stock chart
import ScrollReveal from "./components/ScrollReveal"; // ✅ Scroll-based animation
import CursorTrail from "./components/CursorTrail"; // ✅ Neon cursor trail

import "./styles/global.css";

function App() {
  const [predictionData, setPredictionData] = useState(null);

  // ✅ Force dark mode on load
  useEffect(() => {
    document.body.classList.add("dark-mode");
  }, []);

  const handlePredictionRequest = async (symbol) => {
    try {
      console.log("Triggering prediction for:", symbol);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/predict`,
        {
          stock_symbol: symbol, // ✅ Matches FastAPI backend model
        }
      );

      setPredictionData({
        symbol: response.data.stock,
        predictions: response.data.predicted_prices,
      });
    } catch (err) {
      console.error("Prediction failed:", err);
    }
  };

  return (
    <>
      <CursorTrail />
      <CustomNavbar />

      {/* ✅ Optional Dark/Light Toggle Button */}
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

      <div className="bg-wrapper">
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

        <Container className="mt-5">
          <ScrollReveal>
            <StockInputForm onSubmit={handlePredictionRequest} />
          </ScrollReveal>

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
