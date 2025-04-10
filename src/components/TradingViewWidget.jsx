import { useEffect, useRef } from 'react';

const TradingViewWidget = ({ symbol }) => {
  const containerRef = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: `NASDAQ:${symbol}`,
      width: "100%",
      height: "220",
      locale: "en",
      dateRange: "1M",
      colorTheme: "dark",
      trendLineColor: "#0d6efd",
      underLineColor: "#0d6efd33",
      isTransparent: false
    });
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(script);
  }, [symbol]);

  return <div className="tradingview-widget-container my-4" ref={containerRef}></div>;
};

export default TradingViewWidget;
