import { useState, useEffect, useRef } from "react";
import { MOCK_PRODUCTS } from "@/api/mockData";
import { Link, useNavigate } from "react-router-dom";
import {
  Package, DollarSign, Download, TrendingUp, Plus, Clock,
  CheckCircle, AlertCircle, Copy, Check, Terminal, X,
  Zap, Activity, Award, ChevronRight, BarChart2, Command,
  ArrowUpRight, Sparkles, Radio
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ════════════════════════════════════════════════════════════
   MOCK DATA
════════════════════════════════════════════════════════════ */
const MOCK_ORDERS = [
  { id: "txn_3PqRs8Jk2m", product_title: "Handle WhatsApp Orders Automatically", customer_email: "test1@example.com",  amount: 49,  status: "paid",      time: "10:22:04" },
  { id: "txn_1MnXt9Lp7q", product_title: "AI Customer Support Chatbot",           customer_email: "ceo@startup.com",    amount: 39,  status: "installed", time: "10:18:31" },
  { id: "txn_5RqWu2Dn4f", product_title: "Smart Appointment Booking System",      customer_email: "booking@clinic.com", amount: 29,  status: "pending",   time: "09:55:12" },
  { id: "txn_8KpZv6Cs1a", product_title: "Automated Data Extractor",              customer_email: "ops@corp.io",        amount: 19,  status: "paid",      time: "09:40:07" },
  { id: "txn_2QlYr3Bk9e", product_title: "Lead Qualifier AI",                     customer_email: "sales@biz.com",      amount: 59,  status: "installed", time: "09:12:44" },
];

const SPARKLINE_DATA = [22, 38, 31, 55, 48, 71, 88];

const ACTIVITY_LOG = [
  { time: "10:25:30", event: "New Install: WhatsApp Bot",       type: "install" },
  { time: "10:22:04", event: "API Request: Success",            type: "api" },
  { time: "10:18:31", event: "Payment Received: $39",           type: "payment" },
  { time: "10:15:12", event: "New Install: Support Chatbot",    type: "install" },
  { time: "09:55:12", event: "Order Created: Booking System",   type: "order" },
  { time: "09:44:00", event: "API Request: Success",            type: "api" },
  { time: "09:40:07", event: "Payment Received: $49",           type: "payment" },
  { time: "09:38:22", event: "Deployment Health: 99.9%",        type: "system" },
  { time: "09:30:01", event: "New Install: Data Extractor",     type: "install" },
  { time: "09:12:44", event: "Payment Received: $59",           type: "payment" },
];

/* ════════════════════════════════════════════════════════════
   MINI SPARKLINE SVG
════════════════════════════════════════════════════════════ */
function Sparkline({ data, color = "hsl(var(--foreground))", width = 80, height = 28 }) {
  const max  = Math.max(...data);
  const min  = Math.min(...data);
  const range = max - min || 1;
  const pts  = data.map((v, i) => [
    (i / (data.length - 1)) * width,
    height - ((v - min) / range) * height,
  ]);
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");

  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`spark-grad-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${d} L${width},${height} L0,${height} Z`}
        fill={`url(#spark-grad-${color.replace("#","")})`}
      />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.5"
        fill={color} style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   STATUS BADGE
════════════════════════════════════════════════════════════ */
function StatusBadge({ status }) {
  if (status === "paid" || status === "installed") {
    return (
      <span className="premium-badge premium-badge-monochrome inline-flex items-center gap-1">
        <CheckCircle className="w-2.5 h-2.5" />
        {status}
      </span>
    );
  }
  return (
    <span className="premium-badge premium-badge-monochrome inline-flex items-center gap-1">
      <Clock className="w-2.5 h-2.5" />
      {status}
    </span>
  );
}

/* ════════════════════════════════════════════════════════════
   DEV CONSOLE MODAL
════════════════════════════════════════════════════════════ */
function DevConsole({ onClose }) {
  const [input,  setInput]  = useState('{\n  "message": "Hello, how do I reset my password?",\n  "context": "user_support"\n}');
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);

  const run = () => {
    setRunning(true);
    setOutput("");
    setTimeout(() => {
      setOutput(JSON.stringify({
        status: "success",
        response: "To reset your password, click 'Forgot Password' on the login page. You'll receive an email within 2 minutes.",
        confidence: 0.97,
        latency_ms: 24,
        model: "gpt-4o-mini",
        tokens_used: 312,
      }, null, 2));
      setRunning(false);
    }, 1200);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-2xl dev-console-panel"
          initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "rgba(150,150,150,0.12)" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(150,150,150,0.15)", border: "0.5px solid rgba(150,150,150,0.3)" }}>
                <Terminal className="w-4 h-4" style={{ color: "hsl(var(--foreground))" }} />
              </div>
              <div>
                <span className="text-white font-bold text-sm block" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>Dev Console</span>
                <span className="text-[10px]" style={{ color: "rgba(150,150,150,0.7)", fontFamily: "'JetBrains Mono', monospace" }}>AI Agent Tester · Live</span>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white transition-colors" style={{ background: "hsl(var(--foreground) / 0.04)" }}>
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 divide-x" style={{ borderColor: "hsl(var(--foreground) / 0.06)", minHeight: 300 }}>
            {/* Input */}
            <div className="p-5">
              <div className="stat-label-caps mb-3">Input JSON</div>
              <textarea
                className="w-full h-48 text-xs resize-none outline-none p-0 bg-transparent"
                style={{ color: "hsl(var(--foreground) / 0.75)", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.7 }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                onClick={run}
                className="mt-4 w-full py-2.5 rounded-xl text-xs font-bold transition-all shimmer-btn"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--foreground)))",
                  color: "white",
                  fontFamily: "'Inter', sans-serif",
                  boxShadow: "0 0 20px rgba(150,150,150,0.3)",
                  letterSpacing: "0.04em",
                }}
              >
                {running ? "⟳ Running..." : "▶  Run Agent"}
              </button>
            </div>

            {/* Output */}
            <div className="p-5">
              <div className="stat-label-caps mb-3">Response</div>
              {running ? (
                <div className="flex items-center gap-2 mt-10">
                  {[0,150,300].map(d => (
                    <div key={d} className="w-1.5 h-1.5 rounded-full bg-foreground/5 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                  ))}
                  <span className="text-xs" style={{ color: "hsl(var(--foreground) / 0.3)", fontFamily: "'JetBrains Mono', monospace" }}>Calling agent...</span>
                </div>
              ) : output ? (
                <pre className="text-xs overflow-auto premium-scroll h-56" style={{ color: "hsl(var(--foreground))", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.7 }}>{output}</pre>
              ) : (
                <p className="text-xs mt-10" style={{ color: "hsl(var(--foreground) / 0.18)", fontFamily: "'JetBrains Mono', monospace" }}>// Response will appear here...</p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ════════════════════════════════════════════════════════════
   COPY ID BUTTON
════════════════════════════════════════════════════════════ */
function CopyId({ id }) {
  const [copied, setCopied] = useState(false);
  const copy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg transition-all"
      style={{
        background: copied ? "rgba(150,150,150,0.15)" : "hsl(var(--foreground) / 0.05)",
        color: copied ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.3)",
        border: `0.5px solid ${copied ? "rgba(150,150,150,0.3)" : "hsl(var(--foreground) / 0.07)"}`,
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {copied ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
      {copied ? "Copied!" : id.slice(0, 14) + "…"}
    </button>
  );
}

/* ════════════════════════════════════════════════════════════
   LIVE ACTIVITY FEED
════════════════════════════════════════════════════════════ */
function ActivityFeed({ log }) {
  const typeColor = {
    install: "hsl(var(--foreground))",
    api:     "hsl(var(--foreground))",
    payment: "hsl(var(--foreground))",
    order:   "hsl(var(--foreground))",
    system:  "hsl(var(--foreground))",
  };
  const typeBg = {
    install: "rgba(150,150,150,0.08)",
    api:     "rgba(150,150,150,0.08)",
    payment: "rgba(150,150,150,0.08)",
    order:   "rgba(150,150,150,0.08)",
    system:  "rgba(150,150,150,0.08)",
  };

  return (
    <div className="frosted-panel h-full flex flex-col overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "0.5px solid hsl(var(--foreground) / 0.05)" }}>
        <div>
          <h3 className="text-white font-bold text-sm" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>Live Stream</h3>
          <p className="stat-label-caps mt-0.5">Events · Real-time</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(150,150,150,0.08)", border: "0.5px solid rgba(150,150,150,0.2)" }}>
          <span className="w-1.5 h-1.5 rounded-full block" style={{ background: "hsl(var(--card))", animation: "orb-pulse-active 2.4s ease-in-out infinite" }} />
          <span className="text-[10px] font-bold" style={{ color: "hsl(var(--foreground))", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em" }}>LIVE</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto premium-scroll p-2">
        {log.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="live-feed-item"
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: typeBg[item.type] || "hsl(var(--foreground) / 0.05)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full block" style={{ background: typeColor[item.type] || "#fff", boxShadow: `0 0 4px ${typeColor[item.type]}` }} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs block truncate" style={{ color: "hsl(var(--foreground) / 0.65)", fontFamily: "'Inter', sans-serif" }}>{item.event}</span>
              <span className="text-[9px]" style={{ color: "hsl(var(--foreground) / 0.2)", fontFamily: "'JetBrains Mono', monospace" }}>{item.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN DASHBOARD
════════════════════════════════════════════════════════════ */
export default function Dashboard() {
  const [solutions,   setSolutions]   = useState([]);
  const [orders,      setOrders]      = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [compact,     setCompact]     = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [chartMode,   setChartMode]   = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setSolutions(MOCK_PRODUCTS);
      setOrders(MOCK_ORDERS);
      setLoading(false);
    }, 400);
  }, []);

  const totalRevenue  = orders.filter((o) => o.status === "paid" || o.status === "installed").reduce((s, o) => s + (o.amount || 0), 0);
  const totalInstalls = orders.filter((o) => o.status === "installed").length;
  const totalPending  = orders.filter((o) => o.status === "pending").length;

  const stats = [
    {
      label: "Total Products",
      value: solutions.length,
      raw: solutions.length,
      max: 10,
      icon: Package,
      color: "hsl(var(--foreground))",
      bg: "rgba(150,150,150,0.06)",
      sub: `${solutions.length}/10 published`,
      sparkData: null,
      trend: null,
    },
    {
      label: "Revenue",
      value: `$${totalRevenue}`,
      raw: totalRevenue,
      max: 200,
      icon: DollarSign,
      color: "hsl(var(--foreground))",
      bg: "rgba(150,150,150,0.06)",
      sub: "+12% this week",
      sparkData: SPARKLINE_DATA,
      trend: "+12%",
    },
    {
      label: "Installs",
      value: totalInstalls,
      raw: totalInstalls,
      max: 5,
      icon: Download,
      color: "hsl(var(--foreground))",
      bg: "rgba(150,150,150,0.06)",
      sub: "Active deployments",
      sparkData: null,
      trend: null,
    },
    {
      label: "Pending Orders",
      value: totalPending,
      raw: totalPending,
      max: 10,
      icon: TrendingUp,
      color: "hsl(var(--foreground))",
      bg: "rgba(150,150,150,0.06)",
      sub: "Awaiting action",
      sparkData: null,
      trend: null,
    },
    {
      label: "Avg. Latency",
      value: "24ms",
      raw: 24,
      max: 100,
      icon: Zap,
      color: "hsl(var(--foreground))",
      bg: "rgba(150,150,150,0.06)",
      sub: "Excellent response",
      sparkData: [30, 28, 22, 25, 20, 24, 24],
      trend: "−8%",
    },
  ];

  if (loading) {
    return (
      <div className="p-6 sm:p-8 max-w-6xl page-fade-in">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
          {[1,2,3,4,5].map((i) => (
            <div key={i} className="skeleton-beam rounded-2xl" style={{ height: 120 }} />
          ))}
        </div>
        <div className="skeleton-beam rounded-2xl" style={{ height: 320 }} />
      </div>
    );
  }

  return (
    <div className={`${compact ? "p-4 sm:p-5" : "p-6 sm:p-8"} max-w-6xl page-fade-in`}>

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="stat-label-caps mb-2">Developer Command Center</div>
          <h1
            className="text-white font-bold text-2xl sm:text-3xl section-title-gradient"
            style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.04em", lineHeight: 1.1 }}
          >
            Dashboard
          </h1>
          <p className="text-sm mt-2" style={{ color: "hsl(var(--foreground) / 0.35)", fontFamily: "'Inter', sans-serif" }}>
            Real-time overview of your products and revenue
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCompact((p) => !p)}
            className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: compact ? "rgba(150,150,150,0.1)" : "hsl(var(--foreground) / 0.04)",
              color: compact ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.4)",
              border: compact ? "0.5px solid rgba(150,150,150,0.25)" : "0.5px solid hsl(var(--foreground) / 0.07)",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            {compact ? "⠿ Compact" : "⠿ Comfy"}
          </button>

          <button
            onClick={() => setShowConsole(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: "hsl(var(--foreground) / 0.04)",
              color: "hsl(var(--foreground) / 0.4)",
              border: "0.5px solid hsl(var(--foreground) / 0.07)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <Terminal className="w-3.5 h-3.5" /> Console
          </button>

          <Link to="/developer/add">
            <button
              className="flex items-center gap-2 text-white font-bold text-xs px-5 py-2.5 rounded-xl shimmer-btn transition-all"
              style={{
                background: "linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--foreground)))",
                boxShadow: "0 0 20px rgba(150,150,150,0.35)",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.04em",
              }}
            >
              <Plus className="w-3.5 h-3.5" />
              Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`premium-stat-card ${compact ? "p-4" : "p-5"} cursor-pointer`}
            style={{
              background: `linear-gradient(135deg, ${s.bg} 0%, rgba(0,0,0,0.8) 100%)`,
              border: `0.5px solid ${s.color}20`,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            whileHover={{ y: -5, boxShadow: `0 20px 60px rgba(0,0,0,0.7), 0 0 0 0.5px ${s.color}35 inset` }}
            onClick={() => s.label === "Revenue" && setChartMode((p) => !p)}
          >
            {/* Glow stamp */}
            <div className="kpi-glow-stamp" style={{ background: s.color }} />

            <div className="flex items-start justify-between mb-3 relative z-10">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${s.color}18`, border: `0.5px solid ${s.color}30` }}
              >
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              {s.sparkData ? (
                <Sparkline data={s.sparkData} color={s.color} />
              ) : s.trend ? (
                <span className="trend-chip-up">{s.trend}</span>
              ) : null}
            </div>

            <div className="relative z-10">
              <div
                className={`font-bold metric-num mb-0.5 ${compact ? "text-xl" : "text-2xl"}`}
                style={{ color: s.color }}
              >
                {s.value}
              </div>
              <div className="text-xs font-medium" style={{ color: "hsl(var(--foreground) / 0.7)", fontFamily: "'Inter', sans-serif" }}>
                {s.label}
              </div>
              {!compact && (
                <div className="stat-label-caps mt-1">{s.sub}</div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Marketplace Rank Widget ── */}
      {!compact && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="frosted-panel p-4 mb-5 flex items-center gap-4"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(150,150,150,0.12)", border: "0.5px solid rgba(150,150,150,0.25)" }}
          >
            <Award className="w-5 h-5" style={{ color: "hsl(var(--foreground))" }} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-white font-semibold text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                Marketplace Rank
              </span>
              <span className="premium-badge premium-badge-monochrome">Automation</span>
            </div>
            <div className="text-xs" style={{ color: "hsl(var(--foreground) / 0.35)", fontFamily: "'Inter', sans-serif" }}>
              Your top product ranks <strong style={{ color: "hsl(var(--foreground))" }}>#3</strong> in Automation · Top 15% of all developers
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-bold metric-num" style={{ color: "hsl(var(--foreground))", fontFamily: "Georgia, serif" }}>#3</div>
            <div className="stat-label-caps">Global Rank</div>
          </div>
          <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(var(--foreground) / 0.15)" }} />
        </motion.div>
      )}

      {/* ── Main Two-Column Area ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Recent Orders — 2/3 width */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {chartMode ? (
              <motion.div
                key="chart"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
                className="frosted-panel overflow-hidden"
              >
                <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "0.5px solid hsl(var(--foreground) / 0.05)" }}>
                  <div>
                    <h2 className="text-white font-bold" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>Revenue — 7 Day</h2>
                    <p className="stat-label-caps mt-0.5">Weekly breakdown</p>
                  </div>
                  <button
                    onClick={() => setChartMode(false)}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
                    style={{ background: "hsl(var(--foreground) / 0.04)", color: "hsl(var(--foreground) / 0.4)", fontFamily: "'Inter', sans-serif", border: "0.5px solid hsl(var(--foreground) / 0.07)" }}
                  >
                    ← Orders
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-end gap-2 justify-between h-36">
                    {SPARKLINE_DATA.map((v, i) => {
                      const maxV = Math.max(...SPARKLINE_DATA);
                      const h = (v / maxV) * 100;
                      const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
                      const isLast = i === SPARKLINE_DATA.length - 1;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                          <span className="text-xs font-bold metric-num" style={{ color: isLast ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.4)", fontFamily: "'JetBrains Mono', monospace" }}>
                            ${v}
                          </span>
                          <motion.div
                            className="w-full rounded-t-lg"
                            style={{
                              background: isLast
                                ? "linear-gradient(180deg, hsl(var(--foreground)), hsl(var(--foreground)))"
                                : "rgba(150,150,150,0.18)",
                              boxShadow: isLast ? "0 0 16px rgba(150,150,150,0.4)" : "none",
                            }}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16,1,0.3,1] }}
                          />
                          <span className="text-[10px]" style={{ color: "hsl(var(--foreground) / 0.25)", fontFamily: "'Inter', sans-serif" }}>{days[i]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
                className="frosted-panel overflow-hidden"
              >
                <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "0.5px solid hsl(var(--foreground) / 0.05)" }}>
                  <div>
                    <h2 className="text-white font-bold" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>Recent Orders</h2>
                    <p className="stat-label-caps mt-0.5">Click Revenue card for chart view</p>
                  </div>
                  <span className="premium-badge premium-badge-monochrome">{orders.length} total</span>
                </div>

                {orders.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-white/30 text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>No orders yet</p>
                  </div>
                ) : (
                  <table className="premium-table w-full">
                    <thead>
                      <tr>
                        <th className="text-left">Product</th>
                        <th className="text-left hidden sm:table-cell">Customer</th>
                        <th className="text-left hidden md:table-cell">Time</th>
                        <th className="text-right">Amount</th>
                        <th className="text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, compact ? 8 : 5).map((o, i) => (
                        <motion.tr
                          key={o.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 + 0.3, duration: 0.4 }}
                          className="group"
                        >
                          <td>
                            <div className="font-medium text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                              {o.product_title.length > 28 ? o.product_title.slice(0,28) + "…" : o.product_title}
                            </div>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <CopyId id={o.id} />
                            </span>
                          </td>
                          <td className="hidden sm:table-cell">
                            <span style={{ color: "hsl(var(--foreground) / 0.35)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem" }}>{o.customer_email}</span>
                          </td>
                          <td className="hidden md:table-cell">
                            <span style={{ color: "hsl(var(--foreground) / 0.25)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem" }}>{o.time}</span>
                          </td>
                          <td className="text-right">
                            <span className="text-white font-bold metric-num" style={{ fontFamily: "'JetBrains Mono', monospace" }}>${o.amount}</span>
                          </td>
                          <td className="text-right">
                            <StatusBadge status={o.status} />
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Activity Feed — 1/3 width */}
        <div className="lg:col-span-1" style={{ minHeight: 400 }}>
          <ActivityFeed log={ACTIVITY_LOG} />
        </div>
      </div>

      {/* Dev Console Modal */}
      {showConsole && <DevConsole onClose={() => setShowConsole(false)} />}
    </div>
  );
}