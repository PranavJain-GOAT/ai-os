import { motion } from "framer-motion";

export default function StatusAura() {
  return (
    <div className="fixed bottom-0 right-0 z-30 pointer-events-none">
      {/* Soft green corner glow */}
      <div style={{
        width: 220,
        height: 220,
        background: 'radial-gradient(circle at 100% 100%, rgba(0,255,65,0.10) 0%, rgba(0,255,65,0.04) 45%, transparent 70%)',
        borderRadius: '50%',
      }} />
      {/* Status pill */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full pointer-events-auto"
        style={{
          background: 'rgba(0,255,65,0.06)',
          border: '0.5px solid rgba(0,255,65,0.25)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyber-green pulse-aura" />
        <span className="text-[10px] font-mono text-cyber-green/80 tracking-widest">ALL SYSTEMS OPERATIONAL</span>
      </motion.div>
    </div>
  );
}