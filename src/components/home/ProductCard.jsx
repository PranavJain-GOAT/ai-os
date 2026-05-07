import { Link } from "react-router-dom";
import { ArrowUpRight, Zap, Activity, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const CATEGORY_IMAGES = {
  chatbot: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
  automation: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  website: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
  analytics: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  marketing: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&q=80",
  other: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
};

function ProductInMotion() {
  return (
    <div className="absolute inset-0 bg-[#0a0a0a]/90 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none border border-cyber-green/20 backdrop-blur-sm">
      <div className="space-y-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 w-full relative">
         <div className="bg-white/10 rounded-2xl rounded-tl-sm px-3 py-2 text-[11px] text-white/80 w-[85%] backdrop-blur-md shadow-lg border border-white/5">
            New booking request for tomorrow at 2PM.
         </div>
         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0, 0] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.4, 0.5, 1] }}
            className="text-[10px] text-white/40 ml-2 font-mono flex items-center gap-1"
         >
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" /> AI Agent is typing...
         </motion.div>
         <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.9, 0.9, 1, 1, 0.9], y: [10, 10, 0, 0, -10] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.5, 0.8, 1] }}
            className="bg-cyber-green/20 border border-cyber-green/30 rounded-2xl rounded-tr-sm px-3 py-2 text-[11px] text-cyber-green w-[85%] ml-auto backdrop-blur-md shadow-xl"
         >
            Confirmed! Added to Google Calendar.
         </motion.div>
      </div>
    </div>
  );
}

export default function ProductCard({ product, index, featured = false }) {
  const cardRef = useRef(null);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const isLarge = featured || index % 5 === 0;
  const img = product.image_url || CATEGORY_IMAGES[product.category] || CATEGORY_IMAGES.other;

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
      transition={{ duration: 0.55, delay: Math.min(index, 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        layoutId={`card-${product.id}`}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`radial-card rounded-2xl overflow-hidden h-full group cursor-pointer relative flex ${featured ? 'flex-row min-h-[260px]' : 'flex-col min-h-[220px]'}`}
      >
        {/* Image */}
        <motion.div layoutId={`image-container-${product.id}`} className={`relative overflow-hidden shrink-0 ${featured ? 'w-2/5 h-auto' : isLarge ? 'h-56' : 'h-40'}`}>
          {/* Shimmer placeholder */}
          {!imgLoaded && !imgError && (
            <div className="absolute inset-0 shimmer-skeleton" />
          )}
          {imgError ? (
            <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <Zap className="w-8 h-8 text-white/10" />
            </div>
          ) : (
            <div className="w-full h-full relative">
              <motion.img
                layoutId={`image-${product.id}`}
                src={img}
                alt={product.title}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-60 ${imgLoaded ? 'opacity-60' : 'opacity-0'}`}
              />
              <ProductInMotion />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/50 to-transparent pointer-events-none" />
          
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-20 pointer-events-none">
            {product.badge && (
              <span className="cyber-tag text-white/90 border-white/20 shadow-lg bg-black/60 backdrop-blur-md">
                <Zap className="w-2.5 h-2.5" />{product.badge}
              </span>
            )}
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
              <span className="cyber-tag text-white/80 border-white/15 text-[10px] bg-black/80 shadow-2xl backdrop-blur-xl flex items-center gap-1.5 py-1">
                 <Info className="w-3 h-3 text-nova-blue" />
                 Powered by {product.model || 'GPT-4o + RAG'}
              </span>
            </div>
          </div>

          <div className="absolute top-3 right-3 z-20 pointer-events-none">
            <span className="cyber-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-green pulse-aura" />
              {product.setup_time || "5 min"}
            </span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div layoutId={`content-${product.id}`} className="p-4 flex flex-col flex-1 relative z-10">
          {/* Tags */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {product.category && (
              <span className="cyber-tag">{product.category.toUpperCase()}</span>
            )}
            {product.rating && (
              <span className="cyber-tag text-white/80">
                {product.rating}
              </span>
            )}
            {product.installs_count && (
              <span className="cyber-tag">{product.installs_count}+ installs</span>
            )}
          </div>

          <h3 className="text-white font-bold text-base leading-tight mb-1.5 group-hover:text-white transition-colors" style={{ letterSpacing: '-0.03em', fontFamily: 'Georgia, serif' }}>
            {product.title}
          </h3>
          <p className="text-white/40 text-xs leading-relaxed mb-4 line-clamp-2 flex-1" style={{ letterSpacing: '-0.01em' }}>
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.04em' }}>
              ${product.price}
              <span className="text-white/30 text-xs font-normal ml-1 font-mono">one-time</span>
            </div>
            <div className="flex gap-2">
              {product.demo_url && (
                <a href={product.demo_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 rounded-full border border-white/15 hover:border-white/30 flex items-center justify-center text-white/40 hover:text-white transition-all"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.div>
                </a>
              )}
              <Link to={`/product/${product.id}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="shimmer-btn h-8 px-4 rounded-full bg-white text-black text-xs font-bold flex items-center gap-1.5 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all"
                >
                  View
                  <ArrowUpRight className="w-3 h-3" />
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}