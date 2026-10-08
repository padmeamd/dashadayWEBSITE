import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before the fade begins. */
  delay?: number;
  /** Starting offset in px; 0 fades without moving. */
  y?: number;
  /** Seconds the fade takes. */
  duration?: number;
  /** Adds a cinematic focus pull — the element resolves out of a soft blur. */
  focusPull?: boolean;
  className?: string;
  as?: "div" | "li" | "article" | "header" | "section" | "figure" | "p";
};

/**
 * Slow cinematic reveal as the element enters the viewport.
 * Collapses to a plain static element when the visitor prefers reduced motion.
 */
const Reveal = ({
  children,
  delay = 0,
  y = 18,
  duration = 1,
  focusPull = false,
  className,
  as = "div",
}: RevealProps) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: focusPull ? "blur(10px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
