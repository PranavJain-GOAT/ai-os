import { UtensilsCrossed, Scissors, ShoppingCart, Building2, Stethoscope, GraduationCap } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import WordReveal from "./WordReveal";

const USE_CASES = [
  { icon: UtensilsCrossed, label: "Restaurants", desc: "Orders & reservations" },
  { icon: Scissors, label: "Salons", desc: "Smart booking" },
  { icon: ShoppingCart, label: "E-commerce", desc: "AI product recs" },
  { icon: Building2, label: "Real Estate", desc: "Lead capture" },
  { icon: Stethoscope, label: "Healthcare", desc: "Appointments" },
  { icon: GraduationCap, label: "Education", desc: "Student portals" },
];

export default function UseCasesSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
  const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-20 border-t border-white/6 relative overflow-hidden">
      <div className="absolute inset-0 dark-grid opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-mono tracking-[0.25em] text-white/25 mb-3">USE CASES</p>
          <WordReveal text="Built for every industry" tag="h2" className="text-white font-bold" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.04em' }} />
        </motion.div>
        <div className="relative pt-10 pb-10">
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-px bg-white/10 sm:-translate-x-1/2 block" />
          
          {/* Scroll-Triggered Beam */}
          <motion.div 
             style={{ height: beamHeight }} 
             className="absolute left-4 sm:left-1/2 top-4 w-[2px] bg-gradient-to-b from-transparent via-[#00FF41] to-transparent sm:-translate-x-1/2 block shadow-[0_0_15px_rgba(0,255,65,0.8)] z-0 rounded-full" 
          />
          
          <div className="flex flex-col gap-12 sm:gap-24 relative z-10 pl-8 sm:pl-0">
            {USE_CASES.map((uc, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={uc.label} className={`flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} justify-center sm:justify-center w-full relative sm:px-0 px-4`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`radial-card w-full sm:w-[320px] rounded-3xl p-6 cursor-pointer group relative z-10 ${isEven ? 'md:mr-24' : 'md:ml-24'}`}
                  >
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                      <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:border-white/40 transition-all shadow-xl">
                        <uc.icon className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
                      </div>
                      <div className="text-white font-bold text-xl" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}>{uc.label}</div>
                    </div>
                    <div className="text-white/50 text-sm leading-relaxed relative z-10">{uc.desc} workflows automated. Deploy complex logic without code.</div>

                    {/* Feature Peek Ghost */}
                    <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-sm p-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end border border-cyber-green/20">
                       <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out bg-white/5 border border-white/10 rounded-xl p-3 shadow-2xl glass mb-2">
                           <div className="h-2 w-1/3 bg-white/20 rounded-full mb-2" />
                           <div className="h-1.5 w-full bg-white/10 rounded-full mb-1" />
                           <div className="h-1.5 w-3/4 bg-white/10 rounded-full mb-3" />
                           <div className="flex items-center gap-2 mt-auto">
                               <div className="w-4 h-4 rounded-full bg-cyber-green/20 flex items-center justify-center border border-cyber-green/40">
                                  <span className="w-1.5 h-1.5 bg-cyber-green rounded-full" />
                               </div>
                               <div className="text-[10px] font-mono text-cyber-green tracking-widest uppercase">Agent Online</div>
                           </div>
                       </div>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}