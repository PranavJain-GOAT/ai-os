// Change #5: Odometer-style rolling number + pulsing green dot
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function OdometerDigit({ digit }) {
  return (
    <div style={{ display: 'inline-block', overflow: 'hidden', height: '1.2em', lineHeight: '1.2em', verticalAlign: 'top' }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={digit}
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          style={{ display: 'inline-block' }}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function OdometerNumber({ value }) {
  const digits = String(value).split('');
  return (
    <span className="font-semibold text-white inline-flex">
      {digits.map((d, i) => <OdometerDigit key={i} digit={d} />)}
    </span>
  );
}

export default function LiveActivityTicker() {
  const [count, setCount] = useState(3);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
        setVisible(true);
      }, 350);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="ticker"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none hidden sm:block"
        >
          <div
            className="flex items-center justify-center gap-6 px-6 py-2 text-[11px] uppercase font-mono tracking-wider border-t border-white/10"
            style={{
              background: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Pulsing green dot */}
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--foreground))] opacity-60" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-[hsl(var(--foreground))]" style={{ boxShadow: '0 0 6px hsl(var(--foreground))' }} />
            </span>
            <span className="text-white/70 flex items-center gap-1.5">
              INSTALLED TODAY: <OdometerNumber value={180 + count} />
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-white/70">
              PLATFORM UPTIME: <span className="text-cyber-green font-bold">99.99%</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-white/70">
               AVG LATENCY: 24MS
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}