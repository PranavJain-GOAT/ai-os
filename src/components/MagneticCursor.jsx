import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/ThemeContext";

export default function MagneticCursor() {
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);
  
  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const hovering = useRef(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setHidden(false);
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    const onEnterInteractive = () => { hovering.current = true; };
    const onLeaveInteractive = () => { hovering.current = false; };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const attach = () => {
      const interactives = document.querySelectorAll("a, button, [role='button'], .radial-card, .card-pop");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
      return interactives;
    };
    let interactives = attach();

    // Re-attach on DOM changes
    const observer = new MutationObserver(() => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
      interactives = attach();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    let frame;
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const { x, y } = posRef.current;

      dot.style.left = x + "px";
      dot.style.top = y + "px";

      ringPos.current.x = lerp(ringPos.current.x, x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, y, 0.12);
      ring.style.left = ringPos.current.x + "px";
      ring.style.top = ringPos.current.y + "px";

      const hovBorder = isDarkRef.current ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.6)";
      const normBorder = isDarkRef.current ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)";
      
      const isHov = hovering.current;
      ring.style.width = isHov ? "60px" : "36px";
      ring.style.height = isHov ? "60px" : "36px";
      ring.style.borderColor = isHov ? hovBorder : normBorder;
      ring.style.mixBlendMode = isHov ? "difference" : "normal";
      ring.style.background = isHov ? (isDarkRef.current ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)") : "transparent";
      dot.style.opacity = hidden ? "0" : "1";
      ring.style.opacity = hidden ? "0" : "1";
    };
    animate();

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const base = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 99999,
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'opacity 0.2s ease',
  };

  return (
    <>
      {/* Small precise dot */}
      <div ref={dotRef} style={{
        ...base,
        width: 5,
        height: 5,
        background: isDark ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.85)',
        boxShadow: isDark ? '0 0 6px rgba(255,255,255,0.5)' : '0 0 6px rgba(0,0,0,0.3)',
        left: -200,
        top: -200,
      }} />
      {/* Trailing ring */}
      <div ref={ringRef} style={{
        ...base,
        width: 36,
        height: 36,
        border: isDark ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(0,0,0,0.25)',
        left: -200,
        top: -200,
        transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease, opacity 0.2s ease',
      }} />
    </>
  );
}