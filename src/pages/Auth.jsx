import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code2, Briefcase, Users, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";

export default function Auth() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [role, setRole] = useState("client"); // 'client', 'developer', 'both'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for authentication
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    
    // Store selected role in local storage
    localStorage.setItem('user_role', role);

    // Initial redirect logic based on selected role
    if (role === "developer") navigate("/developer");
    else if (role === "client") navigate("/client");
    else navigate("/client"); // Both default starts at client view
  };

  const OptionCard = ({ id, icon: Icon, title, desc }) => (
    <button
      type="button"
      onClick={() => setRole(id)}
      className={`relative w-full p-4 rounded-xl text-left border-2 transition-all ${
        role === id 
          ? "border-gray-900 bg-gray-50" 
          : "border-transparent bg-gray-100 hover:bg-gray-200"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg" style={{ backgroundColor: role === id ? '#111827' : '#ffffff', color: role === id ? '#ffffff' : '#6b7280' }}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500 mt-1">{desc}</p>
        </div>
      </div>
      {role === id && (
        <div className="absolute top-4 right-4 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#111827' }}>
             <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#ffffff' }} />
        </div>
      )}
    </button>
  );

  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-100'}`}>
      {/* Left panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 overflow-hidden">
        <div className={`absolute inset-0 ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`} />
        <div className={`absolute top-[-20%] left-[-20%] w-[600px] h-[600px] rounded-full blur-[120px] ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] ${isDark ? 'bg-white/3' : 'bg-black/5'}`} />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: isDark ? 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)' : 'linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={`relative max-w-md ${isDark ? 'text-white' : 'text-gray-900'}`}
        >
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${isDark ? 'bg-white' : 'bg-[#111827]'}`}>
            <Users className="w-8 h-8" style={{ color: isDark ? '#000000' : '#ffffff' }} />
          </div>
          <h2 className="font-heading text-4xl font-bold mb-4 leading-tight">
            One account.<br />Infinite possibilities.
          </h2>
          <p className={`${isDark ? 'text-white/50' : 'text-gray-600'} text-lg leading-relaxed mb-10`}>
            Join AIStack. Buy instant AI solutions, or build and sell your own to businesses worldwide.
          </p>

          <div className="space-y-4">
            {[
              { num: "01", text: "Create your account" },
              { num: "02", text: "Choose your path (Client or Developer)" },
              { num: "03", text: "Access powerful AI tools instantly" },
            ].map((step) => (
              <div key={step.num} className="flex items-center gap-4">
                <span className={`font-sub font-bold text-sm w-8 ${isDark ? 'text-white/20' : 'text-gray-400'}`}>{step.num}</span>
                <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>{step.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right panel - Dynamic Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md my-8"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm mb-8 transition-colors font-sub">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Marketplace
          </Link>

          <div className="mb-8">
            <h1 style={{ fontSize: '30px', fontWeight: 700, color: '#0a0a0a', fontFamily: 'Georgia, serif', letterSpacing: '-0.03em', lineHeight: 1.2 }} className="mb-2">
              {tab === "login" ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-gray-500 text-sm">
              {tab === "login" ? "Sign in to access your dashboard" : "Join the premier AI marketplace"}
            </p>
          </div>

          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => setTab("login")}
              className={`pb-3 px-1 mr-6 text-sm font-semibold transition-all relative ${tab === "login" ? "text-gray-900" : "text-gray-400 hover:text-gray-700"}`}
            >
              Sign In
              {tab === "login" && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: '#111827' }} />
              )}
            </button>
            <button
              onClick={() => setTab("signup")}
              className={`pb-3 px-1 text-sm font-semibold transition-all relative ${tab === "signup" ? "text-gray-900" : "text-gray-400 hover:text-gray-700"}`}
            >
              Sign Up
              {tab === "signup" && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: '#111827' }} />
              )}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-3 mb-6">
              <label className="text-xs font-sub font-semibold text-gray-500 uppercase tracking-wider block mb-3">Choose Your Role</label>
              <OptionCard 
                id="client" 
                icon={Briefcase} 
                title="I'm a Client" 
                desc="Buy and install AI solutions for my business" 
              />
              <OptionCard 
                id="developer" 
                icon={Code2} 
                title="I'm a Developer" 
                desc="Build, list, and sell AI solutions directly" 
              />
              <OptionCard 
                id="both" 
                icon={Users} 
                title="Both" 
                desc="Access to both buying and selling features" 
              />
            </div>

            {tab === "signup" && (
              <div>
                <label className="text-xs font-sub font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3.5 bg-gray-100 border-2 border-transparent focus:border-gray-900 rounded-xl text-sm font-medium text-gray-900 focus:outline-none transition-colors"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-sub font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 bg-gray-100 border-2 border-transparent focus:border-gray-900 rounded-xl text-sm font-medium text-gray-900 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-sub font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 pr-12 bg-gray-100 border-2 border-transparent focus:border-gray-900 rounded-xl text-sm font-medium text-gray-900 focus:outline-none transition-colors"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full font-sub font-bold text-base rounded-xl h-14 gap-2 border-none hover:opacity-90"
                style={{ backgroundColor: '#111827', color: '#ffffff' }}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {tab === "login" ? "Sign In" : "Create Account"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </motion.div>
          </form>

        </motion.div>
      </div>
    </div>
  );
}
