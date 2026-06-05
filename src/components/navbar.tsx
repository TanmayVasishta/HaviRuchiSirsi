"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, User } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/menu-data";
import { useLang, LangToggle } from "@/lib/language-context";
import { WhatsAppIcon } from "./icons";
import { BottomNavItem } from "./motion";

const NAV_LINKS_KN = [
  { href: "/", label: "ಮನೆ" },
  { href: "/menu", label: "ಮೆನು" },
  { href: "/order", label: "ಆರ್ಡರ್" },
  { href: "/catering", label: "ಕೇಟರಿಂಗ್" },
];

const NAV_LINKS_EN = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order" },
  { href: "/catering", label: "Catering" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, t } = useLang();
  const links = lang === "kn" ? NAV_LINKS_KN : NAV_LINKS_EN;

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 px-2 sm:px-3 pt-2 sm:pt-3">
        <div className="max-w-[1440px] mx-auto">
          <div className="bg-white/90 backdrop-blur-md rounded-full px-3 sm:px-5 py-2 shadow-lg shadow-maroon/5 flex items-center justify-between">
            {/* Logo — pops above navbar */}
            <Link href="/" className="flex items-center gap-2.5 -my-3 sm:-my-4">
              <div className="relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-md border-2 border-cream-dark overflow-hidden p-0.5">
                  <Image
                    src="/images/logo1.png"
                    alt="Havi Ruchi Kitchen"
                    width={64}
                    height={64}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-maroon font-bold text-sm leading-tight block">
                  {t("ಹವಿ ರುಚಿ", "Havi Ruchi")}
                </span>
                <span className="text-brown-light/60 text-[10px] tracking-widest uppercase">
                  Kitchen
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-brown hover:text-maroon transition-colors duration-300"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Desktop right side */}
            <div className="hidden md:flex items-center gap-3">
              <LangToggle />
              <Link
                href="/login"
                className="text-[13px] text-brown-light/60 flex items-center gap-1.5 hover:text-maroon transition-colors"
              >
                <User size={13} />
                {t("ಲಾಗಿನ್", "Login")}
              </Link>
              <a
                href="tel:+919980864037"
                className="text-[13px] text-brown-light/60 flex items-center gap-1.5 hover:text-maroon transition-colors"
              >
                <Phone size={13} />
                +91 99808 64037
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-maroon text-white text-[13px] font-medium rounded-full pl-5 pr-2 py-2 flex items-center gap-2 hover:bg-maroon-light transition-all duration-300"
              >
                <div className="text-roll-container">
                  <div className="text-roll-inner">
                    <span className="h-[20px] flex items-center">
                      {t("ಆರ್ಡರ್ ಮಾಡಿ", "Order Now")}
                    </span>
                    <span className="h-[20px] flex items-center">
                      {t("Order Now", "ಆರ್ಡರ್ ಮಾಡಿ")}
                    </span>
                  </div>
                </div>
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45">
                  <WhatsAppIcon size={14} />
                </span>
              </a>
            </div>

            {/* Mobile: lang toggle + hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <LangToggle />
              <button
                onClick={() => setOpen(!open)}
                className="bg-maroon text-white rounded-full w-9 h-9 flex items-center justify-center"
                aria-label="Toggle menu"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute bottom-0 inset-x-0 bg-white rounded-t-2xl mx-3 mb-3 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "fadeInUp 0.4s cubic-bezier(0.32, 0.72, 0, 1)" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Image src="/images/logo1.png" alt="" width={32} height={32} className="w-8 h-8 rounded-full" />
              <div className="text-[13px] text-brown-light/60 bg-cream-dark rounded-full px-3 py-1">
                {t("📍 ಶಿರಸಿ, ಕರ್ನಾಟಕ", "📍 Sirsi, Karnataka")}
              </div>
            </div>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-[28px] font-medium text-brown py-2 hover:text-maroon transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block text-[28px] font-medium text-brown py-2 hover:text-maroon transition-colors"
            >
              {t("ಲಾಗಿನ್", "Login")}
            </Link>
            <div className="mt-6 pt-4 border-t border-cream-dark">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 bg-forest text-white rounded-full py-3.5 font-medium text-base hover:bg-forest-light transition-colors"
              >
                <WhatsAppIcon size={20} />
                {t("WhatsApp ನಲ್ಲಿ ಆರ್ಡರ್ ಮಾಡಿ", "Order on WhatsApp")}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function BottomNav() {
  const { t } = useLang();
  const pathname = usePathname();
  
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-cream-dark shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {[
          { href: "/", icon: "🏠", label: t("ಮನೆ", "Home") },
          { href: "/menu", icon: "📋", label: t("ಮೆನು", "Menu") },
          { href: "/order", icon: "🛒", label: t("ಆರ್ಡರ್", "Order") },
          { href: "/catering", icon: "🎉", label: t("ಕೇಟರಿಂಗ್", "Catering") },
        ].map((item) => (
          <BottomNavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={pathname === item.href}
          />
        ))}
      </div>
    </div>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 right-4 z-40 bg-[#25D366] hover:bg-[#20BD5A] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all animate-pulse-glow"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
