import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-white/6 pt-24 pb-14 relative overflow-hidden">
      <div className="absolute inset-0 dark-grid opacity-20" />
      {/* Change #12: Large low-opacity watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-heading font-bold text-white whitespace-nowrap"
          style={{
            fontSize: 'clamp(6rem, 20vw, 16rem)',
            letterSpacing: '-0.06em',
            opacity: 0.025,
            userSelect: 'none',
          }}
        >
          AIStack
        </span>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-24 max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-white font-bold tracking-tight mb-8 leading-tight" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}>
               Ready to automate your business?
            </h2>
            <Link to="/auth">
               <motion.button whileHover={{ scale: 1.05 }} className="shimmer-btn bg-white text-black font-bold text-lg px-10 py-5 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-transform">
                  Deploy Now — Free
               </motion.button>
            </Link>
         </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm" style={{ fontFamily: 'Georgia, serif' }}>A</span>
              </div>
              <span className="text-white font-bold text-xl" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.04em' }}>AIStack</span>
            </div>
            <p className="text-white/25 text-sm leading-relaxed font-mono text-xs">
              AI systems for real businesses.<br />No developers needed.
            </p>
          </div>
          {[
            {
              title: "Solutions", links: [
                { label: "Instant Setup", to: "/" },
                { label: "Custom Solutions", to: "/" },
                { label: "Pricing", to: "/pricing" },
                { label: "Payment History", to: "/payment-history" },
              ]
            },
            {
              title: "Developers", links: [
                { label: "Join as Developer", to: "/developer/login" },
                { label: "Dashboard", to: "/developer" },
                { label: "List a Product", to: "/developer/add" },
                { label: "Analytics", to: "/developer/analytics" },
              ]
            },
            {
              title: "Platform", links: [
                { label: "Admin Dashboard", to: "/admin" },
                { label: "About", to: "/" },
                { label: "Terms", to: "/" },
                { label: "Privacy", to: "/" },
              ]
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white/25 text-[11px] font-mono tracking-[0.15em] mb-4">{col.title.toUpperCase()}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-white/40 hover:text-white text-sm transition-colors hover-underline" style={{ letterSpacing: '-0.01em' }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-white/15 text-xs font-mono">© 2026 AISTACK. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green pulse-aura" />
            <span className="text-white/15 text-xs font-mono">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}