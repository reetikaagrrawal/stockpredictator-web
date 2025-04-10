import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import axios from "axios";

import CustomNavbar from "./components/Navbar";
import StockInputForm from "./components/StockInputForm";
import PredictionResult from "./components/PredictionResult";
import PredictionChart from "./components/PredictionChart";      // ✅ Chart.js
import TradingViewWidget from "./components/TradingViewWidget";  // ✅ Live stock chart
import ScrollReveal from "./components/ScrollReveal";            // ✅ Scroll-based animation

import "./styles/global.css";

function App() {
  const [predictionData, setPredictionData] = useState(null);

  const handlePredictionRequest = async (symbol) => {
    try {
      // const response = await axios.post("http://localhost:8000/predict", {
      //   stock_symbol: symbol, // ✅ Matches FastAPI backend model
      // });
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/predict`, {
        stock_symbol: symbol, // ✅ Matches FastAPI backend model
      });

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
      <CustomNavbar />

      <div className="bg-wrapper">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="display-3 fw-bold text-center text-light">
            Welcome to Stock Predictor 🚀
          </h1>
          <p className="lead text-center text-light">
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
