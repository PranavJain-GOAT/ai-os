import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

const SOLUTION_IMAGES = {
  chatbot: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
  automation: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
  website: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
  analytics: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
  marketing: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80",
  other: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&q=80",
};

export default function CustomCard({ solution, index }) {
  const cardRef = useRef(null);
  const img = solution.image_url || SOLUTION_IMAGES[solution.category] || SOLUTION_IMAGES.other;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mx", `${x}%`);
    card.style.setProperty("--my", `${y}%`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="radial-card rounded-2xl overflow-hidden group cursor-pointer relative flex flex-col"
      >
        {/* Image */}
        <div className="relative overflow-hidden h-44 shrink-0">
          <img
            src={img}
            alt={solution.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent" />
          <div className="absolute top-3 right-3">
            <span className="cyber-tag">
              <Clock className="w-2.5 h-2.5" />
              {solution.delivery_days || 5}d
            </span>
          </div>
          <div className="absolute top-3 left-3">
            <span className="cyber-tag">CUSTOM</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col relative z-10">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {solution.category && (
              <span className="cyber-tag">{solution.category.toUpperCase()}</span>
            )}
            {solution.rating && (
              <span className="cyber-tag text-white/80">
                <Activity className="w-2.5 h-2.5" />{solution.rating}
              </span>
            )}
          </div>

          <h3 className="text-white font-bold text-base leading-tight mb-1" style={{ letterSpacing: '-0.03em', fontFamily: 'Georgia, serif' }}>
            {solution.title}
          </h3>
          {solution.developer_name && (
            <p className="text-white/30 text-[11px] mb-2 font-mono">by {solution.developer_name}</p>
          )}
          <p className="text-white/40 text-xs leading-relaxed mb-4 line-clamp-2" style={{ letterSpacing: '-0.01em' }}>
            {solution.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-white font-bold text-base" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.04em' }}>
              ${solution.price_min}
              <span className="text-white/30 text-xs font-mono font-normal">–${solution.price_max}</span>
            </div>
            <Link to={`/custom/${solution.id}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="shimmer-btn h-8 px-4 rounded-full bg-white/8 border border-white/15 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-white hover:text-black transition-all"
              >
                View
                <ArrowUpRight className="w-3 h-3" />
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}