import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code2, Briefcase, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";

export default function Auth() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [role, setRole] = useState("client"); // 'client' | 'developer'

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
    else navigate("/client");
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
    <div className={`min-h-screen flex flex-col lg:flex-row ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-100'}`}>
      {/* Left panel - Branding */}
      <div className="flex w-full lg:w-1/2 relative items-center justify-center p-8 lg:p-12 overflow-hidden min-h-[450px] lg:min-h-screen">
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
            <Briefcase className="w-8 h-8" style={{ color: isDark ? '#000000' : '#ffffff' }} />
          </div>
          <h2 className="font-heading text-4xl font-bold mb-4 leading-tight">
            One account.<br />Infinite possibilities.
          </h2>
          <p className={`${isDark ? 'text-white/50' : 'text-gray-600'} text-lg leading-relaxed mb-10`}>
            Join Deployra. Buy instant AI solutions, or build and sell your own to businesses worldwide.
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
      <div className="flex-1 w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8 overflow-y-auto" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
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

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-500 font-sub font-semibold tracking-wider">Or continue with</span>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/auth/google`}
              className="w-full font-sub font-bold text-base rounded-xl h-14 gap-3 border-2 border-gray-200 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
          </motion.div>


        </motion.div>
      </div>
    </div>
  );
}
