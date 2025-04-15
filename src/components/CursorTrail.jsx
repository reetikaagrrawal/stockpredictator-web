import { useEffect } from "react";
import "./CursorTrail.css"; // This will import the CSS

const CursorTrail = () => {
  useEffect(() => {
    const trail = document.createElement("div");
    trail.className = "cursor-trail";
    document.body.appendChild(trail);

    const moveTrail = (e) => {
      trail.style.left = `${e.clientX}px`;
      trail.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", moveTrail);
    return () => {
      window.removeEventListener("mousemove", moveTrail);
      document.body.removeChild(trail);
    };
  }, []);

  return null;
};

export default CursorTrail;
