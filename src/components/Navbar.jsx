import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, Code2, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LiveSearch from "./home/LiveSearch";
import { useSoundManager } from "./SoundManager";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/lib/ThemeContext";

function GlitchLink({ to, label, onClick }) {
  const [glitching, setGlitching] = useState(false);
  const location = useLocation();
  const active = location.pathname === to;
  const { play } = useSoundManager();
  const { isDark } = useTheme();
  return (
    <Link
      to={to}
      onClick={() => { play('whoosh'); onClick?.(); }}
      onMouseEnter={() => { setGlitching(true); setTimeout(() => setGlitching(false), 400); }}
      className={`relative text-xs font-medium transition-colors px-3 py-1.5 rounded-full overflow-hidden select-none ${active
          ? isDark
            ? 'text-white bg-white/8'
            : 'text-neutral-900 bg-black/8'
          : isDark
            ? 'text-white/50 hover:text-white hover:bg-white/6'
            : 'text-neutral-500 hover:text-neutral-900 hover:bg-black/6'
        }`}
      style={{ letterSpacing: '-0.01em' }}
    >
      <span className={glitching ? 'glitch-text' : ''}>{label}</span>
      {glitching && (
        <span aria-hidden className="absolute inset-0 flex items-center justify-center text-nova-blue/60 pointer-events-none" style={{ clipPath: 'inset(50% 0 0 0)', transform: 'translateX(2px)', fontSize: 'inherit', letterSpacing: 'inherit', fontFamily: 'inherit', fontWeight: 'inherit' }}>{label}</span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY;
      setScrolled(s > 30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchQuery("");
    }
  };

  // Theme-aware nav colors
  const navBg = scrolled
    ? isDark
      ? 'rgba(5,5,5,0.88)'
      : 'rgba(250,250,250,0.92)'
    : 'transparent';
  const navBorder = scrolled
    ? isDark
      ? '1px solid rgba(255,255,255,0.08)'
      : '1px solid rgba(0,0,0,0.08)'
    : '1px solid transparent';

  const logoTextColor = isDark ? '#ffffff' : '#0a0a0a';
  const logoBgColor = isDark ? '#ffffff' : '#0a0a0a';
  const logoLetterColor = isDark ? '#000000' : '#ffffff';

  return (
    <>
      {/* Full-width Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 px-0">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderBottom: navBorder,
            background: navBg,
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
            transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
            height: '60px',
          }}
          className="flex items-center px-4 sm:px-8"
        >
          <div className="flex items-center gap-4 sm:gap-6 w-full" style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: logoBgColor }}
              >
                <span className="font-bold text-sm" style={{ fontFamily: 'Georgia, serif', color: logoLetterColor }}>A</span>
              </motion.div>
              <span
                className="font-bold tracking-tight text-base hidden sm:block"
                style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.04em', color: logoTextColor }}
              >
                AIStack
              </span>
            </Link>

            {/* Live Search */}
            <div className="flex-1 hidden md:block">
              <LiveSearch />
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { label: "Marketplace", to: "/" },
                { label: "Features", to: "/features" },
                { label: "About", to: "/about" },
                { label: "Pricing", to: "/pricing" },
              ].map((item) => (
                <GlitchLink key={item.label} to={item.to} label={item.label} />
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Theme Toggle */}
              <ThemeToggle />

              <Link to="/auth" className="hidden sm:flex">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full transition-all ${isDark
                      ? 'text-white/60 hover:text-white border border-white/12 hover:border-white/25'
                      : 'text-neutral-500 hover:text-neutral-900 border border-black/12 hover:border-black/25'
                    }`}
                >
                  <Code2 className="w-3 h-3" />
                  Sign In
                </motion.button>
              </Link>
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="shimmer-btn flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full transition-all"
                  style={{
                    background: isDark ? '#ffffff' : '#0a0a0a',
                    color: isDark ? '#000000' : '#ffffff',
                  }}
                >
                  <Zap className="w-3 h-3" />
                  <span className="hidden sm:inline">Browse</span>
                </motion.button>
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden p-1 ${isDark ? 'text-white/60 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'}`}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-4 right-4 z-40 glass rounded-2xl p-4 space-y-2"
            style={
              !isDark
                ? { background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(0,0,0,0.08)' }
                : {}
            }
          >
            <form onSubmit={handleSearch} className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-white/30' : 'text-neutral-400'}`} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none ${isDark
                    ? 'bg-white/5 text-white placeholder:text-white/25 border border-white/8'
                    : 'bg-black/5 text-neutral-900 placeholder:text-neutral-400 border border-black/10'
                  }`}
              />
            </form>
            {[
              { label: "Pricing", to: "/pricing" },
              { label: "Admin Dashboard", to: "/admin" },
              { label: "Payment History", to: "/payment-history" },
              { label: "Login / Sign Up", to: "/auth" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm px-3 py-2.5 rounded-xl transition-colors ${isDark
                    ? 'text-white/60 hover:text-white hover:bg-white/6'
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-black/6'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed nav */}
      <div className="h-16" />
    </>
  );
}