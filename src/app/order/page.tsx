"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar, BottomNav } from "@/components/navbar";
import { WhatsAppIcon } from "@/components/icons";
import { useLang } from "@/lib/language-context";
import { motion, AnimatePresence, Confetti, PageTransition, ScrollProgress, MorphButton } from "@/components/motion";
import { springBouncy, springSnappy, BRAND_COLORS } from "@/lib/animations";
import {
  MENU, MEAL_LABELS, DAYS, DAYS_KN, getTodayIndex,
  whatsappOrder, type MealType, type DayIndex, type MenuItem,
} from "@/lib/menu-data";

function OrderForm() {
  const { t } = useLang();
  const searchParams = useSearchParams();
  const todayIdx = getTodayIndex();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryTime, setDeliveryTime] = useState<"morning" | "afternoon" | "evening">("afternoon");
  const [mealType, setMealType] = useState<MealType>("lunch");
  const [dayChoice, setDayChoice] = useState<"today" | "tomorrow">("today");
  const [instructions, setInstructions] = useState("");
  const [orderItems, setOrderItems] = useState<MenuItem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const itemsParam = searchParams.get("items");
    const mealParam = searchParams.get("meal") as MealType | null;
    if (itemsParam) {
      try { setOrderItems(JSON.parse(decodeURIComponent(itemsParam))); } catch { /* ignore */ }
    }
    if (mealParam && ["breakfast", "lunch", "dinner"].includes(mealParam)) setMealType(mealParam);
  }, [searchParams]);

  const dayIdx: DayIndex = dayChoice === "today" ? todayIdx : ((todayIdx + 1) % 7) as DayIndex;
  const currentMealItems = orderItems.length > 0 ? orderItems : MENU[mealType][dayIdx];
  const info = MEAL_LABELS[mealType];

  function buildWhatsAppMessage() {
    return [
      `ನಮಸ್ಕಾರ 🙏 — New Order from Havi Ruchi Website`,
      ``,
      `👤 ${t("ಹೆಸರು", "Name")}: ${name}`,
      `📞 ${t("ಫೋನ್", "Phone")}: ${phone}`,
      `📍 ${t("ವಿಳಾಸ", "Address")}: ${address}`,
      ``,
      `🍽️ ${t("ಊಟ", "Meal")}: ${info.kn} (${info.en})`,
      `📅 ${t("ದಿನ", "Day")}: ${DAYS_KN[dayIdx]} (${DAYS[dayIdx]}) — ${dayChoice === "today" ? t("ಇಂದು", "Today") : t("ನಾಳೆ", "Tomorrow")}`,
      `⏰ ${t("ಡೆಲಿವರಿ", "Delivery")}: ${deliveryTime === "morning" ? t("ಬೆಳಗ್ಗೆ (7:30-10 AM)", "Morning (7:30-10 AM)") : deliveryTime === "afternoon" ? t("ಮಧ್ಯಾಹ್ನ (12-2:30 PM)", "Afternoon (12-2:30 PM)") : t("ಸಂಜೆ (7-9:30 PM)", "Evening (7-9:30 PM)")}`,
      ``,
      `📋 Items:`,
      ...currentMealItems.map((i) => `  • ${i.kn} (${i.en})${i.qty ? ` ×${i.qty}` : ""}`),
      instructions.trim() ? `\n📝 ${t("ಸೂಚನೆ", "Note")}: ${instructions}` : "",
    ].join("\n");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      window.open(whatsappOrder(buildWhatsAppMessage()), "_blank");
      setSubmitted(true);
      setSubmitting(false);
    }, 800);
  }

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-5 relative">
        <Confetti trigger={submitted} />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={springBouncy}
        >
          <Card className="max-w-md w-full p-8 text-center border-0 shadow-lg">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, ...springBouncy }}
              className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-5"
            >
              <svg className="text-forest" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                />
              </svg>
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-semibold text-brown mb-2"
            >
              {t("ಆರ್ಡರ್ ಕಳಿಸಲಾಗಿದೆ! ✅", "Order Sent! ✅")}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-brown-light/60 mb-1">{t("WhatsApp ಮೂಲಕ ಆರ್ಡರ್ ಕಳಿಸಲಾಗಿದೆ!", "Order sent via WhatsApp!")}</p>
              <p className="text-sm text-brown-light/40 mb-6">{t("ನಾವು ಶೀಘ್ರದಲ್ಲೇ ದೃಢೀಕರಿಸುತ್ತೇವೆ.", "We'll confirm your order shortly on WhatsApp.")}</p>
              <motion.div animate={{ rotate: [0, -10, 10, -10, 10, 0] }} transition={{ delay: 0.7, duration: 0.6 }}>
                <WhatsAppIcon size={36} className="text-[#25D366] mx-auto block mb-6" />
              </motion.div>
              <div className="space-y-3">
                <Link href="/" className="block bg-maroon text-white rounded-full py-3 font-medium hover:bg-maroon-light transition-colors">
                  {t("← ಮನೆಗೆ ಹೋಗಿ", "← Go Home")}
                </Link>
                <button onClick={() => setSubmitted(false)} className="block w-full text-sm text-brown-light/50 hover:text-maroon transition-colors py-2">
                  {t("ಮತ್ತೊಂದು ಆರ್ಡರ್", "Place another order")}
                </button>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    );
  }

  const formSections = [
    { step: "1", label: t("ನಿಮ್ಮ ವಿವರ", "Your Details") },
    { step: "2", label: t("ಊಟ ಆಯ್ಕೆ", "Meal Selection") },
    { step: "3", label: t("ಆರ್ಡರ್ ಸಾರಾಂಶ", "Order Summary") },
  ];

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8">
      <MotionReveal type="fade-up">
        <Link href="/menu" className="inline-flex items-center gap-1 text-sm text-brown-light/50 hover:text-maroon transition-colors mb-4">
          <ArrowLeft size={14} /> {t("ಮೆನು ಗೆ ಹೋಗಿ", "Back to Menu")}
        </Link>
        <h1 className="text-[clamp(1.75rem,5vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-brown">
          {t(<>ಆರ್ಡರ್ <span className="text-saffron">ಮಾಡಿ</span></>, <>Place <span className="text-saffron">Order</span></>)}
        </h1>
        <p className="text-sm text-brown-light/50 mt-2 mb-8">
          {t("ನಿಮ್ಮ ವಿವರ ಭರ್ತಿ ಮಾಡಿ, WhatsApp ಗೆ ಆರ್ಡರ್ ಕಳಿಸುತ್ತೇವೆ", "Fill in your details — we'll send the order to WhatsApp")}
        </p>
      </MotionReveal>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Step 1 — Personal details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
          <Card className="p-5 sm:p-6 border-0 shadow-sm">
            <h3 className="font-semibold text-brown mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-maroon text-white text-[11px] font-semibold flex items-center justify-center">1</span>
              {t("ನಿಮ್ಮ ವಿವರ", "Your Details")}
            </h3>
            <div className="space-y-4">
              {[
                { label: t("ಹೆಸರು", "Name"), value: name, set: setName, placeholder: t("ನಿಮ್ಮ ಹೆಸರು", "Your name"), type: "text" },
                { label: t("ಫೋನ್", "Phone"), value: phone, set: setPhone, placeholder: "+91 XXXXX XXXXX", type: "tel" },
              ].map(({ label, value, set, placeholder, type }, i) => (
                <motion.div key={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08 }}>
                  <label className="block text-sm font-medium text-brown mb-1.5">{label} <span className="text-maroon">*</span></label>
                  <motion.input type={type} required value={value} onChange={(e) => set(e.target.value)} placeholder={placeholder}
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-4 py-2.5 rounded-xl bg-cream border border-cream-dark focus:border-saffron focus:ring-1 focus:ring-saffron/30 outline-none transition-all duration-200 text-sm" />
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.31 }}>
                <label className="block text-sm font-medium text-brown mb-1.5">{t("ವಿಳಾಸ", "Address")} <span className="text-maroon">*</span></label>
                <motion.textarea required value={address} onChange={(e) => setAddress(e.target.value)}
                  whileFocus={{ scale: 1.02 }}
                  placeholder={t("ಡೆಲಿವರಿ ವಿಳಾಸ — ಶಿರಸಿ ನಗರ ವ್ಯಾಪ್ತಿ ಮಾತ್ರ", "Delivery address — Sirsi city limits only")}
                  rows={2} className="w-full px-4 py-2.5 rounded-xl bg-cream border border-cream-dark focus:border-saffron focus:ring-1 focus:ring-saffron/30 outline-none transition-all duration-200 text-sm resize-none" />
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Step 2 — Meal selection */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <Card className="p-5 sm:p-6 border-0 shadow-sm">
            <h3 className="font-semibold text-brown mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-maroon text-white text-[11px] font-semibold flex items-center justify-center">2</span>
              {t("ಊಟ ಆಯ್ಕೆ", "Meal Selection")}
            </h3>
            <div className="space-y-4">
              {/* Day */}
              <div>
                <label className="block text-sm font-medium text-brown mb-2">{t("ದಿನ", "Day")}</label>
                <div className="flex gap-2">
                  {(["today", "tomorrow"] as const).map((d) => (
                    <motion.button key={d} type="button" whileTap={{ scale: 0.95 }} onClick={() => setDayChoice(d)}
                      className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${dayChoice === d ? "bg-saffron text-white shadow-md" : "bg-cream text-brown border border-cream-dark hover:border-saffron/30"}`}>
                      {d === "today" ? t(`ಇಂದು (${DAYS[todayIdx]})`, `Today (${DAYS[todayIdx]})`) : t(`ನಾಳೆ (${DAYS[(todayIdx + 1) % 7]})`, `Tomorrow (${DAYS[(todayIdx + 1) % 7]})`)}
                    </motion.button>
                  ))}
                </div>
              </div>
              {/* Meal type */}
              <div>
                <label className="block text-sm font-medium text-brown mb-2">{t("ಊಟ", "Meal")}</label>
                <div className="flex gap-2">
                  {(["breakfast", "lunch", "dinner"] as MealType[]).map((m) => {
                    const mi = MEAL_LABELS[m];
                    return (
                      <motion.button key={m} type="button" whileTap={{ scale: 0.95 }} onClick={() => setMealType(m)}
                        className={`flex-1 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${mealType === m ? "bg-maroon text-white shadow-md" : "bg-cream text-brown border border-cream-dark hover:border-maroon/20"}`}>
                        {mi.icon} {t(mi.kn, mi.en)}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
              {/* Delivery time */}
              <div>
                <label className="block text-sm font-medium text-brown mb-2">{t("ಡೆಲಿವರಿ ಸಮಯ", "Delivery Time")}</label>
                <div className="flex gap-2">
                  {([
                    { v: "morning", label: t("🌅 ಬೆಳಗ್ಗೆ", "🌅 Morning"), sub: "7:30-10 AM" },
                    { v: "afternoon", label: t("☀️ ಮಧ್ಯಾಹ್ನ", "☀️ Afternoon"), sub: "12-2:30 PM" },
                    { v: "evening", label: t("🌙 ಸಂಜೆ", "🌙 Evening"), sub: "7-9:30 PM" },
                  ] as const).map((ti) => (
                    <motion.button key={ti.v} type="button" whileTap={{ scale: 0.95 }} onClick={() => setDeliveryTime(ti.v)}
                      className={`flex-1 px-2 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 ${deliveryTime === ti.v ? "bg-forest text-white shadow-md" : "bg-cream text-brown border border-cream-dark hover:border-forest/20"}`}>
                      <span className="block">{ti.label}</span>
                      <span className="block text-[10px] opacity-70 mt-0.5">{ti.sub}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
              {/* Instructions */}
              <div>
                <label className="block text-sm font-medium text-brown mb-1.5">{t("ವಿಶೇಷ ಸೂಚನೆ", "Special Instructions")}</label>
                <motion.textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder={t("ಯಾವುದಾದರೂ ವಿಶೇಷ ಸೂಚನೆ... (ಐಚ್ಛಿಕ)", "Any special instructions... (optional)")} rows={2}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream border border-cream-dark focus:border-saffron focus:ring-1 focus:ring-saffron/30 outline-none transition-all duration-200 text-sm resize-none" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Step 3 — Order summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
          <Card className="p-5 sm:p-6 border-0 shadow-sm">
            <h3 className="font-semibold text-brown mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-maroon text-white text-[11px] font-semibold flex items-center justify-center">3</span>
              {t("ಆರ್ಡರ್ ಸಾರಾಂಶ", "Order Summary")}
            </h3>

            <div className="bg-cream rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-brown">{t(`${DAYS_KN[dayIdx]} ${info.kn}`, `${DAYS[dayIdx]} ${info.en}`)}</span>
                <Badge className="bg-saffron/10 text-saffron-dark border-0 text-xs">{info.time}</Badge>
              </div>
              <div className="space-y-1.5">
                {currentMealItems.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05, ...springSnappy }}
                    className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0" />
                    <span className="text-brown">{t(item.kn, item.en)}</span>
                    {item.qty && <span className="text-xs text-saffron-dark">×{item.qty}</span>}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-cream/50 rounded-lg p-3 text-xs text-brown-light/50 mb-4">
              💰 {t("ಪಾವತಿ: ಡೆಲಿವರಿ ಸಮಯದಲ್ಲಿ ನಗದು / UPI", "Payment: Cash on Delivery / UPI at door")}
            </div>

            {/* The hero button — morph */}
            <div className="relative w-full flex justify-center">
              <MorphButton
                type="submit"
                disabled={!name || !phone || !address || submitting}
                isSubmitted={submitted}
                isSubmitting={submitting}
                successText={t("ಆರ್ಡರ್ ಕಳಿಸಲಾಗಿದೆ!", "Order Sent!")}
                className="group relative w-full bg-forest hover:bg-forest-light disabled:bg-brown-light/20 disabled:cursor-not-allowed text-white font-semibold rounded-full py-3.5 flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-forest/20 overflow-hidden"
              >
                <WhatsAppIcon size={20} />
                {t("WhatsApp ನಲ್ಲಿ ಆರ್ಡರ್ ಕಳಿಸಿ", "Send Order via WhatsApp")}
              </MorphButton>
            </div>

            <p className="text-center text-xs text-brown-light/40 mt-3">
              {t("WhatsApp ತೆರೆಯುತ್ತದೆ — ಆರ್ಡರ್ ಪೂರ್ವ-ತುಂಬಿದ ಸಂದೇಶದೊಂದಿಗೆ", "Opens WhatsApp with your order pre-filled")}
            </p>
          </Card>
        </motion.div>
      </form>
    </div>
  );
}

// Re-export to access inside Suspense
function MotionReveal({ children, type = "fade-up", delay = 0, className = "" }: {
  children: React.ReactNode; type?: string; delay?: number; className?: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }} className={className}>
      {children}
    </motion.div>
  );
}

export default function OrderPage() {
  const { t } = useLang();
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <PageTransition>
        <main className="pt-20 pb-24 md:pb-10 min-h-screen">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <motion.div
                className="w-10 h-10 border-3 border-saffron/30 border-t-saffron rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
            </div>
          }>
            <OrderForm />
          </Suspense>
        </main>
      </PageTransition>
      <BottomNav />
    </>
  );
}
