import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MOCK_PRODUCTS, MOCK_CUSTOM_SOLUTIONS } from "@/api/mockData";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check, Upload, Building2, Settings, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { num: 1, label: "Business Info", icon: Building2 },
  { num: 2, label: "Upload Data", icon: Upload },
  { num: 3, label: "Select Features", icon: Settings },
  { num: 4, label: "Payment", icon: CreditCard },
];

export default function InstallFlow() {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    businessName: "", businessType: "", email: "", phone: "",
    selectedFeatures: [],
  });

  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type") || "instant";

  useEffect(() => {
    setTimeout(() => {
      if (type === "instant") {
        const found = MOCK_PRODUCTS.find(p => p.id === id);
        setProduct(found || null);
      } else {
        const found = MOCK_CUSTOM_SOLUTIONS.find(s => s.id === id);
        setProduct(found || null);
      }
      setLoading(false);
    }, 400);
  }, [id, type]);

  const toggleFeature = (f) => {
    setFormData((prev) => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(f)
        ? prev.selectedFeatures.filter((x) => x !== f)
        : [...prev.selectedFeatures, f],
    }));
  };

  const handleComplete = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate payment processing delay
    console.log("Mock Order Created:", {
      product_type: type,
      product_id: id,
      product_title: product?.title || "Unknown",
      amount: product?.price || product?.price_min || 0,
      status: "paid",
      customer_email: formData.email,
    });
    setStep(5);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="w-8 h-8 border-4 border-muted border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* SVG Filter for Liquid Goo Effect */}
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Floating Breadcrumbs (Task 13) */}
      <div className="hidden xl:block fixed left-10 top-1/2 -translate-y-1/2 p-7 glass-dark rounded-[2rem] z-50 shadow-2xl border border-white/10 backdrop-blur-xl">
         <div className="text-[10px] font-mono tracking-widest text-[#4D9FFF] mb-8 uppercase text-center font-bold">Install Progress</div>
         <div className="flex flex-col gap-10 relative">
           <div className="absolute left-[15px] top-4 bottom-4 w-px bg-white/10" />
           <motion.div 
              className="absolute left-[15px] top-4 w-[2px] bg-gradient-to-b from-[#4D9FFF] to-[#4D9FFF] rounded-full shadow-[0_0_10px_rgba(77,159,255,0.8)]"
              initial={{ height: 0 }}
              animate={{ height: `${((Math.min(step, 4) - 1) / (STEPS.length - 1)) * 100}%` }} 
              transition={{ type: 'spring', damping: 20, stiffness: 100 }} 
           />
           
           {STEPS.map((s) => (
              <div key={s.num} className="flex items-center gap-4 relative z-10 group">
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                     step > s.num ? 'bg-[#4D9FFF] text-[#0a0a0a] shadow-[0_0_15px_rgba(77,159,255,0.4)]' : 
                     step === s.num ? 'bg-white text-[#0a0a0a] shadow-[0_0_20px_rgba(255,255,255,0.8)] scale-110 border border-white/20' : 
                     'bg-[#0a0a0a] border border-white/20 text-white/30 group-hover:border-white/50'
                 }`}>
                    {step > s.num ? <Check className="w-4 h-4" /> : <s.icon className={`w-3.5 h-3.5 ${step === s.num ? 'stroke-[2.5px]' : ''}`} />}
                 </div>
                 <div className={`font-semibold text-xs tracking-wide transition-colors ${step >= s.num ? 'text-white' : 'text-white/30'}`}>{s.label}</div>
              </div>
           ))}
         </div>
      </div>

      {/* Progress Bar — Liquid style (Task 12) */}
      <div className="mb-10 xl:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-white/80" style={{ fontFamily: 'Georgia, serif' }}>
            Step {Math.min(step, 4)} of {STEPS.length}
            <span className="text-white/30 font-normal ml-2 font-mono text-xs">— {STEPS[Math.min(step, 4) - 1]?.label}</span>
          </div>
          <div className="text-xs font-mono text-[#4D9FFF]">{Math.round(((Math.min(step, 4) - 1) / STEPS.length) * 100)}% <span className="opacity-50">complete</span></div>
        </div>
        
        {/* The Liquid Container */}
        <div className="relative h-2.5 w-full bg-white/5 rounded-full overflow-hidden" style={{ filter: 'url(#goo)' }}>
           <motion.div 
             className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-nova-blue to-cyber-green rounded-r-full"
             initial={{ width: 0 }}
             animate={{ width: `${((Math.min(step, 4) - 1) / (STEPS.length - 1)) * 100}%` }}
             transition={{ type: "spring", stiffness: 60, damping: 15, mass: 1.5 }}
           />
           {/* Blob leading the liquid */}
           <motion.div 
             className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#4D9FFF]"
             initial={{ left: 0 }}
             animate={{ left: `calc(${((Math.min(step, 4) - 1) / (STEPS.length - 1)) * 100}% - 8px)` }}
             transition={{ type: "spring", stiffness: 60, damping: 15, mass: 1.5 }}
           />
        </div>

        <div className="flex justify-between mt-4">
          {STEPS.map((s) => (
            <div key={s.num} className="flex items-center justify-center flex-1 text-center px-1">
              <span className={`text-[8px] sm:text-[10px] leading-tight font-mono tracking-wider uppercase ${step >= s.num ? 'text-[#4D9FFF]' : 'text-white/20'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 5 ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 22 }} className="text-center py-16">
            <div className="w-20 h-20 bg-foreground text-background rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-3xl font-bold mb-3">Installation Complete!</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              {type === "instant"
                ? "Your AI system is now live. You'll receive setup details via email."
                : "Your order has been placed. The developer will contact you within 24 hours."}
            </p>
            <Link to="/">
              <Button className="bg-foreground text-background font-heading font-bold rounded-xl h-12 px-8 hover:bg-white/90">
                Back to Home
              </Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 48, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -48, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <div className="bg-card border-2 border-border rounded-2xl p-6 sm:p-8">
              {step === 1 && (
                <StepContent title="Tell us about your business">
                  <InputField label="Business Name" value={formData.businessName} onChange={(v) => setFormData((p) => ({ ...p, businessName: v }))} />
                  <div>
                    <label className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Business Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {["Restaurant", "Salon", "E-commerce", "Real Estate", "Healthcare", "Other"].map((t) => (
                        <button key={t} onClick={() => setFormData((p) => ({ ...p, businessType: t }))}
                          className={`px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all ${formData.businessType === t ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
                            }`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <InputField label="Email" type="email" value={formData.email} onChange={(v) => setFormData((p) => ({ ...p, email: v }))} />
                  <InputField label="Phone (optional)" type="tel" value={formData.phone} onChange={(v) => setFormData((p) => ({ ...p, phone: v }))} />
                </StepContent>
              )}
              {step === 2 && (
                <StepContent title="Upload your data">
                  <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-foreground transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="font-heading font-semibold mb-1">Drop files here or click to upload</p>
                    <p className="text-sm text-muted-foreground">Menus, product lists, images, etc.</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">This step is optional. You can add data later.</p>
                </StepContent>
              )}
              {step === 3 && (
                <StepContent title="Select your features">
                  <div className="space-y-2">
                    {(product?.features || ["AI Chatbot", "Automated Responses", "Analytics Dashboard", "Email Notifications", "Multi-language Support"]).map((f) => (
                      <button key={f} onClick={() => toggleFeature(f)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${formData.selectedFeatures.includes(f) ? "border-foreground bg-foreground/5" : "border-border hover:border-foreground/30"
                          }`}>
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${formData.selectedFeatures.includes(f) ? "border-foreground bg-foreground" : "border-border"
                          }`}>
                          {formData.selectedFeatures.includes(f) && <Check className="w-3 h-3 text-background" />}
                        </div>
                        <span className="text-sm font-medium">{f}</span>
                      </button>
                    ))}
                  </div>
                </StepContent>
              )}
              {step === 4 && (
                <StepContent title="Complete your order">
                  <div className="bg-muted rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{product?.title}</span>
                      <span className="font-heading font-bold">${product?.price || `${product?.price_min}–${product?.price_max}`}</span>
                    </div>
                    <div className="border-t border-border pt-3 flex items-center justify-between">
                      <span className="font-heading font-bold">Total</span>
                      <span className="font-heading text-2xl font-bold">${product?.price || product?.price_min}</span>
                    </div>
                  </div>
                  <InputField label="Card Number" placeholder="4242 4242 4242 4242" />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Expiry" placeholder="MM/YY" />
                    <InputField label="CVC" placeholder="123" />
                  </div>
                </StepContent>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="border-2 border-foreground/20 rounded-xl font-heading font-semibold gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
              ) : <div />}
              {step < 4 ? (
                <Button onClick={() => setStep(step + 1)} className="bg-foreground text-background rounded-xl font-heading font-bold gap-2 h-12 px-6">
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleComplete} className="bg-foreground text-background rounded-xl font-heading font-bold gap-2 h-12 px-8">
                  Complete Payment <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepContent({ title, children }) {
  return (
    <div className="space-y-5">
      <h2 className="font-heading text-xl font-bold">{title}</h2>
      {children}
    </div>
  );
}

// Change #13: Floating label + gradient glow focus + shake on error
function InputField({ label, value, onChange, type = "text", placeholder: _placeholder, shake = false }) {
  const hasValue = value && value.length > 0;
  return (
    <div className="relative pt-5">
      <input
        type={type}
        value={value || ""}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder=" "
        className={`peer w-full px-4 py-3 bg-muted border-0 border-b-2 rounded-xl text-sm font-medium focus:outline-none transition-all
          ${shake ? 'animate-shake' : ''}
        `}
        style={{
          borderBottomColor: 'rgba(255,255,255,0.15)',
          background: 'rgba(255,255,255,0.04)',
          color: 'white',
          boxShadow: 'none',
        }}
        onFocus={e => {
          e.target.style.borderBottomColor = '#4D9FFF';
          e.target.style.boxShadow = '0 2px 0 0 rgba(77,159,255,0.3), 0 8px 24px rgba(77,159,255,0.08)';
        }}
        onBlur={e => {
          e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)';
          e.target.style.boxShadow = 'none';
        }}
      />
      <label
        className="absolute left-4 text-white/40 pointer-events-none font-medium transition-all duration-200"
        style={{
          top: hasValue ? '2px' : '26px',
          fontSize: hasValue ? '0.6rem' : '0.875rem',
          color: hasValue ? '#4D9FFF' : 'rgba(255,255,255,0.35)',
          letterSpacing: hasValue ? '0.08em' : '0',
          textTransform: hasValue ? 'uppercase' : 'none',
          fontWeight: hasValue ? 700 : 400,
        }}
      >
        {label}
      </label>
    </div>
  );
}