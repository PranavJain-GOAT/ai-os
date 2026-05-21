import { motion } from "framer-motion";
import { Search, Settings, Code, Rocket } from "lucide-react";

const steps = [
  {
    title: "Browse Solutions",
    description: "Explore reusable business systems built by developers. Find the perfect fit for your industry, from AI chatbots to full-scale automation workflows.",
    icon: Search,
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-cyan-400"
  },
  {
    title: "Configure Your Business",
    description: "Upload menus, product data, branding, workflows, or custom requests. Our intuitive interface makes it easy to provide all the context the system needs.",
    icon: Settings,
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-pink-400"
  },
  {
    title: "Developer Customization",
    description: "The developer receives your requirements and prepares the final deployment. They ensure everything is tailored perfectly to your specific business logic.",
    icon: Code,
    color: "from-orange-500/20 to-yellow-500/20",
    iconColor: "text-orange-400"
  },
  {
    title: "Go Live",
    description: "Receive your hosted system, integrations, and deployment access directly through the platform. Start transforming your business operations immediately.",
    icon: Rocket,
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-emerald-400"
  },
];

export default function HowWorksSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative" id="how-works">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="mb-16">
        <h2 className="text-white font-bold text-4xl sm:text-5xl mb-4" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.04em" }}>
          How Deployra Works
        </h2>
        <p className="text-white/40 max-w-2xl text-lg font-mono">
          The most efficient path from business requirement to production-ready AI solution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-2xl`} />
            
            <div className="relative h-full p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl hover:border-white/20 transition-all duration-500 flex flex-col">
              <div className={`w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <step.icon className={`w-7 h-7 ${step.iconColor}`} />
              </div>
              
              <h3 className="text-white font-bold text-xl mb-4" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
                {step.title}
              </h3>
              
              <p className="text-white/50 text-sm leading-relaxed mb-6 font-mono">
                {step.description}
              </p>

              <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                <span className="w-8 h-px bg-white/10" />
                Step {i + 1}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
