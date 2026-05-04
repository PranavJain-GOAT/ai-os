import { Link, useLocation } from "react-router-dom";
import {
  History, ListTodo, Users, Heart, MessageSquare,
  CreditCard, ArrowLeft, Puzzle, Crown, Zap, BarChart2
} from "lucide-react";
import { useRef } from "react";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { path: "/client",              label: "Command Overview", icon: History,       hint: "Dashboard home" },
      { path: "/client/orders",       label: "Order Management", icon: ListTodo,      hint: "Track projects" },
    ],
  },
  {
    label: "Connect",
    items: [
      { path: "/client/hire",         label: "Dev Direct",       icon: Users,         hint: "Hire developers" },
      { path: "/client/integrations", label: "Integrations",     icon: Puzzle,        hint: "Connect apps", badge: "NEW" },
      { path: "/client/messages",     label: "Messages",         icon: MessageSquare, hint: "Chat" },
    ],
  },
  {
    label: "Account",
    items: [
      { path: "/client/wishlist",     label: "Wishlist",         icon: Heart,         hint: "Saved items" },
      { path: "/client/billing",      label: "Billing & Wallet", icon: CreditCard,    hint: "Payments" },
    ],
  },
];

function MagneticNavItem({ item, isActive }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.22;
    const dy = (e.clientY - cy) * 0.22;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <Link
      to={item.path}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      title={item.hint}
      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all relative group ${
        isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground/90"
      }`}
      style={{
        background: isActive
          ? "rgba(150,150,150,0.08)"
          : "transparent",
        boxShadow: isActive ? "inset 0 0 0 0.5px rgba(150,150,150,0.15)" : "none",
      }}
    >
      {/* Active accent pill */}
      {isActive && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full bg-foreground"
        />
      )}

      {/* Hover bg */}
      {!isActive && (
        <span
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: "hsl(var(--foreground) / 0.03)" }}
        />
      )}

      <span ref={ref} className="magnetic-icon relative z-10">
        <item.icon
          className={`w-4 h-4 ${isActive ? 'text-foreground' : 'text-inherit'}`}
        />
      </span>
      <span className="relative z-10 flex-1" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.01em", fontSize: "0.8125rem" }}>
        {item.label}
      </span>

      {/* Badge */}
      {item.badge && (
        <span
          className="ml-auto relative z-10 border border-foreground/20 text-foreground bg-foreground/5 rounded font-mono text-[10px] font-bold tracking-widest px-1.5 py-0.5 uppercase"
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
}

export default function ClientSidebar({ vipMode, onVipToggle }) {
  const location = useLocation();

  return (
    <aside
      className="w-64 min-h-screen flex-shrink-0 hidden lg:flex flex-col bg-background/50 backdrop-blur-xl border-r border-border"
      style={{ position: "relative", zIndex: 10 }}
    >
      {/* Top Logo Area */}
      <div className="p-5 border-b border-border">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 mb-5 text-xs group transition-colors"
          style={{ color: "hsl(var(--foreground) / 0.2)", fontFamily: "'Inter', sans-serif", letterSpacing: "0.03em" }}
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
          <span className="group-hover:text-white/50 transition-colors">Back to Marketplace</span>
        </Link>

        <div className="flex items-center gap-3">
            <div
              className="logo-mark w-10 h-10 rounded-xl flex items-center justify-center bg-foreground text-background"
            >
              <span
                className="font-bold text-sm relative z-10"
                style={{ fontFamily: "Georgia, serif" }}
              >
                C
              </span>
            </div>
            <div>
              <span
                className="text-foreground font-bold text-sm block"
                style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.03em" }}
              >
                Client Hub
              </span>
              <span
                className="block text-foreground/50 font-mono text-[9px] tracking-widest uppercase"
              >
                Command Center
              </span>
            </div>
          </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-3 overflow-y-auto premium-scroll">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-2">
            <div className="nav-section-label">{group.label}</div>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <MagneticNavItem
                  key={item.path}
                  item={item}
                  isActive={location.pathname === item.path}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom — Dashboard Mode Switcher + VIP Toggle */}
      <div className="border-t border-border p-4 space-y-3">
        <button
          onClick={onVipToggle}
          className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all group border ${vipMode ? 'bg-foreground/5 border-foreground/30' : 'border-transparent hover:bg-foreground/5'}`}
        >
          <Crown
            className={`w-4 h-4 transition-transform group-hover:scale-110 flex-shrink-0 ${vipMode ? 'text-foreground' : 'text-foreground/30'}`}
          />
          <div className="text-left flex-1 min-w-0">
            <div className={`text-xs font-semibold tracking-wide ${vipMode ? 'text-foreground' : 'text-foreground/50'}`}>
              VIP Priority
            </div>
            <div className="text-[10px] text-foreground/30">
              {vipMode ? "Gold mode active" : "Toggle for gold mode"}
            </div>
          </div>
          <div
            className={`ml-auto w-8 h-4 rounded-full border transition-colors flex items-center p-0.5 ${vipMode ? 'bg-foreground/20 border-foreground/30' : 'bg-transparent border-foreground/20'}`}
          >
             <div className={`w-3 h-3 rounded-full transition-transform ${vipMode ? 'bg-foreground translate-x-4' : 'bg-foreground/30 translate-x-0'}`} />
          </div>
        </button>
      </div>
    </aside>
  );
}
