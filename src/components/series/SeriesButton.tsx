import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SeriesButtonProps = {
  href: string;
  children: ReactNode;
  /** `primary` is the dominant gold plate; `ghost` is the understated outline. */
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  className?: string;
  /** Appended to the visible label for screen readers, e.g. the episode name. */
  srSuffix?: string;
};

const base =
  "group/btn inline-flex min-h-11 items-center justify-center gap-3 text-center font-sans uppercase " +
  "transition-[background-color,border-color,color,box-shadow] duration-500 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-[hsl(var(--charcoal))]";

const sizes = {
  md: "px-7 py-3.5 text-[11px] tracking-[0.26em] sm:px-8 sm:text-[12px] sm:tracking-[0.26em]",
  sm: "px-5 py-2.5 text-[10px] tracking-[0.24em] sm:text-[11px] sm:tracking-[0.26em]",
};

const variants = {
  primary:
    "border border-gold/70 bg-gold/[0.14] text-gold shadow-[0_0_36px_-18px_hsl(var(--gold)/0.7)] " +
    "hover:border-gold hover:bg-gold/25 hover:text-ivory hover:shadow-[0_0_52px_-16px_hsl(var(--gold)/0.85)]",
  ghost:
    "border border-ivory/20 bg-transparent text-ivory/70 " +
    "hover:border-ivory/45 hover:bg-ivory/[0.05] hover:text-ivory",
};

/** External CTA used across the series section. Always opens in a new tab. */
const SeriesButton = ({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  srSuffix,
}: SeriesButtonProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(base, sizes[size], variants[variant], className)}
  >
    <span>
      {children}
      {srSuffix ? <span className="sr-only"> {srSuffix}</span> : null}
    </span>
  </a>
);

export default SeriesButton;
