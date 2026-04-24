import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StatusAura from "./StatusAura";
import LiveActivityTicker from "./LiveActivityTicker";
import MagneticCursor from "./MagneticCursor";
import { SoundProvider } from "./SoundManager";

export default function Layout() {
  return (
    <SoundProvider>
      <div className="min-h-screen flex flex-col relative text-white" style={{ cursor: 'none' }}>
        {/* Dark-to-Light Accent Glows */}
        <div className="fixed inset-0 pointer-events-none z-[-1]" style={{ background: 'radial-gradient(circle at 50% -10%, rgba(0,255,65,0.08) 0%, transparent 60%)', mixBlendMode: 'screen' }} />
        <div className="fixed inset-0 pointer-events-none z-[-1]" style={{ background: 'radial-gradient(circle at 100% 110%, rgba(77,159,255,0.05) 0%, transparent 50%)', mixBlendMode: 'screen' }} />
        
        <div className="ambient-bg" />
        <MagneticCursor />
        <Navbar />
        <main className="flex-1 relative z-10">
          <Outlet />
        </main>
        <Footer />
        <StatusAura />
        <LiveActivityTicker />
      </div>
    </SoundProvider>
  );
}