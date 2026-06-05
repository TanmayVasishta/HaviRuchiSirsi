"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Lang = "kn" | "en";

interface LangContextType {
  lang: Lang;
  toggle: () => void;
  t: <T extends ReactNode>(kn: T, en: T) => T;
}

const LangContext = createContext<LangContextType>({
  lang: "kn",
  toggle: () => {},
  t: (kn) => kn,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("kn");

  // Restore saved language on mount
  useEffect(() => {
    const saved = localStorage.getItem("haviruchi-lang") as Lang | null;
    if (saved === "en" || saved === "kn") setLang(saved);
  }, []);

  function toggle() {
    setLang((prev) => {
      const next = prev === "kn" ? "en" : "kn";
      localStorage.setItem("haviruchi-lang", next);
      return next;
    });
  }

  function t<T extends ReactNode>(kn: T, en: T): T {
    return lang === "kn" ? kn : en;
  }

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export function LangToggle() {
  const { lang, toggle } = useLang();

  return (
    <button
      onClick={toggle}
      className="group relative flex items-center gap-0.5 bg-cream-dark/80 hover:bg-cream-dark rounded-full p-0.5 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] shadow-sm hover:shadow-md border border-maroon/10"
      aria-label={`Switch to ${lang === "kn" ? "English" : "Kannada"}`}
    >
      {/* Sliding pill background */}
      <span
        className="absolute top-0.5 h-[calc(100%-4px)] w-[calc(50%-2px)] rounded-full bg-maroon shadow-md transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{ left: lang === "kn" ? "2px" : "calc(50%)" }}
      />

      {/* KN option */}
      <span
        className={`relative z-10 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wide transition-colors duration-300 ${
          lang === "kn" ? "text-white" : "text-brown/50"
        }`}
      >
        ಕನ್ನಡ
      </span>

      {/* EN option */}
      <span
        className={`relative z-10 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wide transition-colors duration-300 ${
          lang === "en" ? "text-white" : "text-brown/50"
        }`}
      >
        EN
      </span>
    </button>
  );
}
