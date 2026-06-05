"use client";

import { motion, useReducedMotion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  fadeUp, fadeLeft, fadeRight, scaleIn, blurIn,
  staggerContainer, letterVariant, springBouncy, springSnappy,
  cardHover, buttonTap, confettiVariant, BRAND_COLORS,
} from "@/lib/animations";

// ─── SCROLL-TRIGGERED WRAPPER ───
type AnimType = "fade-up" | "fade-left" | "fade-right" | "scale" | "blur";

const VARIANT_MAP: Record<AnimType, typeof fadeUp> = {
  "fade-up": fadeUp,
  "fade-left": fadeLeft,
  "fade-right": fadeRight,
  scale: scaleIn,
  blur: blurIn,
};

export function MotionReveal({
  children,
  type = "fade-up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  type?: AnimType;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const variants = VARIANT_MAP[type];

  return (
    <motion.div
      initial={reduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={variants}
      transition={{ delay }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

// ─── STAGGER CHILDREN ───
export function MotionStagger({
  children,
  stagger = 0.1,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={staggerContainer(stagger, delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── STAGGER ITEM (use inside MotionStagger) ───
export function MotionItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUp} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </motion.div>
  );
}

// ─── LETTER BY LETTER TEXT ───
export function MotionLetters({ text, className = "" }: { text: string; className?: string }) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      initial={reduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer(0.04)}
      className={className}
      aria-label={text}
    >
      {text.split(" ").map((word, i, arr) => (
        <span key={i} className="inline-block whitespace-nowrap">
          {word.split("").map((char, j) => (
            <motion.span key={j} variants={letterVariant} className="inline-block" style={{ willChange: "transform, opacity" }}>
              {char}
            </motion.span>
          ))}
          {i < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}

// ─── SPRING BUTTON ───
export function MotionButton({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={springSnappy}
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

// ─── HOVER CARD ───
export function MotionCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      {...cardHover}
      className={className}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

// ─── ANIMATED COUNTER ───
export function MotionCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 1.5,
  className = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) { setStarted(true); obs.unobserve(el); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 40;
    const stepTime = (duration * 1000) / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = 1 - Math.pow(1 - step / steps, 3);
      setCount(Math.round(target * progress));
      if (step >= steps) { setCount(target); clearInterval(timer); }
    }, stepTime);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span ref={ref} className={className}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ─── SCROLL PROGRESS BAR ───
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-saffron z-[100] origin-left"
      style={{ scaleX, willChange: "transform" }}
    />
  );
}

// ─── CONFETTI BURST ───
export function Confetti({ trigger }: { trigger: boolean }) {
  if (!trigger) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-[200] flex items-center justify-center overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          variants={confettiVariant(i)}
          initial="hidden"
          animate="visible"
          className="absolute w-3 h-3 rounded-sm"
          style={{
            backgroundColor: BRAND_COLORS[i % BRAND_COLORS.length],
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}

// ─── PAGE TRANSITION WRAPPER ───
export function PageTransition({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── SHIMMER IMAGE ───
export function ShimmerImage({ src, alt, fill, width, height, className = "", imageClassName = "", priority = false }: any) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden ${fill ? "w-full h-full absolute inset-0" : ""} ${className}`}>
      {!loaded && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%]"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        priority={priority}
        className={`${imageClassName} transition-opacity duration-400 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

// ─── PARALLAX SECTION ───
export function ParallaxSection({ children, className = "", speed = 0.5 }: { children: ReactNode; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0 will-change-transform" style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

// ─── RIPPLE BUTTON ───
export function RippleButton({ children, className = "", onClick, ...props }: any) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {children}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.35 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute bg-white/40 rounded-full pointer-events-none"
            style={{ left: r.x, top: r.y, width: 100, height: 100, marginLeft: -50, marginTop: -50 }}
            onAnimationComplete={() => setRipples((prev) => prev.filter((rip) => rip.id !== r.id))}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}

// ─── TYPEWRITER TEXT ───
export function TypewriterText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      initial={reduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer(0.05, delay)}
      className={className}
    >
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ─── FLIP NUMBER ───
export function FlipNumber({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`relative inline-block overflow-hidden ${className}`} style={{ perspective: "1000px" }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="inline-block origin-bottom will-change-transform"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ─── MORPH BUTTON ───
export function MorphButton({ children, className = "", onClick, isSubmitted, isSubmitting, successText = "Sent!" }: any) {
  if (isSubmitted) {
    return (
      <motion.div
        layoutId="morphBtn"
        initial={{ borderRadius: "50%" }}
        animate={{ borderRadius: "16px", width: "100%" }}
        className="bg-forest text-white py-3 px-6 flex items-center justify-center gap-2 overflow-hidden"
      >
        <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <motion.path d="M5 13l4 4L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} />
        </motion.svg>
        <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, ...springBouncy }}>
          {successText}
        </motion.span>
      </motion.div>
    );
  }

  if (isSubmitting) {
    return (
      <motion.div layoutId="morphBtn" animate={{ width: 56, borderRadius: 28 }} className="bg-forest h-14 mx-auto flex items-center justify-center overflow-hidden">
        <motion.span className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
      </motion.div>
    );
  }

  return (
    <motion.button layoutId="morphBtn" whileTap={{ scale: 0.97 }} onClick={onClick} className={`relative overflow-hidden ${className}`}>
      <motion.span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: "linear" }} />
      {children}
    </motion.button>
  );
}

// ─── BOTTOM NAV ITEM ───
import Link from "next/link";

export function BottomNavItem({ href, icon, label, isActive }: { href: string; icon: string; label: string; isActive: boolean }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-0.5 px-3 py-1 text-brown/60 hover:text-maroon transition-colors relative">
      <motion.span 
        whileTap={{ scale: 0.8 }} 
        transition={springSnappy} 
        className="text-xl relative"
      >
        {icon}
        {isActive && (
          <motion.div
            layoutId="navDot"
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-maroon rounded-full"
            transition={springSnappy}
          />
        )}
      </motion.span>
      <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-maroon" : ""}`}>{label}</span>
    </Link>
  );
}

// Re-export for convenience
export { motion, AnimatePresence, useReducedMotion };
