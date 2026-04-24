/**
 * DashboardToggle — premium animated mode-switcher
 * Shows only when localStorage user_role === "both"
 * Renders a sliding-pill toggle that navigates between
 * /client and /developer dashboard roots.
 */
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Code2, ArrowLeftRight } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

export default function DashboardToggle({ compact = false }) {
  const navigate = useNavigate();
  const location  = useLocation();
  const userRole  = localStorage.getItem("user_role") || "client";
  const { isDark } = useTheme();

  // Only render for dual-role users
  if (userRole !== "both") return null;

  const isClient = location.pathname.startsWith("/client");
  const isDev    = location.pathname.startsWith("/developer");
  // If on neither, treat based on whichever side we came from
  const active   = isDev ? "dev" : "client";

  const switchTo = (mode) => {
    if (mode === "client" && !isClient)   navigate("/client");
    if (mode === "dev"    && !isDev)      navigate("/developer");
  };

  if (compact) {
    /* ── Compact horizontal pill used inside sidebar header areas ── */
    return (
      <div
        className="flex items-center rounded-xl overflow-hidden relative"
        style={{
          background: isDark ? "hsl(var(--foreground) / 0.04)" : "rgba(0,0,0,0.04)",
          border: isDark ? "0.5px solid hsl(var(--foreground) / 0.08)" : "0.5px solid rgba(0,0,0,0.08)",
          padding: "2px",
        }}
        title={`Switch to ${active === "client" ? "Developer" : "Client"} dashboard`}
      >
        {/* Sliding indicator */}
        <motion.div
          className="absolute top-[2px] bottom-[2px] rounded-[9px]"
          layout
          animate={{
            left:  active === "client" ? "2px" : "50%",
            right: active === "dev"    ? "2px" : "50%",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          style={{
            background: active === "client"
              ? "linear-gradient(135deg, rgba(150,150,150,0.25), rgba(150,150,150,0.12))"
              : "linear-gradient(135deg, rgba(150,150,150,0.25), rgba(150,150,150,0.12))",
            boxShadow: active === "client"
              ? "0 0 8px rgba(150,150,150,0.2)"
              : "0 0 8px rgba(150,150,150,0.2)",
            border: active === "client"
              ? "0.5px solid rgba(150,150,150,0.2)"
              : "0.5px solid rgba(150,150,150,0.2)",
          }}
        />

        {[
          { id: "client", Icon: ShoppingBag, label: "Client" },
          { id: "dev",    Icon: Code2,       label: "Dev" },
        ].map(({ id, Icon, label }) => (
          <button
            key={id}
            onClick={() => switchTo(id)}
            className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors"
            style={{
              color: active === id ? (isDark ? "white" : "black") : (isDark ? "hsl(var(--foreground) / 0.35)" : "rgba(0,0,0,0.4)"),
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.02em",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Icon className="w-3 h-3" />
            {label}
          </button>
        ))}
      </div>
    );
  }

  /* ── Full floating toggle bar (used at bottom of sidebar) ── */
  return (
    <div
      className="mx-3 mb-1 rounded-2xl overflow-hidden"
      style={{
        background: isDark ? "rgba(0,0,0,0.9)" : "rgba(250,250,250,0.9)",
        border: isDark ? "0.5px solid hsl(var(--foreground) / 0.07)" : "0.5px solid rgba(0,0,0,0.07)",
      }}
    >
      {/* Label */}
      <div
        className="flex items-center gap-1.5 px-4 pt-3 pb-2"
      >
        <ArrowLeftRight className="w-3 h-3" style={{ color: isDark ? "hsl(var(--foreground) / 0.2)" : "rgba(0,0,0,0.3)" }} />
        <span
          className="text-[10px] tracking-widest font-semibold uppercase"
          style={{ color: isDark ? "hsl(var(--foreground) / 0.2)" : "rgba(0,0,0,0.3)", fontFamily: "'Inter', sans-serif" }}
        >
          Switch Mode
        </span>
      </div>

      {/* Toggle pill row */}
      <div className="relative flex px-3 pb-3 gap-2">
        {[
          {
            id: "client",
            Icon: ShoppingBag,
            label: "Client Hub",
            sub: "AI Command Center",
            color: "hsl(var(--foreground))",
            path: "/client",
          },
          {
            id: "dev",
            Icon: Code2,
            label: "Dev Portal",
            sub: "Build & Deploy",
            color: "hsl(var(--foreground))",
            path: "/developer",
          },
        ].map(({ id, Icon, label, sub, color, path }) => {
          const isOn = active === id;
          return (
              <motion.button
              key={id}
              onClick={() => switchTo(id)}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl relative overflow-hidden transition-all"
              style={{
                background: isOn ? `hsl(var(--foreground) / 0.08)` : (isDark ? "hsl(var(--foreground) / 0.025)" : "rgba(0,0,0,0.03)"),
                border: isOn ? `0.5px solid hsl(var(--foreground) / 0.2)` : (isDark ? "0.5px solid hsl(var(--foreground) / 0.06)" : "0.5px solid rgba(0,0,0,0.06)"),
                boxShadow: isOn ? `0 0 16px hsl(var(--foreground) / 0.1)` : "none",
              }}
            >
              {/* Active shimmer */}
              {isOn && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                  style={{
                    background: `linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.1), transparent)`,
                    width: "60%",
                  }}
                />
              )}

              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{
                  background: isOn ? `hsl(var(--foreground) / 0.12)` : (isDark ? "hsl(var(--foreground) / 0.05)" : "rgba(0,0,0,0.05)"),
                  border: `0.5px solid ${isOn ? color + "30" : (isDark ? "hsl(var(--foreground) / 0.06)" : "rgba(0,0,0,0.1)")}`,
                }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: isOn ? color : (isDark ? "hsl(var(--foreground) / 0.35)" : "rgba(0,0,0,0.4)") }} />
              </div>

              <div
                className="text-[11px] font-bold leading-tight"
                style={{
                  color: isOn ? (isDark ? "white" : "black") : (isDark ? "hsl(var(--foreground) / 0.35)" : "rgba(0,0,0,0.45)"),
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {label}
              </div>
              <div
                className="text-[9px] leading-tight"
                style={{
                  color: isOn ? `hsl(var(--foreground) / 0.8)` : (isDark ? "hsl(var(--foreground) / 0.15)" : "rgba(0,0,0,0.3)"),
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "0.02em",
                }}
              >
                {sub}
              </div>

              {/* Active dot */}
              {isOn && (
                <motion.span
                  className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ background: color, boxShadow: `0 0 4px ${color}` }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
