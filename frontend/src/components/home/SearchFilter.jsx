import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["chatbot", "automation", "website", "analytics", "marketing", "other"];
const PRICES = ["Under $50", "$50–$200", "$200+"];
const SETUP_TIMES = ["Under 5 min", "Under 1 hour", "Same day"];

export default function SearchFilter({ searchQuery, onSearchChange, filters, onFilterChange }) {
  const [showFilters, setShowFilters] = useState(false);
  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="mb-10 space-y-3">
      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
          <input
            type="text"
            placeholder="Search AI solutions..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-4 py-3 glass rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all"
            style={{ letterSpacing: '-0.01em' }}
          />
          {searchQuery && (
            <button onClick={() => onSearchChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 glass rounded-xl text-sm transition-all ${showFilters ? "text-white border-white/20" : "text-white/40 hover:text-white"}`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span style={{ letterSpacing: '-0.01em' }}>Filters</span>
          {activeCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center font-mono">
              {activeCount}
            </span>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="glass rounded-2xl p-5 space-y-4">
              {[
                { label: "Category", key: "category", options: CATEGORIES },
                { label: "Price Range", key: "price", options: PRICES },
                { label: "Setup Time", key: "setupTime", options: SETUP_TIMES },
              ].map(({ label, key, options }) => (
                <div key={key}>
                  <p className="text-[11px] font-mono text-white/25 tracking-widest mb-2.5">{label.toUpperCase()}</p>
                  <div className="flex flex-wrap gap-2">
                    {options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => onFilterChange(key, filters[key] === opt ? "" : opt)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filters[key] === opt
                            ? "bg-white text-black"
                            : "glass text-white/40 hover:text-white"
                          }`}
                        style={{ letterSpacing: '-0.01em' }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}