import { motion } from "framer-motion";
import { Shield, Zap, Code2, Lock, Globe, Activity, ArrowRight, Terminal } from "lucide-react";
import { Link } from "react-router-dom";

const FEATURES = [
  {
    icon: Zap,
    title: "Sub-5 Minute Deploy",
    desc: "From checkout to live AI system in under 300 seconds. No DevOps. No engineers. Automated provisioning at scale.",
    stat: "< 5 min",
    statLabel: "avg deploy time",
    color: "#4D9FFF",
  },
  {
    icon: Shield,
    title: "SOC 2 Type II Security",
    desc: "AES-256 encryption at rest and in transit. Zero-trust architecture. Your data never leaves your jurisdiction.",
    stat: "256-bit",
    statLabel: "encryption standard",
    color: "#4D9FFF",
  },
  {
    icon: Globe,
    title: "Global Edge Network",
    desc: "18 PoPs across 6 continents. Sub-100ms response times worldwide. Automatic geo-routing and failover.",
    stat: "99.9%",
    statLabel: "uptime SLA",
    color: "#C0C0C0",
  },
  {
    icon: Activity,
    title: "Real-Time Analytics",
    desc: "Live dashboards. Conversation transcripts. Automation logs. Full observability into every AI interaction.",
    stat: "∞",
    statLabel: "data retention",
    color: "#4D9FFF",
  },
  {
    icon: Code2,
    title: "API-First Architecture",
    desc: "REST + WebSocket APIs. Webhook events. Custom integrations with any stack. Full developer documentation.",
    stat: "< 50ms",
    statLabel: "avg API latency",
    color: "#4D9FFF",
  },
  {
    icon: Lock,
    title: "Role-Based Access",
    desc: "Granular permissions. SSO/SAML support. Audit logs. Enterprise-ready access control for any team size.",
    stat: "RBAC",
    statLabel: "access control",
    color: "#C0C0C0",
  },
];

const CODE_LINES = [
  { type: "comment", text: "// Install your AI system in 3 lines" },
  { type: "keyword", text: "import", rest: " { AIStack } from '@aistack/sdk';" },
  { type: "blank", text: "" },
  { type: "keyword", text: "const", rest: " ai = new AIStack({" },
  { type: "prop", text: "  apiKey:", rest: " process.env.AISTACK_KEY," },
  { type: "prop", text: "  system:", rest: " 'whatsapp-order-bot'," },
  { type: "prop", text: "  locale:", rest: " 'en-US'," },
  { type: "text", text: "});" },
  { type: "blank", text: "" },
  { type: "comment", text: "// Go live instantly" },
  { type: "keyword", text: "await", rest: " ai.deploy();" },
  { type: "comment", text: "// ✓ Your AI is live in < 5 minutes" },
];

function CodeLine({ line, delay }) {
  const colors = {
    comment: "rgba(255,255,255,0.25)",
    keyword: "#4D9FFF",
    prop: "#4D9FFF",
    text: "rgba(255,255,255,0.7)",
    blank: "transparent",
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-baseline gap-0 leading-7"
    >
      <span className="text-white/15 text-[11px] font-mono w-7 shrink-0 select-none">{line.type !== "blank" ? delay * 10 | 0 : ""}</span>
      <span style={{ color: colors[line.type] || "white", fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>
        {line.text}
        {line.rest && <span className="text-white/70">{line.rest}</span>}
      </span>
    </motion.div>
  );
}

export default function Features() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-16 pb-24 border-b border-white/6 overflow-hidden">
        <div className="absolute inset-0 dark-grid opacity-40" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="tech-label text-white/25 tracking-[0.25em] mb-4">CAPABILITIES</p>
            <h1 className="text-white font-bold leading-none mb-5"
              style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.8rem,6vw,4.5rem)', letterSpacing: '-0.04em' }}>
              Enterprise-grade.<br />
              <span className="text-mask">Zero compromise.</span>
            </h1>
            <p className="text-white/35 text-base max-w-xl mx-auto leading-relaxed" style={{ letterSpacing: '-0.01em' }}>
              Every AIStack system is built to the highest standards of performance, security, and reliability. Here's what's under the hood.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.55 }}
              className="radial-card rounded-2xl p-6 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-10 h-10 glass rounded-xl flex items-center justify-center">
                  <f.icon className="w-4 h-4" style={{ color: f.color }} />
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-xl" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.04em', color: f.color }}>{f.stat}</div>
                  <div className="tech-label text-white/25">{f.statLabel}</div>
                </div>
              </div>
              <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.03em' }}>{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed" style={{ letterSpacing: '-0.01em' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* IDE Section — Developer Appeal */}
      <section className="border-t border-white/6 py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <p className="tech-label text-white/25 tracking-[0.25em] mb-4">FOR DEVELOPERS</p>
              <h2 className="text-white font-bold mb-4"
                style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.04em' }}>
                Build. List. Earn.
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-md" style={{ letterSpacing: '-0.01em' }}>
                Ship your AI systems to a global marketplace of 500+ businesses. Keep 70% of every sale. Set your own price. Our SDK makes listing effortless.
              </p>
              <Link to="/developer/login">
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="shimmer-btn inline-flex items-center gap-2 bg-white text-black font-bold text-sm px-6 py-3.5 rounded-xl"
                >
                  <Terminal className="w-4 h-4" />
                  Apply as Developer
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>

            {/* IDE Code Block */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden border border-white/10"
                style={{ background: '#0D1117' }}>
                {/* IDE titlebar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6"
                  style={{ background: '#161B22' }}>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
                  </div>
                  <span className="tech-label text-white/25 ml-3">aistack-deploy.js</span>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-green pulse-aura" />
                    <span className="tech-label text-cyber-green/70">LIVE</span>
                  </div>
                </div>
                {/* Code */}
                <div className="p-5">
                  {CODE_LINES.map((line, i) => (
                    <CodeLine key={i} line={line} delay={0.1 + i * 0.07} />
                  ))}
                </div>
              </div>
              {/* Glow behind */}
              <div className="absolute -inset-4 rounded-3xl -z-10 blur-2xl opacity-20"
                style={{ background: 'radial-gradient(ellipse, rgba(77,159,255,0.4) 0%, transparent 70%)' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/6 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-white font-bold mb-6"
            style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.04em' }}>
            Start deploying today.
          </h2>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="shimmer-btn inline-flex items-center gap-2 bg-white text-black font-bold text-sm px-7 py-4 rounded-2xl">
                Browse Marketplace <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
            <Link to="/pricing">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 text-white/60 hover:text-white border border-white/15 hover:border-white/30 font-semibold text-sm px-7 py-4 rounded-2xl transition-all">
                View Pricing
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}