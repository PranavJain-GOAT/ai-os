import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MOCK_CUSTOM_SOLUTIONS } from "@/api/mockData";
import { Star, Wrench, ArrowRight, Check, X, Clock, Users, ExternalLink, MessageCircle, ChevronLeft, Zap, Activity, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function CustomSolutionDetail() {
  const { id } = useParams();
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const found = MOCK_CUSTOM_SOLUTIONS.find(s => s.id === id);
      setSolution(found || null);
      setLoading(false);
    }, 400);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h1 className="text-white font-bold text-3xl mb-4" style={{ fontFamily: 'Georgia, serif' }}>Solution not found</h1>
        <Link to="/" className="text-white/50 hover:text-white text-sm">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero */}
      <div className="dark-grid border-b border-white/6 pt-12 pb-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-white/25 hover:text-white text-xs mb-8 transition-colors font-mono">
            <ChevronLeft className="w-3.5 h-3.5" /> BACK TO MARKETPLACE
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span className="cyber-tag border-cyber-green/50 text-cyber-green bg-cyber-green/10">
                  <Wrench className="w-2.5 h-2.5" /> CUSTOMIZABLE
                </span>
                {solution.rating && (
                  <span className="cyber-tag">
                    <Star className="w-2.5 h-2.5 fill-white" />
                    {solution.rating}
                  </span>
                )}
                {solution.developer_name && (
                   <span className="cyber-tag border-white/20">
                     By: <span className="text-white ml-1">{solution.developer_name}</span>
                   </span>
                )}
              </div>
              <h1 className="text-white font-bold leading-none mb-5" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', letterSpacing: '-0.04em' }}>
                {solution.title}
              </h1>
              <p className="text-white/45 text-base leading-relaxed mb-8 max-w-lg" style={{ letterSpacing: '-0.02em' }}>
                {solution.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to={`/install/${solution.id}?type=custom`} className="block">
                  <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="shimmer-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black font-bold text-sm px-7 py-4 rounded-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all"
                  >
                    Start Custom Setup
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </div>
            
            {/* Preview */}
            <motion.div
              layoutId={`card-${solution.id}`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="radial-card rounded-3xl overflow-hidden glass p-1 shadow-2xl"
            >
              <div className="aspect-video relative flex items-center justify-center bg-black/40 rounded-2xl overflow-hidden border border-white/5">
                {solution.demo_url ? (
                  <iframe src={solution.demo_url} className="w-full h-full" title="Demo" />
                ) : (
                  <div className="text-center absolute inset-0 flex flex-col justify-center items-center">
                    <div className="dark-grid absolute inset-0 opacity-40 mix-blend-screen" />
                    <div className="w-20 h-20 glass rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-xl relative z-10">
                      <Wrench className="w-8 h-8 text-white/50" />
                    </div>
                    <p className="text-white/80 font-bold text-xl relative z-10" style={{ fontFamily: 'Georgia, serif' }}>Solution Blueprint</p>
                    <p className="text-white/30 text-xs font-mono mt-2 relative z-10">CONTACT DEVELOPER FOR LIVE DEMO</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {solution.what_it_does && (
              <Section title="What this does">
                <p className="text-white/50 leading-relaxed" style={{ letterSpacing: '-0.01em' }}>{solution.what_it_does}</p>
              </Section>
            )}

            {solution.who_its_for?.length > 0 && (
              <Section title="Who this is for">
                <div className="flex flex-wrap gap-2">
                  {solution.who_its_for.map((w) => (
                    <span key={w} className="cyber-tag gap-2 py-2">
                      <Users className="w-3 h-3" /> {w}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {solution.whats_included?.length > 0 && (
                <div className="glass rounded-2xl p-5 border border-white/6">
                  <h3 className="text-white/70 text-xs font-mono tracking-widest mb-4 flex items-center gap-2">
                    <span style={{ color: '#4D9FFF' }}>+</span> INCLUDED
                  </h3>
                  <ul className="space-y-2.5">
                    {solution.whats_included.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: '#4D9FFF' }} />
                        <span className="text-sm text-white/60" style={{ letterSpacing: '-0.01em' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {solution.whats_not_included?.length > 0 && (
                <div className="glass rounded-2xl p-5 border border-white/6">
                  <h3 className="text-white/70 text-xs font-mono tracking-widest mb-4 flex items-center gap-2">
                    <span className="text-red-400">−</span> NOT INCLUDED
                  </h3>
                  <ul className="space-y-2.5">
                    {solution.whats_not_included.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <X className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-400/60" />
                        <span className="text-sm text-white/35" style={{ letterSpacing: '-0.01em' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {solution.customization_options?.length > 0 && (
              <Section title="Customization Scope">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {solution.customization_options.map((f) => (
                    <motion.div key={f} whileHover={{ x: 4 }} className="glass rounded-xl px-4 py-3 flex items-center gap-3 border border-white/4 hover:border-white/12 transition-all">
                      <Wrench className="w-3.5 h-3.5 text-white/40 shrink-0" />
                      <span className="text-sm text-white/70" style={{ letterSpacing: '-0.01em' }}>{f}</span>
                    </motion.div>
                  ))}
                </div>
              </Section>
            )}

            {solution.features?.length > 0 && (
              <Section title="Core Capabilities">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {solution.features.map((f) => (
                    <motion.div key={f} whileHover={{ x: 4 }} className="glass rounded-xl px-4 py-3 flex items-center gap-3 border border-white/4 hover:border-white/12 transition-all">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                      <span className="text-sm text-white/60" style={{ letterSpacing: '-0.01em' }}>{f}</span>
                    </motion.div>
                  ))}
                </div>
              </Section>
            )}
          </div>

          {/* Sticky CTA */}
          <div>
            <div className="sticky top-28 space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="glass rounded-3xl p-6 border border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              >
                <div className="mb-5">
                  <div className="text-white font-bold text-3xl" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.03em' }}>
                    ${solution.price_min} – ${solution.price_max}
                  </div>
                  <p className="text-white/30 text-xs font-mono mt-1">ESTIMATED CUSTOM PRICING</p>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-white/60 bg-white/5 border border-white/10 p-3 rounded-xl mb-6">
                  <Clock className="w-4 h-4 text-white/40 shrink-0" />
                  <span style={{ letterSpacing: '-0.01em' }}>{solution.delivery_days || 5} days estimated build time</span>
                </div>

                <Link to={`/install/${solution.id}?type=custom`} className="block mb-2.5">
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="shimmer-btn w-full bg-white text-black font-bold text-sm rounded-2xl py-4 flex items-center justify-center gap-2 transition-all"
                  >
                    Start Project Scoping
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
                
                <button
                  className="w-full glass rounded-2xl py-3.5 text-white/60 hover:text-white text-sm flex items-center justify-center gap-2 transition-colors border border-white/6 hover:border-white/15"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact Developer
                </button>
              </motion.div>
              
              {solution.demo_url && (
                <div className="text-center mt-4">
                  <a href={solution.demo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-white/30 hover:text-white/80 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" /> OPEN FULL DEMO
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="border-t border-white/6 pt-8">
      <h2 className="text-white font-bold text-xl mb-5" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.04em' }}>{title}</h2>
      {children}
    </div>
  );
}