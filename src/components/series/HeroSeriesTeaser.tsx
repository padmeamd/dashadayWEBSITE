import { useCallback, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HERO_TEASER, SERIES_ANCHOR_ID, SERIES_STILLS } from "@/data/series";
import { cn } from "@/lib/utils";

/** Clears the fixed site header so the series heading is never tucked under it. */
const HEADER_OFFSET = 80;

const still = SERIES_STILLS[HERO_TEASER.still];

/**
 * Smoothly walks the page down to the series section. Falls back to an instant
 * jump when the visitor prefers reduced motion, and leaves the browser's own
 * anchor behaviour in place if the section is somehow absent.
 */
function useScrollToSeries() {
  const reduceMotion = useReducedMotion();

  return useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      const target = document.getElementById(SERIES_ANCHOR_ID);
      if (!target) return;
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? "auto" : "smooth" });
      // Keep the hash in sync without a second jump.
      window.history.replaceState(null, "", `#${SERIES_ANCHOR_ID}`);
    },
    [reduceMotion]
  );
}

type Variant = "rail" | "band";

/**
 * "Your invitation to Alderwick" — a small film-frame teaser embedded in the
 * homepage hero.
 *
 * `rail` is the slim vertical plate that sits in the hero scene on large
 * screens; `band` is the compact horizontal strip shown below the hero on
 * phones and tablets. Both are a single link, keyboard reachable, and scroll
 * to the existing #the-series section rather than navigating away.
 */
const HeroSeriesTeaser = ({ variant }: { variant: Variant }) => {
  const reduceMotion = useReducedMotion();
  const onClick = useScrollToSeries();
  const isRail = variant === "rail";

  const label = (
    <span
      className={cn(
        "block font-sans uppercase text-gold/80",
        isRail ? "text-[8px] tracking-[0.26em]" : "text-[8.5px] tracking-[0.24em]"
      )}
    >
      {HERO_TEASER.label}
    </span>
  );

  const title = (
    <span
      className={cn(
        "mt-2 block font-serif font-light uppercase leading-[1.1] text-ivory",
        isRail ? "text-[13px] tracking-[0.1em]" : "text-[15px] tracking-[0.08em]"
      )}
      style={{ textShadow: "0 1px 12px hsl(0 0% 0% / 0.8)" }}
    >
      {HERO_TEASER.title}
    </span>
  );

  const cta = (
    <span
      className={cn(
        "mt-3 flex items-center gap-1.5 font-sans uppercase text-ivory/70 transition-colors duration-500 group-hover/teaser:text-gold",
        isRail ? "text-[8.5px] tracking-[0.2em]" : "text-[9px] tracking-[0.18em]"
      )}
    >
      {HERO_TEASER.cta}
      <ArrowUpRight
        className="h-3 w-3 shrink-0 transition-transform duration-500 group-hover/teaser:-translate-y-0.5 group-hover/teaser:translate-x-0.5 motion-reduce:transition-none"
        strokeWidth={1.4}
        aria-hidden
      />
    </span>
  );

  const frame = (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden border border-ivory/20",
        isRail ? "aspect-[16/9] w-full" : "aspect-[16/9] w-[6.5rem] sm:w-[8rem]"
      )}
    >
      <img
        src={still.src}
        alt=""
        aria-hidden
        width={still.width}
        height={still.height}
        /* The rail sits in the opening viewport on desktop, so this must not
           arrive late as an empty frame. Same file feeds the mobile band. */
        loading="eager"
        decoding="async"
        draggable={false}
        sizes={isRail ? "208px" : "128px"}
        className="h-full w-full select-none object-cover object-center transition-transform duration-1800 ease-out group-hover/teaser:scale-[1.07] motion-reduce:transition-none motion-reduce:group-hover/teaser:scale-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, hsl(0 0% 2% / 0.6) 0%, transparent 65%), radial-gradient(90% 90% at 50% 50%, transparent 40%, hsl(0 0% 2% / 0.35) 100%)",
        }}
      />
    </span>
  );

  const shared =
    "group/teaser relative block no-underline backdrop-blur-[2px] transition-colors duration-700 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 " +
    "focus-visible:ring-offset-[hsl(350_28%_5%)]";

  return (
    <motion.a
      href={`#${SERIES_ANCHOR_ID}`}
      onClick={onClick}
      aria-label={`${HERO_TEASER.cta} — ${HERO_TEASER.title}, ${HERO_TEASER.label}`}
      initial={reduceMotion ? false : { opacity: 0, y: isRail ? 16 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: isRail ? 1.6 : 0.3, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        shared,
        isRail
          ? "w-full border border-ivory/[0.16] bg-[hsl(350_28%_4%/0.72)] p-3 shadow-[0_24px_60px_-30px_hsl(0_0%_0%/0.95)] hover:border-gold/40"
          : "flex items-center gap-4 border border-ivory/[0.14] bg-[hsl(var(--charcoal)/0.9)] p-3.5 hover:border-gold/35 sm:gap-5 sm:p-4"
      )}
    >
      {/* Hairline inner rule — the film-frame mount */}
      <span aria-hidden className="pointer-events-none absolute inset-[3px] border border-ivory/[0.07]" />

      {isRail ? (
        <span className="relative block">
          {frame}
          <span className="mt-3 block">
            {label}
            {title}
            {cta}
          </span>
        </span>
      ) : (
        <>
          {frame}
          <span className="relative min-w-0 flex-1">
            {label}
            {title}
            {cta}
          </span>
        </>
      )}
    </motion.a>
  );
};

export default HeroSeriesTeaser;
