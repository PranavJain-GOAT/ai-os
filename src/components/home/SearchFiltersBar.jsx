import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ── shared dropdown shell ──────────────────────────────────── */
function DropPanel({ label, active, children, onClear, onApply, onClose }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const close = () => setOpen(false);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
          active
            ? "bg-white text-black border-white"
            : "glass text-white/60 border-white/15 hover:text-white hover:border-white/30"
        }`}
        style={{ letterSpacing: "-0.01em" }}
      >
        {label} <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 z-50 rounded-2xl overflow-hidden w-72"
            style={{
              background: "rgba(14,14,14,0.98)",
              border: "0.5px solid rgba(255,255,255,0.12)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.85)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="max-h-80 overflow-y-auto p-4 space-y-4">{children}</div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/8">
              <button onClick={() => { onClear(); }} className="text-xs font-mono text-white/35 hover:text-white transition-colors">
                Clear all
              </button>
              <button
                onClick={() => { onApply(); close(); }}
                className="px-5 py-1.5 rounded-full bg-white text-black text-xs font-bold hover:bg-white/90 transition-all"
              >
                Apply
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── checkbox row ───────────────────────────────────────────── */
function CheckRow({ label, count, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer group">
      <div className="flex items-center gap-2.5">
        <div
          onClick={onChange}
          className={`w-4 h-4 rounded border flex items-center justify-center transition-all flex-shrink-0 ${
            checked ? "bg-white border-white" : "border-white/25 group-hover:border-white/50"
          }`}
        >
          {checked && <Check className="w-2.5 h-2.5 text-black" strokeWidth={3} />}
        </div>
        <span className="text-sm text-white/70 group-hover:text-white transition-colors" style={{ letterSpacing: "-0.01em" }}>
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span className="text-[10px] font-mono text-white/25">{count}</span>
      )}
    </label>
  );
}

/* ── radio row ──────────────────────────────────────────────── */
function RadioRow({ label, sub, checked, onChange }) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer group">
      <div
        onClick={onChange}
        className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 flex-shrink-0 transition-all ${
          checked ? "border-white bg-white" : "border-white/25 group-hover:border-white/50"
        }`}
      >
        {checked && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
      </div>
      <div>
        <span className="text-sm text-white/70 group-hover:text-white transition-colors block" style={{ letterSpacing: "-0.01em" }}>
          {label}
        </span>
        {sub && <span className="text-[10px] font-mono text-white/25">{sub}</span>}
      </div>
    </label>
  );
}

/* ── section heading ────────────────────────────────────────── */
function SectionTitle({ children }) {
  return <p className="text-[11px] font-mono text-white/30 tracking-widest mb-2">{children.toUpperCase()}</p>;
}

/* ══════════════════════════════════════════════════════════════
   CATEGORY DROPDOWN
══════════════════════════════════════════════════════════════ */
const CATEGORIES = ["chatbot", "automation", "website", "analytics", "marketing", "other"];

function CategoryDropdown({ applied, onApply, results }) {
  const [pending, setPending] = useState(applied);
  const counts = Object.fromEntries(
    CATEGORIES.map((c) => [c, results.filter((r) => r.category === c).length])
  );
  const label = applied ? applied.charAt(0).toUpperCase() + applied.slice(1) : "Category";
  return (
    <DropPanel
      label={label}
      active={!!applied}
      onClear={() => { setPending(""); }}
      onApply={() => onApply(pending)}
    >
      <SectionTitle>Category</SectionTitle>
      <RadioRow label="All Categories" sub={`${results.length} results`} checked={!pending} onChange={() => setPending("")} />
      {CATEGORIES.map((cat) => (
        counts[cat] > 0 && (
          <RadioRow
            key={cat}
            label={cat.charAt(0).toUpperCase() + cat.slice(1)}
            sub={`${counts[cat]} results`}
            checked={pending === cat}
            onChange={() => setPending(cat)}
          />
        )
      ))}
    </DropPanel>
  );
}

/* ══════════════════════════════════════════════════════════════
   SERVICE OPTIONS DROPDOWN
══════════════════════════════════════════════════════════════ */
function ServiceOptionsDropdown({ applied, onApply }) {
  const [pending, setPending] = useState(applied || []);
  const toggle = (val) => setPending((p) => p.includes(val) ? p.filter((x) => x !== val) : [...p, val]);
  const label = applied?.length ? `Service options (${applied.length})` : "Service options";

  const solutionTypes = ["Instant Setup", "Custom Solutions"];
  const features = ["Has Live Demo", "API Access", "White Label"];

  return (
    <DropPanel
      label={label}
      active={!!(applied?.length)}
      onClear={() => setPending([])}
      onApply={() => onApply(pending)}
    >
      <div>
        <SectionTitle>Solution type</SectionTitle>
        <div className="space-y-2.5">
          {solutionTypes.map((t) => (
            <CheckRow key={t} label={t} checked={pending.includes(t)} onChange={() => toggle(t)} />
          ))}
        </div>
      </div>
      <div>
        <SectionTitle>Features</SectionTitle>
        <div className="space-y-2.5">
          {features.map((f) => (
            <CheckRow key={f} label={f} checked={pending.includes(f)} onChange={() => toggle(f)} />
          ))}
        </div>
      </div>
    </DropPanel>
  );
}

/* ══════════════════════════════════════════════════════════════
   DEVELOPER LEVEL DROPDOWN  (Seller details)
══════════════════════════════════════════════════════════════ */
function DeveloperDropdown({ applied, onApply, results }) {
  const [pending, setPending] = useState(applied || []);
  const toggle = (val) => setPending((p) => p.includes(val) ? p.filter((x) => x !== val) : [...p, val]);
  const label = applied?.length ? `Developer (${applied.length})` : "Developer";

  const levels = [
    { id: "top", label: "Top Rated", count: Math.ceil(results.length * 0.2) },
    { id: "verified", label: "Verified", count: Math.ceil(results.length * 0.5) },
    { id: "new", label: "New Developer", count: Math.ceil(results.length * 0.3) },
  ];

  return (
    <DropPanel
      label={label}
      active={!!(applied?.length)}
      onClear={() => setPending([])}
      onApply={() => onApply(pending)}
    >
      <div>
        <SectionTitle>Developer level</SectionTitle>
        <div className="grid grid-cols-2 gap-2.5">
          {levels.map((l) => (
            <CheckRow key={l.id} label={l.label} count={l.count} checked={pending.includes(l.id)} onChange={() => toggle(l.id)} />
          ))}
        </div>
      </div>
    </DropPanel>
  );
}

/* ══════════════════════════════════════════════════════════════
   BUDGET DROPDOWN
══════════════════════════════════════════════════════════════ */
function BudgetDropdown({ applied, onApply }) {
  const [pending, setPending] = useState(applied || "");
  const label = applied ? applied : "Budget";

  const tiers = [
    { id: "value", label: "Value", sub: "Under $50" },
    { id: "mid", label: "Mid-range", sub: "$50 – $200" },
    { id: "high", label: "High-end", sub: "$200 & Above" },
  ];

  return (
    <DropPanel
      label={label}
      active={!!applied}
      onClear={() => setPending("")}
      onApply={() => onApply(pending)}
    >
      <div>
        <p className="text-[10px] font-mono text-white/25 mb-3">Budget reflects the base price</p>
        <div className="space-y-3">
          {tiers.map((t) => (
            <RadioRow
              key={t.id}
              label={t.label}
              sub={t.sub}
              checked={pending === t.id}
              onChange={() => setPending(t.id)}
            />
          ))}
        </div>
      </div>
    </DropPanel>
  );
}

/* ══════════════════════════════════════════════════════════════
   SETUP TIME DROPDOWN  (Delivery time)
══════════════════════════════════════════════════════════════ */
function SetupTimeDropdown({ applied, onApply }) {
  const [pending, setPending] = useState(applied || "");
  const label = applied || "Setup time";

  const times = [
    { id: "express", label: "Express", sub: "Under 5 minutes" },
    { id: "quick", label: "Quick", sub: "Under 1 hour" },
    { id: "sameday", label: "Same day", sub: "Within 24 hours" },
    { id: "anytime", label: "Anytime", sub: "" },
  ];

  return (
    <DropPanel
      label={label}
      active={!!applied}
      onClear={() => setPending("")}
      onApply={() => onApply(pending)}
    >
      <div className="space-y-3">
        {times.map((t) => (
          <RadioRow
            key={t.id}
            label={t.label}
            sub={t.sub}
            checked={pending === t.id}
            onChange={() => setPending(t.id)}
          />
        ))}
      </div>
    </DropPanel>
  );
}

/* ── toggle switch ──────────────────────────────────────────── */
function Toggle({ label, value, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        onClick={() => onChange(!value)}
        className={`relative w-8 h-4 rounded-full transition-all ${value ? "bg-white" : "bg-white/15"}`}
      >
        <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all ${value ? "left-4 bg-black" : "left-0.5 bg-white/50"}`} />
      </div>
      <span className="text-xs font-mono text-white/40 hover:text-white transition-colors">{label}</span>
    </label>
  );
}

/* ── active chip ────────────────────────────────────────────── */
function ActiveChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/15">
      {label}
      <button onClick={onRemove} className="text-white/40 hover:text-white transition-colors">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */
export default function SearchFiltersBar({ filters, onFiltersChange, results }) {
  const { category, serviceOptions, devLevel, budget, setupTime, verifiedOnly, hasDemo } = filters;

  const activeChips = [];
  if (category) activeChips.push({ label: category.charAt(0).toUpperCase() + category.slice(1), key: "category" });
  if (serviceOptions?.length) serviceOptions.forEach((s) => activeChips.push({ label: s, key: `so-${s}` }));
  if (devLevel?.length) devLevel.forEach((d) => activeChips.push({ label: d === "top" ? "Top Rated" : d === "verified" ? "Verified" : "New Developer", key: `dl-${d}` }));
  if (budget) activeChips.push({ label: budget === "value" ? "Under $50" : budget === "mid" ? "$50–$200" : "$200+", key: "budget" });
  if (setupTime) activeChips.push({ label: setupTime.charAt(0).toUpperCase() + setupTime.slice(1), key: "setupTime" });
  if (verifiedOnly) activeChips.push({ label: "Verified only", key: "verifiedOnly" });
  if (hasDemo) activeChips.push({ label: "Has demo", key: "hasDemo" });

  const removeChip = (key) => {
    if (key === "category") onFiltersChange({ ...filters, category: "" });
    else if (key.startsWith("so-")) onFiltersChange({ ...filters, serviceOptions: serviceOptions.filter((s) => `so-${s}` !== key) });
    else if (key.startsWith("dl-")) onFiltersChange({ ...filters, devLevel: devLevel.filter((d) => `dl-${d}` !== key) });
    else if (key === "budget") onFiltersChange({ ...filters, budget: "" });
    else if (key === "setupTime") onFiltersChange({ ...filters, setupTime: "" });
    else if (key === "verifiedOnly") onFiltersChange({ ...filters, verifiedOnly: false });
    else if (key === "hasDemo") onFiltersChange({ ...filters, hasDemo: false });
  };

  return (
    <div className="space-y-3">
      {/* Filter bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap border-b border-white/6 pb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <CategoryDropdown
            applied={category}
            results={results}
            onApply={(v) => onFiltersChange({ ...filters, category: v })}
          />
          <ServiceOptionsDropdown
            applied={serviceOptions}
            onApply={(v) => onFiltersChange({ ...filters, serviceOptions: v })}
          />
          <DeveloperDropdown
            applied={devLevel}
            results={results}
            onApply={(v) => onFiltersChange({ ...filters, devLevel: v })}
          />
          <BudgetDropdown
            applied={budget}
            onApply={(v) => onFiltersChange({ ...filters, budget: v })}
          />
          <SetupTimeDropdown
            applied={setupTime}
            onApply={(v) => onFiltersChange({ ...filters, setupTime: v })}
          />
        </div>

        {/* Right toggles */}
        <div className="flex items-center gap-4">
          <Toggle label="Verified only" value={verifiedOnly} onChange={(v) => onFiltersChange({ ...filters, verifiedOnly: v })} />
          <Toggle label="Has demo" value={hasDemo} onChange={(v) => onFiltersChange({ ...filters, hasDemo: v })} />
        </div>
      </div>

      {/* Active chips */}
      {activeChips.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {activeChips.map((chip) => (
            <ActiveChip key={chip.key} label={chip.label} onRemove={() => removeChip(chip.key)} />
          ))}
          {activeChips.length > 1 && (
            <button
              onClick={() => onFiltersChange({ category: "", serviceOptions: [], devLevel: [], budget: "", setupTime: "", verifiedOnly: false, hasDemo: false })}
              className="text-[11px] font-mono text-white/30 hover:text-white underline transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}
