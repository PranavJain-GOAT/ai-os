import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MOCK_CUSTOM_SOLUTIONS } from "@/api/mockData";
import { Star, Wrench, ArrowRight, Check, X, Clock, Users, ExternalLink, MessageCircle, ChevronLeft, Zap, Activity, Play, ArrowUpRight, ListChecks, LifeBuoy, CreditCard } from "lucide-react";
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
                    className="shimmer-btn inline-flex items-center justify-center gap-2 bg-white text-black font-bold text-sm px-7 py-4 rounded-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all w-full sm:w-auto"
                  >
                    <CreditCard className="w-4 h-4" />
                    Purchase Setup — Starts at ${solution.price_min}
                  </motion.button>
                </Link>
              </div>
            </div>
            
            {/* Clean product screenshot with permanently visible demo overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              onClick={() => solution.demo_url && window.open(solution.demo_url, '_blank')}
              className={`rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative ${solution.demo_url ? 'cursor-pointer group' : ''}`}
            >
              {solution.demo_url && (
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center z-10 backdrop-blur-[2px]">
                  <div className="w-16 h-16 glass rounded-full flex items-center justify-center border border-white/20 shadow-2xl mb-4 group-hover:scale-110 group-hover:bg-white/10 transition-all">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                  <p className="text-white font-bold text-lg flex items-center gap-2 group-hover:text-white/80 transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
                    View Demo <ArrowUpRight className="w-5 h-5 text-cyber-green" />
                  </p>
                </div>
              )}
              {solution.image_url ? (
                <img
                  src={solution.image_url}
                  alt={solution.title}
                  className={`w-full h-full object-cover ${solution.demo_url ? 'group-hover:scale-105 transition-transform duration-700' : ''}`}
                  style={{ maxHeight: '420px', objectPosition: 'top' }}
                />
              ) : (
                <div className={`aspect-video bg-white/3 flex items-center justify-center ${solution.demo_url ? 'group-hover:scale-105 transition-transform duration-700' : ''}`}>
                  <Zap className="w-12 h-12 text-white/10" />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-10">
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

            {solution.how_it_works?.length > 0 && (
              <Section title="How it Works">
                <div className="space-y-4">
                  {solution.how_it_works.map((step, idx) => (
                    <div key={idx} className="glass rounded-2xl p-5 border border-white/6 flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center font-mono font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1">{step.title}</h4>
                        <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {solution.prerequisites?.length > 0 && (
              <Section title="Prerequisites & Requirements">
                <div className="glass rounded-2xl p-5 border border-white/6">
                  <ul className="space-y-3">
                    {solution.prerequisites.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <ListChecks className="w-4 h-4 mt-0.5 text-white/40 shrink-0" />
                        <span className="text-sm text-white/70">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>
            )}

            {solution.support_policy && (
              <Section title="Support & Maintenance">
                <div className="glass rounded-2xl p-5 border border-white/6 flex items-start gap-4">
                  <LifeBuoy className="w-5 h-5 mt-0.5 text-[#4D9FFF] shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-1">Post-Purchase Support</h4>
                    <p className="text-sm text-white/60 leading-relaxed">{solution.support_policy}</p>
                  </div>
                </div>
              </Section>
            )}

            {solution.preview_images?.length > 0 && (
              <Section title="Interface Previews">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {solution.preview_images.map((img, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-white/10 glass aspect-video group cursor-pointer relative">
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                          <span className="text-white text-xs font-bold tracking-widest uppercase">Expand</span>
                        </div>
                      </div>
                      <img src={img} alt={`Preview ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  ))}
                </div>
              </Section>
            )}
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