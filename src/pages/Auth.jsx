import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code2, Briefcase, Eye, EyeOff, Loader2, ArrowRight, Globe, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";
import axios from "axios";
import { useAuth } from "@/lib/AuthContext";

export default function Auth() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [tab, setTab] = useState("signup"); // Default to signup as per user request
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

  const passwordRequirements = [
    { label: "8+ characters", regex: /.{8,}/ },
    { label: "1 uppercase letter", regex: /[A-Z]/ },
    { label: "1 lowercase letter", regex: /[a-z]/ },
    { label: "1 number", regex: /[0-9]/ },
    { label: "1 special character (@$!%*?&)", regex: /[@$!%*?&]/ },
  ];

  const isPasswordValid = passwordRequirements.every(req => req.regex.test(form.password));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (tab === "signup" && !isPasswordValid) {
      setError("Please fulfill all password requirements.");
      return;
    }

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
        login(user, { accessToken, refreshToken });
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const RoleCard = ({ id, icon: Icon, title, desc }) => (
    <button
      type="button"
      onClick={() => setForm(p => ({ ...p, role: id }))}
      className={`relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all duration-300 group ${
        form.role === id 
          ? "border-[#91E391] bg-[#F9FFF9] ring-1 ring-[#91E391]" 
          : "border-gray-100 bg-white hover:border-gray-200"
      }`}
      style={{ width: '280px', height: '320px' }}
    >
      <div className={`p-6 rounded-full mb-6 transition-transform group-hover:scale-110 ${form.role === id ? 'bg-[#D1F2D1]' : 'bg-gray-50'}`}>
        <Icon className="w-12 h-12 text-gray-800" strokeWidth={1.5} />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-1">
        {title} <ChevronRight className="w-5 h-5 mt-0.5" />
      </h3>
      <p className="text-sm text-gray-500 text-center px-4 leading-relaxed">{desc}</p>
      
      <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
        form.role === id ? 'bg-gray-900 border-gray-900' : 'border-gray-200'
      }`}>
        {form.role === id && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-6 sm:p-8">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <span className="font-bold text-2xl tracking-tighter font-heading text-gray-900">Deployra</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-5xl">
          <AnimatePresence mode="wait">
            {step === 1 && tab === "signup" ? (
              <motion.div
                key="role-step"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-heading tracking-tight">Welcome to Deployra</h1>
                <p className="text-lg text-gray-600 mb-12">Which describes you best?</p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
                  <RoleCard 
                    id="client" 
                    icon={Briefcase} 
                    title="Client" 
                    desc="Post jobs and hire world-class AI developers" 
                  />
                  <RoleCard 
                    id="developer" 
                    icon={Code2} 
                    title="Freelancer" 
                    desc="Work and get paid for your AI expertise" 
                  />
                </div>

                <div className="space-y-6">
                  <Button
                    onClick={() => setStep(2)}
                    className="h-12 px-12 rounded-full bg-gray-900 text-white font-bold text-base hover:bg-gray-800 transition-all min-w-[240px]"
                  >
                    {form.role === 'client' ? 'Join as a Client' : 'Apply as a Freelancer'}
                  </Button>
                  
                  <p className="text-gray-600">
                    Already have an account? <button onClick={() => { setTab("login"); setStep(2); }} className="text-[#108a00] font-bold hover:underline">Log in</button>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form-step"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl mx-auto w-full"
              >
                <div className="relative mb-10">
                  <button 
                    onClick={() => {
                      if (tab === "signup") setStep(1);
                      else setTab("signup");
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors group"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
                  </button>
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 font-heading tracking-tight">
                      {tab === "login" ? "Welcome back" : "Sign up to find work you love"}
                    </h1>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* OAuth Section */}
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
                        window.location.href = `${apiUrl}/auth/google`;
                      }}
                      className="h-12 rounded-full gap-3 border border-gray-300 hover:bg-gray-50 font-bold text-gray-700 shadow-sm transition-all"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Continue with Google
                    </Button>
                  </div>

                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-3 text-gray-400 font-bold">or</span></div>
                  </div>

                  {/* Manual Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-semibold border border-red-100">{error}</div>}

                    {tab === "signup" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-900">First name</label>
                          <input
                            required
                            value={form.firstName}
                            onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))}
                            className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-gray-900 rounded-xl outline-none transition-all text-gray-900 font-medium"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-900">Last name</label>
                          <input
                            required
                            value={form.lastName}
                            onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))}
                            className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-gray-900 rounded-xl outline-none transition-all text-gray-900 font-medium"
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-900">Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-gray-900 rounded-xl outline-none transition-all text-gray-900 font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-900">Password</label>
                      <div className="relative">
                        <input
                          type={showPass ? "text" : "password"}
                          required
                          value={form.password}
                          onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                          placeholder="Password (8 or more characters)"
                          className={`w-full px-4 py-3 pr-12 bg-white border ${tab === "signup" && form.password ? (isPasswordValid ? 'border-green-500' : 'border-red-300') : 'border-gray-300'} focus:border-gray-900 rounded-xl outline-none transition-all text-gray-900 font-medium`}
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors">
                          {showPass ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>
                      </div>

                      {tab === "signup" && form.password && !isPasswordValid && (
                        <div className="p-4 bg-gray-50 rounded-xl space-y-2 mt-2 border border-gray-100">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Password Requirements</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                            {passwordRequirements.map((req, i) => {
                              const met = req.regex.test(form.password);
                              return (
                                <div key={i} className="flex items-center gap-2">
                                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors ${met ? 'bg-green-500' : 'bg-gray-200'}`}>
                                    {met && <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path d="M5 13l4 4L19 7" /></svg>}
                                  </div>
                                  <span className={`text-[11px] font-medium transition-colors ${met ? 'text-green-700' : 'text-gray-400'}`}>{req.label}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {tab === "signup" && (
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900">Country</label>
                        <select
                          value={form.country}
                          onChange={e => setForm(p => ({ ...p, country: e.target.value }))}
                          className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-gray-900 rounded-xl outline-none transition-all appearance-none font-medium cursor-pointer text-gray-900"
                        >
                          <option value="India">India</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Canada">Canada</option>
                        </select>
                      </div>
                    )}

                    <div className="pt-6 space-y-6">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 rounded-full bg-gray-900 text-white font-bold text-lg hover:bg-gray-800 shadow-lg shadow-gray-200"
                      >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : tab === "login" ? "Log In" : "Create Account"}
                      </Button>
                      
                      <p className="text-center text-gray-600">
                        {tab === "login" ? (
                          <>Don't have an account? <button type="button" onClick={() => { setTab("signup"); setStep(1); }} className="text-[#108a00] font-bold hover:underline">Sign Up</button></>
                        ) : (
                          <>Already have an account? <button type="button" onClick={() => setTab("login")} className="text-[#108a00] font-bold hover:underline">Log In</button></>
                        )}
                      </p>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Footer link for logo selection step */}
      {step === 1 && tab === "signup" && (
        <div className="p-8 text-center text-sm text-gray-500 border-t border-gray-100 bg-gray-50/50">
           Deployra Marketplace © 2026
        </div>
      )}
    </div>
  );
}
