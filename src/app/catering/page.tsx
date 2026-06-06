"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar, BottomNav } from "@/components/navbar";
import { WhatsAppIcon } from "@/components/icons";
import { useLang } from "@/lib/language-context";
import { whatsappOrder } from "@/lib/menu-data";
import { motion, FlipNumber, MorphButton, MagneticWrapper } from "@/components/motion";

const EVENT_TYPES = [
  { value: "wedding", kn: "ಮದುವೆ", en: "Wedding", icon: "💍" },
  { value: "puja", kn: "ಪೂಜೆ / ಶ್ರಾದ್ಧ", en: "Puja / Ceremony", icon: "🪔" },
  { value: "office", kn: "ಆಫೀಸ್ ಈವೆಂಟ್", en: "Office Event", icon: "💼" },
  { value: "birthday", kn: "ಹುಟ್ಟುಹಬ್ಬ", en: "Birthday", icon: "🎂" },
  { value: "other", kn: "ಇತರೆ", en: "Other", icon: "🎉" },
];

const MEAL_PREFS = [
  { value: "havyaka", kn: "ಹವ್ಯಕ ಸಾಂಪ್ರದಾಯಿಕ", en: "Havyaka Traditional" },
  { value: "north_indian", kn: "ಉತ್ತರ ಭಾರತೀಯ", en: "North Indian" },
  { value: "both", kn: "ಎರಡೂ / ಮಿಶ್ರ", en: "Both / Mixed" },
];

export default function CateringPage() {
  const [eventType, setEventType] = useState("");
  const [guests, setGuests] = useState(20);
  const [date, setDate] = useState("");
  const [mealPref, setMealPref] = useState("havyaka");
  const { t } = useLang();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const eventLabel = EVENT_TYPES.find((t) => t.value === eventType);
    const msg = [
      `ನಮಸ್ಕಾರ 🙏 — Catering Enquiry`,
      ``,
      `👤 Name: ${name}`,
      `📞 Phone: ${phone}`,
      ``,
      `🎉 Event: ${eventLabel?.kn} (${eventLabel?.en})`,
      `👥 Guests: ${guests}`,
      `📅 Date: ${date}`,
      `🍽️ Meal preference: ${MEAL_PREFS.find((m) => m.value === mealPref)?.en}`,
      notes ? `\n📝 Notes: ${notes}` : "",
    ].join("\n");
    setTimeout(() => {
      window.open(whatsappOrder(msg), "_blank");
      setSubmitted(true);
      setSubmitting(false);
    }, 800);
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="pt-20 pb-24 md:pb-10 min-h-screen flex items-center justify-center px-5">
          <Card className="max-w-md w-full p-8 text-center border-0 shadow-lg">
            <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={32} className="text-forest" />
            </div>
            <h2 className="text-2xl font-semibold text-brown mb-2">{t("ವಿಚಾರಣೆ ಕಳಿಸಲಾಗಿದೆ! ✅", "Enquiry Sent! ✅")}</h2>
            <p className="text-brown-light/60 mb-1">{t("WhatsApp ಮೂಲಕ ವಿಚಾರಣೆ ಕಳಿಸಲಾಗಿದೆ!", "Enquiry sent via WhatsApp!")}</p>
            <p className="text-sm text-brown-light/40 mb-6">
              {t("24 ಗಂಟೆಯೊಳಗೆ ನಾವು ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.", "We'll get back to you with a quote within 24 hours.")}
            </p>
            <MagneticWrapper className="w-full">
              <Link
                href="/"
                className="block bg-maroon text-white rounded-full py-3 font-medium hover:bg-maroon-light transition-colors w-full"
              >
                {t("← ಮನೆಗೆ ಹೋಗಿ", "← Go Home")}
              </Link>
            </MagneticWrapper>
          </Card>
        </main>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-24 md:pb-10 min-h-screen">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          {/* Header */}
          <div className="mb-8">
            <MagneticWrapper>
              <Link href="/" className="inline-flex items-center gap-1 text-sm text-brown-light/50 hover:text-maroon transition-colors mb-4 px-2 py-1">
                <ArrowLeft size={14} /> {t("ಮನೆಗೆ ಹೋಗಿ", "Back to Home")}
              </Link>
            </MagneticWrapper>
            <h1 className="text-[clamp(1.75rem,5vw,3rem)] font-medium leading-[1.3] tracking-[-0.03em] text-brown">
              {t(<>ಕೇಟರಿಂಗ್ <span className="text-saffron">ವಿಚಾರಣೆ</span></>, <>Catering <span className="text-saffron">Enquiry</span></>)}
            </h1>
            <p className="text-sm text-brown-light/50 mt-2">
              {t("5 ರಿಂದ 50 ಅತಿಥಿಗಳಿಗೆ, ಯಾವುದೇ ಸಮಾರಂಭಕ್ಕೆ", "5 to 50 guests, for any occasion")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event type */}
            <Card className="p-5 sm:p-6 border-0 shadow-sm">
              <h3 className="font-semibold text-brown mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-maroon text-white text-[11px] font-semibold flex items-center justify-center">1</span>
                {t("ಸಮಾರಂಭ", "Event Type")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {EVENT_TYPES.map((ev) => (
                  <button
                    key={ev.value}
                    type="button"
                    onClick={() => setEventType(ev.value)}
                    className={`p-4 rounded-xl text-center transition-all duration-300 ${
                      eventType === ev.value
                        ? "bg-saffron/10 ring-2 ring-saffron shadow-md"
                        : "bg-cream hover:bg-cream-dark border border-cream-dark"
                    }`}
                  >
                    <span className="text-2xl block mb-1">{ev.icon}</span>
                    <span className="text-sm font-medium text-brown block">{t(ev.kn, ev.en)}</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Guest count + Date */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
            <Card className="p-5 sm:p-6 border-0 shadow-sm">
              <h3 className="font-semibold text-brown mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-maroon text-white text-[11px] font-semibold flex items-center justify-center">2</span>
                {t("ವಿವರಗಳು", "Details")}
              </h3>
              <div className="space-y-5">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <label className="block text-sm font-medium text-brown mb-3 flex items-center gap-2">
                    {t("ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ", "Number of Guests")}: <span className="text-saffron font-bold text-lg"><FlipNumber value={guests} /></span>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    step={1}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full h-2 bg-cream-dark rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-saffron [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <div className="flex justify-between text-[10px] text-brown-light/40 mt-1">
                    <span>{t("5 ಅತಿಥಿ", "5 guests")}</span>
                    <span>{t("50 ಅತಿಥಿ", "50 guests")}</span>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.23 }}>
                  <label className="block text-sm font-medium text-brown mb-1.5">
                    {t("ದಿನಾಂಕ", "Event Date")} <span className="text-maroon">*</span>
                  </label>
                  <motion.input
                    type="date"
                    required
                    value={date}
                    whileFocus={{ scale: 1.02 }}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-cream border border-cream-dark focus:border-saffron focus:ring-1 focus:ring-saffron/30 outline-none transition-all duration-200 text-sm"
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.31 }}>
                  <label className="block text-sm font-medium text-brown mb-2">
                    {t("ಊಟದ ಆಯ್ಕೆ", "Meal Preference")}
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {MEAL_PREFS.map((m) => (
                      <button
                        key={m.value}
                        type="button"
                        onClick={() => setMealPref(m.value)}
                        className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                          mealPref === m.value
                            ? "bg-maroon text-white shadow-md"
                            : "bg-cream text-brown border border-cream-dark hover:border-maroon/20"
                        }`}
                      >
                        {t(m.kn, m.en)}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </Card>
            </motion.div>

            {/* Contact */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <Card className="p-5 sm:p-6 border-0 shadow-sm">
              <h3 className="font-semibold text-brown mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-maroon text-white text-[11px] font-semibold flex items-center justify-center">3</span>
                {t("ಸಂಪರ್ಕ", "Contact Details")}
              </h3>
              <div className="space-y-4">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <label className="block text-sm font-medium text-brown mb-1.5">
                    {t("ಹೆಸರು", "Name")} <span className="text-maroon">*</span>
                  </label>
                  <motion.input
                    type="text"
                    required
                    value={name}
                    whileFocus={{ scale: 1.02 }}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("ನಿಮ್ಮ ಹೆಸರು", "Your name")}
                    className="w-full px-4 py-2.5 rounded-xl bg-cream border border-cream-dark focus:border-saffron focus:ring-1 focus:ring-saffron/30 outline-none transition-all duration-200 text-sm"
                  />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.23 }}>
                  <label className="block text-sm font-medium text-brown mb-1.5">
                    {t("ಫೋನ್", "Phone")} <span className="text-maroon">*</span>
                  </label>
                  <motion.input
                    type="tel"
                    required
                    value={phone}
                    whileFocus={{ scale: 1.02 }}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-2.5 rounded-xl bg-cream border border-cream-dark focus:border-saffron focus:ring-1 focus:ring-saffron/30 outline-none transition-all duration-200 text-sm"
                  />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.31 }}>
                  <label className="block text-sm font-medium text-brown mb-1.5">
                    {t("ಹೆಚ್ಚಿನ ಮಾಹಿತಿ", "Additional Notes")}
                  </label>
                  <motion.textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    whileFocus={{ scale: 1.02 }}
                    placeholder={t("ಯಾವುದಾದರೂ ವಿಶೇಷ ಅಗತ್ಯಗಳು...", "Any special requirements...")}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl bg-cream border border-cream-dark focus:border-saffron focus:ring-1 focus:ring-saffron/30 outline-none transition-all duration-200 text-sm resize-none"
                  />
                </motion.div>
              </div>
            </Card>
            </motion.div>

            {/* Submit */}
            <div className="relative w-full flex justify-center mt-4">
              <MagneticWrapper className="w-full">
                <MorphButton
                  type="submit"
                  disabled={!eventType || !date || !name || !phone || submitting}
                  isSubmitted={submitted}
                  isSubmitting={submitting}
                  successText={t("ವಿಚಾರಣೆ ಕಳಿಸಲಾಗಿದೆ!", "Enquiry Sent!")}
                  className="group relative w-full bg-forest hover:bg-forest-light disabled:bg-brown-light/20 disabled:cursor-not-allowed text-white font-semibold rounded-full py-3.5 flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-forest/20 overflow-hidden"
                >
                  <WhatsAppIcon size={20} />
                  <div className="text-roll-container relative overflow-hidden h-[20px]">
                    <div className="text-roll-inner group-hover:-translate-y-[20px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <span className="h-[20px] flex items-center">{t("WhatsApp ನಲ್ಲಿ ವಿಚಾರಣೆ ಕಳಿಸಿ", "Send Enquiry via WhatsApp")}</span>
                      <span className="h-[20px] flex items-center text-cream">{t("Send Enquiry via WhatsApp", "WhatsApp ನಲ್ಲಿ ವಿಚಾರಣೆ ಕಳಿಸಿ")}</span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="transition-transform duration-500 group-hover:-rotate-45" />
                </MorphButton>
              </MagneticWrapper>
            </div>
          </form>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
