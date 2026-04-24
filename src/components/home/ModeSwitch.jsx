import { Zap, Code2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ModeSwitch({ mode, onModeChange }) {
  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex glass p-1 rounded-2xl gap-1">
        {[
          { id: "instant", label: "Instant Setup", Icon: Zap },
          { id: "custom", label: "Custom Solutions", Icon: Code2 },
        ].map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => onModeChange(id)}
            className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${mode === id ? "text-black" : "text-white/40 hover:text-white/70"
              }`}
            style={{ letterSpacing: '-0.02em' }}
          >
            {mode === id && (
              <motion.div
                layoutId="mode-bg"
                className="absolute inset-0 bg-white rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <Icon className="w-3.5 h-3.5" />
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}