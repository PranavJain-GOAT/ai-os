import { useState, useEffect, useRef } from "react";
import { Search, Star, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useTheme } from "@/lib/ThemeContext";

export default function LiveSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    base44.entities.Product.list().then(setAllProducts);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInput = (val) => {
    setQuery(val);
    if (!val.trim()) { setResults([]); setOpen(false); return; }
    const q = val.toLowerCase();
    const filtered = allProducts
      .filter((p) => p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q))
      .slice(0, 5);
    setResults(filtered);
    setOpen(filtered.length > 0);
  };

  return (
      <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-white/30' : 'text-neutral-400'}`} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => query && setOpen(results.length > 0)}
          placeholder="Search AI solutions..."
          className={`w-full pl-11 pr-20 py-3.5 rounded-2xl text-sm focus:outline-none transition-all shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${
            isDark
              ? 'text-white placeholder:text-white/25'
              : 'text-neutral-900 placeholder:text-neutral-400'
          }`}
          style={{
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
            border: isDark ? '0.5px solid rgba(255,255,255,0.1)' : '0.5px solid rgba(0,0,0,0.1)',
            borderTop: isDark ? '0.5px solid rgba(255,255,255,0.25)' : '0.5px solid rgba(0,0,0,0.18)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        />
        <div className={`absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-mono pointer-events-none ${isDark ? 'text-white/20' : 'text-neutral-400'}`}>
          <Command className="w-3 h-3" />K
        </div>
      </div>

      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full mt-2 left-0 right-0 z-50 rounded-2xl overflow-hidden"
            style={{
              background: isDark ? 'rgba(12,12,12,0.6)' : 'rgba(250,250,250,0.92)',
              border: isDark ? '0.5px solid rgba(255,255,255,0.1)' : '0.5px solid rgba(0,0,0,0.1)',
              borderTop: isDark ? '0.5px solid rgba(255,255,255,0.2)' : '0.5px solid rgba(0,0,0,0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: isDark ? '0 24px 80px rgba(0,0,0,0.8)' : '0 12px 40px rgba(0,0,0,0.12)',
            }}
          >
            {results.length > 0 && (
              <div className={`px-4 pt-3 pb-1 text-[10px] font-mono uppercase tracking-widest ${isDark ? 'text-white/40 bg-black/40' : 'text-neutral-400 bg-black/3'}`}>
                 Marketplace Matches
              </div>
            )}
            {results.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                onClick={() => { setOpen(false); setQuery(""); }}
                className={`flex items-center gap-3 px-4 py-3 transition-colors border-b last:border-0 ${
                  isDark
                    ? 'hover:bg-white/5 border-white/5'
                    : 'hover:bg-black/4 border-black/6'
                }`}
              >
                {/* Thumbnail */}
                <div className={`w-10 h-10 rounded-lg overflow-hidden shrink-0 flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} className="w-full h-full object-cover opacity-70" />
                  ) : (
                    <Search className={`w-4 h-4 ${isDark ? 'text-white/20' : 'text-neutral-300'}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-neutral-900'}`} style={{ fontFamily: 'Georgia, serif' }}>{p.title}</div>
                  <div className={`text-xs truncate font-mono ${isDark ? 'text-white/30' : 'text-neutral-400'}`}>{p.category}</div>
                </div>
                <div className="shrink-0 text-right">
                  <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`} style={{ fontFamily: 'Georgia, serif' }}>${p.price}</div>
                  {p.rating && (
                    <div className="flex items-center gap-1 justify-end">
                      <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                      <span className={`text-xs font-mono ${isDark ? 'text-white/30' : 'text-neutral-400'}`}>{p.rating}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
            {results.length > 0 && (
              <div className={`border-t px-4 py-3 ${isDark ? 'border-white/10 bg-[#0a0a0a]' : 'border-black/6 bg-neutral-50'}`}>
                 <div className={`text-[10px] font-mono uppercase tracking-widest mb-3 ${isDark ? 'text-white/40' : 'text-neutral-400'}`}>
                    Semantic Intent Suggestions
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {['"Customer Support Bot"', '"Automate Bookings"', '"Lead Scoring AI"'].map(intent => (
                     <button key={intent} className={`text-[11px] rounded-full px-3 py-1.5 transition-colors hover:border-cyber-green/50 hover:shadow-[0_0_10px_rgba(0,255,65,0.2)] ${
                       isDark
                         ? 'text-white/70 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white'
                         : 'text-neutral-600 bg-black/5 border border-black/10 hover:bg-black/10 hover:text-neutral-900'
                     }`} onClick={(e) => { e.preventDefault(); handleInput(intent.replace(/"/g, '')); }}>
                       {intent}
                     </button>
                   ))}
                 </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}