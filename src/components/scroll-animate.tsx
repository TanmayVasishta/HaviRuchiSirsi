"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale"
  | "blur"
  | "flip";

interface ScrollAnimateProps {
  children: ReactNode;
  type?: AnimationType;
  delay?: number;       // ms
  duration?: number;    // ms
  className?: string;
  once?: boolean;       // only animate once (default true)
  threshold?: number;   // 0-1
}

const ANIMATION_STYLES: Record<AnimationType, { from: string; to: string }> = {
  "fade-up": {
    from: "opacity-0 translate-y-8",
    to: "opacity-100 translate-y-0",
  },
  "fade-down": {
    from: "opacity-0 -translate-y-8",
    to: "opacity-100 translate-y-0",
  },
  "fade-left": {
    from: "opacity-0 translate-x-8",
    to: "opacity-100 translate-x-0",
  },
  "fade-right": {
    from: "opacity-0 -translate-x-8",
    to: "opacity-100 translate-x-0",
  },
  scale: {
    from: "opacity-0 scale-90",
    to: "opacity-100 scale-100",
  },
  blur: {
    from: "opacity-0 blur-sm scale-95",
    to: "opacity-100 blur-0 scale-100",
  },
  flip: {
    from: "opacity-0 rotate-x-12",
    to: "opacity-100 rotate-x-0",
  },
};

export function ScrollAnimate({
  children,
  type = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
  once = true,
  threshold = 0.15,
}: ScrollAnimateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const anim = ANIMATION_STYLES[type];

  return (
    <div
      ref={ref}
      className={`transition-all ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
        visible ? anim.to : anim.from
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/** Staggered children — each child animates with increasing delay */
export function StaggerGroup({
  children,
  type = "fade-up",
  baseDelay = 0,
  stagger = 100,
  duration = 600,
  className = "",
}: {
  children: ReactNode[];
  type?: AnimationType;
  baseDelay?: number;
  stagger?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <>
      {children.map((child, i) => (
        <ScrollAnimate
          key={i}
          type={type}
          delay={baseDelay + i * stagger}
          duration={duration}
          className={className}
        >
          {child}
        </ScrollAnimate>
      ))}
    </>
  );
}

/** Animated counter — counts up when scrolled into view */
export function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 1500,
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const steps = 40;
    const increment = target / steps;
    const stepTime = duration / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out: fast start, slow end
      const progress = 1 - Math.pow(1 - step / steps, 3);
      current = Math.round(target * progress);
      setCount(current);

      if (step >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [started, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
