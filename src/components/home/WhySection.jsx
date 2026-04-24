import { motion, AnimatePresence } from "framer-motion";
import { Zap, Shield, Activity, Globe } from "lucide-react";
import WordReveal from "./WordReveal";
import ScrollRevealSection from "../ScrollRevealSection";
import { useState, useEffect } from "react";

function LiveLatencyGraph() {
  const [bars, setBars] = useState(Array(20).fill(20));
  useEffect(() => {
    const timer = setInterval(() => {
      setBars(prev => [...prev.slice(1), 10 + Math.random() * 80]);
    }, 400);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex items-end gap-1.5 h-20 w-full mt-4">
      {bars.map((h, i) => (
         <motion.div key={i} animate={{ height: `${h}%` }} className="flex-1 rounded-t-sm" style={{ background: i > 15 ? '#00FF41' : 'rgba(0,255,65,0.2)' }} />
      ))}
    </div>
  );
}

function RollingEvents() {
  const [events, setEvents] = useState([{ id: 1, text: "Customer ordered via WhatsApp" }, { id: 2, text: "Support ticket grouped via AI" }]);
  useEffect(() => {
    let id = 3;
    const items = ["Payment processed successfully", "New lead generated via Instagram", "Inventory synced to Shopify", "Email drafted to partner", "CRM updated automatically"];
    const timer = setInterval(() => {
      setEvents(prev => [{ id: id++, text: items[Math.floor(Math.random() * items.length)] }, ...prev.slice(0, 3)]);
    }, 1500);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="mt-4 space-y-2 overflow-hidden h-[90px] relative">
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[rgba(10,10,10,0.95)] to-transparent z-10" />
      <AnimatePresence>
        {events.map(ev => (
           <motion.div key={ev.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-white/60 bg-white/5 border border-white/10 px-3 py-2 rounded-lg truncate shadow-sm">
             <span className="w-1.5 h-1.5 rounded-full bg-nova-blue inline-block mr-2" />
             {ev.text}
           </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function WhySection() {
  return (
    <section className="py-24 border-t border-white/6 relative overflow-hidden">
      <div className="absolute inset-0 dark-grid opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16"
        >
          <p className="section-kicker mb-3">CAPABILITIES</p>
          <h2 className="text-white font-bold leading-none mb-4" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', letterSpacing: '-0.04em' }}>
            <WordReveal text="Built for speed. Proven by data." tag="span" className="block" />
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Large Graph */}
          <ScrollRevealSection className="md:col-span-2">
            <motion.div whileHover={{ y: -4 }} className="border-beam-card radial-card rounded-3xl p-8 group h-full flex flex-col justify-between overflow-hidden shadow-2xl">
               <div>
                  <div className="flex items-center gap-3 mb-2">
                     <div className="w-10 h-10 glass rounded-full flex items-center justify-center border border-cyber-green/30 bg-cyber-green/5">
                        <Globe className="w-5 h-5 text-cyber-green" />
                     </div>
                     <span className="text-white font-bold text-xl" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}>Global Edge Network</span>
                  </div>
                  <p className="text-white/40 text-sm ml-14">Lightning fast AI responses routed through our worldwide edge nodes. Ping latency {"<"} 30ms globally.</p>
               </div>
               <LiveLatencyGraph />
            </motion.div>
          </ScrollRevealSection>
          
          {/* Simple Stat */}
          <ScrollRevealSection>
            <motion.div whileHover={{ y: -4 }} className="border-beam-card radial-card rounded-3xl p-8 group h-full flex flex-col justify-center overflow-hidden shadow-2xl">
               <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-white/30 transition-colors">
                  <Shield className="w-6 h-6 text-white/70" />
               </div>
               <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}>Bank-grade Security</h3>
               <p className="text-white/40 text-sm leading-relaxed">SOC 2 compliant and end-to-end encrypted infrastructure powering all agents natively.</p>
            </motion.div>
          </ScrollRevealSection>

          {/* Simple Stat 2 */}
          <ScrollRevealSection>
            <motion.div whileHover={{ y: -4 }} className="border-beam-card radial-card rounded-3xl p-8 group h-full flex flex-col justify-center overflow-hidden shadow-2xl">
               <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-white/30 transition-colors">
                  <Zap className="w-6 h-6 text-white/70" />
               </div>
               <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}>Zero-Config Setup</h3>
               <p className="text-white/40 text-sm leading-relaxed">Click and deploy instantly. No servers to manage, no dependencies to manually install ever.</p>
            </motion.div>
          </ScrollRevealSection>

          {/* Large Feed */}
          <ScrollRevealSection className="md:col-span-2">
            <motion.div whileHover={{ y: -4 }} className="border-beam-card radial-card rounded-3xl p-8 group h-full flex flex-col sm:flex-row justify-between sm:items-center overflow-hidden shadow-2xl gap-8">
               <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="w-10 h-10 glass rounded-full flex items-center justify-center border border-nova-blue/30 bg-nova-blue/5">
                        <Activity className="w-5 h-5 text-nova-blue" />
                     </div>
                     <span className="text-white font-bold text-xl" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}>Real-time Analytics</span>
                  </div>
                  <p className="text-white/40 text-sm ml-14">Monitor all agent actions, system status, and automated CRM events instantly as they seamlessly occur.</p>
               </div>
               <div className="w-full sm:w-1/2">
                   <RollingEvents />
               </div>
            </motion.div>
          </ScrollRevealSection>

        </div>
      </div>
    </section>
  );
}