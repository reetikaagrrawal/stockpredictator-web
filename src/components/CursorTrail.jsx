import { useEffect } from "react";
import "./CursorTrail.css";

const CursorTrail = () => {
  useEffect(() => {
    const trailContainer = document.createElement("div");
    trailContainer.className = "trail-container";
    document.body.appendChild(trailContainer);

    const aura = document.createElement("div");
    aura.className = "cursor-aura";
    document.body.appendChild(aura);

    let hue = 0;

    const createTrailDot = (x, y) => {
      const dot = document.createElement("div");
      dot.className = "trail-dot";
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.style.background = `hsl(${hue}, 100%, 70%)`;
      trailContainer.appendChild(dot);

      hue = (hue + 8) % 360;

      setTimeout(() => dot.remove(), 600);
    };

    const handleMouseMove = (e) => {
      createTrailDot(e.clientX, e.clientY);
      aura.style.left = `${e.clientX}px`;
      aura.style.top = `${e.clientY}px`;
    };

    const handleClick = () => {
      aura.classList.add("click-pulse");
      setTimeout(() => aura.classList.remove("click-pulse"), 300);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      trailContainer.remove();
      aura.remove();
    };
  }, []);

  return null;
};

export default CursorTrail;
