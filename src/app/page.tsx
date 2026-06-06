"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar, BottomNav, FloatingWhatsApp } from "@/components/navbar";
import { WhatsAppIcon } from "@/components/icons";
import {
  MotionReveal, MotionStagger, MotionItem, MotionLetters, MotionCard,
  MotionCounter, ScrollProgress, PageTransition, motion,
  ParallaxSection, ShimmerImage, TiltCard, FloatingParticles, MagneticWrapper,
  SteamEffect, InfiniteMarquee, GlowCard, TextReveal, WaveDivider,
  StaggeredEntrance, StaggeredItem,
} from "@/components/motion";
import { useLang } from "@/lib/language-context";
import { springBouncy, pathDrawVariant, fadeLeft } from "@/lib/animations";
import {
  MENU, MEAL_LABELS, DAYS, DAYS_KN, getTodayIndex,
  whatsappOrder, type MealType,
} from "@/lib/menu-data";

const MEAL_IMAGES: Record<MealType, string> = {
  breakfast: "/images/breakfast.png",
  lunch: "/images/lunch.png",
  dinner: "/images/dinner.png",
};

function SectionBadge({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 sm:mb-8">
      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-maroon text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">
        {num}
      </span>
      <span className="text-[12px] sm:text-[13px] font-medium border border-maroon/20 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-maroon">
        {label}
      </span>
    </div>
  );
}

function HeroSection() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden pt-20 sm:pt-24 pb-10 sm:pb-0">
      <div className="absolute inset-0 bg-gradient-to-b from-cream/0 via-[#FFF5E8]/60 to-cream/0" />
      <FloatingParticles count={15} />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 4C12 8 6 16 4 28c0 0 8-4 16-4s16 4 16 4C34 16 28 8 20 4z' fill='%237B1C1C'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-20 max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 min-h-[calc(100vh-6rem)]">
          {/* Left: Text */}
          <div className="flex-1 pb-8 sm:pb-12 lg:pb-20 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6 sm:mb-8"
            >
              <Image src="/images/logo1.png" alt="Havi Ruchi" width={44} height={44} className="w-10 h-10 sm:w-11 sm:h-11 rounded-full shadow-md" />
              <span className="text-[13px] sm:text-[14px] text-maroon tracking-wide font-medium">
                {t("ಹವಿ ರುಚಿ ಕಿಚನ್ · ಶಿರಸಿ", "Havi Ruchi Kitchen · Sirsi, Karnataka")}
              </span>
            </motion.div>

            <h1 className="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.3] tracking-[-0.03em] text-brown mb-0">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-shimmer inline-block"
              >
                {t("ಅಪ್ಪಟ ಹವ್ಯಕರ", "Authentic Havyaka")}
              </motion.span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {t("ಅಡುಗೆಮನೆ, ನಿಮ್ಮ", "home kitchen, delivered")}
              </motion.span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                {t(<><span className="text-saffron">ಬಾಗಿಲಿಗೆ</span> ತಲುಪಿಸುತ್ತೇವೆ.</>, <>to your <span className="text-saffron">doorstep</span>.</>)}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="text-sm sm:text-base text-brown-light/60 mt-4 max-w-xl"
            >
              {t(
                "ಸಾಂಪ್ರದಾಯಿಕ ಹವ್ಯಕ ಮನೆ ಅಡುಗೆ, ಶಿರಸಿ ನಗರ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಡೆಲಿವರಿ",
                "Traditional Havyaka home-cooked food, delivered within Sirsi city limits"
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, ...springBouncy }}
              className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5"
            >
              <MagneticWrapper>
                <Link
                  href="/order"
                  className="group bg-saffron hover:bg-saffron-dark text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 inline-flex items-center gap-3 transition-all duration-300 shadow-lg shadow-saffron/20 hover:shadow-xl hover:shadow-saffron/30"
                >
                  <div className="text-roll-container">
                    <div className="text-roll-inner">
                      <span className="h-[20px] flex items-center">{t("ಆರ್ಡರ್ ಮಾಡಿ", "Order Now")}</span>
                      <span className="h-[20px] flex items-center">{t("Order Now", "Place Order")}</span>
                    </div>
                  </div>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45">
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </MagneticWrapper>
              <MagneticWrapper>
                <Link
                href="/menu"
                className="text-[13px] sm:text-[14px] font-medium text-brown bg-white rounded-full px-6 py-2.5 inline-flex items-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-300"
              >
                📋 {t("ಮೆನು ನೋಡಿ", "View Menu")}
                  <Badge variant="secondary" className="text-[10px] bg-maroon text-white px-1.5 py-0.5 rounded">
                    {t("ವಾರದ", "Weekly")}
                  </Badge>
                </Link>
              </MagneticWrapper>
            </motion.div>
          </div>

          {/* Right: Thali image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:flex-1 flex items-center justify-center pb-24 sm:pb-16 lg:pb-0"
          >
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#FFFAF3] to-[#FFF0DD] p-4 sm:p-6 shadow-xl relative">
                <SteamEffect className="-top-4 left-0 right-0 h-24 z-10" />
                <ShimmerImage
                  src="/images/thali.png"
                  alt={t("ಬಾಳೆ ಎಲೆ ಊಟ", "Banana Leaf Thali")}
                  width={800}
                  height={600}
                  imageClassName="w-full h-auto object-contain rounded-2xl"
                  priority
                />
              </div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-3 bg-maroon text-white rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shadow-lg badge-glow"
              >
                <div className="text-center">
                  <p className="text-[10px] sm:text-xs font-bold leading-tight">100%</p>
                  <p className="text-[8px] sm:text-[10px] leading-tight">{t("ಶುದ್ಧ", "Pure")}</p>
                  <p className="text-[8px] sm:text-[10px] leading-tight">{t("ಸಸ್ಯಾಹಾರ", "Veg")}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MarqueeBanner() {
  const { t } = useLang();
  const items = [
    { kn: "🍃 ಶುದ್ಧ ಸಸ್ಯಾಹಾರ", en: "🍃 100% Vegetarian" },
    { kn: "🏠 ಮನೆ ಅಡುಗೆ ರುಚಿ", en: "🏠 Home-cooked Taste" },
    { kn: "🚚 ಬಾಗಿಲಿಗೆ ಡೆಲಿವರಿ", en: "🚚 Door Delivery" },
    { kn: "📅 ವಾರದ ಮೆನು", en: "📅 Weekly Menu" },
    { kn: "🪔 ಸಾಂಪ್ರದಾಯಿಕ ಹವ್ಯಕ", en: "🪔 Traditional Havyaka" },
    { kn: "⏰ ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ", en: "⏰ Always On Time" },
    { kn: "💛 ಪ್ರೀತಿಯಿಂದ ಮಾಡಿದ", en: "💛 Made With Love" },
    { kn: "📍 ಶಿರಸಿ ನಗರ", en: "📍 Sirsi City" },
  ];

  return (
    <section className="bg-maroon py-4 overflow-hidden">
      <InfiniteMarquee speed={25}>
        <div className="flex items-center gap-8 px-4">
          {items.map((item, i) => (
            <span key={i} className="text-cream/80 text-sm sm:text-base font-medium whitespace-nowrap flex items-center gap-2">
              {t(item.kn, item.en)}
              <span className="text-saffron/60">·</span>
            </span>
          ))}
        </div>
      </InfiniteMarquee>
    </section>
  );
}

function FoodImageStrip() {
  const { t } = useLang();
  const meals: { type: MealType; img: string }[] = [
    { type: "breakfast", img: MEAL_IMAGES.breakfast },
    { type: "lunch", img: MEAL_IMAGES.lunch },
    { type: "dinner", img: MEAL_IMAGES.dinner },
  ];

  return (
    <section className="bg-white/60 py-10 sm:py-14 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <MotionStagger stagger={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {meals.map(({ type, img }) => {
            const info = MEAL_LABELS[type];
            return (
              <MotionItem key={type}>
                <GlowCard className="rounded-2xl">
                  <MotionCard className="group text-center cursor-pointer">
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#FFFAF3] to-[#FFF5E8] p-4 sm:p-6">
                      <ShimmerImage
                        src={img}
                        alt={info.en}
                        width={600}
                        height={400}
                        imageClassName="w-full h-auto object-contain mix-blend-multiply group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-brown">{t(info.kn, info.en)}</h3>
                    <p className="text-sm text-brown-light/50">{info.time}</p>
                  </MotionCard>
                </GlowCard>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}

function TodayMenuStrip() {
  const { lang, t } = useLang();
  const today = getTodayIndex();
  const meals: MealType[] = ["breakfast", "lunch", "dinner"];

  return (
    <section className="bg-cream/60 pt-12 sm:pt-16 lg:pt-24 pb-10 sm:pb-14">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <MotionReveal type="fade-right">
          <SectionBadge num="1" label={t("ಇಂದಿನ ಮೆನು", "Today's Menu")} />
        </MotionReveal>

        <TextReveal delay={0.1}>
          <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-medium leading-[1.3] tracking-[-0.02em] text-brown mb-3">
            {lang === "kn" ? (
              <>{DAYS_KN[today]}, <span className="text-saffron">{DAYS[today]}</span></>
            ) : (
              <><span className="text-saffron">{DAYS[today]}</span>&apos;s Menu</>
            )}
          </h2>
          <p className="text-sm text-brown-light/50 mb-8 sm:mb-12">
            {t("ಪ್ರತಿ ದಿನ ತಾಜಾ ಮೆನು", "Fresh menu auto-updated every day")}
          </p>
        </TextReveal>

        <MotionStagger stagger={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {meals.map((meal) => {
            const info = MEAL_LABELS[meal];
            const items = MENU[meal][today];
            return (
              <motion.div key={meal} variants={fadeLeft} whileTap={{ scale: [1, 1.05, 1], transition: { duration: 0.2 } }} className="will-change-transform">
                <GlowCard className="rounded-2xl">
                <MotionCard>
                  <Card className="group overflow-hidden border-0 shadow-md">
                    <div className="relative h-44 sm:h-52 overflow-hidden bg-gradient-to-b from-[#FFFAF3] to-[#FFF5E8]">
                      <ShimmerImage
                        src={MEAL_IMAGES[meal]}
                        alt={info.en}
                        fill
                        imageClassName="object-contain mix-blend-multiply p-3 group-hover:scale-105 transition-transform duration-700"
                      />
                      <Badge className="absolute top-3 right-3 bg-maroon/90 text-white border-0 text-[11px]">
                        {t(info.kn, info.en)}
                      </Badge>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-brown text-lg mb-1">
                        {t(info.kn, info.en)}
                        <span className="text-brown-light/40 font-normal text-sm ml-2">{info.time}</span>
                      </h3>
                      <div className="mt-3 space-y-2">
                        {items.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                            <span className="text-brown">{t(item.kn, item.en)}</span>
                            {item.qty && (
                              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-cream-dark">x{item.qty}</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                      <a
                        href={whatsappOrder(
                          `ನಮಸ್ಕಾರ 🙏\n${DAYS[today]} ${info.en} order:\n${items.map((i) => `• ${i.en}${i.qty ? ` (${i.qty})` : ""}`).join("\n")}\n\nName:\nAddress:\nPhone:`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 w-full bg-forest hover:bg-forest-light text-white text-sm font-medium rounded-full py-2.5 flex items-center justify-center gap-2 transition-all duration-300"
                      >
                        <WhatsAppIcon size={16} />
                        {t(`${info.kn} ಆರ್ಡರ್ ಮಾಡಿ`, `Order ${info.en}`)}
                      </a>
                    </div>
                  </Card>
                </MotionCard>
                </GlowCard>
              </motion.div>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}

function HowItWorks() {
  const { t } = useLang();
  const steps = [
    { icon: "📋", kn: "ಮೆನು ನೋಡಿ", en: "Browse Menu", descKn: "ಇಂದಿನ ತಾಜಾ ಮೆನು ಪರಿಶೀಲಿಸಿ", descEn: "Check today's fresh menu", anim: "fade-right" as const },
    { icon: "📱", kn: "ಆರ್ಡರ್ ಕೊಡಿ", en: "Place Order", descKn: "WhatsApp ಅಥವಾ ವೆಬ್‌ಸೈಟ್ ಮೂಲಕ", descEn: "Order via WhatsApp or website", anim: "scale" as const },
    { icon: "🚚", kn: "ಡೆಲಿವರಿ", en: "Get Delivered", descKn: "ಬಿಸಿ ಬಿಸಿ ಊಟ ನಿಮ್ಮ ಮನೆ ಬಾಗಿಲಿಗೆ", descEn: "Hot food at your doorstep", anim: "fade-left" as const },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-28 px-5 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <MotionReveal type="fade-right">
          <SectionBadge num="2" label={t("ಹೇಗೆ ಆರ್ಡರ್ ಮಾಡುವುದು?", "How to Order")} />
        </MotionReveal>

        <TextReveal delay={0.1}>
          <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-medium leading-[1.3] tracking-[-0.02em] text-brown mb-12 sm:mb-16">
            {t("3 ಸುಲಭ ಹಂತಗಳು", "3 Easy Steps")} <span className="text-saffron">→</span>
          </h2>
        </TextReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((s, i) => (
            <MotionReveal key={i} type={s.anim} delay={i * 0.2}>
              <GlowCard className="rounded-2xl">
              <MotionCard className="relative group">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center mb-5"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <span className="text-2xl">{s.icon}</span>
                  </motion.div>
                  <div className="text-saffron text-xs font-bold mb-2">{t(`ಹಂತ ${i + 1}`, `STEP ${i + 1}`)}</div>
                  <h3 className="text-xl font-semibold text-brown mb-1">{t(s.kn, s.en)}</h3>
                  <p className="text-sm text-brown-light/50">{t(s.descKn, s.descEn)}</p>
                </div>
                {i < 2 && (
                  <div className="hidden sm:block absolute top-1/2 -right-8 w-16 h-8 -translate-y-1/2 z-10">
                    <motion.svg width="100%" height="100%" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <motion.path
                        d="M0 10L100 10"
                        stroke="#E8A020"
                        strokeWidth="2"
                        strokeDasharray="6 6"
                        variants={pathDrawVariant}
                      />
                      <motion.path
                        d="M90 5L100 10L90 15"
                        stroke="#E8A020"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={pathDrawVariant}
                      />
                    </motion.svg>
                  </div>
                )}
              </MotionCard>
              </GlowCard>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServeSection() {
  const { t } = useLang();
  const segments = [
    { icon: "👴", kn: "ಹಿರಿಯ ನಾಗರಿಕರು", en: "Senior Citizens", descKn: "ಅಡುಗೆ ಮಾಡುವ ಕಷ್ಟವಿಲ್ಲ, ಮನೆ ರುಚಿ", descEn: "No cooking hassle, home taste" },
    { icon: "👨‍🎓", kn: "ವಿದ್ಯಾರ್ಥಿಗಳು", en: "Students", descKn: "ಹಾಸ್ಟೆಲ್ ಊಟಕ್ಕಿಂತ ಉತ್ತಮ", descEn: "Better than hostel food" },
    { icon: "💼", kn: "ಉದ್ಯೋಗಿಗಳು", en: "Professionals", descKn: "ಬ್ಯುಸಿ ಶೆಡ್ಯೂಲ್, ಆರೋಗ್ಯಕರ ಊಟ", descEn: "Healthy meals, busy schedule" },
    { icon: "🏥", kn: "ಆಸ್ಪತ್ರೆ ಕೇರ್", en: "Hospital Care", descKn: "ಶುದ್ಧ ಸಾತ್ವಿಕ ಊಟ, ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ", descEn: "Pure satvik food, on time" },
  ];

  return (
    <section className="bg-white/60 py-16 sm:py-20 lg:py-24 px-5 sm:px-8 lg:px-12">
      <div className="max-w-[1440px] mx-auto text-center">
        <MotionReveal type="fade-right">
          <SectionBadge num="3" label={t("ಯಾರಿಗೆ ಸೇವೆ?", "Who We Serve")} />
        </MotionReveal>

        <TextReveal delay={0.1}>
          <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-medium leading-[1.3] tracking-[-0.02em] text-brown mb-10 sm:mb-14">
            {t(<>ನಾವು <span className="text-saffron">ಯಾರಿಗೆ</span> ಸೇವೆ ನೀಡುತ್ತೇವೆ</>, <>Who We <span className="text-saffron">Serve</span></>)}
          </h2>
        </TextReveal>

        <MotionStagger stagger={0.12} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {segments.map((s) => (
            <MotionItem key={s.en}>
              <GlowCard className="rounded-2xl h-full">
                <TiltCard>
                  <Card className="p-5 sm:p-6 border-0 shadow-sm group text-center h-full">
                    <motion.span
                      className="text-4xl sm:text-5xl block mb-3"
                      whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      {s.icon}
                    </motion.span>
                    <h3 className="font-semibold text-brown text-sm sm:text-base">{t(s.kn, s.en)}</h3>
                    <p className="text-xs sm:text-sm text-brown-light/60 mt-2">{t(s.descKn, s.descEn)}</p>
                  </Card>
                </TiltCard>
              </GlowCard>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}

function CateringBanner() {
  const { t } = useLang();
  return (
    <section className="py-16 sm:py-20 px-5 sm:px-8 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        <MotionReveal type="scale">
          <div className="bg-maroon rounded-2xl sm:rounded-3xl relative overflow-hidden">
            <FloatingParticles count={6} className="opacity-50" />
            <ParallaxSection speed={0.5} className="absolute inset-0 pointer-events-none">
              <div className="absolute right-0 bottom-0 w-[40%] opacity-10">
                <Image src="/images/thali.png" alt="" width={600} height={400} className="w-full h-auto mix-blend-lighten" />
              </div>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, #E8A020 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1A4A2E 0%, transparent 50%)" }} />
            </ParallaxSection>
            <div className="relative z-10 text-center p-8 sm:p-12 lg:p-16">
              <Badge className="bg-saffron/20 text-saffron border-0 mb-4 text-[13px]">{t("✨ ವಿಶೇಷ ಸೇವೆ", "✨ Special Service")}</Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-cream mb-4 leading-tight">
                {t(<>ಕೇಟರಿಂಗ್ <span className="text-saffron">ಸೇವೆ</span></>, <>Catering <span className="text-saffron">Service</span></>)}
              </h2>
              <p className="text-cream/60 mb-2 text-lg">{t("5 ರಿಂದ 50 ಜನರಿಗೆ", "For 5 to 50 guests")}</p>
              <p className="text-cream/40 mb-8 text-sm">{t("ಮದುವೆ, ಶ್ರಾದ್ಧ, ಹಬ್ಬ, ಪಾರ್ಟಿ — ಯಾವುದೇ ಸಮಾರಂಭಕ್ಕೆ", "Weddings, pujas, office events, parties — for any occasion")}</p>
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <MagneticWrapper>
                  <Link
                    href="/catering"
                    className="group bg-saffron hover:bg-saffron-light text-brown text-sm font-semibold rounded-full pl-6 pr-2 py-2.5 inline-flex items-center gap-3 transition-all duration-300"
                  >
                    <div className="text-roll-container">
                      <div className="text-roll-inner">
                        <span className="h-[20px] flex items-center">{t("ವಿಚಾರಿಸಿ", "Enquire Now")}</span>
                        <span className="h-[20px] flex items-center">{t("Enquire Now", "Get Quote")}</span>
                      </div>
                    </div>
                    <span className="w-7 h-7 bg-brown/10 rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45">
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                </MagneticWrapper>
              </motion.div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-brown text-cream/60 py-10 sm:py-14 px-5 sm:px-8 lg:px-12 pb-24 md:pb-14">
      <div className="max-w-[1440px] mx-auto">
        <MotionReveal type="fade-up">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Image src="/images/logo1.png" alt="" width={40} height={40} className="w-10 h-10 rounded-full" />
              <div>
                <span className="text-saffron font-bold text-lg block">{t("ಹವಿ ರುಚಿ ಕಿಚನ್", "Havi Ruchi Kitchen")}</span>
                <p className="text-sm text-cream/40">{t("ಅಪ್ಪಟ ಹವ್ಯಕ ಅಡುಗೆ", "Authentic Havyaka Cuisine")}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:+919980864037" className="flex items-center gap-2 text-sm hover:text-saffron transition-colors"><Phone size={14} /> +91 99808 64037</a>
              <a href="https://wa.me/919980864037" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-[#25D366] transition-colors"><WhatsAppIcon size={14} /> WhatsApp</a>
            </div>
          </div>
        </MotionReveal>
        <MotionReveal type="fade-up" delay={0.2}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-cream/10">
            <div className="flex items-center gap-2 text-sm"><MapPin size={14} className="text-saffron" /><span>{t("ಶಿರಸಿ ನಗರ ವ್ಯಾಪ್ತಿ ಮಾತ್ರ", "Sirsi city limits only")}</span></div>
            <span className="text-xs text-cream/30">{t("© 2026 ಹವಿ ರುಚಿ ಕಿಚನ್", "© 2026 Havi Ruchi Kitchen")}</span>
          </div>
        </MotionReveal>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <PageTransition>
        <main>
          <HeroSection />
          <MarqueeBanner />
          <FoodImageStrip />
          <WaveDivider color="#FFF8F0" />
          <TodayMenuStrip />
          <WaveDivider color="rgba(255,255,255,0.6)" flip />
          <HowItWorks />
          <WaveDivider color="rgba(255,255,255,0.6)" />
          <ServeSection />
          <CateringBanner />
        </main>
        <Footer />
      </PageTransition>
      <FloatingWhatsApp />
      <BottomNav />
    </>
  );
}
