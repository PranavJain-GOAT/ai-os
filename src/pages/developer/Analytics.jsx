import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const MOCK_ORDERS = [
  { id: "o1", product_title: "Handle WhatsApp Orders Automatically", customer_email: "test1@example.com", amount: 49, status: "paid" },
  { id: "o2", product_title: "AI Customer Support Chatbot", customer_email: "ceo@startup.com", amount: 39, status: "installed" },
  { id: "o3", product_title: "Smart Appointment Booking System", customer_email: "booking@clinic.com", amount: 29, status: "pending" },
];

// Change #10: Animated SVG line chart that draws itself + glowing tooltip
function AnimatedLineChart({ data }) {
    const [progress, setProgress] = useState(0);
    const [hoveredPoint, setHoveredPoint] = useState(null);
    const svgRef = useRef(null);

    const W = 420, H = 200, PAD = { t: 20, r: 20, b: 30, l: 35 };
    const maxVal = Math.max(...data.map(d => d.installs));
    const xs = data.map((_, i) => PAD.l + (i / (data.length - 1)) * (W - PAD.l - PAD.r));
    const ys = data.map(d => PAD.t + (1 - d.installs / maxVal) * (H - PAD.t - PAD.b));

    const pathD = xs.map((x, i) => `${i === 0 ? 'M' : 'L'} ${x} ${ys[i]}`).join(' ');
    const fillD = pathD + ` L ${xs[xs.length - 1]} ${H - PAD.b} L ${xs[0]} ${H - PAD.b} Z`;

    useEffect(() => {
        let start = null;
        const duration = 1400;
        const step = (ts) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            setProgress(p);
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, []);

    const pathEl = svgRef.current?.querySelector('.anim-path');
    const pathLength = pathEl ? pathEl.getTotalLength() : 600;

    return (
        <div className="relative w-full h-full">
            <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ overflow: 'visible' }}>
                <defs>
                    <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0" />
                    </linearGradient>
                    <filter id="lineGlow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>

                {/* Grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
                    const y = PAD.t + t * (H - PAD.t - PAD.b);
                    return <line key={i} x1={PAD.l} y1={y} x2={W - PAD.r} y2={y} stroke="hsl(var(--foreground) / 0.06)" strokeWidth="1" />;
                })}

                {/* X labels */}
                {data.map((d, i) => (
                    <text key={i} x={xs[i]} y={H - 8} textAnchor="middle" fill="hsl(var(--foreground) / 0.35)" fontSize="11" fontFamily="monospace">{d.month}</text>
                ))}

                {/* Fill area */}
                <path d={fillD} fill="url(#fillGrad)" opacity={progress} />

                {/* Animated line */}
                <path
                    className="anim-path"
                    d={pathD}
                    fill="none"
                    stroke="hsl(var(--foreground))"
                    strokeWidth="2.5"
                    filter="url(#lineGlow)"
                    strokeDasharray={pathLength}
                    strokeDashoffset={pathLength * (1 - progress)}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.05s linear' }}
                />

                {/* Data points */}
                {xs.map((x, i) => (
                    <g key={i}
                        onMouseEnter={() => setHoveredPoint(i)}
                        onMouseLeave={() => setHoveredPoint(null)}
                    >
                        <circle cx={x} cy={ys[i]} r="10" fill="transparent" />
                        <circle cx={x} cy={ys[i]} r={hoveredPoint === i ? 7 : 4}
                            fill={hoveredPoint === i ? "#fff" : "hsl(var(--foreground))"}
                            stroke="hsl(var(--foreground))"
                            strokeWidth="2"
                            style={{ filter: hoveredPoint === i ? '0 0 12px hsl(var(--foreground))' : 'none', transition: 'r 0.15s ease' }}
                        />
                        {/* Glowing tooltip */}
                        {hoveredPoint === i && (
                            <g>
                                <rect x={x - 30} y={ys[i] - 36} width="60" height="24" rx="6"
                                    fill="rgba(0,0,0,0.92)"
                                    stroke="rgba(150,150,150,0.5)"
                                    strokeWidth="0.5"
                                    style={{ filter: 'drop-shadow(0 0 8px rgba(150,150,150,0.4))' }}
                                />
                                <text x={x} y={ys[i] - 20} textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="700" fontFamily="monospace">
                                    {data[i].installs}
                                </text>
                            </g>
                        )}
                    </g>
                ))}
            </svg>
        </div>
    );
}

export default function Analytics() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setOrders(MOCK_ORDERS);
            setLoading(false);
        }, 400);
    }, []);

    const totalRevenue = orders.filter((o) => o.status === "paid" || o.status === "installed").reduce((sum, o) => sum + (o.amount || 0), 0);
    const totalOrders = orders.length;
    const paidOrders = orders.filter((o) => o.status === "paid" || o.status === "installed").length;

    // Mock monthly data for chart
    const monthlyData = [
        { month: "Jan", revenue: 1200, installs: 8 },
        { month: "Feb", revenue: 1800, installs: 12 },
        { month: "Mar", revenue: 2400, installs: 18 },
        { month: "Apr", revenue: 3100, installs: 22 },
        { month: "May", revenue: 2800, installs: 20 },
        { month: "Jun", revenue: 3600, installs: 28 },
    ];

    if (loading) {
        return (
            <div className="flex justify-center py-32">
                <div className="w-8 h-8 border-4 border-muted border-t-foreground rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 sm:p-8 max-w-6xl">
            <h1 className="text-white font-bold text-2xl sm:text-3xl mb-2" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.04em' }}>Analytics</h1>
            <p className="text-white/40 text-sm mb-8 font-mono">Track your sales and performance</p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {[
                    { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}` },
                    { label: "Total Orders", value: totalOrders },
                    { label: "Conversion Rate", value: totalOrders > 0 ? `${Math.round((paidOrders / totalOrders) * 100)}%` : "0%" },
                ].map((s, i) => (
                    <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="rounded-2xl p-6 border border-white/8"
                        style={{ background: 'hsl(var(--card))', boxShadow: '0 8px 40px rgba(150,150,150,0.7), 0 1px 0 hsl(var(--foreground) / 0.04) inset' }}
                    >
                        <div className="text-xs font-mono font-semibold text-white/30 uppercase tracking-wider mb-2">{s.label}</div>
                        <div className="text-white font-bold text-3xl" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.04em' }}>{s.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-2xl p-6 border border-white/8" style={{ background: 'hsl(var(--card))', boxShadow: '0 8px 40px rgba(150,150,150,0.7)' }}>
                    <h2 className="text-white font-bold mb-6" style={{ fontFamily: 'Georgia, serif' }}>Revenue</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--foreground) / 0.06)" />
                                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--foreground) / 0.4)' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--foreground) / 0.4)' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        background: "#111",
                                        color: "hsl(var(--foreground))",
                                        border: "1px solid hsl(var(--foreground) / 0.1)",
                                        borderRadius: "10px",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                    }}
                                    formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]}
                                />
                                <defs>
                                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity={1} />
                                        <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity={0.7} />
                                    </linearGradient>
                                </defs>
                                <Bar dataKey="revenue" fill="url(#revenueGrad)" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-2xl p-6 border border-white/8" style={{ background: 'hsl(var(--card))', boxShadow: '0 8px 40px rgba(150,150,150,0.08), 0 2px 8px rgba(0,0,0,0.6)' }}>
                    <h2 className="text-white font-bold mb-6" style={{ fontFamily: 'Georgia, serif' }}>Installs</h2>
                    <div className="h-64">
                        <AnimatedLineChart data={monthlyData} />
                    </div>
                </div>
            </div>

            {/* Orders table */}
            <div className="rounded-2xl overflow-hidden mt-6 border border-white/8" style={{ background: 'hsl(var(--card))' }}>
                <div className="px-6 py-4 border-b border-white/8">
                    <h2 className="text-white font-bold" style={{ fontFamily: 'Georgia, serif' }}>All Orders</h2>
                </div>
                {orders.length === 0 ? (
                    <div className="p-12 text-center text-white/30 text-sm font-mono">No orders yet</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/6">
                                    <th className="text-left px-6 py-3 text-[10px] font-mono font-semibold text-white/25 uppercase tracking-wider">Product</th>
                                    <th className="text-left px-6 py-3 text-[10px] font-mono font-semibold text-white/25 uppercase tracking-wider">Customer</th>
                                    <th className="text-left px-6 py-3 text-[10px] font-mono font-semibold text-white/25 uppercase tracking-wider">Amount</th>
                                    <th className="text-left px-6 py-3 text-[10px] font-mono font-semibold text-white/25 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {orders.map((o) => (
                                    <tr key={o.id} className="hover:bg-white/3 transition-colors">
                                        <td className="px-6 py-4 text-sm text-white font-medium">{o.product_title}</td>
                                        <td className="px-6 py-4 text-sm text-white/40 font-mono">{o.customer_email || "—"}</td>
                                        <td className="px-6 py-4 text-sm text-white font-bold" style={{ fontFamily: 'Georgia, serif' }}>${o.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${o.status === "paid" || o.status === "installed"
                                                    ? "bg-[hsl(var(--foreground))]/20 text-[hsl(var(--foreground))] border border-[hsl(var(--foreground))]/30"
                                                    : "bg-white/5 text-white/30 border border-white/10"
                                                }`}>
                                                {o.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}