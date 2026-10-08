import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { SeriesStill } from "@/data/series";
import { cn } from "@/lib/utils";

type CinematicPlateProps = {
  still: SeriesStill;
  /** Tailwind aspect class(es). Keep close to the source ratio so faces survive. */
  aspect?: string;
  /** object-position utility — `object-top` protects heads when cropping vertically. */
  objectPosition?: string;
  /** Vertical parallax travel in px across the viewport. 0 disables it. */
  parallax?: number;
  /** Strength of the bottom-to-top scrim; `none` leaves the grade untouched. */
  scrim?: "none" | "soft" | "deep";
  /** Thin inset rule, like a mounted film frame. */
  framed?: boolean;
  /** Load eagerly for the one plate that may sit near the fold. */
  priority?: boolean;
  /** `sizes` hint so the browser never over-fetches on small screens. */
  sizes?: string;
  className?: string;
  /** Overlaid content — captions, title lockups. */
  children?: ReactNode;
};

const SCRIMS = {
  none: undefined,
  soft: "linear-gradient(to top, hsl(0 0% 2% / 0.52) 0%, hsl(0 0% 2% / 0.08) 38%, transparent 62%)",
  /** Bottom-up grade plus a left wash, so a title lockup reads over any frame. */
  deep:
    "linear-gradient(to top, hsl(0 0% 2% / 0.92) 0%, hsl(0 0% 2% / 0.5) 26%, hsl(0 0% 2% / 0.08) 58%, transparent 80%)," +
    "linear-gradient(to right, hsl(0 0% 2% / 0.78) 0%, hsl(0 0% 2% / 0.4) 32%, hsl(0 0% 2% / 0.05) 58%, transparent 74%)",
};

/**
 * A single still presented as a mounted cinematic frame: hairline border,
 * optional inset rule, graded scrim, a very slow zoom on hover and an optional
 * few pixels of scroll parallax.
 *
 * Parallax lives on a wrapper and the hover zoom on the image, so the two
 * transforms never overwrite each other. Both are dropped when the visitor
 * prefers reduced motion.
 */
const CinematicPlate = ({
  still,
  aspect = "aspect-[16/9]",
  objectPosition = "object-center",
  parallax = 0,
  scrim = "soft",
  framed = true,
  priority = false,
  sizes,
  className,
  children,
}: CinematicPlateProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const travel = reduceMotion ? 0 : parallax;
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel]);

  return (
    <div
      ref={ref}
      className={cn(
        "group/plate relative overflow-hidden border border-ivory/[0.14] bg-[hsl(var(--burgundy-deep)/0.4)]",
        "shadow-[0_30px_80px_-44px_hsl(0_0%_0%/0.95)]",
        aspect,
        className
      )}
    >
      {/* Slightly oversized so the parallax travel never exposes an edge */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={travel ? { y, scale: 1.07 } : undefined}
      >
        <img
          src={still.src}
          alt={still.alt}
          width={still.width}
          height={still.height}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className={cn(
            "h-full w-full select-none object-cover",
            objectPosition,
            "transition-transform duration-2000 ease-out",
            "group-hover/plate:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover/plate:scale-100"
          )}
        />
      </motion.div>

      {SCRIMS[scrim] ? (
        <span aria-hidden className="pointer-events-none absolute inset-0" style={{ background: SCRIMS[scrim] }} />
      ) : null}

      {framed ? (
        <span aria-hidden className="pointer-events-none absolute inset-[6px] border border-ivory/[0.1]" />
      ) : null}

      {children}
    </div>
  );
};

export default CinematicPlate;
