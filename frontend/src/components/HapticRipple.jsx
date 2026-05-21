import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

let globalId = 0;

export function useHapticRipple() {
  const [ripples, setRipples] = useState([]);

  const trigger = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = ++globalId;
    setRipples(prev => [...prev, { id, x, y }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
  };

  const RippleLayer = () => (
    <AnimatePresence>
      {ripples.map(r => (
        <motion.span
          key={r.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{
            position: 'absolute',
            left: r.x,
            top: r.y,
            width: 40,
            height: 40,
            marginLeft: -20,
            marginTop: -20,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(77,159,255,0.15) 50%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 50,
          }}
        />
      ))}
    </AnimatePresence>
  );

  return { trigger, RippleLayer };
}