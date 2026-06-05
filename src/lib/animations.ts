import type { Variants, Transition } from "framer-motion";

// ─── SPRINGS ───
export const springBouncy: Transition = { type: "spring", stiffness: 200, damping: 15 };
export const springSnappy: Transition = { type: "spring", stiffness: 300, damping: 20 };
export const springGentle: Transition = { type: "spring", stiffness: 120, damping: 14 };

// ─── REUSABLE VARIANTS ───

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: springBouncy },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", scale: 0.95 },
  visible: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 0.7 } },
};

// Container that staggers its children
export const staggerContainer = (stagger = 0.1, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

// Letter-by-letter text animation
export const letterVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

// Card hover / tap
export const cardHover = {
  whileHover: { y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.08)", transition: { duration: 0.3 } },
  whileTap: { scale: 0.97 },
};

// Button tap
export const buttonTap = {
  whileTap: { scale: 0.95 },
};

// Floating animation (for badges, etc)
export const floatingVariant: Variants = {
  animate: {
    y: [0, -6, 0],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
  },
};

// Slide in from specific directions (for menu page transitions)
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, x: -60, transition: { duration: 0.3 } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, x: 60, transition: { duration: 0.3 } },
};

// Progress bar for scroll
export const progressBar = {
  style: { transformOrigin: "left", willChange: "transform" as const },
};

// Confetti particle
export const confettiVariant = (i: number): Variants => ({
  hidden: { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 },
  visible: {
    opacity: [1, 1, 0],
    x: (Math.random() - 0.5) * 300,
    y: [0, -80 - Math.random() * 100, 200 + Math.random() * 200],
    rotate: Math.random() * 720 - 360,
    scale: [1, 1.2, 0.5],
    transition: { duration: 1.5 + Math.random() * 0.5, ease: "easeOut", delay: i * 0.02 },
  },
});

export const BRAND_COLORS = ["#7B1C1C", "#E8A020", "#FFF8F0", "#1A4A2E", "#FFFFFF"];

// SVG Line draw
export const pathDrawVariant: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1, 
    transition: { pathLength: { type: "spring", duration: 1.5, bounce: 0 }, opacity: { duration: 0.1 } }
  }
};

// Rocking/swaying variant (banana leaf)
export const rockingVariant: Variants = {
  animate: {
    rotate: [-3, 3, -3],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  }
};

// 3D Flip variant for guest count
export const flipVariant: Variants = {
  hidden: { rotateX: -90, opacity: 0 },
  visible: { 
    rotateX: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 300, damping: 30 } 
  },
  exit: {
    rotateX: 90,
    opacity: 0,
    transition: { duration: 0.2 }
  }
};
