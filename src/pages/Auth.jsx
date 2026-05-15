import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code2, Briefcase, Eye, EyeOff, Loader2, ArrowRight, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";
import axios from "axios";

export default function Auth() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [step, setStep] = useState(1); // 1: Role Selection, 2: Form Details
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [form, setForm] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    password: "",
    country: "India",
    role: "client"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
      const endpoint = tab === "login" ? "/auth/login" : "/auth/register";
      
      const payload = tab === "login" 
        ? { email: form.email, password: form.password }
        : { ...form, name: `${form.firstName} ${form.lastName}` };

      const response = await axios.post(`${apiUrl}${endpoint}`, payload);

      if (response.data.success) {
        const { accessToken, refreshToken, user } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user_role", user.role.toLowerCase());
        
        navigate(user.role === 'DEVELOPER' ? '/developer' : '/client');
      }
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const OptionCard = ({ id, icon: Icon, title, desc }) => (
    <button
      type="button"
      onClick={() => setForm(p => ({ ...p, role: id }))}
      className={`relative w-full p-6 rounded-2xl text-left border-2 transition-all ${
        form.role === id 
          ? "border-gray-900 bg-gray-50 ring-4 ring-gray-900/5" 
          : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-5">
        <div className={`p-4 rounded-xl transition-colors ${form.role === id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
        </div>
      </div>
      {form.role === id && (
        <div className="absolute top-6 right-6 w-5 h-5 rounded-full flex items-center justify-center bg-gray-900">
             <div className="w-2 h-2 rounded-full bg-white" />
        </div>
      )}
    </button>
  );

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      {/* Left panel - Branding */}
      <div className="flex w-full lg:w-1/2 relative items-center justify-center p-8 lg:p-12 overflow-hidden min-h-[400px] lg:min-h-screen">
        <div className={`absolute inset-0 ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-900'}`} />
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative max-w-md text-white"
        >
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8">
            <Briefcase className="w-8 h-8 text-gray-900" />
          </div>
          <h2 className="font-heading text-4xl font-bold mb-6 leading-tight">
            Join the future of<br />AI business.
          </h2>
          <div className="space-y-6">
            {[
              { num: "01", text: "Select your professional path" },
              { num: "02", text: "Complete your secure profile" },
              { num: "03", text: "Access the marketplace instantly" },
            ].map((stepItem) => (
              <div key={stepItem.num} className="flex items-center gap-4">
                <span className="font-mono text-white/30 text-sm">{stepItem.num}</span>
                <span className="text-white/80">{stepItem.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right panel - Multi-step Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-xl">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 text-sm mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>

          <AnimatePresence mode="wait">
            {step === 1 && tab === "signup" ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 font-heading">Join as a client or freelancer</h1>
                  <p className="text-gray-500">How would you describe your goals on Deployra?</p>
                </div>

                <div className="space-y-4">
                  <OptionCard 
                    id="client" 
                    icon={Briefcase} 
                    title="I'm a Client" 
                    desc="I want to post jobs and hire AI experts" 
                  />
                  <OptionCard 
                    id="developer" 
                    icon={Code2} 
                    title="I'm a Freelancer" 
                    desc="I want to work and get paid for AI development" 
                  />
                </div>

                <div className="pt-4 space-y-4">
                  <Button
                    onClick={() => setStep(2)}
                    className="w-full h-14 rounded-2xl bg-gray-900 text-white font-bold text-lg hover:bg-gray-800 transition-all"
                  >
                    Create Account
                  </Button>
                  <p className="text-center text-sm text-gray-500">
                    Already have an account? <button onClick={() => setTab("login")} className="text-gray-900 font-bold hover:underline">Log In</button>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 font-heading">
                    {tab === "login" ? "Welcome back" : "Sign up to find work you love"}
                  </h1>
                  {tab === "signup" && (
                    <button onClick={() => setStep(1)} className="text-sm font-bold text-gray-900 flex items-center gap-1 hover:underline">
                      <ArrowLeft className="w-3 h-3" /> Change role ({form.role})
                    </button>
                  )}
                </div>

                {/* Google Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/auth/google`}
                  className="w-full h-12 rounded-full gap-3 border-gray-200 hover:bg-gray-50 font-bold"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-bold">or</span></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium">{error}</div>}

                  {tab === "signup" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">First name</label>
                        <input
                          required
                          value={form.firstName}
                          onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))}
                          className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-gray-900 rounded-xl outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Last name</label>
                        <input
                          required
                          value={form.lastName}
                          onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))}
                          className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-gray-900 rounded-xl outline-none transition-all"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="Email address"
                      className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-gray-900 rounded-xl outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Password</label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        required
                        value={form.password}
                        onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                        placeholder="Password (8 or more characters)"
                        className="w-full px-4 py-3 pr-12 bg-white border border-gray-200 focus:border-gray-900 rounded-xl outline-none transition-all"
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {tab === "signup" && (
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">Country</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                          value={form.country}
                          onChange={e => setForm(p => ({ ...p, country: e.target.value }))}
                          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 focus:border-gray-900 rounded-xl outline-none transition-all appearance-none font-medium"
                        >
                          <option value="India">India</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Canada">Canada</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 space-y-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-14 rounded-2xl bg-gray-900 text-white font-bold text-lg hover:bg-gray-800"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : tab === "login" ? "Log In" : "Create Account"}
                    </Button>
                    
                    <p className="text-center text-sm text-gray-500">
                      {tab === "login" ? (
                        <>Don't have an account? <button type="button" onClick={() => { setTab("signup"); setStep(1); }} className="text-gray-900 font-bold hover:underline">Sign Up</button></>
                      ) : (
                        <>Already have an account? <button type="button" onClick={() => setTab("login")} className="text-gray-900 font-bold hover:underline">Log In</button></>
                      )}
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
