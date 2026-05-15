import { motion } from "framer-motion";
import { Zap, Shield, Users, Database } from "lucide-react";

const benefits = [
  {
    title: "Faster Than Agencies",
    description: "Launch systems in days instead of months. Our streamlined marketplace eliminates the overhead of traditional agency cycles.",
    icon: Zap,
    color: "from-amber-500/10 to-orange-500/10",
    iconColor: "text-amber-400"
  },
  {
    title: "Reusable Proven Workflows",
    description: "Deploy products already tested by other businesses. Benefit from optimized structures that are known to perform.",
    icon: Database,
    color: "from-blue-500/10 to-indigo-500/10",
    iconColor: "text-blue-400"
  },
  {
    title: "Direct Developer Access",
    description: "Communicate through built-in collaboration channels. Get direct support and customization from the creators themselves.",
    icon: Users,
    color: "from-cyan-500/10 to-teal-500/10",
    iconColor: "text-cyan-400"
  },
  {
    title: "Centralized Deployment",
    description: "Configuration, payments, delivery, and updates managed in one place. No more fragmented tools or complicated handovers.",
    icon: Shield,
    color: "from-rose-500/10 to-red-500/10",
    iconColor: "text-rose-400"
  },
];

export default function WhyBusinessesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative" id="why-businesses">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mb-16">
        <h2 className="text-white font-bold text-4xl sm:text-5xl mb-4" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.04em" }}>
          Why Businesses Use Deployra
        </h2>
        <p className="text-white/40 max-w-2xl text-lg font-mono">
          The platform that bridges the gap between complex AI capabilities and real-world business results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-white/[0.05] to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative h-full p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 flex flex-col">
              <div className={`w-12 h-12 rounded-full bg-white/[0.03] flex items-center justify-center mb-6`}>
                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>
              
              <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
                {item.title}
              </h3>
              
              <p className="text-white/40 text-sm leading-relaxed font-mono">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
