// Change #15: Subtle UI sound design with mute toggle
import { useState, useRef, createContext, useContext } from "react";
import { Volume2, VolumeX } from "lucide-react";

const SoundContext = createContext({ play: () => { } });
export const useSoundManager = () => useContext(SoundContext);

export function SoundProvider({ children }) {
  const [muted, setMuted] = useState(true); // default muted
  const ctxRef = useRef(null);

  const getCtx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctxRef.current;
  };

  const play = (type = "click") => {
    if (muted) return;
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "click") {
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === "whoosh") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === "success") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    }
  };

  return (
    <SoundContext.Provider value={{ play, muted }}>
      {children}
      {/* Mute toggle — fixed bottom-right */}
      <button
        onClick={() => setMuted((m) => !m)}
        className="fixed bottom-4 right-4 z-50 w-9 h-9 rounded-full flex items-center justify-center transition-all"
        style={{
          background: 'rgba(10,10,10,0.8)',
          border: '0.5px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
        title={muted ? "Unmute UI sounds" : "Mute UI sounds"}
      >
        {muted
          ? <VolumeX className="w-3.5 h-3.5 text-white/40" />
          : <Volume2 className="w-3.5 h-3.5 text-white/70" />
        }
      </button>
    </SoundContext.Provider>
  );
}