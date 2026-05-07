import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Filter, Search, ChevronDown, Download, Trash2, Circle } from "lucide-react";

/* ─────────────────────────────────────────────
   MOCK LOG DATA
───────────────────────────────────────────── */
const ALL_LOGS = [
  { id: 1,  ts: "10:25:30.142", agent: "Support Chatbot",  level: "info",    msg: "Request received from ceo@startup.com — session abc123" },
  { id: 2,  ts: "10:25:30.158", agent: "Support Chatbot",  level: "debug",   msg: "Tokenizing input... 42 tokens detected" },
  { id: 3,  ts: "10:25:30.204", agent: "Support Chatbot",  level: "info",    msg: "[THINKING] Searching knowledge base for: 'password reset'" },
  { id: 4,  ts: "10:25:30.381", agent: "Support Chatbot",  level: "success", msg: "Response generated: 98 tokens in 177ms" },
  { id: 5,  ts: "10:25:30.392", agent: "Support Chatbot",  level: "info",    msg: "Sent to client. Status: 200 OK" },
  { id: 6,  ts: "10:22:04.011", agent: "Data Extractor",   level: "info",    msg: "Batch job started — 58,412 records queued" },
  { id: 7,  ts: "10:22:04.390", agent: "Data Extractor",   level: "warning", msg: "Rate limit: 80% of daily budget consumed" },
  { id: 8,  ts: "10:22:05.001", agent: "Data Extractor",   level: "error",   msg: "HTTP 500: Upstream service timed out — retry 1/3" },
  { id: 9,  ts: "10:22:05.801", agent: "Data Extractor",   level: "error",   msg: "HTTP 500: Upstream service timed out — retry 2/3" },
  { id: 10, ts: "10:22:07.001", agent: "Data Extractor",   level: "success", msg: "Retry 3/3 succeeded — 58,410 records extracted" },
  { id: 11, ts: "09:55:12.000", agent: "WhatsApp Bot",     level: "info",    msg: "New order webhook received from Shopify" },
  { id: 12, ts: "09:55:12.044", agent: "WhatsApp Bot",     level: "debug",   msg: "Payload parsed: { order_id: 'ORD-8821', total: '$149' }" },
  { id: 13, ts: "09:55:12.201", agent: "WhatsApp Bot",     level: "error",   msg: "HTTP 404: /api/customer/lookup — endpoint not found" },
  { id: 14, ts: "09:55:12.220", agent: "WhatsApp Bot",     level: "warning", msg: "Falling back to default response template" },
  { id: 15, ts: "09:55:12.388", agent: "WhatsApp Bot",     level: "success", msg: "Message sent via WhatsApp API — delivery confirmed" },
];

const LEVEL_COLORS = {
  info:    { color: "hsl(var(--foreground))",  label: "INFO" },
  debug:   { color: "hsl(var(--foreground))", label: "DEBUG" },
  success: { color: "hsl(var(--foreground))", label: "OK" },
  warning: { color: "hsl(var(--foreground))", label: "WARN" },
  error:   { color: "hsl(var(--foreground))", label: "ERR" },
};

const AGENTS = ["All Agents", "Support Chatbot", "Data Extractor", "WhatsApp Bot"];
const LEVELS = ["All Levels", "info", "debug", "success", "warning", "error"];

/* ─────────────────────────────────────────────
   LOG LINE
───────────────────────────────────────────── */
function LogLine({ log, index }) {
  const lv = LEVEL_COLORS[log.level];
  const isError = log.level === "error";

  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.025, duration: 0.3 }}
      className="flex items-start gap-2 py-1 px-3 rounded font-mono text-xs group hover:bg-white/[0.025] transition-colors"
      style={{
        background: isError ? "rgba(150,150,150,0.04)" : "transparent",
        borderLeft: isError ? "2px solid rgba(150,150,150,0.4)" : "2px solid transparent",
      }}
    >
      {/* Timestamp */}
      <span className="flex-shrink-0 select-none" style={{ color: "hsl(var(--foreground) / 0.2)", minWidth: 96 }}>
        {log.ts}
      </span>

      {/* Agent */}
      <span className="flex-shrink-0" style={{ color: "hsl(var(--foreground))", minWidth: 112 }}>
        [{log.agent.split(" ")[0]}]
      </span>

      {/* Level badge */}
      <span
        className="flex-shrink-0 font-bold text-[10px] px-1.5 rounded"
        style={{
          color: lv.color,
          background: `${lv.color}15`,
          minWidth: 46,
          textAlign: "center",
          letterSpacing: "0.04em",
        }}
      >
        {lv.label}
      </span>

      {/* Message */}
      <span
        className="flex-1"
        style={{
          color: isError
            ? "hsl(var(--foreground))"
            : log.level === "success"
            ? "hsl(var(--foreground))"
            : log.level === "warning"
            ? "hsl(var(--foreground))"
            : log.level === "debug"
            ? "hsl(var(--foreground))"
            : "hsl(var(--foreground) / 0.6)",
          wordBreak: "break-all",
        }}
      >
        {log.msg}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function LogsDebugger() {
  const [agent,   setAgent]   = useState("All Agents");
  const [level,   setLevel]   = useState("All Levels");
  const [search,  setSearch]  = useState("");
  const [logs,    setLogs]    = useState(ALL_LOGS);
  const [live,    setLive]    = useState(true);
  const bottomRef = useRef(null);

  /* Simulate new live log line every 4s */
  useEffect(() => {
    if (!live) return;
    const LIVE_EVENTS = [
      { agent: "Support Chatbot", level: "info",    msg: "New session started" },
      { agent: "Support Chatbot", level: "success", msg: "Response delivered in 19ms" },
      { agent: "Data Extractor",  level: "info",    msg: "Batch resumed — 1,200 records pending" },
      { agent: "WhatsApp Bot",    level: "debug",   msg: "Webhook received: order.placed" },
    ];
    const int = setInterval(() => {
      const ev = LIVE_EVENTS[Math.floor(Math.random() * LIVE_EVENTS.length)];
      setLogs((p) => [
        ...p,
        { id: Date.now(), ts: new Date().toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }) + ".000",
          ...ev },
      ]);
    }, 4000);
    return () => clearInterval(int);
  }, [live]);

  /* Auto-scroll to bottom */
  useEffect(() => {
    if (live) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs, live]);

  const filtered = logs.filter((l) => {
    const matchAgent = agent === "All Agents" || l.agent === agent;
    const matchLevel = level === "All Levels" || l.level === level;
    const matchSearch = search === "" || l.msg.toLowerCase().includes(search.toLowerCase()) || l.agent.toLowerCase().includes(search.toLowerCase());
    return matchAgent && matchLevel && matchSearch;
  });

  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-white font-bold text-2xl sm:text-3xl" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.04em" }}>
            Logs & Debugger
          </h1>
          <p className="text-sm mt-1" style={{ color: "hsl(var(--foreground) / 0.35)", fontFamily: "'Inter', sans-serif" }}>
            Raw AI output, error highlighting, and real-time event stream.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLive((p) => !p)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all"
            style={{
              background: live ? "rgba(150,150,150,0.12)" : "hsl(var(--foreground) / 0.04)",
              color:      live ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.4)",
              border:     live ? "0.5px solid rgba(150,150,150,0.25)" : "0.5px solid hsl(var(--foreground) / 0.08)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full block"
              style={{ background: live ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.3)", animation: live ? "orb-pulse-active 2.4s ease-in-out infinite" : "none" }} />
            {live ? "LIVE" : "PAUSED"}
          </button>
          <button
            onClick={() => setLogs([])}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs transition-all"
            style={{ background: "rgba(150,150,150,0.06)", color: "rgba(150,150,150,0.5)", border: "0.5px solid rgba(150,150,150,0.12)", fontFamily: "'Inter', sans-serif" }}
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "hsl(var(--foreground) / 0.2)" }} />
          <input
            className="pl-8 pr-3 py-2 rounded-xl text-xs outline-none bg-transparent text-white placeholder-white/20"
            style={{ border: "0.5px solid hsl(var(--foreground) / 0.1)", fontFamily: "'Inter', sans-serif", minWidth: 200 }}
            placeholder="Search logs…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 rounded-xl text-xs outline-none"
          style={{ background: "hsl(var(--foreground) / 0.04)", border: "0.5px solid hsl(var(--foreground) / 0.08)", color: "hsl(var(--foreground) / 0.6)", fontFamily: "'Inter', sans-serif" }}
          value={agent} onChange={(e) => setAgent(e.target.value)}
        >
          {AGENTS.map((a) => <option key={a}>{a}</option>)}
        </select>
        <select
          className="px-3 py-2 rounded-xl text-xs outline-none"
          style={{ background: "hsl(var(--foreground) / 0.04)", border: "0.5px solid hsl(var(--foreground) / 0.08)", color: "hsl(var(--foreground) / 0.6)", fontFamily: "'Inter', sans-serif" }}
          value={level} onChange={(e) => setLevel(e.target.value)}
        >
          {LEVELS.map((l) => <option key={l}>{l}</option>)}
        </select>
        <span className="text-xs ml-auto" style={{ color: "hsl(var(--foreground) / 0.2)", fontFamily: "'JetBrains Mono', monospace" }}>
          {filtered.length} lines
        </span>
      </div>

      {/* Terminal */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "hsl(var(--card))",
          border: "0.5px solid rgba(150,150,150,0.15)",
          boxShadow: "0 0 60px rgba(0,0,0,0.8) inset",
        }}
      >
        {/* Terminal bar */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ borderColor: "hsl(var(--foreground) / 0.06)", background: "rgba(0,0,0,0.9)" }}
        >
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(var(--card))" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(var(--card))" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(var(--card))" }} />
          <span className="ml-3 text-[11px]" style={{ color: "hsl(var(--foreground) / 0.25)", fontFamily: "'JetBrains Mono', monospace" }}>
            deployra-debugger — bash
          </span>
        </div>

        {/* Log lines */}
        <div className="p-3 h-[440px] overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(150,150,150,0.2) transparent" }}>
          {filtered.length === 0 ? (
            <div className="flex items-center gap-2 py-4 px-3 text-xs" style={{ color: "hsl(var(--foreground) / 0.2)", fontFamily: "'JetBrains Mono', monospace" }}>
              <span style={{ color: "hsl(var(--foreground))" }}>$</span> No logs match the current filter…
            </div>
          ) : (
            filtered.map((log, i) => <LogLine key={log.id} log={log} index={i} />)
          )}

          {/* Blinking cursor */}
          <div className="flex items-center gap-2 py-1 px-3">
            <span className="text-xs" style={{ color: "hsl(var(--foreground))", fontFamily: "'JetBrains Mono', monospace" }}>$</span>
            <span
              className="w-2 h-3.5 rounded-sm"
              style={{ background: "hsl(var(--card))", animation: "priority-flicker 1s ease-in-out infinite" }}
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
