import { useState } from "react";
import { motion } from "framer-motion";

const AVG_PRICE = 79;
const COMMISSION = 0.8;

export default function ROICalculator() {
  const [installs, setInstalls] = useState(50);
  const monthly = Math.round(installs * AVG_PRICE * COMMISSION);

  return (
    <section className="max-w-3xl mx-auto px-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl p-8 sm:p-10 relative overflow-hidden"
        style={{ background: '#111', border: '0.5px solid rgba(255,255,255,0.1)' }}
      >
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 rounded-full blur-[80px] pointer-events-none"
          style={{ background: 'rgba(29,158,117,0.08)' }} />

        <div className="relative">
          <p className="tech-label text-white/25 tracking-[0.2em] mb-3 uppercase">Developer ROI Calculator</p>
          <h3 className="text-white font-bold text-2xl sm:text-3xl mb-2" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.04em' }}>
            How much can you earn?
          </h3>
          <p className="text-white/40 text-sm mb-8">Drag the slider to see your projected monthly earnings</p>

          {/* Slider */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/50 text-sm font-mono">AI installs / month</span>
              <span className="text-white font-bold text-lg font-mono">{installs}</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min={1}
                max={500}
                value={installs}
                onChange={(e) => setInstalls(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #1D9E75 0%, #1D9E75 ${(installs / 500) * 100}%, rgba(255,255,255,0.1) ${(installs / 500) * 100}%, rgba(255,255,255,0.1) 100%)`,
                  outline: 'none',
                }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-white/20 text-xs font-mono">1</span>
              <span className="text-white/20 text-xs font-mono">500</span>
            </div>
          </div>

          {/* Output */}
          <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(29,158,117,0.06)', border: '0.5px solid rgba(29,158,117,0.2)' }}>
            <p className="text-white/40 text-sm mb-2 font-mono">At {installs} install{installs !== 1 ? 's' : ''}/month, you earn</p>
            <motion.div
              key={monthly}
              initial={{ scale: 0.95, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="font-bold"
              style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#1D9E75', letterSpacing: '-0.04em', lineHeight: 1 }}
            >
              ~${monthly.toLocaleString()}<span className="text-xl text-white/40 font-normal">/mo</span>
            </motion.div>
            <p className="text-white/25 text-xs mt-3 font-mono">Based on avg $79/install × 80% commission</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}