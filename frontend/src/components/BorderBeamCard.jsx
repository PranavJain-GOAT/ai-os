// Change #2: Glassmorphism card with animated border-beam
import { useRef, useEffect } from "react";

export default function BorderBeamCard({ children, className = "", style = {} }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={cardRef} className={`border-beam-card ${className}`} style={style}>
      {children}
    </div>
  );
}