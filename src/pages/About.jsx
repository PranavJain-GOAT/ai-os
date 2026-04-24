import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Globe, Shield, Zap, Users, Mail, MapPin, Twitter, Linkedin, Github, Phone, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/lib/ThemeContext";

const MILESTONES = [
  { year: "2021", title: "The Idea", desc: "Pranav Jain, frustrated by how difficult and expensive it was to deploy AI for his family's business, decided to build the platform he wished existed." },
  { year: "2022", title: "Founded AIStack", desc: "With $250K in bootstrapped capital and a team of 3, AIStack launched its first product — a WhatsApp order bot that went live for 12 businesses in week one." },
  { year: "2023", title: "Product-Market Fit", desc: "Reached 100 active businesses across 18 countries. Raised a $4M Seed round led by Y Combinator. Expanded the marketplace to 30+ AI systems." },
  { year: "2024", title: "Series A — $12M", desc: "Global expansion. Hired world-class engineers and designers. Launched the Developer Marketplace, enabling third-party builders to list and monetize their AI systems." },
  { year: "2025", title: "The Standard", desc: "500+ businesses. 99.9% uptime. $2M+ paid out to developers. AIStack became the most trusted name in AI deployment for SMBs and enterprises alike." },
];

const TEAM = [
  { name: "Pranav Jain", role: "CEO & Founder", initials: "PJ", bio: "Former ML engineer at Google DeepMind. Built and sold two SaaS companies before founding AIStack at 26. Obsessed with making AI accessible to every business on earth.", featured: true },
  { name: "Anika Sharma", role: "CTO & Co-Founder", initials: "AS", bio: "Ex-Meta infrastructure lead. Architected systems serving 100M+ users. Leads all technical operations at AIStack." },
  { name: "Marcus Reid", role: "Head of Design", initials: "MR", bio: "Former Design Director at Linear and Vercel. Defines the visual and interaction language of AIStack." },
  { name: "Yuki Tanaka", role: "Head of AI Research", initials: "YT", bio: "PhD in NLP from MIT. Leads the AI model curation and quality assurance for all marketplace systems." },
  { name: "Sofia Reyes", role: "VP of Growth", initials: "SR", bio: "Scaled Notion from 0 to 4M users. Runs all acquisition, partnerships, and developer community initiatives." },
  { name: "Liam O'Brien", role: "Head of Engineering", initials: "LO", bio: "Previously principal engineer at Stripe. Leads a distributed team of 18 across 9 time zones." },
];

const VALUES = [
  { icon: Zap, label: "Speed First", desc: "Every second of friction we remove is a business that ships AI faster. Speed is a feature." },
  { icon: Shield, label: "Trust by Default", desc: "Enterprise-grade security isn't an add-on. It's the foundation every system is built on." },
  { icon: Globe, label: "Radical Access", desc: "AI shouldn't be exclusive to companies with engineering teams. We exist to level that playing field." },
  { icon: Users, label: "Builder-Led", desc: "Our marketplace is powered by real developers. We take care of them so they can take care of businesses." },
];

const STATS = [
  { value: "500+", label: "Businesses Served" },
  { value: "$2M+", label: "Paid to Developers" },
  { value: "99.9%", label: "Platform Uptime" },
  { value: "18", label: "Countries" },
];


function StatCard({ stat, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      className="text-center"
    >
      <div className="text-white font-bold" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.04em' }}>{stat.value}</div>
      <div className="tech-label text-white/30 mt-1">{stat.label}</div>
    </motion.div>
  );
}

export default function About() {
  const { isDark } = useTheme();
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);


  const handleContact = (e) => {
    e.preventDefault();
    setSent(true);
    setContactForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/6">
        <div className="absolute inset-0 dark-grid opacity-30" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: 'rgba(77,159,255,0.07)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: 'rgba(77,159,255,0.05)' }} />
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-5xl mx-auto px-4 text-center py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green pulse-aura" />
            <span className="tech-label text-white/50 tracking-[0.25em]">EST. 2022 · SAN FRANCISCO, CA</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-white font-bold leading-none mb-6"
            style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(3rem,9vw,7rem)', letterSpacing: '-0.04em' }}
          >
            We're on a mission<br />
            <span className="text-mask">to democratize AI.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/40 text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            style={{ letterSpacing: '-0.02em' }}
          >
            AIStack was founded on the belief that every business — regardless of size, budget, or technical expertise — deserves access to the AI systems that power the world's most successful companies.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto border-t border-white/6 pt-10"
          >
            {STATS.map((s, i) => <StatCard key={s.label} stat={s} i={i} />)}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FOUNDER SPOTLIGHT ─── */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-sm mx-auto lg:mx-0">
              <div className="absolute inset-0 rounded-3xl"
                style={{ background: isDark ? 'radial-gradient(ellipse at 30% 30%, rgba(77,159,255,0.18) 0%, rgba(77,159,255,0.08) 50%, transparent 70%)' : 'radial-gradient(ellipse at 30% 30%, rgba(77,159,255,0.08) 0%, rgba(77,159,255,0.04) 50%, transparent 70%)' }} />
              <div className="glass rounded-[2rem] w-full h-full flex items-center justify-center border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 dark-grid opacity-30 z-0" />
                <img src="/founder.jpg" alt="Pranav Jain" className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 z-30">
                  <div className="text-white font-bold text-3xl mb-1" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.03em' }}>Pranav Jain</div>
                  <div className="tech-label text-nova-blue mt-1 tracking-widest bg-nova-blue/10 border border-nova-blue/20 inline-block px-3 py-1 rounded-full backdrop-blur-md">CEO & FOUNDER</div>
                </div>
              </div>
            </div>
            {/* Floating badges */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-2.5 border border-white/15 z-40 shadow-xl"
            >
              <div className="tech-label text-cyber-green">Y COMBINATOR '23</div>
            </motion.div>
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-2.5 border border-white/15 z-40 shadow-xl"
            >
              <div className="tech-label text-nova-blue">EX GOOGLE DEEPMIND</div>
            </motion.div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="tech-label text-white/25 tracking-[0.25em] mb-4">FOUNDER'S NOTE</p>
            <h2 className="text-white font-bold mb-6"
              style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.04em', lineHeight: '1.2' }}>
              "I saw the gap<br />from both sides."
            </h2>
            <div className="space-y-4 text-white/50 text-base leading-relaxed" style={{ letterSpacing: '-0.01em' }}>
              <p>
                At NIT Trichy, I kept seeing the same pattern around me.
              </p>
              <p>
                I had friends who were solid developers — they could build full-stack apps, AI tools, automation systems. Technically, they knew everything. But they didn’t have clients. They were either waiting on platforms, doing small gigs, or just building projects no one used.
              </p>
              <p>
                At the same time, I spoke to small business owners — and for them, even getting something basic like a chatbot or automation system was painful. They had to find a developer, explain everything, wait weeks or months, spend a lot, and still weren’t sure what they’d get.
              </p>
              <p className="text-white/70">
                So on one side, there were capable builders with no distribution.<br />
                On the other, businesses with real problems but no easy way to access solutions.
              </p>
              <p>
                That gap didn’t make sense. Why should every business start from scratch? And why should every developer rebuild the same things again and again?
              </p>
              <p>
                That’s where the idea started. I’m working on a platform where businesses can directly pick and deploy ready-made AI systems — chatbots, automations, workflows — in minutes.
              </p>
              <p>
                And on the developer side, instead of doing one-off projects, they can list what they’ve already built, offer light customization, and sell it multiple times.
              </p>
              <p>
                No long back-and-forth. No rebuilding the same solution for every client. <span className="text-white font-medium">Just faster access on both sides.</span>
              </p>
              <p>
                Right now, it’s early. I’m validating the idea, talking to developers, understanding how they get clients and what actually blocks them. Still figuring things out — but the problem feels real.
              </p>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <div>
                <div className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.03em' }}>Pranav Jain</div>
                <div className="tech-label text-white/30">CEO & Founder, AIStack</div>
              </div>
              <div className="flex gap-2 ml-auto">
                {[
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Github, href: "#", label: "GitHub" },
                ].map(({ icon: SocialIcon, href, label }) => (
                  <a key={label} href={href}
                    className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/30 hover:text-white transition-colors border border-white/8 hover:border-white/20">
                    <SocialIcon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="border-t border-white/6 py-24 overflow-hidden relative">
        <div className="absolute inset-0 dark-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="tech-label text-white/25 tracking-[0.25em] mb-3">HISTORY</p>
            <h2 className="text-white font-bold text-4xl" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.04em' }}>The journey so far</h2>
          </motion.div>
          <div className="relative w-full">
            {MILESTONES.map((m, i) => {
              const isRight = i % 2 === 0;
              const isLast = i === MILESTONES.length - 1;
              const dotX = isRight ? 53 : 47;
              const nextDotX = isRight ? 47 : 53;
              const color = isRight ? '#4D9FFF' : '#4D9FFF';

              return (
                <div key={m.year} className="relative mb-24 w-full">
                  {/* The SVG Connection - Rendered on all sizes */}
                  {!isLast && (
                    <svg className="absolute pointer-events-none z-0 block"
                         style={{
                           left: 0,
                           width: '100%',
                           top: '32px',
                           height: 'calc(100% + 6rem)',
                         }}
                         viewBox="0 0 100 100"
                         preserveAspectRatio="none"
                    >
                      <motion.path 
                         d={`M ${dotX} 0 C ${dotX} 50, ${nextDotX} 50, ${nextDotX} 100`}
                         fill="none"
                         stroke={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}
                         strokeWidth="2"
                         strokeDasharray="6 6"
                         vectorEffect="non-scaling-stroke"
                         initial={{ pathLength: 0, opacity: 0 }}
                         whileInView={{ pathLength: 1, opacity: 1 }}
                         viewport={{ once: true, margin: '-15%' }}
                         transition={{ duration: 1.4, ease: 'easeInOut' }}
                      />
                    </svg>
                  )}

                  {/* The Dot - Rendered on all sizes */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-15%' }}
                    transition={{ type: 'spring', delay: 0.1, bounce: 0.4 }}
                    className="absolute z-20 w-4 h-4 rounded-full border border-background shadow-lg block"
                    style={{ 
                      top: '24px', 
                      left: `${dotX}%`, 
                      transform: 'translateX(-50%)',
                      background: color,
                      boxShadow: `0 0 16px ${isDark ? color : color + '80'}`
                    }}
                  />

                  <motion.div 
                     initial={{ opacity: 0, x: isRight ? 60 : -60 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, margin: '-15%' }}
                     transition={{ duration: 0.7, delay: 0.2, type: 'spring', bounce: 0.2 }}
                     className={`w-[45%] relative z-10 ${isRight ? 'ml-auto' : 'mr-auto'}`}
                  >
                     <div className="glass rounded-[1.5rem] p-6 sm:p-8 hover:border-white/20 transition-all shadow-[0_16px_40px_rgba(0,0,0,0.3)]" 
                          style={{ border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)' }}>
                         <div className="flex items-center gap-3 mb-3">
                           <span className="tech-label font-bold text-sm tracking-widest" style={{ color }}>{m.year}</span>
                         </div>
                         <h3 className="text-white font-bold text-2xl mb-3" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.03em' }}>{m.title}</h3>
                         <p className="text-white/50 text-sm sm:text-base leading-relaxed">{m.desc}</p>
                     </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="tech-label text-white/25 tracking-[0.25em] mb-3">PRINCIPLES</p>
          <h2 className="text-white font-bold text-4xl" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.04em' }}>What we stand for</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              className="radial-card rounded-2xl p-7 group text-center"
            >
              <div className="w-11 h-11 glass rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:border-nova-blue/30 transition-colors">
                <v.icon className="w-5 h-5 text-white/40 group-hover:text-nova-blue transition-colors" />
              </div>
              <h3 className="text-white font-bold mb-2 text-lg" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.03em' }}>{v.label}</h3>
              <p className="text-white/35 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="border-t border-white/6 py-24 overflow-hidden relative">
        <div className="absolute inset-0 dark-grid opacity-15" />
        <div className="relative max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="tech-label text-white/25 tracking-[0.25em] mb-3">TEAM</p>
            <h2 className="text-white font-bold text-4xl" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.04em' }}>The builders</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEAM.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`radial-card rounded-2xl p-6 group relative overflow-hidden ${t.featured ? "md:col-span-2 lg:col-span-1" : ""}`}
                style={t.featured ? { border: isDark ? '0.5px solid rgba(77,159,255,0.25)' : '0.5px solid rgba(77,159,255,0.45)' } : { border: isDark ? undefined : '0.5px solid rgba(0,0,0,0.05)' }}
              >
                {t.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="cyber-tag text-nova-blue border-nova-blue/30">FOUNDER</span>
                  </div>
                )}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl glass flex items-center justify-center border font-bold text-lg shrink-0 ${t.featured ? "border-nova-blue/30 text-nova-blue" : "border-white/10 text-white"}`}
                    style={{ fontFamily: 'Georgia, serif', boxShadow: t.featured ? '0 0 20px rgba(77,159,255,0.15)' : undefined }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white font-bold" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.03em' }}>{t.name}</div>
                    <div className="tech-label text-white/30 mt-0.5">{t.role}</div>
                  </div>
                </div>
                <p className="text-white/35 text-sm leading-relaxed">{t.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT + HQ ─── */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="tech-label text-white/25 tracking-[0.25em] mb-3">CONTACT</p>
          <h2 className="text-white font-bold text-4xl" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.04em' }}>Get in touch</h2>
          <p className="text-white/35 text-base mt-3" style={{ letterSpacing: '-0.01em' }}>We respond to every message within 24 hours.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="space-y-5"
          >
            {/* HQ */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 glass rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                  <MapPin className="w-4 h-4 text-nova-blue" />
                </div>
                <div>
                  <div className="tech-label text-white/30 mb-1">HEADQUARTERS</div>
                  <div className="text-white font-medium" style={{ letterSpacing: '-0.02em' }}>188 King Street, Suite 400</div>
                  <div className="text-white/50 text-sm">San Francisco, CA 94107, USA</div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 glass rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                  <Mail className="w-4 h-4 text-cyber-green" />
                </div>
                <div>
                  <div className="tech-label text-white/30 mb-1">EMAIL</div>
                  <a href="mailto:hello@aistack.dev" className="text-white hover:text-nova-blue transition-colors font-medium" style={{ letterSpacing: '-0.02em' }}>hello@aistack.dev</a>
                  <div className="text-white/30 text-sm mt-0.5">General inquiries & partnerships</div>
                  <a href="mailto:pranav@aistack.dev" className="block text-white/60 hover:text-white transition-colors text-sm mt-2" style={{ letterSpacing: '-0.02em' }}>pranav@aistack.dev</a>
                  <div className="text-white/25 text-xs">Direct to Pranav (Founder)</div>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 glass rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                  <Phone className="w-4 h-4 text-white/40" />
                </div>
                <div>
                  <div className="tech-label text-white/30 mb-1">PHONE</div>
                  <div className="text-white font-medium" style={{ letterSpacing: '-0.02em' }}>+1 (415) 240-8800</div>
                  <div className="text-white/30 text-sm">Mon–Fri, 9am–6pm PT</div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="glass rounded-2xl p-6">
              <div className="tech-label text-white/30 mb-4">FOLLOW US</div>
              <div className="flex gap-3">
                {[
                  { icon: Twitter, label: "Twitter / X", handle: "@AIStackHQ" },
                  { icon: Linkedin, label: "LinkedIn", handle: "aistack-dev" },
                  { icon: Github, label: "GitHub", handle: "aistack-dev" },
                  { icon: MessageSquare, label: "Discord", handle: "Join Server" },
                ].map(({ icon: Icon, label, handle }) => (
                  <a key={label} href="#"
                    className="flex-1 glass rounded-xl p-3 flex flex-col items-center gap-1.5 text-white/30 hover:text-white hover:border-white/20 transition-all border border-white/8 group">
                    <Icon className="w-4 h-4 group-hover:text-nova-blue transition-colors" />
                    <span className="tech-label text-[9px] text-center">{handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          >
            <div className="glass rounded-2xl p-8 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(77,159,255,0.4), transparent)', transform: 'translate(30%, -30%)' }} />
              <h3 className="text-white font-bold text-2xl mb-2" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.04em' }}>Send a message</h3>
              <p className="text-white/30 text-sm mb-8" style={{ letterSpacing: '-0.01em' }}>We'd love to hear about your business and how we can help.</p>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 gap-4"
                >
                  <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center border border-cyber-green/30"
                    style={{ boxShadow: '0 0 20px rgba(77,159,255,0.2)' }}>
                    <span className="text-cyber-green text-2xl">✓</span>
                  </div>
                  <div className="text-white font-bold text-xl" style={{ fontFamily: 'Georgia, serif' }}>Message sent!</div>
                  <div className="text-white/35 text-sm text-center">We'll get back to you within 24 hours.</div>
                </motion.div>
              ) : (
                <form onSubmit={handleContact} className="space-y-5">
                  <div className="float-field">
                    <input
                      type="text"
                      id="name"
                      placeholder=" "
                      value={contactForm.name}
                      onChange={e => setContactForm(p => ({ ...p, name: e.target.value }))}
                      required
                    />
                    <label htmlFor="name">Your Name</label>
                  </div>
                  <div className="float-field">
                    <input
                      type="email"
                      id="email"
                      placeholder=" "
                      value={contactForm.email}
                      onChange={e => setContactForm(p => ({ ...p, email: e.target.value }))}
                      required
                    />
                    <label htmlFor="email">Email Address</label>
                  </div>
                  <div className="float-field">
                    <textarea
                      id="message"
                      placeholder=" "
                      rows={4}
                      value={contactForm.message}
                      onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))}
                      required
                      style={{ resize: 'none' }}
                    />
                    <label htmlFor="message">How can we help?</label>
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="shimmer-btn w-full bg-white text-black font-bold text-sm py-4 rounded-xl flex items-center justify-center gap-2 mt-2"
                  >
                    Send Message <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-white/6 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 dark-grid opacity-20" />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative">
          <p className="tech-label text-white/25 tracking-[0.25em] mb-4">JOIN US</p>
          <h2 className="text-white font-bold mb-6"
            style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.04em' }}>
            Ready to deploy AI?
          </h2>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="shimmer-btn inline-flex items-center gap-2 bg-white text-black font-bold text-sm px-8 py-4 rounded-2xl">
                Browse the Marketplace <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
            <Link to="/pricing">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 text-white/60 hover:text-white border border-white/15 hover:border-white/25 font-semibold text-sm px-8 py-4 rounded-2xl transition-all">
                View Pricing
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}