"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MOCK_REGULARS, MOCK_ORDERS, ORDER_STATUS_CONFIG,
  DAYS, DAYS_KN, getTodayIndex, type OrderStatus,
} from "@/lib/menu-data";
import { Users, ShoppingCart, TrendingUp, Clock, ArrowRight, Lock } from "lucide-react";
import { motion, AnimatePresence, MotionCounter, PageTransition, TypewriterText } from "@/components/motion";
import { springSnappy, springBouncy } from "@/lib/animations";
import { useLang } from "@/lib/language-context";

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const { t } = useLang();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === "haviruchi2024") {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-cream">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={springBouncy}>
        <Card className="max-w-sm w-full p-8 border-0 shadow-lg text-center">
          <div className="w-14 h-14 rounded-full bg-maroon/10 flex items-center justify-center mx-auto mb-5">
            <Lock size={24} className="text-maroon" />
          </div>
          <h1 className="text-xl font-semibold text-brown mb-1">{t("ನಿರ್ವಾಹಕ ಲಾಗಿನ್", "Admin Login")}</h1>
          <p className="text-sm text-brown-light/50 mb-6">{t("ಹವಿ ರುಚಿ ಕಿಚನ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", "Havi Ruchi Kitchen Dashboard")}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.input
              animate={error ? { x: [-8, 8, -8, 8, 0] } : {}}
              transition={{ duration: 0.4 }}
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder={t("ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ", "Enter password")}
              className={`w-full px-4 py-3 rounded-xl bg-cream text-sm outline-none transition-all border ${error ? "border-red-400" : "border-cream-dark focus:border-saffron"}`}
            />
            <motion.button type="submit" whileTap={{ scale: 0.95 }} className="w-full bg-maroon hover:bg-maroon-light text-white rounded-full py-3 font-medium transition-colors">
              {t("ಲಾಗಿನ್", "Login")}
            </motion.button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}

function StatCard({ icon, label, value, sub, color, delay = 0 }: {
  icon: React.ReactNode; label: string; value: number | string; sub: string; color: string; delay?: number;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}>
      <Card className="p-4 sm:p-5 border-0 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-brown-light/50 mb-1">{label}</p>
            <p className="text-2xl sm:text-3xl font-bold text-brown">
              {typeof value === "number" ? <MotionCounter target={value} /> : value}
            </p>
            <p className="text-xs text-brown-light/40 mt-1">{sub}</p>
          </div>
          <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>{icon}</div>
        </div>
      </Card>
    </motion.div>
  );
}

function AnimatedBar({ day, orders, maxOrders, delay }: { day: string; orders: number; maxOrders: number; delay: number }) {
  const [hover, setHover] = useState(false);
  const heightPct = (orders / maxOrders) * 100;

  return (
    <div className="flex-1 flex flex-col items-center gap-2">
      <AnimatePresence>
        {hover && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="text-xs font-bold text-maroon bg-cream rounded-full px-2 py-0.5"
          >
            {orders}
          </motion.span>
        )}
      </AnimatePresence>
      {!hover && <span className="text-xs font-semibold text-brown">{orders}</span>}
      <div
        className="w-full relative flex items-end"
        style={{ height: "160px" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay, ...springSnappy, stiffness: 200, damping: 18 }}
          style={{ originY: 1, height: `${heightPct}%` }}
          className={`w-full rounded-t-lg transition-all duration-200 ${hover ? "shadow-lg shadow-saffron/30" : ""}`}
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-full h-full rounded-t-lg bg-gradient-to-t from-maroon to-saffron" />
        </motion.div>
      </div>
      <span className="text-[10px] text-brown-light/40">{day}</span>
    </div>
  );
}

function Dashboard() {
  const { t } = useLang();
  const [orders, setOrders] = useState(
    MOCK_ORDERS.map((o) => ({ ...o, status: o.status as OrderStatus }))
  );
  const [tab, setTab] = useState<"orders" | "regulars" | "stats">("orders");
  const todayIdx = getTodayIndex();
  const today = DAYS[todayIdx];
  const todayKn = DAYS_KN[todayIdx];

  function advanceStatus(orderId: string) {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const config = ORDER_STATUS_CONFIG[o.status];
        if (!config.next) return o;
        return { ...o, status: config.next as OrderStatus };
      })
    );
  }

  const weeklyData = [
    { day: t("ಸೋಮ", "Mon"), orders: 18 }, { day: t("ಮಂಗ", "Tue"), orders: 22 },
    { day: t("ಬುಧ", "Wed"), orders: 15 }, { day: t("ಗುರು", "Thu"), orders: 28 },
    { day: t("ಶುಕ್ರ", "Fri"), orders: 20 }, { day: t("ಶನಿ", "Sat"), orders: 32 },
    { day: t("ಭಾನು", "Sun"), orders: 25 },
  ];
  const maxOrders = Math.max(...weeklyData.map((d) => d.orders));

  return (
    <PageTransition>
      <div className="min-h-screen bg-cream">
        {/* Header */}
        <div className="bg-maroon text-cream px-5 sm:px-8 pt-6 pb-8">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-saffron text-xs font-medium tracking-wider uppercase">
                  {t("ನಿರ್ವಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", "Admin Dashboard")}
                </motion.p>
                <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="text-2xl font-semibold mt-1">
                  {t("ಹವಿ ರುಚಿ ಕಿಚನ್", "Havi Ruchi Kitchen")}
                </motion.h1>
              </div>
              <Badge className="bg-white/10 text-cream border-0">{t(todayKn, today)}</Badge>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 -mb-14">
              <StatCard icon={<ShoppingCart size={18} className="text-saffron" />} label={t("ಇಂದಿನ ಆರ್ಡರ್", "Today's Orders")} value={6} sub={t("2 ಬಾಕಿ", "2 pending")} color="bg-saffron/10" delay={0.1} />
              <StatCard icon={<Users size={18} className="text-forest" />} label={t("ನಿಯಮಿತ ಗ್ರಾಹಕರು", "Regulars")} value={8} sub={t("ಈ ತಿಂಗಳ ಸಕ್ರಿಯ", "Active this month")} color="bg-forest/10" delay={0.2} />
              <StatCard icon={<TrendingUp size={18} className="text-maroon" />} label={t("ವಾರದ ಆದಾಯ", "Weekly Revenue")} value="₹18,400" sub={t("↑ 12% ಕಳೆದ ವಾರಕ್ಕಿಂತ", "↑ 12% from last week")} color="bg-maroon/10" delay={0.3} />
              <StatCard icon={<Clock size={18} className="text-blue-600" />} label={t("ಈ ವಾರ", "This Week")} value={160} sub={t("ಒಟ್ಟು ಆರ್ಡರ್", "Total orders")} color="bg-blue-100" delay={0.4} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 pt-20 pb-10">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {([
              { v: "orders", label: t("📦 ಆರ್ಡರ್‌ಗಳು", "📦 Orders") },
              { v: "regulars", label: t("👥 ನಿಯಮಿತ ಗ್ರಾಹಕರು", "👥 Regular Customers") },
              { v: "stats", label: t("📊 ಅಂಕಿಅಂಶ", "📊 Statistics") },
            ] as const).map((ti) => (
              <motion.button key={ti.v} onClick={() => setTab(ti.v)} whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${tab === ti.v ? "bg-maroon text-white shadow-md" : "bg-white text-brown hover:bg-cream-dark shadow-sm"}`}>
                {ti.label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Orders tab */}
            {tab === "orders" && (
              <motion.div key="orders" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }} className="space-y-3">
                <h2 className="text-lg font-semibold text-brown mb-4">{t("ಇಂದಿನ ಆರ್ಡರ್‌ಗಳು", "Today's Orders")}</h2>
                {orders.map((order, i) => {
                  const config = ORDER_STATUS_CONFIG[order.status];
                  return (
                    <motion.div key={order.id} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07, ...springSnappy }}>
                      <Card className={`p-4 sm:p-5 border-0 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden ${order.status === "pending" ? "bg-amber-50/50" : ""}`}>
                        {order.status === "pending" && (
                          <motion.div
                            className="absolute inset-0 bg-saffron/10 pointer-events-none"
                            animate={{ opacity: [0, 0.5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}
                        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold text-brown">{order.customer}</span>
                              <motion.div layout>
                                <Badge className={`${config.color} border-0 text-[10px]`}>{config.label}</Badge>
                              </motion.div>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-brown-light/50">
                              <span>{order.id}</span><span>•</span>
                              <span>{order.meal} — {order.items}</span><span>•</span>
                              <span>{order.time}</span>
                            </div>
                          </div>
                          {config.next && (
                            <motion.button whileTap={{ scale: 0.95 }} onClick={() => advanceStatus(order.id)}
                              className="group bg-cream hover:bg-saffron/10 text-sm font-medium text-brown rounded-full px-4 py-2 flex items-center gap-2 transition-all duration-300 shrink-0">
                              → {ORDER_STATUS_CONFIG[config.next].label}
                              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Regulars tab */}
            {tab === "regulars" && (
              <motion.div key="regulars" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
                <h2 className="text-lg font-semibold text-brown mb-4">{t("ನಿಯಮಿತ ಗ್ರಾಹಕರು", "Regular Customers")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MOCK_REGULARS.map((r, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06, ...springSnappy }}>
                      <Card className="p-4 sm:p-5 border-0 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                            <span className="text-saffron font-bold text-sm">{r.name[0]}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-brown text-sm truncate">{r.name}</h3>
                            <p className="text-xs text-brown-light/40">{r.phone}</p>
                            <div className="mt-2"><Badge className="bg-forest/10 text-forest border-0 text-[10px]"><TypewriterText text={r.usual} delay={i * 0.1} /></Badge></div>
                            <div className="mt-2 flex items-center gap-3 text-[11px] text-brown-light/40">
                              <span>{t("ಕೊನೆ", "Last")}: {r.lastOrder}</span><span>•</span>
                              <span><MotionCounter target={r.ordersThisMonth} /> {t("ಆರ್ಡರ್/ತಿಂಗಳು", "orders/month")}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Stats tab */}
            {tab === "stats" && (
              <motion.div key="stats" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
                <h2 className="text-lg font-semibold text-brown mb-4">{t("ವಾರದ ಅಂಕಿಅಂಶ", "Weekly Stats")}</h2>
                <Card className="p-5 sm:p-6 border-0 shadow-sm mb-4">
                  <h3 className="text-sm font-medium text-brown-light/50 mb-6">{t("ಈ ವಾರದ ಆರ್ಡರ್‌ಗಳು", "Orders This Week")}</h3>
                  <div className="flex items-end justify-between gap-2 h-48">
                    {weeklyData.map((d, i) => (
                      <AnimatedBar key={d.day} day={d.day} orders={d.orders} maxOrders={maxOrders} delay={i * 0.08} />
                    ))}
                  </div>
                </Card>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: t("ಒಟ್ಟು ಆರ್ಡರ್", "Total Orders"), value: 160 },
                    { label: t("ಆದಾಯ", "Revenue"), value: "₹18.4K" },
                    { label: t("ಸಕ್ರಿಯ ನಿಯಮಿತ", "Active Regulars"), value: 8 },
                    { label: t("ಸರಾಸರಿ/ದಿನ", "Avg/Day"), value: "22.9" },
                  ].map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}>
                      <Card className="p-4 border-0 shadow-sm text-center">
                        <p className="text-2xl font-bold text-maroon">
                          {typeof s.value === "number" ? <MotionCounter target={s.value} /> : s.value}
                        </p>
                        <p className="text-xs text-brown-light/40 mt-1">{s.label}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;
  return <Dashboard />;
}
