"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar, BottomNav, FloatingWhatsApp } from "@/components/navbar";
import { WhatsAppIcon } from "@/components/icons";
import { useLang } from "@/lib/language-context";
import { motion, AnimatePresence, MotionReveal, PageTransition, ScrollProgress, RippleButton, MagneticWrapper, GlowCard, TextReveal } from "@/components/motion";
import { springSnappy, rockingVariant } from "@/lib/animations";
import {
  MENU, MEAL_LABELS, DAYS, DAYS_KN, getTodayIndex,
  whatsappOrder, type MealType, type DayIndex, type MenuItem,
} from "@/lib/menu-data";

export default function MenuPage() {
  const { lang, t } = useLang();
  const todayIdx = getTodayIndex();
  const [day, setDay] = useState<DayIndex>(todayIdx);
  const [meal, setMeal] = useState<MealType>("lunch");
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);

  const items = MENU[meal][day];
  const info = MEAL_LABELS[meal];

  function addToCart(item: MenuItem) {
    if (!cart.some(c => c.kn === item.kn)) {
      setCart((prev) => [...prev, item]);
      const id = Date.now();
      setToast({ id, message: lang === "kn" ? `${item.kn} ಸೇರಿಸಲಾಗಿದೆ` : `Added ${item.en}` });
      setTimeout(() => setToast(current => current?.id === id ? null : current), 3000);
    }
  }

  const orderText = `ನಮಸ್ಕಾರ 🙏\n${DAYS[day]} ${info.en} order:\n${cart.map((i) => `• ${i.en}${i.qty ? ` (${i.qty})` : ""}`).join("\n")}\n\nName:\nAddress:\nPhone:`;

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <PageTransition>
        <main className="pt-20 pb-24 md:pb-10 min-h-screen">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">

            {/* Header */}
            <MotionReveal type="fade-up" className="mb-8 sm:mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-maroon text-white text-[12px] font-semibold flex items-center justify-center">📋</span>
                <span className="text-[13px] font-medium border border-maroon/20 rounded-full px-4 py-1.5 text-maroon">
                  {t("ವಾರದ ಮೆನು", "Weekly Menu")}
                </span>
              </div>
              <h1 className="text-[clamp(1.75rem,5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-brown">
                <TextReveal>
                  {t(<>ನಮ್ಮ <span className="text-saffron">ಮೆನು</span></>, <>Our <span className="text-saffron">Menu</span></>)}
                </TextReveal>
              </h1>
              <p className="text-sm text-brown-light/50 mt-2">
                {t("ದಿನ ಮತ್ತು ಊಟ ಆಯ್ಕೆ ಮಾಡಿ", "Select day and meal to see the full menu")}
              </p>
            </MotionReveal>

            {/* Meal tabs — framer layoutId sliding indicator */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
              <div className="inline-flex bg-cream-dark/50 rounded-full p-1 gap-1 relative">
                {(["breakfast", "lunch", "dinner"] as MealType[]).map((m) => {
                  const mi = MEAL_LABELS[m];
                  return (
                    <button
                      key={m}
                      onClick={() => setMeal(m)}
                      className="relative px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-300 z-10"
                      style={{ color: meal === m ? "#fff" : undefined }}
                    >
                      {meal === m && (
                        <motion.span
                          layoutId="meal-pill"
                          className="absolute inset-0 bg-maroon rounded-full shadow-md"
                          style={{ zIndex: -1 }}
                          transition={springSnappy}
                        />
                      )}
                      <span className="relative">{mi.icon} {t(mi.kn, mi.en)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Day selector */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {DAYS.map((d, i) => (
                <motion.button
                  key={d}
                  onClick={() => setDay(i as DayIndex)}
                  whileTap={{ scale: 0.93 }}
                  className={`flex flex-col items-center px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 min-w-[60px] ${
                    day === i
                      ? "bg-saffron text-white shadow-md"
                      : i === todayIdx
                        ? "bg-white text-maroon shadow-sm ring-1 ring-maroon/20"
                        : "bg-white text-brown-light/60 shadow-sm hover:bg-cream-dark"
                  }`}
                >
                  <span className="text-[10px] opacity-70">{lang === "kn" ? DAYS_KN[i].slice(0, 3) : d.slice(0, 3)}</span>
                  <span className="font-semibold">{lang === "kn" ? d.slice(0, 3) : DAYS_KN[i].slice(0, 3)}</span>
                  {i === todayIdx && <span className="text-[8px] mt-0.5 opacity-70">{t("ಇಂದು", "Today")}</span>}
                </motion.button>
              ))}
            </div>

            {/* Menu heading */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-brown">
                  {t(`${DAYS_KN[day]} ${info.kn}`, `${DAYS[day]} ${info.en}`)}
                </h2>
                <p className="text-xs text-brown-light/40 mt-0.5">{info.time}</p>
              </div>
              {cart.length > 0 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={springSnappy}>
                  <Badge className="bg-forest text-white border-0 text-sm px-3 py-1">
                    <ShoppingCart size={14} className="mr-1" />
                    {cart.length}
                  </Badge>
                </motion.div>
              )}
            </div>

            {/* Menu items — AnimatePresence for day transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${day}-${meal}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="col-span-full py-16 flex flex-col items-center justify-center text-center"
                  >
                    <motion.div variants={rockingVariant} animate="animate" className="text-6xl mb-4 drop-shadow-md">
                      🌿
                    </motion.div>
                    <p className="text-brown-light/50 font-medium">{t("ಈ ದಿನ ಯಾವುದೇ ಮೆನು ಇಲ್ಲ", "No menu available for this day")}</p>
                  </motion.div>
                ) : (
                  items.map((item, i) => {
                    const inCart = cart.some((c) => c.kn === item.kn);
                    return (
                      <motion.div
                        key={item.kn}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...springSnappy, delay: i * 0.06 }}
                        className="will-change-transform"
                      >
                        <GlowCard className="rounded-2xl">
                        <motion.div
                          whileHover={{ y: -6, boxShadow: "0 16px 32px rgba(0,0,0,0.08)" }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Card className={`p-4 sm:p-5 border-0 shadow-sm transition-all duration-200 ${inCart ? "ring-2 ring-forest/30 bg-forest/[0.02]" : ""}`}>
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-forest shrink-0" />
                                  <h3 className="font-semibold text-brown">
                                    {t(item.kn, item.en)}
                                  </h3>
                                  {item.qty && (
                                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-saffron/10 text-saffron-dark">×{item.qty}</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-brown-light/40 ml-4">{t(item.en, item.kn)}</p>
                              </div>
                              <RippleButton
                                onClick={() => addToCart(item)}
                                className={`shrink-0 text-xs font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                                  inCart
                                    ? "bg-forest/10 text-forest"
                                    : "bg-cream-dark text-brown hover:bg-saffron hover:text-white"
                                }`}
                              >
                                {inCart ? "✓" : "+ " + t("ಆಯ್ಕೆ", "Add")}
                              </RippleButton>
                            </div>
                          </Card>
                        </motion.div>
                        </GlowCard>
                      </motion.div>
                    );
                  })
                )}
              </motion.div>
            </AnimatePresence>

            {/* Cart strip */}
            <AnimatePresence>
              {cart.length > 0 && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={springSnappy}
                  className="fixed bottom-16 md:bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-cream-dark p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
                >
                  <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-brown truncate">
                        {cart.length} {t("ಐಟಂ ಆಯ್ಕೆ", "item(s) selected")}
                      </p>
                      <p className="text-xs text-brown-light/40 truncate">{cart.map((c) => t(c.kn, c.en)).join(", ")}</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button whileTap={{ scale: 0.95 }} onClick={() => setCart([])} className="text-xs text-brown-light/50 hover:text-maroon px-3 py-2 rounded-full transition-colors">
                        {t("ತೆಗೆ", "Clear")}
                      </motion.button>
                      <MagneticWrapper>
                        <Link
                          href={`/order?day=${day}&meal=${meal}&items=${encodeURIComponent(JSON.stringify(cart))}`}
                          className="bg-forest hover:bg-forest-light text-white text-sm font-medium rounded-full px-5 py-2.5 flex items-center gap-2 transition-all duration-300"
                        >
                          <ShoppingCart size={14} />
                          {t("ಆರ್ಡರ್ ಮಾಡಿ", "Proceed to Order")}
                        </Link>
                      </MagneticWrapper>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Toast Notification */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  key={toast.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  className="fixed bottom-36 md:bottom-24 right-4 sm:right-8 z-[100] bg-forest text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 pointer-events-none"
                >
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="font-medium text-sm">{toast.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </PageTransition>
      <FloatingWhatsApp />
      <BottomNav />
    </>
  );
}
