import { motion } from "framer-motion";

export default function ScanlineLoader({ text = "COMPILING DATA" }) {
  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Scanline beam */}
      <motion.div
        animate={{ y: ["0vh", "100vh"] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'fixed',
          left: 0, right: 0, top: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent 0%, rgba(77,159,255,0.8) 30%, rgba(0,255,65,0.9) 50%, rgba(77,159,255,0.8) 70%, transparent 100%)',
          boxShadow: '0 0 20px rgba(77,159,255,0.6), 0 0 60px rgba(0,255,65,0.2)',
          zIndex: 9999,
        }}
      />
      {/* Scanline overlay flicker lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,65,0.015) 3px, rgba(0,255,65,0.015) 4px)',
        backgroundSize: '100% 4px',
      }} />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center mb-2">
          <span className="text-white font-bold text-xl" style={{ fontFamily: 'Georgia, serif' }}>A</span>
        </div>
        <p className="tech-label text-nova-blue tracking-[0.3em]">{text}</p>
        <div className="flex gap-1 mt-1">
          {[0, 1, 2, 3, 4].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
              className="w-1 h-1 rounded-full bg-cyber-green"
            />
          ))}
        </div>
      </div>
    </div>
  );
}