"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Navbar, BottomNav } from "@/components/navbar";
import { useLang } from "@/lib/language-context";
import { MotionReveal, PageTransition, motion, MagneticWrapper } from "@/components/motion";
import { springBouncy } from "@/lib/animations";

export default function LoginPage() {
  const { t } = useLang();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");

  function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (phone.length >= 10) setStep("otp");
  }

  function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    // Prototype — just show alert
    alert(t("ಲಾಗಿನ್ ಯಶಸ್ವಿ! (Prototype)", "Login successful! (Prototype — Supabase auth coming soon)"));
  }

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="pt-20 pb-24 md:pb-10 min-h-screen flex items-center justify-center px-5">
          <div className="w-full max-w-sm">
            <MagneticWrapper>
              <Link href="/" className="inline-flex items-center gap-1 text-sm text-brown-light/50 hover:text-maroon transition-colors mb-6 px-2 py-1">
                <ArrowLeft size={14} /> {t("ಮನೆಗೆ ಹೋಗಿ", "Back to Home")}
              </Link>
            </MagneticWrapper>

            <MotionReveal type="scale">
              <Card className="p-8 border-0 shadow-lg text-center">
                <Image
                  src="/images/logo1.png"
                  alt="Havi Ruchi"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full mx-auto mb-5 shadow-md"
                />
                <h1 className="text-xl font-semibold text-brown mb-1">
                  {t("ಗ್ರಾಹಕ ಲಾಗಿನ್", "Customer Login")}
                </h1>
                <p className="text-sm text-brown-light/50 mb-6">
                  {t("ನಿಮ್ಮ ಫೋನ್ ನಂಬರ್ ಬಳಸಿ ಲಾಗಿನ್ ಮಾಡಿ", "Login with your phone number")}
                </p>

                {step === "phone" ? (
                  <motion.form
                    key="phone"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSendOtp}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-light/40" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t("+91 ನಿಮ್ಮ ನಂಬರ್", "+91 Your Number")}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-cream border border-cream-dark focus:border-saffron focus:ring-1 focus:ring-saffron/30 outline-none transition-all text-sm"
                        required
                      />
                    </div>
                    <MagneticWrapper className="w-full">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-maroon hover:bg-maroon-light text-white rounded-full py-3 font-medium transition-colors"
                      >
                        {t("OTP ಕಳಿಸಿ", "Send OTP")}
                      </motion.button>
                    </MagneticWrapper>
                  </motion.form>
                ) : (
                  <motion.form
                    key="otp"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleVerifyOtp}
                    className="space-y-4"
                  >
                    <p className="text-sm text-brown-light/60 mb-2">
                      {t(`OTP ${phone} ಗೆ ಕಳಿಸಲಾಗಿದೆ`, `OTP sent to ${phone}`)}
                    </p>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder={t("OTP ನಮೂದಿಸಿ", "Enter OTP")}
                      maxLength={6}
                      className="w-full px-4 py-3 rounded-xl bg-cream border border-cream-dark focus:border-saffron focus:ring-1 focus:ring-saffron/30 outline-none transition-all text-sm text-center tracking-[0.5em] text-lg"
                      required
                    />
                    <MagneticWrapper className="w-full">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-saffron hover:bg-saffron-dark text-white rounded-full py-3 font-medium transition-colors"
                      >
                        {t("ಲಾಗಿನ್ ಮಾಡಿ", "Verify & Login")}
                      </motion.button>
                    </MagneticWrapper>
                    <button
                      type="button"
                      onClick={() => setStep("phone")}
                      className="text-sm text-brown-light/50 hover:text-maroon transition-colors"
                    >
                      {t("ನಂಬರ್ ಬದಲಾಯಿಸಿ", "Change number")}
                    </button>
                  </motion.form>
                )}

                <p className="text-[11px] text-brown-light/30 mt-6">
                  {t("ಸುಪಾಬೇಸ್ OTP ಇಲ್ಲಿ ಸಂಪರ್ಕಿಸಲಾಗುತ್ತದೆ", "Supabase OTP auth will be connected here")}
                </p>
              </Card>
            </MotionReveal>
          </div>
        </main>
      </PageTransition>
      <BottomNav />
    </>
  );
}
