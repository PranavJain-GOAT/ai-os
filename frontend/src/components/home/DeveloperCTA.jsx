import { Link } from "react-router-dom";
import { ArrowRight, Code2, TrendingUp, Globe } from "lucide-react";
import MagneticButton from "../MagneticButton";
import ScrollRevealSection from "../ScrollRevealSection";

const PERKS = [
  { icon: TrendingUp, text: "70% revenue share" },
  { icon: Globe, text: "Global marketplace" },
  { icon: Code2, text: "Any stack, any AI" },
];

export default function DeveloperCTA() {
  return (
    <section className="py-20 border-t border-white/6 relative overflow-hidden">
      <div className="absolute inset-0 dark-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-white/2 rounded-full blur-[100px]" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <ScrollRevealSection>
          <p className="section-kicker mb-4">FOR DEVELOPERS</p>
          <h2 className="text-white font-bold mb-5" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.04em' }}>
            Ship your AI.<br /><span style={{ fontWeight: 300, fontFamily: 'Inter, sans-serif', fontSize: '0.7em', color: 'rgba(255,255,255,0.55)' }}>Earn passively.</span>
          </h2>
          <p className="section-subheader mb-8 max-w-lg mx-auto">
            List your AI systems on the most elite marketplace. Set your price. Reach thousands of businesses overnight.
          </p>
          <div className="flex items-center justify-center gap-6 mb-10 flex-wrap">
            {PERKS.map((p) => (
              <div key={p.text} className="flex items-center gap-2 text-white/40 text-sm">
                <p.icon className="w-4 h-4 text-white/25" />
                <span style={{ letterSpacing: '-0.01em' }}>{p.text}</span>
              </div>
            ))}
          </div>
          <Link to="/developer/login">
            <MagneticButton
              className="shimmer-btn inline-flex items-center gap-3 bg-white text-black font-bold text-sm px-8 py-4 rounded-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all"
              magnetStrength={0.5}
            >
              <Code2 className="w-4 h-4" />
              Apply as Developer
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </Link>
        </ScrollRevealSection>
      </div>
    </section>
  );
}